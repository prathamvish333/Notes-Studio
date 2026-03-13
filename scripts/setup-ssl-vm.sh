#!/bin/bash
# SSL Setup for Notes-Studio Standalone VM (Multi-Domain)

set -e

# Configuration
DOMAIN="prathamvishwakarma.com"
WWW_DOMAIN="www.prathamvishwakarma.com"
API_DOMAIN="api.prathamvishwakarma.com"
EMAIL="vpkpratham@gmail.com"

echo ">> Installing Nginx and Certbot..."
sudo apt-get update
sudo apt-get install nginx certbot python3-certbot-nginx -y

echo ">> Creating Nginx configuration for Frontend and Backend..."
cat <<EOF | sudo tee /etc/nginx/sites-available/notes-studio
# Frontend Configuration
server {
    listen 80;
    server_name ${DOMAIN} ${WWW_DOMAIN};
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name ${DOMAIN} ${WWW_DOMAIN};

    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;

    location / {
        proxy_pass http://localhost:30000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

# Backend (API)
server {
    listen 80;
    server_name api.prathamvishwakarma.com;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name api.prathamvishwakarma.com;

    ssl_certificate /etc/letsencrypt/live/api.prathamvishwakarma.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.prathamvishwakarma.com/privkey.pem;

    location / {
        proxy_pass http://localhost:30008;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

# Jenkins
server {
    listen 80;
    server_name jenkins.prathamvishwakarma.com;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name jenkins.prathamvishwakarma.com;

    ssl_certificate /etc/letsencrypt/live/jenkins.prathamvishwakarma.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jenkins.prathamvishwakarma.com/privkey.pem;

    location / {
        proxy_pass http://localhost:30080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

# Grafana
server {
    listen 80;
    server_name grafana.prathamvishwakarma.com;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name grafana.prathamvishwakarma.com;

    ssl_certificate /etc/letsencrypt/live/grafana.prathamvishwakarma.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/grafana.prathamvishwakarma.com/privkey.pem;

    location / {
        proxy_pass http://localhost:30001;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

# Prometheus
server {
    listen 80;
    server_name prometheus.prathamvishwakarma.com;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name prometheus.prathamvishwakarma.com;

    ssl_certificate /etc/letsencrypt/live/prometheus.prathamvishwakarma.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/prometheus.prathamvishwakarma.com/privkey.pem;

    location / {
        proxy_pass http://localhost:30090;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/notes-studio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

echo ">> Testing Nginx configuration..."
sudo nginx -t

echo ">> Restarting Nginx..."
sudo systemctl restart nginx

echo ">> Requesting SSL Certificates (Let's Encrypt)..."
# IMPORTANT: All domains must point to this VM's IP in DNS before running this!
sudo certbot --nginx -d ${DOMAIN} -d ${WWW_DOMAIN} -d ${API_DOMAIN} --non-interactive --agree-tos -m ${EMAIL} --redirect

echo ">> SUCCESS!"
echo ">> Frontend: https://${DOMAIN}"
echo ">> Backend API: https://${API_DOMAIN}"
