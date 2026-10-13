# Andrew Ryder — Personal Website

Personal website for **Andrew Ryder**, technologist and builder.
Production URL: [https://www.andrewtryder.com](https://www.andrewtryder.com/)
Hosting: Netlify

---

## Design Direction: Minimal Practical Workshop

A typography-first, restrained editorial aesthetic communicating hands-on engineering capability, systems problem-solving, and personal craft:

- **Color Palette**:
  - Background: Warm off-white (`#F5F3ED`)
  - Primary text: Dark ink (`#202A28`)
  - Primary accent: Deep evergreen (`#365B50`)
  - Secondary accent: Muted terracotta (`#A44F31`)
  - Borders: Subdued gray-green (`#D8DCD5`)
- **Typography**:
  - Headings: `Newsreader` (editorial serif)
  - Body: `IBM Plex Sans` (readable sans-serif)
  - Technical labels: `IBM Plex Mono` (monospace)
- **Ethos**: Whitespace and typographic hierarchy rather than decorative badges, stock imagery, or heavy framework dependencies.

---

## Architecture & Directory Structure

```text
andrewtryder-website/
├── index.html                  # Homepage (editorial intro, selected work, experience, contact)
├── projects/
│   └── index.html              # Dedicated projects page & native <dialog> modals
├── home-assistant/
│   └── index.html              # Complete index of 9 public Home Assistant integrations
├── about/
│   └── index.html              # Technical experience & background
├── creative/
│   └── index.html              # Photography & metal sculpture practice
├── contact/
│   └── index.html              # Direct communication channels
├── css/
│   └── style.css               # Design tokens, typography, responsive layout, dialog styles
├── js/
│   └── main.js                 # Native <dialog> modal controller with focus restoration
├── scripts/build-static.mjs    # Dependency-free static output builder
├── netlify.toml                # Netlify deployment configuration
└── package.json                # Project metadata and local preview scripts
```

---

## Local Development

The site is authored as semantic HTML, vanilla CSS, and minimal vanilla JavaScript. Netlify serves a generated `dist/` directory so repository files and development dependencies are never published.

### 1. Install and run locally

```bash
npm install
npm run preview:netlify
```

Netlify CLI prints the local preview URL (normally `http://localhost:8888`). Use this as the primary development command because it follows the Netlify configuration.

### 2. Build and test the deployable output

```bash
npm run build
npm run preview:dist
```

Then visit [http://localhost:8000](http://localhost:8000). The generated `dist/` directory contains only the six static pages and their shared CSS and JavaScript assets.

### 3. Simple source preview

```bash
npm run start
```

This is useful for quick source-only iteration; it does not reproduce Netlify's build step.

---

## Features & Accessibility

- **Native `<dialog>` Modals**: Deep-dive modals for PoaIndex and NH Fuel Watch use native HTML `<dialog>` with Escape-to-close, backdrop dismissal, and focus restoration to the opening link.
- **Progressive Enhancement**: All primary application links work directly without JavaScript enabled.
- **Keyboard Navigation**: Includes standard `:focus-visible` styling and a hidden skip-link for screen readers and keyboard users.
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` by disabling smooth scrolling and transitions.
- **SEO & Meta**: Proper canonical URLs, Open Graph metadata, semantic HTML5 section landmarks, and descriptive headers.

---

## Deployment & Hosting

- Hosted on **Netlify** configured via `netlify.toml` (`publish = "dist"`, `command = "npm run build"`).
- The `redesign` branch is pushed to GitHub and remains separate from the production `main` branch. Netlify is configured to build `main`; merging is a deliberate production-release step.
- Do not deploy, merge, or push changes without explicit approval.

## Content maintenance

The two project dialogs are intentionally duplicated in `index.html` and `projects/index.html` so their content remains available in static HTML on both routes. Update the matching PoaIndex and NH Fuel Watch blocks together; their cards and dialogs use the same wording.
