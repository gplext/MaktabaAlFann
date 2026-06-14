// =============================================================================
// ARTIST PORTAL  (#artist-portal)
// Artists register, submit works, track status — all via localStorage
// =============================================================================

var AP_APPS_KEY = 'maf_artist_apps';
var AP_SUBS_KEY = 'maf_artwork_subs';
var AP_ME_KEY   = 'maf_my_artist_app_id';

var apState = { tab: 'register' };  // 'register' | 'submit' | 'status'

// ── Storage helpers ───────────────────────────────────────────────────────────

function apGetApps() {
  try { return JSON.parse(localStorage.getItem(AP_APPS_KEY) || '[]'); } catch(e) { return []; }
}
function apSaveApps(arr) { localStorage.setItem(AP_APPS_KEY, JSON.stringify(arr)); }

function apGetSubs() {
  try { return JSON.parse(localStorage.getItem(AP_SUBS_KEY) || '[]'); } catch(e) { return []; }
}
function apSaveSubs(arr) { localStorage.setItem(AP_SUBS_KEY, JSON.stringify(arr)); }

function apMyId() { return localStorage.getItem(AP_ME_KEY) || ''; }
function apMyApp() {
  var id = apMyId();
  return id ? apGetApps().find(function(a) { return a.id === id; }) || null : null;
}

// ── Main render ───────────────────────────────────────────────────────────────

function renderArtistPortal() {
  var el = document.getElementById('page-artist-portal');
  if (!el) return;
  el.innerHTML = buildApShell();
  initApHandlers();
}

function buildApShell() {
  var myApp = apMyApp();
  var pendingCount = apGetSubs().filter(function(s) {
    return s.artistAppId === apMyId();
  }).length;

  var tabs = [
    { id: 'register', label: myApp ? 'My Profile' : 'Register' },
    { id: 'submit',   label: 'Submit Work' },
    { id: 'status',   label: 'My Submissions' + (pendingCount ? ' (' + pendingCount + ')' : '') }
  ];

  var tabHtml = tabs.map(function(t) {
    return '<button class="ap-tab' + (apState.tab === t.id ? ' ap-tab-active' : '') +
           '" data-aptab="' + t.id + '">' + t.label + '</button>';
  }).join('');

  return '<div class="ap-wrap">' +
    buildApHero() +
    '<div class="ap-tabs">' + tabHtml + '</div>' +
    '<div class="ap-body" id="apBody">' + buildApTab() + '</div>' +
    '</div>';
}

function buildApHero() {
  return '<div class="ap-hero">' +
    '<div class="container">' +
    '<span class="ap-eyebrow">Artist Portal</span>' +
    '<h1 class="ap-title">Share Your Art with the World</h1>' +
    '<p class="ap-subtitle">Register as an artist, submit your works for review, and reach collectors across the globe through Maktab-al-fann.</p>' +
    '</div>' +
    '</div>';
}

function buildApTab() {
  if (apState.tab === 'register') return buildApRegisterTab();
  if (apState.tab === 'submit')   return buildApSubmitTab();
  return buildApStatusTab();
}

// ── Register Tab ──────────────────────────────────────────────────────────────

function buildApRegisterTab() {
  var me = apMyApp();

  if (me) {
    var badgeColor = me.status === 'approved' ? 'hsl(140,50%,35%)' :
                     me.status === 'rejected' ? 'hsl(0,55%,45%)' : 'hsl(42,55%,40%)';
    var badgeLabel = me.status === 'approved' ? 'Approved' :
                     me.status === 'rejected' ? 'Rejected' : 'Pending Review';

    return '<div class="ap-card">' +
      '<div class="ap-profile-header">' +
      '<div class="ap-avatar">' + initials(me.name) + '</div>' +
      '<div>' +
      '<h2 class="ap-profile-name">' + me.name + '</h2>' +
      '<span class="ap-badge" style="background:' + badgeColor + '">' + badgeLabel + '</span>' +
      '</div>' +
      '</div>' +
      '<div class="ap-profile-grid">' +
      apProfileRow('Nationality', me.nationality) +
      apProfileRow('Specialisation', me.specialization) +
      apProfileRow('Email', me.email) +
      apProfileRow('Website', me.website || 'Not provided') +
      apProfileRow('Submitted', new Date(me.submittedAt).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})) +
      '</div>' +
      (me.status === 'pending' ? '<p class="ap-info-note">Your application is under review. We usually respond within 3 working days.</p>' : '') +
      (me.status === 'rejected' ? '<p class="ap-info-note ap-note-rejected">Your application was not accepted at this time. You may re-apply with updated information.</p>' +
        '<button class="ap-btn ap-btn-outline" id="apReapplyBtn">Re-apply</button>' : '') +
      '</div>';
  }

  return '<div class="ap-card">' +
    '<h2 class="ap-card-title">Artist Registration</h2>' +
    '<p class="ap-card-sub">Tell us about yourself. Our team will review your application and respond within 3 working days.</p>' +
    '<div id="apRegMsg" class="ap-form-msg" style="display:none"></div>' +
    '<div class="ap-form-grid">' +
    apField('apRegName',     'Full Name',         'text',  'e.g. Amir Reza Khan',    true) +
    apField('apRegEmail',    'Email Address',     'email', 'your@email.com',          true) +
    apField('apRegNat',      'Nationality',       'text',  'e.g. Pakistani',          true) +
    apField('apRegSpec',     'Specialisation',    'text',  'e.g. Miniature, Sufism',  true) +
    '</div>' +
    '<div class="ap-field">' +
    '<label class="ap-label">Short Bio <span class="ap-req">*</span></label>' +
    '<textarea id="apRegBio" class="ap-textarea" rows="4" placeholder="Tell us about your artistic journey, training, and what inspires your work..."></textarea>' +
    '</div>' +
    apField('apRegWeb', 'Website / Portfolio URL', 'url', 'https://yourportfolio.com', false) +
    '<button class="ap-btn ap-btn-primary" id="apRegSubmitBtn">Submit Application</button>' +
    '</div>';
}

function apProfileRow(label, val) {
  return '<div class="ap-profile-row"><span class="ap-profile-label">' + label + '</span><span class="ap-profile-val">' + val + '</span></div>';
}

// ── Submit Work Tab ───────────────────────────────────────────────────────────

function buildApSubmitTab() {
  var me = apMyApp();

  if (!me) {
    return '<div class="ap-card ap-card-locked">' +
      '<div class="ap-lock-icon">&#128274;</div>' +
      '<h3>Registration Required</h3>' +
      '<p>Please register as an artist first before submitting your work.</p>' +
      '<button class="ap-btn ap-btn-primary" onclick="apSwitchTab(\'register\')">Register Now</button>' +
      '</div>';
  }

  if (me.status === 'pending') {
    return '<div class="ap-card ap-card-locked">' +
      '<div class="ap-lock-icon">&#9203;</div>' +
      '<h3>Application Pending</h3>' +
      '<p>You can submit artworks once your artist registration has been approved by our team.</p>' +
      '</div>';
  }

  if (me.status === 'rejected') {
    return '<div class="ap-card ap-card-locked">' +
      '<div class="ap-lock-icon">&#10005;</div>' +
      '<h3>Application Not Accepted</h3>' +
      '<p>Unfortunately your registration was not approved. Please re-apply from the Profile tab.</p>' +
      '</div>';
  }

  var styleOptions = (ART_DATA.styles || []).map(function(s) {
    return '<option value="' + s.id + '">' + s.name + '</option>';
  }).join('');

  return '<div class="ap-card">' +
    '<h2 class="ap-card-title">Submit an Artwork</h2>' +
    '<p class="ap-card-sub">All submissions are reviewed before appearing in the public gallery. We aim to respond within 5 working days.</p>' +
    '<div id="apSubMsg" class="ap-form-msg" style="display:none"></div>' +
    '<div class="ap-form-grid">' +
    apField('apSubTitle',  'Artwork Title',  'text',   'Title of the work',  true) +
    apField('apSubYear',   'Year Created',   'number', new Date().getFullYear(), true) +
    apField('apSubPrice',  'Asking Price (GBP)', 'number', 'e.g. 1200',     false) +
    apField('apSubMedium', 'Medium',         'text',   'e.g. Oil on canvas', true) +
    '</div>' +
    '<div class="ap-field">' +
    '<label class="ap-label">Style <span class="ap-req">*</span></label>' +
    '<select id="apSubStyle" class="ap-select"><option value="">Select a style...</option>' + styleOptions + '</select>' +
    '</div>' +
    apField('apSubDims', 'Dimensions (cm)', 'text', 'e.g. 60 x 80', false) +
    '<div class="ap-field">' +
    '<label class="ap-label">Description <span class="ap-req">*</span></label>' +
    '<textarea id="apSubDesc" class="ap-textarea" rows="5" placeholder="Describe the artwork, its inspiration, cultural context, and what makes it significant..."></textarea>' +
    '</div>' +
    '<button class="ap-btn ap-btn-primary" id="apSubSubmitBtn">Submit for Review</button>' +
    '</div>';
}

// ── Status Tab ────────────────────────────────────────────────────────────────

function buildApStatusTab() {
  var me = apMyApp();
  if (!me) {
    return '<div class="ap-card ap-card-locked">' +
      '<div class="ap-lock-icon">&#128274;</div>' +
      '<h3>Registration Required</h3>' +
      '<p>Register first to track your submissions.</p>' +
      '<button class="ap-btn ap-btn-primary" onclick="apSwitchTab(\'register\')">Register Now</button>' +
      '</div>';
  }

  var subs = apGetSubs().filter(function(s) { return s.artistAppId === me.id; });

  if (!subs.length) {
    return '<div class="ap-card ap-card-locked">' +
      '<div class="ap-lock-icon">&#128444;</div>' +
      '<h3>No Submissions Yet</h3>' +
      '<p>Go to the Submit Work tab to send your first artwork for review.</p>' +
      '<button class="ap-btn ap-btn-outline" onclick="apSwitchTab(\'submit\')">Submit a Work</button>' +
      '</div>';
  }

  var rows = subs.slice().reverse().map(function(s) {
    var statusColor = s.status === 'approved' ? 'hsl(140,50%,35%)' :
                      s.status === 'rejected' ? 'hsl(0,55%,45%)' : 'hsl(42,55%,40%)';
    var statusLabel = s.status === 'approved' ? 'Published' :
                      s.status === 'rejected' ? 'Not Accepted' : 'Under Review';
    return '<div class="ap-sub-row">' +
      '<div class="ap-sub-main">' +
      '<div class="ap-sub-title">' + s.title + '</div>' +
      '<div class="ap-sub-meta">' + s.styleName + ' &middot; ' + s.year + ' &middot; ' + s.medium + '</div>' +
      '<div class="ap-sub-date">Submitted ' + new Date(s.submittedAt).toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'}) + '</div>' +
      '</div>' +
      '<span class="ap-badge" style="background:' + statusColor + '">' + statusLabel + '</span>' +
      '</div>';
  }).join('');

  return '<div class="ap-card">' +
    '<h2 class="ap-card-title">Your Submissions</h2>' +
    '<div class="ap-sub-list">' + rows + '</div>' +
    '</div>';
}

// ── Handlers ──────────────────────────────────────────────────────────────────

function initApHandlers() {
  document.querySelectorAll('[data-aptab]').forEach(function(btn) {
    btn.addEventListener('click', function() { apSwitchTab(btn.dataset.aptab); });
  });
  bindApBodyHandlers();
}

function apSwitchTab(tab) {
  apState.tab = tab;
  document.querySelectorAll('[data-aptab]').forEach(function(b) {
    b.classList.toggle('ap-tab-active', b.dataset.aptab === tab);
  });
  document.getElementById('apBody').innerHTML = buildApTab();
  bindApBodyHandlers();
}

function bindApBodyHandlers() {
  var regBtn = document.getElementById('apRegSubmitBtn');
  if (regBtn) regBtn.addEventListener('click', doApRegister);

  var subBtn = document.getElementById('apSubSubmitBtn');
  if (subBtn) subBtn.addEventListener('click', doApSubmit);

  var reBtn = document.getElementById('apReapplyBtn');
  if (reBtn) reBtn.addEventListener('click', function() {
    localStorage.removeItem(AP_ME_KEY);
    apSwitchTab('register');
  });
}

function doApRegister() {
  var name  = val('apRegName');
  var email = val('apRegEmail');
  var nat   = val('apRegNat');
  var spec  = val('apRegSpec');
  var bio   = val('apRegBio');
  var web   = val('apRegWeb');

  if (!name || !email || !nat || !spec || !bio) {
    apShowMsg('apRegMsg', 'Please fill in all required fields.', true); return;
  }

  var app = {
    id:             'app_' + Date.now(),
    name:           name,
    email:          email,
    nationality:    nat,
    specialization: spec,
    bio:            bio,
    website:        web,
    status:         'pending',
    submittedAt:    new Date().toISOString()
  };

  var apps = apGetApps();
  apps.push(app);
  apSaveApps(apps);
  localStorage.setItem(AP_ME_KEY, app.id);

  apShowMsg('apRegMsg', 'Application submitted! We will review it within 3 working days.', false);
  setTimeout(function() { apSwitchTab('register'); }, 1500);
}

function doApSubmit() {
  var me = apMyApp();
  if (!me || me.status !== 'approved') return;

  var title  = val('apSubTitle');
  var year   = val('apSubYear');
  var medium = val('apSubMedium');
  var style  = val('apSubStyle');
  var desc   = val('apSubDesc');

  if (!title || !year || !medium || !style || !desc) {
    apShowMsg('apSubMsg', 'Please fill in all required fields.', true); return;
  }

  var styleName = '';
  var styleEl = document.getElementById('apSubStyle');
  if (styleEl) styleName = styleEl.options[styleEl.selectedIndex].text;

  var sub = {
    id:          'sub_' + Date.now(),
    artistAppId: me.id,
    artistName:  me.name,
    title:       title,
    styleId:     style,
    styleName:   styleName,
    year:        parseInt(year) || year,
    medium:      medium,
    dimensions:  val('apSubDims'),
    price:       parseFloat(val('apSubPrice')) || 0,
    description: desc,
    status:      'pending',
    submittedAt: new Date().toISOString()
  };

  var subs = apGetSubs();
  subs.push(sub);
  apSaveSubs(subs);

  apShowMsg('apSubMsg', 'Artwork submitted for review! Check the My Submissions tab for status updates.', false);
  setTimeout(function() { apSwitchTab('status'); }, 1800);
}

// ── Utility ───────────────────────────────────────────────────────────────────

function val(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function initials(name) {
  return (name || '').split(' ').map(function(w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
}

function apField(id, label, type, placeholder, required) {
  return '<div class="ap-field">' +
    '<label class="ap-label" for="' + id + '">' + label +
    (required ? ' <span class="ap-req">*</span>' : '') + '</label>' +
    '<input id="' + id + '" class="ap-input" type="' + type + '" placeholder="' + placeholder + '">' +
    '</div>';
}

function apShowMsg(id, text, isError) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className = 'ap-form-msg' + (isError ? ' ap-form-msg-error' : ' ap-form-msg-ok');
  el.style.display = 'block';
}
