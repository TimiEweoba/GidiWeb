## Overview

* This repo serves a React/Vite client through an Express server in dev and prod.

* Dev entry is `server/index.ts` with Vite middleware; prod bundles server to `dist/index.js` and static assets to `dist/public`.

## Dev Start

* In the project root `c:\Users\hp\Documents\GidiGoWeb`, start the server:

  * Preferred: `npx tsx server/index.ts`

  * Or: `npm run dev` (script: `package.json:6–12`). On Windows, if env assignment causes issues, set PowerShell env first: `$env:NODE_ENV='development'`; then `npm run dev`.

* Expected log: `serving on port 5000` from `server/index.ts:73–79`. App listens on `0.0.0.0`.

* Open `http://localhost:5000/` to view the site. Vite dev middleware serves `client/index.html` with HMR (`server/vite.ts:22–44,45–68`).

## Production Build

* Build client and server:

  * `npm run build` (runs `vite build` + bundles server via esbuild; `package.json:8` and `vite.config.ts:29–33`).

* Start prod:

  * `npm start` (runs `node dist/index.js`; `package.json:9`). Static assets are served from `dist/public` (`server/vite.ts:70–85`).

## Configuration & Ports

* Default port is `5000`; override with `PORT` env (read at `server/index.ts:73`).

* Express dev mode is detected via `app.get("env") === "development"` (`server/index.ts:63–67`), so setting `NODE_ENV` is optional in dev.

## Troubleshooting

* If `npm run dev` fails on Windows due to `NODE_ENV=...` syntax, use PowerShell: `$env:NODE_ENV='development'`; then `npm run dev`, or run `npx tsx server/index.ts` directly.

* If port 5000 is busy, set `$env:PORT='5173'` (for example) before starting, then open `http://localhost:5173/`.

## Next Step

* After you confirm, I will start the dev server and provide a live preview URL.

