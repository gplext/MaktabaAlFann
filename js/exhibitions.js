// =============================================================================
// EXHIBITIONS PAGE — Featured hero + city search + upcoming grid
// =============================================================================

function renderExhibitions() {
  const el = document.getElementById('page-exhibitions');
  const exhibitions = ART_DATA.external_exhibitions || [];

  // Pick featured (current/active) exhibition
  const now = new Date();
  const active = exhibitions.find(e =>
    new Date(e.start_date) <= now && new Date(e.end_date) >= now
  ) || exhibitions[0];

  // Upcoming = future exhibitions
  const upcoming = exhibitions
    .filter(e => new Date(e.start_date) > now)
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

  // Past
  const past = exhibitions
    .filter(e => new Date(e.end_date) < now)
    .sort((a, b) => new Date(b.end_date) - new Date(a.end_date));

  el.innerHTML = `
    <!-- ── Featured hero ── -->
    <div class="exh-hero-section">
      <div class="exh-hero-image">
        ${buildExhHeroVisual(active)}
      </div>
      <div class="exh-hero-info">
        <span class="exh-hero-status">${getStatusLabel(active)}</span>
        <h1 class="exh-hero-title">${active.title}</h1>
        <p class="exh-hero-curator">${active.venue || ''}</p>
        <div class="exh-hero-rule"></div>
        <p class="exh-hero-dates">${formatDateRange(active.start_date, active.end_date)}</p>
        <p class="exh-hero-desc">${active.description || ''}</p>
        <div class="exh-hero-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${active.city}, ${active.country}
        </div>
      </div>
    </div>

    <!-- ── City search ── -->
    <div class="exh-search-section">
      <h2 class="exh-search-heading">Find Exhibitions Near You</h2>
      <div class="exh-search-bar">
        <input type="text" id="exhCityInput" class="exh-search-input"
               placeholder="Enter your city…" aria-label="Search by city" />
        <button class="exh-search-btn" id="exhSearchBtn" aria-label="Search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
      </div>
      <div id="exhCityResults" class="exh-city-results"></div>
    </div>

    <!-- ── Upcoming ── -->
    <div class="exh-list-section">
      <div class="exh-list-header">
        <h2 class="exh-list-heading">Upcoming</h2>
        <button class="exh-view-all" id="exhViewAll">View All</button>
      </div>
      <div class="exh-grid" id="exhUpcomingGrid">
        ${upcoming.slice(0, 3).map(e => buildExhCard(e)).join('')}
        ${!upcoming.length ? buildExhCard(exhibitions[1] || exhibitions[0]) + buildExhCard(exhibitions[2] || exhibitions[0]) + buildExhCard(exhibitions[3] || exhibitions[0]) : ''}
      </div>
    </div>

    <!-- ── Past ── -->
    ${past.length ? `
    <div class="exh-list-section exh-past-section">
      <div class="exh-list-header">
        <h2 class="exh-list-heading">Past Exhibitions</h2>
      </div>
      <div class="exh-past-grid" id="exhPastGrid">
        ${past.slice(0, 4).map(e => buildExhPastCard(e)).join('')}
      </div>
    </div>
    ` : ''}

    ${buildSiteFooter()}
  `;

  initExhHandlers(exhibitions);
}

// ── Visual for featured hero ──────────────────────────────────────────────────

function buildExhHeroVisual(e) {
  // Generate a Mughal gallery scene SVG
  const colors = ['#c9a84c', '#8b1a4a', '#1a3a6a', '#2d5a27'];
  const c1 = colors[0], c2 = colors[1], c3 = colors[2];
  return `
    <div class="exh-hero-svg-wrap">
      <svg viewBox="0 0 560 420" xmlns="http://www.w3.org/2000/svg"
           style="width:100%;height:100%;display:block;">
        <defs>
          <linearGradient id="exhBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="hsl(38,25%,18%)"/>
            <stop offset="100%" stop-color="hsl(20,30%,10%)"/>
          </linearGradient>
          <linearGradient id="exhFloor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="hsl(38,20%,25%)"/>
            <stop offset="100%" stop-color="hsl(38,18%,20%)"/>
          </linearGradient>
        </defs>

        <!-- Background -->
        <rect width="560" height="420" fill="url(#exhBg)"/>

        <!-- Floor -->
        <path d="M 0 300 L 560 300 L 560 420 L 0 420 Z" fill="url(#exhFloor)" opacity="0.9"/>
        <!-- Floor perspective lines -->
        <line x1="280" y1="160" x2="0" y2="420" stroke="${c1}" stroke-width="0.5" opacity="0.2"/>
        <line x1="280" y1="160" x2="560" y2="420" stroke="${c1}" stroke-width="0.5" opacity="0.2"/>
        <line x1="280" y1="160" x2="140" y2="420" stroke="${c1}" stroke-width="0.3" opacity="0.15"/>
        <line x1="280" y1="160" x2="420" y2="420" stroke="${c1}" stroke-width="0.3" opacity="0.15"/>

        <!-- Central arch -->
        <path d="M 200 420 L 200 220 Q 200 140 280 140 Q 360 140 360 220 L 360 420"
              fill="hsl(38,22%,22%)" stroke="${c1}" stroke-width="1.5" opacity="0.9"/>
        <!-- Inner arch -->
        <path d="M 218 420 L 218 228 Q 218 158 280 158 Q 342 158 342 228 L 342 420"
              fill="none" stroke="${c1}" stroke-width="0.8" opacity="0.5"/>

        <!-- Side arches left -->
        <path d="M 60 420 L 60 260 Q 60 200 110 200 Q 160 200 160 260 L 160 420"
              fill="hsl(38,20%,20%)" stroke="${c1}" stroke-width="1" opacity="0.7"/>
        <!-- Side arches right -->
        <path d="M 400 420 L 400 260 Q 400 200 450 200 Q 500 200 500 260 L 500 420"
              fill="hsl(38,20%,20%)" stroke="${c1}" stroke-width="1" opacity="0.7"/>

        <!-- Chandeliers -->
        <circle cx="280" cy="80" r="3" fill="${c1}" opacity="0.9"/>
        <line x1="280" y1="83" x2="280" y2="110" stroke="${c1}" stroke-width="0.8" opacity="0.6"/>
        ${[0,1,2,3,4,5,6,7].map(i => {
          const a = (i/8)*Math.PI*2; const r=18;
          return `<circle cx="${280+Math.cos(a)*r}" cy="${110+Math.sin(a)*6}" r="1.5" fill="${c1}" opacity="0.7"/>`;
        }).join('')}

        <!-- Wall paintings (framed) -->
        <!-- Left painting -->
        <rect x="20" y="180" width="70" height="90" fill="${c2}" opacity="0.4" stroke="${c1}" stroke-width="1"/>
        <rect x="24" y="184" width="62" height="82" fill="${c2}" opacity="0.3"/>
        <!-- Right painting -->
        <rect x="470" y="180" width="70" height="90" fill="${c3}" opacity="0.4" stroke="${c1}" stroke-width="1"/>
        <rect x="474" y="184" width="62" height="82" fill="${c3}" opacity="0.3"/>

        <!-- Center painting on back wall -->
        <rect x="248" y="160" width="64" height="80" fill="${c2}" opacity="0.5" stroke="${c1}" stroke-width="1.5"/>
        <rect x="253" y="165" width="54" height="70" fill="${c2}" opacity="0.4"/>

        <!-- Islamic star motif on floor -->
        ${[0,1,2,3,4,5,6,7].map(i => {
          const a = (i/8)*Math.PI*2 - Math.PI/8;
          const r1=30, r2=14;
          const x1=280+Math.cos(a)*r1, y1=360+Math.sin(a)*r1*0.35;
          const a2 = a + Math.PI/8;
          const x2=280+Math.cos(a2)*r2, y2=360+Math.sin(a2)*r2*0.35;
          return `<polygon points="${x1},${y1} ${x2},${y2}" fill="none" stroke="${c1}" stroke-width="0.5" opacity="0.25"/>`;
        }).join('')}

        <!-- Gold border frame -->
        <rect x="8" y="8" width="544" height="404" fill="none" stroke="${c1}" stroke-width="2" opacity="0.4"/>
        <rect x="14" y="14" width="532" height="392" fill="none" stroke="${c1}" stroke-width="0.5" opacity="0.25"/>

        <!-- Corner ornaments -->
        ${[[18,18],[542,18],[18,402],[542,402]].map(([cx,cy]) =>
          `<circle cx="${cx}" cy="${cy}" r="5" fill="${c1}" opacity="0.5"/>`
        ).join('')}

        <!-- Light glow from chandelier -->
        <ellipse cx="280" cy="200" rx="80" ry="60" fill="${c1}" opacity="0.04"/>
      </svg>
    </div>
  `;
}

// ── Exhibition card (upcoming grid) ──────────────────────────────────────────

function buildExhCard(e) {
  if (!e) return '';
  const colors = [
    ['hsl(38,25%,18%)','hsl(42,60%,30%)'],
    ['hsl(220,40%,20%)','hsl(220,30%,35%)'],
    ['hsl(350,40%,20%)','hsl(350,30%,35%)'],
    ['hsl(150,30%,18%)','hsl(150,25%,30%)'],
  ];
  const cidx = (e.id || 0) % colors.length;
  const [c1, c2] = colors[cidx];
  const upcoming = new Date(e.start_date) > new Date();
  const dateColor = upcoming ? 'hsl(42,60%,35%)' : 'var(--muted)';

  return `
    <div class="exh-card">
      <div class="exh-card-image" style="background:linear-gradient(160deg,${c1} 0%,${c2} 100%);">
        <div class="exh-card-image-inner">
          <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
            <path d="M 90 200 L 90 100 Q 90 60 150 60 Q 210 60 210 100 L 210 200"
                  fill="rgba(255,255,255,0.06)" stroke="rgba(201,168,76,0.4)" stroke-width="1"/>
            <rect x="60" y="80" width="50" height="70" fill="rgba(255,255,255,0.06)" stroke="rgba(201,168,76,0.3)" stroke-width="0.8"/>
            <rect x="190" y="80" width="50" height="70" fill="rgba(255,255,255,0.06)" stroke="rgba(201,168,76,0.3)" stroke-width="0.8"/>
            <rect x="4" y="4" width="292" height="192" fill="none" stroke="rgba(201,168,76,0.2)" stroke-width="1"/>
          </svg>
        </div>
      </div>
      <div class="exh-card-body">
        <h3 class="exh-card-title">${e.title}</h3>
        <p class="exh-card-venue">${e.venue || e.city}</p>
        <p class="exh-card-dates" style="color:${dateColor};">
          ${formatDateRange(e.start_date, e.end_date)}
        </p>
      </div>
    </div>
  `;
}

function buildExhPastCard(e) {
  return `
    <div class="exh-past-card">
      <div class="exh-past-dot"></div>
      <div>
        <div class="exh-past-title">${e.title}</div>
        <div class="exh-past-venue">${e.venue}, ${e.city}</div>
        <div class="exh-past-dates">${formatDateRange(e.start_date, e.end_date)}</div>
      </div>
    </div>
  `;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDateRange(start, end) {
  const opts = { month: 'short', day: '2-digit', year: 'numeric' };
  const s = start ? new Date(start).toLocaleDateString('en-GB', opts) : '';
  const e = end   ? new Date(end).toLocaleDateString('en-GB', opts)   : '';
  return s && e ? `${s} – ${e}` : s || e;
}

function getStatusLabel(e) {
  const now = new Date();
  if (new Date(e.start_date) > now) return 'UPCOMING EXHIBITION';
  if (new Date(e.end_date)   < now) return 'PAST EXHIBITION';
  return 'ACTIVE EXHIBITION';
}

// ── Handlers ─────────────────────────────────────────────────────────────────

function initExhHandlers(exhibitions) {
  const cityInput = document.getElementById('exhCityInput');
  const searchBtn = document.getElementById('exhSearchBtn');

  function searchByCity() {
    const q = (cityInput?.value || '').toLowerCase().trim();
    const results = document.getElementById('exhCityResults');
    if (!results) return;
    if (!q) { results.innerHTML = ''; return; }
    const matches = exhibitions.filter(e =>
      (e.city + ' ' + e.country).toLowerCase().includes(q)
    );
    if (!matches.length) {
      results.innerHTML = `<p class="exh-no-results">No exhibitions found in "${cityInput.value}".</p>`;
      return;
    }
    results.innerHTML = `<div class="exh-city-grid">${matches.map(e => buildExhCard(e)).join('')}</div>`;
  }

  searchBtn?.addEventListener('click', searchByCity);
  cityInput?.addEventListener('keydown', e => { if (e.key === 'Enter') searchByCity(); });

  // View all toggle
  let showingAll = false;
  document.getElementById('exhViewAll')?.addEventListener('click', function() {
    const now = new Date();
    const upcoming = exhibitions.filter(e => new Date(e.start_date) > now);
    const all = exhibitions;
    showingAll = !showingAll;
    this.textContent = showingAll ? 'Show Less' : 'View All';
    document.getElementById('exhUpcomingGrid').innerHTML =
      (showingAll ? all : upcoming.slice(0, 3))
        .map(e => buildExhCard(e)).join('') ||
      buildExhCard(exhibitions[1]) + buildExhCard(exhibitions[2]) + buildExhCard(exhibitions[3]);
  });
}
