# AI-Based Phishing Detection System

## 🛡️ Real ML-Powered Cybersecurity — Naive Bayes + Random Forest + MongoDB

A cybersecurity capstone project that uses **real machine learning** (no keyword lists) to detect phishing emails and malicious URLs. Features a premium dark cyberpunk/glassmorphism frontend, a fully documented REST API, and **MongoDB** for persistent data storage.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14+
- **npm**
- **MongoDB** (local or Atlas)
- Modern browser (Chrome / Edge / Firefox)

### Start the System

```bash
# 1. Install dependencies
cd d:\CapstoneNew\Capstone\phishing-ai-system
npm install

# 2. (Optional) Start MongoDB — run as Administrator
net start MongoDB

# 3. Start backend API (port 8081)
node src/backend/server.js

# 4. In a second terminal — start frontend (port 8080)
node src/backend/frontend-server.js
```

> **Note:** If MongoDB is not running, the server automatically falls back to in-memory storage.

### Access
| Service | URL |
|---------|-----|
| **Frontend Dashboard** | http://localhost:8080 |
| **Backend API** | http://localhost:8081 |
| **Health Check** | http://localhost:8081/api/health |
| **API Docs** | http://localhost:8081/api/docs |

### Demo Login
| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `password123` |

---

## 🗄️ Database — MongoDB

The system now uses **MongoDB + Mongoose** for persistent storage:

| Collection | Stores |
|------------|--------|
| `users` | Registered user accounts |
| `emailanalyses` | All email scan results |
| `urlanalyses` | All URL scan results |

**Connection string** (default):
```
mongodb://localhost:27017/phishing-ai-system
```

Override via environment variable:
```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/phishing-ai-system
```

---

## 🧠 AI / ML Engine (v3.2)

### Email — Multinomial Naive Bayes
Trained on **160 labeled emails** (60 phishing + 100 legit) at server startup:
- Tokenization with **37+ stopwords** removed (eliminates ambiguous words)
- **Per-document token deduplication** prevents repeated words from dominating
- **Formal email context detector** (`formalEmailScore`) — 15 regex patterns that recognize cover letters, internship applications, academic emails and dampen the phishing score by up to 85%
- Classification thresholds: **Phishing ≥ 72**, **Suspicious ≥ 48**
- Prior biased toward legitimate class (55%) to reduce false positives

### URL — Random Forest Ensemble (5 Trees)
| Tree | Feature Group | Weight |
|------|--------------|--------|
| 1 | Domain structure (IP, subdomains, HTTPS) | 30% |
| 2 | URL length & special characters | 20% |
| 3 | Brand impersonation + suspicious TLDs | 25% |
| 4 | URL shorteners & open redirect params | 15% |
| 5 | Punycode / path depth / non-standard ports | 10% |

---

## 📁 Project Structure

```
phishing-ai-system/
├── src/
│   ├── backend/
│   │   ├── server.js                  # Express API server (port 8081)
│   │   ├── frontend-server.js         # Static file server (port 8080)
│   │   ├── config/
│   │   │   └── db.js                  # ★ MongoDB connection config
│   │   ├── models/
│   │   │   ├── User.js                # ★ Mongoose User schema
│   │   │   ├── EmailAnalysis.js       # ★ Mongoose EmailAnalysis schema
│   │   │   └── URLAnalysis.js         # ★ Mongoose URLAnalysis schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── emailRoutes.js
│   │   │   ├── urlRoutes.js
│   │   │   ├── dataRoutes.js
│   │   │   └── downloadRoutes.js
│   │   ├── controllers/
│   │   │   ├── emailController.js
│   │   │   ├── urlController.js
│   │   │   └── authController.js
│   │   ├── services/
│   │   │   ├── emailAnalyzer.js       # ML email classification
│   │   │   └── urlAnalyzer.js         # ML URL classification
│   │   ├── utils/
│   │   │   ├── aiEngine.js            # ★ Core ML engine (NB + RF)
│   │   │   ├── dataStore.js           # MongoDB-backed analysis store
│   │   │   ├── userStore.js           # MongoDB-backed user store
│   │   │   ├── explainableAI.js       # Explanation generation
│   │   │   └── featureExtractor.js    # URL feature extraction
│   │   └── store/
│   │       └── dataStore.js           # Store used by routes/downloads
│   └── frontend/
│       ├── index.html                 # Cyberpunk UI dashboard
│       ├── style.css                  # Glassmorphism dark theme
│       └── script.js                  # Frontend logic
├── datasets/
│   ├── phishing_keywords.json
│   └── malicious_url_patterns.json
├── .env.example                       # ★ Environment variable template
├── package.json
└── README.md
```

---

## 🔌 API Reference

### Email Analysis
```http
POST /api/analyze-email
Content-Type: application/json
Authorization: Bearer <token>

{ "emailContent": "Email body text..." }
```

**Response includes:**
- `classification`: `Safe` | `Suspicious` | `Phishing`
- `threatScore`: 0–100
- `confidence`: `{ level, value }`
- `mlEngine`: `{ name, topPhishTokens, topSafeTokens }`
- `explanation`: `{ summary, riskFactors, recommendation }`

### URL Analysis
```http
POST /api/analyze-url
Content-Type: application/json
Authorization: Bearer <token>

{ "url": "https://example.com" }
```

### Batch Analysis
```http
POST /api/analyze-emails-batch   # up to 10 emails
POST /api/analyze-urls-batch     # up to 20 URLs
```

### Auth Endpoints
```http
POST /api/auth/signup   { "username", "password" }
POST /api/auth/login    { "username", "password" }
```

### Data / Download Endpoints
```http
GET /api/data/emails                        # All stored email analyses
GET /api/data/urls                          # All stored URL analyses
GET /api/data/stats                         # Threat statistics
GET /api/download/emails/download-json      # Download emails as JSON
GET /api/download/emails/download-csv       # Download emails as CSV
GET /api/download/urls/download-json        # Download URLs as JSON
GET /api/download/urls/download-csv         # Download URLs as CSV
```

---

## 📊 Classification Thresholds

| Score Range | Email Label | URL Label |
|-------------|-------------|-----------|
| 0 – 47 | ✅ Safe | ✅ Safe |
| 48 – 71 | ⚠️ Suspicious | ⚠️ Suspicious |
| 72 – 100 | 🚨 Phishing | 🚨 Malicious |

---

## 🎨 UI Features

- **Premium dark cyberpunk** theme with glassmorphism cards
- Animated neon grid background + floating orbs
- Neon cyan/purple accent palette
- Color-coded results (green / yellow / red)
- Toast notifications with glow effects
- `JetBrains Mono` + `Inter` typography

---

## 🛡️ Security Features

- **Helmet.js** — HTTP security headers
- **CORS** — Cross-origin protection
- **Rate limiting** — 100 req/15 min per IP
- **JWT authentication** — Bearer token auth (7-day expiry)
- **bcryptjs** — Password hashing (12 salt rounds)
- **Timing-safe comparison** — Prevents login timing attacks
- **Input validation** — Max size / format checks
- **Laplace smoothing** — Prevents zero-probability NB edge cases

---

## 🧪 Test Cases

### Phishing Email
```
URGENT: Your PayPal account has been suspended.
Verify your identity immediately or your account will 
be permanently deleted. Provide your SSN and credit card now.
```
Expected: **Phishing — Score ~100**

### Malicious URL
```
http://paypal-security.verify-account.tk/login/confirm
```
Expected: **Malicious — Score ~85+**

---

## 👨‍💻 Author

**Nishanth G E** — BE CSE (CyberSecurity), 3rd Year  
*Cybersecurity Capstone Project — 2026*

---

## ⚠️ Disclaimer

This system is built for **educational and demonstration purposes**. It implements genuine ML techniques and provides real threat analysis, but should not be the sole security measure in production environments.