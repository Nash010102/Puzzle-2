// ============================================================
//  MIDNIGHT AT COLE MANOR — Main Game Controller
// ============================================================

const Game = {

  state: {
    phase: 'intro',
    room: 'study',
    secondsLeft: 3600,
    timerInterval: null,
    inventory: new Set(),
    evidence: new Set(),
    puzzlesDone: new Set(),
    hintsUnlocked: new Set(),
    hintsRevealed: new Set(),
    symbols: new Set(),
    discoveryFlags: new Set(),
    currentModal: null,
    currentPuzzleId: null,
    codeEntry: '',
    orderingState: {},
    msSelections: {},
    wireState: {},
    clickProgress: [],
    logicState: {},
    magicState: null,
    binaryState: null,
    boardPlacements: {},
    accusation: null
  },

  init() {
    this.renderIntro();
  },

  renderIntro() {
    this.state.phase = 'intro';
    const app = document.getElementById('app');
    app.innerHTML = `
      <div id="screen-intro">
        <div class="intro-candles"></div>
        <div class="intro-title-wrap">
          <div class="intro-subtitle">A Murder Mystery Escape Room</div>
          <h1 class="intro-title">Midnight at<br>Cole Manor</h1>
          <div class="intro-divider"><span class="intro-divider-icon">⚔</span></div>
          <div class="intro-victim">VICTIM: Dr. Adrian Cole — Wealthy Inventor — Found Dead</div>
          <div class="intro-quote-box">
            <div class="intro-quote">
              "One of us is the killer.<br>
              Find them before midnight.<br>
              If you're wrong...<br>
              I'll come for you."
            </div>
          </div>
          <div class="intro-clock-display" id="intro-clock">60:00</div>
          <div style="font-family:var(--mono);font-size:0.75rem;color:var(--text-faint);margin-bottom:1.5rem;letter-spacing:0.1em">
            ⚠ 7/10 DIFFICULTY · NOTE-TAKING REQUIRED · RED HERRINGS AHEAD
          </div>
          <div style="font-size:0.9rem;color:var(--text-dim);max-width:480px;margin:0 auto 1.5rem;font-style:italic;line-height:1.8">
            You must identify the killer before time runs out. Explore five rooms,
            gather evidence, solve puzzles, and accuse the correct suspect.
            Wrong answers have consequences. Hints exist — but they don't come free.
          </div>
          <button class="btn-start" id="btn-start">Begin Investigation</button>
          <div style="font-size:0.78rem;color:var(--text-faint);margin-top:1rem;font-family:var(--mono)">
            Tip: Keep notes. Everything matters. Nothing is accidental.
          </div>
        </div>
      </div>`;
    document.getElementById('btn-start').addEventListener('click', () => this.startGame());
  },

  startGame() {
    this.state.phase = 'game';
    this.state.room = 'study';
    this.renderGame();
    this.startTimer();
  },

  startTimer() {
    if (this.state.timerInterval) clearInterval(this.state.timerInterval);
    this.state.timerInterval = setInterval(() => {
      this.state.secondsLeft--;
      this.updateTimer();
      if (this.state.secondsLeft <= 0) {
        clearInterval(this.state.timerInterval);
        this.triggerTimeUp();
      }
    }, 1000);
  },

  updateTimer() {
    const el = document.getElementById('timer');
    if (!el) return;
    const m = Math.floor(this.state.secondsLeft / 60);
    const s = this.state.secondsLeft % 60;
    el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    el.className = '';
    if (this.state.secondsLeft <= 600) el.className = 'warning';
    if (this.state.secondsLeft <= 180) el.className = 'danger';
  },

  triggerTimeUp() {
    this.closeModal();
    this.showEnding('timeout');
  },

  formatTime(s) {
    const m = Math.floor(s/60), sec = s%60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  },

  renderGame() {
    const app = document.getElementById('app');
    const timeLeft = this.formatTime(this.state.secondsLeft);
    app.innerHTML = `
      <div id="screen-game">
        <div id="topbar">
          <div id="timer" class="">${timeLeft}</div>
          <div class="topbar-center">
            <button class="btn-topbar" id="btn-map">🗺 Map</button>
            <button class="btn-topbar" id="btn-journal">📓 Journal</button>
          </div>
          <div id="symbols-counter">◆ 0/7</div>
        </div>
        <div id="game-layout">
          <div id="room-panel">
            <div id="room-scene"></div>
            <div id="room-content"></div>
            <div id="room-nav"></div>
          </div>
          <div id="side-panel">
            <h3>🎒 Inventory</h3>
            <div id="inventory-list"></div>
            <h3 style="display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem 0.5rem">
              📓 Evidence
              <span id="ev-count" style="font-size:0.7rem;color:var(--text-faint)">0 found</span>
            </h3>
            <div id="evidence-preview"></div>
          </div>
        </div>
      </div>`;
    document.getElementById('btn-map').addEventListener('click', () => this.showMap());
    document.getElementById('btn-journal').addEventListener('click', () => this.showJournal());
    this.renderRoom(this.state.room);
    this.updateInventoryPanel();
    this.updateEvidencePanel();
    this.updateSymbolsCounter();
  },

  renderRoom(roomId) {
    this.state.room = roomId;
    const room = ROOMS[roomId];
    if (!room) return;

    document.getElementById('room-scene').style.background = room.gradient;
    document.getElementById('room-scene').innerHTML = `
      <div class="room-art">${room.art}</div>
      <div class="room-name-display">
        <div class="room-name">${room.name}</div>
        <div class="room-desc">${room.desc}</div>
      </div>`;

    document.getElementById('room-content').innerHTML = `
      <div>
        <div class="section-label">Examine</div>
        <div class="items-grid" id="items-grid"></div>
      </div>`;

    const gridEl = document.getElementById('items-grid');
    gridEl.innerHTML = room.items.map(itemId => this.renderItemCard(itemId)).join('');
    room.items.forEach(itemId => {
      const card = document.getElementById(`item-card-${itemId}`);
      if (card) card.addEventListener('click', () => this.onItemClick(itemId));
    });

    this.renderNav(room);
  },

  renderItemCard(itemId) {
    const item = ITEMS[itemId];
    if (!item) return '';
    const solved = this.state.puzzlesDone.has(item.puzzle);
    const isHint = item.isHint;
    const hintUnlocked = this.state.hintsRevealed.has(item.puzzle);
    const hasSymbol = item.symbol && !this.state.symbols.has(itemId);

    let badge = '';
    if (solved && !isHint) badge = `<span class="item-badge">✓ Done</span>`;
    if (isHint && hintUnlocked) badge = `<span class="item-badge">✓ Revealed</span>`;
    if (isHint && !hintUnlocked) badge = `<span class="item-badge locked-badge">LOCKED</span>`;
    const symbolGlow = hasSymbol ? `<span class="item-symbol-glow" title="A symbol hides here">◆</span>` : '';

    return `
      <div class="item-card ${solved && !isHint ? 'solved' : ''}" id="item-card-${itemId}">
        ${badge}${symbolGlow}
        <span class="item-icon">${item.icon}</span>
        <div class="item-name">${item.name}</div>
        <div class="item-hint">${item.hint}</div>
      </div>`;
  },

  renderNav(room) {
    const navEl = document.getElementById('room-nav');
    const navRooms = [
      { id: 'study',    label: '📚 Study' },
      { id: 'kitchen',  label: '🔪 Kitchen' },
      { id: 'bedroom',  label: '🛏 Bedroom' },
      { id: 'basement', label: '⚙ Basement' },
      { id: 'security', label: '🔒 Security Office' }
    ];
    navEl.innerHTML = navRooms.map(r => {
      const isCurrent = r.id === this.state.room;
      const locked = this.isRoomLocked(r.id);
      return `<button class="btn-nav ${isCurrent?'current':''}"
        ${locked?`disabled title="Requires key item"`:''} data-room="${r.id}">
        ${r.label}${locked?' 🔒':''}</button>`;
    }).join('');
    navEl.querySelectorAll('.btn-nav:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!this.isRoomLocked(btn.dataset.room)) this.renderRoom(btn.dataset.room);
      });
    });
  },

  isRoomLocked(roomId) {
    const room = ROOMS[roomId];
    if (!room || !room.requiresKey) return false;
    return !this.state.inventory.has(room.requiresKey);
  },

  onItemClick(itemId) {
    const item = ITEMS[itemId];
    if (!item) return;
    if (item.symbol && !this.state.symbols.has(itemId)) this.foundSymbol(itemId);
    if (item.discoveryFlag) this.state.discoveryFlags.add(item.discoveryFlag);
    this.showInspectModal(item);
  },

  foundSymbol(itemId) {
    this.state.symbols.add(itemId);
    this.updateSymbolsCounter();
    this.showNotif(`◆ Hidden symbol discovered! (${this.state.symbols.size}/7)`, 'symbol');
  },

  updateSymbolsCounter() {
    const el = document.getElementById('symbols-counter');
    if (!el) return;
    el.textContent = `◆ ${this.state.symbols.size}/7`;
    el.className = this.state.symbols.size > 0 ? 'found' : '';
  },

  showInspectModal(item) {
    const alreadySolved = item.puzzle && this.state.puzzlesDone.has(item.puzzle);
    const isHintItem = item.isHint;
    const hintRevealed = isHintItem && this.state.hintsRevealed.has(item.puzzle);

    let extra = '';
    if (item.clueText) extra += `<div class="inspect-clue">📌 ${item.clueText}</div>`;
    if (item.puzzle && !alreadySolved) {
      const btnText = isHintItem ? (hintRevealed ? '🔓 View Hint' : '⚠ Attempt Hint Puzzle') : '🔍 Investigate';
      extra += `<button class="btn-try-puzzle" id="btn-open-puzzle">${btnText}</button>`;
    }
    if (alreadySolved && !isHintItem) extra += `<div class="inspect-highlight">✓ This area has been investigated.</div>`;
    if (hintRevealed) extra += `<button class="btn-evidence" id="btn-view-hint-result">📋 View Revealed Hint</button>`;

    this.showModal({
      title: item.name,
      subtitle: item.isHint ? 'HINT TERMINAL' : 'ITEM INSPECTION',
      body: `<span class="inspect-icon">${item.icon}</span>
             <div class="inspect-text">${item.inspectText.replace(/\n/g,'<br>')}</div>${extra}`
    });

    if (item.puzzle && !alreadySolved) {
      document.getElementById('btn-open-puzzle')?.addEventListener('click', () => {
        this.closeModal();
        if (item.id === 'detective_board_item') {
          this.showDetectiveBoard();
        } else {
          this.openPuzzle(item.puzzle, item);
        }
      });
    }

    if (hintRevealed) {
      document.getElementById('btn-view-hint-result')?.addEventListener('click', () => {
        const p = PUZZLES[item.puzzle];
        this.closeModal();
        this.showModal({
          title: '📋 Hint Revealed',
          subtitle: 'HINT CONTENT',
          body: `<div class="puzzle-feedback info" style="display:block;white-space:pre-line">${p?.hintReveal || 'Not found.'}</div>
                 <button class="btn-submit" id="btn-close-hint" style="margin-top:1rem">Close</button>`
        });
        document.getElementById('btn-close-hint')?.addEventListener('click', () => this.closeModal());
      });
    }
  },

  openPuzzle(puzzleId, item) {
    const p = PUZZLES[puzzleId];
    if (!p) return;
    this.state.currentPuzzleId = puzzleId;
    this.state.codeEntry = '';
    this.state.clickProgress = [];
    const body = document.createElement('div');
    body.className = 'modal-body';
    Puzzles.render(puzzleId, body);
    this.showModal({ title: p.title, subtitle: p.type.toUpperCase().replace(/_/g,' '), bodyEl: body });
  },

  solvePuzzle(puzzleId) {
    const p = PUZZLES[puzzleId];
    if (!p) return;
    this.state.puzzlesDone.add(puzzleId);

    const rewards = Array.isArray(p.reward) ? p.reward : (p.reward ? [p.reward] : []);
    rewards.forEach(evId => {
      if (evId && !this.state.evidence.has(evId)) {
        this.state.evidence.add(evId);
        const evData = EVIDENCE_DATA[evId];
        if (evData) this.showNotif(`📓 Evidence added: ${evData.name}`, 'success');
      }
    });

    if (p.inventoryReward) {
      this.state.inventory.add(p.inventoryReward);
      const names = { basement_key: 'Basement Key', security_keycard: 'Security Keycard' };
      this.showNotif(`🎒 Obtained: ${names[p.inventoryReward] || p.inventoryReward}`, 'info');
    }

    this.closeModal();
    if (p.rewardText) {
      setTimeout(() => {
        this.showModal({
          title: '🔓 Puzzle Solved!',
          subtitle: 'NEW DISCOVERY',
          body: `<div class="puzzle-feedback correct" style="display:block;margin-bottom:1rem">✓ Correct!</div>
                 <div class="inspect-text">${p.rewardText.replace(/\n/g,'<br>')}</div>
                 <button class="btn-submit" id="btn-reward-close" style="margin-top:1.25rem">Continue Investigation</button>`
        });
        document.getElementById('btn-reward-close')?.addEventListener('click', () => {
          this.closeModal();
          this.renderRoom(this.state.room);
          this.updateInventoryPanel();
          this.updateEvidencePanel();
        });
      }, 150);
    } else {
      this.renderRoom(this.state.room);
      this.updateInventoryPanel();
      this.updateEvidencePanel();
    }
  },

  revealHint(hintPuzzleId) {
    this.state.hintsRevealed.add(hintPuzzleId);
    const p = PUZZLES[hintPuzzleId];
    this.closeModal();
    setTimeout(() => {
      this.showModal({
        title: '🔓 Hint Unlocked!',
        subtitle: 'INTELLIGENCE REVEALED',
        body: `<div class="puzzle-feedback correct" style="display:block;margin-bottom:1rem">✓ Challenge complete.</div>
               <div class="inspect-highlight" style="white-space:pre-line;font-family:var(--body);font-size:1rem;color:var(--text)">${p?.hintReveal || 'Hint revealed.'}</div>
               <button class="btn-submit" id="btn-hint-close" style="margin-top:1.25rem">Close</button>`
      });
      document.getElementById('btn-hint-close')?.addEventListener('click', () => {
        this.closeModal();
        this.renderRoom(this.state.room);
      });
    }, 150);
  },

  // ── DETECTIVE BOARD ──────────────────────────────────────

  showDetectiveBoard() {
    if (this.state.evidence.size < 6) {
      this.showModal({
        title: '📋 Detective\'s Board',
        subtitle: 'MORE EVIDENCE NEEDED',
        body: `<div class="puzzle-feedback wrong" style="display:block;margin-bottom:1rem">
                 ✗ Insufficient evidence. You have ${this.state.evidence.size}/10 piece(s).
               </div>
               <div class="inspect-text">Gather at least 6 pieces of evidence before attempting final deduction.</div>
               <button class="btn-submit" id="btn-close-board" style="margin-top:1rem">Continue Investigating</button>`
      });
      document.getElementById('btn-close-board')?.addEventListener('click', () => this.closeModal());
      return;
    }

    clearInterval(this.state.timerInterval);
    this.state.phase = 'board';
    const app = document.getElementById('app');
    const p = PUZZLES['detective_board'];

    const totalCards = p.evidenceCards.length;
    const placed = Object.keys(this.state.boardPlacements).length;
    const correctCount = Object.entries(this.state.boardPlacements)
      .filter(([cardId, suspectId]) => {
        const card = p.evidenceCards.find(c => c.id === cardId);
        return card && card.correctSuspect === suspectId;
      }).length;

    const unplaced = p.evidenceCards.filter(card => !this.state.boardPlacements[card.id]);
    const poolHtml = unplaced.length > 0
      ? unplaced.map(card => `
          <div class="ev-card" draggable="true" data-card="${card.id}" id="evcard-${card.id}">
            <span class="ev-card-icon">${card.icon}</span>
            <div class="ev-card-name">${card.name}</div>
            <div class="ev-card-desc">${card.desc}</div>
          </div>`).join('')
      : '<div style="font-size:.8rem;color:var(--text-faint);font-style:italic">All cards placed</div>';

    const suspectCols = p.suspects.map(suspect => {
      const cardsHere = p.evidenceCards.filter(c => this.state.boardPlacements[c.id] === suspect.id);
      const cardHtml = cardsHere.map(card => {
        const correct = card.correctSuspect === suspect.id;
        return `<div class="board-card ${correct?'correct':'incorrect'}" data-card="${card.id}" title="Click to remove">
          <div class="board-card-name">${card.icon} ${card.name}</div>
        </div>`;
      }).join('');
      return `
        <div class="suspect-col ${suspect.id==='ruledOut'?'ruled-out-col':''}"
          id="col-${suspect.id}"
          ondragover="event.preventDefault()"
          ondrop="Game.onCardDrop(event,'${suspect.id}')">
          <div class="suspect-col-header">
            <span class="suspect-photo">${suspect.icon}</span>
            <div class="suspect-name">${suspect.name}</div>
            <div class="suspect-role">${suspect.role}</div>
          </div>
          <div class="suspect-drop-zone" id="zone-${suspect.id}">
            ${cardHtml || '<div style="font-size:.75rem;color:var(--text-faint);font-style:italic;padding:.5rem;text-align:center">Drop evidence here</div>'}
          </div>
        </div>`;
    }).join('');

    const allCorrect = totalCards > 0 && correctCount === totalCards && placed === totalCards;
    const accuseBtn = allCorrect
      ? `<button class="btn-accuse" id="btn-accuse-final">⚖ MAKE YOUR ACCUSATION</button>`
      : `<div style="text-align:center;font-family:var(--mono);font-size:.78rem;color:var(--text-faint);margin-top:1rem">
           ${placed}/${totalCards} cards placed · ${correctCount} correct
           <br><em>All placements must be correct to unlock accusation.</em>
         </div>`;

    app.innerHTML = `
      <div id="screen-board">
        <div class="board-header">
          <h2>The Detective's Deduction Board</h2>
          <p>Drag each piece of evidence to the correct suspect.<br>Mark planted/irrelevant evidence as "Ruled Out / Explained".</p>
          <p style="margin-top:.5rem;font-family:var(--mono);font-size:.75rem;color:var(--red-bright)">⚠ Wrong placements are marked immediately. You cannot accuse until all cards are correctly placed.</p>
        </div>
        <div class="board-layout">
          <div class="ev-pool">
            <div class="ev-pool-label">Evidence Pool (drag to suspects)</div>
            <div class="ev-pool-cards" id="ev-pool"
              ondragover="event.preventDefault()"
              ondrop="Game.onCardDrop(event,'pool')">
              ${poolHtml}
            </div>
          </div>
          <div class="suspects-area">${suspectCols}</div>
        </div>
        ${accuseBtn}
        <div style="text-align:center;margin-top:1rem">
          <button class="btn-restart" id="btn-back-game">← Return to Investigation</button>
        </div>
      </div>`;

    // Drag handlers
    document.querySelectorAll('.ev-card[draggable]').forEach(card => {
      card.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', card.dataset.card);
        card.classList.add('dragging');
      });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
    });
    // Click-to-remove placed cards
    document.querySelectorAll('.board-card').forEach(card => {
      card.addEventListener('click', () => {
        delete this.state.boardPlacements[card.dataset.card];
        this.showDetectiveBoard();
      });
    });

    document.getElementById('btn-back-game')?.addEventListener('click', () => {
      this.state.phase = 'game';
      this.renderGame();
      this.startTimer();
    });

    if (allCorrect) {
      document.getElementById('btn-accuse-final')?.addEventListener('click', () => this.showAccusationScreen());
    }
  },

  onCardDrop(event, suspectId) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('text/plain');
    const p = PUZZLES['detective_board'];
    const card = p.evidenceCards.find(c => c.id === cardId);
    if (!card) return;

    if (suspectId === 'pool') {
      delete this.state.boardPlacements[cardId];
    } else {
      this.state.boardPlacements[cardId] = suspectId;
      const correct = card.correctSuspect === suspectId;
      if (!correct) this.showNotif(`✗ "${card.name}" — Flawed reasoning.`, 'error');
      else this.showNotif(`✓ "${card.name}" correctly placed.`, 'success');
    }
    this.showDetectiveBoard();
  },

  showAccusationScreen() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div id="screen-board" style="background:radial-gradient(ellipse at center,rgba(139,26,26,0.2),transparent 60%),var(--bg)">
        <div class="board-header">
          <h2 style="color:var(--red-bright);font-size:2.5rem">⚖ MAKE YOUR ACCUSATION</h2>
          <p style="color:var(--text-dim);font-size:1rem">You have one chance. Choose carefully.<br>If you are wrong, there are consequences.</p>
        </div>
        <div class="accuse-choices">
          <button class="btn-accuse-suspect" data-suspect="emma">
            <span class="s-icon">👩</span>Emma Cole<br><span style="font-size:.75rem;color:var(--text-dim)">Wife</span>
          </button>
          <button class="btn-accuse-suspect" data-suspect="lucas">
            <span class="s-icon">👨‍💼</span>Lucas<br><span style="font-size:.75rem;color:var(--text-dim)">Business Partner</span>
          </button>
          <button class="btn-accuse-suspect" data-suspect="noah">
            <span class="s-icon">👤</span>Noah<br><span style="font-size:.75rem;color:var(--text-dim)">Assistant</span>
          </button>
          <button class="btn-accuse-suspect" data-suspect="sarah">
            <span class="s-icon">👩‍🦰</span>Sarah Cole<br><span style="font-size:.75rem;color:var(--text-dim)">Sister</span>
          </button>
        </div>
        <div style="text-align:center">
          <button class="btn-restart" id="btn-back-board">← Back to Board</button>
        </div>
      </div>`;
    document.querySelectorAll('.btn-accuse-suspect').forEach(btn => {
      btn.addEventListener('click', () => this.makeAccusation(btn.dataset.suspect));
    });
    document.getElementById('btn-back-board')?.addEventListener('click', () => this.showDetectiveBoard());
  },

  makeAccusation(suspect) {
    this.state.accusation = suspect;
    clearInterval(this.state.timerInterval);
    if (suspect === 'emma') {
      this.showEnding(this.state.symbols.size >= 7 ? 'secret' : 'correct');
    } else {
      this.showEnding('wrong');
    }
  },

  showEnding(type) {
    this.state.phase = 'ending';
    const app = document.getElementById('app');
    const timeUsed = 3600 - this.state.secondsLeft;
    const timeStr = `${Math.floor(timeUsed/60)}m ${timeUsed%60}s`;

    let content = '';

    if (type === 'timeout') {
      content = `<div class="ending-box">
        <div class="ending-title bad">Time's Up.</div>
        <div class="ending-narrative">The clock struck midnight.\n\nThe lights went out.\n\nYou never found the answer.\n\nThe door opened from the outside.</div>
        <div class="ending-confession">[ SOUND OF FOOTSTEPS ]\n\nYou never made your accusation.\nThe killer walked free.\n\nYou were found the next morning.</div>
        <button class="btn-restart" id="btn-restart">Try Again</button>
      </div>`;
    }
    else if (type === 'wrong') {
      const names = { lucas:'Lucas', noah:'Noah', sarah:'Sarah Cole' };
      content = `<div class="ending-box">
        <div class="ending-title bad">Wrong Accusation.</div>
        <div class="ending-narrative">You accused ${names[this.state.accusation] || 'the wrong person'}.\n\nThe police made the arrest. Released in 48 hours.\nNo evidence. No case.\n\nYou left Cole Manor convinced you had solved it.\n\nBehind you, a light flickered in an upstairs window.</div>
        <div class="ending-confession">[ Three days later, you received a letter. No return address. ]\n\n"You chose incorrectly.\nI watched you leave.\nI'm still here.\n\n— E"</div>
        <div style="font-family:var(--mono);font-size:.8rem;color:var(--text-faint);margin:1rem 0">
          Time: ${timeStr} · Evidence: ${this.state.evidence.size}/10 · Symbols: ${this.state.symbols.size}/7
        </div>
        <button class="btn-restart" id="btn-restart">Try Again</button>
      </div>`;
    }
    else if (type === 'correct') {
      content = `<div class="ending-box">
        <div class="ending-title good">Case Closed.</div>
        <div class="ending-narrative">You accused Emma Cole.\n\nDetectives arrived. The evidence was irrefutable:\n· Admin override at 22:58 — her code.\n· Staff gate entry at 23:00 — her code.\n· CCTV modification at 02:11 — her login.\n· No alibi from 21:31 onwards.\n· Insurance policy: £4.2M.\n\nEmma was arrested leaving the estate.</div>
        <div class="ending-confession">[ Emma Cole's confession, recorded after arrest ]\n\n"He changed the will. After everything I endured.\nHe was leaving it to charity.\nI planned it for six months.\nThe bottle in the kitchen — I put it there.\nI wanted them to find it. Misdirection.\nThe decanter — that was real.\nI poured it myself, before dinner.\nI watched him drink it.\nI sat across from him and watched.\nAnd I went to the gallery.\nI needed people to see me.\nI just didn't think they'd check when I left."
[ Police sirens. You step outside. You survived. ]</div>
        <div style="font-family:var(--mono);font-size:.8rem;color:var(--text-faint);margin:1rem 0">
          Time: ${timeStr} · Evidence: ${this.state.evidence.size}/10 · Symbols: ${this.state.symbols.size}/7
        </div>
        ${this.state.symbols.size < 7 ? `<div style="font-size:.85rem;color:var(--gold-dim);font-style:italic;margin-bottom:1rem">★ ${this.state.symbols.size}/7 symbols found. Collect all 7 for the Secret Ending.</div>` : ''}
        <button class="btn-restart" id="btn-restart">Play Again</button>
      </div>`;
    }
    else if (type === 'secret') {
      content = `<div class="ending-box">
        <div class="ending-title secret">The Whole Truth.</div>
        <div class="ending-narrative">Emma was guilty.\n\nBut you found all seven symbols.\n\nAnd now you know the rest of the story.</div>
        <div class="ending-confession">[ From a sealed document in Adrian's private safe ]\n\n"To whoever finds this:\n\nI am not an innocent man.\n\nI have been blackmailing them all.\n\n· Emma — the money she moved before the prenuptial.\n· Lucas — the patent filings he stole from my designs.\n· Noah — what happened in Geneva.\n· Sarah — the inheritance that was never hers.\n\nI threatened each of them. Not out of cruelty. Out of survival.\n\nOn the night I died, every single one of them had planned to kill me.\n\nEmma was simply the fastest.\n\nNone of them are innocent.\n\nNeither was I.\n\n— Dr. Adrian Cole"\n\n[ Four police cars wait outside. ]\n[ You hold the letter. You don't know who deserves justice here. ]\n[ You're not sure anyone does. ]</div>
        <div style="font-family:var(--mono);font-size:.8rem;color:var(--text-faint);margin:1rem 0">
          ◆ 7/7 Symbols · Time: ${timeStr} · Evidence: ${this.state.evidence.size}/10
        </div>
        <button class="btn-restart" id="btn-restart">Play Again</button>
      </div>`;
    }

    app.innerHTML = `<div id="screen-ending" style="background:radial-gradient(ellipse at center,rgba(139,26,26,.15),transparent 70%),var(--bg)">${content}</div>`;
    document.getElementById('btn-restart')?.addEventListener('click', () => this.resetGame());
  },

  resetGame() {
    this.state = {
      phase: 'intro', room: 'study', secondsLeft: 3600, timerInterval: null,
      inventory: new Set(), evidence: new Set(), puzzlesDone: new Set(),
      hintsUnlocked: new Set(), hintsRevealed: new Set(), symbols: new Set(),
      discoveryFlags: new Set(), currentModal: null, currentPuzzleId: null,
      codeEntry: '', orderingState: {}, msSelections: {}, wireState: {},
      clickProgress: [], logicState: {}, magicState: null, binaryState: null,
      boardPlacements: {}, accusation: null
    };
    this.renderIntro();
  },

  showModal({ title, subtitle, body, bodyEl }) {
    this.closeModal();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'modal-overlay';
    const box = document.createElement('div');
    box.className = 'modal-box';
    box.innerHTML = `
      <div class="modal-header">
        <div>
          <div class="modal-title">${title}</div>
          ${subtitle ? `<div class="modal-subtitle">${subtitle}</div>` : ''}
        </div>
        <button class="btn-close" id="btn-modal-close">✕</button>
      </div>`;
    if (bodyEl) {
      box.appendChild(bodyEl);
    } else {
      const bd = document.createElement('div');
      bd.className = 'modal-body';
      bd.innerHTML = body || '';
      box.appendChild(bd);
    }
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) this.closeModal(); });
    box.querySelector('#btn-modal-close')?.addEventListener('click', () => this.closeModal());
  },

  closeModal() {
    document.getElementById('modal-overlay')?.remove();
  },

  showMap() {
    const roomData = [
      { id: 'study',    icon: '📚', name: 'Study',           status: 'Unlocked' },
      { id: 'kitchen',  icon: '🔪', name: 'Kitchen',         status: 'Unlocked' },
      { id: 'bedroom',  icon: '🛏', name: 'Master Bedroom',  status: 'Unlocked' },
      { id: 'basement', icon: '⚙', name: 'Basement Lab',    status: this.isRoomLocked('basement') ? '🔒 Requires Basement Key (bedroom safe)' : '✓ Unlocked' },
      { id: 'security', icon: '🔒', name: 'Security Office', status: this.isRoomLocked('security') ? '🔒 Requires Keycard (basement wire panel)' : '✓ Unlocked' }
    ];
    this.showModal({
      title: '🗺 Cole Manor — Map',
      subtitle: `CURRENT: ${ROOMS[this.state.room]?.name}`,
      body: `<div class="map-grid">
        ${roomData.map(r => `
          <div class="map-room ${this.state.room===r.id?'current':''} ${this.isRoomLocked(r.id)?'locked':''}" data-room="${r.id}">
            <span class="map-room-icon">${r.icon}</span>
            <div class="map-room-name">${r.name}</div>
            <div class="map-room-status">${r.status}</div>
          </div>`).join('')}
      </div>
      <div style="font-size:.8rem;color:var(--text-faint);font-style:italic;text-align:center">Click a room to navigate.</div>`
    });
    document.querySelectorAll('.map-room:not(.locked)').forEach(el => {
      el.addEventListener('click', () => {
        this.closeModal();
        this.renderRoom(el.dataset.room);
      });
    });
  },

  showJournal() {
    const collected = [...this.state.evidence];
    if (collected.length === 0) {
      this.showModal({
        title: '📓 Evidence Journal', subtitle: 'EMPTY',
        body: `<div style="font-style:italic;color:var(--text-dim);text-align:center;padding:2rem">No evidence collected yet.</div>`
      });
      return;
    }
    const cards = collected.map(evId => {
      const ev = EVIDENCE_DATA[evId];
      if (!ev) return '';
      return `<div class="journal-card">
        <div class="journal-card-header">
          <span class="journal-card-icon">${ev.icon}</span>
          <div class="journal-card-name">${ev.name}</div>
        </div>
        <div class="journal-card-body">${ev.desc}</div>
        ${ev.significance ? `<div style="margin-top:.5rem;font-size:.75rem;color:var(--gold-dim);font-style:italic;border-top:1px solid var(--border);padding-top:.4rem">Significance: ${ev.significance}</div>` : ''}
      </div>`;
    }).join('');
    this.showModal({
      title: '📓 Evidence Journal',
      subtitle: `${collected.length} PIECE(S) COLLECTED`,
      body: `<div style="margin-bottom:1rem;font-size:.85rem;color:var(--text-dim);font-style:italic">Some evidence is planted. Contradictions are intentional. Reason through it all.</div>
             <div class="journal-grid">${cards}</div>`
    });
  },

  updateInventoryPanel() {
    const el = document.getElementById('inventory-list');
    if (!el) return;
    const items = [
      { id: 'basement_key', icon: '🗝️', name: 'Basement Key' },
      { id: 'security_keycard', icon: '💳', name: 'Security Keycard' }
    ].filter(i => this.state.inventory.has(i.id));
    el.innerHTML = items.length === 0
      ? `<div class="inv-empty">No items yet.</div>`
      : items.map(i => `<div class="inv-item"><span class="inv-icon">${i.icon}</span><span>${i.name}</span></div>`).join('');
  },

  updateEvidencePanel() {
    const countEl = document.getElementById('ev-count');
    const previewEl = document.getElementById('evidence-preview');
    if (!previewEl) return;
    const count = this.state.evidence.size;
    if (countEl) countEl.textContent = `${count} found`;
    if (count === 0) {
      previewEl.innerHTML = `<div class="inv-empty" style="padding:.75rem">No evidence yet.</div>`;
      return;
    }
    previewEl.innerHTML = [...this.state.evidence].map(evId => {
      const ev = EVIDENCE_DATA[evId];
      if (!ev) return '';
      return `<div class="ev-entry" onclick="Game.showJournal()">
        <div class="ev-entry-name">${ev.icon} ${ev.name}</div>
        <div class="ev-entry-desc">${ev.desc}</div>
      </div>`;
    }).join('');
  },

  showNotif(message, type = 'info') {
    const area = document.getElementById('notification-area');
    if (!area) return;
    const notif = document.createElement('div');
    notif.className = `notif ${type}`;
    const icons = { success: '✓', error: '✗', info: 'ℹ', symbol: '◆' };
    notif.innerHTML = `<span class="notif-icon">${icons[type]||'ℹ'}</span><span>${message}</span>`;
    area.appendChild(notif);
    setTimeout(() => notif.remove(), 3200);
  }
};

document.addEventListener('DOMContentLoaded', () => Game.init());
