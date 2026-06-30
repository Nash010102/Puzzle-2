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
,

  // (binary clue item)
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

  // (binary clue item)
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

  // (binary clue item)
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

  // (binary clue item)
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

  // (binary clue item)
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
  },
};

// ── PUZZLES ─────────────────────────────────────────────────

const PUZZLES = {

  // ── STUDY ────────────────────────────────────────────────

  diary_cipher: {
    id: 'diary_cipher',
    title: "Victim's Diary — Entry Sequence",
    type: 'ordering',
    prompt: "The diary entries are out of sequence.\nArrange them chronologically to reveal a hidden pattern in the opening digits of each entry.",
    items: [
      { id: 'e4', label: 'Entry A', content: '"First meeting with Marsh & Dunne. The will must be revised." — Sept 8' },
      { id: 'e3', label: 'Entry B', content: '"I\'ve hired an investigator. Just to be sure." — Sept 15' },
      { id: 'e2', label: 'Entry C', content: '"Arrangements have been made. Sarah agrees." — Oct 30' },
      { id: 'e1', label: 'Entry D', content: '"She suspects. She always suspects. But she does not know about the will." — Nov 14' }
    ],
    correctOrder: ['e4', 'e3', 'e2', 'e1'],
    reward: 'ev_diary_code',
    rewardText: 'Diary entries in order reveal a pattern: each entry\'s opening numeral matches the next lock digit. Sept 8 → 6. Sept 15 → 7. Oct 30 → 3.\n\nDesk combination: 6-7-3.'
  },

  photo_reconstruct: {
    id: 'photo_reconstruct',
    title: 'Torn Photograph — Reconstruction',
    type: 'multi_select',
    prompt: 'The photograph has been reassembled. Examine each detail carefully.\nIdentify which observations are significant evidence.',
    items: [
      { id: 'p1', content: 'Sarah and Adrian are smiling conspiratorially — not the formal expression of siblings at a portrait.', correct: true },
      { id: 'p2', content: 'Adrian is wearing his usual grey suit — consistent with staff descriptions.', correct: false },
      { id: 'p3', content: 'The folder in Adrian\'s hand is labelled: "ESTATE — FINAL REVISION".', correct: true },
      { id: 'p4', content: 'The wallpaper pattern behind them matches the study walls.', correct: false },
      { id: 'p5', content: 'Photographer\'s stamp on the back: September 22 — after the first solicitor meeting.', correct: true }
    ],
    reward: 'ev_photo_sarah',
    rewardText: 'Photograph evidence logged: private meeting Sept 22. Sarah was present at estate revision discussions — at Adrian\'s request, as named trustee.'
  },

  desk_lock: {
    id: 'desk_lock',
    title: "Adrian's Locked Desk",
    type: 'code_entry',
    prompt: 'Three-digit combination lock.\n\n"The hour I was born. The month I was married. The year means nothing."\n\nThe answer is scattered across the manor.',
    digits: 3,
    answer: '673',
    rewardText: 'The central drawer springs open.\n\nInside: a folded document — a second copy of the will, annotated by hand. And beneath it, a small brass key scratched with the letter "B".'
  },

  hint_study_cipher: {
    id: 'hint_study_cipher',
    title: 'Hint Terminal — Cipher Challenge',
    type: 'cipher',
    isHintPuzzle: true,
    prompt: 'Decode the Caesar-shifted message below.\n\nThe shift value is not given. Find it from your investigation.',
    cipherText: 'KDV HPPDV DOLEL EHHQ HVWDEOLVKHG',
    answer: 'HAS EMMAS ALIBI BEEN ESTABLISHED',
    answerVariants: [
      'has emmas alibi been established',
      "HAS EMMA'S ALIBI BEEN ESTABLISHED",
      "has emma's alibi been established"
    ],
    hintReveal: 'The question Adrian was asking himself before he died:\n\n"Has Emma\'s alibi been established?"\n\nHis own investigation suggested the answer was no.\n\nSomething in the gallery record, or the staff gate log, may clarify why.'
  },

  // ── KITCHEN ──────────────────────────────────────────────

  recipe_decode: {
    id: 'recipe_decode',
    title: "Recipe Book — Anomalous Entry",
    type: 'multi_select',
    prompt: 'Page 47 of the recipe book contains an entry that does not belong.\nIdentify all details that are genuinely suspicious.',
    items: [
      { id: 'r1', content: 'The handwriting on the poison entry does not match Emma\'s known writing samples.', correct: true },
      { id: 'r2', content: 'The entry sits between two domestic recipes — an unusual location for a clinical note.', correct: true },
      { id: 'r3', content: 'Aconitine is described with clinical accuracy — this requires specialist knowledge.', correct: false },
      { id: 'r4', content: 'The annotation "Dec 8 — used" is post-dated: the murder was Nov 15. Dec 8 had not yet occurred.', correct: true },
      { id: 'r5', content: 'The page shows evidence of later insertion — the paper stock differs from surrounding pages.', correct: true }
    ],
    reward: 'ev_recipe_discrepancy',
    rewardText: 'Recipe book evidence logged: the poison entry was planted. Wrong date, wrong handwriting, wrong paper. Someone inserted this page after the murder to create a false trail.'
  },

  fingerprint_match: {
    id: 'fingerprint_match',
    title: 'Fingerprint Analysis — Poison Bottle',
    type: 'multi_select',
    prompt: 'Review the four fingerprint cards against the bottle evidence.\nWhich conclusions are supported by the physical evidence?',
    items: [
      { id: 'f1', content: 'Bottle neck: loop pattern matches Card A (Noah). Noah works in the kitchen — incidental contact is expected.', correct: true },
      { id: 'f2', content: 'Bottle base: whorl pattern matches Card B (Emma). But the print has a distinct glove-shaped outline around it.', correct: true },
      { id: 'f3', content: 'The glove outline indicates the print was physically transferred onto the glass, not left by bare-hand contact.', correct: true },
      { id: 'f4', content: 'Lucas\'s arch-pattern prints are present but too degraded for evidential use.', correct: false },
      { id: 'f5', content: 'Sarah\'s double-loop whorl matches partial smears on the bottle label.', correct: false }
    ],
    reward: 'ev_fingerprints',
    rewardText: 'Fingerprint evidence logged: Noah\'s contact was incidental. Emma\'s print on the base was deliberately transferred — the glove outline makes this conclusive. The bottle was planted.'
  },

  timeline_analysis: {
    id: 'timeline_analysis',
    title: "Servants' Log — Timeline Reconstruction",
    type: 'ordering',
    prompt: "Arrange the key events of November 15 in the correct chronological order.",
    items: [
      { id: 't1', label: '1st', content: 'Emma departs for Harrington Gallery — car service logged.' },
      { id: 't2', label: '2nd', content: 'Lucas departs, captured by gate camera.' },
      { id: 't3', label: '3rd', content: 'Gallery closes. Emma signs out at the gallery.' },
      { id: 't4', label: '4th', content: 'Emma logs official return to the manor — car service record.' },
      { id: 't5', label: '5th', content: 'Staff gate opened via resident code EC-ADMIN.' },
      { id: 't6', label: '6th', content: 'Motion detected in the study. Adrian Cole found unresponsive.' }
    ],
    correctOrder: ['t1', 't2', 't3', 't4', 't5', 't6'],
    reward: 'ev_servants_log',
    rewardText: 'Timeline confirmed. Emma departed at 18:00, gallery closed 21:31, official return logged 22:47 — but the staff gate opened at 23:00 with her code. Two returns. One logged. One not.'
  },

  hint_kitchen_logic: {
    id: 'hint_kitchen_logic',
    title: 'Hint Terminal — Logic Grid',
    type: 'logic_grid',
    isHintPuzzle: true,
    prompt: 'Match each suspect to their alibi location, departure time, transport, and alibi witness on the night of November 15.',
    categories: {
      suspects:   ['Emma', 'Lucas', 'Noah', 'Sarah'],
      locations:  ['Gallery', 'Business Club', 'Staff Flat', 'Manor Grounds'],
      departures: ['18:00', '19:30', '21:00', 'Unknown'],
      transport:  ['Car service', 'Own vehicle', 'Taxi', 'On foot'],
      witnesses:  ['Driver log', 'Gate camera', 'Housekeeper', 'None']
    },
    clues: [
      'Emma did not travel on foot.',
      'Lucas departed after Emma but before Noah.',
      'The suspect who left on foot has no alibi witness.',
      'Sarah arrived unannounced — no departure time was ever logged.',
      'The car service driver log covers exactly one suspect.',
      "Lucas's departure was captured by the gate camera.",
      'Noah last signed out at 21:00.',
      'The taxi was used by the suspect whose departure was captured by the housekeeper.',
      'The housekeeper witnessed exactly one suspect.',
      'Sarah was on the manor grounds — not elsewhere.'
    ],
    solution: {
      Emma:  { location: 'Gallery',        departure: '18:00',   transport: 'Car service',  witness: 'Driver log' },
      Lucas: { location: 'Business Club',  departure: '19:30',   transport: 'Own vehicle',  witness: 'Gate camera' },
      Noah:  { location: 'Staff Flat',     departure: '21:00',   transport: 'Taxi',         witness: 'Housekeeper' },
      Sarah: { location: 'Manor Grounds',  departure: 'Unknown', transport: 'On foot',      witness: 'None' }
    },
    hintReveal: 'Alibi analysis confirmed: Sarah was on the manor grounds but arrived before 20:00 — more than three hours before Adrian\'s death. No evidence places her at the point of poisoning.\n\nThe aconitine was not from the recipe book. The source traces back to a private order under a different name.\n\nThe killer had planned this weeks in advance.'
  },

  // ── BEDROOM ──────────────────────────────────────────────

  audio_reconstruct: {
    id: 'audio_reconstruct',
    title: 'Voice Recorder — Fragment Assembly',
    type: 'ordering',
    prompt: "Six audio fragments. Damaged and out of sequence.\nArrange them to reconstruct Adrian's message.",
    items: [
      { id: 'a1', label: 'Fragment B', content: '"If anything happens to me before the—"' },
      { id: 'a2', label: 'Fragment A', content: '"—I\'ve hidden the proof in the—"' },
      { id: 'a3', label: 'Fragment C', content: '"—safe in the bedroom. Combination is the year of—"' },
      { id: 'a4', label: 'Fragment D', content: '"—fourth, two thousand and—"' },
      { id: 'a5', label: 'Fragment E', content: '"Noah knows where the backup files are. Do not—"' },
      { id: 'a6', label: 'Fragment F', content: '"—trust anyone who was here on the fourth."' }
    ],
    correctOrder: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'],
    reward: 'ev_audio_message',
    rewardText: 'Message reconstructed: "If anything happens to me — I\'ve hidden the proof in the safe in the bedroom. Combination is the year of the fourth, two thousand and [four]. Noah knows where the backup files are. Do not trust anyone who was here on the fourth."\n\nThe year: 2004.'
  },

  safe_unlock: {
    id: 'safe_unlock',
    title: 'Hidden Wall Safe — Combination',
    type: 'code_entry',
    prompt: 'Four-digit combination.\n\n"Combination is the year of the fourth, two thousand and..."\n\nReconstruct the voice recorder first.',
    digits: 4,
    answer: '2004',
    reward: 'ev_safe_contents',
    inventoryReward: 'basement_key',
    rewardText: 'The safe opens. Inside:\n\n— A document: Emma\'s secondary insurance policy. Beneficiary: Emma Cole. Payout: £4,200,000. Payable upon confirmed death of Dr. Adrian Cole. Signed Oct 30.\n\n— A brass key labelled "B."\n\nThe basement key is now in your possession.'
  },

  uv_mirror_sequence: {
    id: 'uv_mirror_sequence',
    title: 'UV Wardrobe Mirror — Sequence',
    type: 'click_sequence',
    prompt: 'Nine UV-reactive marks in a 3×3 grid.\n\n"The order is the order you cannot reverse."\n\nActivate them in the correct sequence.',
    cells: [
      { pos: 1, icon: '◦' },
      { pos: 2, icon: '◦' },
      { pos: 3, icon: '◦' },
      { pos: 4, icon: '◦' },
      { pos: 5, icon: '◦' },
      { pos: 6, icon: '◦' },
      { pos: 7, icon: '◦' },
      { pos: 8, icon: '◦' },
      { pos: 9, icon: '◦' }
    ],
    correctSequence: [5, 1, 9, 3, 7, 2, 8, 4, 6],
    reward: 'ev_uv_mirror',
    rewardText: 'The UV message appears in glowing text beneath the mirror surface:\n\n"THE DECANTER — NOT THE BOTTLE — C7"\n\nThe poison was not in the kitchen bottle. The study decanter — cabinet seven — was the actual delivery method. The bottle was a deliberate plant.'
  },

  hint_bedroom_magic: {
    id: 'hint_bedroom_magic',
    title: 'Hint Terminal — Magic Square',
    type: 'magic_square',
    isHintPuzzle: true,
    prompt: 'Place the numbers 1 through 9 into a 3×3 grid.\nEvery row, every column, and both diagonals must sum to exactly 15.\n\nThere is only one solution.',
    solution: [[2,7,6],[9,5,1],[4,3,8]],
    hintReveal: 'Magic square solved. The terminal displays:\n\n"BEDROOM SAFE — YEAR OF THE FILING: 2004"\n\nAdrian registered his first patent in the fourth year of the millennium. The combination is a year, not a date. Four digits. No separators.'
  },

  // ── BASEMENT ─────────────────────────────────────────────

  cctv_ordering: {
    id: 'cctv_ordering',
    title: 'CCTV Footage — Chronological Order',
    type: 'ordering',
    prompt: 'Seven CCTV clips with overwritten timestamps.\nArrange them in the correct chronological order using contextual clues.',
    items: [
      { id: 'c1', label: 'Clip A', content: 'Exterior — daylight, sun angle suggests late afternoon. Lucas\'s car visible in the drive.' },
      { id: 'c2', label: 'Clip B', content: 'Study corridor — dark. Hallway clock visible: 18:00. Emma\'s coat still on the rack.' },
      { id: 'c3', label: 'Clip C', content: 'Gate camera — Lucas exits. Dusk lighting. No interior clock visible.' },
      { id: 'c4', label: 'Clip D', content: 'Kitchen — intact vase on the table. Noah visible at the counter.' },
      { id: 'c5', label: 'Clip E', content: 'Kitchen — vase knocked over (known: ~21:30). Noah not present.' },
      { id: 'c6', label: 'Clip F', content: 'Staff gate — figure enters wearing a heavy coat. Night. Posture matches gallery footage.' },
      { id: 'c7', label: 'Clip G', content: 'Study — no motion. Adrian\'s chair visible, empty. Clock stopped.' }
    ],
    correctOrder: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'],
    reward: 'ev_cctv_timeline',
    rewardText: 'CCTV timeline established: Lucas exits at dusk (Clip C). He does not appear in any subsequent clip. The staff gate entry (Clip F) occurs at night — the overwritten timestamp of "21:00" is impossible given lighting conditions.\n\nLucas is eliminated. He could not have re-entered.'
  },

  timeline_ordering: {
    id: 'timeline_ordering',
    title: 'Evidence Timeline Board',
    type: 'ordering',
    prompt: 'Arrange all critical events in the correct chronological order.\nThe correct sequence exposes an impossible alibi.',
    items: [
      { id: 'te1', label: 'Event A', content: 'Emma signs secondary insurance policy — Oct 30.' },
      { id: 'te2', label: 'Event B', content: 'Emma departs for Harrington Gallery — Nov 15, 18:00.' },
      { id: 'te3', label: 'Event C', content: 'Gallery electronic sign-out: Emma — Nov 15, 21:31.' },
      { id: 'te4', label: 'Event D', content: "Emma's car service pick-up logged — Nov 15, 22:46." },
      { id: 'te5', label: 'Event E', content: 'Staff gate opened via EC-ADMIN — Nov 15, 23:00.' },
      { id: 'te6', label: 'Event F', content: 'Motion detected in study — Nov 15, 23:04.' },
      { id: 'te7', label: 'Event G', content: 'Motion ceases in study — Nov 15, 23:09. Adrian Cole dead.' }
    ],
    correctOrder: ['te1', 'te2', 'te3', 'te4', 'te5', 'te6', 'te7'],
    reward: 'ev_timeline_board',
    rewardText: 'Timeline confirmed. Gallery sign-out: 21:31. Car pick-up: 22:46. Logged home: 22:47.\n\nBut the staff gate opened at 23:00 — 13 minutes after she was officially logged home.\n\nShe entered twice. The second entry was never meant to be found.'
  },

  wire_connect: {
    id: 'wire_connect',
    title: 'Security Wire Panel — Power Restoration',
    type: 'wire',
    prompt: 'Connect each wire to its correct terminal to restore power to the security office.\n\nThe correct configuration was recorded by Adrian. Find his notes first.',
    wires: [
      { id: 'w_red',    label: 'Red Wire',    color: 'wire-red' },
      { id: 'w_blue',   label: 'Blue Wire',   color: 'wire-blue' },
      { id: 'w_green',  label: 'Green Wire',  color: 'wire-green' },
      { id: 'w_yellow', label: 'Yellow Wire', color: 'wire-yellow' },
      { id: 'w_white',  label: 'White Wire',  color: 'wire-white' }
    ],
    terminals: [
      { id: 't1', label: 'Terminal 1', color: 'terminal' },
      { id: 't2', label: 'Terminal 2', color: 'terminal' },
      { id: 't3', label: 'Terminal 3', color: 'terminal' },
      { id: 't4', label: 'Terminal 4', color: 'terminal' },
      { id: 't5', label: 'Terminal 5', color: 'terminal' }
    ],
    correctConnections: {
      w_red:    't3',
      w_blue:   't1',
      w_green:  't5',
      w_yellow: 't2',
      w_white:  't4'
    },
    inventoryReward: 'security_keycard',
    rewardText: 'All connections correct. Security office power restored.\n\nA keycard dispenses from the access panel slot:\n\n"SECURITY OFFICE — MASTER ACCESS"\n\nThe security office door is now unlocked.'
  },

  hint_basement_binary: {
    id: 'hint_basement_binary',
    title: 'Access Terminal — Authentication',
    type: 'binary_decode',
    isHintPuzzle: true,
    bytes: [
      { binary: '01000101' },
      { binary: '01001101' },
      { binary: '01001101' },
      { binary: '01000001' }
    ],
    finalAnswer: 'EMMA',
    hintReveal: 'EC-ADMIN credentials verified.\n\nShadow log fragment accessed:\n\n"EC-ADMIN last active: Nov 15, 23:00. Security override used. Staff gate opened. Session terminated: 23:09."\n\nThe shadow log does not lie.'
  },

  // ── SECURITY OFFICE ──────────────────────────────────────

  admin_terminal: {
    id: 'admin_terminal',
    title: 'Security Override Terminal',
    type: 'code_entry',
    prompt: 'Four-digit admin code required to access shadow logs.\n\nWarning: Three failed attempts initiates lockdown.\n\nAdrian changed this code recently. He would have recorded it.',
    digits: 4,
    answer: '7734',
    reward: 'ev_access_logs',
    rewardText: 'Shadow log access granted:\n\nNov 14, 02:11 — CCTV Clip 6 timestamp overwritten: 23:00 → 21:00. Login: EC-ADMIN.\nNov 15, 22:58 — Security override activated. Login: EC-ADMIN.\nNov 15, 23:00 — Staff gate opened. Login: EC-ADMIN.\nNov 15, 23:04 — Motion sensor: Study.\n\nEC-ADMIN is Emma Cole\'s administrator account.'
  },

  cctv_comparison: {
    id: 'cctv_comparison',
    title: 'CCTV Master System — Evidence Review',
    type: 'multi_select',
    prompt: 'Compare the official CCTV log against the shadow log.\nSelect all findings that are supported by the evidence.',
    items: [
      { id: 'cc1', content: 'Clip 6 timestamp was changed from 23:00 to 21:00 in the official log.', correct: true },
      { id: 'cc2', content: 'The shadow log confirms a staff gate entry at 23:00 — matching the original Clip 6 time.', correct: true },
      { id: 'cc3', content: 'The figure in Clip 6 cannot be identified — the footage is too degraded.', correct: false },
      { id: 'cc4', content: 'The gate camera lens flare pattern confirms the clip was taken at night — not 21:00 as the edited record claims.', correct: true },
      { id: 'cc5', content: 'Both the official log and shadow log agree on all timestamps.', correct: false }
    ],
    rewardText: 'CCTV analysis complete. The official log was deliberately falsified. EC-ADMIN overwrote Clip 6 to remove evidence of a 23:00 entry. The shadow log preserved the original.'
  },

  hex_decode: {
    id: 'hex_decode',
    title: 'Encrypted File — Hex Decode',
    type: 'code_entry',
    isText: true,
    prompt: 'Encrypted file: EC-WILL-FINAL.enc\n\nEach byte is a standard ASCII character code in hexadecimal.\nA reference document was found nearby.\n\nHex string:\n52 6F 73 65 20 63 6F 74 74 61 67 65\n\nDecode each byte. Enter the phrase:',
    answer: 'rose cottage',
    answerVariants: ['Rose cottage', 'Rose Cottage', 'ROSE COTTAGE', 'rose cottage, portland'],
    reward: 'ev_hex_file',
    rewardText: 'File decoded: "Rose cottage" — the registered address of solicitors Marsh & Dunne, Portland.\n\nThe full decoded file references a £4,200,000 secondary account payable to Emma Cole upon confirmation of Dr. Adrian Cole\'s death.\n\nMotive confirmed.'
  },

  detective_board: {
    id: 'detective_board',
    title: "Detective's Deduction Board",
    type: 'detective_board',
    suspects: [
      { id: 'emma',     name: 'Emma Cole',            icon: '👩',    role: 'Wife' },
      { id: 'lucas',    name: 'Lucas',                icon: '👨\u200d💼', role: 'Business Partner' },
      { id: 'noah',     name: 'Noah',                 icon: '👤',    role: 'Assistant' },
      { id: 'sarah',    name: 'Sarah Cole',           icon: '👩\u200d🦰', role: 'Sister' },
      { id: 'ruledOut', name: 'Ruled Out / Explained', icon: '✗',    role: 'Red herrings / Innocent evidence' }
    ],
    evidenceCards: [
      { id: 'board_photo',      name: '📷 Photo: Sarah & Adrian',      icon: '🖼', desc: 'Private meeting at Cole Manor — Sept 22. Estate documentation visible.',                 correctSuspect: 'ruledOut' },
      { id: 'board_prints',     name: '👆 Fingerprints: Glove Outline', icon: '👆', desc: 'Unusual glove-pattern impression — not a bare-hand contact print.',                   correctSuspect: 'ruledOut' },
      { id: 'board_audio',      name: '🎙 Recording: "Noah Knows"',     icon: '🎙', desc: 'Exact meaning of the recording remains ambiguous.',                                     correctSuspect: 'ruledOut' },
      { id: 'board_lucas_cctv', name: '📹 CCTV: Lucas Exits 19:31',    icon: '📹', desc: 'Gate log places Lucas at the north exit — timestamp: 19:31.',                         correctSuspect: 'lucas' },
      { id: 'board_gap',        name: '⏱ Emma: 65-Min Gap',            icon: '⏱', desc: 'Gallery sign-out: 21:31. Household log: 22:47. Travel time: ~12 min.',                 correctSuspect: 'emma' },
      { id: 'board_gate',       name: '🚪 Staff Gate: EC-ADMIN 23:00', icon: '🚪', desc: 'EC-ADMIN credentials used at staff gate — Nov 15, 23:00.',                             correctSuspect: 'emma' },
      { id: 'board_cctv_edit',  name: '💻 CCTV Edit: Nov 14 02:11',    icon: '💻', desc: 'EC-ADMIN accessed CCTV editing suite — Clip 6 modification logged.',                  correctSuspect: 'emma' },
      { id: 'board_insurance',  name: '💰 Insurance Policy £4.2M',     icon: '💰', desc: "Policy value: £4.2M. Beneficiary: Emma Cole. Payable on Adrian's death.",             correctSuspect: 'emma' },
      { id: 'board_recipe',     name: '📖 Recipe Book: Wrong Date',    icon: '📖', desc: 'Marginal note dated Dec 8 — one month after the murder. Handwriting unverified.',     correctSuspect: 'ruledOut' },
      { id: 'board_sarah',      name: '📝 Sarah: Trustee Role',        icon: '📝', desc: 'Sarah named as trustee in estate documents — at Adrian\'s explicit request.',         correctSuspect: 'ruledOut' }
    ]
  },

  hint_security_combined: {
    id: 'hint_security_combined',
    title: 'Master Hint Terminal',
    type: 'code_entry',
    isText: true,
    isHintPuzzle: true,
    prompt: 'This terminal requires the phrase you decoded at the Study hint terminal.\n\nStudy. Kitchen. Bedroom. Basement.\n\nYou should already know the answer if you have been thorough.',
    answer: 'HAS EMMAS ALIBI BEEN ESTABLISHED',
    answerVariants: [
      'has emmas alibi been established',
      "HAS EMMA'S ALIBI BEEN ESTABLISHED",
      "has emma's alibi been established"
    ],
    hintReveal: 'MASTER INTELLIGENCE CONFIRMED.\n\nThe mechanism:\n\n1. Emma left the gallery at 21:31 — confirmed by electronic sign-in system.\n2. Car service logged her pick-up at 22:46 — from a location 12 minutes from the manor.\n3. She was logged as "home" in the household register at 22:47.\n4. The staff gate opened at 23:00 — 13 minutes later — using EC-ADMIN, her personal code.\n5. Motion detected in the study: 23:04.\n6. Motion ceased: 23:09. Adrian Cole died between those two timestamps.\n\nShe logged herself home early to establish an alibi. Then returned via the staff gate.\n\nThe second entry was never meant to be discovered. The shadow log preserved it.'
  }

};
