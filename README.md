# HypeUp

A social accountability app for tracking tasks, streaks, and hyping each other up.

## System Overview

HypeUp is a web application that runs React locally through Vite and is hosted by Supabase servers. Users can 
create/complete todos, schedule reminders, maintain streaks, unlock achievements, and follow other users to view 
updates in a Strava-like feed. More importantly, they are able write posts to ask for help in starting tasks or 
to show off accomplishments. HypeUp is designed to address the motivational and social support needs of its users
by turning personal progress into a shared, encouraging experience where users can celebrate completed tasks 
and hype each other up!

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (LTS recommended)
- npm (ships with Node)
- Git

### Key package versions

- React 19 / React DOM 19
- Vite 8
- TypeScript ~6.0
- Tailwind CSS 4
- @supabase/supabase-js 2.x

(Full pinned versions live in `package.json`; `npm install` resolves them automatically.)

### 1. Clone the repository

```bash
git clone https://github.com/rjvanaken/hype-up.git
cd hype-up
```

### 2. Install dependencies

```bash
npm install
```

If you hit an error mentioning `Cannot find native binding` or optional dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```
*(On Windows PowerShell: `Remove-Item -Recurse -Force node_modules; Remove-Item -Force package-lock.json`)*

If PowerShell blocks npm with *"running scripts is disabled on this system"*, run:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### 3. Configure environment variables

Create `.env.local` in the project root (gitignored, so you'll need to create it yourself):

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

Please use the following demo account to explore the app:
Email: maya@hypeup.test
Password: hypeup123

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
