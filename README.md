# HypeUp

A social accountability app for tracking tasks, streaks, and hyping each other up.

## System Overview

HypeUp is a web application built with React, Vite, and Supabase that helps people follow through on tasks they'd otherwise put off. Users can create and complete todos, schedule reminders, maintain streaks, and unlock achievements. They can also follow other users to view updates in a Strava-like feed, write posts to ask for help starting a task or celebrate an accomplishment, and comment on others' posts to offer encouragement or congratulate a win. HypeUp addresses the motivational and social support gap that makes solo productivity tools easy to abandon, by turning personal progress into a shared, encouraging experience.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (LTS recommended)
- npm (ships with Node)
- Git

**Key package versions:**

- React 19 / React DOM 19
- Vite 8
- TypeScript ~6.0
- Tailwind CSS 4
- @supabase/supabase-js 2.x

Full pinned versions live in `package.json`; `npm install` resolves them automatically.

## Setup & Execution

### 1. Clone the repository

```bash
git clone https://github.com/rjvanaken/hype-up.git
cd hype-up
```

### 2. Install dependencies

```bash
npm install
```

#### Troubleshooting

- **Issue: `Cannot find native binding` or optional dependency errors**

  Clear the install and try again.

  macOS/Linux:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

  Windows PowerShell:
  ```powershell
  Remove-Item -Recurse -Force node_modules
  Remove-Item -Force package-lock.json
  npm install
  ```

- **Issue: PowerShell blocks npm with `running scripts is disabled on this system`**

  Windows PowerShell:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```

### 3. Configure environment variables

Create `.env.local` in the project root:

```
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key-here
```

A completed `.env.local` file is attached to the Phase 5 Canvas submission — download it and drop it directly into the project root (no edits needed).

### 4. Run the dev server

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) — open it in your browser.

There is no separate backend server to start — the backend is Supabase's hosted Postgres/Auth/Storage, reached directly from the frontend via the URL/key in `.env.local`.

### Other scripts

```bash
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
npm run lint      # run Oxlint
```

## Test Credentials

Use the following demo accounts to explore the app depending on what you want to see:

- **priya@hypeup.test** — 12-week streak (the longest), 15 share + 5 ask posts, and enough completed tasks to have earned most badge tiers. Best single account to show streaks + badges + a full feed.
- **kai@hypeup.test** — 10-week streak, 11 share + 5 ask posts. Good backup "power user" account without duplicating Priya's.
- **ava@hypeup.test** — The one deliberately-broken streak: active for 3 weeks a while back, a gap, then back on it this week. Use this to show streak-reset behavior specifically.
- **maya@hypeup.test** — Moderate streak (8 weeks) with a good mix of asks and shares. A reasonable "typical active user" example.
- **ines@hypeup.test** — Only a 2-week streak and light activity. Useful for viewing empty/near-empty states in the UI.

All demo accounts use the same password: **hypeup123**

---

## Architecture

HypeUp is a single-page React application built with Vite and TypeScript, communicating directly with Supabase for authentication, data storage, and file/image storage — there's no custom backend server in between.

- **Client (React + Vite):** Handles all UI, routing, and local state. Pages live under `src/pages`, one file per screen, with shared UI in `src/components/ui` (shadcn-managed) and `src/components/custom` for app-specific components.
- **Data layer:** Supabase-specific logic (queries, mutations, subscriptions) is isolated in custom hooks under `src/hooks` (e.g. `usePosts`, `useCreatePost`), keeping Supabase calls out of page/component code.
- **Backend (Supabase):**
  - **Postgres** stores users, todos, posts, comments, streaks, and achievements.
  - **Auth** handles sign-up/login and session management.
  - **Storage** holds user-uploaded assets (e.g. profile images).
- **Styling:** Tailwind CSS v4 utility classes, with shadcn/ui (Base UI) components for consistent interactive elements.

This keeps the app thin on the client side and pushes persistence, auth, and storage entirely to Supabase's managed services.

## Tech Stack

- **Frontend:** React + Vite + TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (Base UI)
- **Backend:** Supabase (Postgres, Auth, Storage)
- **Routing:** React Router

## Project Structure

```
src/
├── components/
│   ├── ui/         # shadcn-managed components — installed via CLI
│   └── custom/     # our own custom components, some reusable and 
│                     some for keeping page layout organized
├── pages/          # one file per screen (Onboarding, Login, Home, etc.)
├── hooks/          # Supabase data hooks (usePosts, useCreatePost, etc.)
├── lib/            # helpers (cn(), Supabase client, etc.)
└── assets/         # images, logos, icons
```