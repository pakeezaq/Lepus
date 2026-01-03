# Deployment Guide for Lepus Website

Since your project has a **Frontend (Vite/React)** and a **Backend (Node/Express)**, the best way to deploy is to split them across two services. 

We recommend **Vercel for Frontend** (super fast, free) and **Render for Backend** (supports Node.js, free tier).

---

## Part 1: Backend Deployment (Render)

1.  **Push your code to GitHub**: Ensure your project is in a GitHub repository.
2.  **Sign up/Login to Render** (render.com).
3.  **Click "New +"** -> **Web Service**.
4.  **Connect your GitHub repo**.
5.  **Configure the Service**:
    *   **Name**: `lepus-backend`
    *   **Region**: Singapore or Frankfurt (closest to Pakistan often good, or US East).
    *   **Root Directory**: `server` (Important! Your backend code is in this folder).
    *   **Runtime**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
6.  **Environment Variables** (Add these in the "Environment" tab):
    *   `EMAIL_USER`: *[Your Email]*
    *   `EMAIL_PASS`: *[Your App Password]*
    *   `FRONTEND_URL`: *[Leave empty for now, update after deploying frontend]*
    *   `PORT`: `5000` (Render might override this, which is fine)
7.  **Click "Create Web Service"**.
8.  **Wait for deployment**. Once done, copy the URL (e.g., `https://lepus-backend.onrender.com`).

---

## Part 2: Frontend Deployment (Vercel)

1.  **Go to your code** on your computer.
2.  **Create/Edit `.env.production`** in the root folder (`d:/lepus-website/`).
3.  Add this line:
    ```
    VITE_API_URL=https://lepus-backend.onrender.com
    ```
    *(Replace with your actual Render Backend URL from Part 1)*.
4.  **Push this change to GitHub**.
5.  **Login to Vercel** (vercel.com).
6.  **Click "Add New..." -> "Project"**.
7.  **Import your Git Repository**.
8.  **Configure Project**:
    *   **Framework Preset**: Vite (should detect automatically).
    *   **Root Directory**: `./` (default).
9.  **Environment Variables**:
    *   Add `VITE_API_URL` with value `https://lepus-backend.onrender.com`.
10. **Click "Deploy"**.

---

## Part 3: Final Connection

1.  Copy your new **Frontend Domain** from Vercel (e.g., `https://lepus-website.vercel.app`).
2.  Go back to **Render Dashboard** -> `lepus-backend` -> **Environment**.
3.  Add or Update `FRONTEND_URL` to `https://lepus-website.vercel.app`.
4.  **Save Changes** (this will restart the backend).

**Done!** Your site is now live.

**Note on Size Charts:**
Make sure you upload your size chart images to the `public/assets/size-charts/` folder in your project and push to GitHub, otherwise they won't show up.
- `quarterzip.png`
- `hoodie.png`
- `oversized-hoodie.png`
