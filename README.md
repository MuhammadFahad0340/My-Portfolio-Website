# Muhammad Fahad — Full-Stack Developer Portfolio

Welcome to the repository for my professional full-stack portfolio website. This project showcases my software engineering journey, technical competencies, and deployed applications.

It is structured as a **monorepo** containing both the Next.js frontend client and the Express/Node.js backend server.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
*   **Framework:** React 19 & Next.js 16 (App Router)
*   **Styling:** Tailwind CSS v4
*   **Animations:** Framer Motion (including 3D interactive skill icons)
*   **Icons:** Lucide React & React Icons
*   **Mails:** Resend API integration for contact form submissions

### Backend (`/server`)
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB via Mongoose ORM
*   **Security:** Scaffolding for JWT Authentication & Role-Based Access Control (RBAC)

### DevOps & Infrastructure
*   **Continuous Integration (CI):** GitHub Actions (automatically builds and runs linter on pull requests)
*   **Continuous Deployment (CD):** Vercel (Frontend) & Render/Railway (Backend)

---

## 📂 Project Structure

```text
/My_Portfolio_website
├── .github/workflows/   # CI GitHub Actions configuration
├── client/              # Next.js Frontend Client
│   ├── public/          # Assets and images
│   └── src/             # Pages, Components, and Data
└── server/              # Node.js + Express Backend
    ├── controllers/     # Route handler logic
    ├── models/          # Mongoose database models
    ├── routes/          # API route definitions
    └── server.js        # Server entry point
```

---

## 🚀 Setup & Local Running Instructions

### 1. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the client.

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
```
*Note: Make sure to configure your `.env` variables (e.g. `MONGO_URI`, `PORT`) prior to launching the server.*

---

## 🧪 CI/CD Verification

This project runs automated code quality checks on every push to `main` via GitHub Actions:
*   Lint checks for style and formatting.
*   Production compilation test to ensure no breaking changes are shipped.
