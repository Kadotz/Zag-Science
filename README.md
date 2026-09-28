# Zag Science

GitHub-ready source extracted from the final self-contained Zag Science prototype.

## Structure
- `index.html` — app markup
- `assets/app.css` — extracted styles
- `assets/app.js` — extracted JavaScript
- `assets/images/` — extracted image assets

## Run locally
Serve this folder with any static web server. For example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Next stage
Once this web build is verified against the master prototype, it can be wrapped with Capacitor for iOS/Android and the local-only data layer can later be migrated to a synced backend.
