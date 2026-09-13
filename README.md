# Premium Full-Stack Developer Portfolio

An award-winning, editorial personal portfolio engineered with **Next.js (App Router)**, **React**, **Tailwind CSS**, **Framer Motion**, and **Lenis** smooth scrolling.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Data-Driven Architecture

All content, personal details, project case studies, and stack configurations are loaded from JSON files located in `src/data/`:

| File | Purpose |
| --- | --- |
| `src/data/profile.json` | Name, role, headline, about story, philosophy, metrics |
| `src/data/projects.json` | Project case studies (Healthcare, E-Commerce, POS, Casino, Inventory, Enterprise) |
| `src/data/skills.json` | Tech stack taxonomy, proficiency, descriptions, ecosystem graph connections |
| `src/data/domains.json` | Industry verticals and key domain capabilities |
| `src/data/experience.json` | Production career timeline and engineering milestones |
| `src/data/education.json` | Degrees, certifications, and academic background |
| `src/data/social.json` | Email, GitHub, LinkedIn, Twitter, Resume links |
| `src/data/site.json` | Global site meta, navigation links, theme colors, cursor & smooth scroll toggles |

---

## 🎨 Customizing Theme & Animations

Open `src/data/site.json`:

```json
{
  "theme": {
    "accentColor": "#6366f1",
    "accentSecondary": "#06b6d4",
    "animationIntensity": "immersive",
    "enableCursor": true,
    "enableParticles": true,
    "enableSmoothScroll": true
  }
}
```

* **Animation Intensity**: `"minimal"`, `"balanced"`, `"immersive"`
* **Smooth Scroll**: Toggle Lenis smooth scrolling via `enableSmoothScroll`.
* **Custom Cursor**: Toggle desktop kinetic follower via `enableCursor`.

---

## 🖼️ Adding Project Images

Drop your WebP / JPG project visuals into `public/projects/` and reference their paths in `src/data/projects.json`:

```json
{
  "id": "my-project",
  "title": "My Custom Project",
  "image": "/projects/my-project.webp"
}
```

---

## 🚀 Deployment

Optimized for instant one-click deployment on **Vercel**, **Netlify**, or **Docker** containers.
