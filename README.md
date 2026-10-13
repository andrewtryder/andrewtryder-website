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
├── netlify.toml                # Netlify deployment configuration
└── package.json                # Project metadata and local preview scripts
```

---

## Local Development

Because this site is built purely with clean semantic HTML, vanilla CSS, and minimal vanilla JavaScript, no build step or bundler is required.

### 1. Run with Netlify CLI

```bash
npm run preview:netlify
# or: npx netlify dev
```

### 2. Run with Node / npx

```bash
npm run dev
# or: npx serve .
```

### 3. Run with Python

```bash
npm run start
# or: python3 -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000).

---

## Features & Accessibility

- **Native `<dialog>` Modals**: Deep-dive modals for PoaIndex and NH Fuel Watch use native HTML `<dialog>` with focus trapping, Escape-to-close, backdrop click dismissal, and focus restoration to the opening button.
- **Progressive Enhancement**: All primary application links work directly without JavaScript enabled.
- **Keyboard Navigation**: Includes standard `:focus-visible` styling and a hidden skip-link for screen readers and keyboard users.
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` by disabling smooth scrolling and transitions.
- **SEO & Meta**: Proper canonical URLs, Open Graph metadata, semantic HTML5 section landmarks, and descriptive headers.

---

## Deployment & Hosting

- Hosted on **Netlify** configured via `netlify.toml` (`publish = "."`, `command = "true"`).
- All changes are currently committed locally to the `redesign` branch. No production deployments, pushes, or PRs are initiated without explicit approval.
