# 🔥 Firebase Setup Guide

This guide will walk you through setting up Firebase for your portfolio admin panel.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "portfolio-admin")
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Register app with a nickname (e.g., "Portfolio Admin")
3. **Copy the configuration object** - you'll need this!
4. Click "Continue to console"

## Step 3: Enable Authentication

1. In Firebase Console, go to **Build → Authentication**
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Click on **Email/Password**
5. Enable the first toggle (Email/Password)
6. Click "Save"

## Step 4: Create Firestore Database

1. Go to **Build → Firestore Database**
2. Click "Create database"
3. Select **Start in production mode**
4. Choose a location (closest to you)
5. Click "Enable"

### Set Firestore Security Rules

Click on the **Rules** tab and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Folders collection - only authenticated users can read/write
    match /folders/{folderId} {
      allow read: if true; // Public can read folders
      allow write: if request.auth != null; // Only authenticated users can modify
    }

    // Videos collection - only authenticated users can read/write
    match /videos/{videoId} {
      allow read: if true; // Public can read videos
      allow write: if request.auth != null; // Only authenticated users can modify
    }
  }
}
```

Click **Publish**.

## Step 5: Enable Firebase Storage

1. Go to **Build → Storage**
2. Click "Get started"
3. Select **Start in production mode**
4. Choose same location as Firestore
5. Click "Done"

### Set Storage Security Rules

Click on the **Rules** tab and replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /thumbnails/{allPaths=**} {
      allow read: if true; // Public can read thumbnails
      allow write: if request.auth != null &&
                      request.resource.size < 5 * 1024 * 1024 && // Max 5MB
                      request.resource.contentType.matches('image/.*'); // Only images
    }
  }
}
```

Click **Publish**.

## Step 6: Update Firebase Configuration

1. Open `src/config/firebase.js`
2. Replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

## Step 7: Create Admin User

You need to manually create your admin user account:

### Method 1: Using Firebase Console (Recommended)

1. Go to **Build → Authentication**
2. Click **Users** tab
3. Click **Add user**
4. Enter email: `your-email@example.com`
5. Enter password: `your-secure-password`
6. Click **Add user**

### Method 2: Using Sign-up Page (Temporary)

Create a temporary signup page or use the browser console on the login page:

```javascript
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase";

createUserWithEmailAndPassword(auth, "your-email@example.com", "your-password")
  .then((userCredential) => console.log("User created:", userCredential.user))
  .catch((error) => console.error("Error:", error));
```

**Important:** Remove this code after creating your account!

## Step 8: Test Your Setup

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:5173/admin/login`
3. Login with your admin credentials
4. You should see the dashboard!

## Step 9: Prepare Google Drive for Video Hosting

1. Create a folder in Google Drive for your videos
2. Upload videos to this folder
3. For each video:
   - Right-click → Share → Change to "Anyone with the link"
   - Copy the link
   - Paste it in the admin panel when adding videos

### Converting Google Drive Links for Embedding

When you copy a Google Drive link, it looks like:

```
https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing
```

For embedding, you need to convert it to:

```
https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/preview
```

The admin panel handles this automatically, so just paste the regular share link!

## 🎉 You're All Set!

Your admin panel is now fully configured. You can:

- ✅ Login at `/admin/login`
- ✅ Manage folders at `/admin/folders`
- ✅ Manage videos at `/admin/videos/:folderId`
- ✅ Upload thumbnails to Firebase Storage
- ✅ Store video links from Google Drive

## 📝 Admin Panel URLs

- **Portfolio**: `http://localhost:5173/`
- **Admin Login**: `http://localhost:5173/admin/login`
- **Dashboard**: `http://localhost:5173/admin/dashboard`
- **Folders**: `http://localhost:5173/admin/folders`

## 🚀 Deployment Notes

When deploying to production:

1. Update Firebase config in `src/config/firebase.js` (if different)
2. Ensure Firebase security rules are published
3. Add your production domain to Firebase **Authorized domains**:
   - Go to **Authentication → Settings → Authorized domains**
   - Add your domain (e.g., `yourportfolio.com`)

## 🔒 Security Best Practices

1. **Never commit** `firebase.js` with real credentials to public repos
2. Use environment variables for sensitive data
3. Keep your admin password strong and secure
4. Regularly review Firebase security rules
5. Monitor Firebase usage in the console

## 🆘 Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"

- Make sure you've enabled Email/Password authentication in Firebase Console

### "Missing or insufficient permissions"

- Check your Firestore security rules are published
- Ensure you're logged in as an authenticated user

### "Storage upload failed"

- Verify Storage is enabled
- Check file size is under 5MB
- Ensure file is an image format

### Can't login

- Verify you created a user in Firebase Authentication
- Check email/password are correct
- Look for errors in browser console

---

Need help? Check the [Firebase Documentation](https://firebase.google.com/docs) or open an issue!
