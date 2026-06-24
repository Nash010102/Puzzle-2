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
  study_hint_terminal: {
    id: 'study_hint_terminal',
    name: 'Hint Terminal — Study',
    icon: '💡',
    hint: 'Unlock a hint — if you can solve the cipher.',
    inspectText: `A small brass terminal mounted beside the bookshelf. A folded card in the slot reads:\n\n"Intelligence is not freely given.\nSolve the cipher below to earn your hint.\n\nThe cipher uses a Caesar substitution.\nThe shift value is concealed somewhere in this room — look carefully at your surroundings.\n\nEncrypted message:\nKDV HPPDV DOLEL XPDHV WDEOLV KHG\n\nSolve it. Enter the decoded phrase."`,
    clueText: 'A cipher challenge. Decode the encrypted message using a Caesar substitution. Find the shift value in the study.',
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
    inspectText: `A metal panel on the basement wall. Five wires — red, blue, green, yellow, white — are disconnected from five terminals, also colored.\n\nA laminated instruction sheet is pinned beside the panel:\n\n"SECURITY OFFICE POWER RESTORATION\nWire routing must follow the original configuration.\nThe configuration document is in the lab journal."\n\nYou'll need to find the correct wire-to-terminal pairing from the lab journal before you can connect them correctly.\n\nCOUTION: Incorrect connections will trigger a 60-second lockout.`,
    clueText: 'Wire panel — restore security office power. Correct pairings are in the lab journal.',
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
    name: 'Hint Terminal — Basement',
    icon: '💡',
    hint: 'Decode binary strings. Each byte is one letter.',
    inspectText: `A terminal near the chemical storage area. Its screen reads:\n\n"CHALLENGE: Binary Decoder\n\nEach 8-bit binary string below represents one ASCII character.\nDecode all five strings to reveal a hidden word.\nThat word answers a critical question about who accessed the CCTV system.\n\n01000101\n01001101\n01001101\n01000001\n\nEnter the decoded word to unlock the hint."`,
    clueText: 'Binary decoding: 4 bytes → one name. Standard ASCII.',
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
    hint: 'The admin code will unlock the shadow log. You found the code in the lab journal.',
    inspectText: `The master override terminal. A blinking cursor awaits input.\n\nA laminated card beside the keyboard reads:\n"ADMIN AUTHENTICATION REQUIRED\nFour-digit admin code required to access shadow logs.\nWarning: Three failed attempts will initiate lockdown."\n\nYou know the code. It's in the lab journal.\n\n Enter it carefully.`,
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
};

// ── PUZZLE DEFINITIONS ──────────────────────────────────────

const PUZZLES = {

  // STUDY
  diary_cipher: {
    id: 'diary_cipher',
    title: 'Diary Cipher',
    type: 'code_entry',
    digits: 3,
    prompt: 'The diary\'s inside cover holds a smeared 3-digit code fragment.\nTwo digits are partially legible. The first is obscured entirely.\nLook elsewhere in the study for what you are missing.\n\nWhen you have all three digits, enter the complete code:',
    answer: '673',
    reward: 'ev_diary_code',
    rewardText: 'The combination is confirmed: 6-7-3.\n\nBut you do not yet have the full desk lock puzzle solved — this just confirms the code. The desk puzzle will ask you to enter it.'
  },

  photo_reconstruct: {
    id: 'photo_reconstruct',
    title: 'Reconstruct the Photograph',
    type: 'ordering',
    prompt: 'The photograph is torn into 6 pieces. Arrange the pieces in the correct order (top-left to bottom-right, reading order) based on these descriptions:',
    items: [
      { id: 'p1', label: 'Piece A', content: 'Upper-left: A fireplace mantle, partially visible. Emma\'s shoulder and the edge of her formal dress.' },
      { id: 'p2', label: 'Piece B', content: 'Upper-center: Adrian\'s face, half-smiling. His eyes directed to the right of frame.' },
      { id: 'p3', label: 'Piece C', content: 'Upper-right: Sarah\'s face, returning Adrian\'s gaze. Her expression — not quite a smile. A secret.' },
      { id: 'p4', label: 'Piece D', content: 'Lower-left: The folder in Adrian\'s hand. Label visible: "ESTATE — FINAL REVISION".' },
      { id: 'p5', label: 'Piece E', content: 'Lower-center: The table between them. A document, partially signed.' },
      { id: 'p6', label: 'Piece F', content: 'Lower-right: Photographer\'s stamp and date: "Sept 22, Cole Manor, Private Commission".' }
    ],
    correctOrder: ['p1','p2','p3','p4','p5','p6'],
    reward: 'ev_photo_sarah',
    rewardText: 'Photograph reassembled.\n\nThe image is now clear: this was a private meeting between Adrian and Sarah, with Emma present but peripheral — not participating in the exchange of glances.\n\nSarah was being brought into Adrian\'s confidence about the estate revision. She was acting as trustee — not a conspirator.\n\n▶ Red Herring #1 identified.'
  },

  desk_lock: {
    id: 'desk_lock',
    title: "Adrian's Locked Desk",
    type: 'code_entry',
    digits: 3,
    prompt: 'A three-dial combination lock. Each dial runs 0–9.\n\nThe answer is scattered across this room. You will need to have examined the right objects.\n\nEnter the combination:',
    answer: '673',
    reward: ['ev_safe_contents'],
    inventoryReward: null,
    rewardText: 'The desk drawer slides open.\n\nInside: a single document — a copy of the revised will, dated October 30.\n\nThe will assigns Emma\'s "lifetime maintenance" at £40,000 per year.\nThe bulk of the estate — £4.2 million — goes to a charitable trust.\n\nBut stapled behind it: an insurance policy document.\n\nThe beneficiary: Emma Cole.\nThe payout condition: "Upon confirmed death of Dr. Adrian Cole by any cause."\nPayout amount: £4,200,000.\n\nAdrian changed the will. But he didn\'t know about the insurance policy Emma had taken out in his name.'
  },

  // KITCHEN
  recipe_decode: {
    id: 'recipe_decode',
    title: 'Recipe Book Analysis',
    type: 'multi_select',
    prompt: 'Identify ALL anomalies in the recipe book aconitine entry. Select every option that represents a genuine discrepancy or piece of planted evidence.',
    items: [
      { id: 'r1', content: 'The note is dated "Dec 8" but the murder occurred Nov 15.', correct: true },
      { id: 'r2', content: 'The handwriting does not match Emma\'s other entries in the book.', correct: true },
      { id: 'r3', content: 'The recipe book itself was found in a locked cabinet.', correct: false },
      { id: 'r4', content: 'The aconitine note uses clinical terminology not typical of household recipe notes.', correct: true },
      { id: 'r5', content: 'The note mentions "used" — past tense — as if it had already been administered by Dec 8.', correct: true },
      { id: 'r6', content: 'The recipe book was open to this page when discovered.', correct: false },
      { id: 'r7', content: 'Aconitine from monkshood is described as undetectable in wine — suggesting premeditation.', correct: true }
    ],
    reward: 'ev_recipe_discrepancy',
    rewardText: 'All anomalies identified.\n\nConclusion: The recipe book entry was planted. The date is wrong. The handwriting is wrong. The book was deliberately opened to this page to frame Emma — or Emma planted it herself to create a false paper trail.\n\nEither way: the recipe book is not reliable evidence against Emma.'
  },

  fingerprint_match: {
    id: 'fingerprint_match',
    title: 'Fingerprint Analysis',
    type: 'wire',
    prompt: 'Match each fingerprint found on the poison bottle to its owner. Connect wire from fingerprint to suspect.\n\nNote the glove outline on the base print.',
    wires: [
      { id: 'neck_print', label: 'Loop pattern (neck)', color: 'wire-blue', side: 'left' },
      { id: 'base_print', label: 'Whorl in glove (base)', color: 'wire-red', side: 'left' }
    ],
    terminals: [
      { id: 'noah_t', label: 'Noah (assistant)', color: 'terminal', side: 'right' },
      { id: 'emma_t', label: 'Emma (planted)', color: 'terminal', side: 'right' },
      { id: 'sarah_t', label: 'Sarah (sister)', color: 'terminal', side: 'right' },
      { id: 'lucas_t', label: 'Lucas (partner)', color: 'terminal', side: 'right' }
    ],
    correctConnections: {
      'neck_print': 'noah_t',
      'base_print': 'emma_t'
    },
    reward: 'ev_fingerprints',
    rewardText: 'Fingerprint analysis complete.\n\nNeck print: Noah\'s loop pattern — incidental contact. Noah worked in the kitchen daily.\n\nBase print: Emma\'s whorl — BUT inside a glove outline. This means her print was transferred deliberately using a glove.\n\nThis is critical: if Emma had naturally touched the bottle, the print would be direct. The glove outline means someone transferred her print intentionally — either Emma herself or someone framing Emma.\n\nThe print is not evidence of guilt. It is evidence of fabrication.'
  },

  timeline_analysis: {
    id: 'timeline_analysis',
    title: "Servants' Log Timeline Analysis",
    type: 'multi_select',
    prompt: 'The servants\' log contains several critical timeline discrepancies. Select ALL entries that expose an impossible or suspicious timeline element.',
    items: [
      { id: 't1', content: '[18:00] Emma departs for gallery — car service logged and confirmed.', correct: false },
      { id: 't2', content: '[19:30] Lucas departs via front gate — logged by gate camera (this eliminates Lucas).', correct: true },
      { id: 't3', content: '[21:30] Gallery closed — but Emma\'s official return is 22:47. Distance = 12 minutes. 65-min gap.', correct: true },
      { id: 't4', content: '[22:47] Emma\'s logged official return — but shadow log shows staff gate opened at 23:00.', correct: true },
      { id: 't5', content: '[21:00] Sarah departs unannounced — no log, estimated by staff. Possibly earlier.', correct: false },
      { id: 't6', content: '[23:00] Staff gate override via EC-ADMIN code. This is Emma\'s personal access code.', correct: true },
      { id: 't7', content: '[22:00] Adrian found unresponsive — housekeeper testimony. This is earlier than official police report states.', correct: true }
    ],
    reward: 'ev_servants_log',
    rewardText: 'Timeline analysis complete.\n\nKey findings:\n1. Lucas left at 19:30 — confirmed by gate camera. Eliminated.\n2. Emma has a 65-minute unaccounted gap after gallery close.\n3. Official return log (22:47) conflicts with shadow log (23:00 via staff gate).\n4. Emma\'s personal code used for staff gate override.\n5. Housekeeper\'s testimony places discovery at 22:00 — 47 minutes before Emma\'s official return.\n\nConclusion: Emma\'s official return time is fabricated. She returned via staff gate at 23:00 — after the murder window.'
  },

  // BEDROOM
  audio_reconstruct: {
    id: 'audio_reconstruct',
    title: 'Audio Reconstruction',
    type: 'ordering',
    prompt: 'Arrange the 6 audio fragments in correct chronological order based on context. The message must be coherent when complete.',
    items: [
      { id: 'a1', label: 'Fragment B', content: '"If anything happens to me before the—"' },
      { id: 'a2', label: 'Fragment A', content: '"...I\'ve hidden the proof in the—"' },
      { id: 'a3', label: 'Fragment C', content: '"—safe in the bedroom. Combination is the year of—"' },
      { id: 'a4', label: 'Fragment D', content: '"—fourth, two thousand and—"' },
      { id: 'a5', label: 'Fragment E', content: '"Noah knows where the backup files are. Do not—"' },
      { id: 'a6', label: 'Fragment F', content: '"—trust anyone who was here on the—"' }
    ],
    correctOrder: ['a1','a2','a3','a4','a5','a6'],
    reward: 'ev_audio_message',
    rewardText: 'Audio reconstructed. Full message:\n\n"If anything happens to me before the — I\'ve hidden the proof in the — safe in the bedroom. Combination is the year of — the fourth, two thousand and — Noah knows where the backup files are. Do not — trust anyone who was here on the —"\n\nThe safe combination is "the year of the fourth" = the year 2004.\nBut note: "Noah knows" does NOT mean Noah is the killer — Adrian means Noah knows where the backup FILES are. Noah is a witness, not a suspect.\n\n▶ Safe combination: 2004\n▶ Red Herring #3 identified: Noah is not the killer.'
  },

  safe_unlock: {
    id: 'safe_unlock',
    title: 'Hidden Safe Combination',
    type: 'code_entry',
    digits: 4,
    prompt: 'The safe requires a 4-digit year code.\nFrom the assembled voice recording:\n"Combination is the year of the fourth, two thousand and..."\n\nThe audio was cut. Adrian left more information somewhere in this manor.\nSearch carefully. The year is specific — and must be calculated, not guessed.\n\nEnter the year:',
    answer: '2004',
    reward: null,
    inventoryReward: 'basement_key',
    rewardText: 'Safe opened.\n\nInside the safe:\n— Insurance policy: Emma Cole as sole beneficiary, £4.2M on Adrian\'s death (confirmed)\n— A printed email chain between Emma and solicitor Marsh & Dunne, discussing "the arrangement" — dated Sept 3\n— A single key with a label: "Basement Laboratory"\n\nYou now have access to the Basement Laboratory.\n\n▶ Basement Key obtained.'
  },

  uv_mirror_sequence: {
    id: 'uv_mirror_sequence',
    title: 'UV Mirror Sequence',
    type: 'click_sequence',
    prompt: 'Nine marks appear on the mirror in UV light, arranged in a 3×3 grid.\n\nA note says: "The order is the order you cannot reverse."\n\nThis refers to a classic sequence. Touch the marks in this order:\n⬛⬛⬛\n⬛⬛⬛\n⬛⬛⬛\n(numbered 1–9, positions:\nTop row: 1,2,3 | Middle: 4,5,6 | Bottom: 7,8,9)\n\nThe sequence is: the spiral — start outer, move in.',
    cells: [
      { id: 'c1', pos: 0, icon: '◆', label: '1' },
      { id: 'c2', pos: 1, icon: '◆', label: '2' },
      { id: 'c3', pos: 2, icon: '◆', label: '3' },
      { id: 'c4', pos: 3, icon: '◆', label: '4' },
      { id: 'c5', pos: 4, icon: '◆', label: '5' },
      { id: 'c6', pos: 5, icon: '◆', label: '6' },
      { id: 'c7', pos: 6, icon: '◆', label: '7' },
      { id: 'c8', pos: 7, icon: '◆', label: '8' },
      { id: 'c9', pos: 8, icon: '◆', label: '9' }
    ],
    correctSequence: [0, 1, 2, 5, 8, 7, 6, 3, 4],
    reward: 'ev_uv_mirror',
    rewardText: 'Mirror sequence complete.\n\nAs each mark is activated in order, text appears burned into the mirror\'s surface — written in UV ink over many layers:\n\n"THE DECANTER — NOT THE BOTTLE — C7"\n\nC7 refers to Cabinet 7 in the study.\n\nAdrian left this message knowing someone would plant false evidence.\nThe decanter in Cabinet 7 is where the aconitine was actually administered — not the bottle on the kitchen counter.\n\nThe kitchen poison bottle was a deliberate plant.'
  },

  // BASEMENT
  cctv_ordering: {
    id: 'cctv_ordering',
    title: 'CCTV Clip Ordering',
    type: 'ordering',
    prompt: 'Arrange these 7 CCTV clips in correct chronological order based on contextual clues (lighting, clock positions, vase status, clothing).',
    items: [
      { id: 'v1', label: 'Clip D', content: 'Bright afternoon light. Study window. Emma visible, speaking with someone. Vase intact on table.' },
      { id: 'v2', label: 'Clip A', content: 'Dusk light. Hallway clock shows 18:02. Emma with luggage, departing. Vase still intact.' },
      { id: 'v3', label: 'Clip F', content: 'Dark outside. Hallway clock shows 19:31. Lucas at front door, departing. Coat on. Vase intact.' },
      { id: 'v4', label: 'Clip B', content: 'Night. Unknown figure (Sarah) entering through side door, 20:00 est. Vase intact.' },
      { id: 'v5', label: 'Clip E', content: 'Night. Kitchen area. Noah signing out. Coat on. Vase no longer visible in frame.' },
      { id: 'v6', label: 'Clip C', content: 'Night. Hallway. Vase knocked over on floor. No figure visible.' },
      { id: 'v7', label: 'Clip G', content: 'Night. Exterior gate. Figure entering (overcoat, matches Emma\'s gallery footage). Timestamp reads 21:00 — but lens flare pattern indicates night (post-22:00).' }
    ],
    correctOrder: ['v1','v2','v3','v4','v5','v6','v7'],
    reward: 'ev_cctv_timeline',
    rewardText: 'CCTV clips ordered correctly.\n\nKey finding: Clip G timestamp reads "21:00" but the lens flare pattern on this specific camera only occurs after 22:00. The timestamp was falsified.\n\nClip F conclusively shows Lucas departing at 19:31 via the front gate. No subsequent clip shows any gate entry for Lucas. The gate auto-locked.\n\n▶ LUCAS ELIMINATED. He could not physically have committed the murder.\n\nClip G shows Emma re-entering — at approximately 23:00, not 21:00 as the falsified timestamp claims.'
  },

  timeline_ordering: {
    id: 'timeline_ordering',
    title: 'Evidence Timeline Board',
    type: 'ordering',
    prompt: 'Arrange these 8 events in precise chronological order to expose the complete murder timeline.',
    items: [
      { id: 'e1', label: 'Event', content: 'Emma takes out £4.2M insurance policy on Adrian (Sept 3).' },
      { id: 'e2', label: 'Event', content: 'Adrian revises will — most estate to charity, reduces Emma\'s inheritance (Oct 30).' },
      { id: 'e3', label: 'Event', content: 'Emma departs Cole Manor for Harrington Gallery (Nov 15, 18:00).' },
      { id: 'e4', label: 'Event', content: 'Gallery closes. Emma officially signed out (Nov 15, 21:31).' },
      { id: 'e5', label: 'Event', content: 'Emma re-enters manor via staff gate using personal code EC-ADMIN (Nov 15, 23:00).' },
      { id: 'e6', label: 'Event', content: 'Adrian Cole found unresponsive in the study (Nov 15, 23:04 approx).' },
      { id: 'e7', label: 'Event', content: 'Emma modifies CCTV Clip 6 timestamp from 23:00 to 21:00 (Nov 16, 02:11).' },
      { id: 'e8', label: 'Event', content: 'Police arrive. Emma presents fabricated car service log showing return at 22:47 (Nov 16, 08:30).' }
    ],
    correctOrder: ['e1','e2','e3','e4','e5','e6','e7','e8'],
    reward: 'ev_timeline_board',
    rewardText: 'Complete timeline constructed.\n\nThe sequence is now irrefutable:\n1. Emma took out the insurance policy (Sept 3) — before the will was changed.\n2. Adrian changed the will (Oct 30) — Emma now gains only via insurance, not inheritance.\n3. Emma attended the gallery as alibi (18:00–21:31).\n4. 65-minute gap — she returned to the manor.\n5. Staff gate entry at 23:00 via her own code — confirmed by shadow log.\n6. Adrian died at approximately 23:04.\n7. Emma falsified CCTV on Nov 16 at 02:11.\n8. Presented fabricated alibi to police.\n\n▶ The case against Emma Cole is complete.'
  },

  wire_connect: {
    id: 'wire_connect',
    title: 'Security Wire Panel',
    type: 'wire',
    prompt: 'Five disconnected wires. Five numbered terminals. The correct configuration is documented somewhere in this basement.\n\nYou will need to have read Adrian\'s notes before you can complete this.\n\nConnect each colored wire to its correct terminal:',
    wires: [
      { id: 'w_red', label: 'Red Wire', color: 'wire-red', side: 'left' },
      { id: 'w_blue', label: 'Blue Wire', color: 'wire-blue', side: 'left' },
      { id: 'w_green', label: 'Green Wire', color: 'wire-green', side: 'left' },
      { id: 'w_yellow', label: 'Yellow Wire', color: 'wire-yellow', side: 'left' },
      { id: 'w_white', label: 'White Wire', color: 'wire-white', side: 'left' }
    ],
    terminals: [
      { id: 't1', label: 'Terminal 1', color: 'terminal', side: 'right' },
      { id: 't2', label: 'Terminal 2', color: 'terminal', side: 'right' },
      { id: 't3', label: 'Terminal 3', color: 'terminal', side: 'right' },
      { id: 't4', label: 'Terminal 4', color: 'terminal', side: 'right' },
      { id: 't5', label: 'Terminal 5', color: 'terminal', side: 'right' }
    ],
    correctConnections: {
      'w_red': 't3',
      'w_blue': 't1',
      'w_green': 't5',
      'w_yellow': 't2',
      'w_white': 't4'
    },
    inventoryReward: 'security_keycard',
    reward: null,
    rewardText: 'Wire panel correctly connected.\n\nSecurity office power restored.\n\nA keycard has been released from the lockbox beside the panel:\n"SECURITY OFFICE — AUTHORIZED ACCESS ONLY"\n\n▶ Security Keycard obtained.\nYou can now access the Security Office.'
  },

  // SECURITY OFFICE
  admin_terminal: {
    id: 'admin_terminal',
    title: 'Security Override Terminal',
    type: 'code_entry',
    digits: 4,
    prompt: 'The override terminal requires the 4-digit admin authentication code.\n\nAdrian changed the code shortly before his death. He documented it — somewhere.\n\nFind the code. Enter it here:',
    answer: '7734',
    reward: 'ev_access_logs',
    rewardText: 'Admin authentication successful.\n\nShadow log access granted.\n\nThe shadow log shows what the official log was altered to hide:\n\n[Nov 14, 02:11] — CCTV Clip 6 timestamp modified by EC-ADMIN (Emma Cole)\n[Nov 15, 22:58] — Security override initiated: EC-ADMIN\n[Nov 15, 23:00] — Staff gate opened: EC-ADMIN override\n[Nov 15, 23:04] — Motion sensor triggered: Study\n[Nov 15, 23:09] — Motion sensor cleared: Study\n\nThis is the unaltered record. Emma used her own admin access to alter the evidence and re-enter the manor.'
  },

  cctv_comparison: {
    id: 'cctv_comparison',
    title: 'CCTV Shadow Log Comparison',
    type: 'multi_select',
    prompt: 'Compare the official log against the shadow log. Select ALL discrepancies that prove tampering.',
    items: [
      { id: 'cc1', content: 'Clip 6 official timestamp: 21:00. Shadow log timestamp: 23:00. 2-hour discrepancy.', correct: true },
      { id: 'cc2', content: 'Clip 6 shows a figure matching Emma entering via exterior gate. Official log claims this was at 21:00 (but Emma was at gallery until 21:31).', correct: true },
      { id: 'cc3', content: 'Lens flare pattern on Clip 6 camera is consistent with post-22:00 lighting, contradicting the 21:00 timestamp.', correct: true },
      { id: 'cc4', content: 'The motion sensor log (Study) at 23:04–23:09 does not appear in the official printout — only in the shadow log.', correct: true },
      { id: 'cc5', content: 'Emma\'s car service receipt confirms arrival at 22:46.', correct: false },
      { id: 'cc6', content: 'EC-ADMIN login at 02:11 on Nov 14 corresponds exactly to the timestamp modification window.', correct: true }
    ],
    reward: 'ev_cctv_timeline',
    rewardText: 'All CCTV discrepancies identified.\n\nThe official log has been surgically altered in 5 places. The shadow log, which cannot be modified without physical hardware access Adrian restricted, shows the truth.\n\nEmma Cole:\n— Altered CCTV on Nov 14 (premeditated evidence destruction)\n— Re-entered manor at 23:00 on Nov 15\n— Was in the Study from 23:04–23:09 (motion sensor confirmed)\n— Adrian died during this window\n\nThe case is complete.'
  },

  hex_decode: {
    id: 'hex_decode',
    title: 'Encrypted File — Hex Decode',
    type: 'code_entry',
    digits: 0,
    isText: true,
    prompt: 'An encrypted file on the admin panel.\nHex dump excerpt: 52 6F 73 65\n\nDecrypt using XOR key 0x41 (65 in decimal):\n52 XOR 41 = 13 → not readable...\n\nWait — the instruction says XOR, but the label says "EC-WILL-FINAL.enc".\nThe encoding is simpler: it\'s not XOR, it\'s direct ASCII hex.\n\n52=R, 6F=o, 73=s, 65=e → "Rose"\n\nThe full hex when fully decoded spells a location.\nDecode the next 4 bytes: 20 63 6F 74 → " cot"\nThen: 74 61 67 65 → "tage"\n\nThe full decoded phrase is a place name.\nEnter it:',
    answer: 'Rose cottage',
    answerVariants: ['rose cottage', 'rosecottage', 'Rose Cottage'],
    reward: 'ev_hex_file',
    rewardText: '"Rose Cottage" — a property in Portland.\n\nFurther analysis of the encrypted file reveals it is a correspondence between Emma and solicitor Marsh & Dunne.\n\nKey excerpt decoded:\n"Rose Cottage, Portland — secondary account, £4.2M, payable upon confirmation of Dr. Adrian Cole\'s death. Arrangement confirmed Sept 3. Transfer instructions attached."\n\nEmma had arranged a £4.2M payout in advance. This is the financial motive — confirmed, documented, irrefutable.\n\n▶ Financial motive evidence collected.'
  },

  // ── HINT PUZZLES ──────────────────────────────────────────

  hint_study_cipher: {
    id: 'hint_study_cipher',
    title: 'Study Hint Challenge: Caesar Cipher',
    type: 'cipher',
    isHintPuzzle: true,
    prompt: 'The terminal instructs:\n"The shift value is the square root of the number of books on the shelf."\n\nBut a faded sticker at the bottom reads:\n"Always subtract 3 from the shift value."\n\nCount carefully. Then compute. The shift value is yours to find.\n\nEncrypted message:\nKDV HPPDV DOLEL XPDHV WDEOLV KHG\n\nApply your Caesar shift. Enter the decoded phrase:',
    cipherText: 'KDV HPPDV DOLEL XPDHV WDEOLV KHG',
    answer: 'HAS EMMAS ALIBI BEEN ESTABLISHED',
    answerVariants: ['has emmas alibi been established', 'HAS EMMA\'S ALIBI BEEN ESTABLISHED', 'has emma alibi been established'],
    hintReveal: `STUDY HINT REVEALED:

Emma's alibi — the Harrington Gallery visit — is NOT fully verified.

The gallery's electronic sign-out system logged Emma at 21:31.
Her official car service log shows pickup at 22:46.
Distance from gallery to manor: approximately 12 minutes.

The 65-minute gap (21:31 to 22:46) cannot be accounted for by travel time.

More critically: the SHADOW LOG in the Security Office shows a staff gate override at 23:00 using Emma's personal admin code (EC-ADMIN) — AFTER her supposed official return at 22:47.

Emma returned to the manor TWICE on the night of the murder.
Once via official log (fabricated: 22:47).
Once via staff gate (real: 23:00).

The alibi is fabricated.`
  },

  hint_kitchen_logic: {
    id: 'hint_kitchen_logic',
    title: 'Kitchen Hint Challenge: Logic Grid',
    type: 'logic_grid',
    isHintPuzzle: true,
    prompt: 'Four suspects. Four alibi properties.\nMatch each suspect to their alibi location, departure time, transport, and alibi witness.\n\nUse the grid: click cells to toggle between ✓ (yes) and ✗ (no).',
    categories: {
      suspects: ['Emma', 'Lucas', 'Noah', 'Sarah'],
      locations: ['Gallery', 'Wine Bar', 'Signed Out', 'Side Door'],
      departures: ['18:00', '19:30', '21:00', '20:00'],
      transport: ['Car Service', 'Own Car', 'Taxi', 'On Foot'],
      witnesses: ['Car Log', 'Gate Camera', 'Staff', 'None']
    },
    solution: {
      Emma: { location: 'Gallery', departure: '18:00', transport: 'Car Service', witness: 'Car Log' },
      Lucas: { location: 'Wine Bar', departure: '19:30', transport: 'Own Car', witness: 'Gate Camera' },
      Noah: { location: 'Signed Out', departure: '21:00', transport: 'Taxi', witness: 'Staff' },
      Sarah: { location: 'Side Door', departure: '20:00', transport: 'On Foot', witness: 'None' }
    },
    clues: [
      'Emma did not use her own car or a taxi.',
      'The person who left at 19:30 was seen by the gate camera, not staff.',
      'Noah was the last suspect to leave the manor, but not via the side door.',
      'Sarah\'s departure was witnessed by no one.',
      'The person using the car service left first.',
      'Lucas went to the Wine Bar, not the gallery.',
      'The person who left on foot had no alibi witness.',
      'Noah took a taxi, not his own car.',
      'Emma left before Lucas.',
      'The side door is in the garden — only accessible on foot.'
    ],
    hintReveal: `KITCHEN HINT REVEALED:

The poison bottle is NOT the murder weapon.

The aconitine was administered via the study decanter — not the kitchen bottle.

The kitchen bottle was planted as a red herring. Evidence:
1. The bottle was found CONSPICUOUSLY on the counter, not hidden.
2. Emma's prints on the base are inside a GLOVE outline — transferred deliberately.
3. A UV message in the bedroom mirror reads: "THE DECANTER — NOT THE BOTTLE — C7"
4. C7 refers to Cabinet 7 in the study, where the decanter was kept.

The decanter was the real murder weapon. The bottle was placed to mislead investigators.

Motive for planting false evidence: To create confusion about the murder method and introduce additional suspects (anyone who handled the kitchen bottle).`
  },

  hint_bedroom_magic: {
    id: 'hint_bedroom_magic',
    title: 'Bedroom Hint Challenge: Magic Square',
    type: 'magic_square',
    isHintPuzzle: true,
    prompt: 'Place numbers 1 through 9 in the 3×3 grid.\nEvery row, column, and diagonal must sum to 15.\n\nSelect a number from the pool, then click a grid cell to place it.',
    solution: [
      [2, 7, 6],
      [9, 5, 1],
      [4, 3, 8]
    ],
    hintReveal: `BEDROOM HINT REVEALED:

The bedroom safe combination is 2004.

From the reconstructed voice message:
"Combination is the year of the fourth, two thousand and..."
And from the lab journal:
"Built the safe in the year I turned 40 — 2004."

The safe contains:
- Insurance policy: Emma Cole as beneficiary, £4.2M on Adrian's death
- Email chain between Emma and solicitor Marsh & Dunne (Sept 3)
- The Basement Laboratory key

Critical insight about the safe contents:
Emma took out the insurance policy on SEPTEMBER 3 — BEFORE Adrian changed his will on October 30.

This means Emma already had financial motive BEFORE she discovered the will change.
She was planning this before the will revision gave her an additional reason.

The insurance policy was premeditated. This was not a crime of passion.`
  },

  hint_basement_binary: {
    id: 'hint_basement_binary',
    title: 'Basement Hint Challenge: Binary Decoder',
    type: 'binary_decode',
    isHintPuzzle: true,
    prompt: 'Decode four 8-bit binary strings to ASCII characters.\nType the ASCII character each binary string represents.\nThen the four characters spell a name.',
    bytes: [
      { binary: '01000101', answer: 'E', decimal: 69 },
      { binary: '01001101', answer: 'M', decimal: 77 },
      { binary: '01001101', answer: 'M', decimal: 77 },
      { binary: '01000001', answer: 'A', decimal: 65 }
    ],
    finalAnswer: 'EMMA',
    hintReveal: `BASEMENT HINT REVEALED:

The decoded name is EMMA.

EC-ADMIN — Emma Cole's administrator account — accessed the CCTV system twice:

1. November 14, 02:04–02:17:
   CCTV Clip 6 was accessed and its timestamp was changed from 23:00 to 21:00.
   This clip shows Emma entering via the exterior gate at night.
   By changing to 21:00, she made it appear she had a plausible earlier return.

2. November 15, 22:58:
   Security override activated via EC-ADMIN.
   Staff gate opened at 23:00.
   This is the real entry timestamp — hidden in the shadow log.

The admin access was used for two purposes:
- Pre-crime: To set up a cover story (CCTV alteration)
- Crime night: To enter the manor without triggering the main gate log

Emma had detailed knowledge of the manor's security systems. She used that knowledge to plan and execute the murder, then immediately began destroying evidence.`
  },

  hint_security_combined: {
    id: 'hint_security_combined',
    title: 'Security Hint Challenge: Combined Code',
    type: 'code_entry',
    digits: 0,
    isText: true,
    isHintPuzzle: true,
    prompt: 'This terminal requires a combined code derived from your four previous hint challenges.\n\nFormat: [first letter of Study decoded phrase] + [first letter of Emma\'s alibi location from Kitchen grid] + [center number of your Magic Square] + [the name you decoded in Binary]\n\nYou must have already solved all four terminals.\nNo answers are given here. Your notes are all you have.\n\nEnter the combined code (no dashes, no spaces):',
    answer: 'HG5EMMA',
    answerVariants: ['hg5emma', 'HG5EMMA', 'H G 5 EMMA'],
    hintReveal: `MASTER HINT REVEALED — The Complete Mechanism:

Emma Cole's method, step by step:

PREPARATION (weeks before):
1. September 3: Takes out £4.2M insurance policy on Adrian — premeditated financial motive.
2. Learns the manor security system, acquires EC-ADMIN credentials.
3. November 14: Tests CCTV access. Alters Clip 6 timestamp as a rehearsal/pre-cover.

ALIBI CONSTRUCTION (murder day):
4. November 15, 18:00: Departs via car service (creates official departure record).
5. Attends Harrington Gallery — signs in, is seen, creates witnesses.
6. November 15, 21:31: Signs out of gallery (recorded electronically).

THE MURDER:
7. Does NOT take the 12-minute direct route home.
8. Returns to manor via a different route, enters via staff gate at 23:00 using EC-ADMIN override (unlogged in official system).
9. Administers the aconitine — already dissolved in the study decanter.
10. Adrian dies at approximately 23:04 (motion sensor confirms presence 23:04–23:09).
11. Exits. Returns via car service at an OFFICIALLY logged 22:47 (which she had arranged in advance with a false pickup record — the car service log was altered).

COVER-UP:
12. November 16, 02:11: Logs into CCTV system, changes Clip 6 from 23:00 → 21:00.
13. Presents false car service log to police showing 22:47 return.

The only unaltered record: the shadow log, accessible only via admin terminal with the code Adrian changed to 7734 the day before he died.`
  },

  // DETECTIVE BOARD
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
      { id: 'board_photo', name: '📷 Photo: Sarah & Adrian', icon: '🖼', desc: 'Secret meeting, estate folder visible', correctSuspect: 'ruledOut' },
      { id: 'board_prints', name: '👆 Fingerprints: Glove Outline', icon: '👆', desc: 'Emma\'s print planted via glove transfer', correctSuspect: 'ruledOut' },
      { id: 'board_audio', name: '🎙 Recording: "Noah Knows"', icon: '🎙', desc: 'Adrian meant Noah knows where FILES are', correctSuspect: 'ruledOut' },
      { id: 'board_lucas_cctv', name: '📹 CCTV: Lucas Exits 19:31', icon: '📹', desc: 'Gate camera confirms departure, eliminates Lucas', correctSuspect: 'lucas' },
      { id: 'board_gap', name: '⏱ Emma: 65-Min Gap', icon: '⏱', desc: 'Gallery closed 21:31, returned 22:47 — 65 min unaccounted', correctSuspect: 'emma' },
      { id: 'board_gate', name: '🚪 Staff Gate: EC-ADMIN 23:00', icon: '🚪', desc: 'Emma\'s code used on murder night — real re-entry', correctSuspect: 'emma' },
      { id: 'board_cctv_edit', name: '💻 CCTV Edit: Nov 14 02:11', icon: '💻', desc: 'EC-ADMIN modified Clip 6 timestamp deliberately', correctSuspect: 'emma' },
      { id: 'board_insurance', name: '💰 Insurance Policy £4.2M', icon: '💰', desc: 'Emma as beneficiary, payable on Adrian\'s death', correctSuspect: 'emma' },
      { id: 'board_recipe', name: '📖 Recipe Book: Wrong Date', icon: '📖', desc: 'Aconitine note dated Dec 8 — murder was Nov 15. Wrong handwriting.', correctSuspect: 'ruledOut' },
      { id: 'board_sarah', name: '📝 Sarah: Trustee Role', icon: '📝', desc: 'Sarah held assets in trust at Adrian\'s request — not conspiratorial', correctSuspect: 'ruledOut' }
    ]
  }
};
