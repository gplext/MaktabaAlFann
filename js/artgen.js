// =============================================================================
// ARTGEN.JS — Generates rich Mughal-style SVG artwork visuals for every tile
// Called after gallery/home tiles are inserted into the DOM
// =============================================================================

// Mughal motif vocabulary ─────────────────────────────────────────────────────

function mughálFlower(cx, cy, r, fill, stroke) {
  // Multi-petal lotus/rose — classic Mughal floral motif
  const petals = 8;
  let d = '';
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2;
    const x1 = cx + Math.cos(angle) * r * 0.3;
    const y1 = cy + Math.sin(angle) * r * 0.3;
    const x2 = cx + Math.cos(angle) * r;
    const y2 = cy + Math.sin(angle) * r;
    const cp1x = cx + Math.cos(angle - 0.5) * r * 0.7;
    const cp1y = cy + Math.sin(angle - 0.5) * r * 0.7;
    const cp2x = cx + Math.cos(angle + 0.5) * r * 0.7;
    const cp2y = cy + Math.sin(angle + 0.5) * r * 0.7;
    d += `M ${x1} ${y1} C ${cp1x} ${cp1y} ${x2} ${y2} ${x2} ${y2} C ${x2} ${y2} ${cp2x} ${cp2y} ${x1} ${y1} Z `;
  }
  return `
    <path d="${d}" fill="${fill}" opacity="0.55" />
    <circle cx="${cx}" cy="${cy}" r="${r*0.18}" fill="${stroke}" opacity="0.8"/>
  `;
}

function islamicStar(cx, cy, r, points, fill, opacity = 0.4) {
  // n-pointed star — fundamental Islamic geometric motif
  const outer = r, inner = r * 0.42;
  let pts = '';
  for (let i = 0; i < points * 2; i++) {
    const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const rad = i % 2 === 0 ? outer : inner;
    pts += `${cx + Math.cos(angle) * rad},${cy + Math.sin(angle) * rad} `;
  }
  return `<polygon points="${pts}" fill="${fill}" opacity="${opacity}"/>`;
}

function arabianArch(x, y, w, h, fill, opacity = 0.3) {
  // Pointed Mughal arch shape
  const cx = x + w / 2;
  const peakY = y;
  const shoulderY = y + h * 0.35;
  return `
    <path d="M ${x} ${y+h} L ${x} ${shoulderY}
             Q ${x} ${peakY} ${cx} ${peakY}
             Q ${x+w} ${peakY} ${x+w} ${shoulderY}
             L ${x+w} ${y+h} Z"
          fill="${fill}" opacity="${opacity}"/>
  `;
}

function leafVine(x1, y1, x2, y2, color, opacity = 0.35) {
  // Curving vine with leaf nodes
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.3;
  return `
    <path d="M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}"
          fill="none" stroke="${color}" stroke-width="0.8" opacity="${opacity}"/>
    <ellipse cx="${mx}" cy="${my}" rx="4" ry="2.5"
             transform="rotate(${Math.atan2(y2-y1, x2-x1)*180/Math.PI} ${mx} ${my})"
             fill="${color}" opacity="${opacity*0.8}"/>
  `;
}

function borderPattern(W, H, color, accent) {
  // Repeating chevron/diamond border band
  const bw = Math.min(W, H) * 0.07; // border width
  const step = bw * 1.6;
  let top = '', bot = '', lft = '', rgt = '';

  for (let x = 0; x < W; x += step) {
    const m = x + step / 2;
    top += `<polygon points="${x},0 ${m},${bw} ${x+step},0 ${m},${bw*0.4}" fill="${color}" opacity="0.5"/>`;
    bot += `<polygon points="${x},${H} ${m},${H-bw} ${x+step},${H} ${m},${H-bw*0.4}" fill="${color}" opacity="0.5"/>`;
  }
  for (let y = 0; y < H; y += step) {
    const m = y + step / 2;
    lft += `<polygon points="0,${y} ${bw},${m} 0,${y+step} ${bw*0.4},${m}" fill="${color}" opacity="0.5"/>`;
    rgt += `<polygon points="${W},${y} ${W-bw},${m} ${W},${y+step} ${W-bw*0.4},${m}" fill="${color}" opacity="0.5"/>`;
  }

  // Corner medallions
  const corners = [
    [bw, bw], [W-bw, bw], [bw, H-bw], [W-bw, H-bw]
  ].map(([cx, cy]) => islamicStar(cx, cy, bw*0.9, 6, accent, 0.65)).join('');

  return top + bot + lft + rgt + corners;
}

// Main painting art generator ──────────────────────────────────────────────────

/**
 * generatePaintingArt(painting, width, height)
 * Returns an SVG string that visually represents the painting's style & colors.
 * The SVG is ornate, layered, Mughal-aesthetic — never a plain rectangle.
 */
function generatePaintingArt(painting, W = 400, H = 500) {
  const colors = painting.colors || ['#8b1a4a', '#c9a84c', '#1a3a6a'];
  const c0 = colors[0] || '#8b1a4a';
  const c1 = colors[1] || '#c9a84c';
  const c2 = colors[2] || '#1a3a6a';
  const gold = '#c9a84c';

  const styleId = painting.style_id || 1;
  const seed    = painting.id || 1;
  const R = (n) => ((seed * 9301 + n * 49297 + 233280) % 1000) / 1000; // pseudo-random

  // Background gradient — rich, multi-stop
  const bgId = `bg_${painting.id}`;
  const bg = `
    <defs>
      <linearGradient id="${bgId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="${c0}" stop-opacity="1"/>
        <stop offset="40%"  stop-color="${c1}" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="${c2}" stop-opacity="1"/>
      </linearGradient>
      <filter id="noise_${painting.id}">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
        <feBlend in="SourceGraphic" mode="multiply" result="blend"/>
        <feComposite in="blend" in2="SourceGraphic" operator="in"/>
      </filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#${bgId})"/>
    <rect width="${W}" height="${H}" fill="${c0}" opacity="0.08" filter="url(#noise_${painting.id})"/>
  `;

  // Style-specific motif choice
  let motifs = '';

  if ([1,2,8,10].includes(styleId)) {
    // Mughal / Persian / Deccani / Ottoman — arched pavilion + floral border
    motifs += arabianArch(W*0.2, H*0.1, W*0.6, H*0.65, '#fff', 0.07);
    motifs += arabianArch(W*0.25, H*0.12, W*0.5, H*0.6, c1, 0.09);

    // Central focal star
    motifs += islamicStar(W/2, H*0.42, Math.min(W,H)*0.18, 8, gold, 0.22);
    motifs += islamicStar(W/2, H*0.42, Math.min(W,H)*0.12, 6, '#fff', 0.15);

    // Floral corners
    [[0.12, 0.1],[0.88, 0.1],[0.12, 0.9],[0.88, 0.9]].forEach(([rx, ry]) => {
      motifs += mughálFlower(W*rx, H*ry, Math.min(W,H)*0.09, gold, c1);
    });

    // Vine tendrils across bottom third
    for (let i = 0; i < 5; i++) {
      motifs += leafVine(W*0.05, H*(0.7+R(i)*0.2), W*0.95, H*(0.72+R(i+5)*0.2), gold, 0.25);
    }

  } else if ([5,14].includes(styleId)) {
    // Islamic Geometric / Calligraphy — tessellated stars
    const step = Math.min(W, H) / 4;
    for (let gx = step*0.5; gx < W; gx += step) {
      for (let gy = step*0.5; gy < H; gy += step) {
        motifs += islamicStar(gx, gy, step*0.42, 8, gold, 0.2);
        motifs += islamicStar(gx, gy, step*0.22, 4, '#fff', 0.18);
      }
    }
    // Hexagonal connecting lines
    motifs += `<path d="M 0 ${H*0.5} L ${W} ${H*0.5}" stroke="${gold}" stroke-width="0.5" opacity="0.3"/>`;

  } else if ([11,18].includes(styleId)) {
    // Impressionism / Romanticism — loose dabs of color
    for (let i = 0; i < 30; i++) {
      const dx = R(i*3) * W, dy = R(i*3+1) * H;
      const dr = 8 + R(i*3+2) * 18;
      motifs += `<circle cx="${dx}" cy="${dy}" r="${dr}" fill="${[c0,c1,c2,'#fff'][i%4]}" opacity="${0.08 + R(i)*0.1}"/>`;
    }
    // Horizon line suggestion
    motifs += `<line x1="0" y1="${H*0.55}" x2="${W}" y2="${H*0.52}" stroke="#fff" stroke-width="1" opacity="0.15"/>`;

  } else if ([15,16].includes(styleId)) {
    // Japanese Ukiyo-e / Chinese Ink — brushstroke + wave motifs
    // Wave bands
    for (let wy = H*0.6; wy < H; wy += H*0.08) {
      let wave = `M 0 ${wy}`;
      for (let wx = 0; wx < W; wx += 30) {
        wave += ` Q ${wx+15} ${wy - 12 + R(wx)*8} ${wx+30} ${wy}`;
      }
      motifs += `<path d="${wave}" fill="none" stroke="${c1}" stroke-width="1.2" opacity="0.28"/>`;
    }
    // Mount silhouette
    motifs += `<path d="M 0 ${H*0.7} Q ${W*0.25} ${H*0.2} ${W*0.5} ${H*0.35} Q ${W*0.75} ${H*0.15} ${W} ${H*0.6} L ${W} ${H} L 0 ${H} Z" fill="${c2}" opacity="0.2"/>`;

  } else {
    // Contemporary / Abstract / Default — geometric shapes + organic forms
    // Large abstract background shapes
    for (let i = 0; i < 4; i++) {
      const sx = R(i)*W*0.7, sy = R(i+4)*H*0.7;
      const sr = Math.min(W,H) * (0.15 + R(i+8)*0.25);
      motifs += `<circle cx="${sx}" cy="${sy}" r="${sr}" fill="${[c0,c1,c2,'#fff'][i]}" opacity="0.12"/>`;
    }
    motifs += islamicStar(W*0.5, H*0.45, Math.min(W,H)*0.22, 6, gold, 0.18);
  }

  // Ornate border for ALL styles
  const border = borderPattern(W, H, gold, c1);

  // Central content label (small, translucent)
  const label = `
    <text x="${W/2}" y="${H*0.86}" text-anchor="middle"
          font-family="serif" font-size="${Math.min(W,H)*0.045}"
          fill="${gold}" opacity="0.6" letter-spacing="0.12em">
      ${(painting.title || '').substring(0, 24).toUpperCase()}
    </text>
    <line x1="${W*0.3}" y1="${H*0.89}" x2="${W*0.7}" y2="${H*0.89}"
          stroke="${gold}" stroke-width="0.5" opacity="0.4"/>
    <text x="${W/2}" y="${H*0.93}" text-anchor="middle"
          font-family="sans-serif" font-size="${Math.min(W,H)*0.032}"
          fill="${gold}" opacity="0.45" letter-spacing="0.08em">
      ${painting.artist_name || ''}
    </text>
  `;

  return `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 ${W} ${H}"
         preserveAspectRatio="xMidYMid slice"
         style="position:absolute;inset:0;width:100%;height:100%;">
      ${bg}
      ${motifs}
      ${border}
      ${label}
    </svg>
  `;
}

// ── DOM injection ──────────────────────────────────────────────────────────────

/**
 * Attach generated art SVGs to all .art-placeholder elements that have
 * a data-painting-id. Uses ART_DATA directly — no DB dependency.
 */
function injectPaintingArt() {
  document.querySelectorAll('[data-painting-id]').forEach(tile => {
    const id = parseInt(tile.dataset.paintingId);
    const placeholder = tile.querySelector('.art-placeholder');
    if (!placeholder || placeholder.dataset.artInjected) return;

    // Look up from ART_DATA (always available, no DB needed)
    const rawPainting = ART_DATA.paintings.find(p => p.id === id);
    if (!rawPainting) return;

    // Enrich with artist name
    const artist = ART_DATA.artists.find(a => a.id === rawPainting.artist_id);
    const painting = { ...rawPainting, artist_name: artist ? artist.name : '' };

    const W = placeholder.offsetWidth  || 300;
    const H = placeholder.offsetHeight || 400;

    // Insert SVG art layer
    const motifDiv = document.createElement('div');
    motifDiv.className = 'art-motif-layer';
    motifDiv.innerHTML = generatePaintingArt(painting, W, H);
    placeholder.appendChild(motifDiv);

    // Inner border + corner ornaments
    placeholder.insertAdjacentHTML('beforeend', `
      <div class="art-inner-border"></div>
      <div class="art-corner tl"></div>
      <div class="art-corner tr"></div>
      <div class="art-corner bl"></div>
      <div class="art-corner br"></div>
      <div class="art-vignette"></div>
    `);

    placeholder.dataset.artInjected = '1';
  });
}

/**
 * Observer — automatically injects art when new tiles appear in the DOM
 * (handles navigation between pages / filter changes).
 */
function initArtObserver() {
  const observer = new MutationObserver(() => {
    clearTimeout(window._artObserverTimer);
    window._artObserverTimer = setTimeout(injectPaintingArt, 120);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Initial pass — run after app boot has rendered the first page
  setTimeout(injectPaintingArt, 800);
}

// Auto-start — ART_DATA is always available before this script runs
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initArtObserver);
} else {
  initArtObserver();
}
