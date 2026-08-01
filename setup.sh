#!/bin/bash
# UCS Admin Panel - Quick Start Script (Next.js Version)
# Run this script to set up everything locally

set -e

echo "🚀 Starting UCS Admin Panel (Next.js Version) setup..."
echo ""

# Setup environment
if [ ! -f .env ]; then
    echo "Creating .env file from backend/.env.example..."
    if [ -f backend/.env.example ]; then
        cp backend/.env.example .env
    else
        echo "PORT=3000" > .env
        echo "MONGODB_URI=mongodb://localhost:27017/ucs-admin" >> .env
        echo "JWT_SECRET=your_super_secret_key_change_in_production" >> .env
        echo "ADMIN_PASSWORD=admin123" >> .env
        echo "NODE_ENV=development" >> .env
    fi
    echo "✓ .env file created. Please edit it with your values:"
    echo "  - MONGODB_URI"
    echo "  - JWT_SECRET"
    echo "  - ADMIN_PASSWORD"
fi

echo "Installing dependencies..."
npm install
echo "✓ Dependencies installed"

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo ""
echo "1️⃣  Start the application in Development Mode:"
echo "   npm run dev"
echo ""
echo "2️⃣  Open browser:"
echo "   http://localhost:3000"
echo ""
echo "3️⃣  Admin Panel Access:"
echo "   http://localhost:3000/admin"
echo ""
echo "4️⃣  Default credentials:"
echo "   Password: admin123"
echo ""
