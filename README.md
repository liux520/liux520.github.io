# Academic Personal Website

A modern, visually striking personal academic website built with Next.js, Tailwind CSS, and Framer Motion.

![Academic Website](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.3-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)

## Features

- **Modern Design**: Gradient backgrounds, glass morphism effects, smooth animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Scroll spy navigation, hover effects, animated cards
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Fast Performance**: Built with Next.js 14 App Router for optimal performance
- **Dark Mode Support**: Automatic theme adaptation

## Sections

1. **Hero** - Eye-catching introduction with animated background
2. **Profile** - Personal bio, research interests, and technical skills
3. **News** - Latest updates categorized by type (publication, talk, award, grant)
4. **Publications** - Filterable list of research papers with download links
5. **Honors & Awards** - Recognition and achievements
6. **Education** - Academic background with timeline visualization
7. **Academic Service** - Professional activities and community contributions

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Static Production

```bash
# Create the static export used by GitHub Pages
npm run build
```

## Deployment

This project is configured for static export and deployment to `https://<username>.github.io/`.

### GitHub Pages Setup

1. Push this repository to GitHub.
2. Make sure the default branch is `main`, or update [deploy-pages.yml](./.github/workflows/deploy-pages.yml) to match your branch.
3. In GitHub, open `Settings -> Pages`.
4. Set `Source` to `GitHub Actions`.
5. Push to the default branch. The workflow will build the site and publish the generated `out/` directory.

### Local Verification

```bash
# Generate the static site into out/
npm run build
```

### Alternative Deployment

For Alibaba Cloud or PM2-based server deployment details, see [Tutorial.md](./Tutorial.md).

## Customization

### Personal Information

Edit `app/page.tsx` to update:
- Your name and title
- Contact information
- Social media links
- News items
- Publications
- Honors and awards
- Education history
- Academic service

### Styling

Modify `tailwind.config.ts` to customize:
- Color scheme
- Fonts
- Animations
- Breakpoints

### Components

All components are located in `app/page.tsx`. You can extract them into separate files in a `components/` directory for better organization.

## Project Structure

```
PersonalWeb/
├── app/
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page with all sections
├── public/               # Static assets (images, etc.)
├── components/           # Reusable components (optional)
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.js        # Next.js configuration
├── Tutorial.md           # Deployment tutorial
└── README.md            # This file
```

## Technologies Used

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework with App Router and static export |
| React 18 | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animation library |
| Lucide React | Icon library |
| Geist Font | Modern typography |

## License

This project is open source and available for personal and academic use.

## Support

For deployment issues, refer to [Tutorial.md](./Tutorial.md) for detailed troubleshooting steps.
