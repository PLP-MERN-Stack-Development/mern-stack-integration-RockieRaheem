#!/bin/bash

echo "=========================================="
echo "MongoDB Installation Script for Ubuntu"
echo "=========================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run with sudo: sudo bash install-mongodb.sh"
    exit 1
fi

echo "Step 1: Importing MongoDB public GPG key..."
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

echo ""
echo "Step 2: Adding MongoDB repository..."
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   tee /etc/apt/sources.list.d/mongodb-org-7.0.list

echo ""
echo "Step 3: Updating package database..."
apt-get update

echo ""
echo "Step 4: Installing MongoDB..."
apt-get install -y mongodb-org

echo ""
echo "Step 5: Starting MongoDB..."
systemctl start mongod

echo ""
echo "Step 6: Enabling MongoDB to start on boot..."
systemctl enable mongod

echo ""
echo "=========================================="
echo "MongoDB Installation Complete!"
echo "=========================================="
echo ""
echo "Checking MongoDB status..."
systemctl status mongod --no-pager

echo ""
echo "✅ MongoDB is now installed and running!"
echo ""
echo "Next steps:"
echo "1. Go to server directory: cd server"
echo "2. Start the server: npm run dev"
echo "3. In another terminal, start the client: cd client && npm run dev"
