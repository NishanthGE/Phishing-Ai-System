/**
 * Email Routes
 * Defines API endpoints for email phishing analysis
 */

const express = require('express');
const EmailController = require('../controllers/emailController');
const fileStore = require('../store/dataStore');

const router = express.Router();

router.post('/analyze-email', EmailController.analyzeEmail);
router.post('/analyze-emails-batch', EmailController.batchAnalyzeEmails);
router.get('/email-stats', EmailController.getEmailStats);
router.post('/validate-email', EmailController.validateEmail);
router.get('/sample-email', EmailController.getSampleEmail);

/* ── Download / View stored email analyses ── */

/**
 * @route GET /api/download/emails/json
 * @desc  Download all analyzed emails as JSON file
 */
router.get('/download/emails/json', async (req, res) => {
    const emails = await fileStore.getAllEmails();
    res.setHeader('Content-Disposition', 'attachment; filename="email_analyses.json"');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(emails, null, 2));
});

/**
 * @route GET /api/download/emails/csv
 * @desc  Download all analyzed emails as CSV file
 */
router.get('/download/emails/csv', async (req, res) => {
    const emails = await fileStore.getAllEmails();
    const headers = ['id','timestamp','subject','classification','threatScore','isPhishing'];
    const rows = emails.map(e => [
        e.id || e._id,
        e.timestamp || e.createdAt,
        `"${(e.subject || '').replace(/"/g, '""')}"`,
        e.classification || e.analysis?.classification || '',
        e.threatScore || e.analysis?.threatScore || '',
        e.isPhishing ? 'true' : 'false'
    ].join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    res.setHeader('Content-Disposition', 'attachment; filename="email_analyses.csv"');
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
});

/**
 * @route GET /api/data/emails
 * @desc  View all stored email records in browser (JSON pretty)
 */
router.get('/data/emails', async (req, res) => {
    const emails = await fileStore.getAllEmails();
    res.json({ total: emails.length, records: emails });
});

/**
 * @route DELETE /api/download/emails/clear
 * @desc  Clear all stored email analysis records
 */
router.delete('/download/emails/clear', async (req, res) => {
    await fileStore.clearAll();
    res.json({ success: true, message: 'All email records cleared' });
});

module.exports = router;