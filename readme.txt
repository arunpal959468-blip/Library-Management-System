
# Lumina Library Management System

Lumina is a modern, aesthetic library management system designed for a seamless user experience. It features dedicated panels for students and librarians, integrated eBook reading, and AI-powered book enrichment.

## Troubleshooting: White Screen Locally
If you see a white screen when running locally:
1. **Browsers don't support TSX/JSX naturally**: Native browsers cannot execute `.tsx` or `.ts` files directly. You need a development server with "on-the-fly" transpilation or a build tool.
2. **Recommended Local Server**: Use **Vite** or **Parcel** to serve these files. They will automatically transpile the React code.
   ```bash
   npx vite .
   ```
3. **Missing API Key**: The code now includes safety checks, but if `process.env.API_KEY` is not provided by your server, AI features will be disabled.

## Features
- **Dual Panels**: Distinct interfaces for Students and Librarians.
- **Responsive Design**: Fully optimized for mobile and desktop.
- **Theme Toggle**: Light and Dark modes.
- **E-Book Integration**: Focus-oriented reader built-in.
- **AI-Powered**: Auto-generate book summaries using Gemini.

## Local Setup

### 1. Running with Vite (Recommended)
```bash
npx vite .
```

### 2. Running with Simple Server (Requires manual JS conversion)
If you only use a static server like `npx serve .`, the browser will fail to parse the `.tsx` files. You MUST use a transpiler.

---
© 2024 Lumina Systems. Created for modern digital libraries.
