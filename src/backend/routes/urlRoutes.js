/**
 * URL Routes
 * Defines API endpoints for malicious URL analysis
 */

const express = require('express');
const URLController = require('../controllers/urlController');
const fileStore = require('../store/dataStore');

const router = express.Router();

router.post('/analyze-url', URLController.analyzeURL);
router.post('/analyze-urls-batch', URLController.batchAnalyzeURLs);
router.get('/url-stats', URLController.getURLStats);
router.post('/validate-url', URLController.validateURL);
router.get('/sample-url', URLController.getSampleURL);
router.post('/extract-url-components', URLController.extractURLComponents);

/* ── Download / View stored URL analyses ── */

/**
 * @route GET /api/download/urls/json
 * @desc  Download all analyzed URLs as JSON file
 */
router.get('/download/urls/json', async (req, res) => {
    const urls = await fileStore.getAllURLs();
    res.setHeader('Content-Disposition', 'attachment; filename="url_analyses.json"');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(urls, null, 2));
});

/**
 * @route GET /api/download/urls/csv
 * @desc  Download all analyzed URLs as CSV file
 */
router.get('/download/urls/csv', async (req, res) => {
    const urls = await fileStore.getAllURLs();
    const headers = ['id','timestamp','url','classification','threatScore','isMalicious'];
    const rows = urls.map(u => [
        u.id || u._id,
        u.timestamp || u.createdAt,
        `"${(u.url || '').replace(/"/g, '""')}"`,
        u.classification || u.analysis?.classification || '',
        u.threatScore || u.analysis?.threatScore || '',
        u.isMalicious ? 'true' : 'false'
    ].join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    res.setHeader('Content-Disposition', 'attachment; filename="url_analyses.csv"');
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
});

/**
 * @route GET /api/data/urls
 * @desc  View all stored URL records in browser (JSON pretty)
 */
router.get('/data/urls', async (req, res) => {
    const urls = await fileStore.getAllURLs();
    res.json({ total: urls.length, records: urls });
});

/**
 * @route DELETE /api/download/urls/clear
 * @desc  Clear all stored URL analysis records
 */
router.delete('/download/urls/clear', async (req, res) => {
    await fileStore.clearAll();
    res.json({ success: true, message: 'All URL records cleared' });
});

module.exports = router;