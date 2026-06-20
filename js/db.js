// =============================================================================
// MAKTAB-AL-FANN — SQLite Database (sql.js in-browser)
// =============================================================================

let DB = null;

async function initDatabase() {
  // sql.js is loaded via CDN in index.html
  const SQL = await initSqlJs({
    locateFile: file => 'assets/sqljs/' + file
  });

  DB = new SQL.Database();

  // ── Create tables ────────────────────────────────────────────────────────────
  DB.run(`
    CREATE TABLE IF NOT EXISTS art_styles (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      origin TEXT,
      period TEXT,
      description TEXT,
      characteristics TEXT,
      key_colors TEXT,
      history TEXT,
      evolution_from TEXT,
      famous_artists TEXT
    );
  `);

  DB.run(`
    CREATE TABLE IF NOT EXISTS artists (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      born INTEGER,
      died INTEGER,
      nationality TEXT,
      style_ids TEXT,
      bio TEXT,
      notable_for TEXT,
      awards TEXT,
      profile_color TEXT
    );
  `);

  DB.run(`
    CREATE TABLE IF NOT EXISTS paintings (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      artist_id INTEGER,
      year INTEGER,
      style_id INTEGER,
      country_origin TEXT,
      country_depicted TEXT,
      culture_depicted TEXT,
      history_context TEXT,
      colors TEXT,
      width_cm REAL,
      height_cm REAL,
      price REAL,
      significance TEXT,
      technique TEXT,
      frames TEXT,
      image_hue TEXT,
      image_sat TEXT,
      FOREIGN KEY(artist_id) REFERENCES artists(id),
      FOREIGN KEY(style_id) REFERENCES art_styles(id)
    );
  `);

  DB.run(`
    CREATE TABLE IF NOT EXISTS frames (
      id INTEGER PRIMARY KEY,
      name TEXT,
      material TEXT,
      style TEXT,
      description TEXT,
      price REAL,
      colors TEXT
    );
  `);

  DB.run(`
    CREATE TABLE IF NOT EXISTS shop_items (
      id INTEGER PRIMARY KEY,
      category TEXT,
      name TEXT,
      description TEXT,
      price REAL,
      image_hue TEXT
    );
  `);

  DB.run(`
    CREATE TABLE IF NOT EXISTS digital_works (
      id INTEGER PRIMARY KEY,
      title TEXT,
      artist_id INTEGER,
      year INTEGER,
      type TEXT,
      description TEXT,
      price REAL,
      limited_edition INTEGER,
      colors TEXT,
      image_hue TEXT,
      image_sat TEXT
    );
  `);

  // ── Seed data ────────────────────────────────────────────────────────────────
  const insertStyle = DB.prepare(`
    INSERT OR IGNORE INTO art_styles VALUES (?,?,?,?,?,?,?,?,?,?)
  `);
  ART_DATA.styles.forEach(s => {
    insertStyle.run([
      s.id, s.name, s.origin, s.period, s.description,
      JSON.stringify(s.characteristics),
      JSON.stringify(s.key_colors),
      s.history,
      JSON.stringify(s.evolution_from || []),
      JSON.stringify(s.famous_artists || [])
    ]);
  });
  insertStyle.free();

  const insertArtist = DB.prepare(`
    INSERT OR IGNORE INTO artists VALUES (?,?,?,?,?,?,?,?,?,?)
  `);
  ART_DATA.artists.forEach(a => {
    insertArtist.run([
      a.id, a.name, a.born, a.died || null, a.nationality,
      JSON.stringify(a.style_ids),
      a.bio, a.notable_for, a.awards || '', a.profile_color
    ]);
  });
  insertArtist.free();

  const insertPainting = DB.prepare(`
    INSERT OR IGNORE INTO paintings VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `);
  ART_DATA.paintings.forEach(p => {
    insertPainting.run([
      p.id, p.title, p.artist_id, p.year, p.style_id,
      p.country_origin, p.country_depicted, p.culture_depicted,
      p.history_context,
      JSON.stringify(p.colors),
      p.width_cm, p.height_cm, p.price,
      p.significance, p.technique,
      JSON.stringify(p.frames || []),
      p.image_hue, p.image_sat
    ]);
  });
  insertPainting.free();

  const insertFrame = DB.prepare(`
    INSERT OR IGNORE INTO frames VALUES (?,?,?,?,?,?,?)
  `);
  ART_DATA.frames.forEach(f => {
    insertFrame.run([f.id, f.name, f.material, f.style, f.description, f.price, JSON.stringify(f.colors)]);
  });
  insertFrame.free();

  const insertShop = DB.prepare(`
    INSERT OR IGNORE INTO shop_items VALUES (?,?,?,?,?,?)
  `);
  ART_DATA.shop_items.forEach(s => {
    insertShop.run([s.id, s.category, s.name, s.description, s.price, s.image_hue]);
  });
  insertShop.free();

  const insertDigital = DB.prepare(`
    INSERT OR IGNORE INTO digital_works VALUES (?,?,?,?,?,?,?,?,?,?,?)
  `);
  ART_DATA.digital_works.forEach(d => {
    insertDigital.run([
      d.id, d.title, d.artist_id, d.year, d.type,
      d.description, d.price, d.limited_edition || null,
      JSON.stringify(d.colors || []),
      d.image_hue, d.image_sat
    ]);
  });
  insertDigital.free();

  console.log('✓ Maktab-al-fann database initialized');
  return DB;
}

// ── Query helpers ─────────────────────────────────────────────────────────────

function dbAll(sql, params = []) {
  const results = [];
  const stmt = DB.prepare(sql);
  stmt.bind(params);
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

function dbGet(sql, params = []) {
  const rows = dbAll(sql, params);
  return rows[0] || null;
}

function parseJSON(val, fallback = []) {
  try { return JSON.parse(val); } catch { return fallback; }
}

// ── Painting queries ──────────────────────────────────────────────────────────

function getPaintings(filters = {}) {
  let where = ['1=1'];
  let params = [];

  if (filters.style_id)   { where.push('p.style_id = ?');           params.push(filters.style_id); }
  if (filters.artist_id)  { where.push('p.artist_id = ?');          params.push(filters.artist_id); }
  if (filters.year_from)  { where.push('p.year >= ?');              params.push(filters.year_from); }
  if (filters.year_to)    { where.push('p.year <= ?');              params.push(filters.year_to); }
  if (filters.country_origin)   { where.push('p.country_origin LIKE ?');  params.push('%'+filters.country_origin+'%'); }
  if (filters.country_depicted) { where.push('p.country_depicted LIKE ?');params.push('%'+filters.country_depicted+'%'); }
  if (filters.culture)    { where.push('p.culture_depicted LIKE ?'); params.push('%'+filters.culture+'%'); }
  if (filters.history)    { where.push('p.history_context LIKE ?');  params.push('%'+filters.history+'%'); }
  if (filters.price_max)  { where.push('p.price <= ?');             params.push(filters.price_max); }
  if (filters.size)       {
    if (filters.size === 'small')  { where.push('p.width_cm <= 40 AND p.height_cm <= 50'); }
    if (filters.size === 'medium') { where.push('p.width_cm > 40 AND p.width_cm <= 80');  }
    if (filters.size === 'large')  { where.push('p.width_cm > 80');  }
  }
  if (filters.search) {
    where.push(`(p.title LIKE ? OR p.culture_depicted LIKE ? OR p.history_context LIKE ?
                OR p.significance LIKE ? OR a.name LIKE ? OR s.name LIKE ?)`);
    const q = '%' + filters.search + '%';
    params.push(q, q, q, q, q, q);
  }

  const sql = `
    SELECT p.*, a.name AS artist_name, a.nationality, s.name AS style_name, s.key_colors AS style_colors
    FROM paintings p
    LEFT JOIN artists a ON p.artist_id = a.id
    LEFT JOIN art_styles s ON p.style_id = s.id
    WHERE ${where.join(' AND ')}
    ORDER BY s.name, p.year
  `;

  return dbAll(sql, params).map(p => ({
    ...p,
    colors: parseJSON(p.colors),
    frames: parseJSON(p.frames),
    style_colors: parseJSON(p.style_colors)
  }));
}

function getPaintingById(id) {
  const p = dbGet(`
    SELECT p.*, a.name AS artist_name, a.nationality, a.born, a.died, a.bio AS artist_bio,
           a.notable_for, a.profile_color,
           s.name AS style_name, s.description AS style_desc, s.history AS style_history,
           s.evolution_from, s.famous_artists AS style_famous_artists,
           s.characteristics AS style_characteristics, s.key_colors AS style_colors
    FROM paintings p
    LEFT JOIN artists a ON p.artist_id = a.id
    LEFT JOIN art_styles s ON p.style_id = s.id
    WHERE p.id = ?
  `, [id]);
  if (!p) return null;
  return {
    ...p,
    colors: parseJSON(p.colors),
    frames: parseJSON(p.frames),
    style_colors: parseJSON(p.style_colors),
    evolution_from: parseJSON(p.evolution_from),
    style_famous_artists: parseJSON(p.style_famous_artists),
    style_characteristics: parseJSON(p.style_characteristics)
  };
}

function getArtists(filters = {}) {
  let where = ['1=1'];
  let params = [];
  if (filters.style_id) { where.push("a.style_ids LIKE ?"); params.push('%'+filters.style_id+'%'); }
  if (filters.nationality) { where.push("a.nationality LIKE ?"); params.push('%'+filters.nationality+'%'); }
  if (filters.search) {
    where.push("(a.name LIKE ? OR a.nationality LIKE ? OR a.notable_for LIKE ? OR a.bio LIKE ?)");
    const q = '%'+filters.search+'%';
    params.push(q,q,q,q);
  }
  return dbAll(`
    SELECT a.*, COUNT(p.id) AS painting_count
    FROM artists a
    LEFT JOIN paintings p ON p.artist_id = a.id
    WHERE ${where.join(' AND ')}
    GROUP BY a.id ORDER BY a.name
  `, params).map(a => ({ ...a, style_ids: parseJSON(a.style_ids) }));
}

function getStyles() {
  return dbAll('SELECT * FROM art_styles ORDER BY name').map(s => ({
    ...s,
    characteristics: parseJSON(s.characteristics),
    key_colors: parseJSON(s.key_colors),
    evolution_from: parseJSON(s.evolution_from),
    famous_artists: parseJSON(s.famous_artists)
  }));
}

function getFrames(ids = []) {
  if (!ids.length) return dbAll('SELECT * FROM frames');
  const placeholders = ids.map(() => '?').join(',');
  return dbAll(`SELECT * FROM frames WHERE id IN (${placeholders})`, ids).map(f => ({
    ...f, colors: parseJSON(f.colors)
  }));
}

function getShopItems(category = null) {
  if (category) return dbAll('SELECT * FROM shop_items WHERE category = ? ORDER BY name', [category]);
  return dbAll('SELECT * FROM shop_items ORDER BY category, name');
}

function getDigitalWorks() {
  return dbAll(`
    SELECT d.*, a.name AS artist_name FROM digital_works d
    LEFT JOIN artists a ON d.artist_id = a.id ORDER BY d.year DESC
  `).map(d => ({ ...d, colors: parseJSON(d.colors) }));
}

function getGalleryStats() {
  const stats = dbGet(`
    SELECT COUNT(DISTINCT p.id) AS total_paintings,
           COUNT(DISTINCT p.artist_id) AS total_artists,
           MIN(p.year) AS earliest_year,
           MAX(p.year) AS latest_year,
           COUNT(DISTINCT p.style_id) AS total_styles
    FROM paintings p
  `);
  return stats;
}
