/* =============================================================================
   YEON-OS :: app.js
   All the text lives in content.js. This file is the machine that runs it.

     00 helpers            05 window manager     10 dialogs
     01 language           06 notepad            11 menu bar / clock
     02 pixel icons        07 gallery + viewer    12 taskbar / start
     03 starfield          08 player              13 easter eggs
     04 boot               09 properties          14 boot-up / layout
   ========================================================================== */
(function () {
  'use strict';

  var C = window.YEON_CONTENT;

  /* -- 00 helpers --------------------------------------------------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function fmt(s, map) {
    return String(s).replace(/\{(\w+)\}/g, function (m, k) {
      return map && map[k] != null ? map[k] : m;
    });
  }
  var MOBILE_Q = window.matchMedia('(max-width: 767px)');
  function isMobile() { return MOBILE_Q.matches; }
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem('yeonos.' + key);
      localStorage.setItem('yeonos.' + key, val);
    } catch (e) { /* private mode: carry on without memory */ }
    return null;
  }

  /* -- 01 language -------------------------------------------------------- */
  var lang = store('lang');
  if (lang !== 'en' && lang !== 'ko') {
    lang = (navigator.language || 'en').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en';
  }

  // t() takes a {en, ko} pair and falls back to the other language if one side
  // was left empty, so a half-filled content.js never shows a blank line.
  function t(pair) {
    if (pair == null) return '';
    if (typeof pair === 'string') return pair;
    var mine = pair[lang], other = pair[lang === 'en' ? 'ko' : 'en'];
    if (mine != null && String(mine).length) return mine;
    return other != null ? other : '';
  }
  function tLines(pair) {
    var v = t(pair);
    return Array.isArray(v) ? v : [v];
  }

  var langHooks = [];
  // Re-runs fn whenever the language changes, for as long as el is on the page.
  function onLang(node, fn) { langHooks.push({ node: node, fn: fn }); fn(); }
  function bind(node, pair) { onLang(node, function () { node.textContent = t(pair); }); }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    store('lang', next);
    document.documentElement.setAttribute('data-lang', next);
    document.documentElement.setAttribute('lang', next);
    langHooks = langHooks.filter(function (h) { return h.node.isConnected; });
    langHooks.forEach(function (h) { h.fn(); });
    // Last, so the taskbar picks up the window titles the hooks just changed.
    renderTasks();
  }

  /* -- 02 pixel icons ------------------------------------------------------
     Every icon is drawn here as a 16x16 grid and turned into rects. Nothing is
     downloaded, nothing is an emoji. '.' is transparent.
     ---------------------------------------------------------------------- */
  var PAL = {
    k: '#1A1A1A', w: '#FFFFFF', g: '#C0C0C0', d: '#7A7A7A', p: '#EFEFEF',
    b: '#007BD6', n: '#0A0F3C', c: '#7FE3F0', y: '#F5C542', r: '#C0392B',
    e: '#2F3BA3', m: '#4E7FBF'
  };

  var GRIDS = {
    doc: [
      '................',
      '...kkkkkkkkk....',
      '...kwwwwwwwkk...',
      '...kwwwwwwwwkk..',
      '...kwwwwwwwwwk..',
      '...kwbbbbbbbwk..',
      '...kwwwwwwwwwk..',
      '...kwbbbbbbbwk..',
      '...kwwwwwwwwwk..',
      '...kwbbbbbbwwk..',
      '...kwwwwwwwwwk..',
      '...kwbbbbbbbwk..',
      '...kwwwwwwwwwk..',
      '...kwbbbbwwwwk..',
      '...kkkkkkkkkkk..',
      '................'
    ],
    letter: [
      '................',
      '................',
      '..kkkkkkkkkkkk..',
      '..kwwwwwwwwwwk..',
      '..kwkwwwwwwkwk..',
      '..kwwkwwwwkwwk..',
      '..kwwwkwwkwwwk..',
      '..kwwwwkkwwwwk..',
      '..kwwwwwwwwwwk..',
      '..kwwwwyywwwwk..',
      '..kwwwyyyywwwk..',
      '..kwwwwyywwwwk..',
      '..kwwwwwwwwwwk..',
      '..kkkkkkkkkkkk..',
      '................',
      '................'
    ],
    folder: [
      '................',
      '................',
      '..kkkk..........',
      '.kyyyyk.........',
      '.kyyyyyykkkkkk..',
      '.kyyyyyyyyyyyk..',
      '.kyyyyyyyyyyyk..',
      '.kyyyyyyyyyyyk..',
      '.kywwwwwwwwyyk..',
      '.kywnnnnnnwyyk..',
      '.kywnncnnnwyyk..',
      '.kywwwwwwwwyyk..',
      '.kyyyyyyyyyyyk..',
      '.kkkkkkkkkkkkk..',
      '................',
      '................'
    ],
    player: [
      '................',
      '................',
      '..kkkkkkkkkkkk..',
      '..kppppppppppk..',
      '..kpkkkkkkkkpk..',
      '..kpknnnnnnkpk..',
      '..kpkncnncnkpk..',
      '..kpknnnnnnkpk..',
      '..kpkkkkkkkkpk..',
      '..kppppppppppk..',
      '..kpkkppppkkpk..',
      '..kpkkppppkkpk..',
      '..kppppppppppk..',
      '..kkkkkkkkkkkk..',
      '................',
      '................'
    ],
    monitor: [
      '................',
      '.kkkkkkkkkkkkk..',
      '.kgggggggggggk..',
      '.kgkkkkkkkkkgk..',
      '.kgknnnnnnnkgk..',
      '.kgkncnnnnnkgk..',
      '.kgknnnnnnnkgk..',
      '.kgknnncnnnkgk..',
      '.kgknnnnnnnkgk..',
      '.kgkkkkkkkkkgk..',
      '.kgggggggggggk..',
      '.kkkkkkkkkkkkk..',
      '....kkgggkk.....',
      '...kkgggggkk....',
      '...kkkkkkkkk....',
      '................'
    ],
    danger: [
      '................',
      '................',
      '...kkkkkkkkkk...',
      '...kddddddddk...',
      '...kdrrrrrrdk...',
      '...kdrwrrwrdk...',
      '...kdrrwwrrdk...',
      '...kdrrwwrrdk...',
      '...kdrwrrwrdk...',
      '...kdrrrrrrdk...',
      '...kddddddddk...',
      '...kdkyyyykdk...',
      '...kddddddddk...',
      '...kkkkkkkkkk...',
      '................',
      '................'
    ],
    warn: [
      '.......kk.......',
      '......kyyk......',
      '......kyyk......',
      '.....kyyyyk.....',
      '.....kykkyk.....',
      '....kyykkyyk....',
      '....kyykkyyk....',
      '...kyyykkyyyk...',
      '...kyyykkyyyk...',
      '..kyyyyyyyyyyk..',
      '..kyyyykkyyyyk..',
      '.kyyyyykkyyyyyk.',
      '.kyyyyyyyyyyyyk.',
      '.kyyyyyyyyyyyyk.',
      '.kkkkkkkkkkkkkk.',
      '................'
    ],
    planet: [
      '................',
      '.....kkkkkk.....',
      '...kkcccccckk...',
      '..kcccccccccck..',
      '..kccwccccmmck..',
      '.kcccccccmmmck..',
      '.kcmmccccccccck.',
      'yykcmmcccccckyy.',
      'yykccccccccckyy.',
      '.kccccmmcccck...',
      '..kcccmmccccck..',
      '..kcccccccccck..',
      '...kkcccccckk...',
      '.....kkkkkk.....',
      '................',
      '................'
    ]
  };

  // Turn a grid into an SVG, merging runs of colour into single rects.
  function iconSVG(name, size) {
    var g = GRIDS[name] || GRIDS.doc;
    var parts = [];
    for (var y = 0; y < g.length; y++) {
      var row = g[y], x = 0;
      while (x < row.length) {
        var ch = row[x];
        if (ch === '.') { x++; continue; }
        var run = 1;
        while (x + run < row.length && row[x + run] === ch) run++;
        parts.push('<rect x="' + x + '" y="' + y + '" width="' + run + '" height="1" fill="' + (PAL[ch] || '#000') + '"/>');
        x += run;
      }
    }
    return '<svg viewBox="0 0 16 16" width="' + size + '" height="' + size +
      '" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' + parts.join('') + '</svg>';
  }
  function iconNode(name, size) {
    var span = el('span');
    span.innerHTML = iconSVG(name, size || 16);
    return span.firstChild;
  }

  // Small glyphs for title-bar buttons and the transport controls.
  function glyph(kind) {
    var s = '<svg viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true" focusable="false">';
    if (kind === 'min') s += '<rect x="1" y="6" width="6" height="1.5" fill="#1A1A1A"/>';
    if (kind === 'close') {
      for (var i = 0; i < 6; i++) {
        s += '<rect x="' + (1 + i) + '" y="' + (1 + i) + '" width="1" height="1" fill="#1A1A1A"/>';
        s += '<rect x="' + (6 - i) + '" y="' + (1 + i) + '" width="1" height="1" fill="#1A1A1A"/>';
      }
    }
    if (kind === 'play') s += '<path d="M1 0 L1 8 L8 4 Z" fill="#1A1A1A"/>';
    if (kind === 'pause') s += '<rect x="1" y="0" width="2.4" height="8" fill="#1A1A1A"/><rect x="5" y="0" width="2.4" height="8" fill="#1A1A1A"/>';
    if (kind === 'stop') s += '<rect x="1" y="1" width="6" height="6" fill="#1A1A1A"/>';
    if (kind === 'prev') s += '<path d="M7 0 L7 8 L1 4 Z" fill="#1A1A1A"/>';
    if (kind === 'next') s += '<path d="M1 0 L1 8 L7 4 Z" fill="#1A1A1A"/>';
    return s + '</svg>';
  }

  /* -- 03 starfield -------------------------------------------------------- */
  var Stars = (function () {
    var cv = $('#starfield'), ctx = cv.getContext('2d');
    var w = 0, h = 0, dpr = 1, stars = [], raf = 0, hyperUntil = 0, warp = 0;

    function seed() {
      var count = Math.round(Math.min(220, Math.max(70, (w * h) / 9000)));
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 0.8 + 0.2,          // depth: size + speed + brightness
          tw: Math.random() * Math.PI * 2,       // twinkle phase
          hue: Math.random() < 0.12 ? '#F5C542' : (Math.random() < 0.3 ? '#7FE3F0' : '#FFFFFF')
        });
      }
    }
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      // The canvas fills the viewport, so measure that rather than the canvas:
      // a canvas hidden under View > Starfield has no size of its own.
      w = window.innerWidth; h = window.innerHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (REDUCED) paintStatic();
    }
    function paintStatic() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        ctx.globalAlpha = 0.35 + s.z * 0.5;
        ctx.fillStyle = s.hue;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.z > 0.75 ? 2 : 1, s.z > 0.75 ? 2 : 1);
      }
      ctx.globalAlpha = 1;
    }
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (document.body.classList.contains('no-stars')) return;   // hidden: don't draw
      var hyper = now < hyperUntil;
      warp += ((hyper ? 1 : 0) - warp) * 0.08;      // ease in and out of the streaks
      ctx.clearRect(0, 0, w, h);
      var cx = w / 2, cy = h / 2;

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.tw += 0.02 + s.z * 0.02;

        // slow constant drift, like the whole sky is moving past
        s.x -= 0.045 + s.z * 0.06;
        s.y += 0.012 + s.z * 0.014;

        if (warp > 0.01) {
          var dx = s.x - cx, dy = s.y - cy;
          var d = Math.sqrt(dx * dx + dy * dy) || 0.001;
          var sp = (d * 0.055 + 2.2) * warp * (0.5 + s.z);
          var px = s.x, py = s.y;
          s.x += (dx / d) * sp; s.y += (dy / d) * sp;
          ctx.strokeStyle = s.hue;
          ctx.globalAlpha = Math.min(1, 0.25 + s.z * 0.6) * Math.min(1, warp * 1.6);
          ctx.lineWidth = s.z > 0.7 ? 1.6 : 1;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(s.x, s.y); ctx.stroke();
        } else {
          ctx.globalAlpha = (0.32 + s.z * 0.45) * (0.72 + 0.28 * Math.sin(s.tw));
          ctx.fillStyle = s.hue;
          var sz = s.z > 0.75 ? 2 : 1;
          ctx.fillRect(Math.round(s.x), Math.round(s.y), sz, sz);
        }

        // wrap
        if (s.x < -6) { s.x = w + 4; s.y = Math.random() * h; }
        if (s.x > w + 6) { s.x = -4; s.y = Math.random() * h; }
        if (s.y > h + 6) { s.y = -4; s.x = Math.random() * w; }
        if (s.y < -6) { s.y = h + 4; s.x = Math.random() * w; }
      }
      ctx.globalAlpha = 1;
    }
    function start() {
      resize();
      if (REDUCED) return;
      if (!raf) raf = requestAnimationFrame(frame);
    }
    return {
      start: start,
      resize: resize,
      hyper: function (ms) {
        if (REDUCED) return;
        hyperUntil = performance.now() + (ms || 3400);
      }
    };
  })();

  /* -- 04 boot ------------------------------------------------------------- */
  function runBoot(done) {
    var bootEl = $('#boot'), out = $('#boot-text'), hint = $('#boot-skip');
    var fast = store('booted') === '1';
    store('booted', '1');

    var cd = fast ? C.boot.fastCharDelay : C.boot.charDelay;
    var ld = fast ? C.boot.fastLineDelay : C.boot.lineDelay;
    var lines = tLines(C.boot.lines);
    var li = 0, ci = 0, doneLines = [], timer = 0, finished = false, autoTimer = 0;
    hint.textContent = t(C.boot.skipHint);

    function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
    function wrap(s, sig) { return '<span' + (sig ? ' class="sig"' : '') + '>' + esc(s) + '</span>'; }
    function paint(partial) {
      var head = doneLines.join('\n');
      var cur = partial == null ? '' : partial;
      var body;
      if (finished) body = head;                       // cursor sits on the last line
      else body = head + (doneLines.length ? '\n' : '') + (cur ? wrap(cur, /^>/.test(lines[li] || '')) : '');
      out.innerHTML = body + '<span class="cur"></span>';
    }
    function step() {
      if (finished) return;
      var line = lines[li];
      if (line == null) { finished = true; paint(); armAuto(); return; }
      if (ci < line.length) {
        // charDelay of 0 means "whole line at once", which is what repeat
        // visits use so the boot is over in a couple of seconds.
        ci = cd > 0 ? ci + 1 : line.length;
        paint(line.slice(0, ci));
        timer = setTimeout(step, cd > 0 ? cd : 0);
      } else {
        doneLines.push(wrap(line, /^>/.test(line)));
        li++; ci = 0;
        paint('');
        timer = setTimeout(step, line === '' ? Math.round(ld * 0.35) : ld);
      }
    }
    function armAuto() {
      // Never leave her stuck on the BIOS: it moves on by itself. On a repeat
      // visit that is almost immediately, so the whole boot stays around 2s.
      autoTimer = setTimeout(finish, fast ? 900 : 8000);
    }
    function finish() {
      clearTimeout(timer); clearTimeout(autoTimer);
      finished = true;
      window.removeEventListener('keydown', finish, true);
      bootEl.removeEventListener('pointerdown', finish);
      bootEl.classList.add('done');
      done();
    }
    window.addEventListener('keydown', finish, true);
    bootEl.addEventListener('pointerdown', finish);
    setTimeout(function () { hint.classList.add('show'); }, fast ? 300 : 1400);
    step();
  }

  /* -- 05 window manager --------------------------------------------------- */
  var APPS = {};          // filled in further down
  var wins = {};          // id -> record
  var zTop = 100;
  var cascade = 0;

  function deskBox() {
    var d = $('#windows').getBoundingClientRect();
    return { w: d.width, h: d.height, top: d.top, left: d.left };
  }

  function focusWin(id) {
    var rec = wins[id];
    if (!rec || isMobile()) return;
    Object.keys(wins).forEach(function (k) { wins[k].el.classList.toggle('focused', k === id); });
    rec.el.style.zIndex = ++zTop;
    renderTasks();
  }

  function openWin(id, opts) {
    opts = opts || {};
    var spec = APPS[id];
    if (!spec) return null;
    var rec = wins[id];
    if (rec) {
      rec.el.classList.remove('minimised');
      rec.minimised = false;
      if (isMobile()) rec.el.scrollIntoView({ block: 'start' });
      else focusWin(id);
      if (opts.onExisting) opts.onExisting(rec);
      renderTasks();
      return rec;
    }

    var win = el('div', 'window');
    win.setAttribute('data-win', id);

    // title bar
    var tb = el('div', 'titlebar');
    var ic = el('span', 'tb-icon'); ic.innerHTML = iconSVG(spec.icon, 14);
    var ttl = el('span', 'tb-title');
    var btns = el('div', 'tb-buttons');
    var bMin = el('button', 'tb-btn'); bMin.type = 'button'; bMin.innerHTML = glyph('min');
    var bCls = el('button', 'tb-btn'); bCls.type = 'button'; bCls.innerHTML = glyph('close');
    bMin.title = t(C.ui.minimise); bCls.title = t(C.ui.close);
    btns.appendChild(bMin); btns.appendChild(bCls);
    tb.appendChild(ic); tb.appendChild(ttl); tb.appendChild(btns);

    var body = el('div', 'win-body');
    win.appendChild(tb); win.appendChild(body);

    rec = { id: id, el: win, body: body, titleEl: ttl, spec: spec, minimised: false, cleanup: [] };
    wins[id] = rec;

    rec.setTitle = function (pair) {
      rec.titlePair = pair;
      ttl.textContent = t(pair);
      ttl.title = t(pair);
    };
    onLang(win, function () {
      rec.setTitle(rec.titlePair || spec.title);
      bMin.title = t(C.ui.minimise); bCls.title = t(C.ui.close);
    });

    bMin.addEventListener('click', function (e) { e.stopPropagation(); minimiseWin(id); });
    bCls.addEventListener('click', function (e) { e.stopPropagation(); closeWin(id); });
    win.addEventListener('pointerdown', function () { focusWin(id); });

    if (isMobile()) {
      $('#stack').insertBefore(win, $('.stack-end'));
    } else {
      var d = deskBox();
      var w = Math.min(spec.w, Math.max(240, d.w - 24));
      var h = Math.min(spec.h, Math.max(180, d.h - 24));
      win.style.width = w + 'px';
      win.style.height = h + 'px';

      var x, y;
      if (opts.x != null) { x = opts.x; y = opts.y; }
      else {
        x = (d.w - w) / 2 + 40 + (cascade % 5) * 26 - 60;
        y = (d.h - h) / 2 + (cascade % 5) * 22 - 40;
        cascade++;
      }
      win.style.left = Math.round(clamp(x, 8, Math.max(8, d.w - w - 8))) + 'px';
      win.style.top = Math.round(clamp(y, 4, Math.max(4, d.h - h - 8))) + 'px';
      $('#windows').appendChild(win);
      makeDraggable(rec, tb);
      focusWin(id);
      growFrom(win, opts.from);
    }

    spec.build(rec);
    renderTasks();
    return rec;
  }

  // Fast scale-up out of the icon that launched it.
  function growFrom(win, fromEl) {
    if (REDUCED) return;
    var wr = win.getBoundingClientRect();
    var dx = 0, dy = 0;
    if (fromEl) {
      var ir = fromEl.getBoundingClientRect();
      dx = (ir.left + ir.width / 2) - (wr.left + wr.width / 2);
      dy = (ir.top + ir.height / 2) - (wr.top + wr.height / 2);
    } else { dy = 18; }
    win.style.transformOrigin = '50% 50%';
    win.style.transform = 'translate(' + Math.round(dx) + 'px,' + Math.round(dy) + 'px) scale(0.18)';
    win.style.opacity = '0.35';
    win.getBoundingClientRect();           // flush
    win.classList.add('opening');
    win.style.transform = 'none';
    win.style.opacity = '1';
    setTimeout(function () { win.classList.remove('opening'); win.style.transformOrigin = ''; }, 200);
  }

  function makeDraggable(rec, handle) {
    var win = rec.el, startX = 0, startY = 0, origX = 0, origY = 0, dragging = false;
    handle.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.tb-btn')) return;
      if (isMobile()) return;
      dragging = true;
      startX = e.clientX; startY = e.clientY;
      origX = parseFloat(win.style.left) || 0;
      origY = parseFloat(win.style.top) || 0;
      handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var d = deskBox();
      var maxX = Math.max(0, d.w - win.offsetWidth);
      var maxY = Math.max(0, d.h - win.offsetHeight);
      win.style.left = Math.round(clamp(origX + (e.clientX - startX), 0, maxX)) + 'px';
      win.style.top = Math.round(clamp(origY + (e.clientY - startY), 0, maxY)) + 'px';
    });
    function end(e) {
      if (!dragging) return;
      dragging = false;
      try { handle.releasePointerCapture(e.pointerId); } catch (err) { /* already gone */ }
    }
    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);
  }

  function minimiseWin(id) {
    var rec = wins[id];
    if (!rec) return;
    if (isMobile()) { rec.el.classList.toggle('collapsed'); renderTasks(); return; }
    rec.minimised = true;
    rec.el.classList.add('minimised');
    renderTasks();
  }

  function closeWin(id) {
    var rec = wins[id];
    if (!rec) return;
    rec.cleanup.forEach(function (fn) { try { fn(); } catch (e) {} });
    rec.el.remove();
    delete wins[id];
    renderTasks();
  }

  function toggleWin(id) {
    var rec = wins[id];
    if (!rec) { openWin(id); return; }
    if (isMobile()) {
      rec.el.classList.remove('collapsed');
      rec.el.scrollIntoView({ block: 'start', behavior: REDUCED ? 'auto' : 'smooth' });
      return;
    }
    var topmost = Object.keys(wins).every(function (k) {
      return k === id || wins[k].minimised || (+wins[k].el.style.zIndex || 0) < (+rec.el.style.zIndex || 0);
    });
    if (rec.minimised) { rec.minimised = false; rec.el.classList.remove('minimised'); focusWin(id); }
    else if (topmost) minimiseWin(id);
    else focusWin(id);
  }

  /* -- 06 notepad ----------------------------------------------------------
     README.txt and birthday_message.txt share this: a menu strip where every
     item does something, a page, a status bar, and a typewriter that a click
     skips to the end of.
     ---------------------------------------------------------------------- */
  function notepadShell(rec) {
    var N = C.notepad;
    var np = el('div', 'notepad');
    var menu = el('div', 'appmenu');
    var scroll = el('div', 'notepad-scroll');
    var pre = el('pre', 'notepad-body body-copy');
    var status = el('div', 'statusbar');
    var msg = el('span', 'grow');
    status.appendChild(msg);
    scroll.appendChild(pre);
    np.appendChild(menu); np.appendChild(scroll); np.appendChild(status);
    rec.body.appendChild(np);

    var caret = el('span', 'caret');
    var ui = { np: np, scroll: scroll, pre: pre, typing: false, wrap: true, scale: 1 };
    var timer = 0, flashTimer = 0, text = '', i = 0, hint = null;

    function idleStatus() { msg.textContent = ui.typing && hint ? t(hint) : ''; }
    ui.flash = function (pair) {
      clearTimeout(flashTimer);
      msg.textContent = t(pair);
      flashTimer = setTimeout(idleStatus, 2400);
    };
    ui.setText = function (s) {
      clearTimeout(timer);
      ui.typing = false;
      np.classList.remove('typing');
      text = s;
      pre.textContent = s;
      idleStatus();
    };
    ui.finish = function () {
      if (!ui.typing) return;
      ui.setText(text);
      scroll.scrollTop = 0;
    };
    function tick() {
      if (!ui.typing) return;
      i++;
      pre.textContent = text.slice(0, i);
      pre.appendChild(caret);
      scroll.scrollTop = scroll.scrollHeight;
      if (i >= text.length) { ui.finish(); return; }
      var ch = text[i - 1];
      var wait = C.message.typeSpeed;
      if (ch === '\n') wait = 190;
      else if ('.,!?'.indexOf(ch) > -1) wait = C.message.typeSpeed * 7;
      timer = setTimeout(tick, wait);
    }
    ui.type = function (s, skipHint) {
      clearTimeout(timer);
      text = s; i = 0; hint = skipHint || null;
      ui.typing = true;
      pre.textContent = '';
      np.classList.add('typing');
      idleStatus();
      timer = setTimeout(tick, 420);
    };
    scroll.addEventListener('click', ui.finish);
    status.addEventListener('click', ui.finish);

    // -- the menu strip ---------------------------------------------------
    function checked(item) { return item.action === 'np-wrap' ? ui.wrap : false; }
    function selectAll() {
      ui.finish();
      var r = document.createRange();
      r.selectNodeContents(pre);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
    }
    function copyText() {
      ui.finish();
      var s = pre.textContent;
      function ok() { ui.flash(N.status.copied); }
      function fallback() {
        selectAll();
        try { document.execCommand('copy') ? ok() : ui.flash(N.status.copyFailed); }
        catch (e) { ui.flash(N.status.copyFailed); }
      }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(s).then(ok, fallback);
      else fallback();
    }
    function setScale(v) {
      ui.scale = clamp(Math.round(v * 100) / 100, 0.7, 1.75);
      pre.style.setProperty('--np-scale', ui.scale);
      var pct = Math.round(ui.scale * 100) + '%';
      ui.flash({ en: 'Zoom ' + pct, ko: '확대 ' + pct });
    }
    function pick(item) {
      switch (item.action) {
        case 'np-replay': if (rec.replay) rec.replay(); break;
        case 'np-close': closeWin(rec.id); break;
        case 'np-select': selectAll(); ui.flash(N.status.selected); break;
        case 'np-copy': copyText(); break;
        case 'np-wrap':
          ui.wrap = !ui.wrap;
          pre.classList.toggle('nowrap', !ui.wrap);
          ui.flash(ui.wrap ? N.status.wrapOn : N.status.wrapOff);
          break;
        case 'np-bigger': setScale(ui.scale + 0.15); break;
        case 'np-smaller': setScale(ui.scale - 0.15); break;
      }
      if (item.dialog) showInfo(item.dialog);
    }
    N.menus.forEach(function (m) {
      var b = el('button', 'appmenu-btn'); b.type = 'button';
      bind(b, m.label);
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu(b, m.items, pick, checked);
      });
      b.addEventListener('mouseenter', function () { hoverSwitch(b, m.items, pick, checked); });
      menu.appendChild(b);
    });

    rec.cleanup.push(function () {
      clearTimeout(timer); clearTimeout(flashTimer);
      ui.typing = false;
      if (openTop && rec.el.contains(openTop)) closeMenus();
    });
    return ui;
  }

  function buildReadme(rec) {
    var ui = notepadShell(rec);
    function body() { return tLines(C.readme.body).join('\n'); }
    rec.replay = function () { ui.type(body(), C.message.skipHint); };
    onLang(rec.el, function () {
      rec.setTitle(C.readme.title);
      if (ui.typing) rec.replay();
      else ui.setText(body());
    });
  }

  function buildMessage(rec) {
    var ui = notepadShell(rec);
    var started = false;
    function body() { return tLines(C.message.body).join('\n'); }
    rec.replay = function () { ui.type(body(), C.message.skipHint); };
    onLang(rec.el, function () {
      rec.setTitle(C.message.title);
      // Types itself out the first time; after that a language switch just
      // swaps the text, unless it is still mid-sentence.
      if (!started || ui.typing) { started = true; rec.replay(); }
      else ui.setText(body());
    });
  }

  /* -- 07 gallery + viewer -------------------------------------------------- */
  function photoCount() {
    var p = C.gallery.photos || [];
    return p.length ? p.length : (C.gallery.placeholderCount || 6);
  }
  function photoAt(i) {
    var p = C.gallery.photos || [];
    if (p.length) return p[i];
    return null;
  }
  function photoCaption(i) {
    var p = photoAt(i);
    if (p) return t(p.caption);
    return fmt(t(C.gallery.placeholderLabel), { n: i + 1 });
  }

  function buildGallery(rec) {
    var ex = el('div', 'explorer');
    var path = el('div', 'explorer-path');
    var pbox = el('span', 'path-box');
    pbox.textContent = 'C:\\unknown_planet\\gallery';
    path.appendChild(pbox);
    var grid = el('div', 'grid');
    var status = el('div', 'statusbar');
    var sCount = el('span', 'grow');
    var sNote = el('span');
    status.appendChild(sCount); status.appendChild(sNote);
    ex.appendChild(path); ex.appendChild(grid); ex.appendChild(status);
    rec.body.appendChild(ex);

    onLang(rec.el, function () {
      rec.setTitle(C.gallery.title);
      grid.innerHTML = '';
      var n = photoCount();
      for (var i = 0; i < n; i++) (function (idx) {
        var b = el('button', 'thumb'); b.type = 'button';
        var fr = el('div', 'thumb-frame');
        var p = photoAt(idx);
        if (p) {
          var img = new Image();
          img.src = (C.gallery.folder || 'assets/gallery/') + p.file;
          img.alt = photoCaption(idx);
          img.addEventListener('error', function () {
            fr.classList.add('ph');
            fr.innerHTML = '';
            fr.appendChild(el('span', null, '404'));
          });
          fr.appendChild(img);
        } else {
          fr.classList.add('ph');
          fr.appendChild(el('span', null, String(idx + 1).padStart(2, '0')));
        }
        var cap = el('div', 'thumb-cap', photoCaption(idx));
        b.appendChild(fr); b.appendChild(cap);
        b.addEventListener('click', function () { openViewer(idx, b); });
        b.addEventListener('dblclick', function () { openViewer(idx, b); });
        grid.appendChild(b);
      })(i);
      sCount.textContent = fmt(t(C.gallery.statusFmt), { n: n });
      sNote.textContent = (C.gallery.photos || []).length ? '' : t(C.gallery.emptyNote);
    });
  }

  var viewerIndex = 0;
  function openViewer(i, fromEl) {
    viewerIndex = i;
    var rec = openWin('viewer', {
      from: fromEl,
      onExisting: function (r) { if (r.show) r.show(viewerIndex); }
    });
    if (rec && rec.show) rec.show(viewerIndex);
  }

  function buildViewer(rec) {
    var v = el('div', 'viewer');
    var stage = el('div', 'viewer-stage');
    var bar = el('div', 'viewer-bar');
    var prev = el('button', 'btn sm'); prev.type = 'button';
    var next = el('button', 'btn sm'); next.type = 'button';
    var count = el('span', 'count');
    bar.appendChild(prev); bar.appendChild(next); bar.appendChild(count);
    v.appendChild(stage); v.appendChild(bar);
    rec.body.appendChild(v);

    bind(prev, C.ui.prev);
    bind(next, C.ui.next);

    rec.show = function (i) {
      var n = photoCount();
      viewerIndex = (i + n) % n;
      var p = photoAt(viewerIndex);
      stage.innerHTML = '';
      if (p) {
        var img = new Image();
        img.src = (C.gallery.folder || 'assets/gallery/') + p.file;
        img.alt = photoCaption(viewerIndex);
        img.addEventListener('error', function () {
          stage.innerHTML = '';
          var ph = el('div', 'viewer-ph');
          ph.textContent = (C.gallery.folder || 'assets/gallery/') + p.file + '\nNOT FOUND';
          stage.appendChild(ph);
        });
        stage.appendChild(img);
      } else {
        var ph2 = el('div', 'viewer-ph');
        ph2.textContent = photoCaption(viewerIndex) + '\n\n[ drop a picture in assets/gallery/ ]';
        stage.appendChild(ph2);
      }
      count.textContent = fmt(t(C.ui.ofN), { i: viewerIndex + 1, n: n });
      rec.setTitle({ en: photoCaption(viewerIndex), ko: photoCaption(viewerIndex) });
    };
    prev.addEventListener('click', function () { rec.show(viewerIndex - 1); });
    next.addEventListener('click', function () { rec.show(viewerIndex + 1); });
    onLang(rec.el, function () { rec.show(viewerIndex); });
  }

  /* -- 08 player ------------------------------------------------------------
     The official YouTube embed does the playing; this is just a skin over it.
     Nothing is hosted here and nothing makes a sound until she presses play.
     ---------------------------------------------------------------------- */
  var ytReady = false, ytLoading = false, ytQueue = [];
  function loadYT(cb) {
    if (ytReady) { cb(); return; }
    ytQueue.push(cb);
    if (ytLoading) return;
    ytLoading = true;
    window.onYouTubeIframeAPIReady = function () {
      ytReady = true;
      ytQueue.splice(0).forEach(function (fn) { fn(); });
    };
    var s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.async = true;
    s.onerror = function () { ytQueue.splice(0).forEach(function (fn) { fn(new Error('no api')); }); };
    document.head.appendChild(s);
  }
  function mmss(sec) {
    if (!isFinite(sec) || sec < 0) return '-:--';
    var m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function buildPlayer(rec) {
    var p = el('div', 'player paused');
    var screen = el('div', 'player-screen');

    var mq = el('div', 'marquee');
    var mqi = el('div', 'marquee-inner');
    var mq1 = el('span'), mq2 = el('span');
    mqi.appendChild(mq1); mqi.appendChild(mq2);
    mq.appendChild(mqi);

    var analyser = el('div', 'analyser');
    var bars = [];
    for (var i = 0; i < 22; i++) { var b = el('i'); analyser.appendChild(b); bars.push(b); }

    var time = el('div', 'player-time');
    var tNow = el('span', null, '0:00'), tEnd = el('span', null, '-:--');
    time.appendChild(tNow); time.appendChild(tEnd);

    var seek = el('div', 'seek');
    var fill = el('div', 'seek-fill'), knob = el('div', 'seek-knob');
    seek.appendChild(fill); seek.appendChild(knob);

    screen.appendChild(mq); screen.appendChild(analyser);
    screen.appendChild(time); screen.appendChild(seek);

    var transport = el('div', 'transport');
    var bPlay = el('button', 'tbtn'); bPlay.type = 'button'; bPlay.innerHTML = glyph('play');
    var bStop = el('button', 'tbtn'); bStop.type = 'button'; bStop.innerHTML = glyph('stop');
    var note = el('div', 'player-note');
    transport.appendChild(bPlay); transport.appendChild(bStop); transport.appendChild(note);

    var offline = el('div', 'player-offline');
    offline.hidden = true;

    var host = el('div', 'yt-host');
    var mount = el('div');
    host.appendChild(mount);

    p.appendChild(screen); p.appendChild(transport); p.appendChild(offline); p.appendChild(host);
    rec.body.appendChild(p);

    onLang(rec.el, function () {
      rec.setTitle(C.player.title);
      mq1.textContent = t(C.player.marquee);
      mq2.textContent = t(C.player.marquee);
      note.textContent = t(C.player.note);
      bPlay.title = t(C.ui.play);
      renderOffline();
    });

    function renderOffline() {
      if (offline.hidden) return;
      offline.innerHTML = '';
      offline.appendChild(document.createTextNode(t(C.player.offline) + ' '));
      var a = document.createElement('a');
      a.href = 'https://www.youtube.com/watch?v=' + C.player.videoId;
      a.target = '_blank'; a.rel = 'noopener';
      a.textContent = 'youtube.com';
      offline.appendChild(a);
    }
    function failed() {
      offline.hidden = false;
      renderOffline();
      note.textContent = '';
    }

    var yt = null, playing = false, tick = 0, phase = 0, failTimer = 0;

    function setPlayingUI(on) {
      playing = on;
      p.classList.toggle('paused', !on);
      bPlay.innerHTML = glyph(on ? 'pause' : 'play');
      bPlay.title = on ? t(C.ui.pause) : t(C.ui.play);
      bPlay.classList.toggle('on', on);
    }

    function frame() {
      var dur = 0, cur = 0;
      if (yt && yt.getDuration) {
        try { dur = yt.getDuration() || 0; cur = yt.getCurrentTime() || 0; } catch (e) {}
      }
      tNow.textContent = mmss(cur);
      tEnd.textContent = dur ? mmss(dur) : '-:--';
      var pct = dur ? clamp(cur / dur, 0, 1) : 0;
      fill.style.width = (pct * 100) + '%';
      knob.style.left = (pct * 100) + '%';

      phase += 0.35;
      for (var i = 0; i < bars.length; i++) {
        var h;
        if (playing) {
          var wave = Math.sin(phase * 0.6 + i * 0.55) * 0.5 + 0.5;
          var wob = Math.sin(phase * 0.21 + i * 1.7) * 0.5 + 0.5;
          h = 3 + (wave * 0.65 + wob * 0.35) * (26 - Math.abs(i - bars.length / 2) * 0.7) * (0.55 + Math.random() * 0.45);
        } else {
          h = 3;
        }
        bars[i].style.height = Math.max(3, Math.round(h)) + 'px';
      }
    }

    function ensurePlayer(then) {
      if (yt) { then && then(); return; }
      loadYT(function (err) {
        if (err || !window.YT || !window.YT.Player) { failed(); return; }
        var vars = {
          controls: 0, disablekb: 1, modestbranding: 1, rel: 0,
          playsinline: 1, fs: 0, iv_load_policy: 3
        };
        if (location.protocol.indexOf('http') === 0) vars.origin = location.origin;
        yt = new YT.Player(mount, {
          width: '200', height: '150',
          videoId: C.player.videoId,
          playerVars: vars,
          events: {
            onReady: function () { clearTimeout(failTimer); frame(); then && then(); },
            onError: failed,
            onStateChange: function (e) {
              if (e.data === YT.PlayerState.PLAYING) setPlayingUI(true);
              else if (e.data === YT.PlayerState.ENDED) { setPlayingUI(false); }
              else if (e.data === YT.PlayerState.PAUSED) setPlayingUI(false);
            }
          }
        });
        failTimer = setTimeout(function () { if (!playing) { /* still fine, just slow */ } }, 12000);
      });
    }

    bPlay.addEventListener('click', function () {
      if (!yt) { ensurePlayer(function () { try { yt.playVideo(); } catch (e) {} }); return; }
      try { playing ? yt.pauseVideo() : yt.playVideo(); } catch (e) { failed(); }
    });
    bStop.addEventListener('click', function () {
      if (!yt) return;
      try { yt.stopVideo(); } catch (e) {}
      setPlayingUI(false);
      fill.style.width = '0%'; knob.style.left = '0%'; tNow.textContent = '0:00';
    });

    function seekTo(clientX) {
      if (!yt || !yt.getDuration) return;
      var r = seek.getBoundingClientRect();
      var pct = clamp((clientX - r.left) / r.width, 0, 1);
      try { yt.seekTo(yt.getDuration() * pct, true); } catch (e) {}
      fill.style.width = (pct * 100) + '%';
      knob.style.left = (pct * 100) + '%';
    }
    var seeking = false;
    seek.addEventListener('pointerdown', function (e) {
      seeking = true; seek.setPointerCapture(e.pointerId); seekTo(e.clientX);
    });
    seek.addEventListener('pointermove', function (e) { if (seeking) seekTo(e.clientX); });
    seek.addEventListener('pointerup', function (e) {
      seeking = false;
      try { seek.releasePointerCapture(e.pointerId); } catch (err) {}
    });

    // Preload the API as soon as the window is opened, but never play anything.
    loadYT(function (err) { if (err) failed(); });

    tick = setInterval(frame, 110);
    frame();
    rec.cleanup.push(function () {
      clearInterval(tick); clearTimeout(failTimer);
      try { if (yt && yt.destroy) yt.destroy(); } catch (e) {}
      yt = null;
    });
  }

  /* -- 09 properties -------------------------------------------------------- */
  function buildProps(rec) {
    var wrap = el('div', 'props');
    var strip = el('div', 'tabstrip');
    var tab = el('div', 'tab');
    strip.appendChild(tab);
    var panel = el('div', 'props-panel');
    var buttons = el('div', 'props-buttons');
    var ok = el('button', 'btn'); ok.type = 'button'; ok.textContent = 'OK';
    ok.addEventListener('click', function () { closeWin(rec.id); });
    buttons.appendChild(ok);
    wrap.appendChild(strip); wrap.appendChild(panel); wrap.appendChild(buttons);
    rec.body.appendChild(wrap);

    onLang(rec.el, function () {
      rec.setTitle(C.properties.title);
      tab.textContent = t(C.properties.tab);
      panel.innerHTML = '';

      var head = el('div', 'props-head');
      head.innerHTML = iconSVG('monitor', 32);
      var htxt = el('div');
      htxt.appendChild(el('div', 'ph-name', t(C.meta.name)));
      htxt.appendChild(el('div', 'ph-sub', 'Unknown Planet Systems'));
      head.appendChild(htxt);
      panel.appendChild(head);
      panel.appendChild(el('div', 'rule'));

      C.properties.rows.forEach(function (row) {
        var r = el('div', 'prop-row');
        r.appendChild(el('div', 'prop-k', t(row.k) + ':'));
        r.appendChild(el('div', 'prop-v body-copy', t(row.v)));
        panel.appendChild(r);
      });
      panel.appendChild(el('div', 'props-foot body-copy', t(C.properties.footer)));
    });
  }

  /* -- 10 dialogs ----------------------------------------------------------- */
  function showDialog(spec) {
    var host = $('#dialogs');
    var d = el('div', 'dialog');

    var tb = el('div', 'titlebar');
    var ic = el('span', 'tb-icon'); ic.innerHTML = iconSVG(spec.kind === 'info' ? 'planet' : 'warn', 14);
    var ttl = el('span', 'tb-title');
    var btns = el('div', 'tb-buttons');
    var bCls = el('button', 'tb-btn'); bCls.type = 'button'; bCls.innerHTML = glyph('close');
    btns.appendChild(bCls);
    tb.appendChild(ic); tb.appendChild(ttl); tb.appendChild(btns);

    var body = el('div', 'dlg-body');
    var icon = el('div');
    icon.innerHTML = iconSVG(spec.kind === 'info' ? 'planet' : 'warn', 32);
    var text = el('div', 'dlg-text');
    var head = el('div', 'dlg-head');
    var detail = el('div', 'dlg-detail body-copy');
    text.appendChild(head); text.appendChild(detail);
    body.appendChild(icon); body.appendChild(text);

    var steps = null;
    if (spec.steps) { steps = el('div', 'dlg-steps'); text.appendChild(steps); }

    var row = el('div', 'dlg-buttons');
    d.appendChild(tb); d.appendChild(body); d.appendChild(row);

    function close() {
      d.remove();
      window.removeEventListener('keydown', onKey, true);
    }
    function onKey(e) {
      if (e.key === 'Escape') { e.stopPropagation(); close(); if (spec.onClose) spec.onClose(-1); }
    }
    bCls.addEventListener('click', function () { close(); if (spec.onClose) spec.onClose(-1); });

    (spec.buttons || [{ en: 'OK', ko: '확인' }]).forEach(function (bp, i) {
      var b = el('button', 'btn'); b.type = 'button';
      bind(b, bp);
      b.addEventListener('click', function () {
        // onButton lets a dialog stay on screen after it is clicked, which is
        // how do_not_open.exe builds up a pile of them.
        if (spec.onButton) { spec.onButton(i, close); return; }
        close();
        if (spec.onClose) spec.onClose(i);
      });
      row.appendChild(b);
    });

    onLang(d, function () {
      ttl.textContent = t(spec.title);
      head.textContent = fmt(t(spec.heading), { name: t(C.meta.nameVocative) });
      detail.textContent = spec.detail ? fmt(t(spec.detail), { name: t(C.meta.nameVocative) }) : '';
      detail.style.display = spec.detail ? '' : 'none';
    });

    host.appendChild(d);

    // Cascade them down the screen, but never off it.
    var idx = host.children.length - 1;
    var vw = window.innerWidth, vh = window.innerHeight;
    var dw = d.offsetWidth, dh = d.offsetHeight;
    var x = (vw - dw) / 2 + idx * 22 - 44;
    var y = (vh - dh) / 2 + idx * 24 - 60;
    d.style.left = Math.round(clamp(x, 8, Math.max(8, vw - dw - 8))) + 'px';
    d.style.top = Math.round(clamp(y, 8, Math.max(8, vh - dh - 8))) + 'px';

    window.addEventListener('keydown', onKey, true);
    var firstBtn = row.querySelector('.btn');
    if (firstBtn) firstBtn.focus({ preventScroll: true });

    if (steps) {
      var list = tLines(spec.steps), si = 0;
      steps.textContent = '';
      (function nextStep() {
        if (si >= list.length) return;
        steps.textContent += (si ? '\n' : '') + list[si];
        si++;
        setTimeout(nextStep, 620);
      })();
    }
    return d;
  }

  // do_not_open.exe: each OK summons the next one and leaves the last one
  // sitting there, so a pile builds up and the payoff lands on top of it.
  // Dismissing the final dialog sweeps the whole mess away.
  function runErrorChain() {
    var i = 0, pile = [];
    function clearPile() {
      pile.forEach(function (n) { n.remove(); });
      pile = [];
    }
    (function next() {
      var spec = C.errors[i];
      if (!spec) return;
      var last = i === C.errors.length - 1;
      i++;
      var spent = false;
      var node = showDialog({
        kind: spec.kind,
        title: spec.title,
        heading: spec.heading,
        detail: spec.detail,
        buttons: spec.buttons,
        onButton: last
          ? function (n, close) { close(); clearPile(); }
          : function () { if (spent) return; spent = true; next(); }
      });
      pile.push(node);
    })();
  }

  /* -- 11 menu bar / clock --------------------------------------------------- */
  var prefs = {
    stars: store('stars') !== '0',
    crt: store('crt') !== '0',
    bigIcons: store('bigIcons') === '1'
  };
  function applyPrefs() {
    document.body.classList.toggle('no-stars', !prefs.stars);
    document.body.classList.toggle('no-crt', !prefs.crt);
    document.body.classList.toggle('big-icons', prefs.bigIcons);
  }

  // One dropdown open at a time, shared by the menu bar and the Notepad menus.
  var openDrop = null, openTop = null;
  function closeMenus() {
    if (openDrop) { openDrop.remove(); openDrop = null; }
    if (openTop) { openTop.classList.remove('open'); openTop = null; }
  }
  function openMenu(anchor, items, onPick, checkedFn) {
    closeMenus();
    openTop = anchor;
    anchor.classList.add('open');
    openDrop = buildDropdown(items, anchor, onPick, checkedFn);
  }
  function toggleMenu(anchor, items, onPick, checkedFn) {
    if (openTop === anchor) { closeMenus(); return; }
    openMenu(anchor, items, onPick, checkedFn);
  }
  // Once a menu is open, sliding onto its neighbour opens that one instead,
  // the way a real menu bar behaves.
  function hoverSwitch(anchor, items, onPick, checkedFn) {
    if (openTop && openTop !== anchor && openTop.parentNode === anchor.parentNode) {
      openMenu(anchor, items, onPick, checkedFn);
    }
  }
  function buildDropdown(items, anchor, onPick, checkedFn) {
    var dd = el('div', 'dropdown');
    items.forEach(function (item) {
      if (item.sep) { dd.appendChild(el('div', 'dd-sep')); return; }
      var b = el('button', 'dd-item'); b.type = 'button';
      var chk = el('span', 'dd-check', item.check && checkedFn && checkedFn(item) ? '\u2713' : '');
      var lab = el('span');
      bind(lab, item.label);
      b.appendChild(chk); b.appendChild(lab);
      if (item.hint) { var h = el('span', 'dd-hint'); bind(h, item.hint); b.appendChild(h); }
      if (item.enabled === false) b.disabled = true;
      else b.addEventListener('click', function (e) { e.stopPropagation(); closeMenus(); onPick(item); });
      dd.appendChild(b);
    });
    document.body.appendChild(dd);
    var r = anchor.getBoundingClientRect();
    dd.style.left = Math.round(clamp(r.left, 2, window.innerWidth - dd.offsetWidth - 4)) + 'px';
    var top = r.bottom;
    if (top + dd.offsetHeight > window.innerHeight - 4) top = Math.max(4, r.top - dd.offsetHeight);
    dd.style.top = Math.round(top) + 'px';
    return dd;
  }

  // A menu item can run an action, show a dialog from content.js, or both.
  function runItem(item) {
    closeMenus();
    closeStart();
    if (item.action) doAction(item.action);
    if (item.dialog) showInfo(item.dialog);
  }
  function showInfo(d) {
    return showDialog({
      kind: d.kind || 'info', title: d.title, heading: d.heading,
      detail: d.detail, steps: d.steps, buttons: d.buttons
    });
  }

  function doAction(action) {
    closeMenus();
    closeStart();
    switch (action) {
      case 'open-message': openWin('message'); break;
      case 'readme': openWin('readme'); break;
      case 'exit': showInfo(C.dialogs.exit); break;
      case 'shutdown': showInfo(C.dialogs.shutdown); break;
      case 'about': showAbout(); break;
      case 'scan': showInfo(C.dialogs.scan); break;
      case 'planet': spawnPlanet(); break;
      case 'hyperspace': warp(); break;
      case 'arrange': arrangeIcons(); break;
      case 'toggle-stars': prefs.stars = !prefs.stars; store('stars', prefs.stars ? '1' : '0'); applyPrefs(); break;
      case 'toggle-crt': prefs.crt = !prefs.crt; store('crt', prefs.crt ? '1' : '0'); applyPrefs(); break;
      case 'toggle-icons': prefs.bigIcons = !prefs.bigIcons; store('bigIcons', prefs.bigIcons ? '1' : '0'); applyPrefs(); break;
    }
  }

  function showAbout() {
    var a = C.dialogs.about;
    showDialog({
      kind: 'info',
      title: a.title,
      heading: a.heading,
      detail: {
        en: (a.lines.en || []).join('\n'),
        ko: (a.lines.ko || []).join('\n')
      },
      buttons: a.buttons
    });
  }

  // Hyperspace needs stars to streak, so warping switches the starfield back on
  // if it was turned off under View.
  function warp() {
    if (!prefs.stars) { prefs.stars = true; store('stars', '1'); applyPrefs(); }
    Stars.hyper(3600);
  }

  // View > Arrange By: Fondness really does rearrange: the card goes to the top.
  function arrangeIcons() {
    var host = $('#icons');
    var first = host.querySelector('[data-app="message"]');
    if (first) host.insertBefore(first, host.firstChild);
  }

  function menuLabelFor(action) {
    for (var i = 0; i < C.menus.length; i++) {
      var items = C.menus[i].items;
      for (var j = 0; j < items.length; j++) {
        if (items[j].action === action) return items[j].label;
      }
    }
    return null;
  }

  function isChecked(item) {
    if (item.action === 'toggle-stars') return prefs.stars;
    if (item.action === 'toggle-crt') return prefs.crt;
    if (item.action === 'toggle-icons') return prefs.bigIcons;
    return false;
  }

  function buildMenubar() {
    var wm = $('#wordmark');
    wm.innerHTML = '<span class="wm-y">Y</span>EON<span class="wm-dot">-</span>OS';
    wm.addEventListener('click', function () { spawnPlanet(); });

    var host = $('#menus');
    host.innerHTML = '';
    C.menus.forEach(function (menu) {
      var b = el('button', 'menu-top'); b.type = 'button';
      bind(b, menu.label);
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu(b, menu.items, runItem, isChecked);
      });
      b.addEventListener('mouseenter', function () { hoverSwitch(b, menu.items, runItem, isChecked); });
      host.appendChild(b);
    });

    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang')); });
    });

    $('#tray-host').textContent = C.meta.hostname;
    $('#tray').addEventListener('click', function () { showInfo(C.dialogs.network); });
  }

  // Days from today until her next birthday, in whatever timezone she's in.
  function daysUntilBirthday() {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var m = C.meta.birthdayMonth - 1, d = C.meta.birthdayDay;
    var next = new Date(today.getFullYear(), m, d);
    if (next < today) next = new Date(today.getFullYear() + 1, m, d);
    return Math.round((next - today) / 86400000);
  }

  function showCountdown() {
    var c = C.dialogs.clock, n = daysUntilBirthday(), now = new Date();
    var date = {
      en: now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
      ko: now.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })
    };
    showDialog({
      kind: 'info',
      title: c.title,
      heading: { en: fmt(c.heading.en, { date: date.en }), ko: fmt(c.heading.ko, { date: date.ko }) },
      detail: n === 0 ? c.today
            : n === 1 ? c.untilOne
            : { en: fmt(c.until.en, { n: n }), ko: fmt(c.until.ko, { n: n }) },
      buttons: c.buttons
    });
  }

  function startClock() {
    var out = $('#clock');
    var DAYS = { en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'], ko: ['일', '월', '화', '수', '목', '금', '토'] };
    function paint() {
      var d = new Date();
      var h = d.getHours();
      var ap = h < 12 ? 'AM' : 'PM';
      var h12 = h % 12; if (h12 === 0) h12 = 12;
      var mm = d.getMinutes(); if (mm < 10) mm = '0' + mm;
      out.textContent = DAYS[lang][d.getDay()] + ' ' + h12 + ' : ' + mm + ' ' + ap;
    }
    onLang(out, paint);
    setInterval(paint, 5000);
    out.addEventListener('click', showCountdown);
  }

  /* -- 12 taskbar / start ---------------------------------------------------- */
  function renderTasks() {
    var host = $('#tasks');
    host.innerHTML = '';
    Object.keys(wins).forEach(function (id) {
      var rec = wins[id];
      var b = el('button', 'task'); b.type = 'button';
      b.innerHTML = iconSVG(rec.spec.icon, 14);
      var s = el('span');
      s.textContent = rec.titleEl.textContent;
      // the label is hidden on phones, so the name has to be explicit
      b.setAttribute('aria-label', rec.titleEl.textContent);
      b.appendChild(s);
      if (!rec.minimised && !isMobile()) {
        var top = Object.keys(wins).every(function (k) {
          return k === id || wins[k].minimised || (+wins[k].el.style.zIndex || 0) <= (+rec.el.style.zIndex || 0);
        });
        if (top) b.classList.add('active');
      }
      b.addEventListener('click', function () { toggleWin(id); });
      host.appendChild(b);
    });
  }

  function closeStart() {
    $('#startmenu').hidden = true;
    $('#start-btn').classList.remove('open');
  }
  function buildStart() {
    var sm = $('#startmenu');
    var btn = $('#start-btn');
    var label = btn.querySelector('.start-label');
    btn.querySelector('.start-icon').innerHTML = iconSVG('planet', 16);
    bind(label, C.dialogs.start.label);

    function render() {
      sm.innerHTML = '';
      var banner = el('div', 'sm-banner');
      banner.textContent = t(C.dialogs.start.banner);
      var items = el('div', 'sm-items');
      C.icons.forEach(function (ic) {
        var b = el('button', 'sm-item'); b.type = 'button';
        b.innerHTML = iconSVG(ic.icon, 16);
        var s = el('span'); s.textContent = t(ic.label);
        b.appendChild(s);
        b.addEventListener('click', function () { closeStart(); launch(ic.id, b); });
        items.appendChild(b);
      });
      // The top menus are hidden on phones, so the two live menu actions get a
      // home in here as well. Looked up by action so reordering content.js is safe.
      items.appendChild(el('div', 'dd-sep'));
      ['about', 'scan'].forEach(function (action) {
        var label = menuLabelFor(action);
        if (!label) return;
        var b = el('button', 'sm-item'); b.type = 'button';
        b.innerHTML = iconSVG('planet', 16);
        var s = el('span'); s.textContent = t(label);
        b.appendChild(s);
        b.addEventListener('click', function () { doAction(action); });
        items.appendChild(b);
      });
      items.appendChild(el('div', 'dd-sep'));
      var sd = el('button', 'sm-item'); sd.type = 'button';
      sd.innerHTML = iconSVG('monitor', 16);
      var sds = el('span'); sds.textContent = t(C.dialogs.start.shutdown);
      sd.appendChild(sds);
      sd.addEventListener('click', function () { doAction('shutdown'); });
      items.appendChild(sd);
      sm.appendChild(banner); sm.appendChild(items);
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeMenus();
      if (sm.hidden) { render(); sm.hidden = false; btn.classList.add('open'); }
      else closeStart();
    });
    onLang(sm, function () { if (!sm.hidden) render(); });
  }

  /* -- 13 easter eggs -------------------------------------------------------- */
  function spawnPlanet() {
    var host = $('#sprites');
    var d = host.getBoundingClientRect();
    var n = el('div', 'planet');
    n.innerHTML = iconSVG('planet', 46);
    var fromLeft = Math.random() < 0.5;
    var y = 40 + Math.random() * Math.max(40, d.height - 140);
    var x = fromLeft ? -60 : d.width + 20;
    var vx = (fromLeft ? 1 : -1) * (0.35 + Math.random() * 0.35);
    var vy = (Math.random() - 0.5) * 0.25;
    var spin = (Math.random() - 0.5) * 0.4;
    var rot = 0, scale = 0.6 + Math.random() * 0.7;
    n.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    host.appendChild(n);
    if (REDUCED) { setTimeout(function () { n.remove(); }, 4000); return; }
    var raf;
    (function move() {
      x += vx; y += vy; rot += spin;
      n.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg) scale(' + scale.toFixed(2) + ')';
      if (x < -120 || x > d.width + 120) { n.remove(); cancelAnimationFrame(raf); return; }
      raf = requestAnimationFrame(move);
    })();
  }

  function initEggs() {
    var KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    var kIdx = 0, typed = '';
    window.addEventListener('keydown', function (e) {
      var k = (e.key || '').toLowerCase();

      kIdx = (k === KONAMI[kIdx]) ? kIdx + 1 : (k === KONAMI[0] ? 1 : 0);
      if (kIdx === KONAMI.length) { kIdx = 0; warp(); }

      if (k.length === 1) {
        typed = (typed + k).slice(-8);
        if (typed.indexOf('yeon') > -1) { typed = ''; spawnPlanet(); }
      }

      // arrow keys page through the image viewer when it is the top window
      if (wins.viewer && !wins.viewer.minimised) {
        if (k === 'arrowleft' && wins.viewer.show) wins.viewer.show(viewerIndex - 1);
        if (k === 'arrowright' && wins.viewer.show) wins.viewer.show(viewerIndex + 1);
      }
    });
  }

  /* -- 14 desktop, launching, layout ---------------------------------------- */
  APPS = {
    readme:     { icon: 'doc',     title: C.readme.title,     w: 516, h: 470, build: buildReadme },
    message:    { icon: 'letter',  title: C.message.title,    w: 552, h: 444, build: buildMessage },
    gallery:    { icon: 'folder',  title: C.gallery.title,    w: 494, h: 356, build: buildGallery },
    viewer:     { icon: 'folder',  title: C.gallery.title,    w: 504, h: 408, build: buildViewer },
    player:     { icon: 'player',  title: C.player.title,     w: 344, h: 190, build: buildPlayer },
    properties: { icon: 'monitor', title: C.properties.title, w: 436, h: 452, build: buildProps }
  };

  function launch(id, fromEl) {
    if (id === 'danger') { runErrorChain(); return; }
    openWin(id, { from: fromEl });
  }

  function buildIcons() {
    var host = $('#icons');
    host.innerHTML = '';
    C.icons.forEach(function (ic) {
      var b = el('button', 'icon'); b.type = 'button';
      b.setAttribute('data-app', ic.id);
      b.innerHTML = iconSVG(ic.icon, 32);
      var lab = el('span', 'icon-label');
      onLang(b, function () {
        lab.textContent = t(ic.label);
        b.setAttribute('aria-label', t(ic.label));
      });
      b.appendChild(lab);
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        document.querySelectorAll('.icon.selected').forEach(function (n) { n.classList.remove('selected'); });
        b.classList.add('selected');
      });
      // Mouse: click selects, double-click opens, like a real desktop.
      b.addEventListener('dblclick', function () { launch(ic.id, b); });
      // Touchscreens (a tablet wide enough to get the desktop): one tap opens,
      // because double-tapping tends to zoom the page instead.
      b.addEventListener('pointerup', function (e) {
        if (e.pointerType === 'touch' || e.pointerType === 'pen') launch(ic.id, b);
      });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); launch(ic.id, b); }
      });
      host.appendChild(b);
    });
  }

  // On phones the desktop metaphor is dropped: same windows, same chrome,
  // rendered as a vertical stack of cards in a fixed order.
  function buildStack() {
    var stack = $('#stack');
    if (!$('.stack-end', stack)) {
      var end = el('div', 'stack-end');
      bind(end, C.ui.diskEnd);
      stack.appendChild(end);
    }
    C.icons.forEach(function (ic) {
      if (ic.id === 'danger') { buildDangerCard(); return; }
      openWin(ic.id);
    });
  }

  // do_not_open.exe has no window of its own, so on mobile it gets a card
  // with a button, otherwise there would be no way to set it off.
  function buildDangerCard() {
    if (wins.danger) return;
    APPS.danger = {
      icon: 'danger', title: { en: 'do_not_open.exe', ko: 'do_not_open.exe' }, w: 300, h: 150,
      build: function (rec) {
        var wrap = el('div');
        wrap.style.cssText = 'padding:16px;display:flex;gap:12px;align-items:center;';
        wrap.innerHTML = iconSVG('danger', 32);
        var right = el('div');
        right.style.cssText = 'display:flex;flex-direction:column;gap:10px;align-items:flex-start;';
        var label = el('div', 'dlg-head');
        var run = el('button', 'btn'); run.type = 'button';
        bind(run, C.ui.runIt);
        run.addEventListener('click', function () { runErrorChain(); });
        onLang(rec.el, function () {
          rec.setTitle(APPS.danger.title);
          label.textContent = t({ en: 'do_not_open.exe', ko: 'do_not_open.exe' });
        });
        right.appendChild(label); right.appendChild(run);
        wrap.appendChild(right);
        rec.body.appendChild(wrap);
      }
    };
    openWin('danger');
  }

  function clearAllWindows() {
    Object.keys(wins).forEach(closeWin);
  }

  // Shrinking the browser must never leave a window stranded off the edge.
  function keepWindowsOnScreen() {
    if (isMobile()) return;
    var d = deskBox();
    Object.keys(wins).forEach(function (id) {
      var w = wins[id].el;
      var ww = Math.min(w.offsetWidth, Math.max(240, d.w - 16));
      var wh = Math.min(w.offsetHeight, Math.max(160, d.h - 16));
      w.style.width = ww + 'px';
      w.style.height = wh + 'px';
      w.style.left = Math.round(clamp(parseFloat(w.style.left) || 0, 0, Math.max(0, d.w - ww))) + 'px';
      w.style.top = Math.round(clamp(parseFloat(w.style.top) || 0, 0, Math.max(0, d.h - wh))) + 'px';
    });
  }

  var mobileNow = null;
  function layout() {
    var m = isMobile();
    if (m === mobileNow) return;
    mobileNow = m;
    clearAllWindows();
    cascade = 0;
    if (m) {
      buildStack();
    } else {
      // Not dead centre: it should look like someone left it open.
      var d = deskBox();
      var rw = Math.min(APPS.readme.w, d.w - 24), rh = Math.min(APPS.readme.h, d.h - 24);
      openWin('readme', {
        x: Math.round(d.w * 0.5 - rw / 2 + 62),
        y: Math.round(Math.max(12, d.h * 0.5 - rh / 2 - 30))
      });
    }
  }

  /* -- start it up ----------------------------------------------------------- */
  function boot() {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    applyPrefs();
    Stars.start();

    runBoot(function () {
      $('#os').hidden = false;
      buildMenubar();
      buildIcons();
      buildStart();
      startClock();
      renderTasks();
      layout();
      initEggs();
    });

    window.addEventListener('resize', function () {
      closeMenus();
      Stars.resize();
      layout();
      keepWindowsOnScreen();
    });
    // a dropdown shouldn't float in place while its window scrolls away
    $('#stack').addEventListener('scroll', closeMenus, { passive: true });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('#menubar')) closeMenus();
      if (!e.target.closest('#startmenu') && !e.target.closest('#start-btn')) closeStart();
      if (!e.target.closest('.icon')) {
        document.querySelectorAll('.icon.selected').forEach(function (n) { n.classList.remove('selected'); });
      }
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeMenus(); closeStart(); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
