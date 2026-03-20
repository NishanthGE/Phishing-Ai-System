/**
 * User Store — MongoDB-backed with in-memory fallback
 * src/backend/utils/userStore.js
 */

const { isDBConnected } = require('../config/db');
const UserModel = require('../models/User');

// ── In-memory fallback ────────────────────────────────────────────────────────
const memUsers = new Map();

class UserStore {
    /**
     * Find user by username
     */
    async findByUsername(username) {
        if (isDBConnected()) {
            return await UserModel.findOne({ username });
        }
        const u = memUsers.get(username);
        return u ? { username, ...u } : null;
    }

    /**
     * Create new user
     */
    async create(username, hashedPassword) {
        if (isDBConnected()) {
            const existing = await UserModel.findOne({ username });
            if (existing) throw new Error('Username already exists');
            const user = await UserModel.create({ username, password: hashedPassword });
            console.log(`✅ [MongoDB] New user created: ${username}`);
            return user;
        }
        // Fallback
        if (memUsers.has(username)) throw new Error('Username already exists');
        const user = { password: hashedPassword, createdAt: new Date().toISOString() };
        memUsers.set(username, user);
        console.log(`✅ [Memory] New user created: ${username}`);
        return user;
    }

    /**
     * Get all users (for demo/stats)
     */
    async getAll() {
        if (isDBConnected()) {
            const users = await UserModel.find({}, 'username createdAt');
            return users.map(u => ({ username: u.username, createdAt: u.createdAt }));
        }
        return Array.from(memUsers.entries()).map(([username, u]) => ({
            username,
            createdAt: u.createdAt,
        }));
    }

    /**
     * Clear all users
     */
    async clearAll() {
        if (isDBConnected()) {
            await UserModel.deleteMany({});
            console.log('🗑️ [MongoDB] All users cleared');
        } else {
            memUsers.clear();
            console.log('🗑️ [Memory] All users cleared');
        }
    }
}

module.exports = new UserStore();
