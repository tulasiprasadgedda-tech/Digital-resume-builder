#!/bin/bash

# ==========================================
# Digital Resume Builder Deployment Script
# Target API: AWS EC2 (Ubuntu LTS)
# ==========================================

# Exit script on any error
set -e

echo "Starting deployment of Digital Resume Builder..."

# 1. Update system dependencies
echo "Updating system dependencies..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl nginx git

# 2. Install Node.js & npm (Latest LTS)
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install PM2 globally
echo "Installing PM2 globally..."
sudo npm install -g pm2

# 4. Clone repository (Optional - assumes script is run inside the repo or clones it)
# Note: If running this manually, ensure you have cloned the repo. 
# We'll assume the script is executed from inside the cloned repository root.
REPO_DIR="/home/ubuntu/Digital-resume-builder"
if [ ! -d "$REPO_DIR" ]; then
    echo "Cloning repository..."
    git clone https://github.com/tulasiprasadgedda-tech/Digital-resume-builder.git "$REPO_DIR"
fi

cd "$REPO_DIR"

# 5. Setup Backend
echo "Setting up Backend..."
cd backend
npm install

# Check if .env exists, if not create a default one (USER SHOULD EDIT THIS MANUALLY LATER)
if [ ! -f .env ]; then
    echo "Creating backend .env..."
    cat <<EOT > .env
PORT=5000
MONGO_URI=mongodb://tulasiprasadgedda_db_user:teja2003@ac-j2miwze-shard-00-00.ds4b0ku.mongodb.net:27017,ac-j2miwze-shard-00-01.ds4b0ku.mongodb.net:27017,ac-j2miwze-shard-00-02.ds4b0ku.mongodb.net:27017/resumeBuilder?ssl=true&replicaSet=atlas-14izcc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=autoresume_pro_super_secret_key_2024_xk9m2p
NODE_ENV=production
EOT
fi

# Start Backend using PM2
echo "Starting backend via PM2..."
pm2 stop resume-backend || true
pm2 start server.js --name "resume-backend"

cd ..

# 6. Setup Frontend
echo "Setting up Frontend..."
cd frontend
npm install
npm run build

cd ..

# 7. Configure Nginx
echo "Configuring Nginx..."

# Nginx config file path
NGINX_CONF="/etc/nginx/sites-available/digital-resume"

sudo bash -c "cat > $NGINX_CONF" <<EOT
server {
    listen 80;
    server_name _; # Change this to your domain or Public IP

    # Serve React Frontend
    location / {
        root $REPO_DIR/frontend/dist;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }

    # Reverse Proxy for Node.js Backend
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOT

# Enable Nginx configuration
sudo ln -sf /etc/nginx/sites-available/digital-resume /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Restart Nginx
sudo systemctl restart nginx

# 8. Save PM2 state and configure startup
echo "Configuring PM2 startup..."
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
pm2 save

echo "=========================================="
echo "Deployment Complete!"
echo "Your application should now be accessible publicly at your EC2's IP address."
echo "Note: Ensure your AWS Security Group allows inbound traffic on port 80 (HTTP)."
echo "=========================================="
