// =============================================================================
// SHOP PAGE
// Frames · Art materials · Hanging service · Artists for hire
// =============================================================================

function renderShop() {
  const el = document.getElementById('page-shop');

  const categories = [
    { id: 'frames',    label: 'Custom Framing',       icon: '&#9641;', desc: 'Museum-quality frames handcrafted in our London workshop.' },
    { id: 'materials', label: 'Art Materials',         icon: '&#9998;', desc: 'Curated supplies for collectors and practicing artists.' },
    { id: 'service',   label: 'Hanging Expert',        icon: '&#9756;', desc: 'Professional installation in your home or office.' },
    { id: 'hire',      label: 'Commission an Artist',  icon: '&#9998;', desc: 'Work directly with our gallery artists for a bespoke commission.' }
  ];

  el.innerHTML = `
    <div class="page-inner">
      <div class="page-header container">
        <span class="how-to-eyebrow">Shop · Services</span>
        <h1>The Gallery Shop</h1>
        <p class="page-subheading">Everything you need to live beautifully with art.</p>
      </div>

      <div class="container">
        <!-- Category tabs -->
        <div class="digital-type-tabs" role="tablist" style="margin-bottom:2rem;">
          <button class="digital-tab active" data-cat="all" role="tab">All</button>
          ${categories.map(c => `
            <button class="digital-tab" data-cat="${c.id}" role="tab">${c.label}</button>
          `).join('')}
        </div>

        <!-- Category cards (hero) -->
        <div class="shop-categories" id="shopCategories">
          ${categories.map(c => `
            <div class="shop-category-card" onclick="scrollToShopSection('${c.id}')"
                 role="button" tabindex="0" aria-label="${c.label}">
              <div class="shop-cat-icon">${c.icon}</div>
              <div class="shop-cat-label">${c.label}</div>
              <p class="shop-cat-desc">${c.desc}</p>
            </div>
          `).join('')}
        </div>

        <!-- Products -->
        <div id="shopProducts"></div>

        <!-- Commission form teaser -->
        <div class="shop-commission-section" id="shopSection-hire">
          <div class="how-to-inner" style="max-width:600px;">
            <span class="how-to-eyebrow">Bespoke Commissions</span>
            <h2>Commission an Artist</h2>
            <div class="gold-rule" style="margin:1rem auto;"></div>
            <p class="desc">
              Work directly with any of our gallery artists to create a one-of-a-kind
              painting for your home, office, or as a gift. Choose your style, size, subject,
              and palette — the artist will bring your vision to life.
            </p>
            <div class="commission-steps">
              ${['Share your vision', 'We match you with an artist', 'Approve a concept sketch', 'Receive your artwork'].map((step, i) => `
                <div class="commission-step">
                  <div class="commission-step-num">${i + 1}</div>
                  <div class="commission-step-text">${step}</div>
                </div>
              `).join('')}
            </div>
            <button class="btn btn-primary" onclick="alert('Commission enquiry coming soon — contact us at hello@maktabalfann.com')">
              Start a Commission Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
    ${buildSiteFooter()}
  `;

  loadShopProducts('all');

  document.querySelectorAll('.digital-tab[data-cat]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.digital-tab[data-cat]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadShopProducts(tab.dataset.cat);
    });
  });
}

function loadShopProducts(category) {
  const items  = category === 'all' ? getShopItems() : getShopItems(category);
  const frames = category === 'all' || category === 'frames' ? getFrames() : [];

  const container = document.getElementById('shopProducts');
  if (!container) return;

  const sections = {};

  // Group shop items
  items.forEach(item => {
    if (!sections[item.category]) sections[item.category] = [];
    sections[item.category].push(item);
  });

  // Add frames into frames section
  if (frames.length) {
    if (!sections['frames']) sections['frames'] = [];
    // Mark as frame objects
    frames.forEach(f => sections['frames'].push({ ...f, _isFrame: true }));
  }

  const catLabels = {
    frames:    'Frames & Mounting',
    materials: 'Art Materials',
    service:   'Hanging Expert Service',
    print:     'Fine Art Prints'
  };

  let html = '';
  Object.keys(sections).forEach(cat => {
    const catItems = sections[cat];
    html += `
      <div class="shop-section" id="shopSection-${cat}">
        <h3 style="font-family:var(--font-display);margin-bottom:1.5rem;">${catLabels[cat] || cat}</h3>
        <div class="shop-products-grid">
          ${catItems.map(item => buildShopCard(item)).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html || '<div class="gallery-empty"><p>No products in this category yet.</p></div>';
}

function buildShopCard(item) {
  const hue   = item._isFrame ? 40 : parseInt(item.image_hue || 200);
  const price = Number(item.price).toLocaleString();
  const name  = item.name;
  const desc  = item.description || '';
  const id    = item.id;

  return `
    <div class="shop-card">
      <div class="art-placeholder shop-card-image">
        <div class="art-placeholder-inner"
             style="background:linear-gradient(135deg, hsl(${hue},40%,40%) 0%, hsl(${hue+30},35%,55%) 100%);"></div>
        <div class="art-placeholder-overlay"></div>
      </div>
      <div class="shop-card-body">
        <div class="shop-card-name">${name}</div>
        <p class="shop-card-desc">${desc.substring(0,100)}${desc.length > 100 ? '…' : ''}</p>
        <div class="shop-card-footer">
          <span class="shop-card-price">£${price}</span>
          <button class="btn btn-outline btn-sm"
                  onclick="addToCart('shop', ${id}, '${escAttr(name)}', ${item.price})"
                  aria-label="Add ${name} to cart">
            Add
          </button>
        </div>
      </div>
    </div>
  `;
}

function scrollToShopSection(cat) {
  document.getElementById('shopSection-' + cat)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function escAttr(str) {
  return String(str).replace(/'/g, "&#39;").replace(/"/g, '&quot;');
}
