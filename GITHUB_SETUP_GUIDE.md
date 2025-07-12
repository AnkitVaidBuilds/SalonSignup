# GitHub Setup Guide for Salon Booking Website

Follow these steps to upload your salon booking website to GitHub:

## Required Files to Upload

Copy these files and folders to your new GitHub repository:

### Essential Files:
- `README.md` - Project documentation
- `package.json` - Dependencies and scripts
- `package-lock.json` - Lock file for exact dependency versions
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Build tool configuration
- `tailwind.config.ts` - CSS framework configuration
- `postcss.config.js` - CSS processing configuration
- `components.json` - UI component configuration
- `drizzle.config.ts` - Database configuration
- `.gitignore` - Files to ignore in Git

### Source Code Folders:
- `client/` - Complete frontend application
- `server/` - Complete backend application  
- `shared/` - Shared validation schemas

### Don't Upload:
- `node_modules/` - Dependencies (will be ignored by .gitignore)
- `.env` files - Environment variables (keep private)

## Step-by-Step GitHub Upload:

1. **Create GitHub Repository** (as mentioned earlier)

2. **Clone your new repository locally:**
   ```bash
   git clone https://github.com/yourusername/salon-booking-website.git
   cd salon-booking-website
   ```

3. **Copy all the project files** into the cloned folder

4. **Initialize and commit:**
   ```bash
   git add .
   git commit -m "Initial commit: Salon booking website with email notifications"
   git push origin main
   ```

## Environment Variables for Deployment:

When deploying, set these environment variables:
- `EMAIL_USER` - Your Gmail address for sending notifications
- `EMAIL_PASS` - Your Gmail app password

## Email Setup Instructions:

1. Go to your Google Account settings
2. Enable 2-factor authentication
3. Generate an "App Password" for this application
4. Use that app password (not your regular password) in EMAIL_PASS

Your website will be ready to receive bookings and send email notifications once deployed!