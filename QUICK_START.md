# 🚀 Quick Start Guide

## Prerequisites

- **Node.js** v14+ — [nodejs.org](https://nodejs.org)
- **MongoDB** running locally (or MongoDB Atlas)

---

## 1️⃣ Install Dependencies

```bash
cd d:\CapstoneNew\Capstone\phishing-ai-system
npm install
```

---

## 2️⃣ Start MongoDB (Run as Administrator)

```bash
net start MongoDB
```

> If you see "Access Denied", open PowerShell/CMD **as Administrator** and retry.  
> **Without MongoDB** the server still works — it falls back to in-memory storage automatically.

---

## 3️⃣ Start Backend API

Open **Terminal 1**:
```bash
cd d:\CapstoneNew\Capstone\phishing-ai-system
node src/backend/server.js
```

You should see:
```
✅ MongoDB connected: mongodb://localhost:27017/phishing-ai-system
🚀 AI-Based Phishing Detection System
🔧 Backend API running on: http://localhost:8081
```

---

## 4️⃣ Start Frontend Server

Open **Terminal 2**:
```bash
cd d:\CapstoneNew\Capstone\phishing-ai-system
node src/backend/frontend-server.js
```

---

## 5️⃣ Open the Dashboard

Navigate to: **http://localhost:8080**

---

## 6️⃣ Login

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `password123` |

Or create your own account via the **Sign Up** link.

---

## 7️⃣ Test the AI Engine

### Test a Phishing Email
Paste this into the Email tab and click **Analyze Email**:
```
URGENT: Your PayPal account has been suspended immediately.
Click here to verify your identity or provide your credit card 
and SSN to restore access. Act within 24 hours.
```
✅ Expected result: **Phishing — Score ~100**

---

### Test a Legit Email
```
Hi team, the sprint review is scheduled for Friday at 3pm.
Please come prepared with your progress updates. Agenda attached.
```
✅ Expected result: **Safe — Score ~0**

---

### Test a Malicious URL
```
http://paypal-security.verify-account.tk/login/confirm
```
✅ Expected result: **Malicious — Score ~80+**

---

## 8️⃣ View Backend Data

| What | URL |
|------|-----|
| Email analyses | http://localhost:8081/api/data/emails |
| URL analyses | http://localhost:8081/api/data/urls |
| Statistics | http://localhost:8081/api/data/stats |
| Health check | http://localhost:8081/api/health |

---

## ⚠️ Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 8081 already in use | `netstat -ano \| findstr :8081` → `taskkill /PID <id> /F` |
| Frontend shows blank page | Check frontend-server.js is running on port 8080 |
| Login fails | Try `admin` / `password123` or create a new account |
| Analysis returns error | Make sure backend (8081) is running before frontend |
| MongoDB "Access Denied" | Run terminal **as Administrator** → `net start MongoDB` |
| MongoDB not installed | Data saves in-memory — install MongoDB for persistence |
