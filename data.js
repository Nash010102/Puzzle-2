// ============================================================
//  MIDNIGHT AT COLE MANOR — Game Data
//  Rooms, Items, Evidence, Puzzle definitions
// ============================================================

// ── ROOMS ──────────────────────────────────────────────────

const ROOMS = {
  study: {
    id: 'study',
    name: 'The Study',
    desc: 'Dark wood panelling. The smell of pipe tobacco. Bookshelves floor to ceiling.',
    gradient: 'linear-gradient(180deg,#1a0d0d 0%,#0a0810 100%)',
    art: '📚',
    requiresKey: null,
    items: [
      'victims_diary',
      'torn_photograph',
      'locked_desk',
      'wall_clock',
      'roman_numeral_note',
      'study_bookshelf',
      'study_hint_terminal'
    ]
  },
  kitchen: {
    id: 'kitchen',
    name: 'The Kitchen',
    desc: 'Copper pots hang from ceiling hooks. A cold hearth. Something was prepared here.',
    gradient: 'linear-gradient(180deg,#0d1a0d 0%,#080a08 100%)',
    art: '🔪',
    requiresKey: null,
    items: [
      'poison_bottle',
      'recipe_book',
      'fingerprint_kit',
      'servants_log',
      'burnt_notebook',
      'kitchen_hint_terminal'
    ]
  },
  bedroom: {
    id: 'bedroom',
    name: 'The Master Bedroom',
    desc: 'Heavy velvet curtains drawn shut. The bed untouched. A voice recorder on the nightstand.',
    gradient: 'linear-gradient(180deg,#0d0d1a 0%,#080810 100%)',
    art: '🛏',
    requiresKey: null,
    items: [
      'voice_recorder',
      'hidden_safe',
      'wardrobe_mirror',
      'love_letter',
      'bedroom_hint_terminal'
    ]
  },
  basement: {
    id: 'basement',
    name: 'Basement Laboratory',
    desc: 'Inventor\'s workspace. Copper tubing, glass beakers, strange machines. Smells of chemicals.',
    gradient: 'linear-gradient(180deg,#0a0a08 0%,#060608 100%)',
    art: '⚙',
    requiresKey: 'basement_key',
    items: [
      'cctv_fragments',
      'timeline_board',
      'wire_panel',
      'lab_journal',
      'maintenance_whiteboard',
      'toolbox_label',
      'basement_hint_terminal'
    ]
  },
  security: {
    id: 'security',
    name: 'Security Office',
    desc: 'Multiple monitors, most dark. Access logs printed on rolls of paper. A master panel.',
    gradient: 'linear-gradient(180deg,#0a100a 0%,#080a08 100%)',
    art: '🔒',
    requiresKey: 'security_keycard',
    items: [
      'access_logs',
      'override_terminal',
      'cctv_master',
      'admin_panel',
      'ascii_reference_card',
      'detective_board_item',
      'security_hint_terminal'
    ]
  }
};

// ── ITEMS ──────────────────────────────────────────────────

const ITEMS = {
  // STUDY
  victims_diary: {
    id: 'victims_diary',
    name: "Victim's Diary",
    icon: '📕',
    hint: 'Pages torn out. What remains?',
    inspectText: `A dark leather diary. Several pages have been carefully removed — not torn, but sliced with a blade.\n\nThe remaining entries span the last 6 months. The final entry is dated Nov 14:\n\n"She suspects. She always suspects. But she does not know about the will.\nNobody does. Not yet. I've made arrangements."\n\nOn the inside cover, in faded pencil: three numbers.\nThe first is smeared. The second: 7. The third: 3.\n\nNote: The smeared digit appears to be either a 4 or a 9.`,
    clueText: 'Diary code fragment: ?-7-3 (first digit smeared — appears to be 4 or 9)',
    puzzle: 'diary_cipher',
    symbol: true
  },
  torn_photograph: {
    id: 'torn_photograph',
    name: 'Torn Photograph',
    icon: '🖼',
    hint: 'Something was hidden in this image.',
    inspectText: `A photograph torn into six pieces. You can reassemble it.\n\nAt first glance it appears to be a formal family portrait — Adrian Cole, his wife Emma, and his sister Sarah.\n\nBut when you reassemble the correct pieces, you notice something:\n\nSarah and Adrian are smiling at each other. Not the formal, obligatory smile of siblings at a portrait. Something warmer. Conspiratorial.\n\nAdrian's hand rests on a folder. The folder's label reads: "ESTATE — FINAL REVISION".\n\nThe photographer's stamp on the back: Sept 22.`,
    clueText: 'Photograph reveals: Sarah and Adrian met privately — Adrian was revising his estate. Sept 22.',
    puzzle: 'photo_reconstruct',
    symbol: false
  },
  locked_desk: {
    id: 'locked_desk',
    name: "Adrian's Locked Desk",
    icon: '🗄',
    hint: 'Three-digit combination. Clues scattered across the manor.',
    inspectText: `A heavy mahogany desk. Three number dials — each from 0 to 9 — lock the central drawer.\n\nThere's a small engraved plate above the lock:\n\n"The hour I was born. The month I was married. The year means nothing."\n\nYou'll need to find the right combination from documents elsewhere in the manor.\n\nHint fragments are hidden in other rooms. You need all three.`,
    clueText: 'A three-dial combination lock. The answer is scattered across this room. You will need all pieces.',
    puzzle: 'desk_lock',
    symbol: false
  },
  wall_clock: {
    id: 'wall_clock',
    name: 'Stopped Wall Clock',
    icon: '🕰',
    hint: 'It stopped at the exact moment of death.',
    inspectText: `A grandfather clock, ornate and immense. It has stopped.\n\nThe hands point to 11:04 PM.\n\nThe face of the clock has a small brass plaque at the base:\n"The time of truth is always 11:04."\n\nInside the clock's case, wedged between the pendulum weights, is a folded note written in small, cramped handwriting:\n\n"First dial: Adrian was born in the fourth month. Count backwards from October."\n\nThe note is unsigned. That is all it says.`,
    clueText: 'A stopped clock. A note hidden inside the casing. Something about a birth month and October.',
    discoveryFlag: 'clock_solved',
    symbol: true
  },
  study_bookshelf: {
    id: 'study_bookshelf',
    name: 'Floor-to-Ceiling Bookshelf',
    icon: '📚',
    hint: 'Adrian was meticulous about his library.',
    inspectText: `Floor-to-ceiling shelves of dark mahogany, filling the entire west wall.\n\nThe books are organised by subject, then alphabetically within each section. Adrian Cole was nothing if not methodical.\n\nA hand-written catalogue card is pinned to the top shelf:\n\n  "Collected volumes — Cole private library.\n   Catalogued: Nov 1.\n   Total: 36 leather-bound editions."\n\nThe number is circled twice in red ink, as though someone wanted to remember it.\n\nOne shelf is slightly disturbed — several volumes leaning where one has been removed. The gap is at eye level.`,
    clueText: 'Adrian\'s personal library: 36 leather-bound volumes, carefully catalogued. One appears to be missing.',
    symbol: false
  },
  study_hint_terminal: {
    id: 'study_hint_terminal',
    name: 'Hint Terminal — Study',
    icon: '💡',
    hint: 'Unlock a hint — if you can solve the cipher.',
    inspectText: `A small brass terminal mounted beside the bookshelf. A folded card in the slot reads:\n\n"Intelligence is not freely given.\nSolve the cipher below to earn your hint.\n\nThe cipher uses a Caesar substitution.\nThe shift value is concealed somewhere in this room — look carefully at your surroundings.\n\nEncrypted message:\nKDV HPPDV DOLEL EHHQ HVWDEOLVKHG\n\nSolve it. Enter the decoded phrase."`,
    clueText: 'A cipher challenge. Decode the encrypted message using a Caesar substitution. The shift is not arbitrary.',
    puzzle: 'hint_study_cipher',
    isHint: true,
    symbol: true
  },

  // KITCHEN
  poison_bottle: {
    id: 'poison_bottle',
    name: 'Poison Bottle',
    icon: '⚗️',
    hint: 'Aconitine. Whose fingerprints are on this?',
    inspectText: `A dark glass bottle. Label reads: "Aconitine — 0.5mg/ml solution. LETHAL."\n\nThe cork has been removed and replaced. Some liquid is missing.\n\nAccording to the police report you found earlier, the autopsy confirmed aconitine poisoning. This is consistent with the cause of death.\n\nFingerprints are visible on the bottle — partial prints on the neck and full prints on the base.\n\nYou'll need to match these against the fingerprint cards.\n\nNote: This bottle was found on the kitchen counter. It was not hidden. It was placed there to be found.`,
    clueText: 'Poison bottle: aconitine. Found conspicuously on counter — possibly planted. Check fingerprints.',
    puzzle: null,
    symbol: false
  },
  recipe_book: {
    id: 'recipe_book',
    name: "Emma's Recipe Book",
    icon: '📖',
    hint: "A recipe for something other than food?",
    inspectText: `A handwritten recipe book. Most entries are domestic — stews, pastries, preserves.\n\nBut on page 47, between a recipe for pickled plums and a spiced wine:\n\nA different kind of entry. In a different hand — neater, more clinical:\n\n"Aconitine: derived from monkshood. Colorless. Odorless in solution. Undetectable in wine.\nOnset: 20–40 minutes. Symptoms mimic cardiac arrest."\n\nThe page has been annotated in pencil: "Dec 8 — used."\n\nBut the murder was November 15.\n\nDec 8 hasn't happened yet. This annotation was written in advance — or by someone else.\n\nThe handwriting does not match Emma's.`,
    clueText: 'A handwritten recipe book. Something on page 47 does not belong.',
    puzzle: 'recipe_decode',
    symbol: false
  },
  fingerprint_kit: {
    id: 'fingerprint_kit',
    name: 'Fingerprint Analysis Kit',
    icon: '👆',
    hint: 'Match the prints on the poison bottle.',
    inspectText: `A portable fingerprint analysis kit left by the first responders.\n\nInside: four fingerprint cards labeled A through D, and a master card from the poison bottle.\n\nThe cards are described as:\n- Card A: Loop pattern, high ridge count — belongs to Noah (assistant)\n- Card B: Whorl pattern, asymmetric — belongs to Emma (wife)\n- Card C: Arch pattern, fine ridges — belongs to Lucas (business partner)\n- Card D: Double-loop whorl — belongs to Sarah (sister)\n\nThe bottle has two sets of prints:\n- Bottle neck: Loop pattern, high ridge count\n- Bottle base: Whorl pattern, asymmetric — but smudged, and the base print has a glove-like outline around it.\n\nNote: The base print is inside a glove outline. This means it was placed — not incidental contact.`,
    clueText: 'A fingerprint analysis kit with four suspect cards. The poison bottle has two distinct print sets.',
    puzzle: 'fingerprint_match',
    symbol: false
  },
  servants_log: {
    id: 'servants_log',
    name: "Servants' Movement Log",
    icon: '📋',
    hint: 'Who was where, and when?',
    inspectText: `A ring-binder log kept by the household staff supervisor.\n\nEntries for November 15 (murder night):\n\n18:00 — Emma departs for Harrington Gallery (car service logged)\n18:45 — Lucas arrives, meets Adrian in study\n19:30 — Lucas departs (logged by gate camera)\n20:00 — Sarah arrives unannounced. Not logged — estimated time from staff testimony\n21:00 — Noah last seen in kitchen, signed out\n21:15 — Adrian seen alive by housekeeper (confirmed)\n22:00 — Dr. Cole found unresponsive in study\n22:47 — Emma returns (car service log)\n\nTimeline problem:\nEmma left at 18:00 and returned at 22:47.\nThe gallery closed at 21:30.\nThe gap between gallery close and return: 77 minutes.\nThe gallery is 12 minutes from Cole Manor.\n65 unaccounted minutes.`,
    clueText: 'Staff movement records for the night of the murder. Times, names, entries. Study them.',
    puzzle: 'timeline_analysis',
    symbol: true
  },
  kitchen_hint_terminal: {
    id: 'kitchen_hint_terminal',
    name: 'Hint Terminal — Kitchen',
    icon: '💡',
    hint: 'A 4×4 logic grid. Ten clues. One answer.',
    inspectText: `A terminal mounted on the pantry wall. The screen shows:\n\n"CHALLENGE: Logic Grid\n\nFour suspects. Four properties.\nMatch each to their correct alibi location, departure time, transport method, and alibi witness.\n\nSolve it to earn intelligence on the poison source."\n\nBelow the screen: "Wrong submissions are logged."`,
    clueText: 'Logic grid puzzle: 4 suspects × 4 categories. Solve to reveal poison source information.',
    puzzle: 'hint_kitchen_logic',
    isHint: true,
    symbol: false
  },

  // BEDROOM
  voice_recorder: {
    id: 'voice_recorder',
    name: 'Voice Recorder',
    icon: '🎙',
    hint: "It's been damaged. The message was scrambled.",
    inspectText: `A small digital voice recorder. The memory is damaged — the audio is fragmented into 6 clips, each labeled A through F.\n\nPlaying them in random order produces only noise and partial phrases.\n\nYou need to reconstruct the correct chronological order. Listen to the context of each fragment:\n\nA: "...I've hidden the proof in the—"\nB: "If anything happens to me before the—"\nC: "—safe in the bedroom. Combination is the year of—"\nD: "—fourth, two thousand and—"\nE: "Noah knows where the backup files are. Do not—"\nF: "—trust anyone who was here on the—"\n\nWhen correctly assembled, the message will be clear.`,
    clueText: 'Audio message — assemble fragments to hear Adrian\'s hidden instruction.',
    puzzle: 'audio_reconstruct',
    symbol: false
  },
  hidden_safe: {
    id: 'hidden_safe',
    name: 'Hidden Wall Safe',
    icon: '🔐',
    hint: "The voice recorder holds the combination if you can reconstruct it.",
    inspectText: `Behind the bedroom mirror, concealed by a false panel: a four-digit combination safe.\n\nThe safe appears to be a newer model — electronic, not mechanical.\n\nA sticky note on the inside of the panel reads: "You cannot guess this. You need the year."\n\nOnce the voice recorder is properly assembled, the combination will be revealed.\n\nThe safe contains something critical to the investigation.`,
    clueText: 'A hidden wall safe. Four digits. The voice recorder may hold the key.',
    puzzle: 'safe_unlock',
    symbol: false
  },
  wardrobe_mirror: {
    id: 'wardrobe_mirror',
    name: 'UV Wardrobe Mirror',
    icon: '🪞',
    hint: 'Under UV light, a pattern emerges. Touch them in order.',
    inspectText: `A large standing mirror in the wardrobe alcove.\n\nHolding it at an angle to the window light, you notice faint marks on the glass surface — 9 marks arranged in a 3×3 grid.\n\nThey appear to glow slightly, as if painted with a UV-reactive substance.\n\nA small note wedged in the mirror frame: "The order is the order you cannot reverse."\n\nSomething is encoded in the sequence these marks were applied. You need to find and touch them in the correct order to reveal a message written beneath.`,
    clueText: 'UV mirror sequence: 9 marks in 3×3 grid. Touch in correct order.',
    puzzle: 'uv_mirror_sequence',
    symbol: true
  },
  love_letter: {
    id: 'love_letter',
    name: 'Torn Love Letter',
    icon: '💌',
    hint: "It's not a love letter. Read it carefully.",
    inspectText: `The letter begins like a love letter — "My dearest—" — but it quickly becomes something else.\n\nIt's from Adrian. Written to Emma. Dated September 8.\n\n"My dearest Emma,\n\nI know you've found the other accounts. I know you've been speaking to the solicitor.\n\nI want you to understand: the new will is not what you think it is.\nSarah has agreed to hold the assets in trust. It protects us both.\n\nIf you try to contest this before I explain it, you will lose everything.\nI need you to wait. Trust me once more.\n\n— A"\n\nAt the bottom, in Emma's handwriting — underlined, twice:\n"He lied to her."`,
    clueText: 'Adrian wrote to Emma: new will involves Sarah holding assets in trust. Emma annotated: "He lied to her."',
    puzzle: null,
    symbol: false
  },
  bedroom_hint_terminal: {
    id: 'bedroom_hint_terminal',
    name: 'Hint Terminal — Bedroom',
    icon: '💡',
    hint: 'A magic square. Place 1–9 so every row, column, and diagonal sums to 15.',
    inspectText: `The terminal in the bedroom reads:\n\n"CHALLENGE: The Magic Square\n\nPlace the numbers 1 through 9 into a 3×3 grid.\nEvery row, every column, and both diagonals must sum to exactly 15.\n\nThere is only one solution (ignoring rotations and reflections).\n\nSolve it to reveal critical information about the bedroom safe."\n\nNote: The terminal will verify your answer automatically.`,
    clueText: 'Magic square: place 1–9 so all rows, columns, diagonals sum to 15. Only one unique solution.',
    puzzle: 'hint_bedroom_magic',
    isHint: true,
    symbol: false
  },

  // BASEMENT
  cctv_fragments: {
    id: 'cctv_fragments',
    name: 'CCTV Footage Fragments',
    icon: '📹',
    hint: 'Reassemble the CCTV clips in chronological order.',
    inspectText: `Seven CCTV clips on a corrupted drive. They are labeled out of order and several have had their timestamps overwritten.\n\nEach clip shows a different area of the manor at a different time of night.\n\nYou must determine the correct chronological order from contextual clues:\n- Lighting conditions (sun sets at 17:52 that evening)\n- Position of a visible hallway clock in clips 2 and 5\n- Clothing changes between clips\n- The position of a vase that was known to be knocked over at approximately 21:30\n\nArranging the clips correctly will eliminate one suspect completely.`,
    clueText: 'Corrupted CCTV footage — seven clips, no timestamps you can trust. Order matters.',
    puzzle: 'cctv_ordering',
    symbol: false
  },
  timeline_board: {
    id: 'timeline_board',
    name: 'Evidence Timeline Board',
    icon: '📊',
    hint: 'Arrange all events correctly to expose the impossible alibi.',
    inspectText: `A large corkboard covered with printed cards, photographs, and string.\n\nSomeone — likely the victim himself — had been building a timeline. A paranoid record of movements.\n\nThe cards are jumbled. When correctly assembled chronologically, the board reveals:\n\nA gap in Emma's verified movements of exactly 65 minutes.\n\nMore critically: the gallery's electronic sign-in system logged Emma OUT at 21:31.\nHer car service logged her pick-up at 22:46.\n\nAt 11 pm, a visitor entered through the staff gate using a resident code.\nThe code was Emma's.\n\nAt 11:04 pm, Adrian's heart stopped.`,
    clueText: 'A paranoid timeline built by the victim himself. Piece the events into the correct order.',
    puzzle: 'timeline_ordering',
    symbol: true
  },
  wire_panel: {
    id: 'wire_panel',
    name: 'Security Wire Panel',
    icon: '🔌',
    hint: 'Connect the correct wires to restore power to the security office.',
    inspectText: `A metal panel on the basement wall. Five wires — red, blue, green, yellow, white — are disconnected from five terminals, also colored.\n\nA laminated instruction sheet is pinned beside the panel:\n\n"SECURITY OFFICE POWER RESTORATION\nWire routing must follow the original configuration.\nThe correct pairing was recorded by Adrian."\n\nThe documentation exists somewhere in this manor. Study it before attempting any connections.\n\nCOUTION: Incorrect connections will trigger a 60-second lockout.`,
    clueText: 'Wire panel — restore security office power. The configuration was documented — find it before you touch anything.',
    puzzle: 'wire_connect',
    symbol: false
  },
  lab_journal: {
    id: 'lab_journal',
    name: "Adrian's Lab Journal",
    icon: '🧪',
    hint: 'Detailed technical notes. And something else.',
    inspectText: `A thick technical journal. Most entries are inventor's notes — schematics, material orders, patent filings.\n\nBut near the end, the tone changes:\n\n"Nov 12 — I'm being followed within my own house.\nThe CCTV has been accessed twice this week from an internal terminal.\nI've changed the admin code. New code: 7734.\n\nNov 13 — The access logs show entry attempts at 2:04 AM for the past 3 nights.\nSame login each time. The timestamp was altered on the external record but not the shadow log.\n\nNov 14 — Wire configuration for security office: Red→Terminal 3. Blue→Terminal 1. Green→Terminal 5. Yellow→Terminal 2. White→Terminal 4.\n\nIf I don't make it past Thursday, check the shadow log."`,
    clueText: 'Adrian\'s private journal. His final entries suggest he feared for his life — and left something behind.',
    puzzle: null,
    symbol: false
  },
  basement_hint_terminal: {
    id: 'basement_hint_terminal',
    name: 'Access Terminal',
    icon: '💻',
    hint: 'Something on the screen is waiting.',
    inspectText: `A freestanding terminal in the corner of the laboratory. Unlike the other equipment, it is powered on.

The screen glows faintly green.

— — — — — — — — — — — — — — —

■ ACCESS DENIED ■

Authentication requires machine language.
Human language is inefficient.

01000101
01001101
01001101
01000001

— — — — — — — — — — — — — — —

A single cursor blinks beneath the last line.`,
    clueText: 'A terminal in the basement laboratory. Authentication required.',
    puzzle: 'hint_basement_binary',
    isHint: true,
    symbol: true
  },

  // SECURITY OFFICE
  access_logs: {
    id: 'access_logs',
    name: 'Access Logs (Printed)',
    icon: '📑',
    hint: 'Who accessed the CCTV system — and when?',
    inspectText: `Roll after roll of printed access logs from the security system.\n\nNov 14, 02:04 — CCTV terminal accessed. Login: EC-ADMIN\nNov 14, 02:11 — CCTV timestamp modified: Clip 6 (exterior gate). Time overwritten from 23:00 to 21:00.\nNov 14, 02:17 — CCTV terminal logout.\n\nNov 15, 22:58 — Security override activated. Login: EC-ADMIN\nNov 15, 23:00 — Staff gate opened. Override user: EC-ADMIN\nNov 15, 23:04 — Motion detected, Study.\nNov 15, 23:09 — Motion ceased, Study.\n\nEC-ADMIN is Emma Cole's administrator account.\n\nShe used it to alter the CCTV on the 14th and to enter via staff gate on the 15th — after leaving the gallery.`,
    clueText: 'Rolls of printed access logs. An administrator account was active at suspicious hours. Who is EC-ADMIN?',
    puzzle: null,
    symbol: false
  },
  override_terminal: {
    id: 'override_terminal',
    name: 'Security Override Terminal',
    icon: '⌨️',
    hint: 'The admin code will unlock the shadow log. Adrian documented everything — look carefully.',
    inspectText: `The master override terminal. A blinking cursor awaits input.\n\nA laminated card beside the keyboard reads:\n"ADMIN AUTHENTICATION REQUIRED\nFour-digit admin code required to access shadow logs.\nWarning: Three failed attempts will initiate lockdown."\n\nSomeone in this manor changed this code recently. They would have written it down.`,
    clueText: 'The override terminal needs a four-digit admin code. Someone in this manor knew it.',
    puzzle: 'admin_terminal',
    symbol: false
  },
  cctv_master: {
    id: 'cctv_master',
    name: 'CCTV Master System',
    icon: '🖥',
    hint: 'The shadow log has the real timestamps. Compare them.',
    inspectText: `The master CCTV system. Two feeds side by side:\n\n— Official log (modified): Shows Emma at gallery until 22:46.\n\n— Shadow log (once admin access restored): Shows a figure entering via staff gate at 23:00. Same height, same coat. Posture matches Emma's gallery footage precisely.\n\nA forensic note clipped to the monitor:\n"Clip 6 timestamp was overwritten from 23:00 to 21:00. The shadow log is unaltered. The gate camera has a lens flare pattern unique to that hardware — we can confirm this clip was taken at night, not 21:00."\n\nThe official log was fabricated. The shadow log is truth.`,
    clueText: 'The CCTV master system. Two feeds — official and shadow. What do they disagree on?',
    puzzle: 'cctv_comparison',
    symbol: false
  },
  admin_panel: {
    id: 'admin_panel',
    name: 'Master Admin Panel',
    icon: '🔧',
    hint: "The encrypted file — what's inside it?",
    inspectText: `A master admin panel with an encrypted file labeled "EC-WILL-FINAL.enc".\n\nThe file is hex-encoded. A nearby printout shows the decryption key structure:\n"XOR decode. Key = 0x41."\n\nA subset of the hex dump:\n52 6F 73 65 20 63 6F 74 74 61 67 65 2C 20 50 6F 72 74 6C 61 6E 64\n\nDecoding this reveals part of Emma's private correspondence:\n\nThe decoded text names a solicitor and references "the secondary account — £4.2 million — to be transferred upon confirmation of Dr. Cole's death."\n\nEmma stood to receive £4.2 million only after Adrian died.`,
    clueText: 'An encrypted file on the admin panel. The decryption method is described on a nearby printout.',
    puzzle: 'hex_decode',
    symbol: false
  },
  detective_board_item: {
    id: 'detective_board_item',
    name: "Detective's Deduction Board",
    icon: '📋',
    hint: 'Place all evidence correctly against suspects. Then accuse.',
    inspectText: `The final stage of your investigation.\n\nYou have gathered evidence across the entire manor.\nNow you must reason through it systematically.\n\nThe deduction board requires you to correctly assign each piece of evidence to the suspect it implicates, explains, or eliminates.\n\nEvery card must be placed correctly before you can make your final accusation.\n\nThere are no second chances once you accuse.\n\nThink carefully. Some evidence was planted. Some alibis are fabricated. Some suspects are red herrings.`,
    clueText: 'Final stage: assign all evidence to suspects. All placements must be correct. Then accuse.',
    puzzle: 'detective_board',
    symbol: false
  },
  security_hint_terminal: {
    id: 'security_hint_terminal',
    name: 'Hint Terminal — Security',
    icon: '💡',
    hint: 'Combine all four previous hint answers. Only the combined code unlocks this.',
    inspectText: `This terminal is different. Its screen reads:\n\n"MASTER HINT CHALLENGE\n\nThis terminal requires a combined code derived from all four previous hint terminals.\n\nYou must have already solved:\n- Study: Caesar cipher answer\n- Kitchen: Logic grid answer\n- Bedroom: Magic square answer\n- Basement: Binary decode answer\n\nThen enter the combined code in the format:\nS-K-B-BA (Study initial · Kitchen initial · Bedroom initial · Basement answer)\n\nThe combined code encodes a final crucial insight:\nThe precise mechanism Emma used to fabricate her alibi."`,
    clueText: 'Final hint: requires answers from all 4 previous terminals. Combined answer unlocks the complete solution.',
    puzzle: 'hint_security_combined',
    isHint: true,
    symbol: true
  }
};

// ── EVIDENCE DATA ───────────────────────────────────────────

const EVIDENCE_DATA = {
  ev_diary_code: {
    id: 'ev_diary_code',
    name: "Desk Lock Combination",
    icon: '🔢',
    desc: 'Three-digit code: 6-7-3. Derived from clock cipher (digit 1) and diary fragments (digits 2–3).',
    significance: 'Opens the locked desk in the study. Contents unknown until opened.'
  },
  ev_photo_sarah: {
    id: 'ev_photo_sarah',
    name: "Photograph: Sarah & Adrian",
    icon: '🖼',
    desc: 'Torn photo reassembled — shows Sarah and Adrian at a private meeting, Sept 22. Adrian holds an "Estate — Final Revision" folder.',
    significance: 'Red herring #1. Suggests Sarah was involved in will changes, but she was acting as trustee at Adrian\'s request.'
  },
  ev_recipe_discrepancy: {
    id: 'ev_recipe_discrepancy',
    name: "Recipe Book Discrepancy",
    icon: '📖',
    desc: 'Aconitine note in recipe book dated "Dec 8" — but murder was Nov 15. Handwriting does not match Emma\'s.',
    significance: 'The note was planted by Emma to make the recipe book appear as if she had been researching the poison — but the date is wrong, revealing it\'s a fabrication.'
  },
  ev_fingerprints: {
    id: 'ev_fingerprints',
    name: "Fingerprint Analysis: Planted",
    icon: '👆',
    desc: 'Emma\'s prints on bottle base are inside a glove outline — deliberately transferred. Noah\'s prints on bottle neck are incidental (works in kitchen).',
    significance: 'Emma planted her own prints to create false evidence, OR someone planted them to frame Emma. Either way, the glove outline is key.'
  },
  ev_servants_log: {
    id: 'ev_servants_log',
    name: "Movement Log: 65-Min Gap",
    icon: '📋',
    desc: 'Emma left at 18:00, gallery closed 21:30, returned at 22:47. 65 unaccounted minutes. Gallery is 12 min from manor.',
    significance: 'Emma had time to return to the manor between gallery close and her logged return. This gap is the window for murder.'
  },
  ev_audio_message: {
    id: 'ev_audio_message',
    name: "Voice Recording: Adrian's Message",
    icon: '🎙',
    desc: '"If anything happens to me before the safe — Noah knows where the backup files are. Do not trust anyone who was here on the fourth, two thousand and—"',
    significance: 'Red herring #3. "Noah knows" makes everyone suspect Noah. But Adrian meant Noah knows where FILES are — Noah is a witness, not a killer.'
  },
  ev_safe_contents: {
    id: 'ev_safe_contents',
    name: "Safe Contents: Emma's Account",
    icon: '🔐',
    desc: 'Hidden safe contained documents: Emma\'s secondary account, policy payout £4.2M — activated upon Adrian\'s death. Signed Oct 30.',
    significance: 'Direct financial motive. Emma stood to gain £4.2M immediately. Adrian had been planning to contest this — hence the new will.'
  },
  ev_uv_mirror: {
    id: 'ev_uv_mirror',
    name: "UV Mirror: Hidden Message",
    icon: '🪞',
    desc: 'UV mirror sequence revealed text: "THE DECANTER — NOT THE BOTTLE — C7". The decanter in the study, cabinet 7.',
    significance: 'Adrian left a message pointing to the actual murder weapon. The poison bottle was a red herring. The decanter is where the aconitine was actually administered.'
  },
  ev_cctv_timeline: {
    id: 'ev_cctv_timeline',
    name: "CCTV: Lucas Eliminated",
    icon: '📹',
    desc: 'CCTV clips chronologically ordered: Lucas exits front gate at 19:34. No clip places him indoors after this. Gate auto-locked at 19:40.',
    significance: 'Lucas is eliminated. He physically could not re-enter without triggering a new gate log. He was not in the manor at time of death.'
  },
  ev_timeline_board: {
    id: 'ev_timeline_board',
    name: "Timeline Board: Emma's Re-Entry",
    icon: '📊',
    desc: 'Complete timeline: Emma used staff gate (personal code) at 23:00 on Nov 15. Adrian died at 23:04. Emma logged official return at 22:47.',
    significance: 'The single most damning piece of evidence. Emma returned twice: once officially at 22:47 (false log), and once via staff gate at 23:00 (real entry).'
  },
  ev_access_logs: {
    id: 'ev_access_logs',
    name: "Security Logs: EC-ADMIN",
    icon: '📑',
    desc: 'EC-ADMIN (Emma Cole) modified CCTV Clip 6 on Nov 14 at 02:11, changing timestamp from 23:00 to 21:00. Used admin override at 22:58 on Nov 15.',
    significance: 'Emma altered the evidence before the body was discovered. This proves premeditation and knowledge of the CCTV system.'
  },
  ev_hex_file: {
    id: 'ev_hex_file',
    name: "Decoded File: Financial Motive",
    icon: '🔧',
    desc: 'Encrypted file decoded: references £4.2M secondary account, payable on confirmation of Adrian\'s death. Links to solicitor Marsh & Dunne.',
    significance: 'Confirms motive: Emma was the financial beneficiary. Combined with access logs and timeline, this creates an irrefutable case.'
  }
,

  ascii_reference_card: {
    id: 'ascii_reference_card',
    name: 'Printed Document',
    icon: '📄',
    hint: 'A document left face-down on the desk.',
    inspectText: `A single printed sheet, face-down on the security desk. No header. No title. No explanation.

 65  A    66  B    67  C    68  D    69  E
 70  F    71  G    72  H    73  I    74  J
 75  K    76  L    77  M    78  N    79  O
 80  P    81  Q    82  R    83  S    84  T
 85  U    86  V    87  W    88  X    89  Y
 90  Z

Nothing else.`,
    clueText: 'A printed document. Numbers and letters. No context.'
  },


  // SCATTERED CLUE ITEMS — for binary decode puzzle
  burnt_notebook: {
    id: 'burnt_notebook',
    name: 'Burnt Notebook',
    icon: '📓',
    hint: 'The fire took most of it.',
    inspectText: `A small notebook, scorched at the edges. The cover is gone. Most pages are reduced to ash.

What remains of the last legible page reads:

"The old computer never understood words.

Everything had to be reduced to
eight decisions.

Either...
accepted...
or rejected."

The bottom half has burned away.`,
    clueText: 'A burnt notebook. One fragment of a page survived.'
  },

  maintenance_whiteboard: {
    id: 'maintenance_whiteboard',
    name: 'Maintenance Whiteboard',
    icon: '📋',
    hint: 'A status board from before the lab was sealed.',
    inspectText: `A small whiteboard mounted near the electrical panel, still readable.

POWER CHECK

  □  □  □  □  □  □  □  □

OFF OFF OFF OFF OFF OFF OFF OFF

  □□□□□□□□

No numbers. No labels. Nothing else.`,
    clueText: 'A whiteboard near the panel. Eight states, all off.'
  },

  toolbox_label: {
    id: 'toolbox_label',
    name: 'Toolbox',
    icon: '🧰',
    hint: 'A heavy metal toolbox. The lid has been forced open.',
    inspectText: `A heavy metal toolbox. The lock is broken. The lid has been forced open at some point.

Taped to the inside of the lid, a small paper label — partially torn:

  ─────────────────
   BIT ORDER
  ─────────────────
   128
   64
   ░░░░░░
   16
   ░░░░░░
   4
   2
   1
  ─────────────────

Two rows have been partially torn away.`,
    clueText: 'A label inside a toolbox. Something about order.'
  },

  roman_numeral_note: {
    id: 'roman_numeral_note',
    name: 'Handwritten Note',
    icon: '📝',
    hint: 'A scrap of paper tucked behind the wall clock.',
    inspectText: `A folded scrap of paper, tucked behind the stopped wall clock.

Written in a hurried scrawl:

    01000101 = 69

    → LXIX

No signature. No context. Nothing else.`,
    clueText: 'A note behind the clock. A number rendered two ways.'
  },

  detective_board: {
    id: 'detective_board',
    title: "Detective's Deduction Board",
    type: 'detective_board',
    suspects: [
      { id: 'emma', name: 'Emma Cole', icon: '👩', role: 'Wife' },
      { id: 'lucas', name: 'Lucas', icon: '👨‍💼', role: 'Business Partner' },
      { id: 'noah', name: 'Noah', icon: '👤', role: 'Assistant' },
      { id: 'sarah', name: 'Sarah Cole', icon: '👩‍🦰', role: 'Sister' },
      { id: 'ruledOut', name: 'Ruled Out / Explained', icon: '✗', role: 'Red herrings / Innocent evidence' }
    ],
    evidenceCards: [
      { id: 'board_photo', name: '📷 Photo: Sarah & Adrian', icon: '🖼', desc: 'Private meeting at Cole Manor — Sept 22. Estate documentation visible.', correctSuspect: 'ruledOut' },
      { id: 'board_prints', name: '👆 Fingerprints: Glove Outline', icon: '👆', desc: 'Unusual glove-pattern impression — not a bare-hand contact print.', correctSuspect: 'ruledOut' },
      { id: 'board_audio', name: '🎙 Recording: "Noah Knows"', icon: '🎙', desc: 'Exact meaning of the recording remains ambiguous.', correctSuspect: 'ruledOut' },
      { id: 'board_lucas_cctv', name: '📹 CCTV: Lucas Exits 19:31', icon: '📹', desc: 'Gate log places Lucas at the north exit — timestamp: 19:31.', correctSuspect: 'lucas' },
      { id: 'board_gap', name: '⏱ Emma: 65-Min Gap', icon: '⏱', desc: 'Gallery sign-out: 21:31. Household log: 22:47. Travel time: ~12 min.', correctSuspect: 'emma' },
      { id: 'board_gate', name: '🚪 Staff Gate: EC-ADMIN 23:00', icon: '🚪', desc: 'EC-ADMIN credentials used at staff gate — Nov 15, 23:00.', correctSuspect: 'emma' },
      { id: 'board_cctv_edit', name: '💻 CCTV Edit: Nov 14 02:11', icon: '💻', desc: 'EC-ADMIN accessed CCTV editing suite — Clip 6 modification logged.', correctSuspect: 'emma' },
      { id: 'board_insurance', name: '💰 Insurance Policy £4.2M', icon: '💰', desc: 'Policy value: £4.2M. Beneficiary: Emma Cole. Payable on Adrian\'s death.', correctSuspect: 'emma' },
      { id: 'board_recipe', name: '📖 Recipe Book: Wrong Date', icon: '📖', desc: 'Marginal note dated Dec 8 — one month after the murder. Handwriting unverified.', correctSuspect: 'ruledOut' },
      { id: 'board_sarah', name: '📝 Sarah: Trustee Role', icon: '📝', desc: 'Sarah named as trustee in estate documents by Adrian.', correctSuspect: 'ruledOut' }
    ]
  }
};
