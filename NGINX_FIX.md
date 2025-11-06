# Quick Fix for MIME Type Error

## The Problem
Error: `Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/octet-stream"`

This happens when Nginx doesn't recognize JavaScript files as modules.

## Quick Solution

### Step 1: Make sure you built the project
```bash
npm run build
```

### Step 2: Update your Nginx configuration

Edit your Nginx config file (usually at `/etc/nginx/sites-available/task-manager` or `/etc/nginx/nginx.conf`):

```nginx
server {
    listen 80;
    server_name your-domain.com;  # or use _ for any domain
    root /var/www/task-manager/dist;  # Make sure this points to the 'dist' folder
    index index.html;

    # CRITICAL: Include MIME types and set JavaScript module types
    include /etc/nginx/mime.types;
    types {
        application/javascript js mjs;
        text/css css;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Ensure proper MIME types for assets
    location ~* \.(js|mjs)$ {
        add_header Content-Type application/javascript;
    }
}
```

### Step 3: Test and restart Nginx

```bash
# Test the configuration
sudo nginx -t

# If test passes, restart Nginx
sudo systemctl restart nginx
```

### Step 4: Clear browser cache
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or open in incognito/private mode

## Alternative: If using a different web server

### Apache (.htaccess)
Add to your `.htaccess` file in the `dist` folder:
```apache
AddType application/javascript js mjs
AddType text/css css
```

### Simple HTTP Server (Python)
If using Python's simple server, use:
```bash
python3 -m http.server 8000 --directory dist
```

### Node.js http-server
```bash
npx http-server dist -p 8080 --ext js
```

## Verify it's working

1. Check that files in `dist/assets/` have `.js` extension
2. Open browser DevTools → Network tab
3. Reload the page
4. Check that `.js` files have `Content-Type: application/javascript`

