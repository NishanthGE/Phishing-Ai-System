# Quick Start Testing Guide

**Backend:** http://localhost:8081  
**Frontend:** http://localhost:8080  
**Version:** 4.0.0

---

## Pre-Test Checklist

- [ ] (Optional) MongoDB running: `net start MongoDB` (as Administrator)
- [ ] Backend running: `node src/backend/server.js` (Terminal 1)
- [ ] Frontend running: `node src/backend/frontend-server.js` (Terminal 2)
- [ ] Health check passes: http://localhost:8081/api/health
- [ ] Login page loads: http://localhost:8080

---

## Test 1 — Authentication

1. Go to http://localhost:8080
2. Sign up with a new account **OR** use `admin` / `password123`
3. ✅ Should enter the dashboard

---

## Test 2 — Phishing Email Detection

1. Click **Email Analysis** tab
2. Paste:
   ```
   URGENT: Your PayPal account has been suspended. 
   Verify your identity immediately or provide your credit card 
   and SSN to restore access. Act within 24 hours.
   ```
3. Click **Analyze Email**
4. ✅ Expected: **Phishing — Score ~100 — Critical**

---

## Test 3 — Legit Email (No False Positive)

1. Click **Email Analysis** tab
2. Paste:
   ```
   Dear Sir/Madam, My name is Nishanth G E. I am currently 
   pursuing BE CSE CyberSecurity 3rd year. I am writing to 
   express my interest in a cybersecurity internship opportunity. 
   Please find my resume attached. Best regards, Nishanth G E
   ```
3. Click **Analyze Email**
4. ✅ Expected: **Safe — Score ~11**

---

## Test 4 — Malicious URL Detection

1. Click **URL Analysis** tab
2. Enter: `http://paypal-security.verify-account.tk/login/confirm`
3. Click **Analyze URL**
4. ✅ Expected: **Malicious — Score 80+**

---

## Test 5 — Safe URL

1. Enter: `https://www.google.com`
2. Click **Analyze URL**
3. ✅ Expected: **Safe — Score < 30**

---

## Test 6 — Verify Data Saved to MongoDB

After running Tests 2–5, open in browser:
- http://localhost:8081/api/data/emails
- http://localhost:8081/api/data/urls
- http://localhost:8081/api/data/stats

✅ You should see the analysis records returned as JSON.

---

## Test 7 — API Direct Test (PowerShell)

```powershell
$body = '{"emailContent":"URGENT PayPal suspended verify credit card SSN immediately fraud"}'
Invoke-WebRequest -Uri "http://localhost:8081/api/analyze-email" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing | Select-Object -ExpandProperty Content | ConvertFrom-Json | Select-Object -ExpandProperty data
```

---

## Test 8 — Download Data

- Email JSON: http://localhost:8081/api/download/emails/download-json
- Email CSV: http://localhost:8081/api/download/emails/download-csv
- URL JSON: http://localhost:8081/api/download/urls/download-json
- URL CSV: http://localhost:8081/api/download/urls/download-csv
