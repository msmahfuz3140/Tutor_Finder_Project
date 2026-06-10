# MediQueue — Tutor Finder Platform

A modern, full-stack tutor discovery and booking platform built with **Next.js 16**, **Better Auth**, and **MongoDB**.

## 📚 Overview

**MediQueue** connects students with verified expert tutors. Users can browse available tutors by subject, filter by availability, view detailed tutor profiles, and book learning sessions — all with a smooth, responsive UI and dark mode support.

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Browse & Search Tutors** | Search tutors by name, filter by date range |
| 📋 **Tutor Details** | View full profile — subject, teaching mode, fees, experience, availability |
| 🔐 **Authentication** | Email/password registration & login + Google OAuth (via Better Auth) |
| ➕ **Add Tutor Profile** | Registered users can create their own tutor listing |
| 📅 **Book Sessions** | Book a tutoring session with preferred tutors |
| 📂 **My Tutors** | View all tutors you've added |
| 📆 **Booked Sessions** | View all your confirmed bookings |
| 🌗 **Dark / Light Theme** | Toggle between dark and light mode (persisted) |
| 📱 **Responsive Design** | Fully responsive for desktop, tablet, and mobile |

## 🛠️ Tech Stack

**Frontend**
- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [next-themes](https://github.com/pacocoursey/next-themes) — dark mode support
- [Lucide Icons](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)
- [SweetAlert2](https://sweetalert2.github.io/) — toast & modal notifications

**Authentication**
- [Better Auth](https://www.better-auth.com/) — full auth with email/password + Google OAuth

**Backend (separate project)**
- [Tutor_Finder_Project_Server](https://github.com/msmahfuz3140/Tutor_Finder_Project_Server) — Express + MongoDB API

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation

```bash
# Clone the project
git clone https://github.com/msmahfuz3140/Tutor_Finder_Project.git
cd Tutor_Finder_Project

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file (see below)
```

### Environment Variables

```env
# Better Auth secret (required)
BETTER_AUTH_SECRET="your-better-auth-secret"

# Public API URL for the backend server
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

> **Note:** The `BETTER_AUTH_URL` defaults to `window.location.origin` automatically. You only need `NEXT_PUBLIC_API_URL` if running the backend locally (defaults to production server otherwise).

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── add-tutor/          # Create tutor profile (protected)
│   ├── booked-session/     # View booked sessions
│   ├── login/              # Login page (email/password + Google)
│   ├── my-tutor/           # My added tutors
│   ├── register/           # Registration page
│   ├── tutor/              # Browse all tutors
│   ├── api/auth/           # Better Auth API route handler
│   ├── layout.js           # Root layout
│   ├── page.js             # Home page with featured tutors
│   └── providers.jsx       # Theme + Auth provider wrapper
├── components/             # Shared UI components
│   ├── Navbar.jsx          # Top navigation bar
│   ├── Footer.jsx          # Footer
│   ├── PrivateRoute.jsx    # Auth guard wrapper
│   ├── TutorCard.jsx       # Tutor preview card
│   ├── TutorDetailsCard.jsx
│   └── SliderBanner.jsx    # Homepage banner slider
├── context/
│   └── AuthContext.jsx     # Auth state management
└── lib/
    ├── api.js              # API base URL config
    ├── auth-client.js      # Better Auth client setup
    └── auth.js             # Better Auth server instance
```

## 🔑 Authentication

**MediQueue** uses [Better Auth](https://www.better-auth.com/) for a secure, modern authentication experience:

- **Email & Password** — Register with name, email, photo URL, and password
- **Google OAuth** — One-click sign-in using your Google account
- **Session Management** — Automatic session sync with JWT token generation for backend API calls

All protected routes (e.g., Add Tutor, Book Session) are wrapped with the `<PrivateRoute />` component to redirect unauthenticated users.

## 🌐 API Integration

The frontend communicates with a separate Express + MongoDB backend:

- **Base URL:** `https://tutor-finder-project-server.vercel.app` (production) or `http://localhost:4000` (local)
- **Endpoints:**
  - `GET /tutors` — List all tutors
  - `GET /tutors?search=&startDate=&endDate=` — Filtered search
  - `POST /tutors` — Create a tutor profile (authenticated)
  - `POST /jwt` — Generate JWT for API authorization

## 📄 License

This project is created for academic / assignment purposes.