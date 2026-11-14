# OS-Copilot Series

A buildless research hub for the OS-Copilot series.

## Deployment

GitHub Pages publishes the repository root from `main` at <https://os-copilot.github.io/OS-Hub/>. Push changes to `main` to update the site. The `.nojekyll` file preserves the static files without a Jekyll build.

## Preview

```sh
python3 scripts/serve.py
```

Open <http://127.0.0.1:4173>. No package installation is required.

## Edit

- `data/projects.js`: project order, descriptions, links, resources, and orbital positions.
- `styles.css`: light and dark themes, layout, and responsive styles.
- `app.js`: orbit motion, project previews, and view controls.
- `assets/covers/`: original cover artwork from the project websites.
- `assets/logos/`: project and resource logos, with sources and editing records.
- `assets/scene/`: textured globe, public desktop screenshot, and OpenMobile-inspired launcher artwork.

All ten projects use the same card design on layered orbits. Apparent size and sharpness follow depth rather than project priority. The central phone, desktop, and browser move with the orbit and respect its pause state. Hover or keyboard focus reveals project resources. On touch screens, tapping a project opens its details; the project link opens its homepage.

Theme preference is stored locally. Reduced-motion preferences disable automatic rotation.

OS-Omni resources currently point to the user-provided project homepage. Replace those URLs in `data/projects.js` when individual resources are published. The OS-Atlas transparent logo was produced with the built-in image editing tool; its prompt and source are recorded in `assets/logos/os-atlas-edit.json`.

AgentStore, OpenMobile-2, OS-Omni, OS-Atlas, OS-Helix, and OS-Symphony use generated scene covers. ScienceBoard, OS-Genesis, and OpenMobile-2 use high-resolution generated mascot artwork in their resource panels. Each generated asset has a neighboring JSON file with its prompt and references; these derivatives are not official original logos. Original source assets are retained.

The phone material treatment and screen glyphs reference OpenMobile-2's app wall. The monitor displays a public OSReward demo screenshot. Sources are recorded under `assets/scene/`.
