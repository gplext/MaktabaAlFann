// =============================================================================
// ARTWORK DETAIL PAGE  (#art/:id)
// Uses ART_DATA.paintingDetails for rich fields + timeline
// =============================================================================

function renderArtDetail(id) {
  var el = document.getElementById('page-art-detail');
  var pid = parseInt(id, 10);
  var p = ART_DATA.paintings.find(function(x) { return x.id === pid; });
  if (!p) {
    el.innerHTML = '<div class="page-inner container" style="padding-top:6rem;"><h2>Artwork not found.</h2><button class="btn btn-outline" onclick="navigateTo(\'gallery\')">Back to Gallery</button></div>';
    return;
  }
  var artist  = ART_DATA.artists.find(function(a) { return a.id === p.artist_id; });
  var style   = ART_DATA.styles.find(function(s) { return s.id === p.style_id; });
  var details = (ART_DATA.paintingDetails && ART_DATA.paintingDetails[pid]) || {};
  var artDet  = (ART_DATA.artistDetails  && artist && ART_DATA.artistDetails[artist.id]) || {};
  var colors  = p.colors || ['#8b1a4a', '#c9a84c', '#1a3a6a'];
  var c0 = colors[0], c1 = colors[1] || colors[0];

  el.innerHTML =
    '<div class="artd-wrap">' +
      buildArtDetailHero(p, artist, style, details, c0, c1) +
      buildArtDetailBody(p, artist, style, details, artDet) +
      buildSiteFooter() +
    '</div>';

  initTimelineScroll();
}

function buildArtDetailHero(p, artist, style, details, c0, c1) {
  var isFeatured = details.isFeatured ? '<span class="artd-featured-badge">Featured Work</span>' : '';
  return '<div class="artd-hero">' +
    '<div class="artd-hero-image">' +
    '<div class="art-placeholder" style="width:100%;height:100%;" data-painting-id="' + p.id + '">' +
    '<div class="art-placeholder-inner" style="background:linear-gradient(135deg,' + c0 + ' 0%,' + c1 + ' 100%);"></div>' +
    '<div class="art-placeholder-overlay"></div>' +
    '</div>' +
    '</div>' +
    '<div class="artd-hero-info">' +
    isFeatured +
    '<span class="artd-style-tag">' + (style ? style.name : '') + '</span>' +
    '<h1 class="artd-title">' + p.title + '</h1>' +
    '<div class="artd-byline">' +
    (artist ? '<button class="artd-artist-link" onclick="navigateTo(\'artists/' + artist.id + '\')">' + artist.name + '</button>' : '') +
    (p.year ? ' &nbsp;&middot;&nbsp; ' + p.year : '') +
    '</div>' +
    '<div class="artd-rule"></div>' +
    buildArtDetailMeta(p, details) +
    '<div class="artd-actions">' +
    '<button class="btn btn-primary" onclick="addToCart(\'painting\',' + p.id + ',\'' + p.title.replace(/'/g, "\\'") + '\',' + (p.price || 0) + ')">Add to Selection</button>' +
    '<button class="btn btn-outline" onclick="navigateTo(\'gallery\')">Back to Gallery</button>' +
    '</div>' +
    '</div>' +
    '</div>';
}

function buildArtDetailMeta(p, details) {
  var rows = [];
  if (details.medium)     rows.push(['Medium',     details.medium]);
  if (details.dimensions) rows.push(['Dimensions', details.dimensions]);
  if (p.technique)        rows.push(['Technique',  p.technique]);
  if (p.country_origin)   rows.push(['Origin',     p.country_origin]);
  if (p.culture_depicted) rows.push(['Culture',    p.culture_depicted]);
  if (p.price)            rows.push(['Price',      '&pound;' + Number(p.price).toLocaleString()]);
  if (!rows.length) return '';
  return '<div class="artd-meta-grid">' +
    rows.map(function(r) {
      return '<div class="artd-meta-item"><div class="artd-meta-label">' + r[0] + '</div><div class="artd-meta-val">' + r[1] + '</div></div>';
    }).join('') +
    '</div>';
}

function buildArtDetailBody(p, artist, style, details, artDet) {
  var sections = '';

  // Cultural history
  if (details.history) {
    sections += buildArtSection('Cultural History', details.history, 'artd-section-history');
  } else if (p.history_context) {
    sections += buildArtSection('Historical Context', p.history_context, 'artd-section-history');
  }

  // Style explanation
  if (details.styleExplanation) {
    sections += buildArtSection('Style &amp; Technique', details.styleExplanation, 'artd-section-style');
  }

  // Cultural context
  if (details.culturalContext) {
    sections += buildArtSection('Cultural Context', details.culturalContext, 'artd-section-context');
  }

  // Timeline
  if (details.timeline && details.timeline.length) {
    sections += buildArtTimeline(details.timeline);
  }

  // Artist bio strip
  if (artist) {
    sections += buildArtDetailArtistStrip(artist, artDet);
  }

  return '<div class="page-inner"><div class="artd-body container">' + sections + '</div></div>';
}

function buildArtSection(heading, text, cls) {
  return '<div class="artd-section ' + cls + '">' +
    '<h2 class="artd-section-heading">' + heading + '</h2>' +
    '<div class="artd-section-rule"></div>' +
    '<p class="artd-section-text">' + text + '</p>' +
    '</div>';
}

function buildArtTimeline(events) {
  var items = events.map(function(ev, i) {
    return '<div class="artd-tl-item" data-tl-index="' + i + '">' +
      '<div class="artd-tl-dot"></div>' +
      '<div class="artd-tl-content">' +
      '<div class="artd-tl-year">' + ev.year + '</div>' +
      '<div class="artd-tl-title">' + ev.title + '</div>' +
      '<p class="artd-tl-desc">' + ev.description + '</p>' +
      '</div>' +
      '</div>';
  }).join('');
  return '<div class="artd-section artd-section-timeline">' +
    '<h2 class="artd-section-heading">Timeline</h2>' +
    '<div class="artd-section-rule"></div>' +
    '<div class="artd-timeline">' + items + '</div>' +
    '</div>';
}

function buildArtDetailArtistStrip(artist, artDet) {
  var initials = artist.name.split(' ').map(function(w) { return w[0]; }).join('').substring(0,2);
  var exhibitions = artDet.exhibitions || artist.awards || '';
  return '<div class="artd-artist-strip">' +
    '<div class="artd-artist-avatar"><span>' + initials + '</span></div>' +
    '<div class="artd-artist-body">' +
    '<div class="artd-artist-byline">About the Artist</div>' +
    '<div class="artd-artist-name">' + artist.name + '</div>' +
    '<p class="artd-artist-bio">' + (artist.bio || '') + '</p>' +
    (exhibitions ? '<p class="artd-artist-exh"><strong>Selected exhibitions:</strong> ' + exhibitions + '</p>' : '') +
    '<button class="btn btn-outline btn-sm" style="margin-top:1rem;" onclick="navigateTo(\'artists/' + artist.id + '\')">Full Profile</button>' +
    '</div>' +
    '</div>';
}

function initTimelineScroll() {
  var items = document.querySelectorAll('.artd-tl-item');
  if (!items.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('artd-tl-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  items.forEach(function(el) { obs.observe(el); });
}
