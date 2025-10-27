# 🚀 Quick Start Guide - MERN Blog Application

## ⚠️ IMPORTANT: You Need MongoDB First!

The server cannot start without MongoDB. Choose ONE option:

---

## 🌟 RECOMMENDED: MongoDB Atlas (Free Cloud Database)

**Fastest way to get started - No installation needed!**

### Steps (5 minutes):

1. **Go to**: https://www.mongodb.com/cloud/atlas/register
2. **Sign up** for free account
3. **Create free cluster** (M0 - FREE tier)
4. **Create database user**:
   - Username: `mernbloguser`
   - Password: (create a strong one)
   - Role: Read and write to any database
5. **Network Access**: Allow access from anywhere (for development)
6. **Get connection string**:
   - Click "Connect" → "Connect your application"
   - Copy the string (looks like):
     ```
     mongodb+srv://mernbloguser:<password>@cluster0.xxxxx.mongodb.net/
     ```
7. **Update `server/.env` file**:
   ```env
   MONGODB_URI=mongodb+srv://mernbloguser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mern-blog?retryWrites=true&w=majority
   ```
   Replace `YOUR_PASSWORD` and cluster URL with your actual values

✅ **Done!** Now you can start the servers.

---

## 🖥️ OR: Install MongoDB Locally

### For Ubuntu/Debian:

```bash
# Run the installation script (from project root)
sudo bash install-mongodb.sh
```

### Manual Installation:

See detailed instructions in `MONGODB_SETUP.md`

---

## 🎬 Start the Application

Once MongoDB is ready:

### Terminal 1 - Start Backend:

```bash
cd server
npm run dev
```

**Expected output:**

```
Connected to MongoDB
Server running on port 5000
```

### Terminal 2 - Start Frontend:

```bash
cd client
npm run dev
```

**Expected output:**

```
Local: http://localhost:3000
```

---

## 🎯 First Time Setup

### 1. Open Browser

Go to: **http://localhost:3000**

### 2. Register Account

- Click "Register"
- Create your account

### 3. Create Categories (Required for posts)

**Option A: Using MongoDB Compass/Atlas UI**

1. Connect to your database
2. Select `mern-blog` database
3. Create `categories` collection
4. Insert documents:

```json
[
  {
    "name": "Technology",
    "slug": "technology",
    "description": "Tech posts",
    "createdBy": ObjectId("YOUR_USER_ID"),
    "createdAt": ISODate(),
    "updatedAt": ISODate()
  },
  {
    "name": "Travel",
    "slug": "travel",
    "description": "Travel stories",
    "createdBy": ObjectId("YOUR_USER_ID"),
    "createdAt": ISODate(),
    "updatedAt": ISODate()
  }
]
```

**Option B: Using Postman/Thunder Client**

First, make yourself admin:

```javascript
// In MongoDB, update your user:
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
);
```

Then create categories via API:

```http
POST http://localhost:5000/api/categories
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Technology",
  "description": "Tech related posts"
}
```

### 4. Create Your First Post

- Login to the app
- Click "Create Post"
- Fill in the form
- Select a category
- Upload image (optional)
- Click "Create Post"

---

## 🎮 Usage Guide

### User Actions:

- ✅ Register and login
- ✅ View all posts
- ✅ Read post details
- ✅ Add comments (when logged in)
- ✅ Create new posts (when logged in)
- ✅ Edit your own posts
- ✅ Delete your own posts
- ✅ Filter by category
- ✅ Search posts
- ✅ Navigate with pagination

### Admin Actions:

- ✅ All user actions
- ✅ Create categories
- ✅ Edit/delete any post

---

## 🔧 Troubleshooting

### "Failed to connect to MongoDB"

- ✅ Check MongoDB is running: `sudo systemctl status mongod`
- ✅ Verify MONGODB_URI in `server/.env`
- ✅ For Atlas: Check IP whitelist and password

### "Port 5000 already in use"

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### "Port 3000 already in use"

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Can't create posts: "Category required"

- You need to create categories first (see step 3 above)

### Images not uploading

- Check `server/uploads/` directory exists
- Check file size (max 5MB)
- Only image files allowed (jpg, png, gif, webp)

---

## 📚 Documentation

- **Full Documentation**: `README.md`
- **MongoDB Setup**: `MONGODB_SETUP.md`
- **Detailed Setup**: `SETUP.md`
- **Project Status**: `PROJECT_COMPLETE.md`

---

## ✅ Quick Test

1. ✅ Can register a user
2. ✅ Can login
3. ✅ Can create a post (after creating categories)
4. ✅ Can view posts on home page
5. ✅ Can view single post
6. ✅ Can add comment
7. ✅ Can edit own post
8. ✅ Can delete own post
9. ✅ Can filter by category
10. ✅ Can logout

---

## 🎉 You're Ready!

Everything is set up and ready to go. Just need to:

1. **Setup MongoDB** (Atlas recommended)
2. **Start both servers**
3. **Register and start blogging!**

**Happy coding! 🚀**
