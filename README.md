# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/bdfce2a0-a1dd-41ef-ba6d-3c29f86d570f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/bdfce2a0-a1dd-41ef-ba6d-3c29f86d570f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/bdfce2a0-a1dd-41ef-ba6d-3c29f86d570f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Deploying to a Server

### Prerequisites

1. **Node.js** (v18 or higher) and **npm** installed
2. **Supabase Project** - You'll need your Supabase URL and anon/public key
3. **Server access** (for traditional server deployment)

### Step 1: Environment Variables Setup

Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

**To get your Supabase credentials:**
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings > API
4. Copy the "Project URL" and "anon public" key

### Step 2: Build for Production

```sh
# Install dependencies
npm install

# Build the project for production
npm run build
```

This creates a `dist` folder with optimized production files.

### Deployment Options

#### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (optional, or use web interface):
   ```sh
   npm i -g vercel
   ```

2. **Deploy**:
   ```sh
   vercel
   ```
   Or connect your GitHub repo at [vercel.com](https://vercel.com)

3. **Add Environment Variables** in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`

#### Option 2: Deploy to Netlify

1. **Install Netlify CLI** (optional):
   ```sh
   npm i -g netlify-cli
   ```

2. **Build and deploy**:
   ```sh
   npm run build
   netlify deploy --prod --dir=dist
   ```
   Or connect your GitHub repo at [netlify.com](https://netlify.com)

3. **Add Environment Variables** in Netlify dashboard

#### Option 3: Deploy to Traditional Server (VPS/Cloud Server)

**Using Nginx (Recommended):**

1. **On your server, install Node.js and Nginx**:
   ```sh
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nginx nodejs npm
   ```

2. **Upload your project** to the server (e.g., `/var/www/task-manager`)

3. **Build the project on the server**:
   ```sh
   cd /var/www/task-manager
   npm install
   npm run build
   ```

4. **Configure Nginx** - Create `/etc/nginx/sites-available/task-manager`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/task-manager/dist;
       index index.html;

       # Fix MIME types for JavaScript modules
       include /etc/nginx/mime.types;
       types {
           application/javascript js mjs;
           text/css css;
       }

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Ensure proper MIME types for all assets
       location ~* \.(js|mjs|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Enable gzip compression
       gzip on;
       gzip_vary on;
       gzip_min_length 1024;
       gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json application/xml;
   }
   ```

5. **Enable the site and restart Nginx**:
   ```sh
   sudo ln -s /etc/nginx/sites-available/task-manager /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Set up SSL with Let's Encrypt** (optional but recommended):
   ```sh
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

**Using PM2 for Node.js server (Alternative):**

If you want to run Vite's preview server:

1. **Install PM2**:
   ```sh
   npm install -g pm2
   ```

2. **Start the preview server**:
   ```sh
   npm run build
   pm2 serve dist 8080 --spa
   pm2 save
   pm2 startup
   ```

**Using Docker (Alternative):**

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # Fix MIME types for JavaScript modules
    include /etc/nginx/mime.types;
    types {
        application/javascript js mjs;
        text/css css;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Ensure proper MIME types for all assets
    location ~* \.(js|mjs|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json application/xml;
}
```

Build and run:
```sh
docker build -t task-manager .
docker run -p 80:80 task-manager
```

### Step 3: Verify Deployment

1. Visit your deployed URL
2. Check browser console for any errors
3. Verify Supabase connection is working
4. Test the application functionality

### Troubleshooting

- **404 errors on routes**: Ensure your server is configured to serve `index.html` for all routes (SPA routing)
- **Environment variables not working**: Make sure variables are prefixed with `VITE_` for Vite projects
- **Supabase connection issues**: Verify your Supabase URL and keys are correct
- **Build errors**: Check Node.js version (should be 18+) and ensure all dependencies are installed
- **MIME type errors ("Expected a JavaScript-or-Wasm module script")**: 
  - Make sure you've built the project (`npm run build`) and are serving from the `dist` folder, not the source files
  - Ensure your Nginx configuration includes proper MIME types (see updated config above)
  - Verify the `include /etc/nginx/mime.types;` directive is present in your Nginx config
  - Check that `.js` and `.mjs` files are being served with `application/javascript` MIME type
  - Restart Nginx after configuration changes: `sudo systemctl restart nginx`
