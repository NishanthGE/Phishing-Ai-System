# Setup Guide

## System Requirements
- **OS**: Windows 10/11 (tested), Linux/macOS compatible
- **Node.js**: v14.0.0 or higher
- **npm**: v8+
- **MongoDB**: v5+ (local) or MongoDB Atlas (cloud)
- **Browser**: Chrome, Edge, Firefox (latest)
- **Ports**: 8080 (frontend), 8081 (backend) — must be free

---

## Installation

### Step 1 — Navigate to Project
```bash
cd d:\CapstoneNew\Capstone\phishing-ai-system
```

### Step 2 — Install Dependencies
```bash
npm install
```

Key packages installed:
| Package | Purpose |
|---------|---------|
| `express` | HTTP server framework |
| `mongoose` | MongoDB ODM — database integration |
| `helmet` | Security headers |
| `cors` | Cross-origin resource sharing |
| `express-rate-limit` | Rate limiting |
| `validator` | URL/input validation |
| `natural` | NLP (legacy feature extractor) |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT auth tokens |

### Step 3 — (Optional) Configure Environment

Copy `.env.example` to `.env` and set your values:
```bash
copy .env.example .env
```

Key variables:
```env
MONGODB_URI=mongodb://localhost:27017/phishing-ai-system
JWT_SECRET=your-secret-key
DEMO_USERNAME=admin
DEMO_PASSWORD=password123
PORT=8081
```

---

## Starting MongoDB

### Windows (as Administrator)
```bash
net start MongoDB
```

### Manual start
```bash
mongod --dbpath C:\data\db
```

> If MongoDB is not available, the server automatically falls back to **in-memory storage** — no crash, no config needed.

---

## Running the System

### Terminal 1 — Backend API
```bash
node src/backend/server.js
```
Expected output:
```
✅ MongoDB connected: mongodb://localhost:27017/phishing-ai-system
🚀 AI-Based Phishing Detection System
🔧 Backend API running on: http://localhost:8081
```

### Terminal 2 — Frontend
```bash
node src/backend/frontend-server.js
```
Expected: Frontend serving on http://localhost:8080

---

## MongoDB Collections

After the server runs and you analyze some emails/URLs, MongoDB will have:

| Collection | Contents |
|------------|---------|
| `users` | Registered accounts (username + bcrypt password) |
| `emailanalyses` | Full email scan results with ML scores |
| `urlanalyses` | Full URL scan results with RF tree votes |

View with **MongoDB Compass** → connect to `mongodb://localhost:27017` → open `phishing-ai-system`.

---

## Verify Setup

```
http://localhost:8081/api/health   → { status: "healthy" }
http://localhost:8081/api/data/stats → DB statistics
http://localhost:8080              → Login page
```