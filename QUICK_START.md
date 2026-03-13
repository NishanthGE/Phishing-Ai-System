# 🚀 QUICK START - Test Signup Now!

## 1️⃣ Start Servers (Choose One Method)

### Method A: Double-click this file
```
start-both-servers.bat
```

### Method B: Run manually
```batch
cd e:\Capstone\phishing-ai-system
node src/backend/server.js
```
(Open another terminal)
```batch
cd e:\Capstone\phishing-ai-system
node src/backend/frontend-server.js
```

## 2️⃣ Open Browser
- URL: http://localhost:8080
- Press F12 to open Developer Console

## 3️⃣ Test Signup

1. Click **"Sign Up"** link
2. Enter:
   - Username: `testuser`
   - Password: `test123`
   - Confirm: `test123`
3. Click **"Create Account"**

## 4️⃣ What You Should See

### In Console:
```
✅ Signup form event listener attached
🔥 handleSignup function called!
✅ Account created successfully for: testuser
```

### On Screen:
- ✅ Green success message
- ✅ Auto-switch to login (2 seconds)
- ✅ Username pre-filled

## 5️⃣ Login
1. Enter password: `test123`
2. Click **"Login"**
3. See dashboard! 🎉

---

## ⚠️ Not Working?

### Check Console for Errors
Look for red error messages

### Try Demo Account
- Username: `admin`
- Password: `password123`

### Clear Browser Cache
Press: `Ctrl + Shift + Delete`

### Verify Servers Running
- Frontend: http://localhost:8080 (should show login page)
- Backend: http://localhost:8081/api/health (should show JSON)

---

## 📞 Still Having Issues?

Run this in browser console:
```javascript
// Check if form exists
console.log('Signup form:', document.getElementById('signup-form'));

// Check localStorage
console.log('Created users:', localStorage.getItem('createdUsers'));

// Manual test
toggleAuthForm('signup');
```

---

**That's it! Your signup should work now! 🎊**
