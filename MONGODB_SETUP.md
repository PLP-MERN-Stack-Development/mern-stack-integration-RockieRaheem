# MongoDB Installation Guide

MongoDB is not currently installed on your system. Here are your options:

## Option 1: Install MongoDB Locally (Recommended for Development)

### For Ubuntu/Debian:

```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

### For other Linux distributions:

Visit: https://www.mongodb.com/docs/manual/administration/install-on-linux/

## Option 2: Use MongoDB Atlas (Free Cloud Database) - EASIEST

This is the quickest way to get started without installing MongoDB locally.

### Steps:

1. **Create Account**

   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for a free account

2. **Create Cluster**

   - Click "Build a Database"
   - Choose "FREE" (M0 Sandbox)
   - Select your preferred region
   - Click "Create Cluster"

3. **Create Database User**

   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `mernbloguser`
   - Password: Generate a secure password (save it!)
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**

   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your current IP address
   - Click "Confirm"

5. **Get Connection String**

   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://mernbloguser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update Your .env File**
   ```bash
   # Edit server/.env
   MONGODB_URI=mongodb+srv://mernbloguser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mern-blog?retryWrites=true&w=majority
   ```
   Replace:
   - `YOUR_PASSWORD` with your actual password
   - `cluster0.xxxxx` with your actual cluster URL
   - `/mern-blog` specifies the database name

## Option 3: Use Docker (If you have Docker installed)

```bash
# Run MongoDB in a Docker container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:7.0

# Connection string for Docker:
# mongodb://admin:password@localhost:27017/mern-blog?authSource=admin
```

## After MongoDB is Set Up

1. **Start the server again:**

   ```bash
   cd server
   npm run dev
   ```

2. **You should see:**

   ```
   Connected to MongoDB
   Server running on port 5000
   ```

3. **Start the client in another terminal:**

   ```bash
   cd client
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Verify MongoDB Connection

You can test the connection with this simple script:

```bash
# Create a test file
cat > test-mongo.js << 'EOF'
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  });
EOF

# Run the test
node test-mongo.js
```

## Recommended: Use MongoDB Atlas

For this assignment, I **strongly recommend using MongoDB Atlas** because:

- ✅ No installation required
- ✅ Free tier available
- ✅ Works immediately
- ✅ Cloud-based (accessible from anywhere)
- ✅ Automatic backups
- ✅ Easy to share with instructors

Just follow the MongoDB Atlas steps above and update your `server/.env` file with the connection string!

## Need Help?

If you encounter issues:

1. Make sure your IP is whitelisted in MongoDB Atlas
2. Check that your password doesn't contain special characters that need URL encoding
3. Verify the connection string format is correct
4. Check that your .env file is in the `server/` directory
