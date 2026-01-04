# Unified Deployment Guide for Lepus

The project has been restructured to support a **single deployment** where the Node.js backend serves the React frontend.

## Changes Made

1.  **Frontend**:
    *   API calls in `Checkout.jsx` now use relative paths (e.g., `/api/orders`) instead of absolute URLs.
    *   `VITE_API_URL` is no longer required.

2.  **Backend (`server/server.js`)**:
    *   Configured to serve static files from the `dist` folder.
    *   Added a "Catch-all" route (`*`) to serve `index.html` for any non-API requests (enabling React Router to work).

3.  **Project Config (`package.json`)**:
    *   Merged server dependencies (`express`, `cors`, etc.) into the root `package.json`.
    *   Added a `start` script: `node server/server.js`.

## How to Deploy (e.g., on Render, Heroku)

You can now deploy this as a **Web Service** pointing to the root of your repository.

**Build Command:**
```bash
npm install && npm run build
```
*(This installs all dependencies and builds the React frontend into the `dist` folder)*

**Start Command:**
```bash
npm start
```
*(This starts the Node server, which serves both the API and the React frontend)*

## Local Testing of Production Build

To test the full production setup locally:

1.  Stop any running servers.
2.  Run `npm install` (to update your root node_modules with server deps).
3.  Run `npm run build`.
4.  Run `npm start`.
5.  Open `http://localhost:5000` (or whatever PORT is set).
