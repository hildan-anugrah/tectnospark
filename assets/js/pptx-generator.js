/**
 * HorizonU Uniform — Client-Side PPTX Generator (Neo-Brutalism Edition)
 * Generates an executive 16:9 PowerPoint presentation directly in the browser using PptxGenJS.
 * Fully incorporates Neo-Brutalism styling:
 * - 2pt Solid Slate-900 (#0F172A) borders
 * - Hard offset drop shadows (shadow-neo)
 * - Crimson Horizon (#980517) highlights & Red-50 tints
 * - Amber badges, big metric numbers, and clean typography
 * - English locale by default (window.I18N_EN_DATA)
 */

(function (window) {
  'use strict';

  // Neo-Brutalism Color System
  const C_RED        = '980517'; // Official Horizon Crimson
  const C_RED_BG     = 'FEF2F2'; // Neo-red tint
  const C_WHITE      = 'FFFFFF'; // Pure white canvas
  const C_CARD_BG    = 'FBFBFA'; // Neo off-white card
  const C_DARK       = '0F172A'; // Slate-900 border & text
  const C_MUTED      = '475569'; // Slate-600 secondary text
  const C_AMBER_BG   = 'FEF3C7'; // Amber-100 badge
  const FONT_TITLE   = 'Arial';
  const FONT_BODY    = 'Calibri';

  const SHADOW_OFFSET    = 0.055; // 4px hard neo-shadow
  const SHADOW_OFFSET_SM = 0.038; // 3px hard neo-shadow

  function stripHtml(html) {
    if (!html) return '';
    return html
      .replace(/<br\s*[\/]?>/gi, '\n')
      .replace(/<[^>]*>?/gm, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  }

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

  // Neo-Brutalist Card with solid offset shadow & bold 2pt border
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

    // 3. Card Content
    const textRuns = [];

    if (badge) {
      textRuns.push({
        text: badge.toUpperCase() + '\n',
        options: { fontFace: FONT_TITLE, fontSize: 9.5, bold: true, color: C_RED }
      });
    }

    if (title) {
      textRuns.push({
        text: title + '\n\n',
        options: { fontFace: FONT_TITLE, fontSize: 12.5, bold: true, color: C_DARK }
      });
    }

    if (bullets && bullets.length > 0) {
      bullets.forEach((b, idx) => {
        textRuns.push({
          text: (b.startsWith('•') ? b : '•  ' + b) + (idx < bullets.length - 1 ? '\n\n' : '\n'),
          options: { fontFace: FONT_BODY, fontSize: 10, color: C_DARK }
        });
      });
    }

    // Calculate footer separation
    const contentH = footerText ? h - 0.72 : h - 0.36;

    slide.addText(textRuns, {
      x: x + 0.22,
      y: y + 0.18,
      w: w - 0.44,
      h: contentH,
      valign: 'top',
      margin: 0
    });

    // 4. Card Bottom Footer Banner (if provided)
    if (footerText) {
      const footerY = y + h - 0.52;
      slide.addShape(getShape(pptx, 'rect'), {
        x: x + 0.2,
        y: footerY,
        w: w - 0.4,
        h: 0.015,
        fill: { color: isHighlight ? C_RED : 'CBD5E1' },
        line: { color: isHighlight ? C_RED : 'CBD5E1' }
      });
      slide.addText(footerText, {
        x: x + 0.22,
        y: footerY + 0.06,
        w: w - 0.44,
        h: 0.38,
        fontFace: FONT_TITLE,
        fontSize: 9.5,
        bold: true,
        color: isHighlight ? C_RED : C_DARK,
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
        h: 2.5,
        valign: 'top',
        margin: 0
      });

      // 2 Bento Cards with Neo-Brutalist Shadow & 2pt Border
      addNeoCard(s1, pptx, 0.8, 3.85, 5.75, 2.95,
        data.slide1?.box1?.title || 'Logistics Commodity & Scope',
        'Campus Equipment Procurement',
        [
          stripHtml(data.slide1?.box1?.desc || 'Annual procurement and distribution of thousands of freshman packages: Alma Mater Blazers, White Shirts, Formal Trousers/Skirts, Lab & Clinical Shoes, and Medical Kits.'),
          'Direct campus distribution without commercial retail intermediaries (Direct Campus SCM).'
        ],
        'Model: Closed-Loop Campus SCM',
        false
      );

      addNeoCard(s1, pptx, 6.78, 3.85, 5.75, 2.95,
        data.slide1?.box2?.title || 'Core Operational Challenges',
        'Spreadsheet & Queue Obstacles',
        [
          stripHtml(data.slide1?.box2?.desc || '4.5 MB master Excel spreadsheet prone to crashing during peak enrollment.'),
          'Slow physical queue turnaround times (15–20 minutes per student) due to manual paper verification.',
          'Heuristic vendor procurement ratios causing massive dead-stock and trapped campus working capital.'
        ],
        'Impact: Stagnant Capital & Double-Claim Vulnerability',
        true
      );

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

      const colX = [0.8, 4.78, 8.76];
      const rowY = [1.55, 4.25];
      const cardW = 3.75;
      const cardH = 2.5;

      team.forEach(m => {
        const x = colX[m.col];
        const y = rowY[m.row];

        // 1. Neo-Brutalism card shadow
        s2.addShape(getShape(pptx, 'roundRect'), {
          x: x + SHADOW_OFFSET,
          y: y + SHADOW_OFFSET,
          w: cardW,
          h: cardH,
          fill: { color: C_DARK },
          line: { color: C_DARK },
          rectRadius: 0.1
        });

        // 2. Card body with 2pt border
        s2.addShape(getShape(pptx, 'roundRect'), {
          x: x,
          y: y,
          w: cardW,
          h: cardH,
          fill: { color: m.isPm ? C_RED_BG : C_CARD_BG },
          line: { color: C_DARK, width: 2 },
          rectRadius: 0.1
        });

        // 3. Avatar photo with Neo circular shadow & border
        const picSize = 1.05;
        const picX = x + (cardW - picSize) / 2;
        const picY = y + 0.15;

        s2.addShape(getShape(pptx, 'ellipse'), {
          x: picX + SHADOW_OFFSET_SM,
          y: picY + SHADOW_OFFSET_SM,
          w: picSize,
          h: picSize,
          fill: { color: C_DARK },
          line: { color: C_DARK }
        });

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

        s2.addShape(getShape(pptx, 'ellipse'), {
          x: picX,
          y: picY,
          w: picSize,
          h: picSize,
          fill: { type: 'none' },
          line: { color: C_DARK, width: 2 }
        });

        // 4. Name Pill with Neo shadow
        const pillW = 3.2;
        const pillH = 0.32;
        const pillX = x + (cardW - pillW) / 2;
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
          w: cardW - 0.2,
          h: 0.45,
          fontFace: FONT_TITLE,
          fontSize: 11,
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

      addNeoCard(s3, pptx, 0.8, 1.55, 2.78, 5.25,
        c1.step || '01 • Supplier (Upstream)',
        c1.title || 'Garment & Shoe Factories',
        [
          stripHtml(c1.p1 || 'Produces uniform packages based on aggregate purchase orders (PO).'),
          stripHtml(c1.p2 || 'Enforces strict 5-segment SKU coding standards per category and size.'),
          stripHtml(c1.p3 || 'Cargo Point: Inbound container shipments delivered to campus warehouse.')
        ],
        c1.flow || 'Flow: Aggregate PO ➔ Inbound Freight',
        false
      );

      addNeoCard(s3, pptx, 3.78, 1.55, 2.78, 5.25,
        c2.step || '02 • Warehouse (Inbound)',
        c2.title || 'Campus Logistics Warehouse',
        [
          stripHtml(c2.p1 || 'Physical cargo receiving (StockReceive) and quality control (QC).'),
          stripHtml(c2.p2 || 'Strict FIFO (First-In, First-Out) batch recording and landed unit cost assignment.'),
          stripHtml(c2.p3 || 'Cargo Point: Outbound transfer of oldest batches to distribution booths.')
        ],
        c2.flow || 'Flow: Inbound ➔ POS Distribution Booths',
        false
      );

      addNeoCard(s3, pptx, 6.76, 1.55, 2.78, 5.25,
        c3.step || '03 • Verifiers & Booths',
        c3.title || 'Finance & On-Site Booth Staff',
        [
          stripHtml(c3.p1 || 'Finance: Authorizes student tuition payment status (Eligibility verification).'),
          stripHtml(c3.p2 || 'Booth Staff: Serves physical garment distribution at campus pickup booths.'),
          stripHtml(c3.p3 || 'Critical Point: QR Code identity scanning and size fitting validation.')
        ],
        c3.flow || 'Flow: Paid Status ➔ Physical Handover',
        true
      );

      addNeoCard(s3, pptx, 9.74, 1.55, 2.78, 5.25,
        c4.step || '04 • Consumer (Downstream)',
        c4.title || 'Freshman Students (Customers)',
        [
          stripHtml(c4.p1 || 'End consumers with official package entitlements per study program.'),
          stripHtml(c4.p2 || 'Submits body size profiles via student portal and receives assigned schedule tickets.'),
          stripHtml(c4.p3 || 'Info Point: Presents high-resolution QR Code ticket at pickup booth.')
        ],
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
        { text: data.slide4?.thProblem || 'Primary Problem (Field Symptom)', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10.5, fontFace: FONT_TITLE } },
        { text: data.slide4?.thCause || 'Root Cause', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10.5, fontFace: FONT_TITLE } },
        { text: data.slide4?.thImpact || 'Impact on Cost, Time, Inventory & Service', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10.5, fontFace: FONT_TITLE } }
      ];

      const s4r1 = data.slide4?.row1 || {};
      const s4r2 = data.slide4?.row2 || {};
      const s4r3 = data.slide4?.row3 || {};
      const s4r4 = data.slide4?.row4 || {};

      const s4Rows = [
        s4Headers,
        [
          { text: s4r1.problem || '1. Size Mismatches & Dead-Stock Accumulation', options: { color: C_RED, bold: true, fontSize: 10, fill: { color: C_CARD_BG } } },
          { text: s4r1.cause || 'Factory procurement orders based purely on historical heuristic ratios.', options: { color: C_DARK, fontSize: 10, fill: { color: C_CARD_BG } } },
          { text: stripHtml(s4r1.impact || 'Inventory & Cost Impact: Popular sizes ran out while extreme sizes accumulated as dead-stock.'), options: { color: C_DARK, fontSize: 10, fill: { color: C_CARD_BG } } }
        ],
        [
          { text: s4r2.problem || '2. Excel Crashes & Delayed Schedule Broadcasts', options: { color: C_RED, bold: true, fontSize: 10, fill: { color: C_RED_BG } } },
          { text: s4r2.cause || 'Finance managed a massive spreadsheet file (~4.5 MB, 19 sheets) for thousands of students.', options: { color: C_DARK, fontSize: 10, fill: { color: C_RED_BG } } },
          { text: stripHtml(s4r2.impact || 'Time & Service Impact: Constant software freezes and delayed schedules.'), options: { color: C_DARK, fontSize: 10, fill: { color: C_RED_BG } } }
        ],
        [
          { text: s4r3.problem || '3. Booth Queue Bottlenecks & Double-Claim Exposure', options: { color: C_RED, bold: true, fontSize: 10, fill: { color: C_CARD_BG } } },
          { text: s4r3.cause || 'Verification and handover confirmations were handled manually by paper checklist tick marks.', options: { color: C_DARK, fontSize: 10, fill: { color: C_CARD_BG } } },
          { text: stripHtml(s4r3.impact || 'Time & Accuracy Impact: Service times lagged at 15–20 minutes with high double-claim exposure.'), options: { color: C_DARK, fontSize: 10, fill: { color: C_CARD_BG } } }
        ],
        [
          { text: s4r4.problem || '4. Shrinkage & Opaque COGS / FIFO Valuation', options: { color: C_RED, bold: true, fontSize: 10, fill: { color: C_RED_BG } } },
          { text: s4r4.cause || 'Uniform receipts from vendors were not tracked via FIFO queues or automated ledger entries.', options: { color: C_DARK, fontSize: 10, fill: { color: C_RED_BG } } },
          { text: stripHtml(s4r4.impact || 'Cost & Audit Impact: Unaccounted inventory shrinkage and distorted COGS/GPM calculations.'), options: { color: C_DARK, fontSize: 10, fill: { color: C_RED_BG } } }
        ]
      ];

      // Table Neo shadow backing
      s4.addShape(getShape(pptx, 'roundRect'), {
        x: 0.8 + SHADOW_OFFSET,
        y: 1.55 + SHADOW_OFFSET,
        w: 11.733,
        h: 5.25,
        fill: { color: C_DARK },
        line: { color: C_DARK },
        rectRadius: 0.08
      });

      s4.addTable(s4Rows, {
        x: 0.8,
        y: 1.55,
        w: 11.733,
        colW: [3.2, 4.2, 4.333],
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

      addNeoCard(s5, pptx, 0.8, 1.55, 5.75, 2.55,
        f1.flow || 'Flow 01 • Student ➔ University',
        f1.title || 'Requirement: Size Profiles & Schedules',
        [
          stripHtml(f1.p1 || 'Students submit data to campus; receive schedule via email.'),
          stripHtml(f1.p2 || 'Google Forms without SKU validation caused duplicates and manual consolidation delays.')
        ],
        f1.status || 'Status: Delayed Information & Unstandardized Format',
        false
      );

      addNeoCard(s5, pptx, 6.78, 1.55, 5.75, 2.55,
        f2.flow || 'Flow 02 • Finance ➔ Day-Of Distribution',
        f2.title || 'Requirement: Tuition Paid Status (Eligibility)',
        [
          stripHtml(f2.p1 || 'Finance exports paid clearance status to booth staff.'),
          stripHtml(f2.p2 || 'Static local Excel exports fail to reflect day-of bank clearing updates in real time.')
        ],
        f2.status || 'Status: Severed Communication (Local Data Silos)',
        true
      );

      addNeoCard(s5, pptx, 0.8, 4.25, 5.75, 2.55,
        f3.flow || 'Flow 03 • Booth Desk ➔ Warehouse',
        f3.title || 'Requirement: Package Entitlement & Stock Ledger',
        [
          stripHtml(f3.p1 || 'Booth staff verifies entitlements and logs item release.'),
          stripHtml(f3.p2 || 'Paper logs reconciled only at night left open gaps for shrinkage and stock discrepancies.')
        ],
        f3.status || 'Status: Lagging Records (Paper-Based Handover)',
        false
      );

      addNeoCard(s5, pptx, 6.78, 4.25, 5.75, 2.55,
        f4.flow || 'Flow 04 • Procurement ➔ Factory',
        f4.title || 'Requirement: Aggregate Purchase Orders (PO)',
        [
          stripHtml(f4.p1 || 'Procurement dispatches garment production quantities to vendor.'),
          stripHtml(f4.p2 || 'Purchase orders based on crude estimates rather than verified student measurements.')
        ],
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
        { text: data.slide6?.thProblem || 'Problem Addressed', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10, fontFace: FONT_TITLE } },
        { text: data.slide6?.thSystem || 'Recommended System & Module', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10, fontFace: FONT_TITLE } },
        { text: data.slide6?.thFunc || 'System Function in Case Study', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10, fontFace: FONT_TITLE } },
        { text: data.slide6?.thBenefit || 'Measurable Value Delivered', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10, fontFace: FONT_TITLE } }
      ];

      const s6r1 = data.slide6?.row1 || {};
      const s6r2 = data.slide6?.row2 || {};
      const s6r3 = data.slide6?.row3 || {};
      const s6r4 = data.slide6?.row4 || {};

      const s6Rows = [
        s6Headers,
        [
          { text: s6r1.problem || 'Excel Crashes & Fragmented Student Records', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_CARD_BG } } },
          { text: (s6r1.system || 'ERP Master & Entitlement Engine') + '\n(' + (s6r1.tech || 'MySQL InnoDB') + ')', options: { color: C_DARK, bold: true, fontSize: 9.5, fill: { color: C_CARD_BG } } },
          { text: s6r1.func || 'Governs student master data, 4-segment SKU hierarchy, and automated academic entitlement matrix.', options: { color: C_DARK, fontSize: 9.5, fill: { color: C_CARD_BG } } },
          { text: s6r1.benefit || '100% immune to spreadsheet crashes; full ACID transaction integrity with unified single source of truth.', options: { color: C_DARK, fontSize: 9.5, fill: { color: C_CARD_BG } } }
        ],
        [
          { text: s6r2.problem || 'Dead-Stock & Delayed Schedule Broadcasts', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_RED_BG } } },
          { text: (s6r2.system || 'SCM Demand Planning Portal') + '\n(' + (s6r2.tech || 'Size Event Hub') + ')', options: { color: C_DARK, bold: true, fontSize: 9.5, fill: { color: C_RED_BG } } },
          { text: s6r2.func || 'Self-service size survey windows, program-filtered slot broadcasts, and automated Demand vs. Shortage calculus.', options: { color: C_DARK, fontSize: 9.5, fill: { color: C_RED_BG } } },
          { text: s6r2.benefit || 'Zero Dead-Stock: Factory purchase orders match 100% of verified student physical measurements.', options: { color: C_DARK, fontSize: 9.5, fill: { color: C_RED_BG } } }
        ],
        [
          { text: s6r3.problem || 'Queue Congestion & Double-Claim Risk', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_CARD_BG } } },
          { text: (s6r3.system || 'POS QR Verification Engine') + '\n(' + (s6r3.tech || 'BaconQrCode & Scanner') + ')', options: { color: C_DARK, bold: true, fontSize: 9.5, fill: { color: C_CARD_BG } } },
          { text: s6r3.func || 'Issues Level-H QR code passes and executes 6-tier atomic validation on scanner read.', options: { color: C_DARK, fontSize: 9.5, fill: { color: C_CARD_BG } } },
          { text: s6r3.benefit || 'Service time slashed to under 30 seconds per student with zero duplicate claim vulnerability.', options: { color: C_DARK, fontSize: 9.5, fill: { color: C_CARD_BG } } }
        ],
        [
          { text: s6r4.problem || 'Warehouse Shrinkage & Opaque COGS Valuation', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_RED_BG } } },
          { text: (s6r4.system || 'WMS & FIFO Costing Engine') + '\n(' + (s6r4.tech || 'StockBatch & Movement Ledger') + ')', options: { color: C_DARK, bold: true, fontSize: 9.5, fill: { color: C_RED_BG } } },
          { text: s6r4.func || 'Tracks oldest vendor intake batches (FIFO), ledger-backed stock deductions, and Stock Opname audits.', options: { color: C_DARK, fontSize: 9.5, fill: { color: C_RED_BG } } },
          { text: s6r4.benefit || 'Real-time FIFO inventory valuation, transparent audit trails, and elimination of physical discrepancies.', options: { color: C_DARK, fontSize: 9.5, fill: { color: C_RED_BG } } }
        ]
      ];

      // Table Neo shadow backing
      s6.addShape(getShape(pptx, 'roundRect'), {
        x: 0.8 + SHADOW_OFFSET,
        y: 1.55 + SHADOW_OFFSET,
        w: 11.733,
        h: 5.25,
        fill: { color: C_DARK },
        line: { color: C_DARK },
        rectRadius: 0.08
      });

      s6.addTable(s6Rows, {
        x: 0.8,
        y: 1.55,
        w: 11.733,
        colW: [2.5, 2.9, 4.1, 2.233],
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

      addNeoCard(s7, pptx, 0.8, 1.55, 2.78, 5.25,
        p1.step || 'Phase 1 • Upstream (Inbound)',
        p1.title || 'Inbound & FIFO Batch Registry',
        [
          stripHtml(p1.p1 || 'Logs bulk cargo shipments from apparel suppliers via StockReceive module.'),
          stripHtml(p1.p2 || 'Assigns sequential FIFO batch tracking IDs.'),
          stripHtml(p1.p3 || 'Posts inventory journal inflows (StockMovement IN) and fixes batch cost basis.')
        ],
        p1.output || 'Output: Tracked FIFO Batch Inflow',
        false
      );

      addNeoCard(s7, pptx, 3.78, 1.55, 2.78, 5.25,
        p2.step || 'Phase 2 • Demand (Planning)',
        p2.title || 'Eligibility Clearance & Size Profiling',
        [
          stripHtml(p2.p1 || 'Finance authorizes enrolled students in EligibilityRecord table.'),
          stripHtml(p2.p2 || 'Freshmen self-submit body size measurements through student portal.'),
          stripHtml(p2.p3 || 'Aggregates Demand vs. Shortage analytics to drive supplier procurement contracts.')
        ],
        p2.output || 'Output: Active QR Pass & Assigned Time Slot',
        false
      );

      addNeoCard(s7, pptx, 6.76, 1.55, 2.78, 5.25,
        p3.step || 'Phase 3 • Downstream (Outbound)',
        p3.title || 'POS QR & 6-Tier Atomic Validation',
        [
          stripHtml(p3.p1 || 'Booth staff scans student QR code using webcam-based scanner client.'),
          stripHtml(p3.p2 || 'Executes 6-tier atomic validation under pessimistic database row locking (lockForUpdate).'),
          stripHtml(p3.p3 || 'Automatically depletes oldest FIFO batches (deductStockFifo) and prints handover receipt.')
        ],
        p3.output || 'Output: Verified Zero-Defect Handover',
        true
      );

      addNeoCard(s7, pptx, 9.74, 1.55, 2.78, 5.25,
        p4.step || 'Phase 4 • Control (Audit)',
        p4.title || 'Stock Opname & Closed-Loop Feedback',
        [
          stripHtml(p4.p1 || 'Periodic physical stock audit with automated discrepancy variance calculation.'),
          stripHtml(p4.p2 || 'Generates shrinkage/surplus adjustment journal vouchers instantly.'),
          stripHtml(p4.p3 || 'Produces executive Gross Profit Margin (GPM) dashboards and dead-stock alerts for management.')
        ],
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

      addNeoCard(s8, pptx, 0.8, 1.55, 3.75, 5.25,
        pr.badge || '3 Implementation Priorities',
        pr.title || 'System Readiness Roadmap',
        [
          stripHtml(pr.p1 || 'Priority 1 (Master Data): Cleanse legacy records, deploy 5-segment SKU schema, import student cohorts.'),
          stripHtml(pr.p2 || 'Priority 2 (Portal Integration): Bridge live tuition clearance feeds (Eligibility), launch self-service size survey portal.'),
          stripHtml(pr.p3 || 'Priority 3 (Human Readiness): Conduct operational drills for booth staff on webcam scanners, size exchange SOPs.')
        ],
        pr.roadmap || 'Roadmap: 6-Week Turnkey Deployment',
        false
      );

      addNeoCard(s8, pptx, 4.78, 1.55, 7.75, 5.25,
        rk.badge || '3 Field Risks & Contingency SOPs',
        rk.title || 'Booth Operational Protocols',
        [
          stripHtml(rk.item1 || 'RISK 1 (Dead Student Phone Battery): Scanner client features instant fallback manual search by Student ID or Full Name.'),
          stripHtml(rk.item2 || 'RISK 2 (Rack Size Exhaustion): Partial Pickup feature dispenses available items and logs exchange requests in student_size_histories.'),
          stripHtml(rk.item3 || 'RISK 3 (Network Latency): Transactions guarded by database Pessimistic Row Locking (lockForUpdate), guaranteeing zero duplicate deductions.')
        ],
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

        // Badge pill
        const bW = w - 0.44;
        s9.addShape(getShape(pptx, 'roundRect'), {
          x: x + 0.22,
          y: y + 0.18,
          w: bW,
          h: 0.32,
          fill: { color: C_WHITE },
          line: { color: C_DARK, width: 1.5 },
          rectRadius: 0.08
        });
        s9.addText(badge.toUpperCase(), {
          x: x + 0.22,
          y: y + 0.18,
          w: bW,
          h: 0.32,
          fontFace: FONT_TITLE,
          fontSize: 8.5,
          bold: true,
          color: C_RED,
          align: 'center',
          valign: 'middle',
          margin: 0
        });

        // Huge Bold KPI Metric (Neo-Brutalist 36pt font)
        s9.addText(metricVal, {
          x: x + 0.22,
          y: y + 0.58,
          w: bW,
          h: 0.72,
          fontFace: FONT_TITLE,
          fontSize: 34,
          bold: true,
          color: C_RED,
          align: 'center',
          valign: 'middle',
          margin: 0
        });

        // Metric Title
        s9.addText(title, {
          x: x + 0.22,
          y: y + 1.34,
          w: bW,
          h: 0.38,
          fontFace: FONT_TITLE,
          fontSize: 12,
          bold: true,
          color: C_DARK,
          align: 'center',
          valign: 'top',
          margin: 0
        });

        // Divider
        s9.addShape(getShape(pptx, 'rect'), {
          x: x + 0.3,
          y: y + 1.76,
          w: w - 0.6,
          h: 0.015,
          fill: { color: 'CBD5E1' },
          line: { color: 'CBD5E1' }
        });

        // Bullet Points
        const textRuns = [];
        bullets.forEach((b, idx) => {
          textRuns.push({
            text: (b.startsWith('•') ? b : '•  ' + b) + (idx < bullets.length - 1 ? '\n\n' : '\n'),
            options: { fontFace: FONT_BODY, fontSize: 9.5, color: C_DARK }
          });
        });

        s9.addText(textRuns, {
          x: x + 0.22,
          y: y + 1.88,
          w: bW,
          h: h - 2.5,
          valign: 'top',
          margin: 0
        });

        // Footer Banner
        const footerY = y + h - 0.52;
        s9.addShape(getShape(pptx, 'rect'), {
          x: x + 0.2,
          y: footerY,
          w: w - 0.4,
          h: 0.015,
          fill: { color: isHighlight ? C_RED : 'CBD5E1' },
          line: { color: isHighlight ? C_RED : 'CBD5E1' }
        });
        s9.addText(footerText, {
          x: x + 0.22,
          y: footerY + 0.06,
          w: bW,
          h: 0.38,
          fontFace: FONT_TITLE,
          fontSize: 9.5,
          bold: true,
          color: isHighlight ? C_RED : C_DARK,
          valign: 'middle',
          margin: 0
        });
      }

      addMetricCard(0.8, 1.55, 3.75, 5.25,
        m1.badge || 'VALUE 01 • SERVICE EFFICIENCY',
        m1.value || '< 30s',
        m1.title || 'Per Student Pickup Time',
        [
          stripHtml(m1.p1 || 'Slashed booth turnaround time from 15–20 minutes down to under 30 seconds per student.'),
          stripHtml(m1.p2 || 'Instant QR scanning combined with automated 6-tier validation checks.'),
          stripHtml(m1.p3 || 'Completely eradicated chaotic, overcrowded campus queues during orientation week.')
        ],
        m1.impact || 'Impact: Swift & Professional Student Experience',
        true
      );

      addMetricCard(4.78, 1.55, 3.75, 5.25,
        m2.badge || 'VALUE 02 • INVENTORY ACCURACY',
        m2.value || 'Zero',
        m2.title || 'Dead-Stock Accumulation',
        [
          stripHtml(m2.p1 || 'Pre-enrollment size profiling prior to supplier manufacturing tenders.'),
          stripHtml(m2.p2 || 'Automated Demand vs. Shortage calculations align factory orders 100% with real student body sizes.'),
          stripHtml(m2.p3 || 'Eliminated stagnant piles of obsolete extreme sizes tying up warehouse space.')
        ],
        m2.impact || 'Impact: Maximum Working Capital Efficiency',
        false
      );

      addMetricCard(8.76, 1.55, 3.75, 5.25,
        m3.badge || 'VALUE 03 • FINANCIAL AUDITABILITY',
        m3.value || '100%',
        m3.title || 'Real-Time FIFO Valuation',
        [
          stripHtml(m3.p1 || 'Eliminated fragile, crash-prone Excel master spreadsheets permanently.'),
          stripHtml(m3.p2 || 'Every single inventory movement automatically posted to FIFO batch ledgers.'),
          stripHtml(m3.p3 || 'Real-time Cost of Goods Sold (COGS) and Gross Profit Margin (GPM) dashboards for university leadership.')
        ],
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
