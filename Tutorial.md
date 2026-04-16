# Academic Website Deployment Tutorial on Alibaba Cloud

This comprehensive tutorial will guide you through deploying a modern personal academic website on your Alibaba Cloud lightweight server with a custom domain name.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Server Preparation](#server-preparation)
3. [Domain Configuration](#domain-configuration)
4. [Website Setup](#website-setup)
5. [Deployment](#deployment)
6. [SSL Certificate Setup](#ssl-certificate-setup)
7. [Process Management with PM2](#process-management-with-pm2)
8. [Nginx Configuration](#nginx-configuration)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- An Alibaba Cloud account with a lightweight server (ECS)
- A registered domain name
- SSH access to your server
- Basic knowledge of command line operations

### Required Software on Your Local Machine

- Git (for cloning/uploading code)
- SSH client (Terminal, PuTTY, or similar)
- Text editor (VS Code recommended)

---

## Server Preparation

### Step 1: Connect to Your Server

```bash
# Replace with your server IP and username
ssh root@your.server.ip.address

# Or if using a different user
ssh username@your.server.ip.address
```

### Step 2: Update System Packages

```bash
# For CentOS/Alibaba Cloud Linux
sudo yum update -y

# For Ubuntu/Debian
sudo apt update && sudo apt upgrade -y
```

### Step 3: Install Node.js (version 18 or higher)

#### For CentOS/Alibaba Cloud Linux:

```bash
# Install Node.js using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Or install directly from NodeSource
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

#### For Ubuntu/Debian:

```bash
# Install Node.js using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Or install directly from NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 4: Verify Installation

```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

### Step 5: Install Nginx

```bash
# CentOS/Alibaba Cloud Linux
sudo yum install -y nginx

# Ubuntu/Debian
sudo apt install -y nginx
```

### Step 6: Start and Enable Nginx

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

---

## Domain Configuration

### Step 1: Configure DNS on Alibaba Cloud

1. Log in to [Alibaba Cloud DNS Console](https://dns.console.aliyun.com/)
2. Find your domain and click "Configure"
3. Add the following DNS records:

| Type | Host Record | Record Value | TTL |
|------|-------------|--------------|-----|
| A    | @           | Your server IP | 600 |
| A    | www         | Your server IP | 600 |

### Step 2: Verify DNS Propagation

```bash
# On your local machine
ping yourdomain.com
ping www.yourdomain.com
```

DNS propagation may take 10 minutes to 48 hours.

---

## Website Setup

### Step 1: Upload Code to Server

#### Option A: Using SCP/SFTP

```bash
# On your local machine, navigate to your project directory
cd /path/to/PersonalWeb

# Compress the project (excluding node_modules)
tar -czf personalweb.tar.gz --exclude=node_modules --exclude=.next .

# Upload to server
scp personalweb.tar.gz root@your.server.ip:/root/

# Or using specific folder
scp -r PersonalWeb/* root@your.server.ip:/root/personalweb/
```

#### Option B: Using Git (Recommended)

```bash
# On the server
cd /root
git clone https://github.com/yourusername/your-repo.git personalweb
# Or upload your code to a GitHub repo and clone it

# If you have the code locally, create a repo first:
# 1. Go to github.com and create a new repository
# 2. On your local machine:
cd /path/to/PersonalWeb
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main

# Then on the server:
cd /root
git clone https://github.com/yourusername/your-repo.git personalweb
```

#### Option C: Direct SFTP with FileZilla or WinSCP

1. Connect to your server using SFTP protocol
2. Navigate to `/root/` or `/var/www/`
3. Create a folder `personalweb`
4. Upload all project files (excluding node_modules)

### Step 2: Install Dependencies and Build

```bash
# Navigate to project directory
cd /root/personalweb

# Install dependencies
npm install

# Build the project for production
npm run build
```

---

## Deployment

### Step 1: Install PM2 (Process Manager)

PM2 keeps your Node.js application running forever and automatically restarts it on server reboot.

```bash
# Install PM2 globally
npm install -g pm2

# Verify installation
pm2 --version
```

### Step 2: Create PM2 Configuration

Create a file named `ecosystem.config.js` in your project root:

```javascript
module.exports = {
  apps: [{
    name: 'academic-website',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    cwd: '/root/personalweb',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

### Step 3: Start the Application with PM2

```bash
# Start the application
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs academic-website

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the command output - copy and paste the generated command

---add by xiao
[PM2] Freeze a process list on reboot via:
pm2 save

[PM2] Remove init script via:
pm2 unstartup systemd
---
```

### Step 4: Verify Application is Running

```bash
# Check if the app is listening on port 3000
netstat -tlnp | grep 3000

# Or using curl
curl http://localhost:3000
```

---

## SSL Certificate Setup

### Step 1: Install Certbot

```bash
# CentOS/Alibaba Cloud Linux
sudo yum install -y epel-release
sudo yum install -y certbot python3-certbot-nginx

# Ubuntu/Debian
sudo apt install -y certbot python3-certbot-nginx
```

### Step 2: Obtain SSL Certificate

```bash
# Replace with your actual domain name
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts:
# 1. Enter your email address
# 2. Agree to terms of service
# 3. Choose whether to redirect HTTP to HTTPS (recommended: Yes, option 2)
```

### Step 3: Setup Auto-Renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot automatically sets up a cron job or systemd timer
# Verify it exists
systemctl list-timers | grep certbot
# Or check cron
crontab -l
```

---

## Nginx Configuration

### Step 1: Create Nginx Configuration File

```bash
# Create configuration file for your site
sudo nano /etc/nginx/conf.d/personalwebsite.conf
```

Add the following configuration:

```nginx
# HTTP Server - Redirect to HTTPS
server {
    listen 80;
    server_name liuxiao.email www.liuxiao.email;

    # Let Certbot handle the redirect
    # location / {
    #     return 301 https://$server_name$request_uri;
    # }
}

# HTTPS Server
server {
    listen 443 ssl http2;
    server_name liuxiao.email www.liuxiao.email;

    # SSL Certificate (configured by Certbot)
    ssl_certificate /etc/letsencrypt/live/liuxiao.email/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/liuxiao.email/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Logging
    access_log /var/log/nginx/personalwebsite_access.log;
    error_log /var/log/nginx/personalwebsite_error.log;

    # Proxy to Next.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
}
```

### Step 2: Test and Restart Nginx

```bash
# Test configuration for syntax errors
sudo nginx -t

# If test is successful, restart Nginx
sudo systemctl restart nginx

# Check Nginx status
sudo systemctl status nginx
```

### Step 3: Configure Firewall

```bash
# For firewalld (CentOS/Alibaba Cloud Linux)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload

# For ufw (Ubuntu/Debian)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
sudo ufw enable

sudo apt -y install ufw
sudo ufw status

```

### Step 4: Configure Alibaba Cloud Security Group

1. Go to [ECS Console](https://ecs.console.aliyun.com/)
2. Select your instance → Security Groups
3. Configure Inbound Rules:

| Rule | Protocol | Port Range | Source |
|------|----------|------------|--------|
| HTTP | TCP | 80/80 | 0.0.0.0/0 |
| HTTPS | TCP | 443/443 | 0.0.0.0/0 |
| Custom TCP | TCP | 3000/3000 | 127.0.0.1 (optional, for local testing) |

---

## Final Verification

### Step 1: Test Your Website

```bash
# On the server
curl -I http://localhost:3000
curl -I https://yourdomain.com
```

### Step 2: Access in Browser

Open your browser and navigate to:
- `https://yourdomain.com`
- `https://www.yourdomain.com`

### Step 3: Check SSL Certificate

Visit [SSL Checker](https://www.ssllabs.com/ssltest/) to verify your SSL installation.

---

## Updating Your Website

When you need to update your website:

```bash
# SSH into your server
ssh admin@47.109.186.200

# Navigate to project directory
cd /root/personalweb

# Pull latest changes (if using Git)
git pull origin main

# Or upload new files manually

# Install new dependencies (if package.json changed)
npm install

# Rebuild the application
npm run build

# Restart PM2 process
pm2 restart academic-website

# Or if ecosystem.config.js changed
pm2 reload ecosystem.config.js
```

---

## Troubleshooting

### cloudfare
https://dash.cloudflare.com/e13499105594e0308be0691cbf442359/tunnels/94b3d588-243e-4812-857d-dba6a44040a7/overview

Name: liuxiao-tunnel

Tunnel ID: 94b3d588-243e-4812-857d-dba6a44040a7

```aiignore
/etc/cloudflared/config.yml

tunnel: 94b3d588-243e-4812-857d-dba6a44040a7
credentials-file: /etc/cloudflared/94b3d588-243e-4812-857d-dba6a44040a7.json

no-quic: true
protocol: http2
edge-ip-version: "4"


ingress:
  - hostname: liuxiao.email
    service: http://127.0.0.1:3000
  - hostname: www.liuxiao.email
    service: http://127.0.0.1:3000
  - service: http_status:404

sudo cat /etc/cloudflared/94b3d588-243e-4812-857d-dba6a44040a7.json
{"AccountTag":"e13499105594e0308be0691cbf442359","TunnelSecret":"t7SN8K9FIirr5gjGc6vDDRapknBmYAaFRh8s5u7JdZI=","TunnelID":"94b3d588-243e-4812-857d-dba6a44040a7","Endpoint":""}
```
后台运行 cloudflared tunnel
```aiignore
/etc/systemd/system/cloudflared.service

[Unit]
Description=cloudflared
After=network-online.target
Wants=network-online.target

[Service]
TimeoutStartSec=15
Type=notify
ExecStart=/usr/bin/cloudflared --no-autoupdate --config /etc/cloudflared/config.yml --no-quic --protocol http2 tunnel run 
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target

命令：
sudo systemctl daemon-reexec
sudo systemctl enable cloudflared
sudo systemctl start cloudflared

重启：
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl restart cloudflared

查看状态
sudo systemctl status cloudflared
```

sudo nano /etc/nginx/conf.d/liuxiao.conf

sudo nginx -t

sudo systemctl restart nginx
```aiignore

server {
    listen 80;
    server_name liuxiao.email www.liuxiao.email;

    # 强制 HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name liuxiao.email www.liuxiao.email;

    ssl_certificate     /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Cloudflare真实IP
    real_ip_header CF-Connecting-IP;

    # 防止IP伪造（可选）
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;

    location / {
        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_read_timeout 60s;
    }
}
```



### Issue 1: Website Not Loading

```bash
# Check if Nginx is running
sudo systemctl status nginx

# Check if PM2 app is running
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check PM2 logs
pm2 logs academic-website
```

### Issue 2: SSL Certificate Not Working

```bash
# Check if Certbot obtained certificate
sudo certbot certificates

# Renew manually
sudo certbot renew

# Check Nginx SSL configuration
sudo nginx -t
```

### Issue 3: Port 3000 Already in Use

```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process if needed
sudo kill -9 <PID>

# Then restart PM2
pm2 restart academic-website
```

### Issue 4: Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Issue 5: PM2 Not Starting on Boot

```bash
# Re-setup PM2 startup
pm2 unstartup
pm2 startup
# Follow instructions
pm2 save
```

---

## Useful PM2 Commands

```bash
# Start application
pm2 start ecosystem.config.js

# Stop application
pm2 stop academic-website

# Restart application
pm2 restart academic-website

# Delete application
pm2 delete academic-website

# View logs
pm2 logs academic-website

# Monitor in real-time
pm2 monit

# List all applications
pm2 list

# Display application details
pm2 show academic-website

# Reset restart counter
pm2 reset academic-website
```

---

## Useful Nginx Commands

```bash
# Start Nginx
sudo systemctl start nginx

# Stop Nginx
sudo systemctl stop nginx

# Restart Nginx
sudo systemctl restart nginx

# Reload configuration (no downtime)
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx

# Test configuration
sudo nginx -t
```

---

## Security Best Practices

1. **Use SSH Keys**: Disable password authentication and use SSH keys only

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Set these values:
PasswordAuthentication no
PubkeyAuthentication yes

# Restart SSH
sudo systemctl restart sshd
```

2. **Create a Non-Root User**: Run your application with limited permissions

```bash
# Create user
adduser webmaster
usermod -aG wheel webmaster

# Switch to this user for running PM2
su - webmaster
```

3. **Keep Software Updated**

```bash
# Regular updates
sudo yum update -y
# or
sudo apt update && sudo apt upgrade -y
```

4. **Set Up Fail2Ban**: Protect against brute force attacks

```bash
# Install
sudo yum install -y fail2ban
# or
sudo apt install -y fail2ban

# Enable and start
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## Conclusion

Your academic website should now be live at your domain name with HTTPS enabled! The website features:

- Modern, responsive design
- Smooth animations with Framer Motion
- Multiple sections: Profile, News, Publications, Honors, Education, Communications
- Professional appearance suitable for academic use

For any issues or questions, refer to the Troubleshooting section above or check the official documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs)
- [Alibaba Cloud Documentation](https://www.alibabacloud.com/help/en)
