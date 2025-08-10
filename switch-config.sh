#!/bin/bash

# Script to switch between GitHub Pages (github.io) and custom domain configuration

if [ "$1" = "custom-domain" ]; then
    echo "Configuring for custom domain (everythingsuckseverythingfucks.com)..."
    
    # Restore CNAME file
    if [ -f "public/CNAME.backup" ]; then
        mv public/CNAME.backup public/CNAME
        echo "✅ CNAME file restored"
    fi
    
    # Update next.config.ts for custom domain
    cat > next.config.ts << 'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // No basePath needed for custom domain
};

export default nextConfig;
EOF
    
    echo "✅ Next.js config updated for custom domain"
    
elif [ "$1" = "github-pages" ]; then
    echo "Configuring for GitHub Pages (cybeofficial.github.io/everythingsuckseverythingfucks)..."
    
    # Backup CNAME file
    if [ -f "public/CNAME" ]; then
        mv public/CNAME public/CNAME.backup
        echo "✅ CNAME file backed up"
    fi
    
    # Update next.config.ts for GitHub Pages
    cat > next.config.ts << 'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure for GitHub Pages deployment
  basePath: '/everythingsuckseverythingfucks',
  assetPrefix: '/everythingsuckseverythingfucks',
};

export default nextConfig;
EOF
    
    echo "✅ Next.js config updated for GitHub Pages"
    
else
    echo "Usage: ./switch-config.sh [custom-domain|github-pages]"
    echo ""
    echo "  custom-domain  - Configure for everythingsuckseverythingfucks.com"
    echo "  github-pages   - Configure for cybeofficial.github.io/everythingsuckseverythingfucks"
    exit 1
fi

echo ""
echo "🔄 Remember to run 'npm run build' and commit changes after switching!"
