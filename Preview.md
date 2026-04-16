# Local Preview Guide for Academic Website

This guide provides step-by-step instructions to preview your academic website locally before deploying to the cloud server.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Development Mode Preview](#development-mode-preview)
4. [Production Build Preview](#production-build-preview)
5. [Previewing on Mobile Devices](#previewing-on-mobile-devices)
6. [Common Issues & Solutions](#common-issues--solutions)
7. [Customizing Content](#customizing-content)

---

## Prerequisites

Before starting, ensure you have the following installed on your local machine:

### Required Software

| Software | Minimum Version | Download Link |
|----------|----------------|---------------|
| Node.js | 18.x or higher | https://nodejs.org/ |
| npm | 9.x or higher | (Included with Node.js) |
| Git | 2.x or higher | https://git-scm.com/ |
| Code Editor | Any | VS Code recommended |

### Verify Installation

Open your terminal (Command Prompt, PowerShell, or Terminal) and run:

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version (optional)
git --version
```

Expected output should show:
- Node.js: `v18.x.x` or higher
- npm: `9.x.x` or higher

---

## Environment Setup

### Step 1: Navigate to Project Directory

```bash
# Windows Command Prompt
cd G:\PhD\Paper\Ideal\PersonalWeb

# Windows PowerShell
cd "G:\PhD\Paper\Ideal\PersonalWeb"

# Git Bash / WSL
cd /g/PhD/Paper/Ideal/PersonalWeb

# Or use your preferred terminal
```

### Step 2: Install Project Dependencies

```bash
# Install all required packages
npm install
```

This will install:
- `next` - React framework
- `react` & `react-dom` - UI library
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `geist` - Font library
- `tailwindcss` - Styling framework
- TypeScript types

**Estimated time:** 2-5 minutes (depending on internet speed)

### Step 3: Verify Installation

After installation completes, you should see:
- A `node_modules` folder created in the project directory
- A `package-lock.json` file created

---

## Development Mode Preview

This mode enables **hot reload** - changes you make to the code are automatically reflected in the browser.

### Step 1: Start Development Server

```bash
npm run dev
```

You should see output similar to:

```
   ▲ Next.js 14.2.0
   - Local:        http://localhost:3000
   - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.3s
```

### Step 2: Open in Browser

1. Open your web browser (Chrome, Firefox, Edge, Safari)
2. Navigate to: **http://localhost:3000**
3. The website should load with all animations and interactions

### Step 3: Test the Website

Try the following:

| Feature | How to Test |
|---------|-------------|
| Navigation | Click nav items, page should scroll smoothly |
| Mobile Menu | Resize browser to mobile width, click hamburger menu |
| Scroll Spy | Scroll down, nav item should highlight based on section |
| Hover Effects | Hover over cards, they should lift and glow |
| Animations | Reload page, sections should fade in as you scroll |
| Publication Filter | Click "Journal" / "Conference" buttons |
| Responsive Design | Resize browser window to different sizes |

### Step 4: Edit and See Changes (Hot Reload)

1. Keep the development server running
2. Open `app/page.tsx` in your code editor
3. Make a change (e.g., modify your name)
4. Save the file
5. The browser should **automatically refresh** with your changes

**Example - Change Your Name:**

```typescript
// In app/page.tsx, find the Hero section:
<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
  <span className="text-gradient">Dr. Your Name</span>  // Edit this line
</h1>
```

Change to:
```typescript
<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
  <span className="text-gradient">Dr. John Smith</span>
</h1>
```

Save and watch the browser update instantly!

### Step 5: Stop Development Server

When you're done, press:
- **Ctrl + C** (Windows/Linux)
- **Cmd + C** (Mac)

---

## Production Build Preview

This mode builds an optimized version similar to what will run on your cloud server.

### Step 1: Build for Production

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Optimize and minify code
- Generate static assets
- Create production-ready files

**Expected output:**
```
   Linting and checking validity of types
   ✓ Compiled successfully

   Route (app)                              Size     First Load JS
   ┌ ○ /                                    XXX kB          XXX kB
   └ ○ /_not-found                          XXX kB          XXX kB

Build completed successfully
```

### Step 2: Start Production Server

```bash
npm start
```

Output:
```
   ▲ Next.js 14.2.0
   - Local:        http://localhost:3000

 ✓ Ready in XXX ms
```

### Step 3: Preview in Browser

Open **http://localhost:3000** in your browser.

### Step 4: Stop Production Server

Press **Ctrl + C** to stop the server.

### Note on Production Mode

- Hot reload is **disabled** in production mode
- You must rebuild after making changes: `npm run build`
- Performance is optimized like your live website

---

## Previewing on Mobile Devices

### Option 1: Browser Developer Tools (Quickest)

1. Open your website in Chrome or Edge
2. Press **F12** or right-click → **Inspect**
3. Click the **Device Toggle** icon (or press **Ctrl + Shift + M**)
4. Select a device preset (iPhone, iPad, etc.)
5. Test the responsive design

### Option 2: Access from Your Mobile Phone (Same Network)

#### Step 1: Find Your Local IP Address

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig | grep inet
```

#### Step 2: Start Development Server

```bash
npm run dev
```

Note the "Network" URL shown in output (e.g., http://192.168.x.x:3000)

#### Step 3: Connect from Mobile

1. Ensure your phone and computer are on the **same Wi-Fi network**
2. Open your phone's browser
3. Enter the network address: `http://192.168.x.x:3000`
4. The website should load on your phone

#### Step 4: Enable Hot Reload on Mobile

Any changes you make on your computer will automatically appear on your phone when you refresh!

### Option 3: Use ngrok (Public URL)

Preview your site from anywhere using a public URL.

```bash
# Install ngrok globally
npm install -g ngrok

# Start your development server
npm run dev

# In another terminal, run ngrok
ngrok http 3000
```

You'll get a public URL like: `https://abc123.ngrok.io`

Share this URL to view on any device!

---

## Common Issues & Solutions

### Issue 1: Port 3000 Already in Use

**Error:**
```
Port 3000 is already in use
```

**Solution:**

**Option A - Kill the Process:**

```bash
# Windows (Find and kill process)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Option B - Use a Different Port:**

```bash
npm run dev -- -p 3001
```
Then open http://localhost:3001

### Issue 2: npm install Fails

**Error:**
```
npm ERR! code ECONNREFUSED
npm ERR! syscall connect
```

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install

# If still fails, delete node_modules and try again
rm -rf node_modules
npm install
```

### Issue 3: TypeScript Errors

**Error:**
```
Type error: Cannot find module 'lucide-react'
```

**Solution:**

```bash
# Ensure all dependencies are installed
npm install

# If issue persists, reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: Styles Not Loading

**Solution:**

```bash
# Restart the development server
# Press Ctrl + C, then:
npm run dev

# Clear browser cache (Ctrl + Shift + R)
```

### Issue 5: Build Fails

**Error:**
```
Build failed with errors
```

**Solution:**

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

---

## Customizing Content

### Editing Your Personal Information

Open `app/page.tsx` and modify the data arrays:

#### 1. Personal Information (Hero Section)

```typescript
// Find and replace:
<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
  <span className="text-gradient">Dr. Your Name</span>  // ← Your name
</h1>

<p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-4">
  Assistant Professor | Machine Learning Researcher  // ← Your title
</p>

<p className="text-lg text-slate-500 dark:text-slate-400 mb-8">
  Department of Computer Science, University of Technology  // ← Your institution
</p>
```

#### 2. News Section

```typescript
const news = [
  {
    date: 'January 2025',
    title: 'Your news headline here',
    description: 'Description of your news item.',
    type: 'publication',  // Options: 'publication', 'talk', 'award', 'grant'
  },
  // Add more news items...
]
```

#### 3. Publications

```typescript
const publications = [
  {
    title: 'Your Paper Title',
    authors: 'Your Name, Coauthor Name',
    venue: 'Conference/Journal Name',
    year: '2024',
    type: 'conference',  // Options: 'journal', 'conference'
    award: 'Best Paper Award',  // Optional
    links: { pdf: 'https://...', code: 'https://...', project: 'https://...' }
  },
  // Add more publications...
]
```

#### 4. Honors & Awards

```typescript
const honors = [
  {
    title: 'Award Name',
    organization: 'Organization Name',
    year: '2024',
    description: 'Brief description of the award.',
  },
  // Add more honors...
]
```

#### 5. Education

```typescript
const education = [
  {
    degree: 'Ph.D. in Computer Science',
    institution: 'University Name',
    location: 'City, Country',
    period: '2020 - 2024',
    advisor: 'Prof. Advisor Name',
    thesis: 'Dissertation Title',
    description: 'Research focus description.',
  },
  // Add more education entries...
]
```

#### 6. Academic Service

```typescript
const communications = [
  {
    role: 'Program Committee Member',
    venue: 'Conference Name',
    journal: 'Journal Name',  // Optional
    institution: 'Institution',  // Optional
    conference: 'Workshop Name',  // Optional
    description: 'Description of your service.',
  },
  // Add more service entries...
]
```

#### 7. Social Media Links

```typescript
// In the Hero section, find the social links array:
{[
  { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  { icon: Globe, href: 'https://scholar.google.com/yourid', label: 'Google Scholar' },
].map((social) => (
  // ... render logic
))}
```

#### 8. Email Address

```typescript
// Find the email link and replace:
<a href="mailto:your.email@university.edu">
  <Mail className="w-5 h-5" />
  Contact Me
</a>
```

### Changing Colors and Styling

Open `tailwind.config.ts` to customize:

```typescript
// Modify primary colors
colors: {
  primary: {
    500: '#0ea5e9',  // Main blue color - change to your preference
    // ... other shades
  },
  accent: {
    500: '#d946ef',  // Main accent color - change to your preference
    // ... other shades
  },
}
```

### Adding Your Profile Photo

1. Create a `public` folder in your project root
2. Add your photo as `public/profile.jpg`
3. Update the Hero section in `app/page.tsx`:

```typescript
// Replace the User icon with:
<Image
  src="/profile.jpg"
  alt="Profile"
  width={160}
  height={160}
  className="w-40 h-40 mx-auto mb-8 rounded-full shadow-2xl"
/>
```

---

## Quick Reference Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Check code for errors |
| `Ctrl + C` | Stop the running server |

---

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Stop process | Ctrl + C | Cmd + C |
| Clear terminal | Ctrl + L | Cmd + K |
| Save file | Ctrl + S | Cmd + S |
| Browser refresh | Ctrl + R | Cmd + R |
| Hard refresh | Ctrl + Shift + R | Cmd + Shift + R |
| Open DevTools | F12 | Cmd + Option + I |

---

## Next Steps

1. **Preview locally** using the steps above
2. **Customize content** with your personal information
3. **Test on mobile** to ensure responsive design works
4. **Deploy to server** following [Tutorial.md](./Tutorial.md)

---

## Getting Help

If you encounter issues:

1. Check the [Common Issues & Solutions](#common-issues--solutions) section
2. Verify all dependencies are installed: `npm install`
3. Check Node.js version: `node --version` (should be 18+)
4. Try clearing the Next.js cache: `rm -rf .next`
5. Check browser console for errors (F12 → Console tab)

For deployment issues, refer to the [Tutorial.md](./Tutorial.md) file.
