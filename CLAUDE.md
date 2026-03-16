# Resume Game — CLAUDE.md

## Project Overview
A browser-based 2D side-scrolling platformer that presents Khoi Nguyen's resume as an interactive game. Inspired by the Chrome dino game in format, elevated to a MapleStory/Mario/Ragnarok Online art style. Built with Phaser 3 + React + Vite, hosted on GitHub Pages.

## Stack
- **Game engine**: Phaser 3 (Arcade Physics, tilemaps, sprite animation)
- **UI shell**: React 19 + TypeScript
- **Build tool**: Vite (configured for `/resume-game/` base path)
- **Deploy**: `npm run deploy` → GitHub Pages via gh-pages

## Controls
| Key | Action |
|-----|--------|
| A | Move left |
| D | Move right |
| Spacebar | Jump (single jump only) |
| E | Interact with milestone markers |

## Folder Structure
```
src/
  game/
    scenes/     # Phaser scenes (Boot, Preload, MainGame)
    entities/   # Player, MilestoneMarker
    config.ts   # Phaser game config
  data/
    resume.json # All milestone + skill data
  components/   # React components (shell, MilestoneCard overlay)
public/
  assets/       # sprites, tilesets, audio
```

## Commit Style
- One commit per completed method or feature
- Imperative mood, 1–2 sentences max
- git log should read as a coherent build story

## World Zones (left → right)
1. Zone 1 — CSULB (education, warm tones)
2. Zone 2 — Optum (corporate blue, Oct 2017–May 2022)
3. Zone 3 — Turing School (terminal glow, 2022–2023)
4. Zone 4 — Job Search (gritty, dark, obstacle-heavy, no milestone card)
5. Zone 5 — Chronograph (clean SaaS, May 2023–present)

## Milestone Interaction Flow
1. Player walks near marker → "Press E" prompt appears
2. Player presses E → game pauses, MilestoneCard slides in
3. Player presses E or Spacebar → card dismisses, game resumes
4. Marker cannot be re-triggered after dismissal

## Dev Commands
```bash
npm run dev       # local dev server
npm run build     # production build
npm run deploy    # build + push to gh-pages branch
npm run lint      # ESLint
npm run format    # Prettier
```
