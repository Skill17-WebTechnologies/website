# skill17.com

Independent information site for WorldSkills Skill 17, Web Technologies: the skill, the competition cycle (EuroSkills Düsseldorf 2027, WorldSkills Aichi 2028), the Occupational Standard, past test projects, and a six-stage learning journey whose progress is saved in the browser. Hosted on GitHub Pages.

Plain HTML, CSS and a little vanilla JavaScript, no build step. Pages serves the `main` branch root; `CNAME` binds the custom domain `skill17.com`.

| File | Purpose |
| --- | --- |
| `index.html` | Home |
| `journey.html` | Learning journey |
| `legal.html` | Imprint and privacy |
| `styles.css` | All styling and design tokens (light and dark via `prefers-color-scheme`) |
| `journey.js` | Goal checklist and progress (`localStorage` key `skill17-journey-v2`); set `SEQUENTIAL` to unlock stages in order |
| `fonts/` | Self-hosted Archivo and Atkinson Hyperlegible (SIL Open Font License, licences included) |

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
