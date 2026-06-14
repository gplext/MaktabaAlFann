// =============================================================================
// GALLERY PAGE — redesigned to match curated filter + mosaic layout
// =============================================================================

const GalleryState = {
  filters: {},
  search: '',
  paintings: [],
  activeGroup: null,
  featuredOnly: false,
  page: 1,
  pageSize: 30
};

// ── Entry ─────────────────────────────────────────────────────────────────────

function renderGallery() {
  const el = document.getElementById('page-gallery');

  el.innerHTML = `
    <div class="gal-layout">

      <!-- LEFT SIDEBAR -->
      <aside class="gal-sidebar" id="galSidebar">
        <div class="gal-sidebar-title">Curated Filter</div>
        <div class="gal-sidebar-sub">Refine by Medium</div>

        <nav class="gal-medium-nav">
          <button class="gal-medium-btn active" data-medium="">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            All Artworks
          </button>
          <button class="gal-medium-btn" data-medium="Mughal,Persian,Deccani,Rajput">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12s1.5-4 4-4 4 4 4 4-1.5 4-4 4-4-4-4-4z"/></svg>
            Paintings
          </button>
          <button class="gal-medium-btn" data-medium="Contemporary,Abstract">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            Contemporary
          </button>
          <button class="gal-medium-btn" data-medium="Islamic Geometric,Calligraphy">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4"/></svg>
            Islamic Art
          </button>
          <button class="gal-medium-btn" data-medium="Impressionism,Romanticism">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            Western
          </button>
        </nav>

        <div class="gal-filter-divider"></div>

        <div style="padding:0 1.25rem;margin-bottom:0.5rem;">
          <div class="gal-sidebar-title" style="font-size:0.72rem;margin-bottom:0.5rem;">Nationality</div>
          <div id="galNatList" style="display:flex;flex-direction:column;gap:0.3rem;max-height:200px;overflow-y:auto;"></div>
        </div>

        <div class="gal-filter-divider"></div>

        <button class="gal-apply-btn" id="galApplyBtn">Apply Filters</button>
        <button class="gal-clear-btn" id="galClearBtn">&#10005; Remove Filters</button>
        <div class="gal-active-filters" id="galActiveFilters"></div>
      </aside>

      <!-- MAIN CONTENT -->
      <div class="gal-main" id="galMain">

        <!-- Header + search -->
        <div class="gal-top">
          <div class="gal-breadcrumb">Gallery — Search for the art that you love</div>
          <div class="gal-search-bar">
            <input type="text" id="galSearchInput" class="gal-search-input"
                   placeholder="Describe the mood, color, or feeling you're seeking…"
                   aria-label="Search artworks" />
            <button class="gal-search-btn" id="galSearchBtn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
        </div>

        <!-- Stats row -->
        <div class="gal-stats" id="galStats"></div>

        <!-- Paintings mosaic -->
        <div class="gal-content" id="galContent"></div>

        <!-- Pagination -->
        <div class="gal-pagination" id="galPagination"></div>

      </div>
    </div>
    ${buildSiteFooter()}
  `;

  initGalleryHandlers();
  renderGalleryContent();
}

// ── Sidebar filter groups ─────────────────────────────────────────────────────

function buildGalFilter(label, key) {
  return `
    <div class="gal-filter-group" id="gfg-${key}">
      <button class="gal-filter-header" data-gfkey="${key}" aria-expanded="false">
        <span>${label}</span>
        <svg class="gal-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="gal-filter-body" id="gfb-${key}" style="display:none;"></div>
    </div>
  `;
}

function populateFilterBodies() {
  const nats = [...new Set(ART_DATA.artists.map(a => a.nationality).filter(Boolean))].sort();
  const el = document.getElementById('galNatList');
  if (el) el.innerHTML = nats.map(n =>
    '<label class="gal-check-label"><input type="checkbox" name="gf_nat" value="' + n + '"> ' + n + '</label>'
  ).join('');
}

// ── Stats ─────────────────────────────────────────────────────────────────────

function renderStats(paintings) {
  const el = document.getElementById('galStats');
  if (!el) return;

  const years   = paintings.map(p => p.year).filter(Boolean);
  const minY    = years.length ? Math.min(...years) : 0;
  const maxY    = years.length ? Math.max(...years) : 0;
  const styles  = new Set(paintings.map(p => p.style_id)).size;

  const stats = [
    { value: ART_DATA.paintings.length + '+', label: 'Total Paintings' },
    { value: ART_DATA.artists.length,         label: 'Total Artists' },
    { value: maxY - minY || 600,              label: 'Years of History' },
    { value: ART_DATA.styles.length,          label: 'Distinct Styles' }
  ];

  el.innerHTML = stats.map(s => `
    <div class="gal-stat">
      <div class="gal-stat-value">${s.value}</div>
      <div class="gal-stat-label">${s.label}</div>
    </div>
  `).join('');
}

// ── Main render ───────────────────────────────────────────────────────────────

function renderGalleryContent() {
  let paintings = [...ART_DATA.paintings];

  // Apply search
  const q = GalleryState.search.toLowerCase();
  if (q) {
    paintings = paintings.filter(p => {
      const artist = ART_DATA.artists.find(a => a.id === p.artist_id);
      const style  = ART_DATA.styles.find(s => s.id === p.style_id);
      return (p.title + ' ' + (artist?.name||'') + ' ' + (style?.name||'') +
              ' ' + (p.culture_depicted||'') + ' ' + (p.history_context||''))
        .toLowerCase().includes(q);
    });
  }

  // Apply medium filter
  const medium = GalleryState.filters.medium;
  if (medium) {
    const terms = medium.split(',').map(t => t.trim().toLowerCase());
    paintings = paintings.filter(p => {
      const style = ART_DATA.styles.find(s => s.id === p.style_id);
      return terms.some(t => (style?.name||'').toLowerCase().includes(t));
    });
  }

  // Apply nationality filter
  const checkedNats = [...document.querySelectorAll('input[name="gf_nat"]:checked')].map(i => i.value);
  if (checkedNats.length) {
    paintings = paintings.filter(p => {
      const artist = ART_DATA.artists.find(a => a.id === p.artist_id);
      return checkedNats.includes(artist?.nationality || '');
    });
  }

  // Featured filter
  if (GalleryState.featuredOnly && ART_DATA.paintingDetails) {
    paintings = paintings.filter(p => ART_DATA.paintingDetails[p.id]?.isFeatured);
  }

  renderStats(paintings);

  const el = document.getElementById('galContent');
  if (!el) return;

  if (!paintings.length) {
    el.innerHTML = '<div class="gal-empty">No artworks match your search.</div>';
    renderPagination(0, 0);
    return;
  }

  // Pagination
  const total    = paintings.length;
  const pageSize = GalleryState.pageSize;
  const maxPage  = Math.ceil(total / pageSize);
  // Reset to page 1 if out of range
  if (GalleryState.page > maxPage) GalleryState.page = 1;
  const start = (GalleryState.page - 1) * pageSize;
  const pagePaintings = paintings.slice(start, start + pageSize);

  // Group the current page of paintings by style
  const groups = {};
  pagePaintings.forEach(p => {
    const style = ART_DATA.styles.find(s => s.id === p.style_id);
    const name  = style?.name || 'Other';
    if (!groups[name]) groups[name] = [];
    groups[name].push(p);
  });

  el.innerHTML = Object.entries(groups).map(([styleName, items]) =>
    buildStyleGroup(styleName, items)
  ).join('');

  renderPagination(total, maxPage);

  // Inject SVG art after render
  setTimeout(() => {
    if (typeof injectPaintingArt === 'function') injectPaintingArt();
  }, 150);
}

// ── Mosaic group ──────────────────────────────────────────────────────────────

function buildStyleGroup(styleName, paintings) {
  const big   = paintings[0];
  const med1  = paintings[1];
  const med2  = paintings[2];
  const smalls = paintings.slice(3, 9);

  return `
    <div class="gal-style-group">
      <div class="gal-style-header">
        <h2 class="gal-style-name">${styleName}</h2>
        <button class="gal-view-all" onclick="filterByStyle('${styleName}')">
          View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <div class="gal-mosaic">
        <!-- Big tile -->
        ${big ? buildMosaicTile(big, 'gal-tile-big') : ''}

        <!-- Two medium tiles -->
        <div class="gal-tile-med-col">
          ${med1 ? buildMosaicTile(med1, 'gal-tile-med') : ''}
          ${med2 ? buildMosaicTile(med2, 'gal-tile-med') : ''}
        </div>

        <!-- Small thumbnails grid -->
        ${smalls.length ? `
          <div class="gal-tile-smalls">
            ${smalls.map(p => buildMosaicTile(p, 'gal-tile-sm')).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function buildMosaicTile(p, sizeClass) {
  const artist = ART_DATA.artists.find(a => a.id === p.artist_id);
  const colors = p.colors || ['#8b1a4a', '#c9a84c', '#1a3a6a'];
  const c0 = colors[0], c1 = colors[1] || colors[0];
  const price = p.price ? '£' + Number(p.price).toLocaleString() : '';

  return `
    <div class="gal-tile ${sizeClass}" data-painting-id="${p.id}"
         onclick="openPaintingDetail(${p.id})" role="button" tabindex="0"
         aria-label="View ${p.title}">
      <div class="art-placeholder" style="position:absolute;inset:0;">
        <div class="art-placeholder-inner" style="background:linear-gradient(135deg,${c0} 0%,${c1} 100%);"></div>
        <div class="art-placeholder-overlay"></div>
      </div>
      <div class="gal-tile-overlay">
        <div class="gal-tile-info">
          <div class="gal-tile-title">${p.title}</div>
          <div class="gal-tile-meta">${artist?.name || ''} · ${p.year || ''}</div>
          ${price ? `<div class="gal-tile-price">${price}</div>` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderPagination(total, maxPage) {
  const el = document.getElementById('galPagination');
  if (!el) return;
  if (maxPage <= 1) { el.innerHTML = ''; return; }
  const cur = GalleryState.page;
  const pageSize = GalleryState.pageSize;
  const from = (cur - 1) * pageSize + 1;
  const to   = Math.min(cur * pageSize, total);
  let pages = '';
  for (let i = 1; i <= maxPage; i++) {
    if (i === 1 || i === maxPage || (i >= cur - 2 && i <= cur + 2)) {
      pages += '<button class="gal-page-btn' + (i === cur ? ' active' : '') + '" data-page="' + i + '">' + i + '</button>';
    } else if (i === cur - 3 || i === cur + 3) {
      pages += '<span class="gal-page-ellipsis">&#8230;</span>';
    }
  }
  el.innerHTML =
    '<div class="gal-pagination-info">Showing ' + from + '&#8211;' + to + ' of ' + total + ' works</div>' +
    '<div class="gal-pagination-btns">' +
    '<button class="gal-page-btn gal-page-prev" ' + (cur <= 1 ? 'disabled' : '') + ' data-page="' + (cur - 1) + '">&#8592;</button>' +
    pages +
    '<button class="gal-page-btn gal-page-next" ' + (cur >= maxPage ? 'disabled' : '') + ' data-page="' + (cur + 1) + '">&#8594;</button>' +
    '</div>';
  el.querySelectorAll('.gal-page-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = parseInt(btn.dataset.page);
      if (!isNaN(p) && p >= 1 && p <= maxPage) {
        GalleryState.page = p;
        renderGalleryContent();
        document.getElementById('galMain')?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}

function filterByStyle(styleName) {
  // Check the matching style checkbox and re-render
  document.querySelectorAll('input[name="gf_style"]').forEach(cb => {
    cb.checked = cb.value === styleName;
  });
  // Open style filter group
  const body = document.getElementById('gfb-style');
  if (body) body.style.display = 'block';
  renderGalleryContent();
  document.getElementById('galMain')?.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Event handlers ────────────────────────────────────────────────────────────


function clearAllFilters() {
  document.querySelectorAll('input[name="gf_nat"]').forEach(cb => cb.checked = false);
  GalleryState.filters.medium = '';
  document.querySelectorAll('.gal-medium-btn').forEach(b => b.classList.remove('active'));
  const allBtn = document.querySelector('.gal-medium-btn[data-medium=""]');
  if (allBtn) allBtn.classList.add('active');
  GalleryState.featuredOnly = false;
  GalleryState.search = '';
  GalleryState.page = 1;
  const inp = document.getElementById('galSearchInput');
  if (inp) inp.value = '';
  renderGalleryContent();
}

function getActiveFilters() {
  const tags = [];
  document.querySelectorAll('input[name="gf_style"]:checked').forEach(cb => tags.push({ label: cb.value, type: 'style', value: cb.value }));
  document.querySelectorAll('input[name="gf_artist"]:checked').forEach(cb => tags.push({ label: cb.value, type: 'artist', value: cb.value }));
  const yf = document.getElementById('gfYearFrom')?.value;
  const yt = document.getElementById('gfYearTo')?.value;
  if (yf || yt) tags.push({ label: (yf||'?') + '–' + (yt||'?'), type: 'year' });
  const cs = document.getElementById('gfCountry')?.value;
  if (cs) tags.push({ label: cs, type: 'country' });
  const med = GalleryState.filters.medium;
  if (med) tags.push({ label: document.querySelector('.gal-medium-btn.active')?.textContent?.trim() || med, type: 'medium' });
  if (GalleryState.search) tags.push({ label: '"' + GalleryState.search + '"', type: 'search' });
  return tags;
}

function updateActiveFilterTags() {
  const el = document.getElementById('galActiveFilters');
  if (!el) return;
  const tags = getActiveFilters();
  if (!tags.length) { el.innerHTML = ''; return; }
  el.innerHTML = tags.map(t => `
    <span class="gal-active-tag" data-type="${t.type}" data-value="${t.value||''}">
      ${t.label}
      <button onclick="removeSingleFilter('${t.type}','${t.value||''}')" aria-label="Remove filter">&#10005;</button>
    </span>
  `).join('');
}

function removeSingleFilter(type, value) {
  if (type === 'style') {
    document.querySelectorAll('input[name="gf_style"]').forEach(cb => { if (cb.value === value) cb.checked = false; });
  } else if (type === 'artist') {
    document.querySelectorAll('input[name="gf_artist"]').forEach(cb => { if (cb.value === value) cb.checked = false; });
  } else if (type === 'year') {
    const yf = document.getElementById('gfYearFrom'); if (yf) yf.value = '';
    const yt = document.getElementById('gfYearTo');   if (yt) yt.value = '';
  } else if (type === 'country') {
    const cs = document.getElementById('gfCountry'); if (cs) cs.value = '';
  } else if (type === 'medium') {
    GalleryState.filters.medium = '';
    document.querySelectorAll('.gal-medium-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.gal-medium-btn[data-medium=""]')?.classList.add('active');
  } else if (type === 'search') {
    GalleryState.search = '';
    const inp = document.getElementById('galSearchInput'); if (inp) inp.value = '';
  }
  updateActiveFilterTags();
  renderGalleryContent();
}

function initGalleryHandlers() {
  populateFilterBodies();

  // Search
  const input = document.getElementById('galSearchInput');
  const btn   = document.getElementById('galSearchBtn');
  const doSearch = () => {
    GalleryState.search = input?.value || '';
    GalleryState.page = 1;
    updateActiveFilterTags();
    renderGalleryContent();
  };
  input?.addEventListener('input', doSearch);
  btn?.addEventListener('click', doSearch);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  // Apply / Clear
  document.getElementById('galApplyBtn')?.addEventListener('click', () => {
    GalleryState.page = 1;
    updateActiveFilterTags();
    renderGalleryContent();
  });
  document.getElementById('galClearBtn')?.addEventListener('click', clearAllFilters);

  // Medium nav
  document.querySelectorAll('.gal-medium-btn').forEach(function(b) {
    b.addEventListener('click', function() {
      document.querySelectorAll('.gal-medium-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      GalleryState.filters.medium = b.dataset.medium;
      GalleryState.page = 1;
      updateActiveFilterTags();
      renderGalleryContent();
    });
  });
}
