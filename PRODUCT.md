# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React, Vite, TypeScript, Tailwind CSS v4, Framer Motion, Radix/shadcn-style UI, Firebase Auth + Firestore offline sync, vite-plugin-pwa.

## Users

One person: a university student in the Philippines tracking weekly allowance, spending, and savings goals (camera fund). Uses phone one-handed between classes; iPad for review.

## Product Purpose

Make allowance, spending, and goals feel calm and fast, never like a spreadsheet. Sync across devices; work offline.

## Positioning

A personal budget shaped like a contact sheet: the week is a row of seven numbered frames, the balance is printed on the paper, and the user marks the sheet with a red grease pencil. Undo-friendly logging and honest balance fixes.

## Constraints

- Philippine pesos (₱) only
- Email/password auth only; single user household
- No Google sign-in, no extra charts, no growth features

## Brand commitments

- **Proof paper (light, default by system):** paper `#ece5d3`, sheet `#f5f0e1`, ink `#14110e`, rule `#b9ae94`, grease-pencil red `#b23219`
- **Darkroom desk (dark):** paper `#13110e`, sheet `#1c1915`, ink `#f1ead8`, frame cells `#2d2821`, grease red `#f0654a`
- One accent only: grease-pencil red, drawn as loose SVG loops and underlines that animate in once
- Type: Archivo condensed (75% width) for numerals and edge print, Hanken Grotesk for reading text
- Hairline rules instead of card borders; no shadows, no gradients, no glass
- Over-budget nudge: ochre `#8f5a14` (light) / `#e0a24a` (dark), never alarm red
- Cinema / photography tone in the chrome (frames, edge print, pencil marks), not literal movie imagery
