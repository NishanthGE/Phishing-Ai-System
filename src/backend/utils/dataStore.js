/**
 * Data Store — MongoDB-backed with in-memory fallback
 * src/backend/utils/dataStore.js
 */

const { isDBConnected } = require('../config/db');
const EmailAnalysis = require('../models/EmailAnalysis');
const URLAnalysis = require('../models/URLAnalysis');

// ── In-memory fallback ────────────────────────────────────────────────────────
let memEmails = [];
let memURLs = [];
let memId = 1;

function memRecord(data) {
    return { id: memId++, timestamp: new Date().toISOString(), ...data };
}

class DataStore {
    // ── Email ──────────────────────────────────────────────────────────────────

    async saveEmailAnalysis(emailContent, analysis) {
        const payload = {
            type: 'email',
            content: emailContent.substring(0, 200),
            fullContent: emailContent,
            subject: emailContent.match(/Subject:\s*(.*)/i)?.[1] || 'No Subject',
            classification: analysis.classification,
            threatScore: analysis.threatScore,
            isPhishing: analysis.classification === 'Phishing',
            confidence: analysis.confidence,
            indicators: analysis.indicators,
            recommendations: analysis.recommendations,
            features: analysis.features,
            fullAnalysis: analysis,
        };

        if (isDBConnected()) {
            const doc = await EmailAnalysis.create(payload);
            return { id: doc._id, ...payload };
        }
        const record = memRecord(payload);
        memEmails.unshift(record);
        if (memEmails.length > 100) memEmails.pop();
        return record;
    }

    async getEmailAnalyses(limit = 50) {
        if (isDBConnected()) {
            const total = await EmailAnalysis.countDocuments();
            const items = await EmailAnalysis.find().sort({ createdAt: -1 }).limit(limit).lean();
            return { total, items, limit, hasMore: total > limit };
        }
        return {
            total: memEmails.length,
            items: memEmails.slice(0, limit),
            limit,
            hasMore: memEmails.length > limit,
        };
    }

    async getEmailAnalysisById(id) {
        if (isDBConnected()) {
            return await EmailAnalysis.findById(id).lean();
        }
        return memEmails.find(e => String(e.id) === String(id));
    }

    // ── URL ───────────────────────────────────────────────────────────────────

    async saveURLAnalysis(url, analysis) {
        const payload = {
            type: 'url',
            url,
            classification: analysis.classification,
            threatScore: analysis.threatScore,
            isMalicious: analysis.classification === 'Malicious',
            confidence: analysis.confidence,
            indicators: analysis.indicators,
            recommendations: analysis.recommendations,
            features: analysis.features,
            fullAnalysis: analysis,
        };

        if (isDBConnected()) {
            const doc = await URLAnalysis.create(payload);
            return { id: doc._id, ...payload };
        }
        const record = memRecord(payload);
        memURLs.unshift(record);
        if (memURLs.length > 100) memURLs.pop();
        return record;
    }

    async getURLAnalyses(limit = 50) {
        if (isDBConnected()) {
            const total = await URLAnalysis.countDocuments();
            const items = await URLAnalysis.find().sort({ createdAt: -1 }).limit(limit).lean();
            return { total, items, limit, hasMore: total > limit };
        }
        return {
            total: memURLs.length,
            items: memURLs.slice(0, limit),
            limit,
            hasMore: memURLs.length > limit,
        };
    }

    async getURLAnalysisById(id) {
        if (isDBConnected()) {
            return await URLAnalysis.findById(id).lean();
        }
        return memURLs.find(u => String(u.id) === String(id));
    }

    // ── Combined ──────────────────────────────────────────────────────────────

    async getAllAnalyses(limit = 100) {
        if (isDBConnected()) {
            const emailCount = await EmailAnalysis.countDocuments();
            const urlCount = await URLAnalysis.countDocuments();
            const emails = await EmailAnalysis.find().sort({ createdAt: -1 }).limit(limit).lean();
            const urls = await URLAnalysis.find().sort({ createdAt: -1 }).limit(limit).lean();
            const all = [...emails.map(e => ({ ...e, category: 'email' })),
                        ...urls.map(u => ({ ...u, category: 'url' }))]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, limit);
            return { emailCount, urlCount, totalCount: emailCount + urlCount, items: all, limit, hasMore: (emailCount + urlCount) > limit };
        }
        const all = [
            ...memEmails.map(e => ({ ...e, category: 'email' })),
            ...memURLs.map(u => ({ ...u, category: 'url' })),
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        return { emailCount: memEmails.length, urlCount: memURLs.length, totalCount: all.length, items: all.slice(0, limit), limit, hasMore: all.length > limit };
    }

    async getStats() {
        if (isDBConnected()) {
            const emailCount = await EmailAnalysis.countDocuments();
            const urlCount = await URLAnalysis.countDocuments();
            const phishingEmails = await EmailAnalysis.countDocuments({ classification: 'Phishing' });
            const suspiciousEmails = await EmailAnalysis.countDocuments({ classification: 'Suspicious' });
            const maliciousURLs = await URLAnalysis.countDocuments({ classification: 'Malicious' });
            const suspiciousURLs = await URLAnalysis.countDocuments({ classification: 'Suspicious' });
            return {
                emailAnalyses: emailCount,
                urlAnalyses: urlCount,
                totalAnalyses: emailCount + urlCount,
                threatDistribution: {
                    emails: { phishing: phishingEmails, suspicious: suspiciousEmails, safe: emailCount - phishingEmails - suspiciousEmails },
                    urls: { malicious: maliciousURLs, suspicious: suspiciousURLs, safe: urlCount - maliciousURLs - suspiciousURLs },
                },
                storage: 'mongodb',
            };
        }
        return {
            emailAnalyses: memEmails.length,
            urlAnalyses: memURLs.length,
            totalAnalyses: memEmails.length + memURLs.length,
            storage: 'memory',
        };
    }

    async clearAll() {
        if (isDBConnected()) {
            await EmailAnalysis.deleteMany({});
            await URLAnalysis.deleteMany({});
            return true;
        }
        memEmails = [];
        memURLs = [];
        return true;
    }

    // Legacy sync methods kept for backward-compat (used by store/dataStore route shortcuts)
    getAllEmails() { return isDBConnected() ? [] : memEmails; }
    getAllURLs()   { return isDBConnected() ? [] : memURLs; }
}

module.exports = new DataStore();
