# Deployment Status

**Last Updated:** March 2026  
**Version:** 4.0.0  
**Status:** ✅ Local Development — Fully Operational

---

## Service Status

| Service | Port | Status | URL |
|---------|------|--------|-----|
| Backend API | 8081 | ✅ Running | http://localhost:8081 |
| Frontend | 8080 | ✅ Running | http://localhost:8080 |
| ML Engine | — | ✅ Trained in-memory at startup | — |
| MongoDB | 27017 | ✅ Connected (fallback: in-memory) | mongodb://localhost:27017 |

---

## Component Readiness

| Component | Status | Notes |
|-----------|--------|-------|
| Naive Bayes Email ML | ✅ Done | 160 training samples, formalEmailScore() |
| Random Forest URL ML | ✅ Done | 5-tree ensemble |
| JWT Authentication | ✅ Done | 7-day tokens, bcrypt hashing |
| MongoDB Integration | ✅ Done | Mongoose models + graceful fallback |
| Cyberpunk UI | ✅ Done | Dark glassmorphism theme |
| Email Analysis API | ✅ Done | POST /api/analyze-email |
| URL Analysis API | ✅ Done | POST /api/analyze-url |
| Batch Analysis | ✅ Done | POST /api/analyze-emails-batch & urls-batch |
| Data Persistence | ✅ Done | MongoDB collections: users, emailanalyses, urlanalyses |
| CSV/JSON Downloads | ✅ Done | /api/download/* endpoints |
| False Positive Fix | ✅ Done | Stopwords + formalEmailScore + prior bias |

---

## MongoDB Collections

| Collection | Contents |
|------------|---------|
| `users` | username (unique), bcrypt password, createdAt |
| `emailanalyses` | subject, classification, threatScore, isPhishing, fullAnalysis |
| `urlanalyses` | url, classification, threatScore, isMalicious, fullAnalysis |

---

## Known Limitations

- ML model **retrains on every startup** (~50ms, acceptable for demo)
- No external threat intelligence feeds (VirusTotal, etc.)
- Rate limit: 100 requests / 15 minutes per IP
- If MongoDB is down → fallback to in-memory (data resets on restart)

---

## Deployment Checklist (For Production)

- [x] MongoDB for persistent user and analysis storage
- [x] Environment variables via `.env.example`
- [ ] Move training data to a separate JSON file (not hardcoded)
- [ ] Configure HTTPS with valid SSL certificate
- [ ] Set up PM2 or systemd for process management
- [ ] Configure reverse proxy (nginx)
- [ ] Implement proper logging (winston)
- [ ] Docker deployment setup
