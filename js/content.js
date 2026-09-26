/* =============================================================================
   YEON-OS  ::  content.js
   -----------------------------------------------------------------------------
   All the words on the site live in this file. Nothing else needs touching.

   HOW TO EDIT
   -----------
   1. Text comes in pairs:  { en: "English", ko: "한국어" }
      Fill in both. If one side is left empty ("") the site uses the other one,
      so nothing ever shows up blank.
   2. Paragraphs are arrays. Each string in the array is its own line:
        body: { en: ["first line", "second line"], ko: ["첫 줄", "둘째 줄"] }
      An empty string "" makes a blank line.
   3. Gallery: pictures live in assets/gallery/ and are listed under
      gallery.photos. Add your own photos the same way.
   4. Save, refresh the browser. There is no build step.
   ============================================================================ */

window.YEON_CONTENT = {

  /* ---------------------------------------------------------------------------
     1. THE BASICS
     ------------------------------------------------------------------------- */
  meta: {
    // Her name in title bars and the properties window.
    name: { en: 'Yeon', ko: '연' },

    // How you'd call her name out loud. 연 ends in a consonant, so it's 연아.
    // Used in the last do_not_open.exe dialog.
    nameVocative: { en: 'Yeon', ko: '연아' },

    age: '26',
    city: { en: 'Seoul, Korea', ko: '대한민국 서울' },
    birthday: { en: 'September 29', ko: '9월 29일' },

    // Clicking the clock counts down to this date.
    birthdayMonth: 9,
    birthdayDay: 29,

    // Shown in the taskbar tray.
    hostname: 'yeon-os.local'
  },

  /* ---------------------------------------------------------------------------
     2. BOOT SCREEN
     The fake BIOS, typed out one line at a time.
     "" is a blank line. Lines starting with ">" are drawn in cyan.
     ------------------------------------------------------------------------- */
  boot: {
    charDelay: 14,       // ms per character, first visit
    lineDelay: 190,      // ms between lines, first visit
    fastCharDelay: 0,    // repeat visits: 0 = whole lines at once (~2 seconds)
    fastLineDelay: 55,
    skipHint: { en: '[ PRESS ANY KEY TO SKIP ]', ko: '[ 아무 키나 누르면 건너뛰기 ]' },

    lines: {
      en: [
        'YEON-OS BIOS v26.00',
        '(C) 2026 Unknown Planet Systems',
        '',
        'Main Processor    : YEON, 1 core (one of a kind)',
        'Memory Test       : 65536K OK',
        'Detecting Drives .. 1 found',
        'Primary Master    : UNKNOWN PLANET',
        '',
        '> SCANNING FOR SIGNAL ...',
        '> SIGNAL FOUND',
        '> ORIGIN       : SEOUL, KOREA',
        '> DISTANCE     : FAR. WORTH IT.',
        '> THREAT LEVEL : DANGEROUSLY COOL',
        '> NOTE         : 이 별 = THIS STAR',
        '',
        'PRESS ANY KEY TO CONTINUE_'
      ],
      ko: [
        'YEON-OS BIOS v26.00',
        '(C) 2026 Unknown Planet Systems',
        '',
        '메인 프로세서   : YEON, 1코어 (세상에 하나)',
        '메모리 검사     : 65536K OK',
        '드라이브 검색 .. 1개 찾음',
        '주 드라이브     : UNKNOWN PLANET',
        '',
        '> 신호 찾는 중 ...',
        '> 신호 찾음',
        '> 발신지     : 대한민국 서울',
        '> 거리       : 멀어. 그래도 갈 만해.',
        '> 위험도     : 위험할 정도로 멋짐',
        '> 참고       : 이 별 = THIS STAR',
        '',
        '아무 키나 누르세요_'
      ]
    }
  },

  /* ---------------------------------------------------------------------------
     3. DESKTOP ICONS
     Order here = order down the left of the desktop, and the order of the
     cards on a phone. Don't change the ids (js/app.js uses them).
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
     4. README.txt  (opens by itself on first load)
     ------------------------------------------------------------------------- */
  readme: {
    title: { en: 'README.txt', ko: 'README.txt' },
    body: {
      en: [
        'YEON-OS v26.00',
        '==============================',
        '',
        'hi! so a signal came in from an',
        'unknown planet, and this is what',
        'was on it.',
        '',
        '(the planet is you, btw)',
        '',
        "WHAT'S IN HERE",
        '',
        '  birthday_message.txt   the actual card,',
        '                         open this first',
        '  gallery                pictures (mostly cats)',
        '  player.exe             the song. press play!',
        '  properties.exe         your specs',
        "  do_not_open.exe        don't open this",
        '',
        'you can drag the windows around,',
        "close them, open them again. you",
        "can't break anything, promise.",
        '',
        'happy 26th!',
        '',
        '                           -- Chris'
      ],
      ko: [
        'YEON-OS v26.00',
        '==============================',
        '',
        '안녕! 알 수 없는 행성에서',
        '신호가 왔는데, 이게 들어 있었어.',
        '',
        '(그 행성이 너야 ㅎㅎ)',
        '',
        '들어 있는 것',
        '',
        '  birthday_message.txt   진짜 카드.',
        '                         이거 먼저 열어봐',
        '  gallery                그림들 (거의 고양이)',
        '  player.exe             그 노래. 재생 눌러!',
        '  properties.exe         너의 사양',
        '  do_not_open.exe        열지 마',
        '',
        '창은 마음대로 옮기고, 닫고,',
        '다시 열어도 돼. 절대 안 망가져.',
        '',
        '26번째 생일 축하해!',
        '',
        '                           -- Chris'
      ]
    }
  },

  /* ---------------------------------------------------------------------------
     5. birthday_message.txt   <--  THE ACTUAL CARD
     It types itself out; a click skips to the end.
     Keep lines under about 40 characters so they wrap cleanly on a phone.
     ------------------------------------------------------------------------- */
  message: {
    title: { en: 'birthday_message.txt', ko: 'birthday_message.txt' },
    typeSpeed: 20,   // ms per character. Lower = faster.
    skipHint: { en: 'click anywhere to skip', ko: '아무 데나 누르면 건너뛰기' },
    body: {
      en: [
        'Hi Yeon!',
        '',
        'Happy Birthday!',
        '',
        'I really hope you have a special',
        'and amazing day, and I am right here',
        'hoping it goes the best it possibly can!',
        '',
        '',
        'p.s. this whole site was inspired by',
        "IU's Unknown Planet (이 별로부터)!",
        'I thought it was really cool, so I',
        'made you your own little version :)',
        '',
        '                            -- Chris'
      ],
      ko: [
        '연아, 안녕!',
        '',
        '생일 축하해!',
        '',
        '오늘 정말 특별하고 멋진',
        '하루 보냈으면 좋겠어.',
        '최고의 하루가 될 수 있게',
        '바로 여기서 응원하고 있을게!',
        '',
        '',
        "p.s. 이 사이트는 아이유 '이 별로부터'",
        '보고 영감받아서 만든 거야!',
        '진짜 멋있다고 생각해서',
        '너만의 버전으로 만들어 봤어 :)',
        '',
        '                            -- Chris'
      ]
    }
  },

  /* ---------------------------------------------------------------------------
     6. GALLERY
     Pictures live in assets/gallery/. List them here, in order.
       file:    the filename inside assets/gallery/
       caption: shows under the thumbnail and in the viewer's title bar.
     To add a photo: drop it in the folder and add a line.
     ------------------------------------------------------------------------- */
  gallery: {
    title: { en: 'gallery', ko: 'gallery' },
    folder: 'assets/gallery/',
    statusFmt: { en: '{n} object(s)', ko: '항목 {n}개' },
    emptyNote: {
      en: 'Nothing in here yet.',
      ko: '아직 아무것도 없어요.'
    },
    placeholderCount: 6,                                  // tiles drawn if photos[] is ever empty
    placeholderLabel: { en: 'SLOT {n}', ko: '슬롯 {n}' },
    photos: [
      { file: 'cat_astronaut.svg', caption: { en: 'space cat',              ko: '우주 고양이' } },
      { file: 'ringed_planet.svg', caption: { en: 'the unknown planet',     ko: '미지의 행성' } },
      { file: 'cat_crt.svg',       caption: { en: 'napping on the monitor', ko: '모니터 위에서 낮잠' } },
      { file: 'synth_sunset.svg',  caption: { en: 'retro sunset',           ko: '레트로 노을' } },
      { file: 'loaf_orbit.svg',    caption: { en: 'cat loaf, in orbit',     ko: '우주에서 식빵 굽는 중' } },
      { file: 'rocket.svg',        caption: { en: 'on the way to seoul',    ko: '서울 가는 중' } },
      { file: 'cat_telescope.svg', caption: { en: 'looking for the signal', ko: '신호 찾는 중' } },
      { file: 'floppy.svg',        caption: { en: 'YEON.SYS',               ko: 'YEON.SYS' } }
    ]
  },

  /* ---------------------------------------------------------------------------
     7. player.exe
     The song, through YouTube's official embed. Nothing plays until she
     presses play.
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
      en: "Can't reach YouTube. Open it there instead:",
      ko: '유튜브에 연결이 안 돼. 여기서 열어봐:'
    },
    offlineLink: { en: 'youtube.com', ko: 'youtube.com' }
  },

  /* ---------------------------------------------------------------------------
     8. properties.exe
     A system-properties window that treats her as hardware. Add or remove
     rows freely.
     ------------------------------------------------------------------------- */
  properties: {
    title: { en: 'System Properties', ko: '시스템 속성' },
    tab: { en: 'General', ko: '일반' },
    rows: [
      { k: { en: 'Device',       ko: '장치' },          v: { en: 'Yeon',                             ko: '연' } },
      { k: { en: 'Manufacturer', ko: '제조사' },        v: { en: 'Unknown Planet',                   ko: 'Unknown Planet' } },
      { k: { en: 'Model',        ko: '모델' },          v: { en: 'One of a kind',                    ko: '세상에 하나' } },
      { k: { en: 'Location',     ko: '위치' },          v: { en: 'Seoul, Korea',                     ko: '대한민국 서울' } },
      { k: { en: 'Status',       ko: '상태' },          v: { en: 'This device is working properly.', ko: '이 장치가 올바르게 작동하고 있습니다.' } },
      { k: { en: 'Uptime',       ko: '가동 시간' },      v: { en: '26 years',                         ko: '26년' } },
      { k: { en: 'Last restart', ko: '마지막 재시작' },   v: { en: 'September 29, every year',         ko: '매년 9월 29일' } },
      { k: { en: 'Known issues', ko: '알려진 문제' },     v: { en: 'Too kind (no fix planned)',        ko: '너무 착함 (고칠 계획 없음)' } },
      { k: { en: 'Warranty',     ko: '보증' },          v: { en: 'Lifetime',                         ko: '평생' } }
    ],
    footer: {
      en: 'No action is required at this time.',
      ko: '지금은 아무 조치도 필요하지 않습니다.'
    }
  },

  /* ---------------------------------------------------------------------------
     9. do_not_open.exe
     Each OK brings up the next one; the last one is the point.
       kind: 'error' = warning icon, 'info' = planet icon.
     ------------------------------------------------------------------------- */
  errors: [
    {
      kind: 'error',
      title:   { en: 'System Error', ko: '시스템 오류' },
      heading: { en: 'do_not_open.exe has performed an illegal operation.',
                 ko: 'do_not_open.exe 가 잘못된 작업을 수행했습니다.' },
      detail:  { en: 'The illegal operation was: opening do_not_open.exe.',
                 ko: '잘못된 작업: do_not_open.exe 를 열었음.' },
      buttons: [{ en: 'OK', ko: '확인' }]
    },
    {
      kind: 'error',
      title:   { en: 'Error 0x0000BDAY', ko: '오류 0x0000BDAY' },
      heading: { en: 'Birthday detected.', ko: '생일이 감지되었습니다.' },
      detail:  { en: "This computer can't handle a birthday this big.",
                 ko: '이 컴퓨터로는 감당이 안 되는 크기의 생일입니다.' },
      buttons: [{ en: 'OK', ko: '확인' }, { en: 'Also OK', ko: '이것도 확인' }]
    },
    {
      kind: 'error',
      title:   { en: 'Critical Error', ko: '치명적 오류' },
      heading: { en: 'Way too much confetti.', ko: '색종이가 너무 많습니다.' },
      detail:  { en: "Tried to clean it up. Couldn't. Sorry!",
                 ko: '치워 보려고 했는데 안 됐어요. 미안!' },
      buttons: [{ en: 'OK', ko: '확인' }]
    },
    {
      kind: 'error',
      title:   { en: 'Error', ko: '오류' },
      heading: { en: 'Something went wrong while showing the last error.',
                 ko: '이전 오류를 보여주다가 오류가 났습니다.' },
      detail:  { en: 'Report this error to the other error?',
                 ko: '이 오류를 그 오류한테 신고할까요?' },
      buttons: [{ en: 'Sure', ko: '그래' }, { en: 'No', ko: '아니' }]
    },
    {
      kind: 'info',
      title:   { en: 'Message', ko: '메시지' },
      // {name} is replaced with meta.nameVocative
      heading: { en: 'happy birthday, {name}!', ko: '생일 축하해, {name}!' },
      detail:  { en: "okay that's it, that was the whole point. the errors were a joke :)",
                 ko: '사실 이 말 하려고 그랬어. 오류는 다 장난 ㅎㅎ' },
      buttons: [{ en: 'OK', ko: '확인' }]
    }
  ],

  /* ---------------------------------------------------------------------------
     10. MENU BAR
     Every item does something. An item can have:
       action: something built in (js/app.js knows these names)
       dialog: a little message box written right here
     or both. enabled: false greys an item out.
     ------------------------------------------------------------------------- */
  menus: [
    {
      label: { en: 'File', ko: '파일' },
      items: [
        { label: { en: 'New Friend', ko: '새 친구' }, hint: 'Ctrl+N',
          dialog: { title: { en: 'New Friend', ko: '새 친구' },
                    heading: { en: "Can't make a new one.", ko: '새로 만들 수 없어요.' },
                    detail: { en: "There's only one of you.", ko: '너는 세상에 하나뿐이니까.' } } },
        { label: { en: 'Open Unknown Planet', ko: 'Unknown Planet 열기' }, hint: 'Ctrl+O', action: 'open-message' },
        { label: { en: 'Save Memory As...', ko: '추억 저장...' },
          dialog: { title: { en: 'Save As', ko: '저장' },
                    heading: { en: 'Saved!', ko: '저장했어!' },
                    detail: { en: 'Saved to C:\\heart\\ (plenty of room in there).',
                              ko: 'C:\\heart\\ 에 저장됨 (공간 넉넉함).' } } },
        { sep: true },
        { label: { en: 'Print', ko: '인쇄' }, hint: 'Ctrl+P',
          dialog: { kind: 'error', title: { en: 'Print', ko: '인쇄' },
                    heading: { en: 'No printer found.', ko: '프린터가 없어요.' },
                    detail: { en: "You'll just have to look at it on screen, sorry.",
                              ko: '그냥 화면으로 봐줘 ㅎㅎ' } } },
        { label: { en: 'Exit', ko: '끝내기' }, action: 'exit' }
      ]
    },
    {
      label: { en: 'Search', ko: '검색' },
      items: [
        { label: { en: 'For Signal...', ko: '신호 검색...' }, action: 'scan' },
        { label: { en: 'For Meaning', ko: '의미 검색' },
          dialog: { title: { en: 'Search', ko: '검색' },
                    heading: { en: 'Found 1 result:', ko: '결과 1개:' },
                    detail: { en: "it's your birthday!", ko: '오늘 네 생일!' } } },
        { label: { en: 'For Yeon', ko: 'Yeon 검색' }, hint: { en: 'found', ko: '찾음' }, action: 'planet',
          dialog: { title: { en: 'Search', ko: '검색' },
                    heading: { en: 'Found Yeon!', ko: 'Yeon 찾았다!' },
                    detail: { en: 'Location: Seoul. Status: being celebrated.', ko: '위치: 서울. 상태: 생일 축하받는 중.' } } },
        { sep: true },
        { label: { en: 'Index This Drive', ko: '드라이브 색인' },
          dialog: { title: { en: 'Indexing', ko: '색인' },
                    heading: { en: 'Indexing C: ...', ko: 'C: 색인 중 ...' },
                    steps: { en: ['README.txt ....... 1 file',
                                  'gallery .......... 8 pictures',
                                  'player.exe ....... 1 song',
                                  'problems ......... 0',
                                  'Done!'],
                             ko: ['README.txt ....... 파일 1개',
                                  'gallery .......... 그림 8개',
                                  'player.exe ....... 노래 1곡',
                                  '문제 ............. 0개',
                                  '끝!'] } } }
      ]
    },
    {
      label: { en: 'Edit', ko: '편집' },
      items: [
        { label: { en: 'Undo', ko: '실행 취소' }, hint: 'Ctrl+Z',
          dialog: { title: { en: 'Undo', ko: '실행 취소' },
                    heading: { en: 'Nothing to undo.', ko: '되돌릴 게 없어요.' },
                    detail: { en: 'Everything here is on purpose.', ko: '다 일부러 한 거야.' } } },
        { label: { en: 'Redo', ko: '다시 실행' }, hint: 'Ctrl+Y',
          dialog: { title: { en: 'Redo', ko: '다시 실행' },
                    heading: { en: 'One more time:', ko: '한 번 더:' },
                    detail: { en: 'Happy birthday!', ko: '생일 축하해!' } } },
        { sep: true },
        { label: { en: 'Cut', ko: '잘라내기' }, hint: 'Ctrl+X',
          dialog: { kind: 'error', title: { en: 'Cut', ko: '잘라내기' },
                    heading: { en: 'Not yet!', ko: '아직 안 돼!' },
                    detail: { en: "Nobody's cut the cake yet.", ko: '케이크 아직 안 잘랐어.' } } },
        { label: { en: 'Copy Personality', ko: '성격 복사' }, hint: { en: 'locked', ko: '잠김' },
          dialog: { kind: 'error', title: { en: 'Copy', ko: '복사' },
                    heading: { en: 'Copy failed.', ko: '복사 실패.' },
                    detail: { en: "Can't copy this one. It's one of a kind.",
                              ko: '이건 복사가 안 돼요. 세상에 하나뿐이라서.' } } },
        { label: { en: 'Paste', ko: '붙여넣기' }, hint: 'Ctrl+V',
          dialog: { title: { en: 'Paste', ko: '붙여넣기' },
                    heading: { en: 'Pasted!', ko: '붙여넣기 완료!' },
                    detail: { en: "There was a birthday wish on the clipboard. It's yours now.",
                              ko: '클립보드에 생일 소원이 하나 있었어. 이제 네 거야.' } } },
        { sep: true },
        { label: { en: 'Select All Of It', ko: '전부 선택' },
          dialog: { title: { en: 'Select All', ko: '전부 선택' },
                    heading: { en: 'Selected all of it.', ko: '전부 선택!' },
                    detail: { en: 'Good choice.', ko: '잘 골랐어.' } } }
      ]
    },
    {
      label: { en: 'View', ko: '보기' },
      items: [
        { label: { en: 'Starfield', ko: '별 배경' }, action: 'toggle-stars', check: true },
        { label: { en: 'Scanlines', ko: '주사선' }, action: 'toggle-crt', check: true },
        { sep: true },
        { label: { en: 'Large Icons', ko: '큰 아이콘' }, action: 'toggle-icons', check: true },
        { label: { en: 'Arrange By: Fondness', ko: '정렬: 애정순' }, action: 'arrange',
          dialog: { title: { en: 'Arrange Icons', ko: '아이콘 정렬' },
                    heading: { en: 'Sorted by fondness.', ko: '애정순으로 정렬했어.' },
                    detail: { en: 'The card goes first. Everything else is tied.',
                              ko: '카드가 1등, 나머지는 공동 2등.' } } },
        { label: { en: 'Zoom', ko: '확대' }, hint: { en: 'warp', ko: '워프' }, action: 'hyperspace' }
      ]
    },
    {
      label: { en: 'Help', ko: '도움말' },
      items: [
        { label: { en: 'About YEON-OS', ko: 'YEON-OS 정보' }, action: 'about' },
        { label: { en: 'Help Topics', ko: '도움말 항목' }, action: 'readme' },
        { label: { en: 'Contact Support', ko: '지원 문의' }, hint: { en: '1 person', ko: '1명' },
          dialog: { title: { en: 'Support', ko: '지원' },
                    heading: { en: 'Support team: Chris.', ko: '지원팀: Chris (1명).' },
                    detail: { en: 'Based on Earth. Usually replies pretty fast.',
                              ko: '지구에 있음. 답장은 보통 빠름.' } } },
        { sep: true },
        { label: { en: 'Check For Updates', ko: '업데이트 확인' },
          dialog: { title: { en: 'YEON-OS Update', ko: 'YEON-OS 업데이트' },
                    heading: { en: 'Checking for updates ...', ko: '업데이트 확인 중 ...' },
                    steps: { en: ['Asking Unknown Planet ... ok',
                                  'You have v26.00',
                                  'Latest is v26.00',
                                  "You're up to date!",
                                  'Next update: v27.00, Sept 29 2027'],
                             ko: ['Unknown Planet 에 물어보는 중 ... 완료',
                                  '지금 버전: v26.00',
                                  '최신 버전: v26.00',
                                  '최신 상태야!',
                                  '다음 업데이트: v27.00, 2027년 9월 29일'] } } }
      ]
    }
  ],

  /* ---------------------------------------------------------------------------
     11. NOTEPAD
     The File / Edit / Format / Help strip inside README.txt and
     birthday_message.txt. Replay retypes the text, Copy copies it, Word Wrap
     and the text size really change.
     ------------------------------------------------------------------------- */
  notepad: {
    menus: [
      { label: { en: 'File', ko: '파일' }, items: [
        { label: { en: 'Replay', ko: '다시 재생' }, action: 'np-replay' },
        { sep: true },
        { label: { en: 'Close', ko: '닫기' }, action: 'np-close' }
      ] },
      { label: { en: 'Edit', ko: '편집' }, items: [
        { label: { en: 'Select All', ko: '모두 선택' }, action: 'np-select' },
        { label: { en: 'Copy', ko: '복사' }, action: 'np-copy' }
      ] },
      { label: { en: 'Format', ko: '서식' }, items: [
        { label: { en: 'Word Wrap', ko: '자동 줄 바꿈' }, action: 'np-wrap', check: true },
        { sep: true },
        { label: { en: 'Bigger Text', ko: '글자 크게' }, action: 'np-bigger' },
        { label: { en: 'Smaller Text', ko: '글자 작게' }, action: 'np-smaller' }
      ] },
      { label: { en: 'Help', ko: '도움말' }, items: [
        { label: { en: 'About Notepad', ko: '메모장 정보' },
          dialog: { title: { en: 'About Notepad', ko: '메모장 정보' },
                    heading: { en: 'Notepad', ko: '메모장' },
                    detail: { en: "It holds text. That's about it.", ko: '글 담는 곳. 그게 다야.' } } }
      ] }
    ],
    status: {
      copied:     { en: 'Copied!',                 ko: '복사했어!' },
      copyFailed: { en: "Couldn't copy. It's selected, so try Ctrl+C.", ko: '복사가 안 됐어. 선택돼 있으니까 Ctrl+C 눌러봐.' },
      selected:   { en: 'Selected everything.',    ko: '전부 선택됨.' },
      wrapOn:     { en: 'Word wrap on',            ko: '자동 줄 바꿈 켬' },
      wrapOff:    { en: 'Word wrap off',           ko: '자동 줄 바꿈 끔' }
    }
  },

  /* ---------------------------------------------------------------------------
     12. OTHER DIALOGS
     From the menus, the Start menu, the clock and the taskbar tray.
     ------------------------------------------------------------------------- */
  dialogs: {
    about: {
      title:   { en: 'About YEON-OS', ko: 'YEON-OS 정보' },
      heading: { en: 'YEON-OS v26.00', ko: 'YEON-OS v26.00' },
      lines: {
        en: [
          'Unknown Planet Systems',
          'Built by Chris on Earth',
          '',
          'Licensed to: Yeon, brightest star in Seoul',
          'Licence: 1 friend, not transferable',
          '',
          'No tracking, no cookies. Just a birthday.'
        ],
        ko: [
          'Unknown Planet Systems',
          '지구에서 Chris가 만듦',
          '',
          '라이선스 사용자: 서울에서 제일 빛나는 별, 연',
          '라이선스: 친구 1명 (양도 불가)',
          '',
          '추적 없음, 쿠키 없음. 그냥 생일 축하.'
        ]
      },
      buttons: [{ en: 'OK', ko: '확인' }]
    },
    exit: {
      kind: 'error',
      title:   { en: 'Exit YEON-OS', ko: 'YEON-OS 끝내기' },
      heading: { en: 'Nope.', ko: '안 돼.' },
      detail:  { en: "It's your birthday, you're not leaving yet.",
                 ko: '생일인데 벌써 가게?' },
      buttons: [{ en: 'Fine', ko: '알았어' }]
    },
    shutdown: {
      kind: 'error',
      title:   { en: 'Shut Down', ko: '시스템 종료' },
      heading: { en: "Can't shut down today.", ko: '오늘은 끌 수 없어요.' },
      detail:  { en: 'Try again tomorrow.', ko: '내일 다시 해봐.' },
      buttons: [{ en: 'OK', ko: '확인' }]
    },
    scan: {
      title:   { en: 'Signal Search', ko: '신호 검색' },
      heading: { en: 'Scanning...', ko: '찾는 중...' },
      steps: {
        en: ['Sector 001 ... nothing',
             'Sector 002 ... nothing',
             'Sector 003 ... 1 planet',
             'Checking it out ... special',
             'Found it!'],
        ko: ['섹터 001 ... 없음',
             '섹터 002 ... 없음',
             '섹터 003 ... 행성 1개',
             '살펴보는 중 ... 특별함',
             '찾았다!']
      },
      buttons: [{ en: 'OK', ko: '확인' }]
    },
    // Clicking yeon-os.local in the taskbar.
    network: {
      title:   { en: 'Network', ko: '네트워크' },
      heading: { en: 'Connected to Unknown Planet', ko: '연결됨: Unknown Planet' },
      detail:  { en: "Signal's strong.", ko: '신호 아주 좋음.' },
      buttons: [{ en: 'OK', ko: '확인' }]
    },
    // Clicking the clock. {date} is today, {n} is how many days are left.
    clock: {
      title:    { en: 'Date and Time', ko: '날짜와 시간' },
      heading:  { en: 'Today is {date}.', ko: '오늘은 {date}.' },
      until:    { en: '{n} days to go until September 29!', ko: '9월 29일까지 {n}일 남았어!' },
      untilOne: { en: 'Just 1 day to go until September 29!', ko: '9월 29일까지 딱 하루 남았어!' },
      today:    { en: "It's today! Happy birthday!!", ko: '바로 오늘이야! 생일 축하해!!' },
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
     13. SMALL UI STRINGS
     ------------------------------------------------------------------------- */
  ui: {
    minimise:  { en: 'Minimise', ko: '최소화' },
    close:     { en: 'Close',    ko: '닫기' },
    prev:      { en: 'Prev',     ko: '이전' },
    next:      { en: 'Next',     ko: '다음' },
    play:      { en: 'Play',     ko: '재생' },
    pause:     { en: 'Pause',    ko: '일시정지' },
    runIt:     { en: 'Run it',   ko: '실행' },
    ofN:       { en: '{i} of {n}', ko: '{n}개 중 {i}번째' },
    diskEnd:   { en: 'END OF DISK', ko: '디스크 끝' }
  }
};
