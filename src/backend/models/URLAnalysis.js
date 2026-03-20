/**
 * URLAnalysis Mongoose Model
 * src/backend/models/URLAnalysis.js
 */

const mongoose = require('mongoose');

const urlAnalysisSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        classification: { type: String, enum: ['Safe', 'Suspicious', 'Malicious'], required: true },
        threatScore: { type: Number, min: 0, max: 100, required: true },
        isMalicious: { type: Boolean, default: false },
        confidence: { type: mongoose.Schema.Types.Mixed },
        indicators: [{ type: String }],
        recommendations: [{ type: String }],
        features: { type: mongoose.Schema.Types.Mixed },
        fullAnalysis: { type: mongoose.Schema.Types.Mixed },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('URLAnalysis', urlAnalysisSchema);
