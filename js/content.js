/* =============================================================================
   YEON-OS  ::  content.js
   -----------------------------------------------------------------------------
   EVERYTHING YOU NEED TO EDIT IS IN THIS FILE. Nothing else needs touching.

   HOW TO EDIT
   -----------
   1. Anything written like [[THIS]] is a blank I could not fill in. Replace the
      whole thing, brackets included. They are all listed at the end of README.md.
   2. Text comes in pairs:  { en: "English", ko: "한국어" }
      Fill in both. If you leave one empty ("") the site falls back to the other,
      so a half-translated line will never show up blank.
   3. Paragraphs are arrays. Each string in the array is its own line:
        body: { en: ["first line", "second line"], ko: ["첫 줄", "둘째 줄"] }
      An empty string "" makes a blank line.
   4. Photos: drop files in assets/photos/ and list them under gallery.photos.
      Leave the list empty and the gallery shows labelled placeholder tiles.
   5. Save, refresh the browser. There is no build step.
   ============================================================================ */

window.YEON_CONTENT = {

  /* ---------------------------------------------------------------------------
     1. THE BASICS
     Used all over the site: the BIOS version number, the properties dialog,
     the title bars, the final birthday dialog.
     ------------------------------------------------------------------------- */
  meta: {
    // Her name as it appears in title bars and the last dialog.
    name: { en: 'Yeon', ko: '[[HER_KOREAN_NAME]]' },

    // Korean vocative - how you would actually say her name out loud to her.
    // e.g. 연아 / 지연아 / 서연아. Used only in the final birthday dialog.
    nameVocative: { en: 'Yeon', ko: '[[HER_KOREAN_NAME_VOCATIVE]]' },

    // A number. Becomes the BIOS version (vXX.00) and the Uptime field.
    age: '[[HER_AGE]]',

    // Where the signal is coming from.
    city: { en: '[[HER_CITY]]', ko: '[[HER_CITY_KO]]' },

    // Written however you like: "12 March", "3월 12일", whatever.
    birthday: { en: '[[BIRTHDAY_DATE]]', ko: '[[BIRTHDAY_DATE_KO]]' },

    // Shown in the taskbar tray. Change it if you want a different hostname.
    hostname: 'yeon-os.local'
  },

  /* ---------------------------------------------------------------------------
     2. BOOT SCREEN
     The fake BIOS. Typed out one line at a time.
     A line of "" is a blank line. Lines starting with ">" are drawn in cyan.
     Timings are milliseconds - turn them down if you want it snappier.
     ------------------------------------------------------------------------- */
  boot: {
    // First visit: typed a character at a time. The whole BIOS takes about 11
    // seconds, and any key or click skips it. Turn charDelay up for more drama.
    charDelay: 12,       // ms per character
    lineDelay: 170,      // ms pause between lines
    // Repeat visits: charDelay 0 means whole lines at once, so the whole thing
    // is over in about two seconds and she is straight back to the desktop.
    fastCharDelay: 0,
    fastLineDelay: 55,
    skipHint: { en: '[ PRESS ANY KEY TO SKIP ]', ko: '[ 아무 키나 누르면 건너뛰기 ]' },

    lines: {
      en: [
        'YEON-OS Modular BIOS v[[HER_AGE]].00',
        'Copyright (C) 2026, Unknown Planet Systems',
        'All rights reserved. Several wrongs reserved also.',
        '',
        'Main Processor    : YEON 1 CORE, ONE OF ONE',
        'Coprocessor       : NOT INSTALLED, NOT REQUIRED',
        'Memory Testing    : 65536K OK',
        'Detecting Drives .. 1 FOUND',
        'Primary Master    : UNKNOWN PLANET (READ ONLY)',
        '',
        '> SCANNING FOR SIGNAL ...',
        '> SIGNAL ACQUIRED FROM UNKNOWN PLANET',
        '> ORIGIN       : [[HER_CITY]]',
        '> DISTANCE     : NON-TRIVIAL. CLEARED FOR TRAVEL ANYWAY.',
        '> THREAT LEVEL : DANGEROUSLY COOL',
        '> PARSER NOTE  : 이 별 = THIS STAR. THE OTHER READING IS',
        '>                NOT SUPPORTED ON THIS HARDWARE.',
        '',
        'PRESS ANY KEY TO CONTINUE_'
      ],
      ko: [
        'YEON-OS 모듈러 BIOS v[[HER_AGE]].00',
        'Copyright (C) 2026, Unknown Planet Systems',
        '모든 권리 보유. 약간의 잘못도 함께 보유.',
        '',
        '메인 프로세서   : YEON 1 CORE, 하나뿐인 하나',
        '보조 프로세서   : 미설치. 필요 없음.',
        '메모리 검사     : 65536K 이상 없음',
        '드라이브 검색 .. 1개 발견',
        '주 드라이브     : UNKNOWN PLANET (읽기 전용)',
        '',
        '> 신호 탐색 중 ...',
        '> UNKNOWN PLANET 에서 신호 수신',
        '> 발신지     : [[HER_CITY_KO]]',
        '> 거리       : 가깝진 않음. 그래도 갈 만함.',
        '> 위험도     : 위험할 정도로 멋짐',
        '> 파서 참고  : 이 별 = 이 별. 띄어쓰기 빠진 쪽은',
        '>              이 기기에서 지원하지 않습니다.',
        '',
        '아무 키나 누르세요_'
      ]
    }
  },

  /* ---------------------------------------------------------------------------
     3. DESKTOP ICONS
     The order here is the order they appear down the left of the desktop, and
     the order of the cards on mobile. "id" links an icon to its window - don't
     change the ids unless you change them in js/app.js too.
     ------------------------------------------------------------------------- */
  icons: [
    { id: 'readme',     icon: 'doc',     label: { en: 'README.txt',           ko: 'README.txt' } },
    { id: 'message',    icon: 'letter',  label: { en: 'birthday_message.txt', ko: 'birthday_message.txt' } },
    { id: 'gallery',    icon: 'folder',  label: { en: 'gallery',              ko: 'gallery' } },
    { id: 'player',     icon: 'player',  label: { en: 'player.exe',           ko: 'player.exe' } },
    { id: 'properties', icon: 'monitor', label: { en: 'properties.exe',       ko: 'properties.exe' } },
    { id: 'danger',     icon: 'danger',  label: { en: 'do_not_open.exe',      ko: 'do_not_open.exe' } }
  ],

  /* ---------------------------------------------------------------------------
     4. README.txt
     The "what is this" window. It opens by itself on first load.
     ------------------------------------------------------------------------- */
  readme: {
    title: { en: 'README.txt', ko: 'README.txt' },
    body: {
      en: [
        'YEON-OS v[[HER_AGE]].00',
        '==================================',
        '',
        'A signal was received from an unknown planet.',
        'This is what was on it.',
        '',
        'The planet is you. That is the entire joke',
        'and I am not going to explain it further.',
        '',
        'WHAT IS ON THIS DISK',
        '',
        '  birthday_message.txt   the actual card.',
        '                         start there.',
        '  gallery                evidence.',
        '  player.exe             the song. you press play.',
        '  properties.exe         your specifications.',
        '  do_not_open.exe        do not open.',
        '',
        'Every window here can be dragged, minimised,',
        'closed and opened again. Nothing can break.',
        '',
        '[[WRITE_A_LINE_OR_TWO_HERE_IN_YOUR_OWN_VOICE]]',
        '',
        '                                    -- Chris'
      ],
      ko: [
        'YEON-OS v[[HER_AGE]].00',
        '==================================',
        '',
        '알 수 없는 행성에서 신호가 잡혔어.',
        '그 안에 이게 들어 있었고.',
        '',
        '그 행성은 너야. 농담은 이게 전부고',
        '더 설명 안 할 거야.',
        '',
        '이 디스크에 들어 있는 것',
        '',
        '  birthday_message.txt   진짜 카드.',
        '                         여기부터 열어.',
        '  gallery                증거 자료.',
        '  player.exe             그 노래. 재생은 네가.',
        '  properties.exe         너의 사양.',
        '  do_not_open.exe        열지 마.',
        '',
        '여기 창은 전부 끌고, 내리고, 닫고,',
        '다시 열 수 있어. 망가지는 건 없어.',
        '',
        '[[WRITE_A_LINE_OR_TWO_HERE_IN_YOUR_OWN_VOICE_KO]]',
        '',
        '                                    -- Chris'
      ]
    }
  },

  /* ---------------------------------------------------------------------------
     5. birthday_message.txt   <--  THE ACTUAL CARD
     The one that matters. It types itself out; a click skips to the end.
     I have left the sentiment to you. Write it how you actually talk to her.
     Keep lines reasonably short - it is a Notepad window, and short lines
     type out better than long ones.
     ------------------------------------------------------------------------- */
  message: {
    title: { en: 'birthday_message.txt', ko: 'birthday_message.txt' },
    typeSpeed: 20,   // ms per character. Lower = faster.
    skipHint: { en: 'click anywhere to skip', ko: '아무 데나 누르면 건너뛰기' },
    body: {
      en: [
        '[[OPENING_LINE_HOW_YOU_ACTUALLY_GREET_HER]]',
        '',
        '[[PARAGRAPH_ONE_THE_REAL_THING_YOU_WANT_TO_SAY]]',
        '',
        '[[PARAGRAPH_TWO_OPTIONAL]]',
        '',
        '[[SIGN_OFF]]',
        '',
        '                                    -- Chris'
      ],
      ko: [
        '[[OPENING_LINE_KO]]',
        '',
        '[[PARAGRAPH_ONE_KO]]',
        '',
        '[[PARAGRAPH_TWO_KO_OPTIONAL]]',
        '',
        '[[SIGN_OFF_KO]]',
        '',
        '                                    -- Chris'
      ]
    }
  },

  /* ---------------------------------------------------------------------------
     6. GALLERY
     Drop image files into assets/photos/ then list them here, in order.
       file:    the filename inside assets/photos/
       caption: shows in the viewer's title bar and under the thumbnail.
     Leave photos as an empty list [] and the gallery shows numbered placeholder
     tiles instead, which still look deliberate.
     ------------------------------------------------------------------------- */
  gallery: {
    title: { en: 'gallery', ko: 'gallery' },
    statusFmt: { en: '{n} object(s)', ko: '항목 {n}개' },
    emptyNote: {
      en: 'No image data in this transmission. Placeholders shown.',
      ko: '이 전송본에는 이미지 데이터가 없습니다. 자리표시자 표시 중.'
    },
    placeholderCount: 6,                                  // tiles drawn when photos[] is empty
    placeholderLabel: { en: 'SLOT {n}', ko: '슬롯 {n}' },
    photos: [
      // Add photos like this (copy a line per photo):
      // { file: 'one.jpg',   caption: { en: '[[CAPTION_1]]', ko: '[[CAPTION_1_KO]]' } },
      // { file: 'two.jpg',   caption: { en: '[[CAPTION_2]]', ko: '[[CAPTION_2_KO]]' } },
      // { file: 'three.jpg', caption: { en: '[[CAPTION_3]]', ko: '[[CAPTION_3_KO]]' } }
    ]
  },

  /* ---------------------------------------------------------------------------
     7. player.exe
     The song, through YouTube's official embed. Nothing is hosted here and
     nothing makes a sound until she presses play.
     ------------------------------------------------------------------------- */
  player: {
    title: { en: 'player.exe', ko: 'player.exe' },
    videoId: 'nP1xjFX86Po',
    marquee: {
      en: 'IU - 이 별로부터 (Unknown Planet)',
      ko: 'IU - 이 별로부터 (Unknown Planet)'
    },
    note: {
      en: 'streaming from unknown planet',
      ko: 'unknown planet 에서 수신 중'
    },
    offline: {
      en: 'NO SIGNAL. Open it on YouTube instead:',
      ko: '신호 없음. 유튜브에서 열기:'
    },
    offlineLink: { en: 'youtube.com', ko: 'youtube.com' }
  },

  /* ---------------------------------------------------------------------------
     8. properties.exe
     A system-properties dialog that treats her as hardware. Deadpan.
     Add or remove rows freely - they render as a two-column list.
     ------------------------------------------------------------------------- */
  properties: {
    title: { en: 'System Properties', ko: '시스템 속성' },
    tab: { en: 'General', ko: '일반' },
    rows: [
      { k: { en: 'Device',       ko: '장치' },          v: { en: 'YEON',                             ko: '[[HER_KOREAN_NAME]]' } },
      { k: { en: 'Manufacturer', ko: '제조사' },        v: { en: 'Unknown Planet',                   ko: 'Unknown Planet' } },
      { k: { en: 'Model',        ko: '모델' },          v: { en: 'ONE OF ONE',                       ko: '단 하나' } },
      { k: { en: 'Location',     ko: '위치' },          v: { en: '[[HER_CITY]]',                     ko: '[[HER_CITY_KO]]' } },
      { k: { en: 'Status',       ko: '상태' },          v: { en: 'This device is working properly.', ko: '이 장치가 올바르게 작동하고 있습니다.' } },
      { k: { en: 'Uptime',       ko: '가동 시간' },      v: { en: '[[HER_AGE]] years',                ko: '[[HER_AGE]]년' } },
      { k: { en: 'Last restart', ko: '마지막 재시작' },   v: { en: '[[BIRTHDAY_DATE]]',                ko: '[[BIRTHDAY_DATE_KO]]' } },
      { k: { en: 'Known issues', ko: '알려진 문제' },     v: { en: '[[SOMETHING_AFFECTIONATE_HERE]]',  ko: '[[SOMETHING_AFFECTIONATE_HERE_KO]]' } },
      { k: { en: 'Driver',       ko: '드라이버' },       v: { en: 'Up to date. Suspiciously so.',     ko: '최신 상태. 수상할 정도로.' } },
      { k: { en: 'Warranty',     ko: '보증' },          v: { en: 'Indefinite.',                      ko: '무기한.' } }
    ],
    footer: {
      en: 'No action is required at this time.',
      ko: '지금은 아무 조치도 필요하지 않습니다.'
    }
  },

  /* ---------------------------------------------------------------------------
     9. do_not_open.exe
     The error cascade. These are jokes about old operating systems rather than
     about her, so I wrote them properly. Change them if you can do better.
       kind: 'error' draws the warning icon, 'info' draws the message icon.
     The last one is the payoff - that is the one you might want to make yours.
     ------------------------------------------------------------------------- */
  errors: [
    {
      kind: 'error',
      title:   { en: 'System Error', ko: '시스템 오류' },
      heading: { en: 'do_not_open.exe has performed an illegal operation.',
                 ko: 'do_not_open.exe 가 잘못된 작업을 수행했습니다.' },
      detail:  { en: 'The illegal operation was: opening do_not_open.exe.',
                 ko: '잘못된 작업은 다음과 같습니다: do_not_open.exe 를 연 것.' },
      buttons: [{ en: 'OK', ko: '확인' }]
    },
    {
      kind: 'error',
      title:   { en: 'Error 0x0000BDAY', ko: '오류 0x0000BDAY' },
      heading: { en: 'A birthday has been detected on this machine.',
                 ko: '이 컴퓨터에서 생일이 감지되었습니다.' },
      detail:  { en: 'This system is not certified to contain a birthday of this size.',
                 ko: '이 시스템은 이 정도 크기의 생일을 담도록 인증되지 않았습니다.' },
      buttons: [{ en: 'OK', ko: '확인' }, { en: 'Also OK', ko: '이것도 확인' }]
    },
    {
      kind: 'error',
      title:   { en: 'Critical Stop', ko: '치명적 오류' },
      heading: { en: 'Confetti subsystem exceeded safe operating limits.',
                 ko: '색종이 서브시스템이 안전 작동 한계를 초과했습니다.' },
      detail:  { en: 'Rolling back ... rollback failed. The confetti is permanent now. Sorry.',
                 ko: '되돌리는 중 ... 실패했습니다. 색종이는 이제 영구적입니다. 죄송합니다.' },
      buttons: [{ en: 'OK', ko: '확인' }]
    },
    {
      kind: 'error',
      title:   { en: 'Error', ko: '오류' },
      heading: { en: 'The error handler has stopped responding.',
                 ko: '오류 처리기가 응답하지 않습니다.' },
      detail:  { en: 'An error occurred while displaying the previous error. Report this error to the error?',
                 ko: '이전 오류를 표시하는 중 오류가 발생했습니다. 이 오류를 그 오류에 신고할까요?' },
      buttons: [{ en: 'Sure', ko: '그러죠' }, { en: 'No', ko: '아니요' }]
    },
    {
      kind: 'info',
      title:   { en: 'Message', ko: '메시지' },
      // {name} is replaced with meta.nameVocative
      heading: { en: 'happy birthday, {name}.', ko: '생일 축하해, {name}.' },
      detail:  { en: 'That was the whole point. The errors were a bit.',
                 ko: '사실 이게 하고 싶었어. 오류들은 그냥 장난이었고.' },
      buttons: [{ en: 'OK', ko: '확인' }]
    }
  ],

  /* ---------------------------------------------------------------------------
     10. MENU BAR
     enabled: false items are greyed out and unclickable - that is the joke.
     Don't rename the "action" values, they are wired up in js/app.js.
     ------------------------------------------------------------------------- */
  menus: [
    {
      label: { en: 'File', ko: '파일' },
      items: [
        { label: { en: 'New Friend',          ko: '새 친구' },                  hint: 'Ctrl+N', enabled: false },
        { label: { en: 'Open Unknown Planet', ko: 'Unknown Planet 열기' },      hint: 'Ctrl+O', enabled: true, action: 'open-message' },
        { label: { en: 'Save Memory As...',   ko: '기억 다른 이름으로 저장...' }, enabled: false },
        { sep: true },
        { label: { en: 'Print',               ko: '인쇄' },                     hint: 'Ctrl+P', enabled: false },
        { label: { en: 'Exit',                ko: '끝내기' },                   enabled: true, action: 'exit' }
      ]
    },
    {
      label: { en: 'Search', ko: '검색' },
      items: [
        { label: { en: 'For Signal...',    ko: '신호 검색...' },   enabled: true, action: 'scan' },
        { label: { en: 'For Meaning',      ko: '의미 검색' },      enabled: false },
        { label: { en: 'For Yeon',         ko: 'Yeon 검색' },      enabled: false, hint: 'found' },
        { sep: true },
        { label: { en: 'Index This Drive', ko: '드라이브 색인' },   enabled: false }
      ]
    },
    {
      label: { en: 'Edit', ko: '편집' },
      items: [
        { label: { en: 'Undo',             ko: '실행 취소' }, hint: 'Ctrl+Z', enabled: false },
        { label: { en: 'Redo',             ko: '다시 실행' }, hint: 'Ctrl+Y', enabled: false },
        { sep: true },
        { label: { en: 'Cut',              ko: '잘라내기' },  hint: 'Ctrl+X', enabled: false },
        { label: { en: 'Copy Personality', ko: '성격 복사' }, enabled: false, hint: 'protected' },
        { label: { en: 'Paste',            ko: '붙여넣기' },  hint: 'Ctrl+V', enabled: false },
        { sep: true },
        { label: { en: 'Select All Of It', ko: '전체 선택' },  enabled: false }
      ]
    },
    {
      label: { en: 'View', ko: '보기' },
      items: [
        { label: { en: 'Starfield',            ko: '별 배경' },   enabled: true, action: 'toggle-stars', check: true },
        { label: { en: 'Scanlines',            ko: '주사선' },    enabled: true, action: 'toggle-crt',   check: true },
        { sep: true },
        { label: { en: 'Large Icons',          ko: '큰 아이콘' },  enabled: false },
        { label: { en: 'Arrange By: Fondness', ko: '정렬: 애정순' }, enabled: false },
        { label: { en: 'Zoom 100%',            ko: '확대 100%' },  enabled: false }
      ]
    },
    {
      label: { en: 'Help', ko: '도움말' },
      items: [
        { label: { en: 'About YEON-OS',     ko: 'YEON-OS 정보' }, enabled: true, action: 'about' },
        { label: { en: 'Help Topics',       ko: '도움말 항목' },   enabled: false },
        { label: { en: 'Contact Support',   ko: '지원 문의' },     enabled: false, hint: '1 staff' },
        { sep: true },
        { label: { en: 'Check For Updates', ko: '업데이트 확인' },  enabled: false }
      ]
    }
  ],

  /* ---------------------------------------------------------------------------
     11. DIALOGS fired by menu items, and the Start menu
     ------------------------------------------------------------------------- */
  dialogs: {
    about: {
      title:   { en: 'About YEON-OS', ko: 'YEON-OS 정보' },
      heading: { en: 'YEON-OS v[[HER_AGE]].00', ko: 'YEON-OS v[[HER_AGE]].00' },
      lines: {
        en: [
          'Unknown Planet Systems',
          'Built by Chris on Earth',
          '',
          'Licensed to: [[HER_NAME_FOR_THE_LICENCE_LINE]]',
          'Licence: one (1) friend, non-transferable',
          '',
          'This product contains no tracking, no cookies',
          'and no reason to exist other than the date.'
        ],
        ko: [
          'Unknown Planet Systems',
          '지구에서 Chris가 만듦',
          '',
          '라이선스 사용자: [[HER_NAME_FOR_THE_LICENCE_LINE_KO]]',
          '라이선스: 친구 1명, 양도 불가',
          '',
          '이 제품에는 추적도 쿠키도 없고,',
          '날짜 말고는 존재할 이유도 없습니다.'
        ]
      },
      buttons: [{ en: 'OK', ko: '확인' }]
    },
    exit: {
      title:   { en: 'Exit YEON-OS', ko: 'YEON-OS 끝내기' },
      heading: { en: 'Exit denied.', ko: '종료할 수 없습니다.' },
      detail:  { en: 'It is your birthday. The operating system stays open.',
                 ko: '오늘은 네 생일이야. 이 운영체제는 안 닫혀.' },
      buttons: [{ en: 'Fine', ko: '알겠어' }]
    },
    shutdown: {
      title:   { en: 'Shut Down', ko: '시스템 종료' },
      heading: { en: 'It is now safe to keep reading.', ko: '이제 계속 읽으셔도 안전합니다.' },
      detail:  { en: 'This system cannot be shut down today. Try again tomorrow.',
                 ko: '오늘은 이 시스템을 끌 수 없습니다. 내일 다시 시도하세요.' },
      buttons: [{ en: 'OK', ko: '확인' }]
    },
    scan: {
      title:   { en: 'Signal Search', ko: '신호 검색' },
      heading: { en: 'Scanning...', ko: '검색 중...' },
      steps: {
        en: ['Scanning sector 001 ... clear',
             'Scanning sector 002 ... clear',
             'Scanning sector 003 ... one (1) planet',
             'Classifying ... rare',
             'Search complete.'],
        ko: ['섹터 001 검색 ... 이상 없음',
             '섹터 002 검색 ... 이상 없음',
             '섹터 003 검색 ... 행성 1개',
             '분류 중 ... 희귀',
             '검색 완료.']
      },
      buttons: [{ en: 'OK', ko: '확인' }]
    },
    start: {
      label:    { en: 'Start', ko: '시작' },
      banner:   { en: 'YEON-OS', ko: 'YEON-OS' },
      programs: { en: 'Programs', ko: '프로그램' },
      shutdown: { en: 'Shut Down...', ko: '시스템 종료...' }
    }
  },

  /* ---------------------------------------------------------------------------
     12. SMALL UI STRINGS
     Buttons, hints, window furniture. Mostly leave these alone.
     ------------------------------------------------------------------------- */
  ui: {
    notepadMenu: [
      { en: 'File',   ko: '파일' },
      { en: 'Edit',   ko: '편집' },
      { en: 'Format', ko: '서식' },
      { en: 'Help',   ko: '도움말' }
    ],
    minimise:  { en: 'Minimise', ko: '최소화' },
    close:     { en: 'Close',    ko: '닫기' },
    prev:      { en: 'Prev',     ko: '이전' },
    next:      { en: 'Next',     ko: '다음' },
    play:      { en: 'Play',     ko: '재생' },
    pause:     { en: 'Pause',    ko: '일시정지' },
    openHint:  { en: 'double-click to open', ko: '두 번 눌러서 열기' },
    runIt:     { en: 'Run it',   ko: '실행' },
    ofN:       { en: '{i} of {n}', ko: '{n}개 중 {i}번째' },
    diskEnd:   { en: 'END OF DISK', ko: '디스크 끝' }
  }
};
