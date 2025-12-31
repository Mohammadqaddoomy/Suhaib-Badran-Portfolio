# 🎨 Modern Portfolio Website - React Edition

A stunning, professional portfolio website built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Features a minimalist black and white design with smooth animations, modern UI/UX, and a **powerful admin panel** for easy content management.

## ✨ Features

### Frontend Portfolio

- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎭 **Smooth Animations** - Framer Motion for professional transitions
- 🎨 **Modern UI** - Tailwind CSS with custom styling
- 📱 **Fully Responsive** - Perfect on all devices
- 🎬 **Video Lightbox** - Elegant video player overlay
- 📁 **3D Folder Cards** - Apple Intelligence-style animated cards
- 🌈 **Gradient Borders** - Beautiful rainbow animations on hover

### Admin Panel 🔐

- 🔑 **Secure Authentication** - Firebase email/password login
- 📂 **Folder Management** - Create, edit, delete project folders
- 🎥 **Video Management** - Upload videos with thumbnails
- ☁️ **Cloud Storage** - Firebase Storage for thumbnails
- 🔗 **Google Drive Integration** - Host videos on Google Drive
- 📊 **Dashboard** - Overview stats and quick actions
- 🎯 **Real-time Updates** - Changes reflect immediately

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

### Firebase Setup (Required for Admin Panel)

1. Follow the detailed guide: **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**
2. Create a Firebase project
3. Enable Authentication, Firestore, and Storage
4. Update `src/config/firebase.js` with your credentials
5. Create your admin user account

### Build for Production

```bash
npm run build
npm run preview
```

## 📦 Tech Stack

### Frontend

- **React 19** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS v4** - Modern utility-first CSS
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing

### Backend (Firebase)

- **Firebase Auth** - User authentication
- **Firestore** - NoSQL database
- **Firebase Storage** - File storage for thumbnails
- **Google Drive** - Video hosting (via shareable links)

## 🎨 Portfolio Sections

1. **Navbar** - Glassmorphism navigation with logo
2. **Hero** - Bold introduction with stats and badges
3. **Services** - 6 service cards with gradient backgrounds
4. **My Works** - Animated 3D folder cards showcasing projects
5. **Contact** - Social links and contact information

## 🔐 Admin Panel

### Access URLs

- **Login**: `http://localhost:5173/admin/login`
- **Dashboard**: `http://localhost:5173/admin/dashboard`
- **Folders**: `http://localhost:5173/admin/folders`
- **Videos**: `http://localhost:5173/admin/videos/:folderId`

### Features

#### 📊 Dashboard

- View total folders and videos
- Quick navigation to manage content
- Real-time statistics from Firestore

#### 📁 Folder Management

- Create new project folders
- Edit folder names
- Delete folders (with confirmation)
- View video count per folder
- Click folder to manage its videos

#### 🎥 Video Management

- Add videos to specific folders
- Upload custom thumbnail images (max 5MB)
- Paste Google Drive shareable links
- Edit video details and thumbnails
- Delete videos with confirmation
- Drag-and-drop thumbnail upload

## 🎬 Video Workflow

1. **Upload Video to Google Drive**

   - Create a folder in Google Drive
   - Upload your video
   - Right-click → Share → "Anyone with the link"
   - Copy the shareable link

2. **Add to Admin Panel**

   - Login to admin panel
   - Go to Folders → Click your folder
   - Click "Add Video"
   - Enter title
   - Paste Google Drive link
   - Upload thumbnail image
   - Click "Add Video"

3. **Display on Portfolio**
   - Video automatically appears in MyWorks section
   - Thumbnail displays in folder card
   - Click to view in lightbox

## 📁 Project Structure

```
src/
├── components/           # Portfolio components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── MyWorks.jsx      # Displays folders
│   ├── FileCard.jsx     # 3D folder animation
│   ├── Contact.jsx
│   └── Lightbox.jsx     # Video player
├── admin/               # Admin panel
│   ├── pages/
│   │   ├── Login.jsx    # Authentication
│   │   ├── Dashboard.jsx # Stats overview
│   │   ├── Folders.jsx   # Folder CRUD
│   │   └── Videos.jsx    # Video CRUD
│   └── components/
│       ├── AdminLayout.jsx    # Sidebar layout
│       └── ProtectedRoute.jsx # Auth guard
├── config/
│   └── firebase.js      # Firebase configuration
├── context/
│   └── AuthContext.jsx  # Auth state management
├── data/
│   └── videoData.js     # (Legacy - replaced by Firebase)
├── App.jsx              # Router configuration
└── index.css            # Global styles
```

## 🎨 Customization

### Update Personal Info

- **Hero**: `src/components/Hero.jsx` - Name, title, description
- **Navbar**: `src/components/Navbar.jsx` - Logo text
- **Contact**: `src/components/Contact.jsx` - Email and social links
- **Services**: `src/components/Services.jsx` - Service offerings

### Modify Colors & Styling

- **Tailwind Config**: `tailwind.config.js`
- **Global Styles**: `src/index.css`
- **Component Styles**: Individual component files

### Customize Admin Panel

- **Login Page**: `src/admin/pages/Login.jsx`
- **Dashboard Stats**: `src/admin/pages/Dashboard.jsx`
- **Folder UI**: `src/admin/pages/Folders.jsx`
- **Video UI**: `src/admin/pages/Videos.jsx`

## 🔒 Security

### Firestore Rules (Production)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /folders/{folderId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /videos/{videoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules (Production)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /thumbnails/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null &&
                    request.resource.size < 5 * 1024 * 1024 &&
                    request.resource.contentType.matches('image/.*');
    }
  }
}
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# - Firebase config values (optional - can be in code for frontend)
```

### Netlify

```bash
# Build
npm run build

# Upload dist/ folder to Netlify
# Configure redirects for React Router
```

**Create `_redirects` file in `public/`:**

```
/*    /index.html   200
```

### Firebase Hosting (Alternative)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize hosting
firebase init hosting

# Deploy
firebase deploy
```

## 🛠️ Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Lint code
```

## 🆘 Troubleshooting

### Admin Login Not Working

- Check Firebase Authentication is enabled
- Verify user account exists in Firebase Console
- Check browser console for errors

### Videos Not Displaying

- Ensure Firestore has folders and videos collections
- Check security rules allow public read access
- Verify Google Drive links are set to "Anyone with the link"

### Thumbnail Upload Fails

- Check file size is under 5MB
- Ensure file is an image format (jpg, png, etc.)
- Verify Firebase Storage is enabled

### Build Errors

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (v18+ recommended)

## 📚 Documentation

- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Complete Firebase configuration guide
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Initial project setup
- **[DESIGN_FEATURES.md](./DESIGN_FEATURES.md)** - Design system documentation

## 🎯 Roadmap

- [ ] Connect MyWorks to Firebase (fetch folders dynamically)
- [ ] Video search and filtering in admin panel
- [ ] Bulk video upload
- [ ] Video categories/tags
- [ ] Analytics dashboard
- [ ] Dark/Light theme toggle

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using React + Vite + Tailwind CSS + Framer Motion + Firebase**

**Admin Panel**: Secure, fast, and easy to use - manage your portfolio content in seconds!
#   S u h a i b - B a d r a n - P o r t f o l i o  
 