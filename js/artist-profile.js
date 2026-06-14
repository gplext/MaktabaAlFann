// =============================================================================
// ARTIST PROFILE PAGE  (#artists/:id)
// Uses ART_DATA.artistDetails for rich fields
// =============================================================================

function renderArtistProfile(id) {
  var el = document.getElementById('page-artist-profile');
  var aid = parseInt(id, 10);
  var artist = ART_DATA.artists.find(function(a) { return a.id === aid; });
  if (!artist) {
    el.innerHTML = '<div class="page-inner container" style="padding-top:6rem;"><h2>Artist not found.</h2><button class="btn btn-outline" onclick="navigateTo(\'artists\')">Back to Artists</button></div>';
    return;
  }
  var details  = (ART_DATA.artistDetails && ART_DATA.artistDetails[aid]) || {};
  var paintings = ART_DATA.paintings.filter(function(p) { return p.artist_id === aid; });
  var initials  = artist.name.split(' ').map(function(w) { return w[0]; }).join('').substring(0,2);

  el.innerHTML =
    buildArtistHero(artist, details, initials, paintings.length) +
    buildArtistBody(artist, details, paintings) +
    buildSiteFooter();

  setTimeout(function() {
    if (typeof injectPaintingArt === 'function') injectPaintingArt();
  }, 150);
}

function buildArtistHero(artist, details, initials, workCount) {
  var verified = details.isVerified
    ? '<span class="apr-verified" title="Verified artist">&#10003; Verified</span>'
    : '';
  var hue = artist.profile_color || 'hsl(350,50%,25%)';
  return '<div class="apr-hero" style="background:' + hue + ';">' +
    '<div class="apr-hero-inner container">' +
    '<div class="apr-avatar-wrap">' +
    '<div class="apr-avatar">' + initials + '</div>' +
    '</div>' +
    '<div class="apr-hero-text">' +
    '<span class="hero-eyebrow">' + (artist.nationality || '') + (artist.born ? ' &middot; b. ' + artist.born : '') + (artist.died ? ' &ndash; ' + artist.died : '') + '</span>' +
    '<h1 class="apr-name">' + artist.name + '</h1>' +
    verified +
    '<div class="apr-stats">' +
    '<span>' + workCount + ' work' + (workCount !== 1 ? 's' : '') + ' in collection</span>' +
    (details.contactEmail ? ' &nbsp;&middot;&nbsp; <a class="apr-email" href="mailto:' + details.contactEmail + '">' + details.contactEmail + '</a>' : '') +
    (details.websiteUrl ? ' &nbsp;&middot;&nbsp; <a class="apr-web" href="' + details.websiteUrl + '" target="_blank" rel="noopener">' + details.websiteUrl.replace('https://','') + '</a>' : '') +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
}

function buildArtistBody(artist, details, paintings) {
  var sections = '';

  // Biography
  if (artist.bio) {
    sections += '<div class="apr-section">' +
      '<h2 class="apr-section-heading">Biography</h2>' +
      '<div class="artd-section-rule"></div>' +
      '<p class="apr-section-text">' + artist.bio + '</p>' +
      '</div>';
  }

  // Notable for / Influences
  if (artist.notable_for) {
    sections += '<div class="apr-section">' +
      '<h2 class="apr-section-heading">Known For</h2>' +
      '<div class="artd-section-rule"></div>' +
      '<p class="apr-section-text">' + artist.notable_for + '</p>' +
      '</div>';
  }

  // Awards & Recognition
  var awards = artist.awards || details.awards || '';
  if (awards) {
    sections += '<div class="apr-section">' +
      '<h2 class="apr-section-heading">Awards &amp; Recognition</h2>' +
      '<div class="artd-section-rule"></div>' +
      '<p class="apr-section-text">' + awards + '</p>' +
      '</div>';
  }

  // Exhibitions
  if (details.exhibitions) {
    sections += '<div class="apr-section">' +
      '<h2 class="apr-section-heading">Selected Exhibitions</h2>' +
      '<div class="artd-section-rule"></div>' +
      '<p class="apr-section-text">' + details.exhibitions + '</p>' +
      '</div>';
  }

  // Works in collection grid
  if (paintings.length) {
    sections += buildArtistWorksGrid(paintings);
  }

  return '<div class="page-inner"><div class="apr-body container">' + sections + '</div></div>';
}

function buildArtistWorksGrid(paintings) {
  var cards = paintings.map(function(p) {
    var colors = p.colors || ['#8b1a4a', '#c9a84c'];
    var c0 = colors[0], c1 = colors[1] || colors[0];
    var details = ART_DATA.paintingDetails && ART_DATA.paintingDetails[p.id];
    var badge   = details && details.isFeatured ? '<span class="apr-work-featured">Featured</span>' : '';
    return '<div class="apr-work-card" onclick="navigateTo(\'art/' + p.id + '\')" role="button" tabindex="0" aria-label="View ' + p.title + '">' +
      '<div class="art-placeholder" style="aspect-ratio:3/4;" data-painting-id="' + p.id + '">' +
      '<div class="art-placeholder-inner" style="background:linear-gradient(135deg,' + c0 + ' 0%,' + c1 + ' 100%);"></div>' +
      '<div class="art-placeholder-overlay"></div>' +
      '</div>' +
      badge +
      '<div class="apr-work-info">' +
      '<div class="apr-work-title">' + p.title + '</div>' +
      '<div class="apr-work-meta">' + (p.year || '') + (p.country_origin ? ' &middot; ' + p.country_origin : '') + '</div>' +
      '</div>' +
      '</div>';
  }).join('');
  return '<div class="apr-section">' +
    '<h2 class="apr-section-heading">Works in Collection</h2>' +
    '<div class="artd-section-rule"></div>' +
    '<div class="apr-works-grid">' + cards + '</div>' +
    '</div>';
}
