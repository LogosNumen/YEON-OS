# YEON-OS

A birthday card for Yeon, dressed up as an old computer that's picked up a
signal from an unknown planet. The planet is her.

It's live at https://logosnumen.github.io/YEON-OS/

It's just HTML, CSS and plain JavaScript. No frameworks, nothing to install,
no build step. Open `index.html` and it runs.


## Running it locally

Double-click `index.html`. If the music player acts up when opened as a file,
serve the folder instead:

```bash
python -m http.server 8790
```

and go to http://localhost:8790.


## Changing the words

All the text on the site is in `js/content.js`. You shouldn't need to open any
other file. It's commented and roughly in the order things show up on screen.

Every bit of text has an English and a Korean version, like
`{ en: "hello", ko: "안녕" }`. If you leave one side empty it falls back to the
other, so nothing ever shows up blank. Longer text is a list of lines, and an
empty `""` line is a blank line.

Save, refresh, done.

The menu items in `content.js` either do something built in (like opening a
window) or pop up a little message box that's written right there in the file,
so you can rewrite any of the joke dialogs without touching the code.

The boot screen speed is `boot.charDelay` and `boot.lineDelay`. The first visit
takes about ten seconds and can be skipped with any key. After that it's about
two.


## The gallery

The pictures are in `assets/gallery/` and listed under `gallery.photos` in
`content.js`. At the moment it's eight bits of pixel art drawn for the site:
four cats and four space things.

To add a photo, drop it in that folder and add a line like:

```js
{ file: 'us.jpg', caption: { en: 'a caption', ko: '캡션' } },
```

Try to keep photos around 1200px wide. Full-size phone photos will be slow.


## Updating the live site

GitHub Pages publishes straight from `main`, so pushing is all it takes. It
updates a minute or two later.

```bash
git add -A
git commit -m "Update the card"
git push
```


## Things to know

The icons, the circuit pattern, the scanlines and the gallery art are all drawn
in code. There are no image downloads or icon fonts. The icons are little 16x16
grids near the top of `js/app.js` if you ever want to redraw one.

The song plays through YouTube's own embed with a custom skin over it. Nothing
is hosted here, and nothing makes a sound until she presses play. If YouTube
can't load, the player shows a link instead.

On a phone the windows turn into a scrolling stack of cards. Same look, same
content, just no dragging. On a computer you double-click the icons like a real
desktop.

The site remembers the language she picked, whether she's seen the boot screen,
and the View menu settings. There's no tracking or analytics of any kind.

A few things to find: click the clock for a birthday countdown, try the Konami
code, type "yeon" anywhere, and open do_not_open.exe.


## Worth double-checking

Everything's filled in, but a few bits were my guesses:

- Her name in Korean is set to 연 (and 연아 when calling her). That's straight
  from "Yeon". If her Korean name is different, change `meta.name` and
  `meta.nameVocative`.
- For the "Licensed to" line in Help > About, you asked for something from the
  music video. The words in it are the song's lyrics, which I can't copy, so I
  went with "Yeon, brightest star in Seoul" instead. It's in
  `dialogs.about.lines` if you'd like to put in your own.
- README.txt ends with "happy 26th!", which I added. Change it if you want.
