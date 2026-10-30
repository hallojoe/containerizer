# Containerizer / KMD WorkZone

A Three.js spatial explorer that turns an array of containers into a living particle network. Containers are procedural 3D shipping-container models with corrugated sides, doors, luminous points and animated scan bands. No downloaded model is required.

## Run locally

Requires Node.js 20 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. `npm run dev` builds and serves the site; rerun it after source changes. To serve an existing build, use `npm start`. Set `PORT` to change the port.

```sh
npm run check
npm run build
```

Deploy the generated `dist/` directory to any static web host. Relative asset paths support subdirectory hosting such as GitHub Pages. The build includes Three.js and its MIT license locally. Google Fonts is optional; system fonts are the fallback. A WebGL-capable browser is required.

## Configuration

Click **Edit configuration**, paste a JSON array, then choose **Build network**:

```json
[
  { "name": "API Gateway", "text": "Routes incoming requests.", "group": "Infrastructure" },
  { "name": "Web Client", "text": "The customer-facing application.", "group": "Experience" }
]
```

Each distinct, case-sensitive `group` creates a platform sized for its members. All three properties must be strings; `name` and `group` cannot be blank. Duplicate names are allowed. The current limit is 500 containers. Changes stay in this browser's local storage; no backend is required.

[`examples/workzone.json`](examples/workzone.json) contains the supplied diagram's 48 containers across six groups. `text` contains the image reference when shown; unspecified references are empty. Paste that file into the editor to explore it. **Load demo** restores the built-in example to the editor; **Build network** applies it.

## Controls

- Drag to orbit; scroll/pinch to zoom; right-drag to pan.
- Click a container for animated camera focus and a terminal-style inspector.
- Use the directory to frame a group, or Reset view for the whole network.
- Toggle automatic orbit and particle effects in the bottom toolbar.
- Focus the canvas and press Enter to inspect; use left/right arrows to browse and Escape to close.

The circuit traces illustrate group connections; they do not infer actual service dependencies from the input data. Reduced-motion preferences disable scan animation and shorten camera transitions.

## Source

- `src/app.js`: procedural models, layout, shaders, interaction and configuration.
- `src/style.css`: responsive interface and terminal inspector.
- `src/index.html`: application shell.
- `scripts/build.mjs`: assembles standalone static output and Three.js assets.
- `scripts/serve.mjs`: local development server.

JavaScript syntax and build checks were run. Browser visual verification was unavailable in the original build environment.

## Container names and WorkZone intelligence

The **Names on/off** switch keeps a screen-facing name above each container, including containers behind others. It defaults to on and is saved separately from configuration in browser storage. Off-screen containers are clipped; dense labels may overlap at overview zoom, so zoom in or focus a group for detail.

Choose **Restore default** in the editor, then **Build network**, to use the supplied 48-container diagram. The focus inspector resolves known components by image and name, distinguishing duplicate `client`, `office`, and `init` entries. It adds a role, context, topology, and links to the official 2026.1 documentation. Inferred mappings are explicitly marked. Unknown entries retain their own text and receive only a generic group-based role. No operational state or resource usage is fabricated.

The original diagram remains unchanged. Version notes flag its removed Teams container, replaced Office init container, deprecated OAuth2 authentication, and the PDF init platform change. Reference content is curated in `src/workzone-info.js` from [KMD WorkZone 2026.1](https://docs.workzone.kmd.net/2026_1/en-us/Content/Home.htm); it is not fetched at runtime.

## Brand asset

The white KMD / An NEC Company SVG is sourced from [KMD’s official press materials](https://www.kmd.net/press/press-photos), [original SVG](https://www.kmd.net/media/c5egqffi/kmd-logo-white-with-nec-rgb.svg). The logo remains the property of KMD.

The supplied 48-container WorkZone configuration is the startup default. Saved custom configurations still take precedence; an unchanged saved legacy demo is migrated to WorkZone. **Restore default** stages the default in the editor; choose **Build network** to apply and save it.
