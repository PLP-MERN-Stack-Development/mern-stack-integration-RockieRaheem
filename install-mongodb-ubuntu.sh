#!/bin/bash

echo "=========================================="
echo "MongoDB 7.0 Installation for Ubuntu"
echo "=========================================="
echo ""

# Check if running with sudo
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Please run with sudo:"
    echo "   sudo bash install-mongodb-ubuntu.sh"
    exit 1
fi

echo "📦 Step 1: Installing required packages..."
apt-get install -y gnupg curl

echo ""
echo "🔑 Step 2: Importing MongoDB public GPG key..."
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

echo ""
echo "📝 Step 3: Adding MongoDB repository..."
# Detect Ubuntu version
UBUNTU_VERSION=$(lsb_release -cs)
echo "Detected Ubuntu version: $UBUNTU_VERSION"

# For Ubuntu 22.04 (Jammy) and newer
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   tee /etc/apt/sources.list.d/mongodb-org-7.0.list

echo ""
echo "🔄 Step 4: Updating package database..."
apt-get update

echo ""
echo "⬇️  Step 5: Installing MongoDB 7.0..."
apt-get install -y mongodb-org

echo ""
echo "🚀 Step 6: Starting MongoDB service..."
systemctl start mongod

echo ""
echo "✅ Step 7: Enabling MongoDB to start on boot..."
systemctl enable mongod

echo ""
echo "=========================================="
echo "✅ MongoDB Installation Complete!"
echo "=========================================="
echo ""

# Check status
echo "📊 Checking MongoDB status..."
systemctl status mongod --no-pager -l

echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo ""
echo "1. Verify MongoDB is running:"
echo "   sudo systemctl status mongod"
echo ""
echo "2. Test MongoDB connection:"
echo "   mongosh"
echo "   (Type 'exit' to quit)"
echo ""
echo "3. Start your backend server:"
echo "   cd server"
echo "   npm run dev"
echo ""
echo "4. You should see: 'Connected to MongoDB' ✅"
echo ""
echo "=========================================="
echo "MongoDB is now running on: mongodb://localhost:27017"
echo "=========================================="

