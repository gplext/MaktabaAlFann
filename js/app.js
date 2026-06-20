// =============================================================================
// APP.JS -- SPA Router + Parametric Routes + Cart + Initialization
// =============================================================================

// -- Static page registry --
const PAGES = {
  home:        { render: renderHome,        title: 'Home',         pageId: 'home' },
  gallery:     { render: renderGallery,     title: 'Gallery',      pageId: 'gallery',     alwaysRerender: true },
  artists:     { render: renderArtists,     title: 'Artists',      pageId: 'artists' },
  exhibitions: { render: renderExhibitions, title: 'Exhibitions',  pageId: 'exhibitions' },
  digital:     { render: renderDigital,     title: 'Digital Art',  pageId: 'digital' },
  shop:        { render: renderShop,        title: 'Shop',         pageId: 'shop' },
  about:       { render: renderAbout,       title: 'About',        pageId: 'about' },
  admin:       { render: renderAdmin,       title: 'Admin',        pageId: 'admin',       alwaysRerender: true },
  cart:        { render: renderCartPage,    title: 'Your Collection', pageId: 'cart',     alwaysRerender: true },
  'artist-portal': { render: renderArtistPortal, title: 'Artist Portal', pageId: 'artist-portal', alwaysRerender: true }
};

// Parametric routes: { pattern, pageEl, render(param) }
const PARAM_ROUTES = [
  { prefix: 'art/',     pageEl: 'art-detail',     render: renderArtDetail },
  { prefix: 'artists/', pageEl: 'artist-profile', render: renderArtistProfile }
];

let currentPage = 'home';

// -- Parse a hash into { pageId, param } --
function parseHash(hash) {
  if (!hash) return { pageId: 'home', param: null };
  // Check parametric routes first
  for (var i = 0; i < PARAM_ROUTES.length; i++) {
    var route = PARAM_ROUTES[i];
    if (hash.indexOf(route.prefix) === 0) {
      var param = hash.slice(route.prefix.length);
      return { pageId: route.pageEl, param: param, route: route };
    }
  }
  return { pageId: hash, param: null };
}

function navigateTo(hash) {
  var parsed = parseHash(hash);
  var pageId = parsed.pageId;
  var param  = parsed.param;
  var route  = parsed.route;

  // Hide all pages
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });

  var pageElId = route ? 'page-' + route.pageEl : 'page-' + pageId;
  var pageEl   = document.getElementById(pageElId);
  if (!pageEl) {
    // Fallback: try static page
    var fallback = PAGES[pageId];
    if (fallback) {
      pageEl = document.getElementById('page-' + fallback.pageId);
    }
  }
  if (pageEl) pageEl.classList.add('active');

  // Determine title
  var title = 'Maktab-al-fann';
  if (route) {
    title = route.pageEl === 'art-detail' ? 'Artwork' : 'Artist';
  } else if (PAGES[pageId]) {
    title = PAGES[pageId].title;
  }
  document.title = title + ' -- Maktab-al-fann';

  // Update URL
  history.pushState({ hash: hash }, '', '#' + hash);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Update nav active state (only for top-level pages)
  document.querySelectorAll('.nav-links a[data-page], [data-page]').forEach(function(link) {
    link.classList.toggle('active', link.dataset.page === pageId);
    if (link.getAttribute('aria-current')) {
      link.setAttribute('aria-current', link.dataset.page === pageId ? 'page' : 'false');
    }
  });

  // Render
  if (route) {
    // Parametric -- always re-render
    route.render(param);
  } else {
    var def = PAGES[pageId];
    if (def) {
      if (!pageEl._rendered || def.alwaysRerender) {
        def.render();
        if (pageEl) pageEl._rendered = true;
      }
    }
  }

  currentPage = hash;

  // Nav solid on admin
  var nav = document.getElementById('main-nav');
  if (pageId === 'admin') {
    nav && nav.classList.add('nav-solid');
  } else {
    nav && nav.classList.remove('nav-solid');
  }

  closeMobileMenu();
}

// Handle browser back/forward
window.addEventListener('popstate', function(e) {
  var hash = (e.state && e.state.hash) || location.hash.replace('#', '') || 'home';
  navigateTo(hash);
});

// -- Cart helpers exposed for cart-page.js --
function getCart() { return Cart.items; }
function removeFromCart(idx) { Cart.remove(idx); }
function updateCartNote(idx, note) {
  if (Cart.items[idx]) Cart.items[idx].note = note;
  Cart.save();
}

// -- Cart --
const Cart = {
  items: [],

  add: function(type, id, title, price, frameId, framePrice) {
    frameId    = frameId    || null;
    framePrice = framePrice || 0;
    var exists = this.items.find(function(i) { return i.type === type && i.id === id && i.frameId === frameId; });
    if (exists) {
      exists.qty = (exists.qty || 1) + 1;
    } else {
      this.items.push({ type: type, id: id, title: title, price: Number(price), frameId: frameId, framePrice: Number(framePrice), qty: 1, note: '' });
    }
    this.save();
    this.updateUI();
    this.flash();
  },

  remove: function(idx) {
    this.items.splice(idx, 1);
    this.save();
    this.updateUI();
  },

  total: function() {
    return this.items.reduce(function(sum, i) { return sum + (i.price + i.framePrice) * (i.qty || 1); }, 0);
  },

  save: function() {
    try { localStorage.setItem('maf_cart', JSON.stringify(this.items)); } catch(e) {}
  },

  load: function() {
    try {
      var saved = localStorage.getItem('maf_cart');
      if (saved) this.items = JSON.parse(saved);
    } catch(e) {}
  },

  updateUI: function() {
    var count = this.items.reduce(function(s, i) { return s + (i.qty || 1); }, 0);
    var badge = document.getElementById('cartCount');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }

    var listEl  = document.getElementById('cartItems');
    var totalEl = document.getElementById('cartTotal');

    if (listEl) {
      if (!this.items.length) {
        listEl.innerHTML = '<p class="cart-empty">Your selection is empty.<br>Discover the gallery to find a work that speaks to you.</p>';
      } else {
        var self = this;
        listEl.innerHTML = this.items.map(function(item, i) {
          return '<div class="cart-item">' +
            '<div class="cart-item-info">' +
            '<div class="cart-item-title">' + item.title + '</div>' +
            '<div class="cart-item-price">' + (item.price ? '&pound;' + Number(item.price + item.framePrice).toLocaleString() : 'Enquire') +
            (item.qty > 1 ? ' x ' + item.qty : '') + '</div>' +
            (item.frameId && item.frameId !== 'none' ? '<div class="cart-item-frame" style="font-size:0.65rem;color:var(--muted);">+ Frame</div>' : '') +
            '</div>' +
            '<button class="cart-item-remove" onclick="Cart.remove(' + i + ')" aria-label="Remove ' + item.title.replace(/'/g, "\\'") + '">&#10005;</button>' +
            '</div>';
        }).join('');
      }
    }

    if (totalEl) {
      var t = this.total();
      totalEl.textContent = t ? '&pound;' + t.toLocaleString() : 'Enquiry only';
    }
  },

  flash: function() {
    var btn = document.getElementById('cartBtn');
    if (btn) {
      btn.classList.add('cart-flash');
      setTimeout(function() { btn.classList.remove('cart-flash'); }, 600);
    }
    openCartDrawer();
    clearTimeout(Cart._autoClose);
    Cart._autoClose = setTimeout(function() { closeCartDrawer(); }, 3000);
  }
};

function addToCart(type, id, title, price, frameId, framePrice) {
  Cart.add(type, id, title, price, frameId, framePrice);
}

// -- Cart Drawer --
function openCartDrawer() {
  document.getElementById('cartDrawer') && document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay')    && document.getElementById('overlay').classList.add('active');
}

function closeCartDrawer() {
  document.getElementById('cartDrawer') && document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay')    && document.getElementById('overlay').classList.remove('active');
}

// -- Mobile Menu --
function openMobileMenu() {
  document.getElementById('mobileMenu')  && document.getElementById('mobileMenu').classList.add('open');
  document.getElementById('overlay')     && document.getElementById('overlay').classList.add('active');
  document.getElementById('hamburger')   && document.getElementById('hamburger').setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  document.getElementById('mobileMenu')  && document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('overlay')     && document.getElementById('overlay').classList.remove('active');
  document.getElementById('hamburger')   && document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
}

// -- Global Search --
function openGlobalSearch() {
  navigateTo('gallery');
  setTimeout(function() {
    var inp = document.getElementById('galSearchInput');
    if (inp) { inp.focus(); inp.select(); }
  }, 300);
}

// -- Scroll Effects --
function initScrollEffects() {
  var nav   = document.getElementById('main-nav');
  var lastY = 0;
  window.addEventListener('scroll', function() {
    var y = window.scrollY;
    y > 60 ? nav && nav.classList.add('scrolled') : nav && nav.classList.remove('scrolled');
    if (y > lastY + 10)      nav && nav.classList.add('nav-hidden');
    else if (y < lastY - 5)  nav && nav.classList.remove('nav-hidden');
    lastY = y;
  }, { passive: true });
}

// -- Nav Handlers --
function initNavHandlers() {
  // Desktop nav links
  document.querySelectorAll('.nav-links a[data-page]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo(link.dataset.page);
    });
  });

  // Logo
  var logo = document.querySelector('.nav-logo');
  if (logo) logo.addEventListener('click', function() { navigateTo('home'); });

  // Mobile nav
  document.querySelectorAll('[data-mobile-nav]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo(link.dataset.page);
    });
  });

  // Hamburger
  var hamburger = document.getElementById('hamburger');
  if (hamburger) hamburger.addEventListener('click', openMobileMenu);
  var mobileClose = document.getElementById('mobileMenuClose');
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

  // Cart button -- open cart page
  var cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', function() { navigateTo('cart'); });
  var cartClose = document.getElementById('cartClose');
  if (cartClose) cartClose.addEventListener('click', closeCartDrawer);

  // Global search
  var searchBtn = document.getElementById('globalSearchBtn');
  if (searchBtn) searchBtn.addEventListener('click', openGlobalSearch);

  // Overlay click
  var overlay = document.getElementById('overlay');
  if (overlay) overlay.addEventListener('click', function() {
    closeCartDrawer();
    closeMobileMenu();
  });

  // Checkout (drawer)
  var checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', function() {
    closeCartDrawer();
    navigateTo('cart');
  });
}

// -- Loading Screen --
function showLoadingProgress(pct) {
  var bar = document.getElementById('loadProgress');
  if (bar) bar.style.width = pct + '%';
}

function hideLoadingScreen() {
  var screen = document.getElementById('loading-screen');
  if (!screen) return;
  screen.style.opacity = '0';
  screen.style.transition = 'opacity 0.6s ease';
  setTimeout(function() { if (screen.parentNode) screen.parentNode.removeChild(screen); }, 700);
}

// -- Boot --
async function boot() {
  try {
    showLoadingProgress(15);
    try {
      await initDatabase();
    } catch(dbErr) {
      console.warn('sql.js failed to load, running without DB (ART_DATA only):', dbErr);
    }
    showLoadingProgress(70);

    Cart.load();
    Cart.updateUI();

    showLoadingProgress(85);

    initNavHandlers();
    initScrollEffects();

    showLoadingProgress(100);
    await new Promise(function(r) { setTimeout(r, 400); });

    hideLoadingScreen();

    // Navigate to initial page (supports parametric hashes)
    var hash = location.hash.replace('#', '') || 'home';
    navigateTo(hash);

    // Art injection after first paint
    setTimeout(function() {
      if (typeof injectPaintingArt === 'function') injectPaintingArt();
    }, 600);

  } catch(err) {
    console.error('Maktab-al-fann boot error:', err);
    var screen = document.getElementById('loading-screen');
    var msg = (err && (err.message || String(err))) || 'Unknown error';
    var isFileProtocol = location.protocol === 'file:';
    var hint = isFileProtocol
      ? 'You are opening the file directly. Use VS Code Live Server (right-click index.html → Open with Live Server) or run: python -m http.server 8080'
      : 'Check your internet connection — the database requires sql.js from CDN.';
    if (screen) {
      screen.innerHTML = '<div class="loading-emblem">' +
        '<span class="loading-arabic" style="color:hsl(350,50%,50%)">&#9888;</span>' +
        '<span class="loading-name">Failed to load</span>' +
        '<span class="loading-tagline" style="max-width:520px;font-size:.88rem;line-height:1.7;">' + hint + '</span>' +
        '<button class="btn btn-outline" onclick="location.reload()" style="margin-top:1rem;">Retry</button>' +
        '</div>';
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
