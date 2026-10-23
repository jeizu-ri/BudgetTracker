---
name: Budget (Contact Sheet)
description: A weekly allowance tracker printed like a proof sheet, marked up with one red grease pencil.
colors:
  proof-paper: "#ece5d3"
  proof-sheet: "#f5f0e1"
  proof-chip: "#e1d9c4"
  ink: "#14110e"
  body-ink: "#2a2520"
  pencil-gray: "#675f50"
  ruled-line: "#b9ae94"
  grease-red: "#b23219"
  grease-paper: "#f6f1e3"
  ochre: "#8f5a14"
  frame-cell: "#14110e"
  frame-ink: "#f1ead8"
  frame-muted: "#a79f8c"
  darkroom-paper: "#13110e"
  darkroom-sheet: "#1c1915"
  darkroom-chip: "#27231d"
  darkroom-ink: "#f1ead8"
  darkroom-body: "#e3dbc7"
  darkroom-muted: "#a39b88"
  darkroom-rule: "#3d3830"
  darkroom-grease: "#f0654a"
  darkroom-on-grease: "#13110e"
  darkroom-ochre: "#e0a24a"
  darkroom-frame-cell: "#2d2821"
typography:
  numeral-hero:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(3.5rem, 19vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 75"
  page-title:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "0.07em"
    fontVariation: "'wdth' 75"
  sheet-title:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.07em"
    fontVariation: "'wdth' 75"
  section-title:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.07em"
    fontVariation: "'wdth' 75"
  frame-numeral:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "26px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 75"
  edge-label:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.07em"
    fontVariation: "'wdth' 75"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  body-strong:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.375
  caption:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  button-label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1
  nav-label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1
rounded:
  cell: "1px"
  frame: "2px"
  control: "3px"
spacing:
  hairline: "1px"
  frame-gap: "6px"
  cell-gap: "3px"
  control-gap: "8px"
  row: "12px"
  gutter: "20px"
  section: "36px"
components:
  button-primary:
    backgroundColor: "{colors.grease-red}"
    textColor: "{colors.grease-paper}"
    typography: "{typography.button-label}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 16px"
  button-primary-lg:
    backgroundColor: "{colors.grease-red}"
    textColor: "{colors.grease-paper}"
    typography: "{typography.button-label}"
    rounded: "{rounded.control}"
    height: "56px"
    padding: "0 20px"
  button-secondary:
    backgroundColor: "{colors.proof-chip}"
    textColor: "{colors.ink}"
    typography: "{typography.button-label}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 16px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-label}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.pencil-gray}"
    typography: "{typography.button-label}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 16px"
  button-warn:
    backgroundColor: "{colors.proof-chip}"
    textColor: "{colors.ochre}"
    typography: "{typography.button-label}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 16px"
  input:
    backgroundColor: "{colors.proof-sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 12px"
  input-amount:
    backgroundColor: "{colors.proof-sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "56px"
    padding: "0 12px"
  frame-cell:
    backgroundColor: "{colors.frame-cell}"
    textColor: "{colors.frame-ink}"
    typography: "{typography.frame-numeral}"
    rounded: "{rounded.frame}"
    padding: "10px 2px 8px"
  repeat-cell:
    backgroundColor: "{colors.frame-cell}"
    textColor: "{colors.frame-ink}"
    typography: "{typography.edge-label}"
    rounded: "{rounded.frame}"
    padding: "10px 14px"
  category-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-label}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 16px"
  category-chip-selected:
    backgroundColor: "{colors.frame-cell}"
    textColor: "{colors.frame-ink}"
    typography: "{typography.button-label}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 16px"
  sheet:
    backgroundColor: "{colors.proof-sheet}"
    textColor: "{colors.ink}"
    padding: "24px 20px 20px"
  nav-tab:
    backgroundColor: "{colors.proof-paper}"
    textColor: "{colors.pencil-gray}"
    typography: "{typography.nav-label}"
    height: "58px"
  nav-tab-active:
    backgroundColor: "{colors.proof-paper}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-label}"
    height: "58px"
  progress-cell:
    backgroundColor: "transparent"
    rounded: "{rounded.cell}"
    height: "24px"
  progress-cell-filled:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.cell}"
    height: "24px"
  undo-toast:
    backgroundColor: "{colors.frame-cell}"
    textColor: "{colors.frame-ink}"
    rounded: "{rounded.frame}"
    padding: "6px 6px 6px 16px"
---

# Design System: Budget (Contact Sheet)

## Overview

**Creative North Star: "Contact Sheet, Grease Pencil"**

The week is a sheet of numbered frames and the user marks it with a red grease pencil. By day the ground is proof paper (warm, matte, a little yellow); by night it is a dim darkroom desk. The balance is the largest type on the page and is printed straight on the paper, with no card around it. Seven near-black cells in a ruled grid stand for Monday to Sunday, and everything else (section rows, goal blocks, activity lines, nav cells) is divided by hairlines rather than boxed.

There is exactly one accent: grease-pencil red. It is never a fill color for decoration; it appears as the primary action, as a loose hand-drawn loop or underline that draws itself once, and as the single top bar in a category breakdown. The type pairs a condensed, uppercase "edge print" face (Archivo at 75% width, the stamped letters along a film edge) with Hanken Grotesk for everything that is read. The feeling is calm and quick, a marked-up proof and never a spreadsheet.

The system rejects the card-stack wallet, the stat-tile hero, camera-HUD chrome (corner brackets, viewfinder overlays), shadows, gradients, and glass. Cinema and photography live in the chrome (frames, edge print, pencil marks), never in literal imagery: the build ships no rasters except the PWA icons.

**Key Characteristics:**
- Semantic tokens flip with `html.dark`; components never write `dark:` pairs.
- Hairline rules instead of card borders; flat everywhere, no shadows.
- Near-black frame cells are the one heavy mass; they carry dates, repeat amounts, selected chips, the toast, and the app mark.
- Grease marks (loop, underline) are the only decoration and the only motion that draws.
- Condensed uppercase numerals and edge print for identity; plain grotesk for reading.
- Tight radii (1 to 3px): cells and controls read as cut paper, never as pills.

## Colors

A two-state palette of warm paper neutrals, one grease-pencil red, and a quiet ochre for over-budget. Light is proof paper; dark is a darkroom desk. The frontmatter holds both states; components reference the light names and the app flips them through CSS variables.

### Primary
- **Grease Red** (#b23219; dark: Darkroom Grease #f0654a): the only accent. Primary buttons, the loop on today's frame and the active tab, the underline beneath page titles, the red bar for the top category, focus rings and outlines, caret and selection tint, the "balance fix" activity mark, and the hover color of destructive icons.
- **Grease Paper** (#f6f1e3; dark: #13110e): text on a grease-red fill.

### Secondary
- **Ochre** (#8f5a14; dark: #e0a24a): the over-budget nudge and form errors. Informational, never alarm red.

### Neutral
- **Proof Paper** (#ece5d3; dark: #13110e): page ground, nav bar ground, theme-color.
- **Proof Sheet** (#f5f0e1; dark: #1c1915): the raised surface for inputs and the bottom sheet.
- **Proof Chip** (#e1d9c4; dark: #27231d): secondary and warn button fill, inline code.
- **Ink** (#14110e; dark: #f1ead8): headings, balance, filled progress cells, selected-tab text, sheet top rule.
- **Body Ink** (#2a2520; dark: #e3dbc7): running text and amounts beside labels.
- **Pencil Gray** (#675f50; dark: #a39b88): captions, inactive tab, placeholders, ghost button text.
- **Ruled Line** (#b9ae94; dark: #3d3830): every hairline, empty progress cells, input idle border at reduced strength.
- **Frame Cell** (#14110e; dark: #2d2821): the black cells. In dark mode they are lifted to #2d2821 so they stay visible against the #13110e desk.
- **Frame Ink** (#f1ead8) and **Frame Muted** (#a79f8c): type inside a frame cell; the same in both modes.

### Named Rules
**The One Pencil Rule.** Grease red is the only accent. It marks where she is (today, active tab, selected category) or what to press (primary action). If a second color is needed for meaning, it is ochre, and it stays a text color.

**The Dark Cell Lift Rule.** In dark mode the frame cell is #2d2821, not the ink value. A frame must separate from the desk by value, not by an outline.

**The No Alarm Rule.** Over-budget is ochre text. Red is never used to scold.

## Typography

**Display / Edge Font:** Archivo (variable, width 75%, with Arial Narrow, sans-serif)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif)

**Character:** Archivo condensed is the stamped lettering along a film margin: uppercase, tracked, heavy, and numeric. Hanken Grotesk is a friendly, plain reading face that stays out of the way. Archivo is used for what is printed on the sheet (identity, numerals, headings); Hanken for what is said to her.

### Hierarchy
- **Numeral Hero** (800, clamp(3.5rem, 19vw, 5.25rem), line-height 1, tracking -0.015em, tabular figures): the balance only. The largest thing on any screen.
- **Page Title** (700 edge caps, 40px, line-height 0.95, tracking 0.07em; 56px on sign-in): one per page, with a grease underline.
- **Sheet Title** (700 edge caps, 26px, line-height 1): bottom-sheet headings.
- **Section Title** (700 edge caps, 17px, line-height 1): row labels followed by a ruled line to the edge; also form labels on Settings at the same size.
- **Frame Numeral** (800, 26px; 22px for repeat amounts; 17px for the peso mark): dates and amounts inside black cells.
- **Edge Label** (700 caps, 10 to 13px, tracking 0.07em): day names in frames, category in repeat cells, week range in the header, definition terms in Review.
- **Body** (400, 15px, line-height 1.625; max 34rem for intro copy): descriptions, captions, empty states. Strong body is 600 at 15px for category names and entry titles.
- **Caption** (400, 13px): entry subtitles.
- **Button / Label** (600, 15px; nav labels 11px): Hanken, sentence case.

### Named Rules
**The Edge Print Rule.** Condensed caps are for printed things: titles, row labels, numerals, frame text. Sentences are never set in edge print.

**The Tabular Rule.** Every peso amount uses tabular figures so columns and the animated count stay steady.

## Layout

A single phone-first column: content is centered at a maximum of 32rem (512px) and widens to 42rem (672px) from the `md` breakpoint for iPad review. Side gutters are 20px or the safe-area inset, whichever is larger. Pages stack as a vertical flow with 36px between sections (`page-stack`), and the content leaves about 6.5rem plus the safe-area inset at the bottom for the fixed tab bar.

The header is a single row: app mark left, week date range right, one hairline below. Sections are separated by a hairline and 20px of top padding rather than boxes. The week row is a seven-column grid with 6px gaps; each frame has a 3:4 aspect ratio. The bottom navigation is four equal cells divided by hairlines, 58px tall. Controls are at least 44px tall for one-handed use (inputs and buttons 48px, primary large 56px). The grid is content-driven; rhythm comes from the 36px section gap, 12px row padding, and 8px control gaps.

Reduced-motion users get the same layout with animations collapsed to near-zero duration.

## Elevation & Depth

Flat. There are no shadows, gradients, blur, or glass anywhere in the build. Depth is carried by value (Proof Sheet sits one step lighter than Proof Paper in both modes), by black frame cells against paper, and by hairlines. The bottom sheet is separated by a 2px ink rule on its top edge over a 60% black scrim. The toast is simply a black frame cell.

### Named Rules
**The Flat Sheet Rule.** If something needs to stand out, make it a frame cell, a hairline, or a grease mark. Never lift it with a shadow.

## Shapes

Cut paper: tight corners and straight rules. Frame cells use a 2px radius, controls and chips 3px, progress cells 1px. Nothing is pill-shaped or circular except what the pencil draws. Boundaries are hairlines (1px) in Ruled Line; the only 2px rule is the sheet's top edge. The grease marks are the one organic form: a loose loop that overshoots its own start, and a quick underline that lifts at the end, both stroked at 2.5px with round caps and a non-scaling stroke so they stay the same weight at any size.

## Components

### Buttons
Quiet, rectangular, and legible. 15px semibold, 3px radius, a 2px grease ring with offset on keyboard focus, 40% opacity when disabled, 85% opacity on press.
- **Primary (default):** Grease Red fill, Grease Paper text, 48px high with 16px side padding; hover brightens. Large is 56px and full width (Log expense, Add, Save, Sign in).
- **Secondary:** Proof Chip fill, Ink text, 1px Ruled Line border; hover darkens the border toward ink.
- **Outline:** transparent, Ink text, 1px ink border at 70%; hover fills with Proof Chip ("Move money").
- **Ghost:** transparent, Ink (or Pencil Gray when set) text, underline on hover, no border ("Fix my balance", "Forgot password").
- **Warn:** Proof Chip fill with Ochre text.
- **Icon:** 44px square, primary fill (Add goal).

### Inputs / Fields
- **Style:** Proof Sheet fill, 1px border in Pencil Gray at 60%, 3px radius, 48px high, 16px text; amount fields are 56px high at 24px semibold.
- **Focus:** the border turns grease red with a soft 25% red ring.
- **Label:** Hanken 14px semibold in Ink above the field; Settings uses edge caps at 17px.
- **Error:** ochre text beneath, announced with a role alert.

### Navigation
A fixed bottom bar on Proof Paper with a hairline on top and hairline dividers between four equal cells (Home, Goals, Review, Settings), 58px tall, with outline icons (1.75 stroke; 2.25 when active) over an 11px label. Inactive is Pencil Gray; active is Ink with a grease loop drawn around the icon and label. The bar respects the bottom safe area.

### Week Frames (signature)
Seven black cells, Monday to Sunday, each a 3:4 portrait: day name in edge caps (Frame Muted) at top, the date as a condensed numeral in the middle, and a 3px tick at the bottom that fills when spending was logged that day. Future days dim their numeral. Today's cell is a button that opens Log expense and wears the grease loop, drawn around the cell with a 7px overhang.

### Grease Mark (signature)
An SVG stroke in the accent, either a loop (around today's frame, active nav tab, selected category) or an underline (beneath page and sign-in titles). It draws itself once in 520ms (ease `cubic-bezier(0.22, 1, 0.36, 1)`) and stays visible; it is aria-hidden and ignores pointer events. It is keyed to remount when the selection changes so the stroke re-draws on the new target.

### Section Title
An edge-caps row label at 17px followed by a hairline that runs to the right edge, like a labeled strip on a contact sheet. Used for Activity and Remember why.

### Surface
Not a card. A section wrapper that has a hairline above it and 20px top padding; there is no fill, border box, or radius. Goals and the sign-in form use it.

### Frame Progress
Savings progress as a strip of 20 equal cells, each worth 5%, 24px tall with 3px gaps. Filled cells are solid Ink; empty cells are hollow with a Ruled Line border. A nonzero amount always fills at least one cell. Cells fill left to right with a 14ms stagger.

### Category Bar
Each category row is name and amount on one line above a 3px bar in Ruled Line at 60%. The largest category is filled in Grease Red; the others are Ink.

### Bottom Sheet
Anchored to the bottom, centered up to 42rem, Proof Sheet fill, a 2px Ink rule on the top edge, no radius, 24px top and 20px side padding, and a 44px close target. Title in edge caps at 26px. Category choices are 44px chips: outlined by default, a black frame cell with a grease loop when selected.

### Repeat Cells and Toast
Recent expenses repeat as small frame cells in a horizontally scrolling row (edge-caps category over a 22px numeral). The undo toast is a frame cell with sentence-case text, an Undo action underlined in grease red, and a quiet OK.

### Activity Row
A hairline-separated line with a small 10×14px frame mark: solid for money in or saved, hollow for spent, red for a balance fix; then title and caption, and an 44px undo target that turns red on hover.

### App Mark
A 28px black frame cell holding a condensed peso numeral beside the word "Budget" in edge caps. The PWA icons repeat it: a dark cell, a cream peso sign, and a red pencil stroke.

### Violet palette (optional, chosen in Settings)
A second palette the user can pick, independent of light/dark mode. Same sheet printed on lavender stock with a violet pencil: the single accent becomes violet (light #6d28d9, dark #b794f6) and the neutrals are tinted to match (paper #ebe6f3 / #120e1c, sheet #f6f3fa / #1b1627, frame cells #1b1430 / #2b2340, ink #17112a / #efe9fb). Still exactly one accent; ochre stays the over-budget colour. Applied with `html.theme-violet` (`.dark` stacks on top), stored in `localStorage` as `budget-palette`, and set before first paint by a small script in `index.html`.

## Do's and Don'ts

### Do:
- **Do** print the balance straight on the paper at Numeral Hero size; no container around it.
- **Do** use frame cells (#14110e light, #2d2821 dark) for anything dated, repeated, selected, or transient.
- **Do** mark location and selection with a grease loop, and titles with a grease underline; let it draw once.
- **Do** separate sections with a 1px Ruled Line hairline and generous space (36px between sections, 20px under a rule).
- **Do** use semantic tokens (`paper`, `sheet`, `ink`, `accent`, `frame`) so light and dark flip with `html.dark`.
- **Do** use tabular figures for every peso amount and keep tap targets at 44px or more.
- **Do** use ochre text for over-budget and errors.

### Don't:
- **Don't** put pesos in a card, stat tile, or rounded panel; hairlines, not boxes.
- **Don't** add shadows, gradients, blur, or glass.
- **Don't** introduce a second accent color or make red a decoration; red means "press" or "you are here".
- **Don't** use alarm red for over-budget.
- **Don't** add camera-HUD chrome (corner brackets, crosshairs, viewfinder overlays) or literal movie or photo imagery.
- **Don't** round controls into pills or circles; the maximum radius is 3px.
- **Don't** set sentences or body copy in edge print.
- **Don't** use `dark:` variant pairs on components.
