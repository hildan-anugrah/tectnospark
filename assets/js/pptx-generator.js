/**
 * HorizonU Uniform — Client-Side PPTX Generator (Neo-Brutalism Edition)
 * Generates an executive 16:9 PowerPoint presentation directly in the browser using PptxGenJS.
 * Fully incorporates Neo-Brutalism styling:
 * - 2pt Solid Slate-900 (#0F172A) borders
 * - Hard offset drop shadows (shadow-neo)
 * - Crimson Horizon (#980517) highlights & Red-50 tints
 * - Amber badges, big metric numbers, and clean typography
 * - Unified grid system: 100% symmetric box sizes across all slides
 * - English locale by default (window.I18N_EN_DATA)
 */

(function (window) {
  'use strict';

  // Neo-Brutalism Color System
  const C_RED        = '980517'; // Official Horizon Crimson
  const C_RED_BG     = 'FEF2F2'; // Neo-red tint (matches bg-red-50)
  const C_WHITE      = 'FFFFFF'; // Pure white canvas
  const C_CARD_BG    = 'FBFBFA'; // Neo off-white card (matches bg-neo-bg)
  const C_DARK       = '0F172A'; // Slate-900 border & text (matches text-slate-900)
  const C_MUTED      = '475569'; // Slate-600 secondary text (matches text-slate-600)
  const C_AMBER_BG   = 'FEF3C7'; // Amber-100 badge (matches bg-amber-100)
  const FONT_TITLE   = 'Arial';
  const FONT_BODY    = 'Calibri';

  const SHADOW_OFFSET    = 0.055; // 4px hard neo-shadow
  const SHADOW_OFFSET_SM = 0.038; // 3px hard neo-shadow

  // Unified Geometry Constants (16:9 layout: 13.333" x 7.5")
  // Content bounding box: x = 0.80 to 12.533 (Width: 11.733"), y = 1.55 to 6.80 (Height: 5.25")
  const GRID = {
    // 2-column layout (Slides 1, 5, 8)
    col2: { w: 5.74, gap: 0.25, x: [0.80, 6.79] },
    // 3-column layout (Slides 2, 9)
    col3: { w: 3.74, gap: 0.25, x: [0.80, 4.79, 8.78] },
    // 4-column layout (Slides 3, 7)
    col4: { w: 2.78, gap: 0.20, x: [0.80, 3.78, 6.76, 9.74] },
    // Row layouts
    rowFull: { y: 1.55, h: 5.25 },
    rowHalf: { y: [1.55, 4.30], h: 2.50 }
  };

  // Always use English data for download as requested by user
  function getEnglishData() {
    return window.I18N_EN_DATA || window.I18N_ID_DATA || {};
  }

  function getSpeakerNote(slideNum) {
    const data = getEnglishData();
    const s = data.speakerScripts && data.speakerScripts['slide' + slideNum];
    if (s && s.text) return s.text;
    return '';
  }

  function getShape(pptx, name) {
    if (pptx && pptx.shapes) {
      if (name === 'rect' && pptx.shapes.RECTANGLE) return pptx.shapes.RECTANGLE;
      if (name === 'roundRect' && pptx.shapes.ROUNDED_RECTANGLE) return pptx.shapes.ROUNDED_RECTANGLE;
      if (name === 'ellipse' && (pptx.shapes.OVAL || pptx.shapes.ELLIPSE)) return pptx.shapes.OVAL || pptx.shapes.ELLIPSE;
      if (name === 'line' && pptx.shapes.LINE) return pptx.shapes.LINE;
    }
    return name;
  }

  /**
   * Rich HTML text parser for PptxGenJS text runs.
   * Converts <strong>, <b>, <em>, <i>, <code> into native PPTX styled text runs.
   */
  function parseHtmlRuns(rawHtml, baseOpts) {
    if (!rawHtml) return [{ text: '', options: baseOpts || {} }];

    const clean = String(rawHtml)
      .replace(/<br\s*[\/]?>/gi, '\n')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    const tokens = [];
    const regex = /(<strong[^>]*>[\s\S]*?<\/strong>|<b[^>]*>[\s\S]*?<\/b>|<em[^>]*>[\s\S]*?<\/em>|<i[^>]*>[\s\S]*?<\/i>|<code[^>]*>[\s\S]*?<\/code>)/gi;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(clean)) !== null) {
      if (match.index > lastIndex) {
        const plainText = clean.substring(lastIndex, match.index).replace(/<[^>]+>/g, '');
        if (plainText) {
          tokens.push({ text: plainText, options: Object.assign({}, baseOpts) });
        }
      }

      const tagContent = match[0];
      const innerText = tagContent.replace(/<[^>]+>/g, '');
      const opts = Object.assign({}, baseOpts);

      if (/^<(strong|b)/i.test(tagContent)) {
        opts.bold = true;
      } else if (/^<(em|i)/i.test(tagContent)) {
        opts.italic = true;
      } else if (/^<code/i.test(tagContent)) {
        opts.fontFace = 'Courier New';
        opts.bold = true;
      }

      tokens.push({ text: innerText, options: opts });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < clean.length) {
      const plainText = clean.substring(lastIndex).replace(/<[^>]+>/g, '');
      if (plainText) {
        tokens.push({ text: plainText, options: Object.assign({}, baseOpts) });
      }
    }

    return tokens.length > 0 ? tokens : [{ text: clean.replace(/<[^>]+>/g, ''), options: baseOpts || {} }];
  }

  /**
   * Helper to format an array of bullet strings into styled PPTX text runs.
   */
  function formatBulletRuns(bullets, baseOpts) {
    const allRuns = [];
    bullets.forEach((bHtml, idx) => {
      let clean = String(bHtml || '').trim();
      clean = clean.replace(/^[•\-\*]\s*/, ''); // strip manual bullet

      // Crimson bullet dot
      allRuns.push({
        text: '•  ',
        options: Object.assign({}, baseOpts, { bold: true, color: C_RED })
      });

      // Parsed content
      const runs = parseHtmlRuns(clean, baseOpts);
      allRuns.push(...runs);

      if (idx < bullets.length - 1) {
        allRuns.push({ text: '\n\n', options: baseOpts });
      }
    });
    return allRuns;
  }

  // Neo-Brutalist Slide Header
  function applyHeader(slide, pptx, categoryTag, mainTitle, subtitle, rightBadgeText) {
    slide.background = { fill: C_WHITE };

    // Left vertical accent bar with Neo shadow
    slide.addShape(getShape(pptx, 'rect'), {
      x: 0.8 + SHADOW_OFFSET_SM,
      y: 0.42 + SHADOW_OFFSET_SM,
      w: 0.08,
      h: 0.78,
      fill: { color: C_DARK },
      line: { color: C_DARK }
    });
    slide.addShape(getShape(pptx, 'rect'), {
      x: 0.8,
      y: 0.42,
      w: 0.08,
      h: 0.78,
      fill: { color: C_RED },
      line: { color: C_DARK, width: 1.5 }
    });

    // Category Tag (Monospace/Bold)
    slide.addText(categoryTag.toUpperCase(), {
      x: 1.02,
      y: 0.38,
      w: 9.5,
      h: 0.24,
      fontFace: FONT_TITLE,
      fontSize: 9.5,
      bold: true,
      color: C_RED,
      margin: 0
    });

    // Main Title
    slide.addText(mainTitle, {
      x: 1.02,
      y: 0.60,
      w: 9.5,
      h: 0.42,
      fontFace: FONT_TITLE,
      fontSize: 18,
      bold: true,
      color: C_DARK,
      margin: 0
    });

    // Subtitle
    slide.addText(subtitle, {
      x: 1.02,
      y: 1.02,
      w: 9.5,
      h: 0.28,
      fontFace: FONT_BODY,
      fontSize: 11,
      color: C_MUTED,
      margin: 0
    });

    // Optional Right Badge (e.g., 6 Core Engineers)
    if (rightBadgeText) {
      const bW = 1.9;
      const bH = 0.38;
      const bX = 12.533 - bW;
      const bY = 0.58;

      // Badge shadow
      slide.addShape(getShape(pptx, 'roundRect'), {
        x: bX + SHADOW_OFFSET_SM,
        y: bY + SHADOW_OFFSET_SM,
        w: bW,
        h: bH,
        fill: { color: C_DARK },
        line: { color: C_DARK },
        rectRadius: 0.08
      });
      // Badge body
      slide.addShape(getShape(pptx, 'roundRect'), {
        x: bX,
        y: bY,
        w: bW,
        h: bH,
        fill: { color: C_AMBER_BG },
        line: { color: C_DARK, width: 1.5 },
        rectRadius: 0.08
      });
      slide.addText(rightBadgeText, {
        x: bX,
        y: bY,
        w: bW,
        h: bH,
        fontFace: FONT_TITLE,
        fontSize: 9.5,
        bold: true,
        color: C_DARK,
        align: 'center',
        valign: 'middle',
        margin: 0
      });
    }

    // Neo-Brutalist 2pt bottom divider line
    slide.addShape(getShape(pptx, 'rect'), {
      x: 0.8,
      y: 1.36,
      w: 11.733,
      h: 0.025,
      fill: { color: C_DARK },
      line: { color: C_DARK }
    });
  }

  /**
   * Neo-Brutalist Column Card (Slides 3, 5, 7, 8)
   * With solid offset shadow, bold 2pt border, compact white pill badge, and bottom status divider.
   */
  function addNeoCard(slide, pptx, x, y, w, h, badge, title, bullets, footerText, isHighlight) {
    // 1. Neo-Brutalist hard shadow backing shape
    slide.addShape(getShape(pptx, 'roundRect'), {
      x: x + SHADOW_OFFSET,
      y: y + SHADOW_OFFSET,
      w: w,
      h: h,
      fill: { color: C_DARK },
      line: { color: C_DARK },
      rectRadius: 0.1
    });

    // 2. Main card body with bold 2pt dark border
    slide.addShape(getShape(pptx, 'roundRect'), {
      x: x,
      y: y,
      w: w,
      h: h,
      fill: { color: isHighlight ? C_RED_BG : C_CARD_BG },
      line: { color: C_DARK, width: 2 },
      rectRadius: 0.1
    });

    // 3. Compact Top White Pill Badge (matching web <span class="bg-white border border-slate-900 text-horizon-700 w-fit">)
    // Sized compactly to fit text length rather than stretching awkwardly across wide cards
    if (badge) {
      const bW = Math.min(w - 0.44, Math.max(2.0, badge.length * 0.082 + 0.35));
      const bH = 0.28;
      slide.addShape(getShape(pptx, 'roundRect'), {
        x: x + 0.22,
        y: y + 0.18,
        w: bW,
        h: bH,
        fill: { color: C_WHITE },
        line: { color: C_DARK, width: 1.2 },
        rectRadius: 0.06
      });
      slide.addText(badge.toUpperCase(), {
        x: x + 0.22,
        y: y + 0.18,
        w: bW,
        h: bH,
        fontFace: FONT_TITLE,
        fontSize: 8,
        bold: true,
        color: C_RED,
        align: 'center',
        valign: 'middle',
        margin: 0
      });
    }

    // 4. Card Title
    if (title) {
      slide.addText(title, {
        x: x + 0.22,
        y: y + 0.52,
        w: w - 0.44,
        h: 0.46,
        fontFace: FONT_TITLE,
        fontSize: 11,
        bold: true,
        color: C_DARK,
        valign: 'top',
        margin: 0
      });
    }

    // 5. Card Bullet Points with HTML runs
    if (bullets && bullets.length > 0) {
      const bulletRuns = formatBulletRuns(bullets, {
        fontFace: FONT_BODY,
        fontSize: 9.5,
        color: isHighlight ? '1E293B' : '334155'
      });

      const bulletsY = y + 1.02;
      const contentH = footerText ? h - 1.62 : h - 1.18;

      slide.addText(bulletRuns, {
        x: x + 0.22,
        y: bulletsY,
        w: w - 0.44,
        h: contentH,
        valign: 'top',
        margin: 0
      });
    }

    // 6. Card Bottom Footer Banner (matching web border-t + text-horizon-700)
    if (footerText) {
      const footerY = y + h - 0.46;
      slide.addShape(getShape(pptx, 'rect'), {
        x: x + 0.22,
        y: footerY,
        w: w - 0.44,
        h: 0.015,
        fill: { color: isHighlight ? 'FCA5A5' : 'CBD5E1' },
        line: { color: isHighlight ? 'FCA5A5' : 'CBD5E1' }
      });
      slide.addText(footerText, {
        x: x + 0.22,
        y: footerY + 0.04,
        w: w - 0.44,
        h: 0.36,
        fontFace: FONT_TITLE,
        fontSize: 9,
        bold: true,
        color: C_RED,
        valign: 'middle',
        margin: 0
      });
    }
  }

  async function generateAndDownloadPptx() {
    const btn = document.getElementById('pptx-download-btn');
    const originalHtml = btn ? btn.innerHTML : '';

    try {
      if (typeof PptxGenJS === 'undefined') {
        alert('PptxGenJS library is still loading or CDN unavailable. Please check your internet connection.');
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span class="hidden sm:inline">Generating PPTX...</span>';
      }

      const pptx = new PptxGenJS();
      pptx.defineLayout({ name: 'HORIZON_WIDE_16_9', width: 13.333, height: 7.5 });
      pptx.layout = 'HORIZON_WIDE_16_9';

      const images = window.PPTX_IMAGES || {};
      const data = getEnglishData();

      // ==========================================
      // SLIDE 1: LANDING PAGE OPENING HERO
      // ==========================================
      const s1 = pptx.addSlide();
      s1.background = { fill: C_WHITE };

      // Top Header Bar
      if (images.logo) {
        s1.addImage({ data: images.logo, x: 0.8, y: 0.34, w: 0.44, h: 0.44 });
      }

      s1.addText((data.slide1?.headerDept || 'Finance Department • Horizon University Indonesia').toUpperCase(), {
        x: 1.34,
        y: 0.42,
        w: 8.0,
        h: 0.35,
        fontFace: FONT_BODY,
        fontSize: 9.5,
        bold: true,
        color: C_MUTED,
        margin: 0
      });

      if (images.technospark) {
        s1.addImage({ data: images.technospark, x: 10.65, y: 0.24, w: 1.88, h: 0.52 });
      }

      // 2pt Neo-Brutalist Header Divider
      s1.addShape(getShape(pptx, 'rect'), {
        x: 0.8,
        y: 0.88,
        w: 11.733,
        h: 0.025,
        fill: { color: C_DARK },
        line: { color: C_DARK }
      });

      // Hero Title Banner
      s1.addText([
        { text: (data.slide1?.eyebrow || 'INTEGRATED CAMPUS LOGISTICS SUPPLY CHAIN SOLUTION').toUpperCase() + '\n', options: { fontFace: FONT_TITLE, fontSize: 11, bold: true, color: C_RED } },
        { text: 'HORIZONU ', options: { fontFace: FONT_TITLE, fontSize: 36, bold: true, color: C_DARK } },
        { text: 'UNIFORM\n\n', options: { fontFace: FONT_TITLE, fontSize: 36, bold: true, color: C_RED, underline: true } },
        { text: data.slide1?.desc || 'Digital transformation of student uniform operations: Connecting Upstream (Apparel Vendor), Campus Warehouse, and Finance to Downstream (Students) powered by precision data and FIFO inventory rules.', options: { fontFace: FONT_BODY, fontSize: 12, color: '334155' } }
      ], {
        x: 0.8,
        y: 1.15,
        w: 11.733,
        h: 2.4,
        valign: 'top',
        margin: 0
      });

      // Bento Grid (2 Boxes matching web layout with exact symmetric sizes)
      const b1X = GRID.col2.x[0];
      const b2X = GRID.col2.x[1];
      const bW = GRID.col2.w;
      const bH = 3.00;
      const bY = 3.80;

      // Box 1: Commodity & Scope (bg-neo-bg)
      s1.addShape(getShape(pptx, 'roundRect'), {
        x: b1X + SHADOW_OFFSET,
        y: bY + SHADOW_OFFSET,
        w: bW,
        h: bH,
        fill: { color: C_DARK },
        line: { color: C_DARK },
        rectRadius: 0.1
      });
      s1.addShape(getShape(pptx, 'roundRect'), {
        x: b1X,
        y: bY,
        w: bW,
        h: bH,
        fill: { color: C_CARD_BG },
        line: { color: C_DARK, width: 2 },
        rectRadius: 0.1
      });

      // Icon Square Badge
      s1.addShape(getShape(pptx, 'roundRect'), {
        x: b1X + 0.3 + SHADOW_OFFSET_SM,
        y: bY + 0.25 + SHADOW_OFFSET_SM,
        w: 0.44,
        h: 0.44,
        fill: { color: C_DARK },
        line: { color: C_DARK },
        rectRadius: 0.08
      });
      s1.addShape(getShape(pptx, 'roundRect'), {
        x: b1X + 0.3,
        y: bY + 0.25,
        w: 0.44,
        h: 0.44,
        fill: { color: C_RED },
        line: { color: C_DARK, width: 1.5 },
        rectRadius: 0.08
      });
      s1.addText('📦', {
        x: b1X + 0.3,
        y: bY + 0.25,
        w: 0.44,
        h: 0.44,
        fontSize: 14,
        align: 'center',
        valign: 'middle',
        margin: 0
      });

      // Box 1 Title
      s1.addText(data.slide1?.box1?.title || 'Logistics Commodity & Scope', {
        x: b1X + 0.3,
        y: bY + 0.82,
        w: bW - 0.6,
        h: 0.38,
        fontFace: FONT_TITLE,
        fontSize: 13,
        bold: true,
        color: C_DARK,
        valign: 'middle',
        margin: 0
      });

      // Box 1 Rich Description
      const box1Runs = parseHtmlRuns(data.slide1?.box1?.desc, {
        fontFace: FONT_BODY,
        fontSize: 10.5,
        color: C_MUTED
      });
      s1.addText(box1Runs, {
        x: b1X + 0.3,
        y: bY + 1.25,
        w: bW - 0.6,
        h: 1.5,
        valign: 'top',
        margin: 0
      });

      // Box 2: Core Operational Challenges (bg-red-50)
      s1.addShape(getShape(pptx, 'roundRect'), {
        x: b2X + SHADOW_OFFSET,
        y: bY + SHADOW_OFFSET,
        w: bW,
        h: bH,
        fill: { color: C_DARK },
        line: { color: C_DARK },
        rectRadius: 0.1
      });
      s1.addShape(getShape(pptx, 'roundRect'), {
        x: b2X,
        y: bY,
        w: bW,
        h: bH,
        fill: { color: C_RED_BG },
        line: { color: C_DARK, width: 2 },
        rectRadius: 0.1
      });

      // Icon Square Badge (Red)
      s1.addShape(getShape(pptx, 'roundRect'), {
        x: b2X + 0.3 + SHADOW_OFFSET_SM,
        y: bY + 0.25 + SHADOW_OFFSET_SM,
        w: 0.44,
        h: 0.44,
        fill: { color: C_DARK },
        line: { color: C_DARK },
        rectRadius: 0.08
      });
      s1.addShape(getShape(pptx, 'roundRect'), {
        x: b2X + 0.3,
        y: bY + 0.25,
        w: 0.44,
        h: 0.44,
        fill: { color: 'DC2626' },
        line: { color: C_DARK, width: 1.5 },
        rectRadius: 0.08
      });
      s1.addText('⚠️', {
        x: b2X + 0.3,
        y: bY + 0.25,
        w: 0.44,
        h: 0.44,
        fontSize: 14,
        align: 'center',
        valign: 'middle',
        margin: 0
      });

      // Box 2 Title
      s1.addText(data.slide1?.box2?.title || 'Core Operational Challenges', {
        x: b2X + 0.3,
        y: bY + 0.82,
        w: bW - 0.6,
        h: 0.38,
        fontFace: FONT_TITLE,
        fontSize: 13,
        bold: true,
        color: C_DARK,
        valign: 'middle',
        margin: 0
      });

      // Box 2 Rich Description
      const box2Runs = parseHtmlRuns(data.slide1?.box2?.desc, {
        fontFace: FONT_BODY,
        fontSize: 10.5,
        color: '334155'
      });
      s1.addText(box2Runs, {
        x: b2X + 0.3,
        y: bY + 1.25,
        w: bW - 0.6,
        h: 1.5,
        valign: 'top',
        margin: 0
      });

      s1.addNotes(getSpeakerNote(1));

      // ==========================================
      // SLIDE 2: OUR TEAM (NIRWANA DEVELOPMENT TEAM)
      // ==========================================
      const s2 = pptx.addSlide();
      applyHeader(s2, pptx,
        data.slide2?.badge || 'Development Team Profile',
        data.slide2?.title || 'Our Team • Nirwana Development Team',
        data.slide2?.subtitle || 'Cross-disciplinary collaboration across system architecture, software engineering, and platform governance',
        data.slide2?.badgeCount || '6 Core Engineers'
      );

      const team = [
        { id: 'ferry', name: 'Ferry Noer Hendriawan', role: data.slide2?.members?.ferry?.role || 'Frontend Developer', col: 0, row: 0, isPm: false },
        { id: 'fhazar', name: 'Fhazar Raffiful Aqyla', role: data.slide2?.members?.fhazar?.role || 'Project Manager', col: 1, row: 0, isPm: true },
        { id: 'hildan', name: 'Hildan Anugrah Tamadi Putra', role: data.slide2?.members?.hildan?.role || 'Backend Developer', col: 2, row: 0, isPm: false },
        { id: 'fadel', name: 'Fadel Rahmadhan', role: data.slide2?.members?.fadel?.role || 'Quality Assurance', col: 0, row: 1, isPm: false },
        { id: 'daffa', name: 'Daffa Nazriel Zaidan', role: data.slide2?.members?.daffa?.role || 'UI/UX Designer', col: 1, row: 1, isPm: false },
        { id: 'acep', name: 'Acep Ugan Saputra', role: data.slide2?.members?.acep?.role || 'System Analyst', col: 2, row: 1, isPm: false }
      ];

      const colX2 = GRID.col3.x;
      const rowY2 = GRID.rowHalf.y;
      const cardW2 = GRID.col3.w;
      const cardH2 = GRID.rowHalf.h;

      team.forEach(m => {
        const x = colX2[m.col];
        const y = rowY2[m.row];

        // 1. Neo-Brutalism card shadow
        s2.addShape(getShape(pptx, 'roundRect'), {
          x: x + SHADOW_OFFSET,
          y: y + SHADOW_OFFSET,
          w: cardW2,
          h: cardH2,
          fill: { color: C_DARK },
          line: { color: C_DARK },
          rectRadius: 0.1
        });

        // 2. Card body with 2pt border
        s2.addShape(getShape(pptx, 'roundRect'), {
          x: x,
          y: y,
          w: cardW2,
          h: cardH2,
          fill: { color: m.isPm ? C_RED_BG : C_CARD_BG },
          line: { color: C_DARK, width: 2 },
          rectRadius: 0.1
        });

        // 3. Avatar photo with clean circular border backing
        const picSize = 1.05;
        const picX = x + (cardW2 - picSize) / 2;
        const picY = y + 0.15;

        // Dark shadow ellipse behind avatar
        s2.addShape(getShape(pptx, 'ellipse'), {
          x: picX + SHADOW_OFFSET_SM,
          y: picY + SHADOW_OFFSET_SM,
          w: picSize,
          h: picSize,
          fill: { color: C_DARK },
          line: { color: C_DARK }
        });

        // Crisp border ring behind photo
        s2.addShape(getShape(pptx, 'ellipse'), {
          x: picX - 0.02,
          y: picY - 0.02,
          w: picSize + 0.04,
          h: picSize + 0.04,
          fill: { color: m.isPm ? C_RED : C_WHITE },
          line: { color: C_DARK, width: 1.5 }
        });

        // Actual rounded photo
        if (images[m.id]) {
          s2.addImage({
            data: images[m.id],
            x: picX,
            y: picY,
            w: picSize,
            h: picSize,
            rounding: true
          });
        }

        // 4. Name Pill with Neo shadow
        const pillW = 3.2;
        const pillH = 0.32;
        const pillX = x + (cardW2 - pillW) / 2;
        const pillY = y + 1.28;

        s2.addShape(getShape(pptx, 'roundRect'), {
          x: pillX + SHADOW_OFFSET_SM,
          y: pillY + SHADOW_OFFSET_SM,
          w: pillW,
          h: pillH,
          fill: { color: C_DARK },
          line: { color: C_DARK },
          rectRadius: 0.15
        });

        s2.addShape(getShape(pptx, 'roundRect'), {
          x: pillX,
          y: pillY,
          w: pillW,
          h: pillH,
          fill: { color: C_RED },
          line: { color: C_DARK, width: 1.5 },
          rectRadius: 0.15
        });

        s2.addText(m.name.toUpperCase(), {
          x: pillX,
          y: pillY,
          w: pillW,
          h: pillH,
          fontFace: FONT_TITLE,
          fontSize: 8.5,
          bold: true,
          color: C_WHITE,
          align: 'center',
          valign: 'middle',
          margin: 0
        });

        // 5. Role
        s2.addText(m.role, {
          x: x + 0.1,
          y: y + 1.68,
          w: cardW2 - 0.2,
          h: 0.45,
          fontFace: FONT_TITLE,
          fontSize: 10.5,
          bold: true,
          color: m.isPm ? C_RED : C_DARK,
          align: 'center',
          valign: 'top',
          margin: 0
        });
      });

      s2.addNotes(getSpeakerNote(2));

      // ==========================================
      // SLIDE 3: SUPPLY CHAIN STRUCTURE
      // ==========================================
      const s3 = pptx.addSlide();
      applyHeader(s3, pptx,
        data.slide3?.badge || 'Supply Chain Structure',
        data.slide3?.title || 'Stakeholder Mapping & Physical Cargo Flow',
        data.slide3?.subtitle || "Integrated physical flow from garment vendor to student handoff under the 'Data Locks Physical Asset' doctrine"
      );

      const c1 = data.slide3?.col1 || {};
      const c2 = data.slide3?.col2 || {};
      const c3 = data.slide3?.col3 || {};
      const c4 = data.slide3?.col4 || {};

      const colX3 = GRID.col4.x;
      const cardW3 = GRID.col4.w;
      const cardH3 = GRID.rowFull.h;
      const cardY3 = GRID.rowFull.y;

      addNeoCard(s3, pptx, colX3[0], cardY3, cardW3, cardH3,
        c1.step || '01 • Supplier (Upstream)',
        c1.title || 'Garment & Shoe Factories',
        [c1.p1, c1.p2, c1.p3],
        c1.flow || 'Flow: Aggregate PO ➔ Inbound Freight',
        false
      );

      addNeoCard(s3, pptx, colX3[1], cardY3, cardW3, cardH3,
        c2.step || '02 • Warehouse (Inbound)',
        c2.title || 'Campus Logistics Warehouse',
        [c2.p1, c2.p2, c2.p3],
        c2.flow || 'Flow: Inbound ➔ POS Distribution Booths',
        false
      );

      addNeoCard(s3, pptx, colX3[2], cardY3, cardW3, cardH3,
        c3.step || '03 • Verifiers & Booths',
        c3.title || 'Finance & On-Site Booth Staff',
        [c3.p1, c3.p2, c3.p3],
        c3.flow || 'Flow: Paid Status ➔ Physical Handover',
        true
      );

      addNeoCard(s3, pptx, colX3[3], cardY3, cardW3, cardH3,
        c4.step || '04 • Consumer (Downstream)',
        c4.title || 'Freshman Students (Customers)',
        [c4.p1, c4.p2, c4.p3],
        c4.flow || 'Flow: Size Profile ➔ Tailored Uniform Package',
        false
      );

      s3.addNotes(getSpeakerNote(3));

      // ==========================================
      // SLIDE 4: PROBLEM ANALYSIS (NEO TABLE)
      // ==========================================
      const s4 = pptx.addSlide();
      applyHeader(s4, pptx,
        data.slide4?.badge || 'Legacy System Problem Analysis',
        data.slide4?.title || 'Operational Bottlenecks & Systemic Impact Evaluation',
        data.slide4?.subtitle || 'Comprehensive root cause analysis of manual spreadsheets causing cost overruns, delays, and service degradation'
      );

      const s4Headers = [
        { text: data.slide4?.thProblem || 'Primary Problem (Field Symptom)', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10.5, fontFace: FONT_TITLE, valign: 'middle', margin: [6, 8, 6, 8] } },
        { text: data.slide4?.thCause || 'Root Cause', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10.5, fontFace: FONT_TITLE, valign: 'middle', margin: [6, 8, 6, 8] } },
        { text: data.slide4?.thImpact || 'Impact on Cost, Time, Inventory & Service', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10.5, fontFace: FONT_TITLE, valign: 'middle', margin: [6, 8, 6, 8] } }
      ];

      const s4r1 = data.slide4?.row1 || {};
      const s4r2 = data.slide4?.row2 || {};
      const s4r3 = data.slide4?.row3 || {};
      const s4r4 = data.slide4?.row4 || {};

      const s4Rows = [
        s4Headers,
        [
          { text: s4r1.problem || '1. Size Mismatches & Dead-Stock Accumulation', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { text: parseHtmlRuns(s4r1.cause, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { text: parseHtmlRuns(s4r1.impact, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } }
        ],
        [
          { text: s4r2.problem || '2. Excel Crashes & Delayed Schedule Broadcasts', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { text: parseHtmlRuns(s4r2.cause, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { text: parseHtmlRuns(s4r2.impact, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } }
        ],
        [
          { text: s4r3.problem || '3. Booth Queue Bottlenecks & Double-Claim Exposure', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { text: parseHtmlRuns(s4r3.cause, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { text: parseHtmlRuns(s4r3.impact, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } }
        ],
        [
          { text: s4r4.problem || '4. Shrinkage & Opaque COGS / FIFO Valuation', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { text: parseHtmlRuns(s4r4.cause, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { text: parseHtmlRuns(s4r4.impact, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } }
        ]
      ];

      // Exact 25%, 38%, 37% column widths matching web w-1/4, w-[38%], w-[37%]
      s4.addTable(s4Rows, {
        x: 0.8,
        y: 1.55,
        w: 11.733,
        colW: [2.933, 4.458, 4.342],
        border: { color: C_DARK, pt: 1.5 }
      });

      s4.addNotes(getSpeakerNote(4));

      // ==========================================
      // SLIDE 5: INFORMATION FLOW ANALYSIS
      // ==========================================
      const s5 = pptx.addSlide();
      applyHeader(s5, pptx,
        data.slide5?.badge || 'Information Flow Analysis',
        data.slide5?.title || 'Data Bottlenecks & Information Silos (As-Is State)',
        data.slide5?.subtitle || 'Inter-departmental communication barriers triggering service delays, data inconsistencies, and transaction friction'
      );

      const f1 = data.slide5?.card1 || {};
      const f2 = data.slide5?.card2 || {};
      const f3 = data.slide5?.card3 || {};
      const f4 = data.slide5?.card4 || {};

      const colX5 = GRID.col2.x;
      const rowY5 = GRID.rowHalf.y;
      const cardW5 = GRID.col2.w;
      const cardH5 = GRID.rowHalf.h;

      addNeoCard(s5, pptx, colX5[0], rowY5[0], cardW5, cardH5,
        f1.flow || 'Flow 01 • Student ➔ University',
        f1.title || 'Requirement: Size Profiles & Schedules',
        [f1.p1, f1.p2],
        f1.status || 'Status: Delayed Information & Unstandardized Format',
        false
      );

      addNeoCard(s5, pptx, colX5[1], rowY5[0], cardW5, cardH5,
        f2.flow || 'Flow 02 • Finance ➔ Day-Of Distribution',
        f2.title || 'Requirement: Tuition Paid Status (Eligibility)',
        [f2.p1, f2.p2],
        f2.status || 'Status: Severed Communication (Local Data Silos)',
        true
      );

      addNeoCard(s5, pptx, colX5[0], rowY5[1], cardW5, cardH5,
        f3.flow || 'Flow 03 • Booth Desk ➔ Warehouse',
        f3.title || 'Requirement: Package Entitlement & Stock Ledger',
        [f3.p1, f3.p2],
        f3.status || 'Status: Lagging Records (Paper-Based Handover)',
        false
      );

      addNeoCard(s5, pptx, colX5[1], rowY5[1], cardW5, cardH5,
        f4.flow || 'Flow 04 • Procurement ➔ Factory',
        f4.title || 'Requirement: Aggregate Purchase Orders (PO)',
        [f4.p1, f4.p2],
        f4.status || 'Status: Blind Ordering (Lack of Real Demand Signal)',
        false
      );

      s5.addNotes(getSpeakerNote(5));

      // ==========================================
      // SLIDE 6: RECOMMENDED INFORMATION SYSTEMS (NEO TABLE)
      // ==========================================
      const s6 = pptx.addSlide();
      applyHeader(s6, pptx,
        data.slide6?.badge || 'Integrated System Recommendation',
        data.slide6?.title || 'Information System Architecture Selection (HorizonU Uniform Engine)',
        data.slide6?.subtitle || 'Unified convergence of four enterprise pillars: ERP, SCM, POS, and WMS in a modern web platform'
      );

      const s6Headers = [
        { text: data.slide6?.thProblem || 'Problem Addressed', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10, fontFace: FONT_TITLE, valign: 'middle', margin: [6, 8, 6, 8] } },
        { text: data.slide6?.thSystem || 'Recommended System & Module', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10, fontFace: FONT_TITLE, valign: 'middle', margin: [6, 8, 6, 8] } },
        { text: data.slide6?.thFunc || 'System Function in Case Study', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10, fontFace: FONT_TITLE, valign: 'middle', margin: [6, 8, 6, 8] } },
        { text: data.slide6?.thBenefit || 'Measurable Value Delivered', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10, fontFace: FONT_TITLE, valign: 'middle', margin: [6, 8, 6, 8] } }
      ];

      const s6r1 = data.slide6?.row1 || {};
      const s6r2 = data.slide6?.row2 || {};
      const s6r3 = data.slide6?.row3 || {};
      const s6r4 = data.slide6?.row4 || {};

      const s6Rows = [
        s6Headers,
        [
          { text: s6r1.problem || 'Excel Crashes & Fragmented Student Records', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { 
            text: [
              { text: (s6r1.system || 'ERP Master & Entitlement Engine') + '\n', options: { bold: true, color: C_DARK, fontSize: 9.5, fontFace: FONT_TITLE } },
              { text: '(' + (s6r1.tech || 'MySQL InnoDB') + ')', options: { italic: true, color: C_MUTED, fontSize: 8.5, fontFace: FONT_BODY } }
            ], 
            options: { fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } 
          },
          { text: parseHtmlRuns(s6r1.func, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { text: parseHtmlRuns(s6r1.benefit, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } }
        ],
        [
          { text: s6r2.problem || 'Dead-Stock & Delayed Schedule Broadcasts', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { 
            text: [
              { text: (s6r2.system || 'SCM Demand Planning Portal') + '\n', options: { bold: true, color: C_DARK, fontSize: 9.5, fontFace: FONT_TITLE } },
              { text: '(' + (s6r2.tech || 'Size Event Hub') + ')', options: { italic: true, color: C_MUTED, fontSize: 8.5, fontFace: FONT_BODY } }
            ], 
            options: { fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } 
          },
          { text: parseHtmlRuns(s6r2.func, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { text: parseHtmlRuns(s6r2.benefit, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } }
        ],
        [
          { text: s6r3.problem || 'Queue Congestion & Double-Claim Risk', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { 
            text: [
              { text: (s6r3.system || 'POS QR Verification Engine') + '\n', options: { bold: true, color: C_DARK, fontSize: 9.5, fontFace: FONT_TITLE } },
              { text: '(' + (s6r3.tech || 'BaconQrCode & Scanner') + ')', options: { italic: true, color: C_MUTED, fontSize: 8.5, fontFace: FONT_BODY } }
            ], 
            options: { fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } 
          },
          { text: parseHtmlRuns(s6r3.func, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { text: parseHtmlRuns(s6r3.benefit, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_CARD_BG }, valign: 'top', margin: [6, 8, 6, 8] } }
        ],
        [
          { text: s6r4.problem || 'Warehouse Shrinkage & Opaque COGS Valuation', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { 
            text: [
              { text: (s6r4.system || 'WMS & FIFO Costing Engine') + '\n', options: { bold: true, color: C_DARK, fontSize: 9.5, fontFace: FONT_TITLE } },
              { text: '(' + (s6r4.tech || 'StockBatch & Movement Ledger') + ')', options: { italic: true, color: C_MUTED, fontSize: 8.5, fontFace: FONT_BODY } }
            ], 
            options: { fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } 
          },
          { text: parseHtmlRuns(s6r4.func, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } },
          { text: parseHtmlRuns(s6r4.benefit, { color: C_DARK, fontSize: 9.5, fontFace: FONT_BODY }), options: { fill: { color: C_RED_BG }, valign: 'top', margin: [6, 8, 6, 8] } }
        ]
      ];

      // Exact 22%, 26%, 34%, 18% column widths matching web w-[22%], w-[26%], w-[34%], w-[18%]
      s6.addTable(s6Rows, {
        x: 0.8,
        y: 1.55,
        w: 11.733,
        colW: [2.581, 3.050, 3.990, 2.112],
        border: { color: C_DARK, pt: 1.5 }
      });

      s6.addNotes(getSpeakerNote(6));

      // ==========================================
      // SLIDE 7: PROPOSED SOLUTION DESIGN
      // ==========================================
      const s7 = pptx.addSlide();
      applyHeader(s7, pptx,
        data.slide7?.badge || 'Proposed Solution Design',
        data.slide7?.title || '4-Phase Closed-Loop Supply Chain Architecture',
        data.slide7?.subtitle || 'End-to-end system connectivity, atomic transaction processing, and closed-loop data feedback'
      );

      const p1 = data.slide7?.phase1 || {};
      const p2 = data.slide7?.phase2 || {};
      const p3 = data.slide7?.phase3 || {};
      const p4 = data.slide7?.phase4 || {};

      const colX7 = GRID.col4.x;
      const cardW7 = GRID.col4.w;
      const cardH7 = GRID.rowFull.h;
      const cardY7 = GRID.rowFull.y;

      addNeoCard(s7, pptx, colX7[0], cardY7, cardW7, cardH7,
        p1.step || 'Phase 1 • Upstream (Inbound)',
        p1.title || 'Inbound & FIFO Batch Registry',
        [p1.p1, p1.p2, p1.p3],
        p1.output || 'Output: Tracked FIFO Batch Inflow',
        false
      );

      addNeoCard(s7, pptx, colX7[1], cardY7, cardW7, cardH7,
        p2.step || 'Phase 2 • Demand (Planning)',
        p2.title || 'Eligibility Clearance & Size Profiling',
        [p2.p1, p2.p2, p2.p3],
        p2.output || 'Output: Active QR Pass & Assigned Time Slot',
        false
      );

      addNeoCard(s7, pptx, colX7[2], cardY7, cardW7, cardH7,
        p3.step || 'Phase 3 • Downstream (Outbound)',
        p3.title || 'POS QR & 6-Tier Atomic Validation',
        [p3.p1, p3.p2, p3.p3],
        p3.output || 'Output: Verified Zero-Defect Handover',
        true
      );

      addNeoCard(s7, pptx, colX7[3], cardY7, cardW7, cardH7,
        p4.step || 'Phase 4 • Control (Audit)',
        p4.title || 'Stock Opname & Closed-Loop Feedback',
        [p4.p1, p4.p2, p4.p3],
        p4.output || 'Output: Continuous Closed-Loop Feedback',
        false
      );

      s7.addNotes(getSpeakerNote(7));

      // ==========================================
      // SLIDE 8: IMPLEMENTATION AND RISKS
      // ==========================================
      const s8 = pptx.addSlide();
      applyHeader(s8, pptx,
        data.slide8?.badge || 'Deployment Plan & Risk Governance',
        data.slide8?.title || 'Implementation Priorities & Field Risk Mitigation',
        data.slide8?.subtitle || 'Operational readiness roadmap alongside battle-tested contingency protocols for distribution day'
      );

      const pr = data.slide8?.priorities || {};
      const rk = data.slide8?.risks || {};

      const colX8 = GRID.col2.x;
      const cardW8 = GRID.col2.w;
      const cardH8 = GRID.rowFull.h;
      const cardY8 = GRID.rowFull.y;

      // Equal 50/50 two columns matching web grid-cols-2
      addNeoCard(s8, pptx, colX8[0], cardY8, cardW8, cardH8,
        pr.badge || '3 Implementation Priorities',
        pr.title || 'System Readiness Roadmap',
        [pr.p1, pr.p2, pr.p3],
        pr.roadmap || 'Roadmap: 6-Week Turnkey Deployment',
        false
      );

      addNeoCard(s8, pptx, colX8[1], cardY8, cardW8, cardH8,
        rk.badge || '3 Field Risks & Contingency SOPs',
        rk.title || 'Booth Operational Protocols',
        [rk.item1 || rk.r1Title, rk.item2 || rk.r2Title, rk.item3 || rk.r3Title],
        rk.tolerance || 'Fault Tolerance: High Operational Resilience',
        true
      );

      s8.addNotes(getSpeakerNote(8));

      // ==========================================
      // SLIDE 9: CONCLUSION & MEASURED IMPACT (BIG METRICS)
      // ==========================================
      const s9 = pptx.addSlide();
      applyHeader(s9, pptx,
        data.slide9?.badge || 'Conclusion & Measured Impact',
        data.slide9?.title || 'Strategic Outcomes & Measurable Business Value',
        data.slide9?.subtitle || 'Operational transformation of Horizon University Indonesia Finance Department post-digitalization'
      );

      const m1 = data.slide9?.m1 || {};
      const m2 = data.slide9?.m2 || {};
      const m3 = data.slide9?.m3 || {};

      const colX9 = GRID.col3.x;
      const cardW9 = GRID.col3.w;
      const cardH9 = GRID.rowFull.h;
      const cardY9 = GRID.rowFull.y;

      function addMetricCard(x, y, w, h, badge, metricVal, title, bullets, footerText, isHighlight) {
        // Neo shadow backing
        s9.addShape(getShape(pptx, 'roundRect'), {
          x: x + SHADOW_OFFSET,
          y: y + SHADOW_OFFSET,
          w: w,
          h: h,
          fill: { color: C_DARK },
          line: { color: C_DARK },
          rectRadius: 0.1
        });

        // Main card body with 2pt border
        s9.addShape(getShape(pptx, 'roundRect'), {
          x: x,
          y: y,
          w: w,
          h: h,
          fill: { color: isHighlight ? C_RED_BG : C_CARD_BG },
          line: { color: C_DARK, width: 2 },
          rectRadius: 0.1
        });

        // Compact Centered Badge pill
        const bW = Math.min(w - 0.44, Math.max(2.1, badge.length * 0.080 + 0.35));
        const bX = x + (w - bW) / 2;
        const bH = 0.28;
        s9.addShape(getShape(pptx, 'roundRect'), {
          x: bX,
          y: y + 0.18,
          w: bW,
          h: bH,
          fill: { color: C_WHITE },
          line: { color: C_DARK, width: 1.2 },
          rectRadius: 0.06
        });
        s9.addText(badge.toUpperCase(), {
          x: bX,
          y: y + 0.18,
          w: bW,
          h: bH,
          fontFace: FONT_TITLE,
          fontSize: 8,
          bold: true,
          color: C_RED,
          align: 'center',
          valign: 'middle',
          margin: 0
        });

        // Huge Bold KPI Metric (Neo-Brutalist 36pt font)
        // Red for Card 1 highlight, Dark for Cards 2 and 3 matching web design
        s9.addText(metricVal, {
          x: x + 0.22,
          y: y + 0.54,
          w: w - 0.44,
          h: 0.76,
          fontFace: FONT_TITLE,
          fontSize: 36,
          bold: true,
          color: isHighlight ? C_RED : C_DARK,
          align: 'center',
          valign: 'middle',
          margin: 0
        });

        // Metric Title
        s9.addText(title, {
          x: x + 0.22,
          y: y + 1.34,
          w: w - 0.44,
          h: 0.38,
          fontFace: FONT_TITLE,
          fontSize: 11.5,
          bold: true,
          color: C_DARK,
          align: 'center',
          valign: 'top',
          margin: 0
        });

        // Divider
        s9.addShape(getShape(pptx, 'rect'), {
          x: x + 0.22,
          y: y + 1.76,
          w: w - 0.44,
          h: 0.015,
          fill: { color: isHighlight ? 'FCA5A5' : 'CBD5E1' },
          line: { color: isHighlight ? 'FCA5A5' : 'CBD5E1' }
        });

        // Bullet Points
        const bulletRuns = formatBulletRuns(bullets, {
          fontFace: FONT_BODY,
          fontSize: 9.5,
          color: isHighlight ? '1E293B' : '334155'
        });

        s9.addText(bulletRuns, {
          x: x + 0.22,
          y: y + 1.88,
          w: w - 0.44,
          h: h - 2.45,
          valign: 'top',
          margin: 0
        });

        // Footer Banner
        const footerY = y + h - 0.46;
        s9.addShape(getShape(pptx, 'rect'), {
          x: x + 0.22,
          y: footerY,
          w: w - 0.44,
          h: 0.015,
          fill: { color: isHighlight ? 'FCA5A5' : 'CBD5E1' },
          line: { color: isHighlight ? 'FCA5A5' : 'CBD5E1' }
        });
        s9.addText(footerText, {
          x: x + 0.22,
          y: footerY + 0.04,
          w: w - 0.44,
          h: 0.36,
          fontFace: FONT_TITLE,
          fontSize: 9,
          bold: true,
          color: isHighlight ? C_RED : C_DARK,
          valign: 'middle',
          margin: 0
        });
      }

      addMetricCard(colX9[0], cardY9, cardW9, cardH9,
        m1.badge || 'VALUE 01 • SERVICE EFFICIENCY',
        m1.value || '< 30s',
        m1.title || 'Per Student Pickup Time',
        [m1.p1, m1.p2, m1.p3],
        m1.impact || 'Impact: Swift & Professional Student Experience',
        true
      );

      addMetricCard(colX9[1], cardY9, cardW9, cardH9,
        m2.badge || 'VALUE 02 • INVENTORY ACCURACY',
        m2.value || '0',
        m2.title || 'Dead-Stock Accumulation',
        [m2.p1, m2.p2, m2.p3],
        m2.impact || 'Impact: Maximum Working Capital Efficiency',
        false
      );

      addMetricCard(colX9[2], cardY9, cardW9, cardH9,
        m3.badge || 'VALUE 03 • FINANCIAL AUDITABILITY',
        m3.value || '100%',
        m3.title || 'Real-Time FIFO Valuation',
        [m3.p1, m3.p2, m3.p3],
        m3.impact || 'Impact: Discrepancy-Free Financial Audit Trail',
        false
      );

      s9.addNotes(getSpeakerNote(9));

      // ==========================================
      // WRITE FILE & TRIGGER DOWNLOAD (ENGLISH FILE)
      // ==========================================
      const fileName = 'HorizonU_Uniform_SCM_Presentation_Technospark.pptx';
      await pptx.writeFile({ fileName: fileName });

    } catch (err) {
      console.error('Failed to generate PPTX:', err);
      alert('Error generating PPTX file: ' + err.message);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalHtml;
      }
    }
  }

  // Export to window
  window.generateAndDownloadPptx = generateAndDownloadPptx;

})(window);
