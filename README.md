# YEON-OS

A birthday card disguised as a retro operating system, received as a signal from
an unknown planet. The planet is Yeon.

Built as plain HTML, CSS and vanilla JavaScript. No frameworks, no build step,
no npm, no dependencies to install. Open `index.html` and it runs.

---

## Running it

Double-click `index.html`. That's it.

If you'd rather serve it over HTTP (the YouTube player is happier that way):

```bash
python -m http.server 8790
```

Then open <http://localhost:8790>.

---

## Editing the content

**Everything you need to change is in `js/content.js`.** You should never have to
open the HTML or the JavaScript. That file is commented section by section, in
the order things appear on screen.

Three things to know:

1. **Text comes in pairs.** `{ en: "English", ko: "한국어" }`. Fill in both. If you
   leave one side empty the site falls back to the other, so a half-translated
   line never shows up blank.
2. **Paragraphs are arrays.** Each string is its own line. An empty string `""`
   makes a blank line.
3. **`[[LIKE_THIS]]` is a blank I couldn't fill.** Replace the whole thing,
   brackets included. Full list at the bottom of this file.

Save the file, refresh the browser. There is no build step.

### Adding photos

Drop image files into `assets/photos/`, then list them in `content.js` under
`gallery.photos`:

```js
photos: [
  { file: 'jeju.jpg',  caption: { en: 'Jeju, last spring', ko: '작년 봄 제주' } },
  { file: 'noodles.jpg', caption: { en: 'The noodle incident', ko: '그 국수 사건' } }
]
```

Leave the list empty and the gallery draws numbered placeholder tiles instead,
which still look deliberate. A filename that doesn't exist falls back to a
"404" tile rather than a broken image.

Landscape photos around 1200px wide are the sweet spot. They're loaded at full
size, so don't drop 8MB camera originals in there.

### Changing the timings

In `content.js`:

- `boot.charDelay` / `boot.lineDelay` — first-visit BIOS speed (~11 seconds).
- `boot.fastCharDelay` / `boot.fastLineDelay` — repeat visits (~2 seconds).
  `fastCharDelay: 0` means "print whole lines at once".
- `message.typeSpeed` — how fast the birthday message types itself out.

---

## Deploying to GitHub Pages

Every path in the project is relative, so it works from a subdirectory with no
configuration at all.

```bash
git remote add origin https://github.com/<your-username>/YEON-OS.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Deploy from a
branch**, pick `main` and `/ (root)`, save.

It goes live at `https://<your-username>.github.io/YEON-OS/` in a minute or two.

No workflow file, no Jekyll config, no `.nojekyll` needed — nothing here starts
with an underscore.

---

## How it's put together

```
index.html          the shell: background layers, boot screen, desktop, taskbar
css/style.css       all of it, hand-written, sectioned and commented
js/content.js       every word on the site  <-- the only file you need to edit
js/app.js           the machine: windows, boot, starfield, apps, easter eggs
assets/favicon.svg  a drawn planet
assets/photos/      your photos go here
```

A few things worth knowing:

- **Every icon is drawn in code.** They're 16×16 pixel grids in `js/app.js`
  (look for `GRIDS`), turned into SVG rectangles at runtime. No image files, no
  icon font, no emoji. If you want to redraw one, edit the grid — `k` is ink,
  `w` white, `y` gold, `c` cyan, `.` transparent, and the key is in `PAL`.
- **The starfield** is a canvas, ~200 stars drifting slowly. The Konami code
  sends it into hyperspace for a few seconds.
- **The circuit-board pattern and the scanlines** are generated in CSS. The
  circuit tile is an inline SVG data URI in `style.css`.
- **The music** is the official YouTube embed for 이 별로부터, hidden behind a
  custom skin and driven by the YouTube IFrame API. Nothing is hosted here and
  **nothing makes a sound until she presses play.** If YouTube can't be reached,
  the player shows a link out instead of sitting there broken.
- **Fonts** load from Google Fonts and jsDelivr, non-blocking, with system
  fallbacks. Offline, it degrades to Tahoma/monospace and still looks like an
  operating system.
- **Mobile** (under 768px) drops the draggable-window metaphor and renders the
  same windows as a vertical stack of cards, keeping the title bars, bevels,
  fonts, starfield and scanlines. The boot screen and player stay.
- **Language** is remembered in `localStorage`, as is whether she's seen the
  boot sequence before, and the starfield/scanline toggles under **View**.

### Easter eggs

- **Konami code** (↑↑↓↓←→←→BA) — the starfield goes to hyperspace.
- **Type `yeon`** anywhere — a small planet drifts across the desktop.
- **Click the YEON-OS wordmark** — same thing, for phones, which can't type.
- **Help → About YEON-OS** — the About box.
- **Search → For Signal...** — a fake scan that finds exactly one planet.
- **File → Exit** and **Start → Shut Down** — both politely refuse.
- **do_not_open.exe** — four errors pile up and the last one isn't an error.

---

## What I still owe you

Every `[[PLACEHOLDER]]` currently visible on the site. All of them live in
`js/content.js`. Nothing here is invented — I left every fact and every real
sentiment for you.

### The facts (8)

| Placeholder | What it wants | Where it shows |
|---|---|---|
| `[[HER_AGE]]` | A number | BIOS version, About box, README heading, Uptime |
| `[[HER_KOREAN_NAME]]` | Her name in Hangul | Title bars, Device row |
| `[[HER_KOREAN_NAME_VOCATIVE]]` | How you'd actually say it to her (e.g. 연아) | The final birthday dialog |
| `[[HER_CITY]]` / `[[HER_CITY_KO]]` | Where she is | BIOS origin line, Location row |
| `[[BIRTHDAY_DATE]]` / `[[BIRTHDAY_DATE_KO]]` | The date, written how you like | "Last restart" row |
| `[[HER_NAME_FOR_THE_LICENCE_LINE]]` / `_KO` | Her name again, for "Licensed to:" | About box |

### The writing (5, each in both languages)

| Placeholder | What it wants |
|---|---|
| `[[SOMETHING_AFFECTIONATE_HERE]]` / `_KO` | The "Known issues" row. One dry, fond line — the best joke in properties.exe and it should be yours |
| `[[WRITE_A_LINE_OR_TWO_HERE_IN_YOUR_OWN_VOICE]]` / `_KO` | Two lines at the end of README.txt |
| `[[OPENING_LINE_HOW_YOU_ACTUALLY_GREET_HER]]` / `[[OPENING_LINE_KO]]` | First line of the card |
| `[[PARAGRAPH_ONE_THE_REAL_THING_YOU_WANT_TO_SAY]]` / `[[PARAGRAPH_ONE_KO]]` | The card itself |
| `[[PARAGRAPH_TWO_OPTIONAL]]` / `[[PARAGRAPH_TWO_KO_OPTIONAL]]` | More, if you have more. Delete the line if you don't |
| `[[SIGN_OFF]]` / `[[SIGN_OFF_KO]]` | How you end it |

The message window types itself out, so keep lines fairly short — under about
50 characters each reads best and wraps cleanly on a phone.

### Only if you add photos

`[[CAPTION_1]]`…`[[CAPTION_3]]` and their `_KO` pairs are sitting in a commented-out
example inside `gallery.photos`. Ignore them entirely unless you add pictures.

### Two things I did write

The BIOS boot text and the fake error dialogs are jokes about the format rather
than about her, so those are finished. Change them if you can do better — the
error cascade is the `errors` array, the BIOS is `boot.lines`.

---

Built by Chris on Earth. Nothing here phones home: no analytics, no cookie
banner, no trackers, and the only external requests are the two font CDNs and
YouTube — and YouTube isn't contacted until player.exe is opened.
