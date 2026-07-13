# HypeUp

A social accountability app for tracking tasks, streaks, and hyping each other up.

## Getting Started

Follow these steps to get the project running on your machine.

### 1. Install Node.js

If you don't already have Node installed:

- Download the **LTS** version from [nodejs.org](https://nodejs.org)
- Run the installer with default options — leave "Automatically install the necessary tools" **unchecked**
- **Restart your computer** after installing (not just your terminal — a full restart ensures PATH updates correctly)
- Verify the install:
  ```bash
  node -v
  npm -v
  ```
  Both should print version numbers.

### 2. (Windows only) Allow PowerShell to run scripts

If you see an error like *"running scripts is disabled on this system"*, run:
```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
Type `Y` to confirm if prompted.

### 3. Clone the repo

```bash
git clone <your-repo-url>
cd hype-up
```

### 4. Install dependencies

```bash
npm install
```

If you hit an error mentioning `Cannot find native binding` or optional dependencies, run:
```bash
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```
*(On Mac/Linux, use `rm -rf node_modules` and `rm package-lock.json` instead.)*

### 5. Set up environment variables

Create a file called `.env.local` in the project root (this file is intentionally gitignored, since it holds secrets — it won't come through the clone). Add:

```
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Ask a teammate for the actual values — these are shared separately (Slack, text, etc.), never committed to the repo.

### 6. Run the dev server

```bash
npm run dev
```

You should see something like:
```
VITE ready in ... ms
➜  Local:   http://localhost:5173/
```

Open that URL in your browser to confirm everything's working.

## Tech Stack

- **Frontend:** React + Vite + TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (Base UI)
- **Backend:** Supabase (Postgres, Auth, Storage)
- **Routing:** React Router

## Project Structure

```
src/
├── components/
│   ├── ui/        # shadcn-managed components — installed via CLI, avoid heavy edits
│   └── custom/     # our own reusable components
├── pages/          # one file per screen (Onboarding, Login, Feed, etc.)
├── lib/            # helpers (cn(), Supabase client, etc.)
└── assets/         # images, logos, icons
```
