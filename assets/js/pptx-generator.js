/**
 * HorizonU Uniform — Client-Side PPTX Generator
 * Generates an executive 16:9 PowerPoint presentation dynamically in the browser using PptxGenJS.
 * Data source: assets/locales/id.json via i18next & assets/js/images-data.js (base64).
 */

(function (window) {
  'use strict';

  const C_RED = '980517';
  const C_RED_BG = 'FEF2F2';
  const C_WHITE = 'FFFFFF';
  const C_CARD_BG = 'F8FAFC';
  const C_BORDER = 'E2E8F0';
  const C_TEXT_DARK = '0F172A';
  const C_TEXT_MUTED = '475569';
  const FONT_TITLE = 'Arial';
  const FONT_BODY = 'Calibri';

  function getActiveLang() {
    if (window.i18next && i18next.language) return i18next.language;
    const path = (window.location.pathname || '').toLowerCase();
    const hash = (window.location.hash || '').toLowerCase();
    if (path === '/en' || path.startsWith('/en/') || hash === '#en') return 'en';
    return 'id';
  }

  function getI18nData() {
    const lang = getActiveLang();
    if (lang === 'en' && window.I18N_EN_DATA) return window.I18N_EN_DATA;
    return window.I18N_ID_DATA || {};
  }

  function getSpeakerNote(slideNum) {
    const data = getI18nData();
    const s = data.speakerScripts && data.speakerScripts['slide' + slideNum];
    if (s && s.text) return s.text;
    if (window.i18next && i18next.exists('speakerScripts.slide' + slideNum + '.text')) {
      return i18next.t('speakerScripts.slide' + slideNum + '.text');
    }
    return '';
  }

  function applyHeader(slide, pptx, categoryTag, mainTitle, subtitle) {
    // Pure white background
    slide.background = { fill: C_WHITE };

    // Left accent vertical line
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: 0.42,
      w: 0.06,
      h: 0.78,
      fill: { color: C_RED },
      line: { color: C_RED }
    });

    // Category Tag
    slide.addText(categoryTag.toUpperCase(), {
      x: 0.95,
      y: 0.38,
      w: 11.5,
      h: 0.24,
      fontFace: FONT_TITLE,
      fontSize: 9.5,
      bold: true,
      color: C_RED,
      margin: 0
    });

    // Main Title
    slide.addText(mainTitle, {
      x: 0.95,
      y: 0.60,
      w: 11.5,
      h: 0.42,
      fontFace: FONT_TITLE,
      fontSize: 19,
      bold: true,
      color: C_TEXT_DARK,
      margin: 0
    });

    // Subtitle
    slide.addText(subtitle, {
      x: 0.95,
      y: 1.02,
      w: 11.5,
      h: 0.28,
      fontFace: FONT_BODY,
      fontSize: 11,
      color: C_TEXT_MUTED,
      margin: 0
    });

    // Subtle divider line
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: 1.36,
      w: 11.733,
      h: 0.015,
      fill: { color: C_BORDER },
      line: { color: C_BORDER }
    });
  }

  function addCard(slide, pptx, x, y, w, h, badge, title, bullets, note, isHighlight) {
    // Background card shape
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x,
      y: y,
      w: w,
      h: h,
      fill: { color: isHighlight ? C_RED_BG : C_CARD_BG },
      line: { color: isHighlight ? C_RED : C_BORDER, width: isHighlight ? 1.5 : 1 },
      rectRadius: 0.08
    });

    // Formatted text runs
    const textRuns = [
      { text: badge.toUpperCase() + '\n', options: { fontFace: FONT_TITLE, fontSize: 9.5, bold: true, color: C_RED } },
      { text: title + '\n\n', options: { fontFace: FONT_TITLE, fontSize: 12.5, bold: true, color: C_TEXT_DARK } }
    ];

    bullets.forEach((b, idx) => {
      textRuns.push({
        text: '•  ' + b + (idx < bullets.length - 1 ? '\n\n' : '\n'),
        options: { fontFace: FONT_BODY, fontSize: 10.5, color: C_TEXT_DARK }
      });
    });

    if (note) {
      textRuns.push({
        text: '\n➔  ' + note,
        options: { fontFace: FONT_BODY, fontSize: 10, bold: true, color: C_RED }
      });
    }

    slide.addText(textRuns, {
      x: x + 0.2,
      y: y + 0.18,
      w: w - 0.4,
      h: h - 0.36,
      valign: 'top',
      margin: 0
    });
  }

  async function generateAndDownloadPptx() {
    const btn = document.getElementById('pptx-download-btn');
    const originalHtml = btn ? btn.innerHTML : '';

    try {
      if (typeof PptxGenJS === 'undefined') {
        alert('Library PptxGenJS sedang dimuat atau CDN tidak tersedia. Mohon periksa koneksi internet Anda.');
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span class="hidden sm:inline">Membuat PPTX...</span>';
      }

      const pptx = new PptxGenJS();
      pptx.defineLayout({ name: 'HORIZON_WIDE_16_9', width: 13.333, height: 7.5 });
      pptx.layout = 'HORIZON_WIDE_16_9';

      const images = window.PPTX_IMAGES || {};
      const data = getI18nData();

      // ==========================================
      // SLIDE 1: LANDING PAGE OPENING HERO
      // ==========================================
      const s1 = pptx.addSlide();
      s1.background = { fill: C_WHITE };

      // Logo Horizon
      if (images.logo) {
        s1.addImage({ data: images.logo, x: 0.8, y: 0.36, w: 0.42, h: 0.42 });
      }

      // Header Department Label
      s1.addText('DEPARTEMEN KEUANGAN • UNIVERSITAS HORIZON INDONESIA', {
        x: 1.32,
        y: 0.44,
        w: 8.0,
        h: 0.35,
        fontFace: FONT_BODY,
        fontSize: 9.5,
        bold: true,
        color: '64748B',
        margin: 0
      });

      // Technospark Header Logo
      if (images.technospark) {
        s1.addImage({ data: images.technospark, x: 10.65, y: 0.24, w: 1.88, h: 0.52 });
      }

      // Header divider
      s1.addShape(pptx.ShapeType.rect, {
        x: 0.8,
        y: 0.88,
        w: 11.733,
        h: 0.02,
        fill: { color: C_BORDER },
        line: { color: C_BORDER }
      });

      // Hero banner text
      s1.addText([
        { text: 'SOLUSI RANTAI PASOK LOGISTIK KAMPUS TERINTEGRASI\n', options: { fontFace: FONT_TITLE, fontSize: 11, bold: true, color: C_RED } },
        { text: 'HORIZONU ', options: { fontFace: FONT_TITLE, fontSize: 36, bold: true, color: C_TEXT_DARK } },
        { text: 'UNIFORM\n\n', options: { fontFace: FONT_TITLE, fontSize: 36, bold: true, color: C_RED, underline: true } },
        { text: 'Transformasi digital operasional seragam mahasiswa: Menghubungkan Hulu (Vendor Pabrik), Gudang Kampus, dan Bagian Keuangan hingga Hilir (Mahasiswa) berbasis data presisi dan aturan inventaris FIFO.', options: { fontFace: FONT_BODY, fontSize: 12, color: '4B5563' } }
      ], {
        x: 0.8,
        y: 1.15,
        w: 11.733,
        h: 2.5,
        valign: 'top',
        margin: 0
      });

      // 2 Bento Cards
      addCard(s1, pptx, 0.8, 3.85, 5.75, 2.95, 'Objek & Komoditas Logistik', 'Pengadaan Perlengkapan Kampus', [
        'Pengadaan dan penyaluran tahunan ribuan paket perlengkapan mahasiswa baru: Jas Almamater, Kemeja Putih, Celana/Rok Bahan, Sepatu Lab & Dinas, serta Medical Kit.',
        'Penyaluran langsung secara terpusat tanpa perantara ritel komersial (Direct Campus SCM).'
      ], 'Model: Closed-Loop Campus SCM', false);

      addCard(s1, pptx, 6.78, 3.85, 5.75, 2.95, 'Tantangan Operasional Utama', 'Hambatan Spreadsheet & Posko', [
        'Spreadsheet Excel Induk 4.5 MB rawan crash dan lag saat ribuan mahasiswa mendaftar serentak.',
        'Waktu antrean posko fisik lambat (15–20 menit per mahasiswa) akibat verifikasi berkas manual.',
        'Tebakan rasio order pengadaan pabrik memicu dead-stock ekstrem dan modal kampus mengendap.'
      ], 'Dampak: Modal Mengendap & Risiko Klaim Ganda', true);

      s1.addNotes(getSpeakerNote(1));

      // ==========================================
      // SLIDE 2: OUR TEAM (NIRWANA DEVELOPMENT TEAM)
      // ==========================================
      const s2 = pptx.addSlide();
      applyHeader(s2, pptx, 'Profil Tim Pengembang', 'Our Team • Nirwana Development Team', 'Kolaborasi lintas disiplin dalam perancangan arsitektur, rekayasa kode, dan tata kelola platform HorizonU Uniform');

      const team = [
        { id: 'ferry', name: 'Ferry Noer Hendriawan', role: 'Frontend Developer', col: 0, row: 0, isPm: false },
        { id: 'fhazar', name: 'Fhazar Raffiful Aqyla', role: 'Project Manager', col: 1, row: 0, isPm: true },
        { id: 'hildan', name: 'Hildan Anugrah Tamadi Putra', role: 'Backend Developer', col: 2, row: 0, isPm: false },
        { id: 'fadel', name: 'Fadel Rahmadhan', role: 'Quality Assurance', col: 0, row: 1, isPm: false },
        { id: 'daffa', name: 'Daffa Nazriel Zaidan', role: 'UI/UX Designer', col: 1, row: 1, isPm: false },
        { id: 'acep', name: 'Acep Ugan Saputra', role: 'System Analyst', col: 2, row: 1, isPm: false }
      ];

      const colX = [0.8, 4.78, 8.76];
      const rowY = [1.55, 4.25];
      const cardW = 3.75;
      const cardH = 2.5;

      team.forEach(m => {
        const x = colX[m.col];
        const y = rowY[m.row];

        // Card bg
        s2.addShape(pptx.ShapeType.roundRect, {
          x, y, w: cardW, h: cardH,
          fill: { color: m.isPm ? C_RED_BG : C_CARD_BG },
          line: { color: m.isPm ? C_RED : C_BORDER, width: 1.5 },
          rectRadius: 0.08
        });

        // Photo
        if (images[m.id]) {
          s2.addImage({
            data: images[m.id],
            x: x + (cardW - 1.05) / 2,
            y: y + 0.15,
            w: 1.05,
            h: 1.05,
            round: true
          });
        }

        // Name pill
        const pillW = 3.2;
        const pillH = 0.32;
        s2.addShape(pptx.ShapeType.roundRect, {
          x: x + (cardW - pillW) / 2,
          y: y + 1.28,
          w: pillW,
          h: pillH,
          fill: { color: C_RED },
          line: { color: C_BORDER, width: 1 },
          rectRadius: 0.15
        });

        s2.addText(m.name.toUpperCase(), {
          x: x + (cardW - pillW) / 2,
          y: y + 1.28,
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

        // Role
        s2.addText(m.role, {
          x: x + 0.1,
          y: y + 1.68,
          w: cardW - 0.2,
          h: 0.45,
          fontFace: FONT_TITLE,
          fontSize: 11,
          bold: true,
          color: m.isPm ? C_RED : C_TEXT_DARK,
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
      applyHeader(s3, pptx, 'Struktur Rantai Pasok', 'Pemetaan Stakeholder & Aliran Fisik Barang', "Aliran terpadu dari pabrik vendor hingga serah terima mahasiswa dengan prinsip 'Data Mengunci Fisik'");

      addCard(s3, pptx, 0.8, 1.55, 2.78, 5.25, '01 • Supplier (Hulu)', 'Pabrik Garmen & Sepatu', [
        'Memproduksi paket seragam dan sepatu sesuai pesanan pengadaan kampus (PO).',
        'Menerapkan standarisasi kode SKU per kategori dan ukuran.',
        'Titik Barang: Pengiriman kontainer stok ke gudang kampus (Inbound Logistics).'
      ], 'Aliran: PO Agregat ➔ Fisik Masuk', false);

      addCard(s3, pptx, 3.78, 1.55, 2.78, 5.25, '02 • Gudang (Inbound)', 'Gudang Logistik Kampus', [
        'Penerimaan fisik barang (StockReceive) dan pemeriksaan mutu (QC).',
        'Pencatatan batch urutan FIFO (First-In, First-Out) dan penetapan harga beli unit.',
        'Titik Barang: Transfer stok batch tertua menuju posko distribusi loket.'
      ], 'Aliran: Inbound ➔ POS Loket', false);

      addCard(s3, pptx, 6.76, 1.55, 2.78, 5.25, '03 • Verifikator & Loket', 'Staf Keuangan & Posko', [
        'Keuangan: Otorisasi status pelunasan biaya kuliah mahasiswa (Eligibility).',
        'Staf Posko: Melayani meja pembagian fisik seragam di posko kampus.',
        'Titik Kritis: Validasi identitas QR Code dan pencocokan ukuran saat proses fitting.'
      ], 'Aliran: Data Lunas ➔ Serah Fisik', true);

      addCard(s3, pptx, 9.74, 1.55, 2.78, 5.25, '04 • Konsumen (Hilir)', 'Mahasiswa (Customer)', [
        'Konsumen akhir yang memiliki hak jatah barang (Entitlement) sesuai prodi.',
        'Mengisi profil ukuran mandiri di web dan menerima tiket jadwal pembagian.',
        'Titik Info: Menunjukkan tiket QR Code beresolusi tinggi (NIM murni) di loket.'
      ], 'Aliran: Profil ➔ Seragam Pas', false);

      s3.addNotes(getSpeakerNote(3));

      // ==========================================
      // SLIDE 4: PROBLEM ANALYSIS
      // ==========================================
      const s4 = pptx.addSlide();
      applyHeader(s4, pptx, 'Analisis Masalah Sistem Lama', 'Evaluasi Kendala Operasional & Dampak Sistemik', 'Analisis akar masalah pengelolaan manual terhadap pembengkakan biaya, waktu kerja, dan penurunan mutu layanan');

      const s4Headers = [
        { text: 'Masalah Utama (Gejala Lapangan)', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10.5, fontFace: FONT_TITLE } },
        { text: 'Akar Penyebab Masalah (Root Cause)', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10.5, fontFace: FONT_TITLE } },
        { text: 'Dampak terhadap Biaya, Waktu, Stok & Layanan', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10.5, fontFace: FONT_TITLE } }
      ];

      const s4Rows = [
        s4Headers,
        [
          { text: '1. Ketidakcocokan Ukuran & Penumpukan Dead-Stock', options: { color: C_RED, bold: true, fontSize: 10, fill: { color: C_CARD_BG } } },
          { text: 'Pemesanan pengadaan ke vendor pabrik hanya menggunakan tebakan rasio historis. Tidak ada sistem survey profil ukuran mandiri sebelum tender dibuka.', options: { color: C_TEXT_DARK, fontSize: 10, fill: { color: C_CARD_BG } } },
          { text: 'Dampak Stok & Biaya: Ukuran favorit (M/L) habis pada hari pertama pembagian, ukuran ekstrem (XS, 3XL) menumpuk bertahun-tahun. Modal kampus mengendap menjadi dead-stock.', options: { color: C_TEXT_DARK, fontSize: 10, fill: { color: C_CARD_BG } } }
        ],
        [
          { text: '2. File Excel Sering Crash & Pengumuman Lambat', options: { color: C_RED, bold: true, fontSize: 10, fill: { color: C_RED_BG } } },
          { text: 'Departemen Keuangan memakai satu file spreadsheet raksasa (~4.5 MB, 19 sheet) untuk ribuan data mahasiswa. Pengiriman jadwal disebarkan manual via surel.', options: { color: C_TEXT_DARK, fontSize: 10, fill: { color: C_RED_BG } } },
          { text: 'Dampak Waktu & Layanan: Aplikasi sering not responding atau data korup. Rekapitulasi memakan waktu berminggu-minggu dan info jadwal terlambat diterima mahasiswa.', options: { color: C_TEXT_DARK, fontSize: 10, fill: { color: C_RED_BG } } }
        ],
        [
          { text: '3. Bottleneck Loket Posko & Risiko Double-Claim', options: { color: C_RED, bold: true, fontSize: 10, fill: { color: C_CARD_BG } } },
          { text: 'Pengecekan lunas, pencocokan hak prodi, dan paraf bukti serah terima dilakukan manual dengan mencentang map formulir kertas fisik.', options: { color: C_TEXT_DARK, fontSize: 10, fill: { color: C_CARD_BG } } },
          { text: 'Dampak Waktu & Akurasi: Waktu pelayanan lambat (15–20 menit per orang), antrean ratusan meter, serta rawan klaim ganda (double-claim) di loket atau hari berbeda.', options: { color: C_TEXT_DARK, fontSize: 10, fill: { color: C_CARD_BG } } }
        ],
        [
          { text: '4. Susut Stok Liar & Valuasi HPP Buram', options: { color: C_RED, bold: true, fontSize: 10, fill: { color: C_RED_BG } } },
          { text: 'Penerimaan seragam dari vendor dengan harga berbeda tidak dicatat per batch FIFO dan tanpa kartu mutasi stok otomatis yang terikat ke transaksi loket.', options: { color: C_TEXT_DARK, fontSize: 10, fill: { color: C_RED_BG } } },
          { text: 'Dampak Biaya & Akuntansi: Selisih barang susut (shrinkage) tidak terlacak penanggungjawabnya. Valuasi HPP dan analisis Gross Profit Margin (GPM) terdistorsi.', options: { color: C_TEXT_DARK, fontSize: 10, fill: { color: C_RED_BG } } }
        ]
      ];

      s4.addTable(s4Rows, {
        x: 0.8,
        y: 1.55,
        w: 11.733,
        colW: [3.2, 4.2, 4.333],
        border: { color: C_BORDER, pt: 1 }
      });

      s4.addNotes(getSpeakerNote(4));

      // ==========================================
      // SLIDE 5: INFORMATION FLOW ANALYSIS
      // ==========================================
      const s5 = pptx.addSlide();
      applyHeader(s5, pptx, 'Analisis Aliran Informasi', 'Titik Kemacetan & Isolasi Data (As-Is State)', 'Hambatan komunikasi antarbagian yang memicu keterlambatan, inkonsistensi data, dan pembatalan layanan');

      addCard(s5, pptx, 0.8, 1.55, 5.75, 2.55, 'Aliran 01 • Mahasiswa ➔ Kampus', 'Kebutuhan: Profil Ukuran & Jadwal', [
        'Asal & Tujuan: Mahasiswa mengisi form ke kampus dan menerima jadwal pembagian via email.',
        'Titik Masalah: Google Form terpisah tanpa validasi SKU baku, memicu input ganda dan rekapitulasi data staf terlambat berminggu-minggu.'
      ], 'Kondisi: Informasi Terlambat & Format Liar', false);

      addCard(s5, pptx, 6.78, 1.55, 5.75, 2.55, 'Aliran 02 • Keuangan ➔ Posko Hari-H', 'Kebutuhan: Status Lunas (Eligibility)', [
        'Asal & Tujuan: Staf Keuangan mengekspor data lunas ke staf meja posko pembagian seragam.',
        'Titik Masalah: Data terisolasi di file Excel lokal staf. Saat ada pelunasan baru di bank pada hari-H, staf posko tidak terupdate sehingga maba tertolak.'
      ], 'Kondisi: Informasi Terputus (Silo Data Lokal)', true);

      addCard(s5, pptx, 0.8, 4.25, 5.75, 2.55, 'Aliran 03 • Meja Posko ➔ Gudang', 'Kebutuhan: Kuota Hak & Kartu Mutasi', [
        'Asal & Tujuan: Staf posko memverifikasi paket hak prodi dan mencatat mutasi seragam yang keluar.',
        'Titik Masalah: Penyerahan seragam dicatat di lembaran kertas. Pengurangan saldo stok gudang baru direkap malam hari, memicu risiko susut stok.'
      ], 'Kondisi: Informasi Terlambat (Paper-Based Tracking)', false);

      addCard(s5, pptx, 6.78, 4.25, 5.75, 2.55, 'Aliran 04 • Pengadaan ➔ Pabrik', 'Kebutuhan: Purchase Order Agregat', [
        'Asal & Tujuan: Pengadaan kampus mengirim rincian jumlah potong seragam dan sepatu ke pabrik.',
        'Titik Masalah: Purchase Order ke pabrik hanya estimasi kasar tanpa dasar profil data riil maba, memicu lead-time penukaran barang berbulan-bulan.'
      ], 'Kondisi: Informasi Tidak Akurat (Blind Ordering)', false);

      s5.addNotes(getSpeakerNote(5));

      // ==========================================
      // SLIDE 6: RECOMMENDED INFORMATION SYSTEMS
      // ==========================================
      const s6 = pptx.addSlide();
      applyHeader(s6, pptx, 'Rekomendasi Sistem Terpadu', 'Pemilihan Arsitektur Sistem Informasi (HorizonU Uniform Engine)', 'Integrasi empat pilar sistem: ERP, SCM, POS, dan WMS dalam satu platform web modern');

      const s6Headers = [
        { text: 'Masalah yang Diselesaikan', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10, fontFace: FONT_TITLE } },
        { text: 'Sistem & Modul Terpilih', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10, fontFace: FONT_TITLE } },
        { text: 'Fungsi Sistem dalam Kasus', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10, fontFace: FONT_TITLE } },
        { text: 'Manfaat Nyata Terukur', options: { fill: { color: C_RED }, color: C_WHITE, bold: true, fontSize: 10, fontFace: FONT_TITLE } }
      ];

      const s6Rows = [
        s6Headers,
        [
          { text: 'Excel Crash & Data Mahasiswa Terpecah', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_CARD_BG } } },
          { text: 'ERP Master & Entitlement Engine (Database MySQL InnoDB)', options: { color: C_TEXT_DARK, bold: true, fontSize: 9.5, fill: { color: C_CARD_BG } } },
          { text: 'Mengelola master data mahasiswa, struktur base code 4-segmen, impor massal via Maatwebsite, serta matriks kuota hak (Entitlement) otomatis per jenjang dan prodi.', options: { color: C_TEXT_DARK, fontSize: 9.5, fill: { color: C_CARD_BG } } },
          { text: '100% Bebas Crash Excel, data terisolasi ACID, single source of truth.', options: { color: C_TEXT_DARK, fontSize: 9.5, fill: { color: C_CARD_BG } } }
        ],
        [
          { text: 'Dead-Stock & Pengumuman Jadwal Lambat', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_RED_BG } } },
          { text: 'SCM Demand Planning Portal (Size Event & Announcement Hub)', options: { color: C_TEXT_DARK, bold: true, fontSize: 9.5, fill: { color: C_RED_BG } } },
          { text: 'Membuka event input profil ukuran mandiri mahasiswa (SizeChangeEvent), siaran jadwal terfilter per prodi, serta kalkulasi otomatis Demand vs Shortage untuk tender vendor.', options: { color: C_TEXT_DARK, fontSize: 9.5, fill: { color: C_RED_BG } } },
          { text: 'Zero Dead-Stock, pengadaan pabrik presisi 100% sesuai ukuran riil.', options: { color: C_TEXT_DARK, fontSize: 9.5, fill: { color: C_RED_BG } } }
        ],
        [
          { text: 'Bottleneck Antrean & Risiko Double-Claim', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_CARD_BG } } },
          { text: 'POS QR Verification Engine (BaconQrCode & HTML5 Scanner)', options: { color: C_TEXT_DARK, bold: true, fontSize: 9.5, fill: { color: C_CARD_BG } } },
          { text: 'Penerbitan QR Code NIM beresolusi tinggi (Level H) dan eksekusi 6-Lapis Validasi Atomik via kamera webcam loket (Lunas, Sesi, Prodi, Gender, Sisa Hak, Stok Rak).', options: { color: C_TEXT_DARK, fontSize: 9.5, fill: { color: C_CARD_BG } } },
          { text: 'Waktu layan < 30 detik/mhs, nol risiko penyerahan ganda.', options: { color: C_TEXT_DARK, fontSize: 9.5, fill: { color: C_CARD_BG } } }
        ],
        [
          { text: 'Susut Stok Gudang & Valuasi HPP Buram', options: { color: C_RED, bold: true, fontSize: 9.5, fill: { color: C_RED_BG } } },
          { text: 'WMS & FIFO Costing Engine (StockBatch & Movement Ledger)', options: { color: C_TEXT_DARK, bold: true, fontSize: 9.5, fill: { color: C_RED_BG } } },
          { text: 'Melacak batch penerimaan vendor tertua (FIFO), pemotongan stok berkartu audit, rekonsiliasi Stock Opname fisik via variance kalkulator, serta analitik margin laba kotor.', options: { color: C_TEXT_DARK, fontSize: 9.5, fill: { color: C_RED_BG } } },
          { text: 'Valuasi HPP FIFO real-time, audit transparan, cegah selisih fisik.', options: { color: C_TEXT_DARK, fontSize: 9.5, fill: { color: C_RED_BG } } }
        ]
      ];

      s6.addTable(s6Rows, {
        x: 0.8,
        y: 1.55,
        w: 11.733,
        colW: [2.5, 2.9, 4.1, 2.233],
        border: { color: C_BORDER, pt: 1 }
      });

      s6.addNotes(getSpeakerNote(6));

      // ==========================================
      // SLIDE 7: PROPOSED SOLUTION DESIGN
      // ==========================================
      const s7 = pptx.addSlide();
      applyHeader(s7, pptx, 'Desain Arsitektur Solusi', 'Aliran 4-Fase Closed-Loop Supply Chain Engine', 'Konektivitas sistem end-to-end, pemrosesan transaksi atomik, dan closed-loop data feedback');

      addCard(s7, pptx, 0.8, 1.55, 2.78, 5.25, 'Fase 1 • Hulu (Inbound)', 'Inbound & Batch FIFO', [
        'Pencatatan barang dari vendor garmen pada modul StockReceive.',
        'Sistem menerbitkan ID batch terurut (FIFO Queue Sequence).',
        'Pencatatan otomatis jurnal mutasi masuk (StockMovement IN) dan penetapan unit HPP batch.'
      ], 'Output: Batch FIFO Terdaftar', false);

      addCard(s7, pptx, 3.78, 1.55, 2.78, 5.25, 'Fase 2 • Demand (Planning)', 'Eligibility & Profiling', [
        'Keuangan mengaktifkan data mahasiswa lunas di EligibilityRecord.',
        'Mahasiswa input profil ukuran badan mandiri di event portal.',
        'Sistem menghitung Demand vs Shortage untuk acuan belanja pengadaan vendor.'
      ], 'Output: QR Code & Jadwal Aktif', false);

      addCard(s7, pptx, 6.76, 1.55, 2.78, 5.25, 'Fase 3 • Hilir (Outbound)', 'POS QR & 6-Lapis Validasi', [
        'Staf memindai QR NIM mahasiswa di loket posko kampus.',
        'Eksekusi 6-Lapis Validasi Atomik via pessimistic lock (lockForUpdate).',
        'Pemotongan batch tertua otomatis (deductStockFifo) dan cetak tiket serah terima fisik.'
      ], 'Output: Seragam Diterima Pas', true);

      addCard(s7, pptx, 9.74, 1.55, 2.78, 5.25, 'Fase 4 • Kontrol (Audit)', 'Opname & Closed-Loop', [
        'Stock Opname fisik berkala menghitung selisih variance otomatis.',
        'Penerbitan jurnal penyesuaian susut/surplus stok gudang.',
        'Generate analitik Gross Profit Margin (GPM) dan laporan sisa stok untuk pimpinan.'
      ], 'Output: Feedback Siklus Baru', false);

      s7.addNotes(getSpeakerNote(7));

      // ==========================================
      // SLIDE 8: IMPLEMENTATION AND RISKS
      // ==========================================
      const s8 = pptx.addSlide();
      applyHeader(s8, pptx, 'Rencana Penerapan & Mitigasi', 'Prioritas Implementasi & Manajemen Risiko Lapangan', 'Tahapan kesiapan operasional serta prosedur kontingensi darurat saat hari-H distribusi');

      addCard(s8, pptx, 0.8, 1.55, 3.75, 5.25, '3 Prioritas Implementasi', 'Tahapan Kesiapan Sistem', [
        'Prioritas 1 (Master Data): Pembersihan data lama, pembuatan skema SKU 5-segmen, impor data mahasiswa, dan konfigurasi hak seragam prodi.',
        'Prioritas 2 (Integrasi Portal): Integrasi status lunas Keuangan (Eligibility), pembukaan jendela waktu pengisian profil ukuran maba, dan rilis jadwal.',
        'Prioritas 3 (Kesiapan SDM): Pelatihan teknis staf posko memakai scanner webcam, prosedur fitting ukuran, dan drill skenario darurat.'
      ], 'Roadmap: 6 Minggu Implementasi Penuh', false);

      addCard(s8, pptx, 4.78, 1.55, 7.75, 5.25, '3 Risiko Lapangan & Cara Mitigasi', 'SOP Kontingensi Hari-H Posko', [
        'RISIKO 1 (Baterai HP Mati / QR Rusak): Fallback Search manual via NIM atau Nama langsung memanggil profil hak seketika.',
        'RISIKO 2 (Ukuran Rak Habis / Fitting Beda): Fitur Partial Pickup serahkan barang yang tersedia tanpa menghanguskan sisa hak.',
        'RISIKO 3 (Jaringan Internet Kampus Lambat): Pessimistic Row Locking (lockForUpdate) dan idempotensi menjamin nol pemotongan ganda.'
      ], 'Toleransi Kesalahan: Resiliensi Operasional Tinggi', true);

      s8.addNotes(getSpeakerNote(8));

      // ==========================================
      // SLIDE 9: CONCLUSION AND BENEFITS
      // ==========================================
      const s9 = pptx.addSlide();
      applyHeader(s9, pptx, 'Kesimpulan & Hasil Terukur', 'Dampak Strategis & Manfaat Nyata Implementasi', 'Transformasi operasional Departemen Keuangan Universitas Horizon Indonesia pasca-digitalisasi');

      addCard(s9, pptx, 0.8, 1.55, 3.75, 5.25, 'Manfaat 01 • Efisiensi Waktu', '< 30 Detik per Mahasiswa', [
        'Memangkas waktu layanan loket dari yang sebelumnya 15–20 menit per mahasiswa menjadi di bawah 30 detik.',
        'Pemindaian QR Code instan berbasis NIM dan eksekusi 6-lapis validasi otomatis.',
        'Mengeliminasi antrean panjang yang berdesakan di posko kampus setiap awal tahun ajaran baru.'
      ], 'Dampak: Pelayanan Mahasiswa Cepat & Nyaman', true);

      addCard(s9, pptx, 4.78, 1.55, 3.75, 5.25, 'Manfaat 02 • Akurasi Inventaris', 'Zero (0) Dead-Stock', [
        'Profiling ukuran mandiri oleh mahasiswa sebelum tender vendor garmen dibuka.',
        'Kalkulasi Demand vs Shortage otomatis memastikan pesanan pabrik selaras 100% dengan kebutuhan tubuh riil mahasiswa.',
        'Tidak ada lagi seragam berukuran ekstrem yang mengendap bertahun-tahun di gudang.'
      ], 'Dampak: Optimalisasi Modal Kerja Kampus', false);

      addCard(s9, pptx, 8.76, 1.55, 3.75, 5.25, 'Manfaat 03 • Akuntabilitas Biaya', '100% Valuasi FIFO Real-Time', [
        'Mengeliminasi ketergantungan pada spreadsheet Excel raksasa yang rawan rusak atau korup.',
        'Seluruh pergerakan stok dicatat otomatis ke kartu mutasi persediaan berbasis urutan batch FIFO.',
        'Laporan Harga Pokok Penjualan (HPP) dan Gross Profit Margin (GPM) tersedia secara transparan bagi pimpinan.'
      ], 'Dampak: Audit Trail Keuangan Bebas Selisih', false);

      s9.addNotes(getSpeakerNote(9));

      // ==========================================
      // WRITE FILE & TRIGGER DOWNLOAD
      // ==========================================
      await pptx.writeFile({ fileName: 'HorizonU_Uniform_SCM_Presentasi_Technospark.pptx' });

    } catch (err) {
      console.error('Gagal membuat PPTX:', err);
      alert('Terjadi kesalahan saat membuat file PPTX: ' + err.message);
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
