// ============================================================
//  MIDNIGHT AT COLE MANOR — Puzzle Renderers
// ============================================================

const Puzzles = {

  render(puzzleId, container) {
    const p = PUZZLES[puzzleId];
    if (!p) return;

    switch (p.type) {
      case 'code_entry':   this.renderCodeEntry(p, container); break;
      case 'ordering':     this.renderOrdering(p, container);  break;
      case 'multi_select': this.renderMultiSelect(p, container); break;
      case 'wire':         this.renderWire(p, container); break;
      case 'click_sequence': this.renderClickSequence(p, container); break;
      case 'cipher':       this.renderCipher(p, container); break;
      case 'logic_grid':   this.renderLogicGrid(p, container); break;
      case 'magic_square': this.renderMagicSquare(p, container); break;
      case 'binary_decode': this.renderBinaryDecode(p, container); break;
      default:             container.innerHTML = '<p>Unknown puzzle type.</p>';
    }
  },

  // ────────────────────────────────────────
  // CODE ENTRY
  // ────────────────────────────────────────
  renderCodeEntry(p, container) {
    Game.state.codeEntry = '';

    const isText = p.isText;
    const inner = document.createElement('div');
    inner.innerHTML = `
      <div class="puzzle-intro">${p.prompt.replace(/\n/g,'<br>')}</div>
      ${isText
        ? `<input class="text-input-puzzle" id="code-text-input" placeholder="Type your answer..." autocomplete="off">`
        : `<div class="codepad">
            <div class="code-display" id="code-display">${'_'.repeat(p.digits)}</div>
            <div class="numpad" id="numpad"></div>
          </div>`
      }
      <div id="code-feedback" class="puzzle-feedback" style="display:none"></div>`;
    container.appendChild(inner);

    if (isText) {
      const input = inner.querySelector('#code-text-input');
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') this.submitCodeText(p, input);
      });
      const submitRow = document.createElement('div');
      submitRow.style.marginTop = '0.75rem';
      submitRow.innerHTML = `<button class="btn-submit" id="btn-code-submit">Submit Answer</button>`;
      inner.appendChild(submitRow);
      submitRow.querySelector('#btn-code-submit').addEventListener('click', () => {
        this.submitCodeText(p, input);
      });
    } else {
      this.buildNumpad(p, inner);
    }
  },

  buildNumpad(p, inner) {
    const numpad = inner.querySelector('#numpad');
    if (!numpad) return;
    const buttons = [
      '1','2','3','4','5','6','7','8','9','⌫','0','✓'
    ];
    buttons.forEach(b => {
      const btn = document.createElement('button');
      btn.className = 'btn-num' + (b==='⌫'?' del':b==='✓'?' submit':'');
      btn.textContent = b;
      btn.addEventListener('click', () => this.handleNumpadKey(b, p, inner));
      numpad.appendChild(btn);
    });
  },

  handleNumpadKey(key, p, inner) {
    const display = inner.querySelector('#code-display');
    if (!display) return;

    if (key === '⌫') {
      Game.state.codeEntry = Game.state.codeEntry.slice(0,-1);
    } else if (key === '✓') {
      this.submitCode(p, inner);
      return;
    } else {
      if (Game.state.codeEntry.length < p.digits) {
        Game.state.codeEntry += key;
      }
    }

    const filled = Game.state.codeEntry;
    const remaining = p.digits - filled.length;
    display.textContent = filled + '_'.repeat(remaining);

    if (Game.state.codeEntry.length === p.digits) {
      setTimeout(() => this.submitCode(p, inner), 200);
    }
  },

  submitCode(p, inner) {
    const feedback = inner.querySelector('#code-feedback');
    const answer = Game.state.codeEntry;

    const correct = this.checkAnswer(answer, p);

    if (correct) {
      if (feedback) {
        feedback.textContent = '✓ Correct!';
        feedback.className = 'puzzle-feedback correct';
        feedback.style.display = 'block';
      }
      setTimeout(() => Game.solvePuzzle(p.id), 600);
    } else {
      if (feedback) {
        feedback.textContent = '✗ Incorrect. Try again.';
        feedback.className = 'puzzle-feedback wrong';
        feedback.style.display = 'block';
      }
      Game.state.codeEntry = '';
      const display = inner.querySelector('#code-display');
      if (display) display.textContent = '_'.repeat(p.digits);
    }
  },

  submitCodeText(p, input) {
    const answer = input.value.trim();
    const correct = this.checkAnswer(answer, p);
    const feedback = input.parentElement?.querySelector('#code-feedback')
      || document.getElementById('code-feedback');

    if (correct) {
      input.className = 'text-input-puzzle correct';
      if (feedback) {
        feedback.textContent = '✓ Correct!';
        feedback.className = 'puzzle-feedback correct';
        feedback.style.display = 'block';
      }
      if (p.isHintPuzzle) {
        setTimeout(() => Game.revealHint(p.id), 600);
      } else {
        setTimeout(() => Game.solvePuzzle(p.id), 600);
      }
    } else {
      input.className = 'text-input-puzzle wrong';
      if (feedback) {
        feedback.textContent = '✗ Incorrect. Check your work.';
        feedback.className = 'puzzle-feedback wrong';
        feedback.style.display = 'block';
      }
      setTimeout(() => {
        input.className = 'text-input-puzzle';
        if (feedback) feedback.style.display = 'none';
      }, 1500);
    }
  },

  checkAnswer(answer, p) {
    const a = answer.toLowerCase().trim();
    const mainAnswer = (p.answer || '').toLowerCase().trim();
    if (a === mainAnswer) return true;
    if (p.answerVariants) {
      return p.answerVariants.some(v => v.toLowerCase().trim() === a);
    }
    return false;
  },

  // ────────────────────────────────────────
  // ORDERING
  // ────────────────────────────────────────
  renderOrdering(p, container) {
    const state = Game.state.orderingState;
    if (!state[p.id] || state[p.id].length !== p.items.length) {
      state[p.id] = [...p.items].sort(() => Math.random() - 0.5).map(i => i.id);
    }
    const order = state[p.id];

    const inner = document.createElement('div');
    inner.innerHTML = `
      <div class="puzzle-intro">${p.prompt.replace(/\n/g,'<br>')}</div>
      <div class="ordering-list" id="ordering-list"></div>
      <button class="btn-submit" id="btn-order-submit">Submit Order</button>
      <div id="order-feedback" class="puzzle-feedback" style="display:none"></div>`;
    container.appendChild(inner);

    const list = inner.querySelector('#ordering-list');
    this.renderOrderItems(p, order, list);

    inner.querySelector('#btn-order-submit').addEventListener('click', () => {
      this.submitOrdering(p, inner);
    });
  },

  renderOrderItems(p, order, list) {
    list.innerHTML = order.map((id, idx) => {
      const item = p.items.find(i => i.id === id);
      return `
        <div class="order-item" data-id="${id}" data-idx="${idx}">
          <span class="order-num">${idx+1}</span>
          <div class="order-content">
            <div class="order-label">${item.label}</div>
            <div style="font-size:.88rem;color:var(--text-dim);margin-top:.2rem">${item.content}</div>
          </div>
          <div class="order-btns">
            <button class="btn-order" data-dir="up" data-idx="${idx}" ${idx===0?'disabled':''}>▲</button>
            <button class="btn-order" data-dir="down" data-idx="${idx}" ${idx===order.length-1?'disabled':''}>▼</button>
          </div>
        </div>`;
    }).join('');

    list.querySelectorAll('.btn-order').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        const dir = btn.dataset.dir;
        if (dir === 'up' && idx > 0) {
          [order[idx-1], order[idx]] = [order[idx], order[idx-1]];
        } else if (dir === 'down' && idx < order.length-1) {
          [order[idx], order[idx+1]] = [order[idx+1], order[idx]];
        }
        this.renderOrderItems(p, order, list);
      });
    });
  },

  submitOrdering(p, inner) {
    const state = Game.state.orderingState;
    const current = state[p.id];
    const correct = JSON.stringify(current) === JSON.stringify(p.correctOrder);
    const feedback = inner.querySelector('#order-feedback');

    if (correct) {
      feedback.textContent = '✓ Correct order!';
      feedback.className = 'puzzle-feedback correct';
      feedback.style.display = 'block';
      setTimeout(() => Game.solvePuzzle(p.id), 700);
    } else {
      let wrongAt = -1;
      for (let i = 0; i < current.length; i++) {
        if (current[i] !== p.correctOrder[i]) { wrongAt = i+1; break; }
      }
      feedback.textContent = `✗ Incorrect order. First error at position ${wrongAt}.`;
      feedback.className = 'puzzle-feedback wrong';
      feedback.style.display = 'block';
    }
  },

  // ────────────────────────────────────────
  // MULTI-SELECT
  // ────────────────────────────────────────
  renderMultiSelect(p, container) {
    const selections = Game.state.msSelections[p.id] = {};
    const inner = document.createElement('div');
    inner.innerHTML = `
      <div class="puzzle-intro">${p.prompt.replace(/\n/g,'<br>')}</div>
      <div class="multi-select-list" id="ms-list"></div>
      <div style="font-size:.8rem;color:var(--text-faint);font-style:italic;margin-bottom:.75rem">Select all that apply, then submit.</div>
      <button class="btn-submit" id="btn-ms-submit">Submit Selections</button>
      <div id="ms-feedback" class="puzzle-feedback" style="display:none"></div>`;
    container.appendChild(inner);

    const list = inner.querySelector('#ms-list');
    p.items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'ms-item';
      el.dataset.id = item.id;
      el.innerHTML = `
        <div class="ms-check" id="check-${item.id}"></div>
        <div class="ms-entry">${item.content}</div>`;
      el.addEventListener('click', () => {
        selections[item.id] = !selections[item.id];
        el.classList.toggle('selected', !!selections[item.id]);
        el.querySelector('.ms-check').textContent = selections[item.id] ? '✓' : '';
      });
      list.appendChild(el);
    });

    inner.querySelector('#btn-ms-submit').addEventListener('click', () => {
      this.submitMultiSelect(p, inner, selections);
    });
  },

  submitMultiSelect(p, inner, selections) {
    const feedback = inner.querySelector('#ms-feedback');
    const correctIds = p.items.filter(i => i.correct).map(i => i.id);
    const selected = Object.keys(selections).filter(id => selections[id]);

    const missing = correctIds.filter(id => !selected.includes(id));
    const extra = selected.filter(id => !correctIds.includes(id));
    const correct = missing.length === 0 && extra.length === 0;

    if (correct) {
      feedback.textContent = '✓ All anomalies correctly identified!';
      feedback.className = 'puzzle-feedback correct';
      feedback.style.display = 'block';
      setTimeout(() => Game.solvePuzzle(p.id), 700);
    } else {
      let msg = '✗ Not quite. ';
      if (missing.length > 0) msg += `${missing.length} correct item(s) not selected. `;
      if (extra.length > 0) msg += `${extra.length} incorrect item(s) selected.`;
      feedback.textContent = msg;
      feedback.className = 'puzzle-feedback wrong';
      feedback.style.display = 'block';
    }
  },

  // ────────────────────────────────────────
  // WIRE CONNECTION
  // ────────────────────────────────────────
  renderWire(p, container) {
    const wireState = Game.state.wireState[p.id] = Game.state.wireState[p.id] || { connections: {}, selected: null };

    const inner = document.createElement('div');
    inner.innerHTML = `
      <div class="puzzle-intro">${p.prompt.replace(/\n/g,'<br>')}</div>
      <div class="wire-connections-display" id="wire-connections">No connections yet.</div>
      <div class="wire-container">
        <div class="wire-col" id="col-wires">
          <div class="wire-col-label">Wires</div>
        </div>
        <div style="display:flex;align-items:center;font-size:1.5rem;color:var(--text-faint)">→</div>
        <div class="wire-col" id="col-terminals">
          <div class="wire-col-label">Terminals</div>
        </div>
      </div>
      <button class="btn-submit" id="btn-wire-submit">Confirm Connections</button>
      <div id="wire-feedback" class="puzzle-feedback" style="display:none"></div>`;
    container.appendChild(inner);

    // Build wire items
    const colWires = inner.querySelector('#col-wires');
    p.wires.forEach(w => {
      const el = document.createElement('div');
      el.className = `wire-item ${w.color}`;
      el.id = `wire-${w.id}`;
      el.dataset.id = w.id;
      el.dataset.type = 'wire';
      el.textContent = w.label;
      el.addEventListener('click', () => this.handleWireClick(p, w.id, 'wire', inner));
      colWires.appendChild(el);
    });

    // Build terminals
    const colTerminals = inner.querySelector('#col-terminals');
    p.terminals.forEach(t => {
      const el = document.createElement('div');
      el.className = `wire-item ${t.color}`;
      el.id = `wire-${t.id}`;
      el.dataset.id = t.id;
      el.dataset.type = 'terminal';
      el.textContent = t.label;
      el.addEventListener('click', () => this.handleWireClick(p, t.id, 'terminal', inner));
      colTerminals.appendChild(el);
    });

    this.updateWireDisplay(p, inner);

    inner.querySelector('#btn-wire-submit').addEventListener('click', () => {
      this.submitWire(p, inner);
    });
  },

  handleWireClick(p, id, type, inner) {
    const ws = Game.state.wireState[p.id];
    const el = document.getElementById(`wire-${id}`);

    if (ws.selected === null) {
      // First click — select
      ws.selected = { id, type };
      document.querySelectorAll('.wire-item').forEach(e => e.classList.remove('selected'));
      el?.classList.add('selected');
    } else {
      // Second click — try to connect
      const sel = ws.selected;
      if (sel.id === id) {
        // Deselect
        ws.selected = null;
        el?.classList.remove('selected');
      } else if (sel.type === 'wire' && type === 'terminal') {
        ws.connections[sel.id] = id;
        ws.selected = null;
        document.querySelectorAll('.wire-item').forEach(e => e.classList.remove('selected'));
        this.updateWireDisplay(p, inner);
      } else if (sel.type === 'terminal' && type === 'wire') {
        ws.connections[id] = sel.id;
        ws.selected = null;
        document.querySelectorAll('.wire-item').forEach(e => e.classList.remove('selected'));
        this.updateWireDisplay(p, inner);
      } else {
        // Same type — switch selection
        ws.selected = { id, type };
        document.querySelectorAll('.wire-item').forEach(e => e.classList.remove('selected'));
        el?.classList.add('selected');
      }
    }
  },

  updateWireDisplay(p, inner) {
    const ws = Game.state.wireState[p.id];
    const connEl = inner.querySelector('#wire-connections');
    if (!connEl) return;

    const entries = Object.entries(ws.connections);
    if (entries.length === 0) {
      connEl.textContent = 'No connections yet. Click a wire then a terminal to connect.';
      return;
    }

    const lines = entries.map(([wireId, termId]) => {
      const wire = p.wires.find(w => w.id === wireId);
      const term = p.terminals.find(t => t.id === termId);
      return `${wire?.label || wireId} → ${term?.label || termId}`;
    });
    connEl.innerHTML = lines.join('<br>');

    // Mark connected items
    p.wires.forEach(w => {
      const el = document.getElementById(`wire-${w.id}`);
      if (ws.connections[w.id]) el?.classList.add('connected');
      else el?.classList.remove('connected');
    });
    p.terminals.forEach(t => {
      const el = document.getElementById(`wire-${t.id}`);
      const connected = Object.values(ws.connections).includes(t.id);
      if (connected) el?.classList.add('connected');
      else el?.classList.remove('connected');
    });
  },

  submitWire(p, inner) {
    const ws = Game.state.wireState[p.id];
    const feedback = inner.querySelector('#wire-feedback');
    const correct = p.correctConnections;

    let allCorrect = true;
    let errorMsg = '';

    for (const [wireId, termId] of Object.entries(correct)) {
      if (ws.connections[wireId] !== termId) {
        allCorrect = false;
        const wire = p.wires.find(w => w.id === wireId);
        errorMsg += `${wire?.label || wireId} is incorrectly connected. `;
      }
    }

    const connectedCount = Object.keys(ws.connections).length;
    if (connectedCount < p.wires.length) {
      allCorrect = false;
      errorMsg = `${p.wires.length - connectedCount} wire(s) not yet connected. `;
    }

    if (allCorrect) {
      feedback.textContent = '✓ All connections correct!';
      feedback.className = 'puzzle-feedback correct';
      feedback.style.display = 'block';
      setTimeout(() => Game.solvePuzzle(p.id), 700);
    } else {
      feedback.textContent = `✗ ${errorMsg}Check the lab journal again.`;
      feedback.className = 'puzzle-feedback wrong';
      feedback.style.display = 'block';
    }
  },

  // ────────────────────────────────────────
  // CLICK SEQUENCE
  // ────────────────────────────────────────
  renderClickSequence(p, container) {
    Game.state.clickProgress = [];

    const inner = document.createElement('div');
    inner.innerHTML = `
      <div class="puzzle-intro">${p.prompt.replace(/\n/g,'<br>')}</div>
      <div class="click-progress" id="click-prog">Touch sequence: 0 / ${p.correctSequence.length}</div>
      <div class="click-grid" id="click-grid"></div>
      <button class="btn-submit" id="btn-click-reset" style="background:transparent;border:1px solid var(--border);color:var(--text-dim);font-size:.85rem;padding:.4rem .9rem;border-radius:var(--radius);cursor:pointer;margin-top:.5rem">Reset Sequence</button>
      <div id="click-feedback" class="puzzle-feedback" style="display:none"></div>`;
    container.appendChild(inner);

    const grid = inner.querySelector('#click-grid');
    p.cells.forEach((cell, idx) => {
      const el = document.createElement('div');
      el.className = 'click-cell';
      el.dataset.pos = cell.pos;
      el.dataset.idx = idx;
      el.innerHTML = `<span style="font-size:1.8rem;color:var(--text-faint)">${cell.icon}</span>`;
      el.addEventListener('click', () => this.handleCellClick(p, idx, el, inner));
      grid.appendChild(el);
    });

    inner.querySelector('#btn-click-reset').addEventListener('click', () => {
      Game.state.clickProgress = [];
      grid.querySelectorAll('.click-cell').forEach(el => {
        el.className = 'click-cell';
        el.innerHTML = `<span style="font-size:1.8rem;color:var(--text-faint)">${p.cells[el.dataset.idx].icon}</span>`;
      });
      inner.querySelector('#click-prog').textContent = `Touch sequence: 0 / ${p.correctSequence.length}`;
      const fb = inner.querySelector('#click-feedback');
      if (fb) fb.style.display = 'none';
    });
  },

  handleCellClick(p, idx, el, inner) {
    const progress = Game.state.clickProgress;
    const expected = p.correctSequence[progress.length];
    const clickedPos = p.cells[idx].pos;

    if (clickedPos === expected) {
      progress.push(clickedPos);
      el.className = 'click-cell activated';
      const badge = document.createElement('span');
      badge.className = 'click-order-badge';
      badge.textContent = progress.length;
      el.appendChild(badge);

      const progEl = inner.querySelector('#click-prog');
      if (progEl) progEl.textContent = `Touch sequence: ${progress.length} / ${p.correctSequence.length}`;

      if (progress.length === p.correctSequence.length) {
        const fb = inner.querySelector('#click-feedback');
        if (fb) {
          fb.textContent = '✓ Sequence complete!';
          fb.className = 'puzzle-feedback correct';
          fb.style.display = 'block';
        }
        setTimeout(() => Game.solvePuzzle(p.id), 700);
      }
    } else {
      // Wrong cell
      el.className = 'click-cell wrong';
      const fb = inner.querySelector('#click-feedback');
      if (fb) {
        fb.textContent = `✗ Wrong cell. Sequence reset.`;
        fb.className = 'puzzle-feedback wrong';
        fb.style.display = 'block';
      }
      // Reset all after delay
      setTimeout(() => {
        Game.state.clickProgress = [];
        inner.querySelectorAll('.click-cell').forEach(c => {
          c.className = 'click-cell';
          c.innerHTML = `<span style="font-size:1.8rem;color:var(--text-faint)">${p.cells[c.dataset.idx].icon}</span>`;
        });
        inner.querySelector('#click-prog').textContent = `Touch sequence: 0 / ${p.correctSequence.length}`;
        if (fb) fb.style.display = 'none';
      }, 1000);
    }
  },

  // ────────────────────────────────────────
  // CIPHER (Hint puzzle — Study)
  // ────────────────────────────────────────
  renderCipher(p, container) {
    const inner = document.createElement('div');
    inner.innerHTML = `
      <div class="puzzle-intro">${p.prompt.replace(/\n/g,'<br>')}</div>
      <div style="margin-bottom:.75rem;font-size:.9rem;color:var(--text-dim)">
        <strong style="color:var(--gold)">Cipher text:</strong>
      </div>
      <div class="cipher-display">${p.cipherText}</div>
      <div class="cipher-clue-row">
        <span style="color:var(--text-faint);font-style:italic">Determine the shift value from your investigation notes, then decode the cipher text above.</span>
      </div>
      <div style="margin-bottom:.5rem;font-size:.85rem;color:var(--text-dim)">Decoded phrase:</div>
      <input class="text-input-puzzle" id="cipher-input" placeholder="Enter decoded message (uppercase or lowercase)..." autocomplete="off">
      <div style="margin-top:.75rem">
        <button class="btn-submit" id="btn-cipher-submit">Submit Decoding</button>
      </div>
      <div id="cipher-feedback" class="puzzle-feedback" style="display:none"></div>`;
    container.appendChild(inner);

    const input = inner.querySelector('#cipher-input');
    inner.querySelector('#btn-cipher-submit').addEventListener('click', () => {
      const val = input.value.trim();
      const correct = this.checkAnswer(val, p);
      const fb = inner.querySelector('#cipher-feedback');

      if (correct) {
        input.className = 'text-input-puzzle correct';
        if (fb) { fb.textContent = '✓ Correct decoding!'; fb.className = 'puzzle-feedback correct'; fb.style.display = 'block'; }
        setTimeout(() => Game.revealHint(p.id), 700);
      } else {
        input.className = 'text-input-puzzle wrong';
        if (fb) { fb.textContent = '✗ Incorrect. Try again.'; fb.className = 'puzzle-feedback wrong'; fb.style.display = 'block'; }
        setTimeout(() => { input.className = 'text-input-puzzle'; if(fb) fb.style.display='none'; }, 1600);
      }
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') inner.querySelector('#btn-cipher-submit').click();
    });
  },

  // ────────────────────────────────────────
  // LOGIC GRID (Hint — Kitchen)
  // ────────────────────────────────────────
  renderLogicGrid(p, container) {
    // Initialize state
    const ls = Game.state.logicState[p.id] = Game.state.logicState[p.id] || {};
    const { suspects, locations, departures, transport, witnesses } = p.categories;
    const cats = [locations, departures, transport, witnesses];
    const catNames = ['Location', 'Departure', 'Transport', 'Witness'];

    const inner = document.createElement('div');
    inner.innerHTML = `
      <div class="puzzle-intro">${p.prompt.replace(/\n/g,'<br>')}</div>
      <div style="font-size:.8rem;color:var(--text-faint);margin-bottom:.5rem">Click cells to toggle: blank → ✓ → ✗ → blank</div>
      <details style="margin-bottom:1rem">
        <summary style="cursor:pointer;font-family:var(--mono);font-size:.8rem;color:var(--gold-dim)">View Clues (${p.clues.length})</summary>
        <div class="logic-clues" id="logic-clues">
          ${p.clues.map((c,i) => `<div class="logic-clue">${i+1}. ${c}</div>`).join('')}
        </div>
      </details>
      <div class="logic-grid-wrap" id="logic-grid-wrap"></div>
      <button class="btn-submit" id="btn-logic-submit" style="margin-top:.75rem">Submit Grid</button>
      <div id="logic-feedback" class="puzzle-feedback" style="display:none"></div>`;
    container.appendChild(inner);

    const wrap = inner.querySelector('#logic-grid-wrap');
    cats.forEach((cat, catIdx) => {
      const catName = catNames[catIdx];
      const gridEl = document.createElement('div');
      gridEl.style.marginBottom = '1rem';
      gridEl.innerHTML = `<div style="font-family:var(--mono);font-size:.7rem;color:var(--text-faint);letter-spacing:.1em;margin-bottom:.3rem">${catName.toUpperCase()}</div>`;

      const table = document.createElement('div');
      table.className = 'logic-grid';
      table.style.gridTemplateColumns = `120px repeat(${cat.length}, 1fr)`;

      // Header row
      const cornerCell = document.createElement('div');
      cornerCell.className = 'logic-cell header';
      cornerCell.textContent = '';
      table.appendChild(cornerCell);

      cat.forEach(val => {
        const hCell = document.createElement('div');
        hCell.className = 'logic-cell header';
        hCell.textContent = val;
        hCell.style.fontSize = '.72rem';
        table.appendChild(hCell);
      });

      // Data rows
      suspects.forEach(suspect => {
        const rowCell = document.createElement('div');
        rowCell.className = 'logic-cell row-header';
        rowCell.textContent = suspect;
        table.appendChild(rowCell);

        cat.forEach(val => {
          const key = `${catIdx}|${suspect}|${val}`;
          const cell = document.createElement('div');
          cell.className = 'logic-cell';
          cell.dataset.key = key;
          const state = ls[key] || 0; // 0=blank, 1=yes, 2=no
          cell.className = 'logic-cell ' + ['', 'state-yes', 'state-no'][state];
          cell.textContent = ['', '✓', '✗'][state];
          cell.addEventListener('click', () => {
            const cur = ls[key] || 0;
            ls[key] = (cur + 1) % 3;
            cell.className = 'logic-cell ' + ['', 'state-yes', 'state-no'][ls[key]];
            cell.textContent = ['', '✓', '✗'][ls[key]];
          });
          table.appendChild(cell);
        });
      });

      gridEl.appendChild(table);
      wrap.appendChild(gridEl);
    });

    inner.querySelector('#btn-logic-submit').addEventListener('click', () => {
      this.submitLogicGrid(p, inner, ls);
    });
  },

  submitLogicGrid(p, inner, ls) {
    const fb = inner.querySelector('#logic-feedback');
    const { suspects, locations, departures, transport, witnesses } = p.categories;
    const cats = [locations, departures, transport, witnesses];
    const catKeys = ['location', 'departure', 'transport', 'witness'];
    const sol = p.solution;
    let errors = 0;

    suspects.forEach(suspect => {
      cats.forEach((cat, catIdx) => {
        const correctVal = sol[suspect][catKeys[catIdx]];
        cat.forEach(val => {
          const key = `${catIdx}|${suspect}|${val}`;
          const state = ls[key] || 0;
          const shouldBeYes = val === correctVal;
          if (shouldBeYes && state !== 1) errors++;
          if (!shouldBeYes && state === 1) errors++;
        });
      });
    });

    if (errors === 0) {
      if (fb) { fb.textContent = '✓ Logic grid solved!'; fb.className = 'puzzle-feedback correct'; fb.style.display = 'block'; }
      setTimeout(() => Game.revealHint(p.id), 700);
    } else {
      if (fb) {
        fb.textContent = `✗ ${errors} error(s) in your grid. Check the clues again.`;
        fb.className = 'puzzle-feedback wrong';
        fb.style.display = 'block';
      }
    }
  },

  // ────────────────────────────────────────
  // MAGIC SQUARE (Hint — Bedroom)
  // ────────────────────────────────────────
  renderMagicSquare(p, container) {
    if (!Game.state.magicState) {
      Game.state.magicState = {
        grid: Array(9).fill(null),
        selected: null,
        used: new Set()
      };
    }
    const ms = Game.state.magicState;

    const inner = document.createElement('div');
    inner.innerHTML = `
      <div class="puzzle-intro">${p.prompt.replace(/\n/g,'<br>')}</div>
      <div class="magic-square-wrap">
        <div>
          <div style="font-family:var(--mono);font-size:.7rem;color:var(--text-faint);margin-bottom:.5rem;letter-spacing:.1em">GRID</div>
          <div class="magic-grid" id="magic-grid"></div>
          <div class="magic-sums" id="magic-sums" style="margin-top:.6rem"></div>
        </div>
        <div>
          <div style="font-family:var(--mono);font-size:.7rem;color:var(--text-faint);margin-bottom:.5rem;letter-spacing:.1em">NUMBER POOL</div>
          <div class="magic-tiles" id="magic-tiles"></div>
          <div style="font-size:.75rem;color:var(--text-faint);margin-top:.5rem">1. Select a number<br>2. Click a grid cell</div>
        </div>
      </div>
      <button class="btn-submit" id="btn-magic-submit" style="margin-top:1rem">Check Solution</button>
      <button style="margin-top:.5rem;margin-left:.5rem;padding:.5rem 1rem;font-size:.8rem;color:var(--text-dim);border:1px solid var(--border);border-radius:var(--radius);background:transparent;cursor:pointer" id="btn-magic-reset">Reset</button>
      <div id="magic-feedback" class="puzzle-feedback" style="display:none"></div>`;
    container.appendChild(inner);

    this.renderMagicGrid(p, inner, ms);
    this.renderMagicTiles(inner, ms);
    this.renderMagicSums(inner, ms);

    inner.querySelector('#btn-magic-submit').addEventListener('click', () => {
      this.submitMagicSquare(p, inner, ms);
    });

    inner.querySelector('#btn-magic-reset').addEventListener('click', () => {
      Game.state.magicState = { grid: Array(9).fill(null), selected: null, used: new Set() };
      this.renderMagicGrid(p, inner, Game.state.magicState);
      this.renderMagicTiles(inner, Game.state.magicState);
      this.renderMagicSums(inner, Game.state.magicState);
      const fb = inner.querySelector('#magic-feedback');
      if (fb) fb.style.display = 'none';
    });
  },

  renderMagicGrid(p, inner, ms) {
    const grid = inner.querySelector('#magic-grid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.className = 'magic-cell' + (ms.grid[i] !== null ? ' filled' : '');
      cell.dataset.idx = i;
      cell.textContent = ms.grid[i] !== null ? ms.grid[i] : '';
      cell.addEventListener('click', () => {
        if (ms.selected !== null && ms.grid[i] === null) {
          ms.grid[i] = ms.selected;
          ms.used.add(ms.selected);
          ms.selected = null;
          this.renderMagicGrid(p, inner, ms);
          this.renderMagicTiles(inner, ms);
          this.renderMagicSums(inner, ms);
        } else if (ms.grid[i] !== null) {
          // Remove from cell
          ms.used.delete(ms.grid[i]);
          ms.grid[i] = null;
          this.renderMagicGrid(p, inner, ms);
          this.renderMagicTiles(inner, ms);
          this.renderMagicSums(inner, ms);
        }
      });
      grid.appendChild(cell);
    }
  },

  renderMagicTiles(inner, ms) {
    const tiles = inner.querySelector('#magic-tiles');
    if (!tiles) return;
    tiles.innerHTML = '';
    for (let n = 1; n <= 9; n++) {
      const tile = document.createElement('div');
      const isUsed = ms.used.has(n);
      const isSelected = ms.selected === n;
      tile.className = 'magic-tile' + (isSelected ? ' selected' : '') + (isUsed ? ' used' : '');
      tile.textContent = n;
      if (!isUsed) {
        tile.addEventListener('click', () => {
          ms.selected = ms.selected === n ? null : n;
          this.renderMagicTiles(inner, ms);
        });
      }
      tiles.appendChild(tile);
    }
  },

  renderMagicSums(inner, ms) {
    const sumEl = inner.querySelector('#magic-sums');
    if (!sumEl) return;
    const g = ms.grid;
    const rows = [[g[0],g[1],g[2]],[g[3],g[4],g[5]],[g[6],g[7],g[8]]];
    const cols = [[g[0],g[3],g[6]],[g[1],g[4],g[7]],[g[2],g[5],g[8]]];
    const diags = [[g[0],g[4],g[8]],[g[2],g[4],g[6]]];
    const sumStr = (arr) => {
      if (arr.some(v => v === null)) return '<span style="color:var(--text-faint)">?</span>';
      const s = arr.reduce((a,b)=>a+b,0);
      const cls = s === 15 ? 'magic-sum-ok' : 'magic-sum-bad';
      return `<span class="${cls}">${s}</span>`;
    };
    sumEl.innerHTML = `
      Rows: ${rows.map(r=>sumStr(r)).join(', ')} | Cols: ${cols.map(c=>sumStr(c)).join(', ')} | Diag: ${diags.map(d=>sumStr(d)).join(', ')}`;
  },

  submitMagicSquare(p, inner, ms) {
    const fb = inner.querySelector('#magic-feedback');
    if (ms.grid.includes(null)) {
      if (fb) { fb.textContent = '✗ Fill all 9 cells first.'; fb.className = 'puzzle-feedback wrong'; fb.style.display = 'block'; }
      return;
    }

    const sol = p.solution.flat();
    const correct = JSON.stringify(ms.grid) === JSON.stringify(sol);

    // Also check sums directly
    const g = ms.grid;
    const checks = [
      g[0]+g[1]+g[2], g[3]+g[4]+g[5], g[6]+g[7]+g[8],
      g[0]+g[3]+g[6], g[1]+g[4]+g[7], g[2]+g[5]+g[8],
      g[0]+g[4]+g[8], g[2]+g[4]+g[6]
    ];
    const sumsCorrect = checks.every(s => s === 15);

    if (sumsCorrect) {
      if (fb) { fb.textContent = '✓ Magic square solved!'; fb.className = 'puzzle-feedback correct'; fb.style.display = 'block'; }
      setTimeout(() => Game.revealHint(p.id), 700);
    } else {
      if (fb) {
        const wrong = checks.filter(s => s !== 15).length;
        fb.textContent = `✗ ${wrong} line(s) do not sum to 15. Rearrange.`;
        fb.className = 'puzzle-feedback wrong';
        fb.style.display = 'block';
      }
    }
  },

  // ────────────────────────────────────────
  // BINARY DECODE (Hint — Basement)
  // ────────────────────────────────────────
  renderBinaryDecode(p, container) {
    if (!Game.state.binaryState) {
      Game.state.binaryState = {};
    }
    const bs = Game.state.binaryState;

    const inner = document.createElement('div');
    inner.innerHTML = `
      <div class="puzzle-intro">${p.prompt.replace(/\n/g,'<br>')}</div>
      <div style="font-size:.8rem;color:var(--text-dim);margin-bottom:.75rem">Each 8-bit string = one ASCII character. Decimal value of 'A'=65, 'B'=66, etc.</div>
      <div class="binary-rows" id="binary-rows"></div>
      <div style="font-family:var(--mono);font-size:.85rem;margin:1rem 0;color:var(--text-dim)">
        Decoded word: <span id="binary-decoded" style="color:var(--gold);letter-spacing:.1em">????</span>
      </div>
      <button class="btn-submit" id="btn-binary-submit">Submit Answer</button>
      <div id="binary-feedback" class="puzzle-feedback" style="display:none"></div>`;
    container.appendChild(inner);

    const rows = inner.querySelector('#binary-rows');
    p.bytes.forEach((b, i) => {
      const row = document.createElement('div');
      row.className = 'binary-row';
      const inputId = `bin-input-${i}`;
      row.innerHTML = `
        <span class="binary-str">${b.binary}</span>
        <span class="binary-arrow">→</span>
        <span style="font-family:var(--mono);font-size:.75rem;color:var(--text-faint)">Dec:</span>
        <span style="font-family:var(--mono);font-size:.8rem;color:var(--text-dim)">${b.decimal}</span>
        <span style="font-family:var(--mono);font-size:.75rem;color:var(--text-faint)">→ Char:</span>
        <input class="binary-input" id="${inputId}" maxlength="1" placeholder="?" autocomplete="off">
        <span class="binary-result" id="bin-result-${i}">?</span>`;

      const input = row.querySelector(`#${inputId}`);
      input.addEventListener('input', () => {
        const val = input.value.toUpperCase();
        bs[i] = val;
        const resEl = inner.querySelector(`#bin-result-${i}`);
        if (val === b.answer) {
          input.className = 'binary-input ok';
          if (resEl) { resEl.className = 'binary-result revealed'; resEl.textContent = val; }
        } else if (val.length > 0) {
          input.className = 'binary-input bad';
          if (resEl) { resEl.className = 'binary-result'; resEl.textContent = '✗'; }
        } else {
          input.className = 'binary-input';
          if (resEl) { resEl.className = 'binary-result'; resEl.textContent = '?'; }
        }
        this.updateBinaryDecoded(p, inner, bs);
      });
      rows.appendChild(row);
    });

    inner.querySelector('#btn-binary-submit').addEventListener('click', () => {
      this.submitBinaryDecode(p, inner, bs);
    });
  },

  updateBinaryDecoded(p, inner, bs) {
    const decodedEl = inner.querySelector('#binary-decoded');
    if (!decodedEl) return;
    let word = '';
    for (let i = 0; i < p.bytes.length; i++) {
      word += (bs[i] && bs[i] === p.bytes[i].answer) ? bs[i] : '?';
    }
    decodedEl.textContent = word;
  },

  submitBinaryDecode(p, inner, bs) {
    const fb = inner.querySelector('#binary-feedback');
    const word = p.bytes.map((_,i) => bs[i] || '').join('').toUpperCase();
    const correct = word === p.finalAnswer;

    if (correct) {
      if (fb) { fb.textContent = '✓ Correct! Word decoded.'; fb.className = 'puzzle-feedback correct'; fb.style.display = 'block'; }
      setTimeout(() => Game.revealHint(p.id), 700);
    } else {
      if (fb) {
        fb.textContent = `✗ Decoded word "${word}" is incorrect. Check your binary conversions.`;
        fb.className = 'puzzle-feedback wrong';
        fb.style.display = 'block';
      }
    }
  }
};
