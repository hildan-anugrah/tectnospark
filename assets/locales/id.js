window.I18N_ID_DATA = {
  "common": {
    "technosparkBadge": "Technospark 2026",
    "appTitle": "HorizonU Uniform",
    "appSubtitle": "Departemen Keuangan Horizon University",
    "prev": "Sebelumnya",
    "next": "Selanjutnya",
    "prompter": "Naskah (T)",
    "downloadPptx": "Unduh PPTX",
    "fullscreen": "Fullscreen (F)",
    "prompterHeader": "Naskah Baca Presenter (Teleprompter Mode) — Baca Langsung di Sini",
    "targetDurationLabel": "Target Durasi:",
    "docTitle": "HorizonU Uniform — Presentasi Technospark"
  },
  "slide1": {
    "headerDept": "Departemen Keuangan • Universitas Horizon Indonesia",
    "eyebrow": "Solusi Rantai Pasok Logistik Kampus Terintegrasi",
    "titlePrefix": "HORIZONU ",
    "titleAccent": "UNIFORM",
    "desc": "Transformasi digital operasional seragam mahasiswa: Menghubungkan Hulu (Vendor Pabrik), Gudang Kampus, dan Bagian Keuangan hingga Hilir (Mahasiswa) berbasis data presisi dan aturan inventaris FIFO.",
    "box1": {
      "title": "Objek & Komoditas Logistik",
      "desc": "Pengadaan dan penyaluran tahunan ribuan paket perlengkapan mahasiswa baru: <strong>Almamater, Kemeja Putih, Celana, Sepatu</strong>, serta <strong>Medical Kit</strong> tanpa perantara ritel komersial."
    },
    "box2": {
      "title": "Tantangan Operasional Utama",
      "desc": "<strong>Spreadsheet Excel 4.5 MB rawan crash</strong> saat ribuan mahasiswa mendaftar serentak, waktu antrean posko fisik <strong>15–20 menit per mahasiswa</strong>, dan tebakan rasio order ke pabrik memicu <strong>dead-stock</strong> modal mengendap."
    },
    "title": "HORIZONU <span class=\"text-horizon-700 underline decoration-4 underline-offset-4\">UNIFORM</span>"
  },
  "slide2": {
    "badge": "Profil Tim Pengembang",
    "title": "Our Team • Nirwana Development Team",
    "subtitle": "Kolaborasi lintas disiplin dalam perancangan arsitektur, rekayasa kode, dan tata kelola platform HorizonU Uniform",
    "badgeCount": "6 Core Engineers",
    "members": {
      "ferry": {
        "name": "Ferry Noer Hendriawan",
        "role": "Frontend Developer"
      },
      "fhazar": {
        "name": "Fhazar Raffiful Aqyla",
        "role": "Project Manager"
      },
      "hildan": {
        "name": "Hildan Anugrah Tamadi Putra",
        "role": "Backend Developer"
      },
      "fadel": {
        "name": "Fadel Rahmadhan",
        "role": "Quality Assurance"
      },
      "daffa": {
        "name": "Daffa Nazriel Zaidan",
        "role": "UI/UX Designer"
      },
      "acep": {
        "name": "Acep Ugan Saputra",
        "role": "System Analyst"
      }
    }
  },
  "slide3": {
    "badge": "Struktur Rantai Pasok",
    "title": "Pemetaan Stakeholder & Aliran Fisik Barang",
    "subtitle": "Aliran terpadu dari pabrik vendor hingga serah terima mahasiswa dengan prinsip \"Data Mengunci Fisik\"",
    "col1": {
      "step": "01 • Supplier (Hulu)",
      "title": "Pabrik Garmen & Sepatu",
      "p1": "Memproduksi paket seragam dan sepatu sesuai pesanan pengadaan kampus (PO).",
      "p2": "Menerapkan standarisasi kode varian SKU per kategori dan ukuran.",
      "p3": "<strong>Titik Barang:</strong> Pengiriman kardus stok ke gudang kampus (Inbound Logistics).",
      "flow": "Aliran: PO Agregat ➔ Fisik Masuk"
    },
    "col2": {
      "step": "02 • Gudang (Inbound)",
      "title": "Gudang Logistik Kampus",
      "p1": "Penerimaan fisik barang (StockReceive) dan pemeriksaan mutu (QC).",
      "p2": "Pencatatan batch urutan FIFO (First-In, First-Out) dan nilai HPP unit.",
      "p3": "<strong>Titik Barang:</strong> Transfer stok batch tertua menuju posko distribusi loket.",
      "flow": "Aliran: Inbound ➔ POS Loket"
    },
    "col3": {
      "step": "03 • Verifikator & Loket",
      "title": "Staf Keuangan & Posko",
      "p1": "<strong>Keuangan:</strong> Otorisasi status pelunasan biaya kuliah mahasiswa (Eligibility).",
      "p2": "<strong>Staf Posko:</strong> Melayani meja pembagian fisik seragam di posko kampus.",
      "p3": "<strong>Titik Kritis:</strong> Validasi identitas QR Code dan pencocokan ukuran saat fitting.",
      "flow": "Aliran: Data Lunas ➔ Serah Fisik"
    },
    "col4": {
      "step": "04 • Konsumen (Hilir)",
      "title": "Mahasiswa (Customer)",
      "p1": "Konsumen akhir yang memiliki hak jatah barang (Entitlement) sesuai prodi.",
      "p2": "Mengisi profil ukuran mandiri di web dan menerima tiket jadwal pembagian.",
      "p3": "<strong>Titik Info:</strong> Menunjukkan tiket QR Code beresolusi tinggi (NIM murni) di loket.",
      "flow": "Aliran: Profil ➔ Seragam Pas"
    }
  },
  "slide4": {
    "badge": "Analisis Masalah Sistem Lama",
    "title": "Evaluasi Kendala Operasional & Dampak Sistemik",
    "subtitle": "Analisis akar masalah pengelolaan manual terhadap pembengkakan biaya, waktu kerja, dan penurunan mutu layanan",
    "thProblem": "Masalah Utama (Gejala Lapangan)",
    "thCause": "Akar Penyebab Masalah (Root Cause)",
    "thImpact": "Dampak terhadap Biaya, Waktu, Stok & Layanan",
    "row1": {
      "problem": "1. Ketidakcocokan Ukuran & Penumpukan Dead-Stock",
      "cause": "Pemesanan pengadaan ke vendor pabrik hanya menggunakan tebakan rasio historis. Tidak ada sistem survey profil ukuran mandiri sebelum tender dibuka.",
      "impact": "<strong>Dampak Stok & Biaya:</strong> Ukuran favorit (M/L) habis pada hari pertama pembagian, ukuran ekstrem (XS, 3XL) menumpuk bertahun-tahun. Modal kampus mengendap menjadi dead-stock."
    },
    "row2": {
      "problem": "2. File Excel Sering Crash & Pengumuman Lambat",
      "cause": "Departemen Keuangan memakai satu file spreadsheet raksasa (~4.5 MB, 19 sheet) untuk ribuan data mahasiswa. Pengiriman jadwal disebarkan manual via surel.",
      "impact": "<strong>Dampak Waktu & Layanan:</strong> Aplikasi sering not responding atau data korup. Rekapitulasi memakan waktu berminggu-minggu dan info jadwal terlambat diterima mahasiswa."
    },
    "row3": {
      "problem": "3. Bottleneck Loket Posko & Risiko Double-Claim",
      "cause": "Pengecekan lunas, pencocokan hak prodi, dan paraf bukti serah terima dilakukan manual dengan mencentang map formulir kertas fisik.",
      "impact": "<strong>Dampak Waktu & Akurasi:</strong> Waktu pelayanan lambat (15–20 menit per orang), antrean ratusan meter, serta rawan klaim ganda (double-claim) di loket atau hari berbeda."
    },
    "row4": {
      "problem": "4. Susut Stok Liar & Valuasi HPP Buram",
      "cause": "Penerimaan seragam dari vendor dengan harga berbeda tidak dicatat per batch FIFO dan tanpa kartu mutasi stok otomatis yang terikat ke transaksi loket.",
      "impact": "<strong>Dampak Biaya & Akuntansi:</strong> Selisih barang susut (shrinkage) tidak terlacak penanggungjawabnya. Valuasi HPP dan analisis Gross Profit Margin (GPM) terdistorsi."
    }
  },
  "slide5": {
    "badge": "Analisis Aliran Informasi",
    "title": "Titik Kemacetan & Isolasi Data (As-Is State)",
    "subtitle": "Hambatan komunikasi antarbagian yang memicu keterlambatan, inkonsistensi data, dan pembatalan layanan",
    "card1": {
      "flow": "Aliran 01 • Mahasiswa ➔ Kampus",
      "title": "Kebutuhan: Profil Ukuran & Jadwal",
      "p1": "<strong>Asal & Tujuan:</strong> Mahasiswa mengisi formulir ke kampus dan menerima jadwal pembagian via email.",
      "p2": "<strong>Titik Masalah:</strong> Google Form terpisah tanpa validasi SKU baku, memicu pengisian ganda dan rekapitulasi data staf terlambat berminggu-minggu.",
      "status": "Kondisi: Informasi Terlambat & Format Liar"
    },
    "card2": {
      "flow": "Aliran 02 • Keuangan ➔ Posko Hari-H",
      "title": "Kebutuhan: Status Lunas (Eligibility)",
      "p1": "<strong>Asal & Tujuan:</strong> Staf Keuangan mengekspor data pelunasan ke staf meja posko pembagian seragam.",
      "p2": "<strong>Titik Masalah:</strong> Data terisolasi di file Excel lokal staf. Saat ada pelunasan baru di bank pada hari-H, staf posko tidak terupdate sehingga maba tertolak.",
      "status": "Kondisi: Informasi Terputus (Silo Data Lokal)"
    },
    "card3": {
      "flow": "Aliran 03 • Meja Posko ➔ Gudang",
      "title": "Kebutuhan: Kuota Hak & Kartu Mutasi",
      "p1": "<strong>Asal & Tujuan:</strong> Staf posko memverifikasi paket hak prodi dan mencatat mutasi seragam yang keluar.",
      "p2": "<strong>Titik Masalah:</strong> Penyerahan seragam dicatat di lembaran kertas. Pengurangan saldo stok gudang baru direkap malam hari, memicu risiko susut stok.",
      "status": "Kondisi: Informasi Terlambat (Paper-Based Tracking)"
    },
    "card4": {
      "flow": "Aliran 04 • Pengadaan ➔ Pabrik",
      "title": "Kebutuhan: Purchase Order Agregat",
      "p1": "<strong>Asal & Tujuan:</strong> Pengadaan kampus mengirim rincian jumlah potong seragam dan sepatu ke pabrik.",
      "p2": "<strong>Titik Masalah:</strong> Purchase Order ke pabrik hanya estimasi kasar tanpa dasar profil data riil maba, memicu lead-time penukaran barang berbulan-bulan.",
      "status": "Kondisi: Informasi Tidak Akurat (Blind Ordering)"
    }
  },
  "slide6": {
    "badge": "Rekomendasi Sistem Terpadu",
    "title": "Pemilihan Arsitektur Sistem Informasi (HorizonU Uniform Engine)",
    "subtitle": "Integrasi empat pilar sistem: ERP, SCM, POS, dan WMS dalam satu platform web modern",
    "thProblem": "Masalah yang Diselesaikan",
    "thSystem": "Sistem & Modul Terpilih",
    "thFunc": "Fungsi Sistem dalam Kasus",
    "thBenefit": "Manfaat Terukur",
    "row1": {
      "problem": "Excel Crash & Data Mahasiswa Terpecah",
      "system": "ERP Master & Entitlement Engine",
      "tech": "MySQL InnoDB Relational",
      "func": "Mengelola master data mahasiswa, struktur base code 4-segmen, impor massal via Maatwebsite, serta matriks kuota hak (Entitlement) otomatis per jenjang dan prodi.",
      "benefit": "<strong>100% Bebas Crash Excel</strong>, data terisolasi ACID, single source of truth."
    },
    "row2": {
      "problem": "Dead-Stock & Pengumuman Jadwal Lambat",
      "system": "SCM Demand Planning Portal",
      "tech": "Size Event & Schedule Hub",
      "func": "Membuka event input profil ukuran mandiri mahasiswa (SizeChangeEvent), siaran jadwal terfilter per prodi, serta kalkulasi otomatis Demand vs Shortage untuk tender vendor.",
      "benefit": "<strong>Zero Dead-Stock</strong>, pengadaan pabrik presisi 100% sesuai ukuran riil."
    },
    "row3": {
      "problem": "Bottleneck Antrean & Risiko Double-Claim",
      "system": "POS QR Verification Engine",
      "tech": "BaconQrCode & HTML5 Scanner",
      "func": "Penerbitan QR Code NIM beresolusi tinggi (Level H) dan eksekusi 6-Lapis Validasi Atomik via kamera webcam loket (Lunas, Sesi, Prodi, Gender, Sisa Hak, Stok Rak).",
      "benefit": "<strong>Waktu layan &lt; 30 detik/mhs</strong>, nol risiko penyerahan ganda."
    },
    "row4": {
      "problem": "Susut Stok Gudang & Valuasi HPP Buram",
      "system": "WMS & FIFO Costing Engine",
      "tech": "StockBatch & Movement Ledger",
      "func": "Melacak batch penerimaan vendor tertua (FIFO), pemotongan stok berkartu audit, rekonsiliasi Stock Opname fisik via variance kalkulator, serta analitik margin laba kotor.",
      "benefit": "<strong>Valuasi HPP FIFO real-time</strong>, audit transparan, cegah selisih fisik."
    }
  },
  "slide7": {
    "badge": "Desain Arsitektur Solusi",
    "title": "Aliran 4-Fase Closed-Loop Supply Chain Engine",
    "subtitle": "Konektivitas sistem end-to-end, pemrosesan transaksi atomik, dan closed-loop data feedback",
    "phase1": {
      "step": "Fase 1 • Hulu (Inbound)",
      "title": "Inbound & Batch FIFO",
      "p1": "• Pencatatan barang dari vendor garmen pada modul StockReceive.",
      "p2": "• Sistem menerbitkan ID batch terurut (FIFO Queue Sequence).",
      "p3": "• Pencatatan otomatis jurnal mutasi masuk (StockMovement IN) dan penetapan unit HPP batch.",
      "output": "Output: Batch FIFO Terdaftar"
    },
    "phase2": {
      "step": "Fase 2 • Demand (Planning)",
      "title": "Eligibility & Profiling",
      "p1": "• Keuangan mengaktifkan data mahasiswa lunas di EligibilityRecord.",
      "p2": "• Mahasiswa input profil ukuran badan mandiri di event portal.",
      "p3": "• Sistem menghitung Demand vs Shortage untuk acuan belanja pengadaan vendor.",
      "output": "Output: QR Code & Jadwal Aktif"
    },
    "phase3": {
      "step": "Fase 3 • Hilir (Outbound)",
      "title": "POS QR & 6-Lapis Validasi",
      "p1": "• Staf memindai QR NIM mahasiswa di loket posko kampus.",
      "p2": "• Eksekusi 6-Lapis Validasi Atomik via pessimistic lock (lockForUpdate).",
      "p3": "• Pemotongan batch tertua otomatis (deductStockFifo) dan cetak tiket serah terima fisik.",
      "output": "Output: Seragam Diterima Pas"
    },
    "phase4": {
      "step": "Fase 4 • Kontrol (Audit)",
      "title": "Opname & Closed-Loop",
      "p1": "• Stock Opname fisik berkala menghitung selisih variance otomatis.",
      "p2": "• Penerbitan jurnal penyesuaian susut/surplus stok gudang.",
      "p3": "• Generate analitik Gross Profit Margin (GPM) dan laporan sisa stok untuk pimpinan.",
      "output": "Output: Feedback Siklus Baru"
    }
  },
  "slide8": {
    "badge": "Rencana Penerapan & Mitigasi",
    "title": "Prioritas Implementasi & Manajemen Risiko Lapangan",
    "subtitle": "Tahapan kesiapan operasional serta prosedur kontingensi darurat saat hari-H distribusi",
    "priorities": {
      "badge": "3 Prioritas Implementasi",
      "title": "Tahapan Kesiapan Sistem",
      "p1": "• <strong>Prioritas 1 (Master Data):</strong> Pembersihan data lama, pembuatan skema SKU 5-segmen, impor data mahasiswa, dan konfigurasi hak seragam prodi.",
      "p2": "• <strong>Prioritas 2 (Integrasi Portal):</strong> Integrasi status lunas Keuangan (Eligibility), pembukaan jendela waktu pengisian profil ukuran maba, dan rilis jadwal.",
      "p3": "• <strong>Prioritas 3 (Kesiapan SDM):</strong> Pelatihan teknis staf posko memakai scanner webcam, prosedur fitting ukuran, dan drill skenario darurat.",
      "roadmap": "Roadmap: 6 Minggu Implementasi Penuh"
    },
    "risks": {
      "badge": "3 Risiko Lapangan & Cara Mitigasi",
      "title": "SOP Kontingensi Hari-H Posko",
      "r1Title": "RISIKO 1: Baterai HP Mahasiswa Mati / QR Rusak",
      "r1Mitigation": "<em>Mitigasi HorizonU Uniform:</em> Bilah scanner staf posko dilengkapi fitur Fallback Search manual via NIM atau Nama yang langsung memanggil profil hak seketika.",
      "r2Title": "RISIKO 2: Ukuran Rak Habis / Fitting Beda",
      "r2Mitigation": "<em>Mitigasi HorizonU Uniform:</em> Fitur Partial Pickup memungkinkan staf menyerahkan barang yang tersedia (sisa hak tidak hangus) dan mencatat tukar ukuran di <code>student_size_histories</code>.",
      "r3Title": "RISIKO 3: Jaringan Internet Kampus Lambat / Dobel Klik",
      "r3Mitigation": "<em>Mitigasi HorizonU Uniform:</em> Transaksi dilindungi Pessimistic Row Locking (<code>lockForUpdate</code>) dan proteksi idempotensi, menjamin nol pemotongan stok ganda.",
      "tolerance": "Toleransi Kesalahan: Resiliensi Operasional Tinggi",
      "item1": "• <strong>RISIKO 1: Baterai HP Mahasiswa Mati / QR Rusak</strong><br><span class=\"text-slate-600\"><em>Mitigasi HorizonU Uniform:</em> Bilah scanner staf posko dilengkapi fitur Fallback Search manual via NIM atau Nama yang langsung memanggil profil hak seketika.</span>",
      "item2": "• <strong>RISIKO 2: Ukuran Rak Habis / Fitting Beda</strong><br><span class=\"text-slate-600\"><em>Mitigasi HorizonU Uniform:</em> Fitur Partial Pickup memungkinkan staf menyerahkan barang yang tersedia (sisa hak tidak hangus) dan mencatat tukar ukuran di <code>student_size_histories</code>.</span>",
      "item3": "• <strong>RISIKO 3: Jaringan Internet Kampus Lambat / Dobel Klik</strong><br><span class=\"text-slate-600\"><em>Mitigasi HorizonU Uniform:</em> Transaksi dilindungi Pessimistic Row Locking (<code>lockForUpdate</code>) dan proteksi idempotensi, menjamin nol pemotongan stok ganda.</span>"
    }
  },
  "slide9": {
    "badge": "Kesimpulan & Hasil Terukur",
    "title": "Dampak Strategis & Manfaat Nyata Implementasi",
    "subtitle": "Transformasi operasional Departemen Keuangan Universitas Horizon Indonesia pasca-digitalisasi",
    "m1": {
      "badge": "MANFAAT 01 • EFISIENSI WAKTU",
      "value": "< 30s",
      "title": "Waktu Layan per Mahasiswa",
      "p1": "• Memangkas waktu layanan loket dari 15–20 menit menjadi di bawah 30 detik.",
      "p2": "• Pemindaian QR Code instan berbasis NIM dan validasi 6-lapis otomatis.",
      "p3": "• Mengeliminasi antrean panjang berdesakan di posko kampus.",
      "impact": "Dampak: Pelayanan Mahasiswa Cepat & Nyaman"
    },
    "m2": {
      "badge": "MANFAAT 02 • AKURASI INVENTARIS",
      "value": "0",
      "title": "Dead-Stock Seragam & Sepatu",
      "p1": "• Profiling ukuran mandiri maba sebelum tender vendor garmen dibuka.",
      "p2": "• Kalkulasi Demand vs Shortage otomatis memastikan pesanan selaras 100%.",
      "p3": "• Tidak ada lagi seragam ukuran ekstrem yang mengendap bertahun-tahun.",
      "impact": "Dampak: Optimalisasi Modal Kerja Kampus"
    },
    "m3": {
      "badge": "MANFAAT 03 • AKUNTABILITAS BIAYA",
      "value": "100%",
      "title": "Valuasi FIFO Real-Time",
      "p1": "• Mengeliminasi ketergantungan pada spreadsheet Excel yang rawan rusak.",
      "p2": "• Pergerakan stok dicatat otomatis ke kartu mutasi berurutan batch FIFO.",
      "p3": "• Laporan Harga Pokok Penjualan (HPP) dan Gross Profit Margin (GPM) transparan.",
      "impact": "Dampak: Audit Trail Keuangan Bebas Selisih"
    }
  },
  "speakerScripts": {
    "slide1": {
      "targetTime": "01:10 Menit",
      "html": "<p class=\"mb-3\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">PEMBUKAAN</span>\"Selamat pagi/siang Yang Terhormat Bapak/Ibu Dosen Penguji dan Dewan Juri Technospark. Kami dari <strong>Tim Nirwana</strong>, yang beranggotakan Fhazar, Ferry, Hildan, Fadel, Daffa, dan Acep. Hari ini kami mempresentasikan analisis dan solusi sistem informasi rantai pasok terpadu bertajuk: <strong>HorizonU Uniform</strong>.\"</p><p class=\"mb-3\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">LATAR BELAKANG</span>\"Studi kasus kami berfokus pada <strong>Departemen Keuangan Universitas Horizon Indonesia</strong>, yang bertanggung jawab atas pengadaan dan distribusi ribuan paket seragam kuliah, jas almamater, sepatu laboratorium, hingga perlengkapan medis mahasiswa baru setiap tahunnya.\"</p><p><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">MASALAH UTAMA</span>\"Sebelum HorizonU Uniform dibangun, pengelolaan dilakukan manual memakai spreadsheet Excel induk sebesar 4.5 Megabytes dengan belasan lembar kerja yang sering sekali mengalami <em>lag</em> dan <em>crash</em>. Di lapangan terjadi antrean panjang hingga 20 menit per mahasiswa, ketidakcocokan ukuran pakaian yang memicu penumpukan <em>dead-stock</em>, serta kerentanan klaim ganda. Mari kita lihat komposisi tim pengembang kami.\"</p>",
      "text": "NASKAH BACA PRESENTER SLIDE 1 (Target: 01:10 Menit):\n\"Selamat pagi/siang Yang Terhormat Bapak/Ibu Dosen Penguji dan Dewan Juri Technospark. Kami dari Tim Nirwana, yang beranggotakan Fhazar, Ferry, Hildan, Fadel, Daffa, dan Acep. Hari ini kami mempresentasikan analisis dan solusi sistem informasi rantai pasok terpadu bertajuk: HorizonU Uniform.\n\nStudi kasus kami berfokus pada Departemen Keuangan Universitas Horizon Indonesia, yang bertanggung jawab atas pengadaan dan distribusi ribuan paket seragam kuliah, jas almamater, sepatu laboratorium, hingga perlengkapan medis mahasiswa baru setiap tahunnya.\n\nSebelum HorizonU Uniform dibangun, pengelolaan dilakukan manual memakai spreadsheet Excel induk sebesar 4.5 Megabytes dengan belasan lembar kerja yang sering sekali mengalami lag dan crash. Di lapangan terjadi antrean panjang hingga 20 menit per mahasiswa, ketidakcocokan ukuran pakaian yang memicu penumpukan dead-stock, serta kerentanan klaim ganda. Mari kita lihat bagaimana rantai pasok ini bekerja.\""
    },
    "slide2": {
      "targetTime": "00:45 Menit",
      "html": "<p class=\"mb-3\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">PROFIL TIM</span>\"Pada Slide 2, izinkan kami memperkenalkan 6 anggota <strong>Tim Nirwana</strong> yang memiliki spesialisasi peran masing-masing dalam membangun HorizonU Uniform:\"</p><p class=\"mb-3\">\"1. <strong>Fhazar Raffiful Aqyla</strong> sebagai <em>Project Manager</em>.<br>2. <strong>Ferry Noer Hendriawan</strong> sebagai <em>Frontend Developer</em>.<br>3. <strong>Hildan Anugrah Tamadi Putra</strong> sebagai <em>Backend Developer</em>.<br>4. <strong>Fadel Rahmadhan</strong> sebagai <em>Quality Assurance</em>.<br>5. <strong>Daffa Nazriel Zaidan</strong> sebagai <em>UI/UX Designer</em>.<br>6. <strong>Acep Ugan Saputra</strong> sebagai <em>System Analyst</em>, merancang pemodelan proses bisnis BPMN dan normalisasi basis data relasional.\"</p><p>\"Dengan sinergi lintas peran inilah kami mentransformasi sistem rantai pasok seragam kampus secara utuh.\"</p>",
      "text": "NASKAH BACA PRESENTER SLIDE 2 (Target: 00:45 Menit):\n\"Pada Slide 2, izinkan kami memperkenalkan 6 anggota Tim Nirwana yang memiliki spesialisasi peran masing-masing dalam membangun HorizonU Uniform:\n\n1. Fhazar Raffiful Aqyla sebagai Project Manager.\n2. Ferry Noer Hendriawan sebagai Frontend Developer.\n3. Hildan Anugrah Tamadi Putra sebagai Backend Developer.\n4. Fadel Rahmadhan sebagai Quality Assurance.\n5. Daffa Nazriel Zaidan sebagai UI/UX Designer.\n6. Acep Ugan Saputra sebagai System Analyst, merancang pemodelan proses bisnis BPMN dan normalisasi basis data relasional.\n\nDengan sinergi lintas peran inilah kami mentransformasi sistem rantai pasok seragam kampus secara utuh.\""
    },
    "slide3": {
      "targetTime": "01:15 Menit",
      "html": "<p class=\"mb-3\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">STRUKTUR SCM</span>\"Masuk ke Slide 3 mengenai Struktur Rantai Pasok. Rantai pasok HorizonU Uniform menghubungkan empat entitas stakeholder secara <em>closed-loop</em>:\"</p><p class=\"mb-3\">\"Pertama, di sisi <strong>Hulu (Supplier)</strong>, terdapat Pabrik Garmen dan Sepatu yang memproduksi barang sesuai Purchase Order agregat kampus.<br>Kedua, <strong>Gudang Logistik Kampus</strong>, yang bertindak sebagai distributor internal untuk memeriksa fisik, mencatat penerimaan batch, dan memberi nomor urut FIFO.<br>Ketiga, <strong>Departemen Keuangan dan Staf Posko</strong>, yang bertugas memvalidasi status kelayakan pelunasan biaya serta melayani serah terima barang di loket.<br>Dan keempat, di sisi <strong>Hilir (Customer)</strong>, adalah Mahasiswa yang memiliki kuota hak barang sesuai prodinya.\"</p><p><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">PENEKANAN KUNCI</span>\"<strong>Prinsip dasar yang kami tanamkan adalah: 'Data Mengunci Fisik'.</strong> Artinya, seragam fisik di meja loket pantang keluar sebelum sistem memindai QR Code mahasiswa dan memastikan hak kuota serta status pembayarannya sah.\"</p>",
      "text": "NASKAH BACA PRESENTER SLIDE 3 (Target: 01:15 Menit):\n\"Masuk ke Slide 3 mengenai Struktur Rantai Pasok. Rantai pasok HorizonU Uniform menghubungkan empat entitas stakeholder secara closed-loop:\n\nPertama, di sisi Hulu (Supplier), terdapat Pabrik Garmen dan Sepatu yang memproduksi barang sesuai Purchase Order agregat kampus.\nKedua, Gudang Logistik Kampus, yang bertindak sebagai distributor internal untuk memeriksa fisik, mencatat penerimaan batch, dan memberi nomor urut FIFO.\nKetiga, Departemen Keuangan dan Staf Posko, yang bertugas memvalidasi status kelayakan pelunasan biaya serta melayani serah terima barang di loket.\nDan keempat, di sisi Hilir (Customer), adalah Mahasiswa yang memiliki kuota hak barang sesuai prodinya.\n\nPrinsip dasar yang kami tanamkan adalah: 'Data Mengunci Fisik'. Artinya, seragam fisik di meja loket pantang keluar sebelum sistem memindai QR Code mahasiswa dan memastikan hak kuota serta status pembayarannya sah.\""
    },
    "slide4": {
      "targetTime": "01:30 Menit",
      "html": "<p class=\"mb-3\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">ANALISIS MASALAH</span>\"Pada Slide 4, kami membedah empat akar masalah utama melalui tabel hubungan Masalah, Penyebab, dan Dampak sistemik:\"</p><p class=\"mb-3\">\"<strong>Masalah Pertama:</strong> Ketidakcocokan ukuran dan penumpukan <em>dead-stock</em>. Penyebabnya adalah pemesanan ke vendor hanya berbasis estimasi historis tanpa survey ukuran mandiri mahasiswa. Dampaknya, ukuran favorit habis seketika, ukuran ekstrem menumpuk bertahun-tahun, dan dana kampus tertahan.<br><br><strong>Masalah Kedua:</strong> Ketergantungan pada lembar kerja Excel raksasa yang sering <em>crash</em> saat mengolah ribuan data maba, ditambah broadcast jadwal dikirim manual per surel. Dampaknya waktu kerja staf terbuang berminggu-minggu dan informasi jadwal terlambat diterima mahasiswa.<br><br><strong>Masalah Ketiga:</strong> Kemacetan parah di loket posko karena verifikasi lunas dan pencatatan dilakukan manual di atas kertas. Dampaknya antrean meliuk ratusan meter dengan waktu layan hingga 15-20 menit per orang, serta rawan klaim ganda.<br><br><strong>Masalah Keempat:</strong> Penyusutan stok tanpa jejak audit karena pencampuran barang antar-pembelian tanpa kaidah FIFO, sehingga nilai HPP dan laba kotor tidak dapat dihitung akurat.\"</p>",
      "text": "NASKAH BACA PRESENTER SLIDE 4 (Target: 01:30 Menit):\n\"Pada Slide 4, kami membedah empat akar masalah utama melalui tabel hubungan Masalah, Penyebab, dan Dampak sistemik:\n\nMasalah Pertama: Ketidakcocokan ukuran dan penumpukan dead-stock. Penyebabnya adalah pemesanan ke vendor hanya berbasis estimasi historis tanpa survey ukuran mandiri mahasiswa. Dampaknya, ukuran favorit habis seketika, ukuran ekstrem menumpuk bertahun-tahun, dan dana kampus tertahan.\n\nMasalah Kedua: Ketergantungan pada lembar kerja Excel raksasa yang sering crash saat mengolah ribuan data maba, ditambah broadcast jadwal dikirim manual per surel. Dampaknya waktu kerja staf terbuang berminggu-minggu dan informasi jadwal terlambat diterima mahasiswa.\n\nMasalah Ketiga: Kemacetan parah di loket posko karena verifikasi lunas dan pencatatan dilakukan manual di atas kertas. Dampaknya antrean meliuk ratusan meter dengan waktu layan hingga 15-20 menit per orang, serta rawan klaim ganda.\n\nMasalah Keempat: Penyusutan stok tanpa jejak audit karena pencampuran barang antar-pembelian tanpa kaidah FIFO, sehingga nilai HPP dan laba kotor tidak dapat dihitung akurat.\""
    },
    "slide5": {
      "targetTime": "01:15 Menit",
      "html": "<p class=\"mb-3\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">ALIRAN INFORMASI</span>\"Selanjutnya pada Slide 5, kami memetakan Analisis Aliran Informasi pada kondisi As-Is dan titik-titik kemacetannya:\"</p><p class=\"mb-3\">\"Pada <strong>Aliran 1</strong> dari Mahasiswa ke Kampus, data ukuran diisi via formulir acak tanpa validasi SKU baku, sehingga rekapitulasi data terlambat dan penuh duplikasi.<br>Pada <strong>Aliran 2</strong> dari Keuangan ke Posko, data pelunasan terisolasi di laptop staf finance. Saat mahasiswa baru saja melunasi di bank pada hari-H, staf posko tidak mengetahuinya karena data belum tersinkronisasi.<br>Pada <strong>Aliran 3</strong> di meja posko, pencatatan serah terima memakai kertas checklist yang baru direkap malam hari, memicu celah barang hilang dan manipulasi.<br>Dan pada <strong>Aliran 4</strong> ke pabrik vendor, order produksi dibuat berdasar tebakan kasar sehingga waktu tunggu revisi ukuran memakan waktu berbulan-bulan.\"</p><p>\"Kesimpulannya, terjadi <em>silo data</em> dan <em>keterlambatan informasi</em> akut yang melumpuhkan efisiensi.\"</p>",
      "text": "NASKAH BACA PRESENTER SLIDE 5 (Target: 01:15 Menit):\n\"Selanjutnya pada Slide 5, kami memetakan Analisis Aliran Informasi pada kondisi As-Is dan titik-titik kemacetannya:\n\nPada Aliran 1 dari Mahasiswa ke Kampus, data ukuran diisi via formulir acak tanpa validasi SKU baku, sehingga rekapitulasi data terlambat dan penuh duplikasi.\nPada Aliran 2 dari Keuangan ke Posko, data pelunasan terisolasi di laptop staf finance. Saat mahasiswa baru saja melunasi di bank pada hari-H, staf posko tidak mengetahuinya karena data belum tersinkronisasi.\nPada Aliran 3 di meja posko, pencatatan serah terima memakai kertas checklist yang baru direkap malam hari, memicu celah barang hilang dan manipulasi.\nDan pada Aliran 4 ke pabrik vendor, order produksi dibuat berdasar tebakan kasar sehingga waktu tunggu revisi ukuran memakan waktu berbulan-bulan.\n\nKesimpulannya, terjadi silo data dan keterlambatan informasi akut yang melumpuhkan efisiensi.\""
    },
    "slide6": {
      "targetTime": "01:30 Menit",
      "html": "<p class=\"mb-3\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">REKOMENDASI SISTEM</span>\"Untuk mengatasi persoalan tersebut, pada Slide 6 kami merekomendasikan empat subsistem terpadu di dalam arsitektur <strong>HorizonU Uniform</strong>:\"</p><p>\"1. <strong>ERP Master & Entitlement Engine:</strong> Berfungsi menggantikan Excel dengan basis data relasional MySQL InnoDB terstruktur, mengelola kuota hak per program studi, dan mengunci integritas transaksi. Manfaatnya: 100% bebas kendala Excel rusak.<br><br>2. <strong>SCM Demand Planning Portal:</strong> Membuka portal mandiri bagi mahasiswa untuk mengisi ukuran baju dan sepatu sebelum produksi, serta menghitung kalkulasi <em>demand vs shortage</em> secara otomatis. Manfaatnya: Zero dead-stock dan pengadaan pabrik tepat sasaran.<br><br>3. <strong>POS QR Verification Engine:</strong> Menghasilkan QR Code instan berbasis NIM dan mengeksekusi 6-Lapis Validasi otomatis melalui kamera webcam posko. Manfaatnya: Memangkas waktu layan menjadi di bawah 30 detik dan nol risiko klaim ganda.<br><br>4. <strong>WMS & FIFO Inventory Costing Engine:</strong> Mengatur pemotongan mutasi dari batch pembelian tertua secara FIFO, rekonsiliasi stock opname fisik, serta perhitungan valuasi HPP dan margin laba secara presisi.\"</p>",
      "text": "NASKAH BACA PRESENTER SLIDE 6 (Target: 01:30 Menit):\n\"Untuk mengatasi persoalan tersebut, pada Slide 6 kami merekomendasikan empat subsistem terpadu di dalam arsitektur HorizonU Uniform:\n\n1. ERP Master & Entitlement Engine: Berfungsi menggantikan Excel dengan basis data relasional MySQL InnoDB terstruktur, mengelola kuota hak per program studi, dan mengunci integritas transaksi. Manfaatnya: 100% bebas kendala Excel rusak.\n\n2. SCM Demand Planning Portal: Membuka portal mandiri bagi mahasiswa untuk mengisi ukuran baju dan sepatu sebelum produksi, serta menghitung kalkulasi demand vs shortage secara otomatis. Manfaatnya: Zero dead-stock dan pengadaan pabrik tepat sasaran.\n\n3. POS QR Verification Engine: Menghasilkan QR Code instan berbasis NIM dan mengeksekusi 6-Lapis Validasi otomatis melalui kamera webcam posko. Manfaatnya: Memangkas waktu layan menjadi di bawah 30 detik dan nol risiko klaim ganda.\n\n4. WMS & FIFO Inventory Costing Engine: Mengatur pemotongan mutasi dari batch pembelian tertua secara FIFO, rekonsiliasi stock opname fisik, serta perhitungan valuasi HPP dan margin laba secara presisi.\""
    },
    "slide7": {
      "targetTime": "01:25 Menit",
      "html": "<p class=\"mb-3\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">DESAIN ARSITEKTUR</span>\"Pada Slide 7, kami tampilkan Desain Arsitektur Solusi yang bekerja dalam 4 Fase Tertutup (<em>Closed-Loop Engine</em>):\"</p><p class=\"mb-3\">\"<strong>Fase 1 (Inbound):</strong> Saat barang dari pabrik tiba, staf gudang mencatatnya pada modul StockReceive, menetapkan batch FIFO, dan mencatat unit HPP pembelian.<br><br><strong>Fase 2 (Planning):</strong> Departemen Keuangan mengaktifkan status lunas di Eligibility Record, mahasiswa mengisi profil ukuran di portal, dan sistem mengalokasikan paket hak barang.<br><br><strong>Fase 3 (Outbound):</strong> Di posko hari-H, staf memindai QR Code mahasiswa. Sistem mengeksekusi 6-lapis validasi menggunakan teknik <em>pessimistic locking</em>, memotong stok batch tertua, dan menyerahkan seragam.<br><br><strong>Fase 4 (Audit & Control):</strong> Stock opname fisik berkala menghitung selisih varians, dan sistem menerbitkan laporan Gross Profit Margin.\"</p><p>\"Data sisa stok dan tren ukuran dari Fase 4 ini secara otomatis menjadi acuan belanja pengadaan Fase 1 pada semester berikutnya, menutup siklus rantai pasok secara sempurna.\"</p>",
      "text": "NASKAH BACA PRESENTER SLIDE 7 (Target: 01:25 Menit):\n\"Pada Slide 7, kami tampilkan Desain Arsitektur Solusi yang bekerja dalam 4 Fase Tertutup (Closed-Loop Engine):\n\nFase 1 (Inbound): Saat barang dari pabrik tiba, staf gudang mencatatnya pada modul StockReceive, menetapkan batch FIFO, dan mencatat unit HPP pembelian.\n\nFase 2 (Planning): Departemen Keuangan mengaktifkan status lunas di Eligibility Record, mahasiswa mengisi profil ukuran di portal, dan sistem mengalokasikan paket hak barang.\n\nFase 3 (Outbound): Di posko hari-H, staf memindai QR Code mahasiswa. Sistem mengeksekusi 6-lapis validasi menggunakan teknik pessimistic locking, memotong stok batch tertua, dan menyerahkan seragam.\n\nFase 4 (Audit & Control): Stock opname fisik berkala menghitung selisih varians, dan sistem menerbitkan laporan Gross Profit Margin.\n\nData sisa stok dan tren ukuran dari Fase 4 ini secara otomatis menjadi acuan belanja pengadaan Fase 1 pada semester berikutnya, menutup siklus rantai pasok secara sempurna.\""
    },
    "slide8": {
      "targetTime": "01:15 Menit",
      "html": "<p class=\"mb-3\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">IMPLEMENTASI & RISIKO</span>\"Masuk ke Slide 8 mengenai Prioritas Implementasi dan Mitigasi Risiko Lapangan.\"</p><p>\"Kami membagi tahapan implementasi menjadi 3 prioritas: Prioritas 1 adalah standarisasi master data dan SKU; Prioritas 2 adalah sinkronisasi status keuangan dan pembukaan portal ukuran; dan Prioritas 3 adalah pelatihan staf loket serta simulasi antrean posko.<br><br>Kami juga telah merancang solusi atas 3 risiko darurat nyata di lapangan:<br>Pertama, jika <strong>baterai HP mahasiswa mati</strong> atau tidak membawa QR, staf posko dapat menggunakan fitur <em>fallback search</em> manual via NIM.<br>Kedua, jika <strong>stok ukuran di rak habis saat fitting</strong>, sistem mendukung fitur <em>Partial Pickup</em> di mana barang yang ada diserahkan tanpa menghanguskan sisa hak mahasiswa.<br>Ketiga, jika <strong>koneksi internet kampus fluktuatif</strong>, database diproteksi oleh <em>pessimistic row locking</em> agar tidak terjadi pengurangan stok ganda.\"</p>",
      "text": "NASKAH BACA PRESENTER SLIDE 8 (Target: 01:15 Menit):\n\"Masuk ke Slide 8 mengenai Prioritas Implementasi dan Mitigasi Risiko Lapangan.\n\nKami membagi tahapan implementasi menjadi 3 prioritas: Prioritas 1 adalah standarisasi master data dan SKU; Prioritas 2 adalah sinkronisasi status keuangan dan pembukaan portal ukuran; dan Prioritas 3 adalah pelatihan staf loket serta simulasi antrean posko.\n\nKami juga telah merancang solusi atas 3 risiko darurat nyata di lapangan:\nPertama, jika baterai HP mahasiswa mati atau tidak membawa QR, staf posko dapat menggunakan fitur fallback search manual via NIM.\nKedua, jika stok ukuran di rak habis saat fitting, sistem mendukung fitur Partial Pickup di mana barang yang ada diserahkan tanpa menghanguskan sisa hak mahasiswa.\nKetiga, jika koneksi internet kampus fluktuatif, database diproteksi oleh pessimistic row locking agar tidak terjadi pengurangan stok ganda.\""
    },
    "slide9": {
      "targetTime": "00:55 Menit",
      "html": "<p class=\"mb-3\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">KESIMPULAN & PENUTUP</span>\"Sebagai penutup pada Slide 9, implementasi HorizonU Uniform menghadirkan 3 manfaat nyata dan terukur:\"</p><p class=\"mb-3\">\"1. <strong>Efisiensi Waktu:</strong> Waktu pelayanan posko berhasil dipangkas dari 15–20 menit menjadi <strong>di bawah 30 detik per mahasiswa</strong>.<br>2. <strong>Akurasi Persediaan:</strong> Mewujudkan target <strong>Zero Dead-Stock</strong> karena pengadaan pabrik 100% selaras dengan ukuran tubuh riil mahasiswa.<br>3. <strong>Akuntabilitas Biaya:</strong> Menghilangkan kerentanan crash Excel dengan sistem penilaian inventaris berbasis <strong>FIFO dan analitik Gross Profit Margin real-time</strong>.\"</p><p class=\"mb-3\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">STATEMENT AKHIR</span>\"Kesimpulan kami: <em>Sistem Informasi bukan sekadar alat pencatat administrasi, melainkan saraf penggerak utama rantai pasok yang mengunci fisik barang dengan kepatuhan finansial, serta mengubah tebakan manual menjadi keputusan bisnis berakurasi tinggi.</em>\"</p><p>\"Sekian presentasi dari Tim Nirwana. Kami siap menerima pertanyaan dari Dewan Juri. Terima kasih.\"</p>",
      "text": "NASKAH BACA PRESENTER SLIDE 9 (Target: 00:55 Menit):\n\"Sebagai penutup pada Slide 9, implementasi HorizonU Uniform menghadirkan 3 manfaat nyata dan terukur:\n\n1. Efisiensi Waktu: Waktu pelayanan posko berhasil dipangkas dari 15–20 menit menjadi di bawah 30 detik per mahasiswa.\n2. Akurasi Persediaan: Mewujudkan target Zero Dead-Stock karena pengadaan pabrik 100% selaras dengan ukuran tubuh riil mahasiswa.\n3. Akuntabilitas Biaya: Menghilangkan kerentanan crash Excel dengan sistem penilaian inventaris berbasis FIFO dan analitik Gross Profit Margin real-time.\n\nStatement akhir kami: Sistem Informasi bukan sekadar alat pencatat administrasi, melainkan saraf penggerak utama rantai pasok yang mengunci fisik barang dengan kepatuhan finansial, serta mengubah tebakan manual menjadi keputusan bisnis berakurasi tinggi.\n\nSekian presentasi dari Tim Nirwana. Kami siap menerima pertanyaan dari Dewan Juri. Terima kasih.\""
    }
  }
};
