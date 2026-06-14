// =============================================================================
// COLLECTION / CART PAGE  (#cart)
// Full-page cart with notes per item — enquiry-only, no checkout
// =============================================================================

function renderCartPage() {
  var el = document.getElementById('page-cart');
  var cart = typeof getCart === 'function' ? getCart() : (window._cartItems || []);
  el.innerHTML =
    '<div class="page-inner">' +
    '<div class="container" style="padding-top:5rem;padding-bottom:5rem;">' +
    buildCartPageHeader(cart.length) +
    (cart.length ? buildCartPageItems(cart) + buildCartPageEnquire(cart) : buildCartPageEmpty()) +
    '</div>' +
    '</div>' +
    buildSiteFooter();
  initCartPageHandlers();
}

function buildCartPageHeader(count) {
  return '<div class="cartp-header">' +
    '<div>' +
    '<span class="how-to-eyebrow">Your Selection</span>' +
    '<h1 class="cartp-title">Your Collection</h1>' +
    '</div>' +
    (count ? '<span class="cartp-count">' + count + ' item' + (count !== 1 ? 's' : '') + '</span>' : '') +
    '</div>' +
    '<div class="gold-rule" style="margin:1.5rem 0 2.5rem;"></div>';
}

function buildCartPageItems(cart) {
  var rows = cart.map(function(item, i) {
    var p = ART_DATA.paintings.find(function(x) { return x.id === item.id; });
    var artist = p ? ART_DATA.artists.find(function(a) { return a.id === p.artist_id; }) : null;
    var colors = (p && p.colors) || ['#8b1a4a', '#c9a84c'];
    var c0 = colors[0], c1 = colors[1] || colors[0];
    var details = p && ART_DATA.paintingDetails && ART_DATA.paintingDetails[p.id];
    var dim = details ? details.dimensions : (p && p.width_cm ? p.width_cm + ' x ' + p.height_cm + ' cm' : '');
    return '<div class="cartp-item" data-cart-index="' + i + '">' +
      '<div class="cartp-thumb" onclick="navigateTo(\'art/' + (p ? p.id : '') + '\')">' +
      '<div class="art-placeholder" style="width:100%;height:100%;" ' + (p ? 'data-painting-id="' + p.id + '"' : '') + '>' +
      '<div class="art-placeholder-inner" style="background:linear-gradient(135deg,' + c0 + ' 0%,' + c1 + ' 100%);"></div>' +
      '<div class="art-placeholder-overlay"></div>' +
      '</div>' +
      '</div>' +
      '<div class="cartp-info">' +
      '<div class="cartp-item-title">' + item.title + '</div>' +
      (artist ? '<div class="cartp-item-artist">' + artist.name + '</div>' : '') +
      (dim ? '<div class="cartp-item-dim">' + dim + '</div>' : '') +
      '<div class="cartp-note-wrap">' +
      '<label class="cartp-note-label" for="cart-note-' + i + '">Notes for the gallery:</label>' +
      '<textarea class="cartp-note-input" id="cart-note-' + i + '" data-index="' + i + '"' +
      ' placeholder="Specific requests, room dimensions, framing preferences...">' +
      (item.note || '') +
      '</textarea>' +
      '</div>' +
      '</div>' +
      '<div class="cartp-item-actions">' +
      '<button class="cartp-view-btn" onclick="navigateTo(\'art/' + (p ? p.id : '') + '\')" title="View artwork">&#128065;</button>' +
      '<button class="cartp-remove-btn" data-index="' + i + '" title="Remove from selection">&#10005;</button>' +
      '</div>' +
      '</div>';
  }).join('');
  return '<div class="cartp-list">' + rows + '</div>';
}

function buildCartPageEnquire(cart) {
  return '<div class="cartp-enquire-box">' +
    '<div class="cartp-enquire-inner">' +
    '<h2 class="cartp-enquire-heading">Enquire about your selection</h2>' +
    '<p class="cartp-enquire-text">We will get back to you within 24 hours with pricing, availability, and shipping information for your selected works.</p>' +
    '<div class="cartp-enquire-actions">' +
    '<a class="btn btn-primary" href="mailto:hello@maktabalfann.com?subject=Enquiry about ' + cart.length + ' artwork' + (cart.length !== 1 ? 's' : '') + '&body=' + encodeURIComponent(buildEnquiryEmailBody(cart)) + '">' +
    'Send Enquiry by Email' +
    '</a>' +
    '<button class="btn btn-outline" onclick="navigateTo(\'gallery\')">Continue Browsing</button>' +
    '</div>' +
    '</div>' +
    '</div>';
}

function buildEnquiryEmailBody(cart) {
  var lines = ['I would like to enquire about the following artworks:\n'];
  cart.forEach(function(item, i) {
    lines.push((i + 1) + '. ' + item.title);
    if (item.note) lines.push('   Notes: ' + item.note);
  });
  lines.push('\nPlease send pricing, availability, and shipping information.');
  return lines.join('\n');
}

function buildCartPageEmpty() {
  return '<div class="cartp-empty">' +
    '<div class="cartp-empty-icon">&#128697;</div>' +
    '<h2>Your selection is empty</h2>' +
    '<p>Browse the gallery and add artworks you love to your selection.</p>' +
    '<button class="btn btn-primary" onclick="navigateTo(\'gallery\')">Explore the Gallery</button>' +
    '</div>';
}

function initCartPageHandlers() {
  // Remove buttons
  document.querySelectorAll('.cartp-remove-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var idx = parseInt(btn.dataset.index, 10);
      if (typeof removeFromCart === 'function') removeFromCart(idx);
      renderCartPage();
    });
  });

  // Save notes on blur
  document.querySelectorAll('.cartp-note-input').forEach(function(ta) {
    ta.addEventListener('blur', function() {
      var idx = parseInt(ta.dataset.index, 10);
      if (typeof updateCartNote === 'function') updateCartNote(idx, ta.value);
    });
  });

  // Inject art placeholders
  setTimeout(function() {
    if (typeof injectPaintingArt === 'function') injectPaintingArt();
  }, 150);
}
