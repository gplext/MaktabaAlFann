// =============================================================================
// ADMIN.JS — Admin Console for Maktab-al-fann
// =============================================================================

const ADMIN_PW_KEY   = 'maf_admin_pw';
const ADMIN_DATA_KEY = 'maf_admin_data';

let adminState = {
  authenticated: false,
  tab: 'paintings',      // 'paintings' | 'artists'
  modal: null,           // null | { type, data }
};

// ── Persistence helpers ───────────────────────────────────────────────────────

function getAdminOverrides() {
  try { return JSON.parse(localStorage.getItem(ADMIN_DATA_KEY) || '{"paintings":[],"artists":[]}'); }
  catch { return { paintings: [], artists: [] }; }
}

function saveAdminOverrides(ov) {
  localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(ov));
}

function getAdminPassword() {
  return localStorage.getItem(ADMIN_PW_KEY) || 'admin';
}
// ── Approval queue helpers ────────────────────────────────────────────────────

function getArtistApps() {
  try { return JSON.parse(localStorage.getItem('maf_artist_apps') || '[]'); } catch(e) { return []; }
}
function getArtworkSubs() {
  try { return JSON.parse(localStorage.getItem('maf_artwork_subs') || '[]'); } catch(e) { return []; }
}
function saveArtistApps(arr) { localStorage.setItem('maf_artist_apps', JSON.stringify(arr)); }
function saveArtworkSubs(arr) { localStorage.setItem('maf_artwork_subs', JSON.stringify(arr)); }

// ── Apply a painting change to ART_DATA + DB + localStorage ──────────────────

function adminSavePainting(painting, deleted) {
  const ov = getAdminOverrides();
  const idx = ov.paintings.findIndex(p => p.id === painting.id);
  const entry = deleted ? { id: painting.id, _deleted: true } : painting;
  if (idx > -1) ov.paintings[idx] = entry;
  else ov.paintings.push(entry);
  saveAdminOverrides(ov);

  // Sync ART_DATA
  const ai = ART_DATA.paintings.findIndex(p => p.id === painting.id);
  if (deleted) {
    if (ai > -1) ART_DATA.paintings.splice(ai, 1);
  } else if (ai > -1) {
    ART_DATA.paintings[ai] = painting;
  } else {
    ART_DATA.paintings.push(painting);
  }

  // Sync DB
  if (typeof DB !== 'undefined' && DB) {
    try {
      if (deleted) {
        DB.run('DELETE FROM paintings WHERE id = ?', [painting.id]);
      } else if (ai > -1) {
        DB.run(
          `UPDATE paintings SET title=?,artist_id=?,year=?,style_id=?,price=?,
           country_origin=?,country_depicted=?,culture_depicted=?,history_context=?,
           significance=?,technique=?,image_hue=?,image_sat=?,colors=?,width_cm=?,height_cm=?
           WHERE id=?`,
          [painting.title, painting.artist_id, painting.year, painting.style_id, painting.price,
           painting.country_origin||'', painting.country_depicted||'', painting.culture_depicted||'',
           painting.history_context||'', painting.significance||'', painting.technique||'',
           painting.image_hue||'30', painting.image_sat||'70',
           JSON.stringify(painting.colors||[]), painting.width_cm||60, painting.height_cm||80,
           painting.id]
        );
      } else {
        DB.run(
          `INSERT INTO paintings
           (id,title,artist_id,year,style_id,country_origin,country_depicted,culture_depicted,
            history_context,colors,width_cm,height_cm,price,significance,technique,frames,image_hue,image_sat)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [painting.id, painting.title, painting.artist_id, painting.year, painting.style_id,
           painting.country_origin||'', painting.country_depicted||'', painting.culture_depicted||'',
           painting.history_context||'', JSON.stringify(painting.colors||[]),
           painting.width_cm||60, painting.height_cm||80, painting.price,
           painting.significance||'', painting.technique||'',
           JSON.stringify(painting.frames||[]), painting.image_hue||'30', painting.image_sat||'70']
        );
      }
    } catch(e) { console.warn('Admin DB sync error:', e); }
  }
}

function adminSaveArtist(artist, deleted) {
  const ov = getAdminOverrides();
  const idx = ov.artists.findIndex(a => a.id === artist.id);
  const entry = deleted ? { id: artist.id, _deleted: true } : artist;
  if (idx > -1) ov.artists[idx] = entry;
  else ov.artists.push(entry);
  saveAdminOverrides(ov);

  const ai = ART_DATA.artists.findIndex(a => a.id === artist.id);
  if (deleted) {
    if (ai > -1) ART_DATA.artists.splice(ai, 1);
  } else if (ai > -1) {
    ART_DATA.artists[ai] = artist;
  } else {
    ART_DATA.artists.push(artist);
  }

  if (typeof DB !== 'undefined' && DB) {
    try {
      if (deleted) {
        DB.run('DELETE FROM artists WHERE id = ?', [artist.id]);
      } else if (ai > -1) {
        DB.run(
          `UPDATE artists SET name=?,born=?,died=?,nationality=?,bio=?,notable_for=?,
           awards=?,profile_color=?,style_ids=? WHERE id=?`,
          [artist.name, artist.born||null, artist.died||null, artist.nationality||'',
           artist.bio||'', artist.notable_for||'', artist.awards||'', artist.profile_color||'#8b6914',
           JSON.stringify(artist.style_ids||[]), artist.id]
        );
      } else {
        DB.run(
          `INSERT INTO artists (id,name,born,died,nationality,style_ids,bio,notable_for,awards,profile_color)
           VALUES (?,?,?,?,?,?,?,?,?,?)`,
          [artist.id, artist.name, artist.born||null, artist.died||null, artist.nationality||'',
           JSON.stringify(artist.style_ids||[]), artist.bio||'', artist.notable_for||'',
           artist.awards||'', artist.profile_color||'#8b6914']
        );
      }
    } catch(e) { console.warn('Admin DB sync error:', e); }
  }
}

// ── Next ID helpers ───────────────────────────────────────────────────────────

function nextPaintingId() {
  return Math.max(0, ...ART_DATA.paintings.map(p => p.id)) + 1;
}

function nextArtistId() {
  return Math.max(0, ...ART_DATA.artists.map(a => a.id)) + 1;
}

// ── Render ────────────────────────────────────────────────────────────────────

function renderAdmin() {
  const page = document.getElementById('page-admin');
  if (!page) return;

  if (!adminState.authenticated) {
    page.innerHTML = buildAdminLogin();
    initAdminLoginHandlers();
    return;
  }

  page.innerHTML = buildAdminPanel();
  initAdminHandlers();
}

// ── Login Screen ──────────────────────────────────────────────────────────────

function buildAdminLogin() {
  return `
  <div class="adm-wrap">
    <div class="adm-login-box">
      <div class="adm-login-logo">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="8" fill="hsl(42,55%,28%)"/>
          <path d="M18 8 L28 28 H8 Z" fill="hsl(42,80%,75%)" opacity=".9"/>
          <circle cx="18" cy="16" r="3" fill="hsl(42,30%,20%)"/>
        </svg>
        <span>Admin Console</span>
      </div>
      <h2 class="adm-login-title">Maktab-al-fann</h2>
      <p class="adm-login-sub">Sign in to manage your gallery content</p>
      <div class="adm-field">
        <label class="adm-label">Password</label>
        <input type="password" id="admPwInput" class="adm-input" placeholder="Enter admin password" autocomplete="current-password"/>
      </div>
      <button class="adm-btn adm-btn-primary" id="admLoginBtn">Sign In</button>
      <div id="admLoginErr" class="adm-error" style="display:none">Incorrect password. Default is <strong>admin</strong></div>
      <p class="adm-login-hint">Access this panel via <code>#admin</code> in the URL</p>
    </div>
  </div>`;
}

function initAdminLoginHandlers() {
  document.getElementById('admLoginBtn').addEventListener('click', doAdminLogin);
  document.getElementById('admPwInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') doAdminLogin();
  });
  setTimeout(() => document.getElementById('admPwInput')?.focus(), 50);
}

function doAdminLogin() {
  const pw = document.getElementById('admPwInput').value;
  if (pw === getAdminPassword()) {
    adminState.authenticated = true;
    renderAdmin();
  } else {
    document.getElementById('admLoginErr').style.display = 'block';
    document.getElementById('admPwInput').value = '';
    document.getElementById('admPwInput').focus();
  }
}

// ── Main Panel ────────────────────────────────────────────────────────────────

function buildAdminPanel() {
  return `
  <div class="adm-wrap">
    <div class="adm-topbar">
      <div class="adm-topbar-left">
        <span class="adm-topbar-logo">مكتب الفن</span>
        <span class="adm-topbar-title">Admin Console</span>
      </div>
      <div class="adm-topbar-right">
        <button class="adm-btn adm-btn-ghost" id="admChangePwBtn">Change Password</button>
        <button class="adm-btn adm-btn-ghost" id="admExportBtn">Export data.js</button>
        <button class="adm-btn adm-btn-outline" id="admLogoutBtn">Sign Out</button>
      </div>
    </div>

    <div class="adm-tabs">
      <button class="adm-tab ${adminState.tab === 'paintings' ? 'adm-tab-active' : ''}" data-tab="paintings">
        Paintings <span class="adm-tab-count">${ART_DATA.paintings.length}</span>
      </button>
      <button class="adm-tab ${adminState.tab === 'artists' ? 'adm-tab-active' : ''}" data-tab="artists">
        Artists <span class="adm-tab-count">${ART_DATA.artists.length}</span>
      </button>
      <button class="adm-tab ${adminState.tab === 'approvals' ? 'adm-tab-active' : ''}" data-tab="approvals">
        Approvals ${(function(){ var p=getArtistApps().filter(function(a){return a.status==='pending';}).length + getArtworkSubs().filter(function(s){return s.status==='pending';}).length; return p ? '<span class="adm-tab-count adm-tab-count-alert">'+p+'</span>' : ''; })()}
      </button>
    </div>

    <div class="adm-content" id="admContent">
      ${adminState.tab === 'paintings' ? buildPaintingsTab() : adminState.tab === 'artists' ? buildArtistsTab() : buildApprovalsTab()}
    </div>

    ${buildAdminModal()}
  </div>`;
}

// ── Paintings Tab ─────────────────────────────────────────────────────────────

function buildPaintingsTab() {
  const paintings = [...ART_DATA.paintings].sort((a, b) => a.id - b.id);
  return `
  <div class="adm-section-header">
    <div>
      <h3 class="adm-section-title">Paintings</h3>
      <p class="adm-section-sub">${paintings.length} artworks in collection</p>
    </div>
    <button class="adm-btn adm-btn-primary" id="admAddPainting">+ Add Painting</button>
  </div>
  <div class="adm-table-wrap">
    <table class="adm-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Artist</th>
          <th>Year</th>
          <th>Style</th>
          <th>Price (£)</th>
          <th style="width:120px">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${paintings.map(p => {
          const artist = ART_DATA.artists.find(a => a.id === p.artist_id);
          const style  = ART_DATA.styles.find(s => s.id === p.style_id);
          return `
          <tr>
            <td class="adm-id">${p.id}</td>
            <td class="adm-bold">${p.title}</td>
            <td>${artist ? artist.name : '—'}</td>
            <td>${p.year}</td>
            <td><span class="adm-badge">${style ? style.name : '—'}</span></td>
            <td>£${Number(p.price||0).toLocaleString()}</td>
            <td>
              <button class="adm-act-btn adm-edit" data-type="painting" data-id="${p.id}">Edit</button>
              <button class="adm-act-btn adm-del"  data-type="painting" data-id="${p.id}">Delete</button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>`;
}

// ── Artists Tab ───────────────────────────────────────────────────────────────

function buildArtistsTab() {
  const artists = [...ART_DATA.artists].sort((a, b) => a.id - b.id);
  return `
  <div class="adm-section-header">
    <div>
      <h3 class="adm-section-title">Artists</h3>
      <p class="adm-section-sub">${artists.length} artists in collection</p>
    </div>
    <button class="adm-btn adm-btn-primary" id="admAddArtist">+ Add Artist</button>
  </div>
  <div class="adm-table-wrap">
    <table class="adm-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Nationality</th>
          <th>Born</th>
          <th>Died</th>
          <th>Works</th>
          <th style="width:120px">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${artists.map(a => {
          const workCount = ART_DATA.paintings.filter(p => p.artist_id === a.id).length;
          return `
          <tr>
            <td class="adm-id">${a.id}</td>
            <td class="adm-bold">${a.name}</td>
            <td>${a.nationality||'—'}</td>
            <td>${a.born||'—'}</td>
            <td>${a.died||'—'}</td>
            <td><span class="adm-badge">${workCount}</span></td>
            <td>
              <button class="adm-act-btn adm-edit" data-type="artist" data-id="${a.id}">Edit</button>
              <button class="adm-act-btn adm-del"  data-type="artist" data-id="${a.id}">Delete</button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>`;
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function buildAdminModal() {
  return `
  <div class="adm-modal-overlay" id="admModalOverlay" style="display:none">
    <div class="adm-modal" id="admModal">
      <div class="adm-modal-header">
        <h3 id="admModalTitle">Edit</h3>
        <button class="adm-modal-close" id="admModalClose">✕</button>
      </div>
      <div class="adm-modal-body" id="admModalBody"></div>
      <div class="adm-modal-footer">
        <button class="adm-btn adm-btn-ghost" id="admModalCancel">Cancel</button>
        <button class="adm-btn adm-btn-primary" id="admModalSave">Save</button>
      </div>
    </div>
  </div>`;
}

// ── Painting Form ─────────────────────────────────────────────────────────────

function buildPaintingForm(p) {
  const artistOptions = ART_DATA.artists.map(a =>
    `<option value="${a.id}" ${p && p.artist_id === a.id ? 'selected' : ''}>${a.name}</option>`
  ).join('');
  const styleOptions = ART_DATA.styles.map(s =>
    `<option value="${s.id}" ${p && p.style_id === s.id ? 'selected' : ''}>${s.name}</option>`
  ).join('');

  return `
  <div class="adm-form-grid">
    <div class="adm-field adm-col2">
      <label class="adm-label">Title *</label>
      <input class="adm-input" id="pf-title" value="${p ? esc(p.title) : ''}" placeholder="Painting title"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Artist *</label>
      <select class="adm-input adm-select" id="pf-artist">
        <option value="">— select artist —</option>
        ${artistOptions}
      </select>
    </div>
    <div class="adm-field">
      <label class="adm-label">Style *</label>
      <select class="adm-input adm-select" id="pf-style">
        <option value="">— select style —</option>
        ${styleOptions}
      </select>
    </div>
    <div class="adm-field">
      <label class="adm-label">Year</label>
      <input class="adm-input" id="pf-year" type="number" value="${p ? p.year : new Date().getFullYear()}" min="1000" max="2099"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Price (£)</label>
      <input class="adm-input" id="pf-price" type="number" value="${p ? p.price : ''}" min="0"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Country of Origin</label>
      <input class="adm-input" id="pf-origin" value="${p ? esc(p.country_origin||'') : ''}" placeholder="e.g. Pakistan"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Country Depicted</label>
      <input class="adm-input" id="pf-depicted" value="${p ? esc(p.country_depicted||'') : ''}" placeholder="e.g. Mughal Empire"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Culture Depicted</label>
      <input class="adm-input" id="pf-culture" value="${p ? esc(p.culture_depicted||'') : ''}" placeholder="e.g. Mughal"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Technique</label>
      <input class="adm-input" id="pf-technique" value="${p ? esc(p.technique||'') : ''}" placeholder="e.g. Gouache on wasli paper"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Width (cm)</label>
      <input class="adm-input" id="pf-w" type="number" value="${p ? p.width_cm : 60}" min="1"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Height (cm)</label>
      <input class="adm-input" id="pf-h" type="number" value="${p ? p.height_cm : 80}" min="1"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Image Hue (0–360)</label>
      <input class="adm-input" id="pf-hue" type="number" value="${p ? p.image_hue : 30}" min="0" max="360"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Image Saturation (0–100)</label>
      <input class="adm-input" id="pf-sat" type="number" value="${p ? p.image_sat : 70}" min="0" max="100"/>
    </div>
    <div class="adm-field adm-col2">
      <label class="adm-label">Historical Context</label>
      <textarea class="adm-input adm-textarea" id="pf-history" placeholder="Historical context...">${p ? esc(p.history_context||'') : ''}</textarea>
    </div>
    <div class="adm-field adm-col2">
      <label class="adm-label">Significance</label>
      <textarea class="adm-input adm-textarea" id="pf-sig" placeholder="Cultural significance...">${p ? esc(p.significance||'') : ''}</textarea>
    </div>
    <div class="adm-field adm-col2">
      <label class="adm-label">Colors (comma-separated hex, e.g. #8B0000,#FFD700)</label>
      <input class="adm-input" id="pf-colors" value="${p && p.colors ? p.colors.join(',') : ''}" placeholder="#8B0000,#FFD700,#1a0a00"/>
    </div>
  </div>`;
}

// ── Artist Form ───────────────────────────────────────────────────────────────

function buildArtistForm(a) {
  const styleCheckboxes = ART_DATA.styles.map(s => {
    const checked = a && (a.style_ids||[]).includes(s.id) ? 'checked' : '';
    return `<label class="adm-check-label"><input type="checkbox" class="adm-style-check" value="${s.id}" ${checked}/> ${s.name}</label>`;
  }).join('');

  return `
  <div class="adm-form-grid">
    <div class="adm-field adm-col2">
      <label class="adm-label">Name *</label>
      <input class="adm-input" id="af-name" value="${a ? esc(a.name) : ''}" placeholder="Artist full name"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Nationality</label>
      <input class="adm-input" id="af-nat" value="${a ? esc(a.nationality||'') : ''}" placeholder="e.g. Pakistani"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Birth Year</label>
      <input class="adm-input" id="af-born" type="number" value="${a ? (a.born||'') : ''}" placeholder="e.g. 1952"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Death Year (leave blank if alive)</label>
      <input class="adm-input" id="af-died" type="number" value="${a ? (a.died||'') : ''}" placeholder="e.g. 2010"/>
    </div>
    <div class="adm-field">
      <label class="adm-label">Profile Color (hex)</label>
      <div style="display:flex;gap:.5rem;align-items:center">
        <input class="adm-input" id="af-color" value="${a ? esc(a.profile_color||'#8b6914') : '#8b6914'}" placeholder="#8b6914" style="flex:1"/>
        <input type="color" id="af-color-pick" value="${a ? (a.profile_color||'#8b6914') : '#8b6914'}" style="width:38px;height:38px;border:none;padding:0;background:none;cursor:pointer"/>
      </div>
    </div>
    <div class="adm-field adm-col2">
      <label class="adm-label">Art Styles</label>
      <div class="adm-style-checks">${styleCheckboxes}</div>
    </div>
    <div class="adm-field adm-col2">
      <label class="adm-label">Biography</label>
      <textarea class="adm-input adm-textarea" id="af-bio" placeholder="Artist biography...">${a ? esc(a.bio||'') : ''}</textarea>
    </div>
    <div class="adm-field adm-col2">
      <label class="adm-label">Notable For</label>
      <textarea class="adm-input adm-textarea adm-textarea-sm" id="af-notable" placeholder="What is this artist known for?">${a ? esc(a.notable_for||'') : ''}</textarea>
    </div>
    <div class="adm-field adm-col2">
      <label class="adm-label">Awards</label>
      <input class="adm-input" id="af-awards" value="${a ? esc(a.awards||'') : ''}" placeholder="e.g. National Pride Award 2001"/>
    </div>
  </div>`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function openAdminModal(title, bodyHtml, onSave) {
  document.getElementById('admModalTitle').textContent = title;
  document.getElementById('admModalBody').innerHTML = bodyHtml;
  document.getElementById('admModalOverlay').style.display = 'flex';
  document.getElementById('admModalSave').onclick = onSave;

  // Color picker sync for artist form
  const colorInput = document.getElementById('af-color');
  const colorPick  = document.getElementById('af-color-pick');
  if (colorInput && colorPick) {
    colorInput.addEventListener('input', () => { try { colorPick.value = colorInput.value; } catch {} });
    colorPick.addEventListener('input', () => { colorInput.value = colorPick.value; });
  }
}

function closeAdminModal() {
  document.getElementById('admModalOverlay').style.display = 'none';
}

function refreshAdmContent() {
  document.getElementById('admContent').innerHTML =
    adminState.tab === 'paintings' ? buildPaintingsTab() : adminState.tab === 'artists' ? buildArtistsTab() : buildApprovalsTab();
  bindAdmContentHandlers();
}

// ── Event Handlers ────────────────────────────────────────────────────────────

function initAdminHandlers() {
  // Tabs
  document.querySelectorAll('.adm-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      adminState.tab = btn.dataset.tab;
      document.querySelectorAll('.adm-tab').forEach(b => b.classList.remove('adm-tab-active'));
      btn.classList.add('adm-tab-active');
      document.getElementById('admContent').innerHTML =
        adminState.tab === 'paintings' ? buildPaintingsTab() : adminState.tab === 'artists' ? buildArtistsTab() : buildApprovalsTab();
      bindAdmContentHandlers();
    });
  });

  // Top bar buttons
  document.getElementById('admLogoutBtn').addEventListener('click', () => {
    adminState.authenticated = false;
    renderAdmin();
  });

  document.getElementById('admExportBtn').addEventListener('click', exportDataJs);

  document.getElementById('admChangePwBtn').addEventListener('click', () => {
    const np = prompt('Enter new admin password (min 4 chars):');
    if (np && np.length >= 4) {
      localStorage.setItem(ADMIN_PW_KEY, np);
      alert('Password updated. Remember it — there is no recovery.');
    } else if (np !== null) {
      alert('Password too short (min 4 chars).');
    }
  });

  // Modal close
  document.getElementById('admModalClose').addEventListener('click', closeAdminModal);
  document.getElementById('admModalCancel').addEventListener('click', closeAdminModal);
  document.getElementById('admModalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('admModalOverlay')) closeAdminModal();
  });

  bindAdmContentHandlers();
}

function bindAdmContentHandlers() {
  // Add buttons
  document.getElementById('admAddPainting')?.addEventListener('click', () => {
    openAdminModal('Add Painting', buildPaintingForm(null), savePaintingFromForm.bind(null, null));
  });
  document.getElementById('admAddArtist')?.addEventListener('click', () => {
    openAdminModal('Add Artist', buildArtistForm(null), saveArtistFromForm.bind(null, null));
  });

  // Edit / Delete buttons
  document.querySelectorAll('.adm-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const { type, id } = btn.dataset;
      const numId = parseInt(id);
      if (type === 'painting') {
        const p = ART_DATA.paintings.find(p => p.id === numId);
        openAdminModal('Edit Painting', buildPaintingForm(p), savePaintingFromForm.bind(null, p));
      } else {
        const a = ART_DATA.artists.find(a => a.id === numId);
        openAdminModal('Edit Artist', buildArtistForm(a), saveArtistFromForm.bind(null, a));
        // Re-bind color picker (modal re-renders body)
        setTimeout(() => {
          const ci = document.getElementById('af-color');
          const cp = document.getElementById('af-color-pick');
          if (ci && cp) {
            ci.addEventListener('input', () => { try { cp.value = ci.value; } catch {} });
            cp.addEventListener('input', () => { ci.value = cp.value; });
          }
        }, 50);
      }
    });
  });

  document.querySelectorAll('.adm-del').forEach(btn => {
    btn.addEventListener('click', () => {
      const { type, id } = btn.dataset;
      const numId = parseInt(id);
      const label = type === 'painting'
        ? ART_DATA.paintings.find(p => p.id === numId)?.title
        : ART_DATA.artists.find(a => a.id === numId)?.name;
      if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
      if (type === 'painting') {
        adminSavePainting({ id: numId }, true);
      } else {
        adminSaveArtist({ id: numId }, true);
      }
      refreshAdmContent();
    });
  });
}

// ── Save from forms ───────────────────────────────────────────────────────────

function savePaintingFromForm(existing) {
  const title     = document.getElementById('pf-title').value.trim();
  const artistId  = parseInt(document.getElementById('pf-artist').value);
  const styleId   = parseInt(document.getElementById('pf-style').value);
  const year      = parseInt(document.getElementById('pf-year').value) || new Date().getFullYear();
  const price     = parseFloat(document.getElementById('pf-price').value) || 0;
  const origin    = document.getElementById('pf-origin').value.trim();
  const depicted  = document.getElementById('pf-depicted').value.trim();
  const culture   = document.getElementById('pf-culture').value.trim();
  const technique = document.getElementById('pf-technique').value.trim();
  const w         = parseFloat(document.getElementById('pf-w').value) || 60;
  const h         = parseFloat(document.getElementById('pf-h').value) || 80;
  const hue       = document.getElementById('pf-hue').value || '30';
  const sat       = document.getElementById('pf-sat').value || '70';
  const history   = document.getElementById('pf-history').value.trim();
  const sig       = document.getElementById('pf-sig').value.trim();
  const colorsRaw = document.getElementById('pf-colors').value;
  const colors    = colorsRaw.split(',').map(c => c.trim()).filter(Boolean);

  if (!title)         { alert('Title is required.'); return; }
  if (isNaN(artistId)){ alert('Please select an artist.'); return; }
  if (isNaN(styleId)) { alert('Please select a style.'); return; }

  const painting = {
    ...(existing || {}),
    id: existing ? existing.id : nextPaintingId(),
    title, artist_id: artistId, style_id: styleId, year, price,
    country_origin: origin, country_depicted: depicted, culture_depicted: culture,
    technique, width_cm: w, height_cm: h, image_hue: hue, image_sat: sat,
    history_context: history, significance: sig, colors,
    frames: existing ? (existing.frames || []) : [],
  };

  adminSavePainting(painting, false);
  closeAdminModal();
  refreshAdmContent();
}

function saveArtistFromForm(existing) {
  const name    = document.getElementById('af-name').value.trim();
  const nat     = document.getElementById('af-nat').value.trim();
  const born    = parseInt(document.getElementById('af-born').value) || null;
  const diedVal = document.getElementById('af-died').value.trim();
  const died    = diedVal ? parseInt(diedVal) : null;
  const color   = document.getElementById('af-color').value.trim() || '#8b6914';
  const bio     = document.getElementById('af-bio').value.trim();
  const notable = document.getElementById('af-notable').value.trim();
  const awards  = document.getElementById('af-awards').value.trim();
  const styleIds = [...document.querySelectorAll('.adm-style-check:checked')].map(c => parseInt(c.value));

  if (!name) { alert('Name is required.'); return; }

  const artist = {
    ...(existing || {}),
    id: existing ? existing.id : nextArtistId(),
    name, nationality: nat, born, died,
    profile_color: color, bio, notable_for: notable,
    awards, style_ids: styleIds,
  };

  adminSaveArtist(artist, false);
  closeAdminModal();
  refreshAdmContent();
}

// ── Export data.js ────────────────────────────────────────────────────────────

function exportDataJs() {
  const content = `// AUTO-EXPORTED from Maktab-al-fann Admin Console\n// Generated: ${new Date().toISOString()}\n// Replace your existing js/data.js with this file\n\nconst ART_DATA = ${JSON.stringify({ ...ART_DATA, paintings: ART_DATA.paintings, artists: ART_DATA.artists }, null, 2)};\n`;
  const blob = new Blob([content], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'data-exported.js';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// =============================================================================
// APPROVALS TAB — artist applications + artwork submissions
// =============================================================================

function buildApprovalsTab() {
  var apps  = getArtistApps();
  var subs  = getArtworkSubs();
  var pendingApps = apps.filter(function(a) { return a.status === 'pending'; });
  var pendingSubs = subs.filter(function(s) { return s.status === 'pending'; });
  var allApps     = apps.slice().reverse();
  var allSubs     = subs.slice().reverse();

  function statusBadge(st) {
    var color = st === 'approved' ? 'hsl(140,50%,35%)' : st === 'rejected' ? 'hsl(0,55%,45%)' : 'hsl(42,55%,40%)';
    var label = st === 'approved' ? 'Approved' : st === 'rejected' ? 'Rejected' : 'Pending';
    return '<span class="adm-status-badge" style="background:' + color + '">' + label + '</span>';
  }

  var appRows = allApps.length ? allApps.map(function(a) {
    var isPending = a.status === 'pending';
    return '<tr class="adm-tr">' +
      '<td class="adm-td"><strong>' + a.name + '</strong><br><small>' + a.email + '</small></td>' +
      '<td class="adm-td">' + a.nationality + '</td>' +
      '<td class="adm-td">' + a.specialization + '</td>' +
      '<td class="adm-td adm-td-bio">' + (a.bio || '').substring(0, 100) + '...</td>' +
      '<td class="adm-td">' + statusBadge(a.status) + '</td>' +
      '<td class="adm-td">' +
      (isPending
        ? '<button class="adm-btn adm-btn-sm adm-btn-approve" data-approve-app="' + a.id + '">Approve</button> ' +
          '<button class="adm-btn adm-btn-sm adm-btn-reject"  data-reject-app="'  + a.id + '">Reject</button>'
        : '<button class="adm-btn adm-btn-sm adm-btn-ghost" data-undo-app="' + a.id + '">Undo</button>') +
      '</td>' +
      '</tr>';
  }).join('') : '<tr><td colspan="6" class="adm-td adm-td-empty">No artist applications yet.</td></tr>';

  var subRows = allSubs.length ? allSubs.map(function(s) {
    var isPending = s.status === 'pending';
    return '<tr class="adm-tr">' +
      '<td class="adm-td"><strong>' + s.title + '</strong></td>' +
      '<td class="adm-td">' + s.artistName + '</td>' +
      '<td class="adm-td">' + s.styleName + '</td>' +
      '<td class="adm-td">' + s.year + '</td>' +
      '<td class="adm-td">' + (s.medium || '') + '</td>' +
      '<td class="adm-td adm-td-bio">' + (s.description || '').substring(0, 80) + '...</td>' +
      '<td class="adm-td">' + statusBadge(s.status) + '</td>' +
      '<td class="adm-td">' +
      (isPending
        ? '<button class="adm-btn adm-btn-sm adm-btn-approve" data-approve-sub="' + s.id + '">Approve</button> ' +
          '<button class="adm-btn adm-btn-sm adm-btn-reject"  data-reject-sub="'  + s.id + '">Reject</button>'
        : '<button class="adm-btn adm-btn-sm adm-btn-ghost" data-undo-sub="' + s.id + '">Undo</button>') +
      '</td>' +
      '</tr>';
  }).join('') : '<tr><td colspan="8" class="adm-td adm-td-empty">No artwork submissions yet.</td></tr>';

  return '<div class="adm-approvals-wrap">' +

    // Artist Applications section
    '<div class="adm-section-header">' +
    '<h3 class="adm-section-title">Artist Applications</h3>' +
    '<span class="adm-tab-count' + (pendingApps.length ? ' adm-tab-count-alert' : '') + '">' +
    pendingApps.length + ' pending</span>' +
    '</div>' +
    '<div class="adm-table-wrap">' +
    '<table class="adm-table"><thead><tr>' +
    '<th class="adm-th">Artist</th><th class="adm-th">Nationality</th>' +
    '<th class="adm-th">Specialisation</th><th class="adm-th">Bio</th>' +
    '<th class="adm-th">Status</th><th class="adm-th">Actions</th>' +
    '</tr></thead><tbody>' + appRows + '</tbody></table>' +
    '</div>' +

    // Artwork Submissions section
    '<div class="adm-section-header" style="margin-top:3rem;">' +
    '<h3 class="adm-section-title">Artwork Submissions</h3>' +
    '<span class="adm-tab-count' + (pendingSubs.length ? ' adm-tab-count-alert' : '') + '">' +
    pendingSubs.length + ' pending</span>' +
    '</div>' +
    '<div class="adm-table-wrap">' +
    '<table class="adm-table"><thead><tr>' +
    '<th class="adm-th">Title</th><th class="adm-th">Artist</th>' +
    '<th class="adm-th">Style</th><th class="adm-th">Year</th>' +
    '<th class="adm-th">Medium</th><th class="adm-th">Description</th>' +
    '<th class="adm-th">Status</th><th class="adm-th">Actions</th>' +
    '</tr></thead><tbody>' + subRows + '</tbody></table>' +
    '</div>' +

    '</div>';
}

// ── Approval actions ──────────────────────────────────────────────────────────

function approveArtistApp(id) {
  var apps = getArtistApps();
  var app  = apps.find(function(a) { return a.id === id; });
  if (!app) return;
  app.status = 'approved';
  saveArtistApps(apps);

  // Add artist to ART_DATA + admin overrides
  var newId = Date.now();
  var artist = {
    id: newId, name: app.name, bio: app.bio,
    nationality: app.nationality, specialization: app.specialization,
    contactEmail: app.email, websiteUrl: app.website || '',
    profile_color: 'hsl(350,45%,25%)', isVerified: true
  };
  adminSaveArtist(artist, false);
  app.assignedArtistId = newId;
  saveArtistApps(apps);
  refreshAdmContent();
}

function rejectArtistApp(id) {
  var apps = getArtistApps();
  var app  = apps.find(function(a) { return a.id === id; });
  if (app) { app.status = 'rejected'; saveArtistApps(apps); }
  refreshAdmContent();
}

function undoArtistApp(id) {
  var apps = getArtistApps();
  var app  = apps.find(function(a) { return a.id === id; });
  if (app) { app.status = 'pending'; saveArtistApps(apps); }
  refreshAdmContent();
}

function approveArtworkSub(id) {
  var subs = getArtworkSubs();
  var sub  = subs.find(function(s) { return s.id === id; });
  if (!sub) return;
  sub.status = 'approved';
  saveArtworkSubs(subs);

  // Find the approved artist to link artist_id
  var apps     = getArtistApps();
  var artistApp = apps.find(function(a) { return a.id === sub.artistAppId; });
  var artistId  = artistApp && artistApp.assignedArtistId ? artistApp.assignedArtistId : 0;
  var artistObj = ART_DATA.artists.find(function(a) { return a.id === artistId; });

  var newId = Date.now();
  var painting = {
    id: newId,
    title: sub.title,
    artist_id: artistId,
    artist_name: sub.artistName,
    year: sub.year,
    style_id: parseInt(sub.styleId) || 1,
    style_name: sub.styleName || '',
    price: sub.price || 0,
    medium: sub.medium || '',
    dimensions: sub.dimensions || '',
    history_context: sub.description || '',
    colors: ['hsl(350,45%,28%)','hsl(42,60%,40%)','hsl(215,45%,30%)']
  };
  adminSavePainting(painting, false);
  sub.assignedPaintingId = newId;
  saveArtworkSubs(subs);
  refreshAdmContent();
}

function rejectArtworkSub(id) {
  var subs = getArtworkSubs();
  var sub  = subs.find(function(s) { return s.id === id; });
  if (sub) { sub.status = 'rejected'; saveArtworkSubs(subs); }
  refreshAdmContent();
}

function undoArtworkSub(id) {
  var subs = getArtworkSubs();
  var sub  = subs.find(function(s) { return s.id === id; });
  if (sub) { sub.status = 'pending'; saveArtworkSubs(subs); }
  refreshAdmContent();
}

// Hook approval buttons into bindAdmContentHandlers (called via event delegation)
(function patchBind() {
  var _orig = bindAdmContentHandlers;
  bindAdmContentHandlers = function() {
    _orig();
    // Artist app buttons
    document.querySelectorAll('[data-approve-app]').forEach(function(btn) {
      btn.addEventListener('click', function() { approveArtistApp(btn.dataset.approveApp); });
    });
    document.querySelectorAll('[data-reject-app]').forEach(function(btn) {
      btn.addEventListener('click', function() { rejectArtistApp(btn.dataset.rejectApp); });
    });
    document.querySelectorAll('[data-undo-app]').forEach(function(btn) {
      btn.addEventListener('click', function() { undoArtistApp(btn.dataset.undoApp); });
    });
    // Artwork sub buttons
    document.querySelectorAll('[data-approve-sub]').forEach(function(btn) {
      btn.addEventListener('click', function() { approveArtworkSub(btn.dataset.approveSub); });
    });
    document.querySelectorAll('[data-reject-sub]').forEach(function(btn) {
      btn.addEventListener('click', function() { rejectArtworkSub(btn.dataset.rejectSub); });
    });
    document.querySelectorAll('[data-undo-sub]').forEach(function(btn) {
      btn.addEventListener('click', function() { undoArtworkSub(btn.dataset.undoSub); });
    });
  };
})();
