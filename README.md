# Lumière Premiere — Premium Cinematic Release Experience

Lumière Premiere is a luxurious, high-end, cinematic web experience designed for an exclusive movie-launch agency. Inspired by the visual excellence of Apple TV+, A24, and Netflix Tudum, the site implements clean animations, dark mode aesthetics, gold accents, and a fully decoupled architecture.

This repository hosts the **Next.js Frontend application**. The containerized Laravel backend resides in [lumiere-backend](https://github.com/Ro-wdy/Lumiere-Backend).

---

## ✨ Features Implemented

* **Immersive Hero Experience**: Rich ambient video background with modal trailer controls.
* **Launch Archive**: A sleek grid presenting all upcoming cinematic release campaigns.
* **Dynamic Route Details**: Film-specific pages detailing synopsis, crew profiles, still galleries, and related releases.
* **Interactive Storyline**: Beautiful, interactive company history timelines and profiles.
* **Toast Provider**: Custom animated Glassmorphism notifications for smooth subscription/contact flow.
* **Full Responsive Design**: Seamless premium layout across mobile, tablet, and desktop viewports.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
* **Styles**: Vanilla CSS Modules (Strict dark theme design system)
* **Icons & Favicons**: Customized serif "LP" Vector logo
* **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites
* Node.js >= 18.0.0
* npm / yarn / pnpm

### Run Locally

1. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file inside the `frontend` folder:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
   *Note: In production, point this to your deployed Render URL.*

4. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   The site will be running at `http://localhost:3000`.

---

## 🌐 Production Deployment

This project is configured for seamless deployment on **Vercel**:

1. Connect the GitHub repository to your Vercel Account.
2. Set the **Root Directory** in Vercel to `frontend`.
3. Add the following Environment Variable:
   * **Key**: `NEXT_PUBLIC_API_URL`
   * **Value**: Your live API backend URL (e.g. `https://lumiere-backend-acxr.onrender.com`)
4. Deploy the project.
