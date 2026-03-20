# Phishing Detection System — TODO / Roadmap

**Project Path:** `d:\CapstoneNew\Capstone\phishing-ai-system`  
**Last Updated:** March 2026  
**Version:** 4.0.0

---

## ✅ Completed

### Phase 1 — Backend Auth Setup
- [x] Install bcryptjs, jsonwebtoken
- [x] Create `src/backend/utils/userStore.js`
- [x] Create `src/backend/controllers/authController.js` (signup/login)
- [x] Create `src/backend/routes/authRoutes.js`
- [x] Update `src/backend/server.js` with auth routes

### Phase 2 — Frontend UI Overhaul
- [x] Complete rewrite of `style.css` — premium dark cyberpunk/glassmorphism theme
- [x] Updated `index.html` — animated grid background, floating orbs, neon accents
- [x] Login page redesigned — two-column layout, brand panel, demo credentials
- [x] Dashboard — frosted-glass cards, neon tabs, color-coded results
- [x] Google Fonts — Inter + JetBrains Mono

### Phase 3 — Real ML Engine (v3.2)
- [x] Created `src/backend/utils/aiEngine.js`
- [x] **Naive Bayes classifier** trained on 160 labeled emails
- [x] **Random Forest URL classifier** — 5 weighted decision trees
- [x] Replaced keyword-based analyzers with ML versions
- [x] Fixed false positives — stopwords, deduplication, prior bias
- [x] Fixed professional email false positives — `formalEmailScore()` context detector
- [x] Raised classification thresholds (Phishing ≥ 72, Suspicious ≥ 48)

### Phase 4 — MongoDB Integration ✅ NEW
- [x] Install `mongoose` package
- [x] Create `src/backend/config/db.js` — MongoDB connection with graceful fallback
- [x] Create `src/backend/models/User.js` — Mongoose User schema
- [x] Create `src/backend/models/EmailAnalysis.js` — Mongoose EmailAnalysis schema
- [x] Create `src/backend/models/URLAnalysis.js` — Mongoose URLAnalysis schema
- [x] Rewrote `src/backend/utils/userStore.js` — async Mongoose-backed
- [x] Rewrote `src/backend/utils/dataStore.js` — async Mongoose-backed
- [x] Rewrote `src/backend/store/dataStore.js` — async Mongoose-backed
- [x] Updated `server.js` — `connectDB()` called at startup
- [x] Updated `authController.js` — all UserStore calls now awaited
- [x] Updated `emailController.js` + `urlController.js` — dataStore calls awaited
- [x] Updated all routes — async/await throughout
- [x] Created `.env.example` template

---

## 🔮 Future Enhancements

### ML Improvements
- [ ] Expand training dataset (500+ emails each class)
- [ ] Integrate external phishing datasets (CEAS, SpamAssassin)
- [ ] Persist trained model weights to disk
- [ ] Add TF-IDF weighting on top of token frequency
- [ ] Implement n-gram features (bigrams)
- [ ] Add feedback loop — users can mark false positives/negatives

### Backend
- [ ] Redis caching for repeated URL lookups
- [ ] WebSocket support for real-time streaming results
- [ ] External threat intelligence API integration (VirusTotal, Google Safe Browsing)
- [ ] Email header analysis (SPF, DKIM, DMARC checks)
- [ ] Docker deployment setup

### Frontend
- [ ] Analysis history page with DB data
- [ ] Comparison view (side-by-side threat breakdown)
- [ ] Dark/light theme toggle

### Security
- [ ] Admin panel for monitoring analyses
- [ ] Role-based access control (RBAC)
