# Budget

A calm, offline-friendly allowance tracker for students, built as an installable web app (PWA). Track a weekly allowance in Philippine pesos (₱), log spending in two taps, and save toward goals you can actually see.

The interface is designed like a **contact sheet**: your week is a row of seven numbered frames, the balance is printed on proof-paper, and a red grease-pencil mark circles today. Light mode is proof paper, dark mode is a darkroom desk.

## Features

- **Balance at a glance**: starting balance plus every entry, with a daily pace until the next Monday allowance.
- **Week frames**: Monday to Sunday, today circled in red, tap it to log an expense.
- **Quick logging**: amount plus category (Food, Transport, School, Fun, Bills, Other), and one-tap repeat chips for things you buy often.
- **Undo anything**: every log can be undone from a toast or from the Activity list.
- **Fix my balance**: enter the cash you actually have and the difference is logged.
- **Monday allowance**: one tap to log your allowance.
- **Goals with pictures**: add a photo of what you're saving for, move money into it, and watch the progress frames fill.
- **Review**: week totals, category breakdown, Sunday leftovers, and a full **goal history** showing every deposit per goal.
- **Remember why**: your closest goal and a rotating reminder on the home screen.
- **Works offline**: Firestore offline persistence syncs when you're back online.
- **Light and dark themes**, installable on iPhone, iPad, and Android.

## Tech stack

React, Vite, TypeScript, Tailwind CSS v4, Framer Motion, Radix UI primitives, Firebase Auth (email/password) and Firestore, `vite-plugin-pwa`.

## Getting started

Requires [Node.js](https://nodejs.org/) 20 or newer.

```bash
git clone https://github.com/jeizu-ri/BudgetTracker.git
cd BudgetTracker
npm install
cp .env.example .env.local   # then fill in your Firebase values
npm run dev
```

On Windows PowerShell use `Copy-Item .env.example .env.local`. Open the URL printed in the terminal, usually `http://localhost:5173`.

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Preview the production build |

## Firebase setup

This app stores each user's data under `users/{uid}` in Firestore. You bring your own Firebase project.

1. In the [Firebase Console](https://console.firebase.google.com/), create a project.
2. **Authentication** → Sign-in method → enable **Email/Password** only.
3. **Firestore Database** → create a database.
4. **Project settings** → Your apps → **Web** → register an app, then copy the config into `.env.local`:

   | Variable | Firebase config field |
   |----------|------------------------|
   | `VITE_FIREBASE_API_KEY` | apiKey |
   | `VITE_FIREBASE_AUTH_DOMAIN` | authDomain |
   | `VITE_FIREBASE_PROJECT_ID` | projectId |
   | `VITE_FIREBASE_STORAGE_BUCKET` | storageBucket |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | messagingSenderId |
   | `VITE_FIREBASE_APP_ID` | appId |

5. **Firestore rules** → paste the contents of [`firestore.rules`](firestore.rules) and publish. They let a signed-in user read and write only their own data and deny everything else.
6. **Authentication → Users** → add your account (email and password).
7. The app has **no sign-up screen**. To stop anyone creating accounts through the Firebase API, also disable new sign-ups in the console (Authentication → Settings → User actions).

> A Firebase web config is not a secret, and these values end up in the built app. Your protection is the Firestore rules and disabled sign-ups, not hiding the keys. Never commit `.env.local`.

## Deploying to Vercel

1. Import the repository in [Vercel](https://vercel.com). The Vite preset is detected automatically.
2. Add the six `VITE_FIREBASE_*` variables for Production (and Preview if you like).
3. Deploy. Every push to `main` redeploys.
4. In Firebase → Authentication → Settings → **Authorized domains**, add your Vercel domain, or sign-in will fail.
5. If you want the site to open without a Vercel login, turn off Vercel Authentication under the project's Deployment Protection settings. The app still requires a Firebase sign-in.

## Install on your phone

Open the deployed URL, sign in, then use **Share → Add to Home Screen** (iOS Safari) or **Install app** (Chrome on Android).

## How goal pictures are stored

Pictures are resized in the browser to about 800px and about 100 KB, then saved as a small JPEG inside the goal's Firestore document. This keeps the app free of extra services such as Firebase Storage, and it syncs and works offline like everything else.

## Project notes

- [`PRODUCT.md`](PRODUCT.md): who it's for, constraints, and brand commitments.
- [`DESIGN.md`](DESIGN.md): the design system (colors, type, components).
