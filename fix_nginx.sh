#!/bin/bash
cat << 'CONFIG' > /tmp/prod_nginx.conf
# Frontend - Notes Studio (Production)
server {
    if ($host = www.prathamvishwakarma.com) {
        return 301 https://$host$request_uri;
    }
    if ($host = prathamvishwakarma.com) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    server_name prathamvishwakarma.com www.prathamvishwakarma.com;
    return 301 https://$host$request_uri;
}
server {
    listen 443 ssl;
    server_name prathamvishwakarma.com www.prathamvishwakarma.com;
    ssl_certificate /etc/letsencrypt/live/dev.prathamvishwakarma.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/dev.prathamvishwakarma.com/privkey.pem; # managed by Certbot

    # Notes Backend API routes
    location /auth/ {
        proxy_pass http://localhost:30108;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /notes {
        if ($http_accept ~* "application/json") {
            proxy_pass http://localhost:30108;
        }
        proxy_pass http://localhost:30100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /login {
        proxy_pass http://localhost:30100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /signup {
        proxy_pass http://localhost:30100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /settings {
        proxy_pass http://localhost:30100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /type {
        proxy_pass http://localhost:30100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /_next/ {
        set $target http://localhost:30002;
        if ($http_referer ~* "(prathamvishwakarma\.com/(notes|login|signup|settings|type))") {
            set $target http://localhost:30100;
        }
        proxy_pass $target;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://localhost:30002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
CONFIG

gcloud compute ssh ubuntu-focal-20260312-094432 --project=project-08109840-016d-4fa3-bf5 --zone=us-central1-a --command="sudo sed -i '/# Frontend - Notes Studio (Production)/,/# Portfolio + Notes Studio - Dev Subdomain/!b;//!d;/# Frontend - Notes Studio (Production)/r /tmp/prod_nginx.conf' /etc/nginx/sites-enabled/notes-studio"

