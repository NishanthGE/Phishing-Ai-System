# ✅ Changes Summary

**Version:** 4.0.0  
**Last Updated:** March 2026  
**Project Path:** `d:\CapstoneNew\Capstone\phishing-ai-system`

---

## 🗄️ Phase 4 — MongoDB Integration (LATEST)

### New Files
- `src/backend/config/db.js` — MongoDB connection with **graceful in-memory fallback**
- `src/backend/models/User.js` — Mongoose User schema (username, hashed password, timestamps)
- `src/backend/models/EmailAnalysis.js` — Mongoose EmailAnalysis schema (classification, threatScore, full analysis JSON)
- `src/backend/models/URLAnalysis.js` — Mongoose URLAnalysis schema (url, classification, threatScore, tree votes)
- `.env.example` — Environment variable template (MONGODB_URI, JWT_SECRET, PORT)

### Updated: `src/backend/utils/userStore.js`
- All methods now **async** — uses Mongoose when MongoDB is connected
- Automatic fallback to JavaScript `Map` (in-memory) if DB is unavailable

### Updated: `src/backend/utils/dataStore.js`
- All methods now **async** — uses `EmailAnalysis` and `URLAnalysis` Mongoose models
- Automatic fallback to in-memory arrays if DB is unavailable
- `getStats()` now returns real DB counts and threat breakdown

### Updated: `src/backend/store/dataStore.js`
- Rewritten to use MongoDB — `saveEmail()`, `saveURL()`, `getAllEmails()`, `getAllURLs()`, `clearAll()` — all async

### Updated: `src/backend/server.js`
- Calls `connectDB()` at startup (async IIFE wraps the `app.listen()` call)
- Server starts even if MongoDB is unavailable

### Updated: `src/backend/controllers/authController.js`
- `login()`, `profile()`, `getUsers()` now properly `await` the async UserStore methods

### Updated: `src/backend/controllers/emailController.js`
- `analyzeEmail()` now `await`s `dataStore.saveEmailAnalysis()` and `fileStore.saveEmail()`

### Updated: `src/backend/controllers/urlController.js`
- `analyzeURL()` now `await`s `dataStore.saveURLAnalysis()` and `fileStore.saveURL()`

### Updated: All Routes
- `emailRoutes.js`, `urlRoutes.js`, `dataRoutes.js`, `downloadRoutes.js` — all route handlers now `async` and `await` store calls

---

## 🧠 Phase 3 — Real ML Engine (v3.2)

### `src/backend/utils/aiEngine.js`
Complete detection engine replacement:

#### Email — Multinomial Naive Bayes (v3.2)
- Trained on 160 labeled emails (60 phishing + 100 legit) on server startup
- TF-IDF-style log-likelihood scoring with Laplace smoothing
- **37+ stopword list** removes ambiguous words
- **Per-document token deduplication** prevents word repetition amplifying scores
- **`formalEmailScore()`** — 15 regex rules recognize professional emails, dampen NB score by up to 85%
- Thresholds: Phishing ≥ 72, Suspicious ≥ 48; prior biased 55% legit

#### URL — Random Forest Ensemble (5 Trees)
- Weighted ensemble: Tree 1 (30%), 2 (20%), 3 (25%), 4 (15%), 5 (10%)
- Detects: IP addresses, brand impersonation, URL shorteners, punycode, suspicious TLDs

---

## 🎨 Phase 2 — Premium UI Overhaul

- Dark cyberpunk/glassmorphism theme
- Animated grid background + floating orbs
- Google Fonts: Inter + JetBrains Mono
- Color-coded results, toast notifications with glow

---

## 🔧 Phase 1 — Backend Auth

- JWT authentication (7-day tokens)
- bcryptjs password hashing (12 salt rounds)
- Timing-safe login comparison (CWE-208 fix)

---

## 📊 Verified Test Results (v3.2)

| Email / URL | Engine | Result | Score |
|---|---|---|---|
| Nishanth internship application | NB ML | ✅ Safe | 11 |
| Cover letter | NB ML | ✅ Safe | 5 |
| "We noticed a new login..." | NB ML | ✅ Safe | 17 |
| Order receipt | NB ML | ✅ Safe | 4 |
| Team meeting reminder | NB ML | ✅ Safe | 0 |
| PayPal suspended phishing | NB ML | 🚨 Phishing | 100 |
| Bank fraud alert phishing | NB ML | 🚨 Phishing | 100 |
| Lottery prize scam | NB ML | 🚨 Phishing | 100 |
| `paypal-security.verify-account.tk/...` | RF ML | 🚨 Malicious | 85+ |
| `https://google.com` | RF ML | ✅ Safe | ~0 |
