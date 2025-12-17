# CyberClub Website

A modern, fast website for our cybersecurity club built with Astro, featuring CTF writeups, event information, and member resources.

## Features

- Modern, responsive design with forest green and gold branding
- Markdown-based writeup system for CTF solutions
- Event calendar and announcements
- Static site generation for fast loading
- Optimized for GitHub Pages deployment

## Tech Stack

- **Framework:** Astro
- **Styling:** TailwindCSS
- **Content:** Markdown with frontmatter
- **Deployment:** GitHub Pages

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:4321`

## Adding Writeups

1. Create a new markdown file in `src/content/writeups/`
2. Add frontmatter with metadata:

```markdown
---
title: "Your Challenge Title"
description: "Brief description of the challenge"
pubDate: 2024-12-17
category: "web" # Options: web, crypto, pwn, reverse, forensics, misc
difficulty: "medium" # Options: easy, medium, hard
ctf: "CTF Name"
author: "Your Name"
tags: ["tag1", "tag2"]
---

Your writeup content here...
```

3. The writeup will automatically appear on the writeups page!

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   ├── content/         # Markdown content
│   │   └── writeups/    # CTF writeups
│   ├── layouts/         # Page layouts
│   ├── pages/           # Routes
│   └── styles/          # Global styles
└── .github/
    └── workflows/       # GitHub Actions
```

## Deploying to GitHub Pages

### Initial Setup

1. Push this code to a GitHub repository named `CyberClub`

2. Update `astro.config.mjs`:
   - Replace `yourusername` with your GitHub username
   - Adjust `base` if your repo has a different name

3. Enable GitHub Pages:
   - Go to your repository Settings → Pages
   - Under "Build and deployment", select "GitHub Actions"

4. Push to the `main` branch - deployment happens automatically!

### Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public/` directory with your domain
2. Update the `site` in `astro.config.mjs` to your domain
3. Configure DNS settings with your domain provider

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

## Customization

### Colors

Edit `src/styles/global.css` to customize the theme:
- `--color-forest-green`: Primary green color
- `--color-dark-forest`: Darker green variant
- `--color-light-gold`: Accent gold color
- `--color-pale-gold`: Light gold variant

### Content

- **Homepage:** Edit `src/pages/index.astro`
- **About page:** Edit `src/pages/about.astro`
- **Contact info:** Edit `src/pages/contact.astro`

## Contributing

Have a writeup to share? Fork the repo and submit a pull request!

## License

MIT License - Feel free to use this template for your own club or organization.
