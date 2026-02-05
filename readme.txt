
# Lumina Library Management System

Lumina is a modern, aesthetic library management system designed for a seamless user experience. It features dedicated panels for students and librarians, integrated eBook reading, and AI-powered book enrichment.

## Features

- **Dual Panels**: Distinct interfaces for Students (borrowing/reading) and Librarians (inventory/management).
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- **Theme Toggle**: Beautiful Light and Dark modes.
- **E-Book Integration**: Upload digital copies and read them directly in the browser with a focus-oriented reader.
- **AI-Powered**: Uses Gemini AI to auto-generate book summaries and themes for librarians.
- **Clean UI**: Built with Tailwind CSS and Inter/Outfit fonts for a premium look.

## Local Setup

### 1. Prerequisites
- A modern web browser.
- A local development server (recommended).

### 2. Running Locally
Since this project uses ES6 modules and an `importmap` in the `index.html`, it is best served via a local web server to satisfy module loading requirements and avoid potential file protocol restrictions.

#### Option A: Using 'serve' (Quickest)
If you have Node.js installed, run:
```bash
npx serve .
```
Then open the provided URL (usually `http://localhost:3000`).

#### Option B: VS Code Live Server
1. Open the project folder in VS Code.
2. Install the "Live Server" extension.
3. Click "Go Live" in the bottom right corner of the status bar.

### 3. API Key Configuration
The application requires a Google Gemini API key for the AI summary and search features.
- The app retrieves the key from `process.env.API_KEY`.
- Ensure your environment is configured to provide this variable, or modify `services/geminiService.ts` to include your key directly for local testing (though environment variables are preferred for security).

## Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS.
- **Navigation**: React Router (HashRouter).
- **AI**: Google Gemini SDK (@google/genai).
- **Icons**: Heroicons (SVG).

## How to Navigate
- **Auth Screen**: Choose "Student" to browse/borrow or "Librarian" to manage inventory.
- **Catalog**: View all available physical and digital books.
- **Inventory (Librarian only)**: Add or remove books. Use the "Auto-Generate with AI" button to automatically populate descriptions using the title and author.
- **Reader**: Access the eBook section from the catalog and click "Read Now" to open the immersive reader.

---
© 2024 Lumina Systems. Created for modern digital libraries.
