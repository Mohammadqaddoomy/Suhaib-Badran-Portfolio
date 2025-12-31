# 🚀 Supabase Setup Guide

Quick and easy setup for your portfolio admin panel with Supabase!

## Why Supabase?

✅ **Easier than Firebase** - More intuitive UI  
✅ **Better free tier** - 500MB database, 1GB file storage  
✅ **PostgreSQL** - Industry-standard SQL database  
✅ **Built-in auth** - Email/password with one click  
✅ **Auto-generated API** - No backend code needed

---

## Step 1: Create Supabase Project (3 minutes)

1. Go to [supabase.com](https://supabase.com)
2. Click **Start your project** → Sign in with GitHub
3. Click **New project**
4. Fill in:
   - **Name**: `portfolio-admin`
   - **Database Password**: (generate a strong one - save it!)
   - **Region**: Choose closest to you
5. Click **Create new project**
6. Wait ~2 minutes for setup to complete

---

## Step 2: Get API Credentials (1 minute)

1. In your project, go to **Settings** (gear icon) → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string under "Project API keys")

---

## Step 3: Create Environment File

Create a file `.env` in your project root:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from Step 2.

**OR** update `src/config/firebase.js` directly:

```javascript
const supabaseUrl = "https://your-project.supabase.co";
const supabaseAnonKey = "your-anon-key-here";
```

---

## Step 4: Create Database Tables (2 minutes)

1. Go to **SQL Editor** in Supabase dashboard
2. Click **New query**
3. Paste this SQL:

```sql
-- Create folders table
CREATE TABLE folders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create videos table
CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  folder_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on folders"
  ON folders FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Allow public read access on videos"
  ON videos FOR SELECT
  TO PUBLIC
  USING (true);

-- Allow authenticated users to manage everything
CREATE POLICY "Allow authenticated insert on folders"
  ON folders FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on folders"
  ON folders FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on folders"
  ON folders FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on videos"
  ON videos FOR DELETE
  TO authenticated
  USING (true);
```

4. Click **Run** (or press `Ctrl + Enter`)
5. Should see "Success. No rows returned"

---

## Step 5: Enable Authentication (1 minute)

1. Go to **Authentication** → **Providers**
2. **Email** should already be enabled (it's on by default)
3. If not, toggle it on and click **Save**

---

## Step 6: Create Storage Bucket (2 minutes)

1. Go to **Storage**
2. Click **New bucket**
3. Name it: `thumbnails`
4. Make it **Public** (toggle on)
5. Click **Create bucket**

### Set Storage Policy

1. Click on the `thumbnails` bucket
2. Go to **Policies** tab
3. Click **New policy** → **For full customization**
4. Paste this:

```sql
-- Allow public read
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'thumbnails');

-- Allow authenticated upload
CREATE POLICY "Authenticated upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'thumbnails');

-- Allow authenticated delete
CREATE POLICY "Authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'thumbnails');
```

5. Click **Review** → **Save policy**

---

## Step 7: Create Admin User (1 minute)

1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter:
   - **Email**: `your-email@example.com`
   - **Password**: `YourSecurePassword123`
4. Toggle **Auto Confirm User** ON
5. Click **Create user**

---

## Step 8: Test Your Admin Panel! 🎉

1. Start dev server: `npm run dev`
2. Go to: `http://localhost:5173/admin/login`
3. Login with your credentials from Step 7
4. You should see the dashboard!

---

## Step 9: Add Test Data (Optional)

Let's add a sample folder and video:

### Add a Folder

1. Go to **Folders** page in admin
2. Click **Add Folder**
3. Enter name: "Video Graphics"
4. Click **Add**

### Add a Video

1. Upload a video to Google Drive
2. Right-click → Share → "Anyone with the link"
3. Copy the link
4. In admin, click the folder you just created
5. Click **Add Video**
6. Fill in:
   - **Title**: "Sample Video"
   - **Google Drive Link**: (paste your link)
   - **Thumbnail**: Upload an image from your computer
7. Click **Add Video**

---

## 🎯 Quick Reference

### Database Tables

**folders**

- `id` - UUID (auto-generated)
- `name` - Folder name
- `order` - Display order
- `created_at` - Timestamp

**videos**

- `id` - UUID (auto-generated)
- `folder_id` - Reference to folder
- `title` - Video title
- `video_url` - Google Drive link
- `thumbnail_url` - Supabase Storage URL
- `order` - Display order
- `created_at` - Timestamp

### Storage Buckets

**thumbnails** - Stores uploaded thumbnail images (public access)

---

## 🔒 Security

- ✅ Row Level Security (RLS) enabled
- ✅ Public can only READ data
- ✅ Only authenticated users can INSERT/UPDATE/DELETE
- ✅ Thumbnails bucket is public for image display

---

## 🆘 Troubleshooting

### Can't login?

- Check user exists in Authentication → Users
- Verify "Auto Confirm User" was toggled ON
- Check browser console for errors

### Tables not created?

- Go to Database → Tables
- Should see `folders` and `videos`
- If not, re-run the SQL from Step 4

### Thumbnail upload fails?

- Verify `thumbnails` bucket exists
- Check it's set to Public
- Verify storage policies are created

### "Row Level Security" error?

- Run the RLS policies SQL again
- Make sure you're logged in as authenticated user

---

## 🚀 Deployment

When deploying to production:

1. Add your production domain to **Authentication → URL Configuration → Site URL**
2. Environment variables in your hosting platform:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

## 📚 Useful Links

- **Supabase Docs**: https://supabase.com/docs
- **SQL Reference**: https://supabase.com/docs/guides/database
- **Storage Guide**: https://supabase.com/docs/guides/storage

---

**Total Setup Time: ~10 minutes** ⏱️

**Difficulty: Super Easy** 🟢

You're all set! Start managing your portfolio content! 🎉
