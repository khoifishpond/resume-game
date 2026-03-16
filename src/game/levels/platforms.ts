// Platform layout for all zones.
// Each entry: [x, y, widthInTiles]
// x/y are world pixel coords of the platform's left edge top surface.
// GROUND_Y = 688; platforms sit above that.

export const PLATFORM_DATA: [number, number, number][] = [
  // Zone 1 — CSULB (0–1600): gentle intro, low platforms
  [300, 580, 4],
  [600, 500, 3],
  [900, 580, 5],
  [1200, 480, 4],

  // Zone 2 — Optum (1600–3600): steady climbing, corporate staircase feel
  [1800, 560, 4],
  [2100, 480, 3],
  [2400, 400, 4],
  [2700, 480, 3],
  [3000, 560, 5],
  [3300, 460, 4],

  // Zone 3 — Turing (3600–5000): tight jumps, fast-paced bootcamp energy
  [3700, 520, 2],
  [3900, 440, 2],
  [4100, 360, 2],
  [4300, 440, 2],
  [4500, 520, 3],
  [4700, 400, 2],
  [4900, 480, 3],

  // Zone 4 — Job Search (5000–6200): harder gaps, more obstacles, darker
  [5100, 540, 2],
  [5350, 460, 2],
  [5600, 380, 2],
  [5800, 460, 2],
  [6000, 540, 2],
  [6150, 440, 3],

  // Zone 5 — Chronograph (6200–9000): open and rewarding, bigger platforms
  [6400, 520, 5],
  [6800, 440, 4],
  [7200, 500, 6],
  [7600, 420, 4],
  [8000, 480, 5],
  [8400, 400, 4],
  [8700, 480, 4],
]
