/**
 * MongoDB Connection Config
 * src/backend/config/db.js
 */

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/phishing-ai-system';

let isConnected = false;

async function connectDB() {
    if (isConnected) return;

    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = true;
        console.log('✅ MongoDB connected:', MONGODB_URI);
    } catch (err) {
        console.warn('⚠️  MongoDB connection failed — running in fallback (in-memory) mode.');
        console.warn('   Error:', err.message);
        console.warn('   Make sure MongoDB is running or set MONGODB_URI env variable.\n');
    }
}

function isDBConnected() {
    return mongoose.connection.readyState === 1;
}

module.exports = { connectDB, isDBConnected };
