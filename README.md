<!--
  AI Automation Agency Website Template
  ------------------------------------
  A premium, production-ready Next.js 14 template for AI agencies, SaaS, and tech startups.
  Designed and developed by Lusan Sapkota. For commercial use only.
-->

# AI Automation Agency Website Template

**A modern, production-ready website template for AI agencies, SaaS, and tech startups.**

---

## 🚀 Live Demo

[View Demo](https://ai-agency-sample.vercel.app/)

---

## ✨ Overview

This template is a fully responsive, theme-supported, and beautifully animated frontend built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. It is perfect for AI automation agencies, SaaS products, and modern tech businesses looking for a professional web presence.

---

## 🏆 Features

- **Responsive Design**: Looks perfect on mobile, tablet, and desktop
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Glassy Sticky Header**: Modern sticky header with glassmorphism and theme support
- **Smooth Scrolling**: Enhanced experience using Lenis
- **Framer Motion Animations**: Beautiful, performant animations throughout
- **TypeScript**: Full type safety
- **Reusable Components**: Header, Footer, AnimatedSection, ScrollToTop, and more
- **Modern UI**: Clean, professional, and accessible design
- **SEO Optimized**: Semantic HTML, proper heading structure, and fast loading
- **Easy Customization**: Well-structured code and clear documentation

---

## 📄 Pages Included

- **Homepage**: Hero, stats, trusted companies, services preview, testimonials, CTA
- **Services**: Detailed service offerings with interactive modals
- **How It Works**: Step-by-step process with visuals
- **About**: Company info and team
- **Contact**: Contact form (template only, no backend) and company info
- **Privacy Policy & Terms**: Ready-to-edit legal pages

---

## 🧩 Components

- **Header**: Sticky, glassy, theme-aware navigation with mobile menu
- **Footer**: Company info, quick links, and legal links
- **AnimatedSection**: Reusable animation wrapper for scroll-triggered effects
- **ScrollToTop**: Floating button for easy navigation
- **Service Modals**: Interactive popups for service details

---

## 🎨 Design System

### Color Palette

**Primary**: `#0e427e` (brand blue), `#f9b019` (accent gold)

**Light Mode**: White backgrounds, gray/blue text

**Dark Mode**: Slate backgrounds, white/gold text

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: 600-700 weight, responsive
- **Body**: 400 weight, optimized line heights

### Layout & Spacing

- **Container**: Max width 1280px, responsive padding
- **Section Padding**: Consistent vertical rhythm
- **Grid**: CSS Grid & Flexbox
- **Border Radius**: 8px (lg), 12px (xl)

---

## ⚙️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **React Intersection Observer**
- **Lenis** (smooth scrolling)
- **Remix Icons**

---

## 📝 Customization

- Update colors, fonts, and branding in `tailwind.config.js` and `globals.css`
- Edit content in the `/app` and `/components` folders
- Replace images in `/public/images` and `/public/avatars`
- Add or remove sections as needed

---

## 🔒 Licensing & Usage

This template is **commercially licensed**. You are permitted to use it in personal or commercial projects, including client work. **Redistribution, resale, or public sharing is strictly prohibited.**

**Valid License:**
- Purchase required via Gumroad, store.lusansapkota.com.np, or direct from Lusan Sapkota
- See `LICENSE.txt` for full terms

**Support & Inquiries:**
- Email: contact@lusansapkota.com.np or sapkotalusan@gmail.com

---

## 📢 Credits

- Design & Development: [Lusan Sapkota](https://lusansapkota.com.np)
- Demo Images: Unsplash, Pexels, and custom illustrations
- Icons: [Remix Icons](https://remixicon.com/)

---

## 💡 Notes

- The contact form is a frontend template only (no backend integration)
- All code is production-ready and easy to extend
- For extended or enterprise use, contact for custom licensing

---

## 🙏 Thank You!

If you enjoy this template, please leave a review on Gumroad or share your project with me!

## Design System

### Color Palette

#### Primary Colors

```css
primary: {
  50: '#eff6ff',
  100: '#dbeafe',
  500: '#0e427e',  /* Main brand color - used for headers, buttons, footer */
  600: '#0f437f',  /* Hover states */
  700: '#1e3a8a',  /* Darker variant */
}
```

#### Accent Colors

```css
accent: {
  400: '#fbbf24',
  500: '#f9b019',  /* Secondary brand color - used for highlights, CTAs */
  600: '#e09f16',  /* Hover states */
}
```

#### Neutral Colors

```css
/* Light Mode */
- Background: white
- Text: gray-900
- Secondary text: gray-600
- Borders: gray-200

/* Dark Mode */
- Background: slate-900
- Text: white
- Secondary text: gray-300
- Borders: slate-700
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: Font weights 600-700, responsive sizing
- **Body Text**: Font weight 400, optimized line heights
- **Buttons**: Font weight 500-600, consistent sizing

### Spacing & Layout

- **Container**: Max width 7xl (1280px) with responsive padding
- **Section Padding**: py-32 (128px) for consistent vertical rhythm
- **Grid Systems**: CSS Grid and Flexbox for responsive layouts
- **Border Radius**: Consistent rounded corners (lg: 8px, xl: 12px)

## Tech Stack

### Frontend

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Intersection Observer**: Scroll-triggered animations

### Styling & UI

- **Lenis**: Smooth scrolling library
- **Remix Icons**: Icon library
- **Custom Animations**: CSS keyframes and Framer Motion
- **Responsive Design**: Mobile-first approach

## Key Features Implementation

### Dark/Light Mode

- Uses Tailwind's `dark:` prefix for dark mode styles
- System preference detection on first visit
- Persistent theme selection in localStorage
- Smooth transitions between themes

### Smooth Scrolling

- Lenis library integration for enhanced scrolling
- Custom easing and duration settings
- Global scroll-to-top functionality
- Optimized for performance

### Animations

- Framer Motion for complex animations
- Intersection Observer for scroll-triggered effects
- Custom CSS keyframes for subtle effects
- Performance-optimized with `triggerOnce`

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid systems
- Optimized typography scaling

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Design Principles

### Visual Hierarchy

- Clear heading structure (H1 → H6)
- Consistent spacing using Tailwind's spacing scale
- Strategic use of color to guide attention
- Proper contrast ratios for accessibility

### User Experience

- Intuitive navigation with clear active states
- Fast loading times with optimized images
- Smooth interactions and micro-animations
- Accessible design following WCAG guidelines

### Performance

- Optimized bundle size with tree shaking
- Lazy loading for images and components
- Efficient re-renders with React best practices
- Minimal JavaScript for core functionality
