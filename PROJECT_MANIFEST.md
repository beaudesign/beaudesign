# Relay Project - File Manifest

This ZIP contains the complete Relay interactive AI product setup.

## What's Included

### Core Application Files
- `app/page.tsx` - Main page component using RelayLayout
- `app/layout.tsx` - Root layout with IBM Plex fonts loaded via HTML
- `app/globals.css` - Global styles with Carbon Design System tokens

### Components
- `components/relay-layout.tsx` - Main layout integrating sidebar and views
- `components/modular-homepage.tsx` - Homepage with action cards and search
- `components/chat-window.tsx` - Universal chat window with message history
- `components/sidebar.tsx` - Collapsible navigation sidebar

### UI Components (ShadCN)
- `components/ui/button.tsx` - Button component with variants
- `components/ui/input.tsx` - Input component
- `components/ui/card.tsx` - Card component for layouts

### Utilities
- `lib/utils.ts` - Utility functions (cn for className merging)

### Configuration Files
- `package.json` - Dependencies and scripts
- `package-lock.json` - Locked dependency versions
- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js configuration with Turbopack TLS certs
- `postcss.config.mjs` - PostCSS configuration for Tailwind
- `eslint.config.mjs` - ESLint configuration
- `.gitignore` - Git ignore patterns

### Static Assets
- `public/` - Static files (SVG icons)

## Installation

1. Extract this ZIP file
2. Navigate to the `beaudesign` directory
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server
5. Open http://localhost:3000 in your browser

## Dependencies to Install

Since node_modules is excluded from this ZIP (to keep it small), you'll need to run:

```bash
npm install
```

This will install all dependencies defined in package.json:
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS v4
- ShadCN UI dependencies
- Vercel AI SDK
- Carbon Design System packages
- Lucide React icons

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: ShadCN UI
- **AI SDK**: Vercel AI SDK
- **Design System**: IBM Carbon Design System
- **Icons**: Lucide React

## Key Features

1. **Modular Homepage** with Research, Analyse, Search, Build action cards
2. **Universal Chat Window** with message history and AI integration ready
3. **Collapsible Sidebar** for navigation between views
4. **Carbon Design System** color tokens, spacing, and IBM Plex fonts
5. **Responsive Design** optimized for desktop and mobile

## Next Steps

See README.md for detailed next steps including:
- AI SDK integration
- Authentication setup
- Chat persistence
- Additional widget types

---

Created: January 5, 2026
Version: 1.0.0
