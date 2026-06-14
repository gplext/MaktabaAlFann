// =============================================================================
// ARTISTS PAGE — Featured artist layout with sidebar
// =============================================================================

function renderArtists() {
  const el = document.getElementById('page-artists');

  el.innerHTML = `
    <div class="gal-layout">

      <!-- LEFT SIDEBAR (shared with gallery) -->
      <aside class="gal-sidebar">
        <div class="gal-sidebar-title">Curated Filter</div>
        <div class="gal-sidebar-sub">Refine by Medium</div>

        <nav class="gal-medium-nav">
          <button class="gal-medium-btn active" data-amedium="">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            All Artworks
          </button>
          <button class="gal-medium-btn" data-amedium="Mughal,Persian,Deccani">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12s1.5-4 4-4 4 4 4 4-1.5 4-4 4-4-4-4-4z"/></svg>
            Paintings
          </button>
          <button class="gal-medium-btn" data-amedium="Contemporary,Abstract">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            Contemporary
          </button>
          <button class="gal-medium-btn" data-amedium="Islamic Geometric,Calligraphy">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4"/></svg>
            Islamic Art
          </button>
          <button class="gal-medium-btn" data-amedium="Impressionism,Romanticism">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            Western
          </button>
        </nav>

        <div class="gal-filter-divider"></div>

        <div style="padding:0 1.25rem;margin-bottom:0.5rem;">
          <div class="gal-sidebar-title" style="font-size:0.72rem;margin-bottom:0.5rem;">Nationality</div>
          <div id="artistNatList" style="display:flex;flex-direction:column;gap:0.3rem;max-height:180px;overflow-y:auto;"></div>
        </div>

        <div class="gal-filter-divider"></div>

        <button class="gal-apply-btn" id="artApplyBtn">Apply Filters</button>
        <button class="gal-clear-btn" id="artClearBtn">&#10005; Remove Filters</button>
      </aside>

      <!-- MAIN -->
      <div class="gal-main" id="artistsMain">
        <div class="art-page-top">
          <div>
            <h1 class="art-page-heading">Featured Artists</h1>
            <p class="art-page-sub">
              Discover the visionaries shaping the contemporary landscape of Maktab-al-fann.
              A curated selection of master painters, digital pioneers, and sculptural innovators.
            </p>
          </div>
          <div class="art-top-right">
            <div class="art-search-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="artistSearchInput" class="art-search-input" placeholder="Search artists by name…" />
            </div>
            <div class="art-count-sort">
              <span id="artCountLabel" class="art-count"></span>
              <div class="art-sort-wrap">
                <span>Sort By:</span>
                <select id="artSortSelect" class="art-sort-select">
                  <option value="name">Name</option>
                  <option value="paintings">Most Works</option>
                  <option value="born">Era</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div id="artistsContent"></div>
      </div>
    </div>
    ${buildSiteFooter()}
  `;

  initArtistHandlers();
  renderArtistsContent();
}

// ── Render artists ────────────────────────────────────────────────────────────

function renderArtistsContent() {
  let artists = [...ART_DATA.artists];
  const q = (document.getElementById('artistSearchInput')?.value || '').toLowerCase();
  const medium = document.querySelector('.gal-medium-btn.active[data-amedium]')?.dataset.amedium || '';
  const sort = document.getElementById('artSortSelect')?.value || 'name';
  const checkedNats = [...document.querySelectorAll('input[name="artNat"]:checked')].map(i => i.value);

  // Search filter
  if (q) artists = artists.filter(a =>
    (a.name + ' ' + a.nationality + ' ' + a.bio + ' ' + a.notable_for).toLowerCase().includes(q)
  );

  // Medium filter
  if (medium) {
    const terms = medium.split(',').map(t => t.trim().toLowerCase());
    artists = artists.filter(a => {
      const styleIds = a.style_ids || [];
      return styleIds.some(sid => {
        const s = ART_DATA.styles.find(st => st.id === sid);
        return terms.some(t => (s?.name || '').toLowerCase().includes(t));
      });
    });
  }

  // Nationality filter
  if (checkedNats.length) artists = artists.filter(a => checkedNats.includes(a.nationality));

  // Sort
  if (sort === 'name')     artists.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'paintings') artists.sort((a, b) => (countPaintings(b.id) - countPaintings(a.id)));
  if (sort === 'born')     artists.sort((a, b) => (a.born || 0) - (b.born || 0));

  document.getElementById('artCountLabel').textContent = `Showing ${artists.length} Artist${artists.length !== 1 ? 's' : ''}`;

  const el = document.getElementById('artistsContent');
  if (!artists.length) {
    el.innerHTML = `<div class="gal-empty">No artists match your search.</div>`;
    return;
  }

  // Build pairs: featured card (large) + secondary card, then quote row
  let html = '';
  for (let i = 0; i < artists.length; i += 3) {
    const featured = artists[i];
    const second   = artists[i + 1];
    const third    = artists[i + 2];

    html += `<div class="art-row">`;

    // Featured artist — large card
    html += buildFeaturedCard(featured);

    // Secondary card
    if (second) html += buildSecondaryCard(second);

    html += `</div>`;

    // Quote + third artist row
    if (third || i === 0) {
      html += `<div class="art-row art-row-alt">`;
      html += buildQuoteBlock(third || featured);
      if (third) html += buildThirdCard(third);
      html += `</div>`;
    }
  }

  el.innerHTML = html;

  // Inject art into tiles
  setTimeout(() => { if (typeof injectPaintingArt === 'function') injectPaintingArt(); }, 150);
}

function countPaintings(artistId) {
  return ART_DATA.paintings.filter(p => p.artist_id === artistId).length;
}

// ── Card builders ─────────────────────────────────────────────────────────────

function buildFeaturedCard(a) {
  if (!a) return '';
  const styleIds = a.style_ids || [];
  const style = ART_DATA.styles.find(s => s.id === styleIds[0]);
  const paintings = ART_DATA.paintings.filter(p => p.artist_id === a.id).slice(0, 2);
  const color = a.profile_color || '#8b1a4a';

  return `
    <div class="art-featured-card">
      <!-- Artist portrait area -->
      <div class="art-featured-portrait" style="background:linear-gradient(160deg,${color}cc 0%,${color}44 100%);">
        <div class="art-featured-portrait-inner">
          ${buildArtistMonogram(a.name, color)}
        </div>
        <div class="art-featured-badge-row">
          ${style ? `<span class="art-style-badge">${style.name}</span>` : ''}
          <span class="art-featured-badge">Featured</span>
        </div>
        <div class="art-featured-name-block">
          <h2 class="art-featured-name">${a.name}</h2>
          <p class="art-featured-bio">${(a.bio || '').substring(0, 120)}…</p>
        </div>
        <div class="art-recent-works">
          <span class="art-recent-label">RECENT WORKS</span>
          <div class="art-recent-thumbs">
            ${paintings.map(p => buildMiniThumb(p)).join('')}
            <button class="art-recent-arrow" onclick="navigateTo('gallery')" aria-label="View all works">&#8594;</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildSecondaryCard(a) {
  if (!a) return '';
  const styleIds = a.style_ids || [];
  const style1 = ART_DATA.styles.find(s => s.id === styleIds[0]);
  const style2 = ART_DATA.styles.find(s => s.id === styleIds[1]);
  const color  = a.profile_color || '#1a3a6a';

  return `
    <div class="art-secondary-card">
      <div class="art-secondary-portrait" style="background:linear-gradient(135deg,${color}99,${color}33);">
        ${buildArtistMonogram(a.name, color)}
      </div>
      <div class="art-secondary-body">
        <div class="art-secondary-tags">
          ${style1 ? `<span class="art-secondary-tag">${style1.name}</span>` : ''}
          ${style2 ? `<span class="art-secondary-tag">${style2.name}</span>` : ''}
        </div>
        <h3 class="art-secondary-name">${a.name}</h3>
        <p class="art-secondary-bio">${(a.bio || '').substring(0, 100)}…</p>
        <button class="art-view-portfolio" onclick="navigateTo('gallery')">
          VIEW PORTFOLIO &nbsp;&#8594;
        </button>
      </div>
    </div>
  `;
}

function buildQuoteBlock(a) {
  const quotes = [
    { text: '"Art is not what you see, but what you make others see."', author: '— Edgar Degas' },
    { text: '"Every artist dips his brush in his own soul."', author: '— Henry Ward Beecher' },
    { text: '"Creativity takes courage."', author: '— Henri Matisse' },
    { text: '"Art enables us to find ourselves."', author: '— Thomas Merton' },
    { text: '"Color is the keyboard, the eyes are harmonies."', author: '— Wassily Kandinsky' },
  ];
  const q = quotes[Math.abs((a?.id || 0)) % quotes.length];
  const styleIds = a?.style_ids || [];
  const style = ART_DATA.styles.find(s => s.id === styleIds[0]);
  const paintings = ART_DATA.paintings.filter(p => p.artist_id === a?.id).slice(0, 1);

  return `
    <div class="art-quote-block">
      <blockquote class="art-quote-text">${q.text}</blockquote>
      <cite class="art-quote-author">${q.author}</cite>
      <div class="art-quote-divider"></div>
      ${a ? `
        <h3 class="art-quote-artist-name">${a.name}</h3>
        ${style ? `<div class="art-quote-style">${style.name.toUpperCase()}</div>` : ''}
        <p class="art-quote-bio">${(a.bio || '').substring(0, 140)}…</p>
        <button class="art-view-portfolio" onclick="navigateTo('gallery')">VIEW PORTFOLIO &nbsp;&#8594;</button>
      ` : ''}
    </div>
  `;
}

function buildThirdCard(a) {
  if (!a) return '';
  const color = a.profile_color || '#c9a84c';
  const paintings = ART_DATA.paintings.filter(p => p.artist_id === a.id).slice(0, 3);
  const styleIds = a.style_ids || [];
  const style = ART_DATA.styles.find(s => s.id === styleIds[0]);
  const extraCount = ART_DATA.paintings.filter(p => p.artist_id === a.id).length - 3;

  return `
    <div class="art-third-card">
      <div class="art-third-main">
        <div class="art-third-portrait" style="background:linear-gradient(135deg,${color}88,${color}22);">
          ${buildArtistMonogram(a.name, color)}
        </div>
        <div class="art-third-info">
          ${style ? `<div class="art-third-style">${style.name}</div>` : ''}
          <h3 class="art-third-name">${a.name}</h3>
          <p class="art-third-bio">${(a.bio || '').substring(0, 90)}…</p>
        </div>
      </div>
      <div class="art-third-works">
        ${paintings.map(p => `
          <div class="art-third-thumb" data-painting-id="${p.id}" onclick="openPaintingDetail(${p.id})">
            <div class="art-placeholder" style="position:absolute;inset:0;">
              <div class="art-placeholder-inner" style="background:linear-gradient(135deg,${(p.colors||['#8b1a4a'])[0]} 0%,${(p.colors||['#8b1a4a','#c9a84c'])[1]||color} 100%);"></div>
              <div class="art-placeholder-overlay"></div>
            </div>
          </div>
        `).join('')}
        ${extraCount > 0 ? `
          <div class="art-third-more" onclick="navigateTo('gallery')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 21V9"/></svg>
            <span>VIEW ${extraCount} MORE WORKS</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function buildMiniThumb(p) {
  const colors = p.colors || ['#8b1a4a', '#c9a84c'];
  return `
    <div class="art-mini-thumb" data-painting-id="${p.id}" onclick="openPaintingDetail(${p.id})" style="position:relative;">
      <div class="art-placeholder" style="position:absolute;inset:0;">
        <div class="art-placeholder-inner" style="background:linear-gradient(135deg,${colors[0]} 0%,${colors[1]||colors[0]} 100%);"></div>
      </div>
    </div>
  `;
}

function buildArtistMonogram(name, color) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('');
  return `
    <div class="art-monogram" style="border-color:${color}55;color:${color};">
      ${initials}
    </div>
  `;
}

// ── Handlers ──────────────────────────────────────────────────────────────────

function initArtistHandlers() {
  // Populate nationality checkboxes
  const nats = [...new Set(ART_DATA.artists.map(a => a.nationality).filter(Boolean))].sort();
  document.getElementById('artistNatList').innerHTML = nats.map(n => `
    <label class="gal-check-label">
      <input type="checkbox" name="artNat" value="${n}"> ${n}
    </label>
  `).join('');

  // Search
  document.getElementById('artistSearchInput')?.addEventListener('input', renderArtistsContent);
  // Sort
  document.getElementById('artSortSelect')?.addEventListener('change', renderArtistsContent);
  // Apply / Clear
  document.getElementById('artApplyBtn')?.addEventListener('click', renderArtistsContent);
  document.getElementById('artClearBtn')?.addEventListener('click', () => {
    document.querySelectorAll('input[name="artNat"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('.gal-medium-btn[data-amedium]').forEach(b => b.classList.remove('active'));
    document.querySelector('.gal-medium-btn[data-amedium=""]')?.classList.add('active');
    const si = document.getElementById('artistSearchInput'); if (si) si.value = '';
    renderArtistsContent();
  });

  // Medium buttons
  document.querySelectorAll('.gal-medium-btn[data-amedium]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gal-medium-btn[data-amedium]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderArtistsContent();
    });
  });
}
