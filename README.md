# Infini8 Voice Website

A premium, enterprise-grade website for Infini8 Voice - an AI voice calling agent platform that enables brands to automate customer interactions, feedback collection, and lead qualification in English and regional languages.

## Features

- **Modern Design**: Clean, minimal aesthetic with subtle animations and glassmorphism effects
- **Dark Mode**: Built-in dark mode support with premium color palette
- **Responsive**: Mobile-first approach with smooth responsive design
- **Animations**: Framer Motion powered scroll animations and micro-interactions
- **Performance**: Optimized with Next.js Image optimization and lazy loading
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Comprehensive meta tags and structured data

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── hero-section.tsx  # Hero section
│   ├── trust-bar.tsx     # Company logos carousel
│   ├── benefits-section.tsx
│   ├── customization-section.tsx
│   ├── features-section.tsx
│   ├── case-studies-section.tsx
│   ├── contact-section.tsx
│   ├── navigation.tsx    # Navigation bar
│   └── footer.tsx        # Footer
├── lib/                  # Utility functions
│   └── utils.ts         # Class name utilities
└── components.json       # shadcn/ui configuration
```

## Sections

1. **Hero Section**: Compelling headline with animated background and CTAs
2. **Trust Bar**: Horizontal scrolling company logos with social proof
3. **Benefits**: Grid of key product benefits with icons and descriptions
4. **Customization**: Interactive section showcasing customization options
5. **Features**: How it works timeline with step-by-step breakdown
6. **Case Studies**: Success stories grid with metrics and testimonials
7. **Contact**: Dual forms for demo booking and sales contact

## Customization

### Colors

The color palette can be customized in `tailwind.config.js` and `app/globals.css`:

- Primary: Deep blue (#3B82F6)
- Accent: Purple (#6366F1)
- Background: Dark theme with gradients
- Text: White/gray scale for contrast

### Content

Update content by editing the respective component files in the `components/` directory.

### Animations

Animations are powered by Framer Motion and can be customized in each component.

## Performance

- Next.js Image optimization
- Lazy loading for images and components
- Code splitting
- Font optimization
- SEO optimization

## Deployment

The project is ready for deployment on:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

## License

This project is proprietary to Infini8 Voice.

## Support

For support, email hello@infini8voice.com

