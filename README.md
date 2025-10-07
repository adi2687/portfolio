# Portfolio - Black & White Theme

A modern, minimalist portfolio website built with **React + Vite** featuring a sleek black and white design.

## 🎨 Design Features

- **Pure Black & White Theme**: Minimalist color palette with grayscale accents
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations**: Scroll-reveal effects and hover interactions
- **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory**
```bash
cd portfolio-bw
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The site will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
portfolio-bw/
├── public/
│   └── data/
│       ├── hero.json       # Hero section content
│       ├── about.json      # About section content
│       ├── skills.json     # Skills data
│       └── projects.json   # Projects data
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Hero.jsx        # Hero section
│   │   ├── About.jsx       # About section
│   │   ├── Projects.jsx    # Projects showcase
│   │   ├── Contact.jsx     # Contact form
│   │   └── Footer.jsx      # Footer
│   ├── App.jsx             # Main app component
│   ├── App.css             # Global styles
│   ├── index.css           # Base styles & theme
│   └── main.jsx            # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Features

### Sections
1. **Hero** - Introduction with animated name and social links
2. **About** - Personal info, stats, and technical skills
3. **Projects** - Featured and all projects with filtering
4. **Contact** - Contact form and information
5. **Footer** - Quick links and social media

### Interactions
- Smooth scroll navigation
- Scroll-reveal animations
- Hover effects on cards and buttons
- Project modal with detailed information
- Category filtering for projects
- Mobile-responsive hamburger menu

## 🎨 Color Palette

```css
Black: #000000
White: #ffffff
Gray Scale: #171717 to #fafafa
```

## 🛠 Technologies

- **React 18** - UI library
- **Vite** - Build tool
- **React Icons** - Icon library
- **CSS3** - Styling with custom properties
- **Font Awesome** - Additional icons

## 📝 Customization

### Update Content

All content is stored in JSON files in the `public/data/` directory:

- **hero.json** - Update your introduction
- **about.json** - Update your bio and paragraphs
- **skills.json** - Add/remove skills with levels
- **projects.json** - Add/remove projects

### Modify Styles

- **Theme colors**: Edit CSS variables in `src/index.css`
- **Component styles**: Each component has its own CSS file
- **Global styles**: Modify `src/App.css`

### Example: Change Accent Color

In `src/index.css`, modify:
```css
:root {
  --accent: #ffffff; /* Change to any color */
}
```

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: 769px - 968px
- Large Desktop: > 968px

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"scripts": {
  "deploy": "vite build && gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Aditya Kurani**
- GitHub: [@adi2687](https://github.com/adi2687)
- LinkedIn: [Aditya Kurani](https://www.linkedin.com/in/aditya-kurani-818668176/)

---

Made with ❤️ using React + Vite
