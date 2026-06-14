// =============================================================================
// DIGITAL ART PAGE
// Photos · AI-generated art · Digital animation · Video art
// =============================================================================

function renderDigital() {
  const el = document.getElementById('page-digital');

  const types = [...new Set((ART_DATA.digital_works || []).map(d => d.type).filter(Boolean))].sort();

  el.innerHTML = `
    <div class="page-inner">
      <div class="page-header container">
        <span class="how-to-eyebrow">Digital & Contemporary</span>
        <h1>Digital Art</h1>
        <p class="page-subheading">Photography, AI-generated art, digital animations, and video works
           from our artists exploring the intersection of tradition and technology.</p>
      </div>

      <div class="container">
        <!-- Type filter tabs -->
        <div class="digital-type-tabs" role="tablist">
          <button class="digital-tab active" data-type="" role="tab" aria-selected="true">All</button>
          ${types.map(t => `
            <button class="digital-tab" data-type="${t}" role="tab" aria-selected="false">${t}</button>
          `).join('')}
        </div>

        <!-- Search -->
        <div style="margin:1.5rem 0;">
          <input type="text" id="digitalSearch" class="sidebar-search-input"
                 placeholder="Search digital works…" aria-label="Search digital art" style="max-width:400px;"/>
        </div>

        <div id="digitalGrid"></div>
      </div>
    </div>
    ${buildSiteFooter()}
  `;

  loadDigitalWorks('');

  // Tab clicks
  document.querySelectorAll('.digital-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.digital-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      loadDigitalWorks(tab.dataset.type);
    });
  });

  document.getElementById('digitalSearch')?.addEventListener('input', () => {
    const activeTab = document.querySelector('.digital-tab.active');
    loadDigitalWorks(activeTab?.dataset.type || '');
  });
}

function loadDigitalWorks(type) {
  const search = (document.getElementById('digitalSearch')?.value || '').toLowerCase();
  let works = getDigitalWorks();

  if (type) works = works.filter(d => d.type === type);
  if (search) works = works.filter(d =>
    (d.title + d.description + (d.artist_name || '') + (d.type || '')).toLowerCase().includes(search)
  );

  renderDigitalGrid(works);
}

function renderDigitalGrid(works) {
  const grid = document.getElementById('digitalGrid');
  if (!grid) return;

  if (!works.length) {
    grid.innerHTML = `<div class="gallery-empty"><p>No works found.</p></div>`;
    return;
  }

  grid.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;">
      ${works.map(d => {
        const colors = d.colors || [];
        const c1 = colors[0] || '#1a3a6a';
        const c2 = colors[1] || '#8b1a4a';
        const hue = parseInt(d.image_hue) || 215;

        return `
          <div class="digital-card">
            <div class="art-placeholder" style="aspect-ratio:16/9;">
              <div class="art-placeholder-inner"
                   style="background:linear-gradient(135deg,${c1} 0%,${c2} 100%);"></div>
              <div class="art-placeholder-overlay"></div>
              <div class="digital-type-badge">${d.type || 'Digital'}</div>
              ${d.limited_edition ? `<div class="digital-edition-badge">Limited Edition · ${d.limited_edition}</div>` : ''}
            </div>
            <div class="digital-card-body">
              <div class="digital-card-title">${d.title}</div>
              <div class="digital-card-artist">${d.artist_name || 'Unknown Artist'} · ${d.year}</div>
              ${d.description ? `<p class="digital-card-desc">${d.description.substring(0,120)}…</p>` : ''}
              <div class="digital-card-footer">
                <span class="digital-card-price">£${Number(d.price).toLocaleString()}</span>
                <button class="btn btn-outline btn-sm"
                        onclick="addToCart('digital', ${d.id}, '${escAttr(d.title)}', ${d.price})"
                        aria-label="Add ${d.title} to cart">
                  Add to Selection
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function escAttr(str) {
  return String(str).replace(/'/g, "&#39;").replace(/"/g, '&quot;');
}
