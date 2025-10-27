# MERN Blog Setup Guide

## Quick Start

Follow these steps to get the application running:

### 1. Prerequisites Check

Make sure you have:

- ✅ Node.js (v18+) installed - Check with: `node --version`
- ✅ MongoDB installed and running - Check with: `mongod --version`
- ✅ npm installed - Check with: `npm --version`

### 2. MongoDB Setup

#### Option A: Local MongoDB

```bash
# Start MongoDB (Linux/Mac)
sudo systemctl start mongodb
# or
sudo service mongod start

# Start MongoDB (Windows)
net start MongoDB
```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `server/.env` with your connection string

### 3. Server Setup

```bash
# Navigate to server directory
cd server

# Dependencies are already installed
# If not, run: npm install

# Start the server
npm run dev

# Server should be running at http://localhost:5000
```

### 4. Client Setup

```bash
# Open a new terminal
# Navigate to client directory
cd client

# Dependencies are already installed
# If not, run: npm install

# Start the development server
npm run dev

# Client should be running at http://localhost:3000
```

### 5. Create Initial Data

#### Option 1: Using MongoDB Compass or Mongo Shell

Connect to your database and create an admin user:

```javascript
use mern-blog

// Create admin user (password: admin123)
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  // Password is hashed version of "admin123"
  password: "$2a$10$YourHashedPasswordHere",
  role: "admin",
  avatar: "default-avatar.png",
  createdAt: new Date(),
  updatedAt: new Date()
})

// Create some categories
db.categories.insertMany([
  {
    name: "Technology",
    slug: "technology",
    description: "Tech related posts",
    createdBy: ObjectId("your-admin-user-id"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Travel",
    slug: "travel",
    description: "Travel stories and tips",
    createdBy: ObjectId("your-admin-user-id"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Food",
    slug: "food",
    description: "Food and recipes",
    createdBy: ObjectId("your-admin-user-id"),
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

#### Option 2: Using the Application

1. Open http://localhost:3000
2. Click "Register" and create a new account
3. Use MongoDB Compass to update the user's role to "admin"
4. Login with the admin account
5. Create categories using POST requests to `/api/categories` or directly in MongoDB

### 6. Test the Application

1. **Register a new user**

   - Navigate to http://localhost:3000/register
   - Fill in the form and register

2. **Login**

   - Navigate to http://localhost:3000/login
   - Login with your credentials

3. **Create a post**

   - Click "Create Post" in the navigation
   - Fill in the form
   - Upload an image (optional)
   - Submit the post

4. **View posts**

   - Go to home page
   - Click on a post to view details
   - Add comments

5. **Test filtering**
   - Filter posts by category
   - Use pagination

## Troubleshooting

### MongoDB Connection Issues

**Problem**: Cannot connect to MongoDB

**Solutions**:

- Check if MongoDB is running: `sudo systemctl status mongodb`
- Verify connection string in `server/.env`
- Check MongoDB logs for errors
- For Atlas: Check if IP address is whitelisted

### Port Already in Use

**Problem**: Port 5000 or 3000 already in use

**Solutions**:

```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change ports in .env files
```

### CORS Issues

**Problem**: CORS errors in browser console

**Solution**: Make sure the server is running and the proxy is configured correctly in `client/vite.config.js`

### Image Upload Issues

**Problem**: Images not uploading

**Solutions**:

- Check if `server/uploads` directory exists
- Verify file permissions
- Check file size (max 5MB)
- Ensure only image files are being uploaded

### Authentication Issues

**Problem**: "Not authorized" errors

**Solutions**:

- Make sure you're logged in
- Check if token is stored in localStorage
- Token might be expired - logout and login again
- Clear browser cache and localStorage

## API Testing with Postman/Thunder Client

### 1. Register User

```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Login

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

Copy the token from the response.

### 3. Create Category (Admin only)

```http
POST http://localhost:5000/api/categories
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Technology",
  "description": "Tech related posts"
}
```

### 4. Create Post

```http
POST http://localhost:5000/api/posts
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: multipart/form-data

title: My First Post
content: This is the content of my first post...
excerpt: A brief description
category: CATEGORY_ID_HERE
tags: ["javascript", "nodejs"]
isPublished: true
featuredImage: [select file]
```

### 5. Get All Posts

```http
GET http://localhost:5000/api/posts?page=1&limit=10
```

## Development Tips

### Hot Reload

Both client and server support hot reload:

- Client: Changes automatically refresh the browser
- Server: Using nodemon, changes automatically restart the server

### Environment Variables

- Never commit `.env` files to Git
- Use `.env.example` as a template
- Update production values in deployment

### File Structure

- Keep components small and focused
- Use custom hooks for reusable logic
- Keep API calls in services directory
- Use context for global state

## Production Deployment

### Prepare for Production

1. **Update environment variables**

   - Set NODE_ENV to "production"
   - Use production MongoDB URI
   - Generate strong JWT secret
   - Update CORS origins

2. **Build client**

   ```bash
   cd client
   npm run build
   ```

3. **Serve static files**
   Update `server/server.js` to serve the built client

4. **Deploy to platforms like**:
   - Heroku
   - Railway
   - Render
   - DigitalOcean
   - AWS

## Need Help?

- Check the [README.md](./README.md) for detailed documentation
- Review [Week4-Assignment.md](./Week4-Assignment.md) for requirements
- Check server logs for backend issues
- Check browser console for frontend issues

## Success Indicators

✅ Server running at http://localhost:5000
✅ Client running at http://localhost:3000
✅ MongoDB connected successfully
✅ Can register and login users
✅ Can create, read, update, delete posts
✅ Can add comments to posts
✅ Can filter posts by category
✅ Can upload images
✅ Authentication protecting routes correctly

Enjoy building with MERN! 🚀
