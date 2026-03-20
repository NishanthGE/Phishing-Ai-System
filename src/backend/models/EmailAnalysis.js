/**
 * EmailAnalysis Mongoose Model
 * src/backend/models/EmailAnalysis.js
 */

const mongoose = require('mongoose');

const emailAnalysisSchema = new mongoose.Schema(
    {
        subject: { type: String, default: 'No Subject' },
        content: { type: String },                // preview (first 200 chars)
        fullContent: { type: String },
        classification: { type: String, enum: ['Safe', 'Suspicious', 'Phishing'], required: true },
        threatScore: { type: Number, min: 0, max: 100, required: true },
        isPhishing: { type: Boolean, default: false },
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

module.exports = mongoose.model('EmailAnalysis', emailAnalysisSchema);
