# 🕯 Midnight at Cole Manor

**A fully playable murder mystery escape room — pure HTML/CSS/JS, no server needed.**

---

## 🚀 Deploy to GitHub Pages

1. Create a new GitHub repository (public)
2. Upload ALL files in this folder (keep the structure as-is)
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Your game will be live at: `https://[your-username].github.io/[repo-name]/`

## 💻 Play Locally

Just open `index.html` in any modern browser. No server, no installation.

---

## 🎮 The Game

**Victim:** Dr. Adrian Cole — Wealthy inventor  
**Your mission:** Identify the killer before the 60-minute countdown expires  
**Difficulty:** 7/10 — Note-taking strongly recommended

### Suspects
| Suspect | Role | Motive |
|---------|------|--------|
| Emma Cole | Wife | Inheritance & insurance |
| Lucas | Business Partner | Lost millions |
| Noah | Assistant | Recently fired |
| Sarah Cole | Sister | Will dispute |

### Rooms
| Room | Unlock Condition |
|------|-----------------|
| Study | Free |
| Kitchen | Free |
| Bedroom | Free |
| Basement Laboratory | Find Basement Key (bedroom safe) |
| Security Office | Find Keycard (basement wire panel) |

---

## 🧩 Puzzles (15 total)

| Room | Puzzle | Type |
|------|--------|------|
| Study | Diary cipher | 3-digit code |
| Study | Torn photograph | Piece ordering |
| Study | Locked desk | 3-digit code |
| Kitchen | Recipe book analysis | Multi-select |
| Kitchen | Fingerprint matching | Wire connection |
| Kitchen | Timeline analysis | Multi-select |
| Bedroom | Audio reconstruction | Clip ordering |
| Bedroom | Hidden safe | 4-digit code |
| Bedroom | UV mirror sequence | Click sequence |
| Basement | CCTV ordering | Chronological ordering |
| Basement | Timeline board | Event ordering |
| Basement | Wire panel | Wire connection |
| Security | Admin terminal | 4-digit code |
| Security | CCTV comparison | Multi-select |
| Security | Hex decode | Text entry |

---

## 💡 Hint System (5 challenges — all extremely hard)

| Room | Challenge | Type |
|------|-----------|------|
| Study | Caesar cipher (shift 3) | Text decoding |
| Kitchen | 4×4 logic grid (10 clues) | Logic deduction |
| Bedroom | 3×3 magic square | Number placement |
| Basement | Binary-to-ASCII decoder | Binary conversion |
| Security | Combined code from all 4 previous | Combined |

Hints are **completely optional** — the game is fully solvable without them.  
But they contain deep analytical breakdowns that are very satisfying to unlock.

---

## 🔚 Endings

| Ending | How to get it |
|--------|--------------|
| ⏱ Timeout | Let the clock reach 0 |
| 💀 Wrong Accusation | Accuse the wrong suspect |
| ✅ Good Ending | Correctly accuse Emma Cole |
| ⭐ Secret Ending | Accuse Emma AND find all 7 hidden ◆ symbols |

---

## 🕵️ Tips (No spoilers)

- **Take notes.** The desk lock code spans three separate rooms.
- **Read everything.** Adrian left clues hidden in plain sight.
- **Question the obvious.** The most suspicious evidence may be planted.
- **Follow the timestamps.** Discrepancies in times are always meaningful.
- Watch for faint ◆ symbols — they unlock the secret ending.

---

## 📁 Files

```
index.html       Game shell + font imports
style.css        Full gothic dark-mode design (~500 lines)
js/
  data.js        All game content (rooms, items, evidence, puzzles)
  puzzles.js     Puzzle renderers and interaction logic
  game.js        Main game controller (timer, state, endings)
README.md        This file
```

---

*"One of us is the killer. Find them before midnight."*
