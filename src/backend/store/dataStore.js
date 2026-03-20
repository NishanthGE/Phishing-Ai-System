/**
 * File Store (store/dataStore.js) — MongoDB-backed with in-memory fallback
 * Used by emailRoutes.js, urlRoutes.js, and downloadRoutes.js
 */

const { isDBConnected } = require('../config/db');
const EmailAnalysis = require('../models/EmailAnalysis');
const URLAnalysis = require('../models/URLAnalysis');

// In-memory fallback arrays
let memEmails = [];
let memURLs   = [];

class FileDataStore {

    // ── Save ──────────────────────────────────────────────────────────────────

    async saveEmail(emailData) {
        try {
            if (isDBConnected()) {
                const doc = await EmailAnalysis.create({
                    subject: emailData.subject || 'No Subject',
                    content: (emailData.content || '').substring(0, 200),
                    fullContent: emailData.content,
                    classification: emailData.classification || 'Safe',
                    threatScore: emailData.threatScore || 0,
                    isPhishing: emailData.isPhishing || false,
                    fullAnalysis: emailData.analysis,
                });
                return { id: doc._id, ...emailData, timestamp: doc.createdAt };
            }
            // Fallback
            const entry = { id: Date.now(), timestamp: new Date().toISOString(), ...emailData };
            memEmails.unshift(entry);
            if (memEmails.length > 200) memEmails.pop();
            return entry;
        } catch (err) {
            console.error('Error saving email:', err.message);
            return null;
        }
    }

    async saveURL(urlData) {
        try {
            if (isDBConnected()) {
                const doc = await URLAnalysis.create({
                    url: urlData.url,
                    classification: urlData.classification || 'Safe',
                    threatScore: urlData.threatScore || 0,
                    isMalicious: urlData.isMalicious || false,
                    fullAnalysis: urlData.analysis,
                });
                return { id: doc._id, ...urlData, timestamp: doc.createdAt };
            }
            const entry = { id: Date.now(), timestamp: new Date().toISOString(), ...urlData };
            memURLs.unshift(entry);
            if (memURLs.length > 200) memURLs.pop();
            return entry;
        } catch (err) {
            console.error('Error saving URL:', err.message);
            return null;
        }
    }

    // ── Get All ───────────────────────────────────────────────────────────────

    async getAllEmails() {
        if (isDBConnected()) {
            return await EmailAnalysis.find().sort({ createdAt: -1 }).lean();
        }
        return memEmails;
    }

    async getAllURLs() {
        if (isDBConnected()) {
            return await URLAnalysis.find().sort({ createdAt: -1 }).lean();
        }
        return memURLs;
    }

    // ── Delete ────────────────────────────────────────────────────────────────

    async deleteEmail(id) {
        try {
            if (isDBConnected()) {
                await EmailAnalysis.findByIdAndDelete(id);
                return true;
            }
            memEmails = memEmails.filter(e => String(e.id) !== String(id));
            return true;
        } catch (err) {
            console.error('Error deleting email:', err.message);
            return false;
        }
    }

    async deleteURL(id) {
        try {
            if (isDBConnected()) {
                await URLAnalysis.findByIdAndDelete(id);
                return true;
            }
            memURLs = memURLs.filter(u => String(u.id) !== String(id));
            return true;
        } catch (err) {
            console.error('Error deleting URL:', err.message);
            return false;
        }
    }

    // ── Clear ──────────────────────────────────────────────────────────────────

    async clearAll() {
        try {
            if (isDBConnected()) {
                await EmailAnalysis.deleteMany({});
                await URLAnalysis.deleteMany({});
            } else {
                memEmails = [];
                memURLs   = [];
            }
            return true;
        } catch (err) {
            console.error('Error clearing data:', err.message);
            return false;
        }
    }
}

module.exports = new FileDataStore();
