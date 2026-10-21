# -*- coding: utf-8 -*-
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

# COLOR PALETTE: Matching 'Business Web Solution - Pitch Deck.pptx'
# Professional Corporate White & Horizon Crimson Red
C_HORIZON_RED  = RGBColor(152, 5, 23)     # #980517 (Official Horizon Red)
C_DARK_RED     = RGBColor(120, 4, 18)     # #780412 (Dark Accent)
C_LIGHT_BG     = RGBColor(255, 255, 255)  # Pure White
C_CARD_BG      = RGBColor(248, 250, 252)  # #F8FAFC (Soft Slate 50)
C_CARD_ALT     = RGBColor(254, 242, 242)  # #FEF2F2 (Soft Rose Tint)
C_BORDER_GRAY  = RGBColor(226, 232, 240)  # #E2E8F0
C_TEXT_BLACK   = RGBColor(15, 23, 42)     # #0F172A (Deep Slate)
C_TEXT_MUTED   = RGBColor(71, 85, 105)    # #475569 (Slate 600)
C_WHITE        = RGBColor(255, 255, 255)

FONT_HEADING = 'Arial'
FONT_BODY    = 'Calibri'

def apply_clean_header(slide, slide_num_str, rubric_str, title_str, subtitle_str):
    # Set slide background to white
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = C_LIGHT_BG

    # Top red accent bar
    top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.4), Inches(0.08), Inches(0.85))
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = C_HORIZON_RED
    top_bar.line.fill.background()

    # Meta tags (Slide Number & Rubric)
    meta_box = slide.shapes.add_textbox(Inches(1.0), Inches(0.35), Inches(11.5), Inches(0.28))
    tf_meta = meta_box.text_frame
    tf_meta.word_wrap = True
    p_meta = tf_meta.paragraphs[0]
    p_meta.text = f"{slide_num_str.upper()}   |   RUBRIK: {rubric_str.upper()}"
    p_meta.font.name = FONT_HEADING
    p_meta.font.size = Pt(10)
    p_meta.font.bold = True
    p_meta.font.color.rgb = C_HORIZON_RED

    # Title
    t_box = slide.shapes.add_textbox(Inches(1.0), Inches(0.6), Inches(11.5), Inches(0.45))
    tf_t = t_box.text_frame
    tf_t.word_wrap = True
    p_t = tf_t.paragraphs[0]
    p_t.text = title_str
    p_t.font.name = FONT_HEADING
    p_t.font.size = Pt(20)
    p_t.font.bold = True
    p_t.font.color.rgb = C_TEXT_BLACK

    # Subtitle
    sub_box = slide.shapes.add_textbox(Inches(1.0), Inches(1.05), Inches(11.5), Inches(0.3))
    tf_sub = sub_box.text_frame
    tf_sub.word_wrap = True
    p_sub = tf_sub.paragraphs[0]
    p_sub.text = subtitle_str
    p_sub.font.name = FONT_BODY
    p_sub.font.size = Pt(11.5)
    p_sub.font.color.rgb = C_TEXT_MUTED

    # Bottom line
    div = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.38), Inches(11.733), Inches(0.015))
    div.fill.solid()
    div.fill.fore_color.rgb = C_BORDER_GRAY
    div.line.fill.background()

def add_clean_card(slide, x, y, w, h, step_badge, title, bullet_points, highlight_note=None, is_red_card=False):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    card.fill.solid()
    card.fill.fore_color.rgb = C_CARD_ALT if is_red_card else C_CARD_BG
    card.line.color.rgb = C_HORIZON_RED if is_red_card else C_BORDER_GRAY
    card.line.width = Pt(1.5 if is_red_card else 1.0)

    tf = card.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = MSO_ANCHOR.TOP
    tf.margin_left = Inches(0.2)
    tf.margin_right = Inches(0.2)
    tf.margin_top = Inches(0.18)
    tf.margin_bottom = Inches(0.15)

    # Step Badge
    p0 = tf.paragraphs[0]
    p0.text = step_badge.upper()
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(9.5)
    p0.font.bold = True
    p0.font.color.rgb = C_HORIZON_RED

    # Title
    p1 = tf.add_paragraph()
    p1.text = title
    p1.font.name = FONT_HEADING
    p1.font.size = Pt(13)
    p1.font.bold = True
    p1.font.color.rgb = C_TEXT_BLACK
    p1.space_after = Pt(6)

    # Body Bullet points
    for pt in bullet_points:
        p = tf.add_paragraph()
        p.text = f"•  {pt}"
        p.font.name = FONT_BODY
        p.font.size = Pt(10.5)
        p.font.color.rgb = C_TEXT_BLACK
        p.space_after = Pt(4)

    # Optional Highlight Note at bottom
    if highlight_note:
        p_note = tf.add_paragraph()
        p_note.text = f"➔  {highlight_note}"
        p_note.font.name = FONT_BODY
        p_note.font.size = Pt(10)
        p_note.font.bold = True
        p_note.font.color.rgb = C_HORIZON_RED
        p_note.space_before = Pt(4)

def add_clean_banner(slide, prefix, text):
    banner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.42), Inches(11.733), Inches(0.72))
    banner.fill.solid()
    banner.fill.fore_color.rgb = C_CARD_ALT
    banner.line.color.rgb = C_HORIZON_RED
    banner.line.width = Pt(1.5)

    tf = banner.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf.margin_left = Inches(0.25)
    tf.margin_right = Inches(0.25)

    p = tf.paragraphs[0]
    p.text = f"{prefix}: "
    p.font.name = FONT_HEADING
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = C_HORIZON_RED

    run = p.add_run()
    run.text = text
    run.font.name = FONT_BODY
    run.font.size = Pt(10.5)
    run.font.color.rgb = C_TEXT_BLACK

def set_slide_notes(slide, notes):
    slide.notes_slide.notes_text_frame.text = notes

# ==========================================
# SLIDE 1: CASE INTRODUCTION
# ==========================================
s1 = prs.slides.add_slide(prs.slide_layouts[6])
apply_clean_header(s1, "Slide 1 • Case Introduction", "Supply Chain Understanding (15%)",
                   "HORIZONU UNIFORM (UNISTOCK SCM) — TRANSFORMASI LOGISTIK KAMPUS",
                   "Sistem Persediaan & Distribusi Seragam Terpadu Berbasis Closed-Loop SCM pada Departemen Keuangan Universitas Horizon Indonesia")

add_clean_card(s1, 0.8, 1.55, 3.75, 4.7, "01 • PROFIL BISNIS & INDUSTRI", "Logistik Perlengkapan Kampus", [
    "Departemen Keuangan Universitas Horizon Indonesia mengelola pengadaan, akuntansi, dan pembagian paket seragam bagi ribuan mahasiswa baru.",
    "Komoditas: Jas Almamater, Kemeja Putih, Celana/Rok Bahan, Sepatu Lab & Dinas, serta Medical Kit keperawatan/kebidanan.",
    "Karakteristik Operasional: Lonjakan penerimaan barang dari vendor garmen di awal tahun akademik."
], "Model Bisnis: Direct Closed-Loop Campus SCM")

add_clean_card(s1, 4.78, 1.55, 3.75, 4.7, "02 • MASALAH UTAMA AS-IS", "Kendala Spreadsheet & Loket", [
    "Spreadsheet Excel Induk raksasa (~4.5 MB, 19 lembar kerja) sering mengalami lag, tidak merespons, atau crash saat data membesar.",
    "Antrean pembagian di posko kampus sangat panjang (mencapai 15–20 menit per mahasiswa) akibat verifikasi berkas manual.",
    "Pemesanan seragam ke pabrik hanya berdasar tebakan historis tanpa profiling ukuran awal, memicu penumpukan dead-stock di gudang."
], "Dampak Finansial: Modal Mengendap & Risiko Klaim Ganda", is_red_card=True)

add_clean_card(s1, 8.76, 1.55, 3.75, 4.7, "03 • PRESENTER & ANALIS", "Tim Pengembang Nirwana", [
    "Fhazar Raffiful Aqyla — Project Manager",
    "Ferry Noer Hendriawan — Frontend Engineer",
    "Hildan Anugrah Tamadi Putra — Backend Engineer",
    "Fadel Rahmadhan — Quality Assurance",
    "Daffa Nazriel Zaidan — UI/UX Designer",
    "Acep Ugan Saputra — System Analyst"
], "URL Sistem Live: unistok.nirwana.biz.id")

add_clean_banner(s1, "FOKUS SOLUSI UNISTOCK",
                 "Menghubungkan Hulu (Vendor Pabrik), Gudang Kampus, Bagian Keuangan, hingga Hilir (Mahasiswa) dalam satu arsitektur terintegrasi bertenaga Laravel 12 dan aturan FIFO.")

set_slide_notes(s1, """NASKAH BACA PRESENTER SLIDE 1 (Target Waktu: 01:10 Menit):
"Selamat pagi/siang Yang Terhormat Bapak/Ibu Dosen Penguji dan Dewan Juri Technospark. Kami dari Tim Nirwana, yang beranggotakan Fhazar, Ferry, Hildan, Fadel, Daffa, dan Acep. Hari ini kami mempresentasikan analisis dan solusi sistem informasi rantai pasok terpadu bertajuk: HorizonU Uniform, dengan engine sistem bernama UniStock.

Studi kasus kami berfokus pada Departemen Keuangan Universitas Horizon Indonesia, yang bertanggung jawab atas pengadaan dan distribusi ribuan paket seragam kuliah, jas almamater, sepatu laboratorium, hingga perlengkapan medis mahasiswa baru setiap tahunnya.

Sebelum UniStock dibangun, pengelolaan dilakukan manual memakai spreadsheet Excel induk sebesar 4.5 Megabytes dengan belasan lembar kerja yang sering sekali mengalami lag dan crash. Di lapangan terjadi antrean panjang hingga 20 menit per mahasiswa, ketidakcocokan ukuran pakaian yang memicu penumpukan dead-stock, serta kerentanan klaim ganda. Mari kita lihat bagaimana rantai pasok ini bekerja." """)

# ==========================================
# SLIDE 2: SUPPLY CHAIN STRUCTURE
# ==========================================
s2 = prs.slides.add_slide(prs.slide_layouts[6])
apply_clean_header(s2, "Slide 2 • Supply Chain Structure", "Supply Chain Understanding (15%)",
                   "STRUKTUR RANTAI PASOK: STAKEHOLDER, ALIRAN FISIK & INFORMASI",
                   "Pemetaan peran stakeholder end-to-end dari hulu ke hilir serta titik kritis perpindahan barang dan otorisasi digital.")

add_clean_card(s2, 0.8, 1.55, 2.78, 4.7, "01 • SUPPLIER (HULU)", "Pabrik Garmen & Sepatu", [
    "Memproduksi paket seragam dan sepatu sesuai pesanan pengadaan kampus (PO).",
    "Menerapkan standarisasi kode varian SKU seragam.",
    "Titik Barang: Pengiriman kardus seragam ke gudang kampus (Inbound Logistics)."
], "Aliran: PO Agregat ➔ Fisik Masuk")

add_clean_card(s2, 3.78, 1.55, 2.78, 4.7, "02 • GUDANG (INBOUND)", "Gudang Logistik Kampus", [
    "Penerimaan fisik barang (StockReceive) dan quality checking kualitas seragam.",
    "Pencatatan batch urutan FIFO (First-In, First-Out) dan nilai HPP per unit.",
    "Titik Barang & Info: Transfer stok batch tertua menuju posko distribusi loket."
], "Aliran: Inbound ➔ POS Loket")

add_clean_card(s2, 6.76, 1.55, 2.78, 4.7, "03 • KEUANGAN & POSKO", "Staf Keuangan & Posko", [
    "Keuangan: Otorisasi status pelunasan biaya kuliah (Eligibility Record).",
    "Staf Posko: Melayani meja pembagian fisik seragam di posko kampus.",
    "Titik Kritis: Validasi QR Code dan pencocokan ukuran saat proses fitting."
], "Aliran: Data Lunas ➔ Serah Fisik", is_red_card=True)

add_clean_card(s2, 9.74, 1.55, 2.78, 4.7, "04 • KONSUMEN (HILIR)", "Mahasiswa (Customer)", [
    "Konsumen akhir yang memiliki hak jatah barang (Entitlement) sesuai prodi.",
    "Mengisi profil ukuran mandiri di web dan menerima tiket jadwal pembagian.",
    "Titik Info: Menunjukkan QR Code beresolusi tinggi (NIM murni) di meja posko."
], "Aliran: Profil ➔ Seragam Pas")

add_clean_banner(s2, "PRINSIP INTI 'DATA MENGUNCI FISIK'",
                 "Barang fisik di loket gudang pantang diserahkan tanpa otorisasi digital. Pemindaian QR Code mengeksekusi validasi atomik di database: jika belum lunas atau kuota habis, fisik seragam tidak dapat keluar.")

set_slide_notes(s2, """NASKAH BACA PRESENTER SLIDE 2 (Target Waktu: 01:15 Menit):
"Masuk ke Slide 2 mengenai Struktur Rantai Pasok. Rantai pasok HorizonU Uniform menghubungkan empat entitas stakeholder secara closed-loop:

Pertama, di sisi Hulu (Supplier), terdapat Pabrik Garmen dan Sepatu yang memproduksi barang sesuai Purchase Order agregat kampus.
Kedua, Gudang Logistik Kampus, yang bertindak sebagai distributor internal untuk memeriksa fisik, mencatat penerimaan batch, dan memberi nomor urut FIFO.
Ketiga, Departemen Keuangan dan Staf Posko, yang bertugas memvalidasi status kelayakan pelunasan biaya serta melayani serah terima barang di loket.
Dan keempat, di sisi Hilir (Customer), adalah Mahasiswa yang memiliki kuota hak barang sesuai prodinya.

Prinsip dasar yang kami tanamkan adalah: 'Data Mengunci Fisik'. Artinya, seragam fisik di meja loket pantang keluar sebelum sistem memindai QR Code mahasiswa dan memastikan hak kuota serta status pembayarannya sah." """)

# ==========================================
# SLIDE 3: PROBLEM ANALYSIS
# ==========================================
s3 = prs.slides.add_slide(prs.slide_layouts[6])
apply_clean_header(s3, "Slide 3 • Problem Analysis", "Problem Analysis (20%)",
                   "ANALISIS AKAR MASALAH: MENGAPA SISTEM MANUAL GAGAL?",
                   "Matriks analisis empat masalah utama beserta penyebab sistemik dan dampaknya terhadap biaya, waktu, stok, dan pelayanan.")

table_shape3 = s3.shapes.add_table(5, 3, Inches(0.8), Inches(1.55), Inches(11.733), Inches(4.7))
t3 = table_shape3.table
t3.columns[0].width = Inches(3.2)
t3.columns[1].width = Inches(4.2)
t3.columns[2].width = Inches(4.333)

h3 = ["Masalah Utama (Gejala Lapangan)", "Akar Penyebab Masalah (Root Cause)", "Dampak terhadap Biaya, Waktu, Stok & Layanan"]
for c_i, h_txt in enumerate(h3):
    cell = t3.cell(0, c_i)
    cell.fill.solid()
    cell.fill.fore_color.rgb = C_HORIZON_RED
    p = cell.text_frame.paragraphs[0]
    p.text = h_txt
    p.font.name = FONT_HEADING
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_WHITE

data_3 = [
    ("1. Ketidakcocokan Ukuran & Penumpukan Dead-Stock",
     "Pemesanan pengadaan ke vendor pabrik hanya menggunakan tebakan rasio historis. Tidak ada sistem survey profil ukuran mandiri sebelum tender dibuka.",
     "Dampak Stok & Biaya: Ukuran favorit (M/L) habis pada hari pertama pembagian, ukuran ekstrem (XS, 3XL) menumpuk bertahun-tahun. Modal kampus mengendap menjadi dead-stock."),
    ("2. File Excel Sering Crash & Pengumuman Lambat",
     "Departemen Keuangan memakai satu file spreadsheet raksasa (~4.5 MB, 19 sheet) untuk ribuan data mahasiswa. Pengiriman jadwal disebarkan manual via surel.",
     "Dampak Waktu & Layanan: Aplikasi sering not responding atau data korup. Rekapitulasi memakan waktu berminggu-minggu dan info jadwal terlambat diterima mahasiswa."),
    ("3. Bottleneck Loket Posko & Risiko Double-Claim",
     "Pengecekan lunas, pencocokan hak prodi, dan paraf bukti serah terima dilakukan manual dengan mencentang map formulir kertas fisik.",
     "Dampak Waktu & Akurasi: Waktu pelayanan lambat (15–20 menit per orang), antrean ratusan meter, serta rawan klaim ganda (double-claim) di loket atau hari berbeda."),
    ("4. Susut Stok Liar & Valuasi HPP Buram",
     "Penerimaan seragam dari vendor dengan harga berbeda tidak dicatat per batch FIFO dan tanpa kartu mutasi stok otomatis yang terikat ke transaksi loket.",
     "Dampak Biaya & Akuntansi: Selisih barang susut (shrinkage) tidak terlacak penanggungjawabnya. Valuasi HPP dan analisis Gross Profit Margin (GPM) terdistorsi.")
]

for r_i, (m, p_c, d) in enumerate(data_3):
    row_idx = r_i + 1
    cell_bg = C_CARD_ALT if r_i % 2 == 1 else C_CARD_BG
    for c_i, val in enumerate([m, p_c, d]):
        cell = t3.cell(row_idx, c_i)
        cell.fill.solid()
        cell.fill.fore_color.rgb = cell_bg
        p = cell.text_frame.paragraphs[0]
        p.text = val
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        p.font.color.rgb = C_HORIZON_RED if c_i == 0 else C_TEXT_BLACK
        if c_i == 0:
            p.font.bold = True

add_clean_banner(s3, "AKAR KEGAGALAN SISTEMIK",
                 "Ketiadaan Single Source of Truth berbasis database relasional menyebabkan silo data antar-staf, memicu kebocoran persediaan, dan membahayakan akuntabilitas keuangan.")

set_slide_notes(s3, """NASKAH BACA PRESENTER SLIDE 3 (Target Waktu: 01:30 Menit):
"Pada Slide 3, kami membedah empat akar masalah utama melalui tabel hubungan Masalah, Penyebab, dan Dampak sistemik:

Masalah Pertama: Ketidakcocokan ukuran dan penumpukan dead-stock. Penyebabnya adalah pemesanan ke vendor hanya berbasis estimasi historis tanpa survey ukuran mandiri mahasiswa. Dampaknya, ukuran favorit habis seketika, ukuran ekstrem menumpuk bertahun-tahun, dan dana kampus tertahan.

Masalah Kedua: Ketergantungan pada lembar kerja Excel raksasa yang sering crash saat mengolah ribuan data maba, ditambah broadcast jadwal dikirim manual per surel. Dampaknya waktu kerja staf terbuang berminggu-minggu dan informasi jadwal terlambat diterima mahasiswa.

Masalah Ketiga: Kemacetan parah di loket posko karena verifikasi lunas dan pencatatan dilakukan manual di atas kertas. Dampaknya antrean meliuk ratusan meter dengan waktu layan hingga 15-20 menit per orang, serta rawan klaim ganda.

Masalah Keempat: Penyusutan stok tanpa jejak audit karena pencampuran barang antar-pembelian tanpa kaidah FIFO, sehingga nilai HPP dan laba kotor tidak dapat dihitung akurat." """)

# ==========================================
# SLIDE 4: INFORMATION FLOW ANALYSIS
# ==========================================
s4 = prs.slides.add_slide(prs.slide_layouts[6])
apply_clean_header(s4, "Slide 4 • Information Flow Analysis", "Information Flow Analysis (15%)",
                   "DIAGRAM ALIRAN INFORMASI & TITIK KEMACETAN (AS-IS STATE)",
                   "Identifikasi kebutuhan informasi stakeholder, asal-tujuan data, serta titik kritis informasi terlambat, tidak akurat, atau terputus.")

add_clean_card(s4, 0.8, 1.55, 5.75, 2.25, "ALIRAN 01 • MAHASISWA ➔ KAMPUS", "Kebutuhan: Profil Ukuran & Jadwal", [
    "Asal & Tujuan: Mahasiswa mengisi form ke kampus dan menerima jadwal pembagian via email.",
    "Titik Masalah: Google Form terpisah tanpa validasi SKU baku, memicu input ganda dan rekap manual staf terlambat berminggu-minggu."
], "Kondisi: Informasi Terlambat & Format Liar")

add_clean_card(s4, 6.78, 1.55, 5.75, 2.25, "ALIRAN 02 • KEUANGAN ➔ POSKO HARI-H", "Kebutuhan: Status Lunas (Eligibility)", [
    "Asal & Tujuan: Staf Keuangan mengekspor data lunas ke staf meja posko pembagian seragam.",
    "Titik Masalah: Data terisolasi di file Excel lokal staf. Saat ada pelunasan baru di bank pada hari-H, staf posko tidak terupdate sehingga maba tertolak."
], "Kondisi: Informasi Terputus (Silo Data Lokal)", is_red_card=True)

add_clean_card(s4, 0.8, 4.0, 5.75, 2.25, "ALIRAN 03 • MEJA POSKO ➔ GUDANG", "Kebutuhan: Kuota Hak & Kartu Mutasi", [
    "Asal & Tujuan: Staf posko memverifikasi paket hak prodi dan mencatat mutasi seragam yang keluar.",
    "Titik Masalah: Penyerahan seragam dicatat di lembaran kertas. Pengurangan saldo stok gudang baru direkap malam hari, memicu risiko susut stok."
], "Kondisi: Informasi Terlambat (Paper-Based Tracking)")

add_clean_card(s4, 6.78, 4.0, 5.75, 2.25, "ALIRAN 04 • PENGADAAN ➔ PABRIK", "Kebutuhan: Purchase Order Agregat", [
    "Asal & Tujuan: Pengadaan kampus mengirim rincian jumlah potong seragam dan sepatu ke pabrik.",
    "Titik Masalah: Purchase Order ke pabrik hanya estimasi kasar tanpa dasar profil data riil maba, memicu lead-time penukaran barang berbulan-bulan."
], "Kondisi: Informasi Tidak Akurat (Blind Ordering)")

add_clean_banner(s4, "DIAGNOSA KUNCI",
                 "Terjadi Information Latency dan Data Asymmetry akut yang melumpuhkan koordinasi antar-bagian. Solusi mutlak membutuhkan platform web tunggal terpusat.")

set_slide_notes(s4, """NASKAH BACA PRESENTER SLIDE 4 (Target Waktu: 01:15 Menit):
"Selanjutnya pada Slide 4, kami memetakan Analisis Aliran Informasi pada kondisi As-Is dan titik-titik kemacetannya:

Pada Aliran 1 dari Mahasiswa ke Kampus, data ukuran diisi via formulir acak tanpa validasi SKU baku, sehingga rekapitulasi data terlambat dan penuh duplikasi.
Pada Aliran 2 dari Keuangan ke Posko, data pelunasan terisolasi di laptop staf finance. Saat mahasiswa baru saja melunasi di bank pada hari-H, staf posko tidak mengetahuinya karena data belum tersinkronisasi.
Pada Aliran 3 di meja posko, pencatatan serah terima memakai kertas checklist yang baru direkap malam hari, memicu celah barang hilang dan manipulasi.
Dan pada Aliran 4 ke pabrik vendor, order produksi dibuat berdasar tebakan kasar sehingga waktu tunggu revisi ukuran memakan waktu berbulan-bulan.

Kesimpulannya, terjadi silo data dan keterlambatan informasi akut yang melumpuhkan efisiensi." """)

# ==========================================
# SLIDE 5: RECOMMENDED INFORMATION SYSTEMS
# ==========================================
s5 = prs.slides.add_slide(prs.slide_layouts[6])
apply_clean_header(s5, "Slide 5 • Recommended Information Systems", "IS Justification (20%)",
                   "REKOMENDASI SISTEM INFORMASI: EKOSISTEM HORIZONU UNIFORM",
                   "Pemilihan sistem terpadu (ERP, SCM, POS, WMS), justifikasi integrasi, fungsi operasional, dan manfaat nyata terukur.")

table_shape5 = s5.shapes.add_table(5, 4, Inches(0.8), Inches(1.55), Inches(11.733), Inches(4.7))
t5 = table_shape5.table
t5.columns[0].width = Inches(2.5)
t5.columns[1].width = Inches(2.9)
t5.columns[2].width = Inches(4.1)
t5.columns[3].width = Inches(2.233)

h5 = ["Masalah yang Diselesaikan", "Sistem & Modul Terpilih", "Fungsi Sistem dalam Kasus", "Manfaat Nyata Terukur"]
for c_i, h_txt in enumerate(h5):
    cell = t5.cell(0, c_i)
    cell.fill.solid()
    cell.fill.fore_color.rgb = C_HORIZON_RED
    p = cell.text_frame.paragraphs[0]
    p.text = h_txt
    p.font.name = FONT_HEADING
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_WHITE

data_5 = [
    ("Excel Crash & Data Mahasiswa Terpecah",
     "ERP Master & Entitlement Engine (Database MySQL InnoDB)",
     "Mengelola master data mahasiswa, struktur base code 4-segmen, impor massal via Maatwebsite, serta matriks kuota hak (Entitlement) otomatis per jenjang dan prodi.",
     "100% Bebas Crash Excel, data terisolasi ACID, single source of truth."),
    ("Dead-Stock & Pengumuman Jadwal Lambat",
     "SCM Demand Planning Portal (Size Event & Announcement Hub)",
     "Membuka event input profil ukuran mandiri mahasiswa (SizeChangeEvent), siaran jadwal terfilter per prodi, serta kalkulasi otomatis Demand vs Shortage untuk tender vendor.",
     "Zero Dead-Stock, pengadaan pabrik presisi 100% sesuai ukuran riil."),
    ("Bottleneck Antrean & Risiko Double-Claim",
     "POS QR Verification Engine (BaconQrCode & HTML5 Scanner)",
     "Penerbitan QR Code NIM beresolusi tinggi (Level H) dan eksekusi 6-Lapis Validasi Atomik via kamera webcam loket (Lunas, Sesi, Prodi, Gender, Sisa Hak, Stok Rak).",
     "Waktu layan < 30 detik/mhs, nol risiko penyerahan ganda."),
    ("Susut Stok Gudang & Valuasi HPP Buram",
     "WMS & FIFO Costing Engine (StockBatch & Movement Ledger)",
     "Melacak batch penerimaan vendor tertua (FIFO), pemotongan stok berkartu audit, rekonsiliasi Stock Opname fisik via variance kalkulator, serta analitik margin laba kotor.",
     "Valuasi HPP FIFO real-time, audit transparan, cegah selisih fisik.")
]

for r_i, (m, sys, fn, ben) in enumerate(data_5):
    row_idx = r_i + 1
    cell_bg = C_CARD_ALT if r_i % 2 == 1 else C_CARD_BG
    for c_i, val in enumerate([m, sys, fn, ben]):
        cell = t5.cell(row_idx, c_i)
        cell.fill.solid()
        cell.fill.fore_color.rgb = cell_bg
        p = cell.text_frame.paragraphs[0]
        p.text = val
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        p.font.color.rgb = C_HORIZON_RED if c_i == 0 else C_TEXT_BLACK
        if c_i == 0:
            p.font.bold = True

add_clean_banner(s5, "KEUNGGULAN INTEGRASI UNISTOCK",
                 "Menyatukan keandalan ERP, perencanaan SCM, kecepatan POS loket, dan ketatnya WMS dalam satu portal monolitik Laravel 12 modern yang tangguh.")

set_slide_notes(s5, """NASKAH BACA PRESENTER SLIDE 5 (Target Waktu: 01:30 Menit):
"Untuk mengatasi persoalan tersebut, pada Slide 5 kami merekomendasikan empat subsistem terpadu di dalam arsitektur HorizonU Uniform (UniStock):

1. ERP Master & Entitlement Engine: Berfungsi menggantikan Excel dengan basis data relasional MySQL InnoDB terstruktur, mengelola kuota hak per program studi, dan mengunci integritas transaksi. Manfaatnya: 100% bebas kendala Excel rusak.

2. SCM Demand Planning Portal: Membuka portal mandiri bagi mahasiswa untuk mengisi ukuran baju dan sepatu sebelum produksi, serta menghitung kalkulasi demand vs shortage secara otomatis. Manfaatnya: Zero dead-stock dan pengadaan pabrik tepat sasaran.

3. POS QR Verification Engine: Menghasilkan QR Code instan berbasis NIM dan mengeksekusi 6-Lapis Validasi otomatis melalui kamera webcam posko. Manfaatnya: Memangkas waktu layan menjadi di bawah 30 detik dan nol risiko klaim ganda.

4. WMS & FIFO Inventory Costing Engine: Mengatur pemotongan mutasi dari batch pembelian tertua secara FIFO, rekonsiliasi stock opname fisik, serta perhitungan valuasi HPP dan margin laba secara presisi." """)

# ==========================================
# SLIDE 6: PROPOSED SOLUTION DESIGN
# ==========================================
s6 = prs.slides.add_slide(prs.slide_layouts[6])
apply_clean_header(s6, "Slide 6 • Proposed Solution Design", "Proposed Solution (15%)",
                   "DIAGRAM ARSITEKTUR SOLUSI: 4 FASE CLOSED-LOOP SCM ENGINE",
                   "Bagaimana subsistem terhubung erat, aliran data setelah perbaikan, dan pemanfaatan data untuk pengambilan keputusan.")

add_clean_card(s6, 0.8, 1.55, 2.78, 4.7, "FASE 1 • HULU (INBOUND)", "Inbound & Batch FIFO", [
    "Pencatatan barang dari vendor garmen pada modul StockReceive.",
    "Sistem menerbitkan ID batch terurut (FIFO Queue Sequence).",
    "Pencatatan otomatis jurnal mutasi masuk (StockMovement IN) dan penetapan unit HPP batch."
], "Output: Batch FIFO Terdaftar")

add_clean_card(s6, 3.78, 1.55, 2.78, 4.7, "FASE 2 • DEMAND (PLANNING)", "Eligibility & Profiling", [
    "Keuangan mengaktifkan data mahasiswa lunas di EligibilityRecord.",
    "Mahasiswa input profil ukuran badan mandiri di event portal.",
    "Sistem menghitung Demand vs Shortage untuk acuan belanja pengadaan vendor."
], "Output: QR Code & Jadwal Aktif")

add_clean_card(s6, 6.76, 1.55, 2.78, 4.7, "FASE 3 • HILIR (OUTBOUND)", "POS QR & 6-Lapis Validasi", [
    "Staf memindai QR NIM mahasiswa di loket posko kampus.",
    "Eksekusi 6-Lapis Validasi Atomik via pessimistic lock (lockForUpdate).",
    "Pemotongan batch tertua otomatis (deductStockFifo) dan cetak tiket serah terima fisik."
], "Output: Seragam Diterima Pas", is_red_card=True)

add_clean_card(s6, 9.74, 1.55, 2.78, 4.7, "FASE 4 • KONTROL (AUDIT)", "Opname & Closed-Loop", [
    "Stock Opname fisik berkala menghitung selisih variance otomatis.",
    "Penerbitan jurnal penyesuaian susut/surplus stok gudang.",
    "Generate analitik Gross Profit Margin (GPM) dan laporan sisa stok untuk pimpinan."
], "Output: Feedback Siklus Baru")

add_clean_banner(s6, "PENGAMBILAN KEPUTUSAN CLOSED-LOOP",
                 "Data analitik stok sisa dan tren ukuran dari Fase 4 secara otomatis menjadi input penetapan kuota anggaran dan purchase order ke pabrik pada Fase 1 semester berikutnya.")

set_slide_notes(s6, """NASKAH BACA PRESENTER SLIDE 6 (Target Waktu: 01:25 Menit):
"Pada Slide 6, kami tampilkan Desain Arsitektur Solusi yang bekerja dalam 4 Fase Tertutup (Closed-Loop Engine):

Fase 1 (Inbound): Saat barang dari pabrik tiba, staf gudang mencatatnya pada modul StockReceive, menetapkan batch FIFO, dan mencatat unit HPP pembelian.

Fase 2 (Planning): Departemen Keuangan mengaktifkan status lunas di Eligibility Record, mahasiswa mengisi profil ukuran di portal, dan sistem mengalokasikan paket hak barang.

Fase 3 (Outbound): Di posko hari-H, staf memindai QR Code mahasiswa. Sistem mengeksekusi 6-lapis validasi menggunakan teknik pessimistic locking, memotong stok batch tertua, dan menyerahkan seragam.

Fase 4 (Audit & Control): Stock opname fisik berkala menghitung selisih varians, dan sistem menerbitkan laporan Gross Profit Margin.

Data sisa stok dan tren ukuran dari Fase 4 ini secara otomatis menjadi acuan belanja pengadaan Fase 1 pada semester berikutnya, menutup siklus rantai pasok secara sempurna." """)

# ==========================================
# SLIDE 7: IMPLEMENTATION AND RISKS
# ==========================================
s7 = prs.slides.add_slide(prs.slide_layouts[6])
apply_clean_header(s7, "Slide 7 • Implementation and Risks", "Feasibility & Risk Mitigation (15%)",
                   "PRIORITAS IMPLEMENTASI & MITIGASI RISIKO LAPANGAN",
                   "Tiga langkah penerapan terencana, kesiapan SDM, serta mitigasi risiko kontingensi darurat hari-H pembagian.")

add_clean_card(s7, 0.8, 1.55, 3.75, 4.7, "3 PRIORITAS IMPLEMENTASI", "Tahapan Kesiapan Sistem", [
    "Prioritas 1 (Master Data): Pembersihan data lama, pembuatan skema SKU 5-segmen, impor data mahasiswa, dan konfigurasi hak seragam prodi.",
    "Prioritas 2 (Integrasi Portal): Integrasi status lunas Keuangan (Eligibility), pembukaan jendela waktu pengisian profil ukuran maba, dan rilis jadwal.",
    "Prioritas 3 (Kesiapan SDM): Pelatihan teknis staf posko memakai scanner webcam, prosedur fitting ukuran, dan drill skenario darurat."
], "Roadmap: 6 Minggu Implementasi Penuh")

add_clean_card(s7, 4.78, 1.55, 7.75, 4.7, "3 RISIKO DARURAT LAPANGAN & CARA MITIGASI", "SOP Kontingensi Hari-H Posko", [
    "RISIKO 1: Baterai HP Mahasiswa Mati / QR Rusak\n• Kendala: Mahasiswa tidak bisa menampilkan QR Code di layar ponsel.\n• Mitigasi UniStock: Bilah scanner staf posko dilengkapi fitur Fallback Search manual via NIM atau Nama yang langsung memanggil profil hak seketika.",
    "RISIKO 2: Ukuran Rak Habis / Fitting Beda\n• Kendala: Ukuran fisik seragam di rak posko habis saat dicoba langsung.\n• Mitigasi UniStock: Fitur Partial Pickup memungkinkan staf menyerahkan barang yang tersedia (sisa hak tidak hangus & dijadwal ulang) dan mencatat tukar ukuran di student_size_histories.",
    "RISIKO 3: Jaringan Internet Kampus Lambat / Dobel Klik\n• Kendala: Sinyal wifi fluktuatif menyebabkan staf mengklik tombol konfirmasi berulang kali.\n• Mitigasi UniStock: Transaksi dilindungi Pessimistic Row Locking (lockForUpdate) dan proteksi idempotensi, menjamin nol pemotongan stok ganda."
], "Toleransi Kesalahan: Resiliensi Operasional Tinggi", is_red_card=True)

add_clean_banner(s7, "RESILIENSI OPERASIONAL TINGGI",
                 "UniStock dirancang dengan pertimbangan toleransi kesalahan nyata (fault-tolerant), menjamin pembagian di posko kampus tetap berjalan lancar dalam kondisi darurat apa pun.")

set_slide_notes(s7, """NASKAH BACA PRESENTER SLIDE 7 (Target Waktu: 01:15 Menit):
"Masuk ke Slide 7 mengenai Prioritas Implementasi dan Mitigasi Risiko Lapangan.

Kami membagi tahapan implementasi menjadi 3 prioritas: Prioritas 1 adalah standarisasi master data dan SKU; Prioritas 2 adalah sinkronisasi status keuangan dan pembukaan portal ukuran; dan Prioritas 3 adalah pelatihan staf loket serta simulasi antrean posko.

Kami juga telah merancang solusi atas 3 risiko darurat nyata di lapangan:
Pertama, jika baterai HP mahasiswa mati atau tidak membawa QR, staf posko dapat menggunakan fitur fallback search manual via NIM.
Kedua, jika stok ukuran di rak habis saat fitting, sistem mendukung fitur Partial Pickup di mana barang yang ada diserahkan tanpa menghanguskan sisa hak mahasiswa.
Ketiga, jika koneksi internet kampus fluktuatif, database diproteksi oleh pessimistic row locking agar tidak terjadi pengurangan stok ganda." """)

# ==========================================
# SLIDE 8: CONCLUSION AND EXPECTED BENEFITS
# ==========================================
s8 = prs.slides.add_slide(prs.slide_layouts[6])
apply_clean_header(s8, "Slide 8 • Conclusion & Benefits", "Presentation & Impact (15%)",
                   "KESIMPULAN & TIGA MANFAAT TERUKUR YANG DIHASILKAN",
                   "Rangkuman dampak nyata sistem informasi HorizonU Uniform (UniStock SCM) bagi efisiensi operasional dan akuntabilitas keuangan.")

add_clean_card(s8, 0.8, 1.55, 3.75, 4.7, "MANFAAT 01 • EFISIENSI WAKTU", "< 30 Detik per Mahasiswa", [
    "Memangkas waktu layanan loket dari yang sebelumnya 15–20 menit per mahasiswa menjadi di bawah 30 detik.",
    "Pemindaian QR Code instan berbasis NIM dan eksekusi 6-lapis validasi otomatis.",
    "Mengeliminasi antrean panjang yang berdesakan di posko kampus setiap awal tahun ajaran baru."
], "Dampak: Pelayanan Mahasiswa Cepat & Nyaman", is_red_card=True)

add_clean_card(s8, 4.78, 1.55, 3.75, 4.7, "MANFAAT 02 • AKURASI INVENTARIS", "Zero (0) Dead-Stock", [
    "Profiling ukuran mandiri oleh mahasiswa sebelum tender vendor garmen dibuka.",
    "Kalkulasi Demand vs Shortage otomatis memastikan pesanan pabrik selaras 100% dengan kebutuhan tubuh riil mahasiswa.",
    "Tidak ada lagi seragam berukuran ekstrem yang mengendap bertahun-tahun di gudang."
], "Dampak: Optimalisasi Modal Kerja Kampus")

add_clean_card(s8, 8.76, 1.55, 3.75, 4.7, "MANFAAT 03 • AKUNTABILITAS BIAYA", "100% Valuasi FIFO Real-Time", [
    "Mengeliminasi ketergantungan pada spreadsheet Excel raksasa yang rawan rusak atau korup.",
    "Seluruh pergerakan stok dicatat otomatis ke kartu mutasi persediaan berbasis urutan batch FIFO.",
    "Laporan Harga Pokok Penjualan (HPP) dan Gross Profit Margin (GPM) tersedia secara transparan bagi pimpinan."
], "Dampak: Audit Trail Keuangan Bebas Selisih")

add_clean_banner(s8, "KESIMPULAN STRATEGIS SISTEM INFORMASI",
                 "Sistem Informasi bukan sekadar alat pencatat administrasi, melainkan saraf penggerak rantai pasok yang mengunci fisik barang dengan kepatuhan finansial, serta mentransformasi tebakan manual menjadi keputusan bisnis berakurasi tinggi.")

set_slide_notes(s8, """NASKAH BACA PRESENTER SLIDE 8 (Target Waktu: 00:55 Menit):
"Sebagai penutup pada Slide 8, implementasi HorizonU Uniform menghadirkan 3 manfaat nyata dan terukur:

1. Efisiensi Waktu: Waktu pelayanan posko berhasil dipangkas dari 15–20 menit menjadi di bawah 30 detik per mahasiswa.
2. Akurasi Persediaan: Mewujudkan target Zero Dead-Stock karena pengadaan pabrik 100% selaras dengan ukuran tubuh riil mahasiswa.
3. Akuntabilitas Biaya: Menghilangkan kerentanan crash Excel dengan sistem penilaian inventaris berbasis FIFO dan analitik Gross Profit Margin real-time.

Statement akhir kami: Sistem Informasi bukan sekadar alat pencatat administrasi, melainkan saraf penggerak utama rantai pasok yang mengunci fisik barang dengan kepatuhan finansial, serta mengubah tebakan manual menjadi keputusan bisnis berakurasi tinggi.

Sekian presentasi dari Tim Nirwana. Kami siap menerima pertanyaan dari Dewan Juri. Terima kasih." """)

output_filename = "HorizonU_Uniform_UniStock_SCM_Presentasi_Technospark.pptx"
prs.save(output_filename)
print(f"Presentation saved successfully to {output_filename}!")
