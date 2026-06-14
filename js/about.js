// =============================================================================
// ABOUT PAGE -- powered by ART_DATA.gallery
// =============================================================================

function renderAbout() {
  var el = document.getElementById('page-about');
  var g = (typeof ART_DATA !== 'undefined' && ART_DATA.gallery) ? ART_DATA.gallery : null;
  el.innerHTML =
    buildAboutHero(g) +
    buildAboutBody(g) +
    buildSiteFooter();
}

// -- Hero --
function buildAboutHero(g) {
  var founded = g ? g.founded : 2018;
  var name    = g ? g.name    : 'Maktab-al-fann by Living Arts';
  return '<div class="about-hero">' +
    '<div class="about-hero-inner container">' +
    '<span class="how-to-eyebrow">Est. ' + founded + ' &middot; London</span>' +
    '<h1 style="font-family:var(--font-display);font-size:clamp(2.5rem,5vw,4rem);color:var(--primary);margin:.5rem 0 .25rem;font-weight:700;">&#x645;&#x643;&#x62A;&#x628; &#x627;&#x644;&#x641;&#x646;</h1>' +
    '<p style="font-family:var(--font-display);font-size:1.15rem;color:var(--secondary);margin:.25rem 0 1.5rem;letter-spacing:.05em;">' + name + '</p>' +
    '<div class="gold-rule" style="margin:1.25rem 0;max-width:320px;"></div>' +
    '<p style="font-size:1.05rem;line-height:1.85;max-width:600px;color:var(--foreground);opacity:.85;">' +
    '&#x201C;Maktab-al-fann&#x201D; &#x2014; means <em>the studio of art</em> in Arabic. ' +
    'We believe every home deserves a window onto another world. Our gallery is that window.' +
    '</p>' +
    '</div></div>';
}

// -- Body --
function buildAboutBody(g) {
  return '<div class="page-inner"><div class="container" style="padding-top:4rem;padding-bottom:4rem;">' +
    buildMissionSection(g) +
    buildHistorySection(g) +
    buildVisionSection(g) +
    buildValuesSection() +
    buildTeamSection(g) +
    buildContactSection() +
    '</div></div>';
}

// -- Mission --
function buildMissionSection(g) {
  var text = g ? g.mission :
    'To preserve, celebrate, and reinterpret the living traditions of Islamic and South Asian art.';
  return '<div class="about-section about-mission">' +
    '<div class="about-section-text">' +
    '<span class="how-to-eyebrow">Our Mission</span>' +
    '<h2>Story-driven, not product-driven</h2>' +
    '<div class="gold-rule" style="margin:1rem 0 1.5rem;"></div>' +
    '<p style="font-size:1.05rem;line-height:1.9;">' + text + '</p>' +
    '<p style="line-height:1.9;margin-top:1rem;">Every artwork comes with deep contextual annotation: the style\'s evolution, the artist\'s biography, the historical moment depicted. We want you to fall in love with a painting because you understand it.</p>' +
    '<div style="margin-top:2rem;"><button class="btn btn-primary" onclick="navigateTo(\'gallery\')">Explore the Collection</button></div>' +
    '</div>' +
    '<div class="about-section-art">' +
    '<div class="art-placeholder" style="aspect-ratio:3/4;max-width:300px;">' +
    '<div class="art-placeholder-inner" style="background:linear-gradient(155deg,hsl(350,50%,25%) 0%,hsl(42,60%,35%) 60%,hsl(215,50%,30%) 100%);"></div>' +
    '<div class="art-placeholder-overlay"></div>' +
    buildSmallGeoPattern() +
    '</div></div></div>';
}

// -- History --
function buildHistorySection(g) {
  if (!g || !g.history) return '';
  return '<div class="about-history-section">' +
    '<span class="how-to-eyebrow" style="display:block;text-align:center;margin-bottom:.5rem;">Our Story</span>' +
    '<h2 style="text-align:center;margin-bottom:1rem;">How we began</h2>' +
    '<div class="gold-rule" style="margin:0 auto 2rem;"></div>' +
    '<p style="font-size:1.05rem;line-height:1.9;max-width:780px;margin:0 auto;">' + g.history + '</p>' +
    '</div>';
}

// -- Vision --
function buildVisionSection(g) {
  if (!g || !g.vision) return '';
  return '<div class="about-vision-section">' +
    '<div class="about-vision-inner">' +
    '<span class="how-to-eyebrow" style="display:block;margin-bottom:.5rem;">Our Vision</span>' +
    '<h2 style="margin-bottom:1rem;">What we\'re building toward</h2>' +
    '<div class="gold-rule" style="margin:0 0 1.5rem;"></div>' +
    '<p style="font-size:1.05rem;line-height:1.9;">' + g.vision + '</p>' +
    '</div></div>';
}

// -- Values --
function buildValuesSection() {
  var values = [
    { icon: '&#9680;', title: 'Cultural Authenticity',
      text: 'We work exclusively with artists from South Asian and Islamic traditions, or artists deeply formed by them. No pastiche, no superficial borrowing.' },
    { icon: '&#9728;', title: 'Collector Education',
      text: 'The most powerful thing a gallery can do is teach. Every painting has full annotation: style history, cultural context, artist biography.' },
    { icon: '&#9784;', title: 'Artist Welfare',
      text: 'Our artists receive fair compensation, long-term partnership, and global visibility. We are a gallery -- not a marketplace.' },
    { icon: '&#9830;', title: 'Diaspora Identity',
      text: 'Many of our collectors are South Asian diaspora -- Pakistani, Indian, Bangladeshi -- for whom our art is a reconnection with heritage and home.' },
  ];
  var cards = values.map(function(v) {
    return '<div class="value-card"><div class="value-icon">' + v.icon + '</div><h3>' + v.title + '</h3><p>' + v.text + '</p></div>';
  }).join('');
  return '<div class="about-values" style="margin-top:5rem;">' +
    '<span class="how-to-eyebrow" style="display:block;text-align:center;margin-bottom:.5rem;">Our Principles</span>' +
    '<h2 style="text-align:center;margin-bottom:2.5rem;">What we stand for</h2>' +
    '<div class="values-grid">' + cards + '</div>' +
    '</div>';
}

// -- Team --
function buildTeamSection(g) {
  var team = (g && g.team && g.team.length) ? g.team : [
    { name: 'Dr. Yasmin Al-Rashid', role: 'Director & Co-Founder',
      bio: 'Art historian, SOAS University of London. Previously curator at the V&A Islamic Middle East department.' },
    { name: 'Tariq Osman', role: 'Head of Acquisitions',
      bio: 'Art advisor with 20 years placing works in Gulf private collections and major museums worldwide.' },
    { name: 'Priya Nair', role: 'Digital & Community Lead',
      bio: 'Former tech lead at a major arts platform. Built the gallery\'s AI-assisted search and digital presence.' },
    { name: 'Hassan Mirza', role: 'Technical Advisor',
      bio: 'Master painter specialising in Safavid and Mughal miniature technique. Based in London and Isfahan.' },
  ];

  var cards = team.map(function(t) {
    var initials = t.name.split(' ').map(function(w) { return w[0]; }).join('').substring(0, 2);
    var emailHtml = t.contactEmail ?
      '<a class="about-team-email" href="mailto:' + t.contactEmail + '">' + t.contactEmail + '</a>' : '';
    return '<div class="about-team-card">' +
      '<div class="about-team-avatar"><span>' + initials + '</span></div>' +
      '<div class="about-team-info">' +
      '<div class="about-team-name">' + t.name + '</div>' +
      '<div class="about-team-role">' + t.role + '</div>' +
      '<p class="about-team-bio">' + t.bio + '</p>' +
      emailHtml +
      '</div></div>';
  }).join('');

  return '<div class="about-team-section" style="margin-top:5rem;">' +
    '<span class="how-to-eyebrow" style="display:block;text-align:center;margin-bottom:.5rem;">The People</span>' +
    '<h2 style="text-align:center;margin-bottom:2.5rem;">Meet the Team</h2>' +
    '<div class="about-team-grid">' + cards + '</div>' +
    '</div>';
}

// -- Contact --
function buildContactSection() {
  var contacts = [
    { label: 'General Enquiries', val: 'hello@maktabalfann.com',        href: 'mailto:hello@maktabalfann.com' },
    { label: 'Press & Media',     val: 'press@maktabalfann.com',         href: 'mailto:press@maktabalfann.com' },
    { label: 'Commissions',       val: 'commissions@maktabalfann.com',   href: 'mailto:commissions@maktabalfann.com' },
    { label: 'Instagram',         val: '@maktabalfann',                  href: 'https://instagram.com/maktabalfann' },
  ];
  var items = contacts.map(function(c) {
    return '<div class="about-contact-item">' +
      '<div class="about-contact-label">' + c.label + '</div>' +
      '<a class="about-contact-val" href="' + c.href + '">' + c.val + '</a>' +
      '</div>';
  }).join('');
  return '<div class="about-contact-section" style="margin-top:5rem;">' +
    '<div class="how-to-inner" style="background:var(--card);border:1px solid var(--border);padding:3rem;text-align:center;">' +
    '<span class="how-to-eyebrow">Get in Touch</span>' +
    '<h2 style="margin-bottom:.5rem;">Contact the gallery</h2>' +
    '<div class="gold-rule" style="margin:1rem auto 2rem;"></div>' +
    '<div class="about-contact-grid">' + items + '</div>' +
    '<div style="margin-top:2.5rem;"><button class="btn btn-outline" onclick="navigateTo(\'artists\')">Meet our Artists</button></div>' +
    '</div></div>';
}

// -- Geo pattern helper --
function buildSmallGeoPattern() {
  return '<div style="position:absolute;inset:0;pointer-events:none;overflow:hidden;">' +
    '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;opacity:0.07;">' +
    '<defs><pattern id="star8About" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">' +
    '<polygon points="30,3 36,22 54,15 42,28 56,37 38,37 37,56 30,42 23,56 22,37 4,37 18,28 6,15 24,22"' +
    ' fill="none" stroke="hsl(42,60%,70%)" stroke-width="0.7"/>' +
    '</pattern></defs>' +
    '<rect width="300" height="300" fill="url(#star8About)"/>' +
    '</svg></div>';
}
