# BudgetTracker

A personal allowance tracker PWA for one person — Philippine pesos (₱), Firebase sync across iPhone and iPad, purple-themed UI.

## Local setup (Windows)

1. **Install [Node.js](https://nodejs.org/)** (LTS, v22+ recommended) and **Git**.
2. Clone the repo and install dependencies:

   ```powershell
   cd C:\path\to\BudgetTracker
   npm install
   ```

3. Copy `.env.example` to `.env.local` and fill in Firebase values (see Firebase setup below).
4. Run the app:

   ```powershell
   npm run dev
   ```

5. Open the URL shown in the terminal (usually `http://localhost:5173`).

## Personal photos

Place resized images (~600px wide) in `public/assets/`:

- `camera.jpg` — Fujifilm X-T5 with lens  
- `idol1.jpg` — idol photo 1  
- `idol2.jpg` — idol photo 2  

See `public/assets/PHOTOS.md`.

## Firebase setup

1. Go to [Firebase Console](https://console.firebase.google.com/) → **Create a project** (e.g. `budget-tracker-personal`).
2. **Authentication** → Sign-in method → enable **Email/Password** only.
3. **Firestore Database** → Create database (production mode is fine; rules below lock it down).
4. **Project settings** → Your apps → **Web** → register app → copy config into `.env.local`:

   | Variable | Firebase config field |
   |----------|------------------------|
   | `VITE_FIREBASE_API_KEY` | apiKey |
   | `VITE_FIREBASE_AUTH_DOMAIN` | authDomain |
   | `VITE_FIREBASE_PROJECT_ID` | projectId |
   | `VITE_FIREBASE_STORAGE_BUCKET` | storageBucket |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | messagingSenderId |
   | `VITE_FIREBASE_APP_ID` | appId |

5. **Firestore rules** → Rules tab → paste the contents of `firestore.rules` in this repo → **Publish**.

6. **Create her account**: Authentication → Users → **Add user** (email + password). She uses this on iPhone and iPad.

7. **Authorized domains** (after Vercel deploy): Authentication → Settings → Authorized domains → add your Vercel URL (e.g. `budget-tracker-xxx.vercel.app`) and your custom domain if you add one.

### Stop public sign-ups

After her account exists:

- **Authentication** → Settings → **User actions** → disable **Allow new users to sign up** (wording may vary by console version), **or**
- Keep sign-up disabled in the app (this project has **no sign-up UI**); only sign-in works. Without console sign-up disabled, someone could still register via the Firebase API — disabling sign-up in the console is the real lock.

## Vercel deployment

1. Push this repo to GitHub (private `BudgetTracker`).
2. [vercel.com](https://vercel.com) → **Add New Project** → import **BudgetTracker**.
3. Framework preset: **Vite** (auto-detected).
4. Add the same six `VITE_FIREBASE_*` variables under **Environment Variables** for Production (and Preview if you want).
5. Deploy. No `vercel.json` is required for a standard static Vite build (`npm run build`, output `dist`).

**Auto-deploy:** Every push to `main` redeploys when the GitHub repo is connected in Vercel project settings.

## Add to iPhone / iPad Home Screen

1. Open the deployed URL in **Safari**.
2. Sign in with her Firebase email and password (once per device).
3. **Share** → **Add to Home Screen** → name it “Budget”.
4. Repeat on the other device with the same account. Firestore syncs entries in real time (offline entries sync when back online).

## Pre-launch checklist

- [ ] Sign in on iPhone and iPad with the same account  
- [ ] Set **starting balance** in Settings  
- [ ] Log an expense on iPhone → confirm it appears on iPad within a few seconds  
- [ ] Log **allowance** on a Monday (or test with income entry)  
- [ ] **Fix my balance** records a `balance_fix` and updates the big number  
- [ ] Move money to a goal → balance drops, goal progress increases  
- [ ] Turn off Wi‑Fi, add an expense, turn Wi‑Fi on → entry syncs  
- [ ] Add the three photos under `public/assets/` and redeploy  
- [ ] Sunday: open **Review** tab and try “Move leftovers” (optional)

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
