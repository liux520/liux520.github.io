# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern academic personal website built with Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, and Framer Motion. The site features a single-page design with animated sections including Profile, News, Publications, Honors, Education, and Communications.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Create production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Production Deployment

This project is designed for deployment on Alibaba Cloud ECS using PM2 and Nginx. Key files:

- `ecosystem.config.js` - PM2 configuration for process management
- `Tutorial.md` - Complete deployment guide for Alibaba Cloud

Production deployment workflow:
```bash
# Install dependencies and build
npm install
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow generated command
```

## Architecture

### App Router Structure

The project uses Next.js 14 App Router with the following structure:

```
app/
├── layout.tsx         # Root layout with Google Fonts (Inter, Crimson Pro, Space Mono)
├── page.tsx           # Main single-page application with all sections
├── globals.css        # Global styles, Tailwind directives, custom animations
├── news/page.tsx      # Dedicated news page (standalone)
├── publications/page.tsx  # Dedicated publications page (standalone)
├── honors/page.tsx    # Dedicated honors page (standalone)
└── service/page.tsx   # Academic service page (standalone)
```

### Main Page Structure (app/page.tsx)

The entire single-page application is contained in `app/page.tsx`. This is a client component (`'use client'`) that includes:

- **Navigation**: Sticky header with scroll-spy and mobile menu
- **Hero Section**: Animated gradient background with floating particles
- **Data Arrays**: All content (news, publications, honors, education, service) is defined as const arrays at the top of the file
- **Section Components**: Each section (Profile, News, Publications, etc.) is defined as a separate component function within the same file

### Custom Styling System

**Tailwind Config** (`tailwind.config.ts`):
- Custom `primary` and `accent` color palettes
- Font variables: `--font-sans`, `--font-display`, `--font-mono`
- Custom animations: `fade-in`, `slide-up`, `float`, `glow`, `shimmer`

**Global CSS** (`app/globals.css`):
- Custom utility classes: `.text-gradient`, `.glass`, `.card-hover`
- Animated gradient background (`.gradient-bg`)
- Particle animation system (`.particles`, `.particle`)
- Custom scrollbar styling

### Key Dependencies

- **framer-motion**: All animations and scroll-triggered effects
- **lucide-react**: Icon library (all icons imported from this package)
- **next/image**: Optimized images from `public/images/`
- **clsx** + **tailwind-merge**: Typically used together for conditional class names (via `cn` utility pattern, though check if implemented)

## Content Customization

To personalize the website, edit the data arrays in `app/page.tsx`:

1. **Social Links**: `socialLinks` array (lines ~41-46)
2. **News**: `news` array with type categories (publication, talk, award, grant)
3. **Publications**: `publications` array with links (pdf, code, project)
4. **Honors**: `honors` array
5. **Education**: `education` array with timeline format
6. **Skills**: `skills` array grouped by category
7. **Academic Service**: `serviceList` array

Also update metadata in `app/layout.tsx` for title and description.

## Design Patterns

- **Client Components**: The main page uses `'use client'` for Framer Motion animations and scroll effects
- **Section Fade-in**: Uses `useEffect` + `IntersectionObserver` for scroll-triggered animations via `.section-fade` class
- **TypeScript**: All components use typed interfaces (e.g., `Publication` interface)
- **No Separate Components**: All components are currently inline in `app/page.tsx` for simplicity

## Images

Place images in `public/images/`. The site includes:
- Personal photos: `my-1.jpg` through `my-5.jpg`
- SCU (university) photos: `scu-1.jpg` through `scu-4.jpg`

Remote images from Unsplash are allowed via `next.config.js`.
