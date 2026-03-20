/**
 * generate_pdf.js — place this in the project root and run: node generate_pdf.js
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'd:\\CapstoneNew\\Capstone\\phishing-ai-system';
const mdPath  = path.join(PROJECT_ROOT, 'PROJECT_DOCUMENTATION.md');
const outPath = path.join(PROJECT_ROOT, 'PROJECT_DOCUMENTATION.pdf');
const htmlOutPath = path.join(PROJECT_ROOT, '_doc_temp.html');

const rawMd = fs.readFileSync(mdPath, 'utf8');

// ── Lightweight Markdown → HTML ───────────────────────────────────────────────
function mdToHtml(md) {
    let html = md
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Fenced code blocks
    html = html.replace(/```[\w-]*\n([\s\S]*?)```/g, (_, c) =>
        `<pre><code>${c}</code></pre>`);

    // Inline code
    html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');

    // HR
    html = html.replace(/^---+$/gm, '<hr>');

    // Headings
    for (let i = 6; i >= 1; i--) {
        const re = new RegExp(`^#{${i}}\\s(.+)$`, 'gm');
        html = html.replace(re, `<h${i}>$1</h${i}>`);
    }

    // Bold / italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Links / Images stripped to text
    html = html.replace(/!\[.*?\]\(.*?\)/g, '');
    html = html.replace(/\[([^\]]+)\]\([^)]+\)/g, '<span class="lnk">$1</span>');

    // Blockquote alerts  &gt; [!NOTE]
    html = html.replace(/^&gt;\s*\[!(\w+)\]\s*\n((?:^&gt;.*\n?)*)/gm, (_, type, body) => {
        const content = body.replace(/^&gt;\s?/gm, '').trim();
        return `<div class="alert ${type.toLowerCase()}">${content}</div>`;
    });
    html = html.replace(/^&gt;\s(.+)$/gm, '<blockquote>$1</blockquote>');

    // Tables
    html = html.replace(/((?:^\|.+\|\r?\n?)+)/gm, (block) => {
        const lines = block.trim().split('\n');
        let thead = true;
        let out = '<table>';
        for (const line of lines) {
            if (/^\|[\s\-|:]+\|$/.test(line.trim())) { thead = false; continue; }
            const cells = line.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
            const tag = thead ? 'th' : 'td';
            out += '<tr>' + cells.map(c => `<${tag}>${c}</${tag}>`).join('') + '</tr>';
        }
        out += '</table>';
        return out;
    });

    // Lists
    html = html.replace(/((?:^[ \t]*[-*]\s.+\n?)+)/gm, (block) => {
        const items = block.trim().split('\n').map(l => `<li>${l.replace(/^[ \t]*[-*]\s/, '')}</li>`).join('');
        return `<ul>${items}</ul>`;
    });
    html = html.replace(/((?:^\d+\.\s.+\n?)+)/gm, (block) => {
        const items = block.trim().split('\n').map(l => `<li>${l.replace(/^\d+\.\s/, '')}</li>`).join('');
        return `<ol>${items}</ol>`;
    });

    // Paragraphs
    html = html.replace(/^(?!<[a-zA-Z\/])(.+)$/gm, '<p>$1</p>');

    return html;
}

const bodyHtml = mdToHtml(rawMd);

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;font-size:10.5pt;color:#111827;background:#fff;line-height:1.65}
.cover{width:100%;min-height:260mm;display:flex;flex-direction:column;justify-content:center;align-items:center;
  background:linear-gradient(135deg,#0a0a1f 0%,#1a0a3e 45%,#0a1a3e 100%);color:#fff;
  page-break-after:always;text-align:center;padding:40px}
.badge{background:rgba(0,212,255,.15);border:1px solid #00d4ff;border-radius:30px;
  padding:5px 18px;font-size:9pt;color:#00d4ff;letter-spacing:2px;text-transform:uppercase;margin-bottom:28px}
.cover-title{font-size:30pt;font-weight:700;line-height:1.1;margin-bottom:14px}
.cg{background:linear-gradient(90deg,#00d4ff,#a78bfa);-webkit-background-clip:text;
  -webkit-text-fill-color:transparent;background-clip:text}
.cover-sub{font-size:13pt;color:rgba(255,255,255,.65);margin-bottom:46px}
.cover-meta{border-top:1px solid rgba(255,255,255,.15);padding-top:26px;color:rgba(255,255,255,.6);font-size:9.5pt;line-height:2}
.cover-meta strong{color:#00d4ff}
.content{max-width:175mm;margin:0 auto;padding:16mm 12mm}
h1{font-size:17pt;color:#1e1b4b;border-bottom:3px solid #7c3aed;padding-bottom:7px;margin:24px 0 12px;page-break-after:avoid}
h2{font-size:13pt;color:#2d1b69;border-left:4px solid #00d4ff;padding-left:10px;margin:20px 0 9px;page-break-after:avoid}
h3{font-size:11pt;color:#4c1d95;margin:16px 0 7px;page-break-after:avoid}
h4{font-size:10.5pt;color:#6d28d9;margin:12px 0 5px;font-weight:600;page-break-after:avoid}
p{margin:5px 0 9px}
table{width:100%;border-collapse:collapse;margin:12px 0;font-size:9pt;page-break-inside:avoid}
th{background:linear-gradient(135deg,#1e1b4b,#0a1a3e);color:#a5f3fc;padding:7px 9px;
  text-align:left;font-weight:600;border:1px solid #7c3aed}
td{padding:6px 9px;border:1px solid #d1d5db;vertical-align:top}
tr:nth-child(even) td{background:#f5f3ff}
pre{background:#0f0f23;color:#e2e8f0;border-radius:6px;padding:12px 14px;
  font-family:'JetBrains Mono',monospace;font-size:8pt;margin:11px 0;border-left:3px solid #7c3aed;
  page-break-inside:avoid;white-space:pre-wrap;word-break:break-all}
code{font-family:'JetBrains Mono',monospace;background:#ede9fe;color:#6d28d9;
  padding:1px 4px;border-radius:3px;font-size:8.5pt}
pre code{background:none;color:inherit;padding:0;font-size:8pt}
ul,ol{margin:7px 0 10px 20px}
li{margin:3px 0}
hr{border:none;border-top:1.5px solid #e5e7eb;margin:18px 0}
blockquote{background:#f5f3ff;border-left:4px solid #7c3aed;margin:10px 0;
  padding:9px 13px;border-radius:0 6px 6px 0;color:#4c1d95;font-style:italic}
.alert{padding:10px 14px;border-radius:6px;margin:10px 0;font-size:9.5pt;page-break-inside:avoid}
.alert.note{background:#dbeafe;border-left:4px solid #3b82f6;color:#1e40af}
.alert.warning{background:#fef3c7;border-left:4px solid #f59e0b;color:#92400e}
.alert.caution,.alert.important{background:#fee2e2;border-left:4px solid #ef4444;color:#991b1b}
.lnk{color:#6d28d9;text-decoration:underline}
@page{size:A4;margin:18mm 15mm 22mm 15mm}
`;

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>AI Phishing Detection System — Project Documentation</title>
<style>${css}</style>
</head>
<body>

<div class="cover">
  <div class="badge">🎓 Capstone Project · 2026</div>
  <div class="cover-title"><span class="cg">AI-Based Phishing<br>Detection System</span></div>
  <div class="cover-sub">Complete Project Documentation</div>
  <div class="cover-meta">
    <strong>Author:</strong> Nishanth G E &nbsp;|&nbsp; BE CSE (CyberSecurity), 3rd Year<br>
    <strong>Version:</strong> 2.0.0 &nbsp;|&nbsp; <strong>Date:</strong> March 2026<br><br>
    <strong>Tech:</strong> Node.js &nbsp;·&nbsp; Express.js &nbsp;·&nbsp; Naive Bayes &nbsp;·&nbsp; Random Forest &nbsp;·&nbsp; JWT
  </div>
</div>

<div class="content">
${bodyHtml}
</div>
</body>
</html>`;

fs.writeFileSync(htmlOutPath, fullHtml, 'utf8');
console.log('✅ HTML generated');

(async () => {
    const puppeteer = require(path.join(PROJECT_ROOT, 'node_modules', 'puppeteer'));

    console.log('🚀 Launching Chromium...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });
    const page = await browser.newPage();

    const fileUrl = 'file:///' + htmlOutPath.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60000 });

    await page.pdf({
        path: outPath,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `<div style="font-size:7px;width:100%;padding:0 15mm;text-align:right;color:#9ca3af;">AI-Based Phishing Detection System — Project Documentation</div>`,
        footerTemplate: `<div style="font-size:8px;width:100%;text-align:center;color:#6b7280;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
        margin: { top: '22mm', bottom: '22mm', left: '15mm', right: '15mm' }
    });

    await browser.close();
    fs.unlinkSync(htmlOutPath);

    console.log('');
    console.log('🎉 PDF successfully created!');
    console.log('📄 Saved at:', outPath);
})().catch(err => {
    console.error('❌ PDF generation failed:', err.message);
    console.log('   HTML file (for manual print) kept at:', htmlOutPath);
    process.exit(1);
});
