# Maktab-al-Fann — مكتب الفن

**by Living Arts**

An immersive Pakistani fine art gallery — a fully client-side single-page application (SPA) for collectors worldwide. Every artwork is a cultural narrative rooted in Mughal, Persian, and South Asian traditions.

---

## Features

- Editorial home page with hero, featured carousel, and Stories from Pakistan section
- Gallery with sidebar filters (medium, nationality), search, and pagination
- Artist profiles and artwork detail pages
- Artist Portal — artists register, submit work, and track approval status
- Admin Console — manage paintings, artists, and approve/reject portal submissions
- Collection / cart system with enquiry flow
- Exhibitions, Digital Art, Shop, and About pages
- Fully client-side — no server required; runs from a single `index.html`

---

## Installation

No build step or package manager needed. Just open the project in a browser.

### Option 1 — Open directly

Double-click `index.html` to open in your browser.

> **Note:** sql.js (WebAssembly) may be blocked by browser security when opening via `file://`. Use Option 2 if the gallery doesn't load.

### Option 2 — Local server (recommended)

**Using VS Code Live Server:**
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
2. Open the project folder in VS Code
3. Right-click `index.html` → **Open with Live Server**

**Using Python:**
```bash
cd maktab-al-fann
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

**Using Node.js:**
```bash
npx serve .
```

### Option 3 — Deploy to GitHub Pages

1. Push the repo to GitHub (see below)
2. Go to **Settings → Pages**
3. Set source to `main` branch, root folder
4. Your site will be live at `https://<username>.github.io/MaktabaAlFann/`

---

## Project Structure

```
maktab-al-fann/
├── index.html          # SPA shell — nav, page containers, scripts
├── css/
│   └── style.css       # Full design system — Mughal-inspired theme
├── js/
│   ├── app.js          # Router, cart system, global navigation
│   ├── data.js         # All art data — paintings, artists, styles, gallery info
│   ├── db.js           # SQLite initialisation via sql.js
│   ├── home.js         # Home page — hero, carousel, Stories section
│   ├── gallery.js      # Gallery — filters, search, grid, pagination
│   ├── artists.js      # Artists listing page
│   ├── artist-profile.js   # Individual artist profile page
│   ├── art-detail.js   # Individual artwork detail page
│   ├── artist-portal.js    # Artist registration & artwork submission
│   ├── admin.js        # Admin console — manage data + approvals
│   ├── about.js        # About page
│   ├── exhibitions.js  # Exhibitions page
│   ├── digital.js      # Digital Art page
│   ├── shop.js         # Shop page
│   ├── cart-page.js    # Collection / cart page
│   ├── artgen.js       # SVG artwork placeholder generator
│   └── hero-image.js   # Base64-embedded hero painting
└── images/
    └── hero-painting.jpg
```

---

## Libraries & Frameworks

### sql.js `v1.10.3`
- **What:** SQLite compiled to WebAssembly — a full relational database running entirely in the browser
- **Why:** Enables structured queries over the art collection without any backend or server
- **Loaded via CDN:** `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js`
- **Docs:** https://sql.js.org

### Google Fonts
Font families loaded via Google Fonts CDN:

| Font | Style | Usage |
|------|-------|-------|
| **Cinzel** | Serif, display | Primary headings, hero titles |
| **Playfair Display** | Serif, italic | Subheadings, editorial text |
| **Inter** | Sans-serif | Body text, UI labels |
| **Gulzar** | Nastaliq Urdu | Urdu titles (مكتب الفن) |
| **Noto Nastaliq Urdu** | Nastaliq Urdu | Urdu body text fallback |

---

## No Framework

This project uses **zero JavaScript frameworks** — no React, Vue, or Angular. Everything is vanilla HTML, CSS, and JavaScript:

- **Routing** — hash-based (`#gallery`, `#art/1`, `#artists/3`) handled in `app.js`
- **State** — plain JS objects (`GalleryState`, `CartState`, etc.)
- **DOM rendering** — string concatenation + `innerHTML`
- **Persistence** — browser `localStorage` for admin data and artist portal submissions

---

## Admin Console

Access the admin panel by navigating to `#admin` in the URL (e.g. `http://localhost:8080/#admin`).

Manage paintings, artists, and approve artist/artwork portal submissions. All changes are saved to `localStorage` and merged into the live data on every page load.

---

## Artist Portal

Navigate to `#artist-portal` to access the portal where artists can:
1. Register and submit an application
2. Once approved by admin, submit artwork for review
3. Track the status of their submissions

Approved artworks automatically appear in the public gallery.

---

## Browser Support

Modern browsers with WebAssembly support: Chrome, Firefox, Edge, Safari (v14+).
