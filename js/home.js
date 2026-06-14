// =============================================================================
// HOME PAGE
// Hero + Carousel + How-to section
// =============================================================================

function renderHome() {
  const el = document.getElementById('page-home');

  // Pick featured paintings for carousel (curated selection)
  const featuredIds = [6, 1, 20, 15, 27, 14, 23, 50, 9];
  const featured = featuredIds.map(id => getPaintingById(id)).filter(Boolean);

  el.innerHTML = `
    ${buildHero()}
    ${buildCarousel(featured)}
    ${buildStoriesSection()}
    ${buildGalleryStats()}
    ${buildHowTo()}
    ${buildSiteFooter()}
  `;

  initCarousel(featured);
  initScrollIndicator();
  initHeroAnimations();
  initStatsCounters();
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function buildHero() {
  return (
    '<section class="home-hero-editorial" aria-label="Welcome">' +
      '<div class="hhe-top-bar">' +
        '<div class="hhe-top-rule"></div>' +
        '<span class="hhe-location">Est. 2024 &middot; Karachi, Pakistan</span>' +
        '<div class="hhe-top-rule"></div>' +
      '</div>' +
      '<div class="hhe-body">' +
        '<div class="hhe-vertical-label" aria-hidden="true">Fine Pakistani Art</div>' +
        '<div class="hhe-main">' +
          '<div class="hhe-urdu-title" dir="rtl" lang="ur">مکتب الفن</div>' +
          '<h1 class="hhe-title">Maktaba<br/>Al&#8209;Fann</h1>' +
        '</div>' +
      '</div>' +
      '<div class="hhe-bottom-bar">' +
        '<div class="hhe-bottom-rule"></div>' +
        '<div class="hhe-bottom-content">' +
          '<p class="hhe-tagline">A window into Pakistan\'s soul — its streets, Sufi shrines,<br/>mountain valleys, and ancient Mughal heritage.</p>' +
          '<button class="hhe-cta" onclick="navigateTo(\'gallery\')">' +
            'Enter the Gallery <span class="hhe-cta-line"></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</section>'
  );
}

function buildGeoPattern() {
  // Simple SVG Islamic star pattern
  return `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"
         style="position:absolute;inset:0;width:100%;height:100%;opacity:0.08;pointer-events:none;">
      <defs>
        <pattern id="star8" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <polygon points="40,5 47,28 70,20 55,38 75,50 52,50 50,74 40,55 30,74 28,50 5,50 25,38 10,20 33,28"
                   fill="none" stroke="hsl(42,60%,65%)" stroke-width="0.8"/>
          <polygon points="40,15 44,30 58,25 50,36 62,44 48,44 47,60 40,50 33,60 32,44 18,44 30,36 22,25 36,30"
                   fill="none" stroke="hsl(42,60%,65%)" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#star8)"/>
    </svg>
  `;
}

// ── Carousel ──────────────────────────────────────────────────────────────────

function buildCarousel(paintings) {
  const slides = paintings.map((p, i) => {
    const colors = p.colors || ['#8b1a4a','#c9a84c','#1a3a6a'];
    const c1 = colors[0] || '#8b1a4a';
    const c2 = colors[1] || '#c9a84c';
    const c3 = colors[2] || '#1a3a6a';

    return `
      <div class="carousel-slide ${i === 0 ? 'active' : ''}"
           data-slide="${i}" role="group" aria-label="Artwork ${i+1} of ${paintings.length}">
        <div class="art-placeholder" style="width:100%;height:100%;">
          <div class="art-placeholder-inner" style="
            background: linear-gradient(${135 + i*20}deg, ${c1} 0%, ${c2} 50%, ${c3} 100%);
          "></div>
          <div class="art-placeholder-overlay"></div>
        </div>
        <div class="carousel-info">
          <div class="carousel-info-inner">
            <span class="carousel-style-tag">${p.style_name || ''}</span>
            <h2 class="carousel-painting-title">${p.title}</h2>
            <p class="carousel-artist-name">— ${p.artist_name || 'Unknown Artist'}, ${p.year}</p>
            <p class="carousel-cultural-note">${(p.history_context || '').substring(0,180)}...</p>
            <div class="carousel-arrows">
              <button class="carousel-arrow" id="carouselPrev" aria-label="Previous artwork">&#8592;</button>
              <button class="carousel-arrow" id="carouselNext" aria-label="Next artwork">&#8594;</button>
              <button class="btn btn-outline" style="border-color:rgba(255,255,255,0.5);color:white;font-size:0.55rem;"
                      onclick="openPaintingDetail(${p.id})">View Work</button>
            </div>
          </div>
        </div>
        <div class="carousel-controls" role="tablist" aria-label="Carousel navigation">
          ${paintings.map((_, j) => `
            <div class="carousel-dot ${j===i?'active':''}"
                 role="tab" tabindex="0" aria-selected="${j===i}"
                 aria-label="Go to artwork ${j+1}"
                 data-dot="${j}"></div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  return `
    <section class="home-carousel-section" aria-label="Featured artworks">
      <div class="carousel-wrapper" id="carouselWrapper">
        ${slides}
      </div>

    </section>
  `;
}

function initCarousel(paintings) {
  let current = 0;
  let timer = null;

  const slides = document.querySelectorAll('.carousel-slide');
  const dots   = document.querySelectorAll('.carousel-dot');

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + paintings.length) % paintings.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function autoPlay() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  function resetTimer() {
    clearInterval(timer);
    autoPlay();
  }

  // Prev / Next (event delegation — buttons are in the last/active slide)
  document.getElementById('carouselWrapper')?.addEventListener('click', e => {
    if (e.target.id === 'carouselPrev' || e.target.closest('#carouselPrev')) {
      goTo(current - 1); resetTimer();
    }
    if (e.target.id === 'carouselNext' || e.target.closest('#carouselNext')) {
      goTo(current + 1); resetTimer();
    }
  });

  // Dot clicks
  dots.forEach(dot => {
    dot.addEventListener('click', () => { goTo(parseInt(dot.dataset.dot)); resetTimer(); });
  });

  autoPlay();
}

// ── How-to Section ────────────────────────────────────────────────────────────

function buildHowTo() {
  const criteria = [
    'Style', 'Artist', 'Year of Make', 'Country of Origin',
    'Country Depicted', 'Culture Depicted', 'Historical Period',
    'Colors Used', 'Size', 'Price Range'
  ];

  return `
    <section class="how-to-section" id="howToSection">
      <div class="how-to-inner">
        <span class="how-to-eyebrow">How It Works</span>
        <h2>Find art that speaks to you</h2>
        <div class="gold-rule" style="margin:1.5rem auto;"></div>
        <p class="desc">
          All paintings can be viewed in Gallery. Our powerful AI-assisted search engine
          will select paintings based on your mood, thoughts, or feelings.
          The search engine can help you select paintings based on:
        </p>
        <div class="search-chips" role="list" aria-label="Search criteria">
          ${criteria.map(c => `
            <div class="chip" role="listitem" onclick="navigateTo('gallery')" tabindex="0">${c}</div>
          `).join('')}
        </div>
        <p class="desc" style="font-style:italic;">
          Or simply type how you feel — <em>"something calm and blue,"</em>
          <em>"a painting that tells an ancient story,"</em>
          or <em>"Mughal art with forest greens"</em> — and let the gallery respond.
        </p>
        <button class="btn btn-primary" onclick="navigateTo('gallery')">
          Enter the Gallery &nbsp; &#8594;
        </button>
      </div>
    </section>
  `;
}


// -- Stories from Pakistan (editorial alternating layout) ---------------------

function buildStoriesSection() {
  var storyIds = [3, 7, 12, 19, 24];
  var stories = storyIds.map(function(id) { return getPaintingById(id); }).filter(Boolean).slice(0, 5);
  if (!stories.length) return '';

  var rows = stories.map(function(p, i) {
    var det = (ART_DATA.paintingDetails && ART_DATA.paintingDetails[p.id]) || {};
    var colors = p.colors || ['#3a1a2a', '#8b6914'];
    var c1 = colors[0], c2 = colors[1] || colors[0], c3 = colors[2] || c2;
    var isEven = i % 2 === 1;
    var styleLabel = (p.style_name || '').toUpperCase();
    var year = p.year || '';
    var desc = det.history || p.history_context || p.description || '';
    desc = desc.substring(0, 160) + (desc.length > 160 ? '.' : '');

    var imgBlock = '<div class="sto-img">' +
      '<div class="art-placeholder" style="width:100%;height:100%;">' +
      '<div class="art-placeholder-inner" style="background:linear-gradient(' + (130 + i*25) + 'deg,' + c1 + ' 0%,' + c2 + ' 55%,' + c3 + ' 100%);"></div>' +
      '<div class="art-placeholder-overlay"></div>' +
      '</div>' +
      '</div>';

    var infoBlock = '<div class="sto-info">' +
      '<div class="sto-meta">' + styleLabel + (year ? ' &middot; ' + year : '') + '</div>' +
      '<h3 class="sto-title">' + p.title + '</h3>' +
      '<p class="sto-by">by <em>' + (p.artist_name || '') + '</em></p>' +
      '<p class="sto-desc">' + desc + '</p>' +
      '<button class="sto-enquire" onclick="openPaintingDetail(' + p.id + ')">Enquire <span class="sto-enquire-line"></span></button>' +
      '</div>';

    return '<div class="sto-row ' + (isEven ? 'sto-row--flip' : '') + '">' +
      (isEven ? infoBlock + imgBlock : imgBlock + infoBlock) +
      '</div>';
  }).join('');

  return '<section class="sto-section">' +
    '<div class="sto-header">' +
    '<h2 class="sto-heading">Stories from Pakistan</h2>' +
    '<div class="sto-header-rule"></div>' +
    '<span class="sto-header-label">Curated Narratives</span>' +
    '</div>' +
    '<div class="sto-list">' + rows + '</div>' +
    '</section>';
}

// ── Footer ────────────────────────────────────────────────────────────────────

function buildSiteFooter() {
  return `
    <footer class="site-footer">
      <div class="footer-grid">
        <div>
          <span class="footer-brand-arabic">مكتب الفن</span>
          <span class="footer-brand-name">Maktab-al-fann</span>
          <p class="footer-tagline">
            An immersive Pakistani art gallery for Middle East collectors.
            Every artwork is a cultural narrative — story-driven, not product-driven.
          </p>
        </div>
        <div>
          <div class="footer-col-title">Gallery</div>
          <div class="footer-links">
            <a data-page="gallery" onclick="navigateTo('gallery')">All Paintings</a>
            <a data-page="artists" onclick="navigateTo('artists')">Artists</a>
            <a data-page="digital" onclick="navigateTo('digital')">Digital Art</a>
            <a data-page="exhibitions" onclick="navigateTo('exhibitions')">Exhibitions</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Services</div>
          <div class="footer-links">
            <a onclick="navigateTo('shop')">Framing</a>
            <a onclick="navigateTo('shop')">Art Materials</a>
            <a onclick="navigateTo('shop')">Hanging Expert</a>
            <a onclick="navigateTo('shop')">Commission an Artist</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">About</div>
          <div class="footer-links">
            <a onclick="navigateTo('about')">Our Story</a>
            <a onclick="navigateTo('about')">Gallery Mission</a>
            <a href="mailto:hello@maktabalfann.com">Contact Us</a>
            <a onclick="navigateTo('about')">Press</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Maktab-al-fann by Living Arts. All rights reserved.</p>
        <p>London · Dubai · Karachi</p>
      </div>
    </footer>
  `;
}

// ── Gallery Stats ─────────────────────────────────────────────────────────────

function buildGalleryStats() {
  // Compute stats from ART_DATA
  const totalArtworks   = (ART_DATA.paintings || []).length + (ART_DATA.digital_works || []).length;
  const totalArtists    = (ART_DATA.artists || []).length;

  const countries = new Set();
  (ART_DATA.paintings || []).forEach(p => {
    if (p.country_origin) countries.add(p.country_origin);
  });
  const countriesCount  = countries.size;

  const stylesUsed = new Set();
  (ART_DATA.paintings || []).forEach(p => { if (p.style_id) stylesUsed.add(p.style_id); });
  const artTypesCount   = stylesUsed.size;

  let featuredCount = 0;
  if (ART_DATA.paintingDetails) {
    Object.values(ART_DATA.paintingDetails).forEach(function(d) { if (d.isFeatured) featuredCount++; });
  }

  var statItems = [
    { icon: '\u{1F5BC}', number: totalArtworks,   label: 'Artworks<br>in Collection',   id: 'stat-artworks' },
    { icon: '\u{1F3A8}', number: totalArtists,    label: 'Represented<br>Artists',       id: 'stat-artists' },
    { icon: '\u{1F30D}', number: countriesCount,  label: 'Countries<br>Represented',     id: 'stat-countries' },
    { icon: '✶',    number: artTypesCount,   label: 'Art Styles<br>&amp; Traditions', id: 'stat-styles' },
    { icon: '★',    number: featuredCount,   label: 'Featured<br>Works',            id: 'stat-featured' },
  ];

  var items = statItems.map(function(s) {
    return '<div class="stat-item"><span class="stat-icon">' + s.icon + '</span>' +
           '<span class="stat-number" id="' + s.id + '" data-target="' + s.number + '">0</span>' +
           '<span class="stat-label">' + s.label + '</span></div>';
  }).join('');

  return '<section class="gallery-stats-section" aria-label="Gallery at a glance">' +
    '<div class="stats-inner">' +
    '<span class="stats-eyebrow">The Collection</span>' +
    '<h2 class="stats-heading">Maktab-al-fann at a Glance</h2>' +
    '<div class="stats-rule"></div>' +
    '<div class="stats-grid">' + items + '</div>' +
    '</div></section>';
}

function initStatsCounters() {
  var statEls = document.querySelectorAll('.stat-number[data-target]');
  if (!statEls.length) return;

  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    if (!target) { el.textContent = '0'; return; }
    var duration = 1400;
    var start = performance.now();
    function tick(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
        el.classList.add('counted');
      }
    }
    requestAnimationFrame(tick);
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statEls.forEach(function(el) { observer.observe(el); });
}

// ── Animations ────────────────────────────────────────────────────────────────

function initScrollIndicator() {
  var el = document.getElementById('scrollToCarousel');
  if (el) el.addEventListener('click', function() {
    var sec = document.querySelector('.home-carousel-section');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  });
}

function initHeroAnimations() {
  var urduHeader = document.querySelector('.hhe-urdu-header');
  if (urduHeader) { urduHeader.style.opacity = '0'; urduHeader.style.transition = 'opacity 1s ease 0s'; }
  var title = document.querySelector('.hhe-title');
  if (!title) return;
  title.style.opacity = '0';
  title.style.transform = 'translateY(30px)';
  title.style.transition = 'opacity 1s ease 0.2s, transform 1s ease 0.2s';
  var tagline = document.querySelector('.hhe-tagline');
  if (tagline) { tagline.style.opacity = '0'; tagline.style.transition = 'opacity 0.8s ease 0.4s'; }
  var cta = document.querySelector('.hhe-cta');
  if (cta) { cta.style.opacity = '0'; cta.style.transition = 'opacity 0.8s ease 0.6s'; }
  requestAnimationFrame(function() {
    setTimeout(function() {
      if (urduHeader) urduHeader.style.opacity = '1';
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
      if (tagline) tagline.style.opacity = '1';
      if (cta) cta.style.opacity = '1';
    }, 150);
  });
}
