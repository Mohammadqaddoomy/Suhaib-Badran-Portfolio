# ✅ Quick Start Checklist

Follow this checklist to get your admin panel up and running in minutes!

## Before You Start

- [ ] Have a Google account
- [ ] Node.js installed (v18+)
- [ ] Project dependencies installed (`npm install`)

---

## 1. Firebase Project Setup (10 minutes)

### Create Project

- [ ] Go to [Firebase Console](https://console.firebase.google.com/)
- [ ] Click "Add project"
- [ ] Name it (e.g., "portfolio-admin")
- [ ] Disable Google Analytics (optional)
- [ ] Click "Create project"

### Add Web App

- [ ] Click the **Web icon** (`</>`)
- [ ] Register app with nickname
- [ ] **COPY THE CONFIG** - you'll need it!
- [ ] Click "Continue to console"

---

## 2. Enable Firebase Services (5 minutes)

### Authentication

- [ ] Go to **Build → Authentication**
- [ ] Click "Get started"
- [ ] Go to **Sign-in method** tab
- [ ] Enable **Email/Password**
- [ ] Click "Save"

### Firestore Database

- [ ] Go to **Build → Firestore Database**
- [ ] Click "Create database"
- [ ] Start in **production mode**
- [ ] Choose location
- [ ] Click "Enable"

### Set Firestore Rules

- [ ] Click **Rules** tab
- [ ] Copy rules from `FIREBASE_SETUP.md` (Firestore section)
- [ ] Click **Publish**

### Firebase Storage

- [ ] Go to **Build → Storage**
- [ ] Click "Get started"
- [ ] Start in **production mode**
- [ ] Same location as Firestore
- [ ] Click "Done"

### Set Storage Rules

- [ ] Click **Rules** tab
- [ ] Copy rules from `FIREBASE_SETUP.md` (Storage section)
- [ ] Click **Publish**

---

## 3. Update Firebase Config (2 minutes)

- [ ] Open `src/config/firebase.js`
- [ ] Replace the config object with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // ← From Firebase Console
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

- [ ] Save the file

---

## 4. Create Admin User (1 minute)

### Method 1: Firebase Console (Recommended)

- [ ] Go to **Build → Authentication → Users**
- [ ] Click **Add user**
- [ ] Enter your email: `your-email@example.com`
- [ ] Enter a strong password
- [ ] Click **Add user**

### Method 2: Browser Console (Alternative)

- [ ] Start dev server: `npm run dev`
- [ ] Open browser console on login page
- [ ] Run this code (replace with your credentials):

```javascript
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase";
createUserWithEmailAndPassword(auth, "your@email.com", "password")
  .then((user) => console.log("Created:", user))
  .catch((err) => console.error(err));
```

---

## 5. Test Admin Panel (2 minutes)

- [ ] Start dev server: `npm run dev`
- [ ] Open: `http://localhost:5173/admin/login`
- [ ] Login with your credentials
- [ ] Should see the dashboard! 🎉

---

## 6. Add Your First Content (5 minutes)

### Create a Folder

- [ ] Go to **Folders** page
- [ ] Click **Add Folder**
- [ ] Enter name (e.g., "Video Graphics")
- [ ] Click **Add**

### Upload Video to Google Drive

- [ ] Go to Google Drive
- [ ] Upload a video file
- [ ] Right-click → Share → "Anyone with the link"
- [ ] Copy the shareable link

### Add Video to Admin

- [ ] Click on your folder
- [ ] Click **Add Video**
- [ ] Enter title
- [ ] Paste Google Drive link
- [ ] Upload a thumbnail image (JPG/PNG, max 5MB)
- [ ] Click **Add Video**

### Verify

- [ ] Video appears in videos list
- [ ] Thumbnail displays correctly
- [ ] Video count updated on folder card

---

## 7. Deploy (Optional)

### Vercel

- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Run: `vercel`
- [ ] Follow prompts
- [ ] Add domain to Firebase **Authorized domains**

### Netlify

- [ ] Build: `npm run build`
- [ ] Upload `dist/` folder
- [ ] Configure redirects (use `public/_redirects` file)
- [ ] Add domain to Firebase **Authorized domains**

---

## 🎉 You're Done!

Your admin panel is live and ready! You can now:

- ✅ Manage folders
- ✅ Upload videos
- ✅ Add thumbnails
- ✅ Update content anytime

---

## 🆘 Troubleshooting

### Can't login?

- ✅ Check user exists in Firebase Console → Authentication → Users
- ✅ Verify email/password are correct
- ✅ Check browser console for errors

### "Configuration not found" error?

- ✅ Ensure Email/Password is enabled in Firebase Authentication
- ✅ Check firebase.js has correct config values

### Thumbnail upload fails?

- ✅ File size under 5MB?
- ✅ File is JPG/PNG format?
- ✅ Storage is enabled in Firebase?
- ✅ Storage rules are published?

### "Permission denied" error?

- ✅ Firestore rules are published?
- ✅ You're logged in as authenticated user?

### Videos not showing?

- ✅ Check Firestore Console → Data tab
- ✅ Should see `folders` and `videos` collections
- ✅ Verify Google Drive link is set to "Anyone with the link"

---

## 📚 Need More Help?

- **Firebase Setup**: See `FIREBASE_SETUP.md`
- **Full Documentation**: See `README.md`
- **Admin Features**: See `ADMIN_SUMMARY.md`
- **Firebase Docs**: [firebase.google.com/docs](https://firebase.google.com/docs)

---

**Estimated Total Time: 25 minutes** ⏱️

**Difficulty: Easy** 🟢 (Just copy-paste and click buttons!)

---

Happy content managing! 🚀✨
