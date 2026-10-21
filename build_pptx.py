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

# PALETTE: Clean Executive White & Horizon Crimson Red (#980517)
C_RED         = RGBColor(152, 5, 23)     # #980517 Horizon Red
C_RED_BG      = RGBColor(254, 242, 242)  # #FEF2F2 Light Red Tint
C_WHITE       = RGBColor(255, 255, 255)  # Pure White
C_CARD_BG     = RGBColor(248, 250, 252)  # #F8FAFC Soft Slate
C_BORDER      = RGBColor(226, 232, 240)  # #E2E8F0 Subtle Border
C_TEXT_DARK   = RGBColor(15, 23, 42)     # #0F172A Deep Charcoal
C_TEXT_MUTED  = RGBColor(71, 85, 105)    # #475569 Slate Gray

FONT_TITLE = 'Arial'
FONT_BODY  = 'Calibri'

def apply_header(slide, category_tag, main_title, subtitle):
    # Pure white background
    slide.background.fill.solid()
    slide.background.fill.fore_color.rgb = C_WHITE

    # Left accent line
    accent = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.42), Inches(0.06), Inches(0.78))
    accent.fill.solid()
    accent.fill.fore_color.rgb = C_RED
    accent.line.fill.background()

    # Category Tag
    cat_box = slide.shapes.add_textbox(Inches(0.95), Inches(0.38), Inches(11.5), Inches(0.24))
    tf_c = cat_box.text_frame
    tf_c.word_wrap = True
    p_c = tf_c.paragraphs[0]
    p_c.text = category_tag.upper()
    p_c.font.name = FONT_TITLE
    p_c.font.size = Pt(9.5)
    p_c.font.bold = True
    p_c.font.color.rgb = C_RED

    # Main Title
    t_box = slide.shapes.add_textbox(Inches(0.95), Inches(0.60), Inches(11.5), Inches(0.42))
    tf_t = t_box.text_frame
    tf_t.word_wrap = True
    p_t = tf_t.paragraphs[0]
    p_t.text = main_title
    p_t.font.name = FONT_TITLE
    p_t.font.size = Pt(19)
    p_t.font.bold = True
    p_t.font.color.rgb = C_TEXT_DARK

    # Subtitle
    sub_box = slide.shapes.add_textbox(Inches(0.95), Inches(1.02), Inches(11.5), Inches(0.28))
    tf_sub = sub_box.text_frame
    tf_sub.word_wrap = True
    p_sub = tf_sub.paragraphs[0]
    p_sub.text = subtitle
    p_sub.font.name = FONT_BODY
    p_sub.font.size = Pt(11)
    p_sub.font.color.rgb = C_TEXT_MUTED

    # Subtle bottom border line
    div = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.36), Inches(11.733), Inches(0.012))
    div.fill.solid()
    div.fill.fore_color.rgb = C_BORDER
    div.line.fill.background()

def add_card(slide, x, y, w, h, badge, title, bullets, note=None, is_highlight=False):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    card.fill.solid()
    card.fill.fore_color.rgb = C_RED_BG if is_highlight else C_CARD_BG
    card.line.color.rgb = C_RED if is_highlight else C_BORDER
    card.line.width = Pt(1.5 if is_highlight else 1.0)

    tf = card.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = MSO_ANCHOR.TOP
    tf.margin_left = Inches(0.2)
    tf.margin_right = Inches(0.2)
    tf.margin_top = Inches(0.18)
    tf.margin_bottom = Inches(0.15)

    p0 = tf.paragraphs[0]
    p0.text = badge.upper()
    p0.font.name = FONT_TITLE
    p0.font.size = Pt(9.5)
    p0.font.bold = True
    p0.font.color.rgb = C_RED

    p1 = tf.add_paragraph()
    p1.text = title
    p1.font.name = FONT_TITLE
    p1.font.size = Pt(12.5)
    p1.font.bold = True
    p1.font.color.rgb = C_TEXT_DARK
    p1.space_after = Pt(5)

    for b in bullets:
        p = tf.add_paragraph()
        p.text = f"•  {b}"
        p.font.name = FONT_BODY
        p.font.size = Pt(10.5)
        p.font.color.rgb = C_TEXT_DARK
        p.space_after = Pt(3)

    if note:
        pn = tf.add_paragraph()
        pn.text = f"➔  {note}"
        pn.font.name = FONT_BODY
        pn.font.size = Pt(10)
        pn.font.bold = True
        pn.font.color.rgb = C_RED
        pn.space_before = Pt(4)

def add_banner(slide, label, desc):
    banner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.42), Inches(11.733), Inches(0.72))
    banner.fill.solid()
    banner.fill.fore_color.rgb = C_RED_BG
    banner.line.color.rgb = C_RED
    banner.line.width = Pt(1.5)

    tf = banner.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf.margin_left = Inches(0.25)
    tf.margin_right = Inches(0.25)

    p = tf.paragraphs[0]
    p.text = f"{label}: "
    p.font.name = FONT_TITLE
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = C_RED

    run = p.add_run()
    run.text = desc
    run.font.name = FONT_BODY
    run.font.size = Pt(10.5)
    run.font.color.rgb = C_TEXT_DARK

def set_notes(slide, notes):
    slide.notes_slide.notes_text_frame.text = notes

# ==========================================
# SLIDE 1: LANDING PAGE OPENING HERO
# ==========================================
s1 = prs.slides.add_slide(prs.slide_layouts[6])

# Top Header Bar
top_box = s1.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.733), Inches(0.45))
tf_top = top_box.text_frame
tf_top.word_wrap = True
tf_top.margin_left = tf_top.margin_right = tf_top.margin_top = tf_top.margin_bottom = 0

p_top = tf_top.paragraphs[0]
r_top1 = p_top.add_run()
r_top1.text = "DEPARTEMEN KEUANGAN • UNIVERSITAS HORIZON INDONESIA"
r_top1.font.name = FONT_BODY
r_top1.font.size = Pt(9.5)
r_top1.font.bold = True
r_top1.font.color.rgb = RGBColor(100, 116, 139)

r_top2 = p_top.add_run()
r_top2.text = "                                                                                   TECHNOSPARK 2026 PITCH DECK"
r_top2.font.name = FONT_BODY
r_top2.font.size = Pt(9.5)
r_top2.font.bold = True
r_top2.font.color.rgb = C_RED

# Header Divider Line
line = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.88), Inches(11.733), Inches(0.02))
line.fill.solid()
line.fill.fore_color.rgb = C_BORDER
line.line.color.rgb = C_BORDER

# Hero Big Banner
hero_box = s1.shapes.add_textbox(Inches(0.8), Inches(1.15), Inches(11.733), Inches(2.5))
tf_hero = hero_box.text_frame
tf_hero.word_wrap = True
tf_hero.margin_left = tf_hero.margin_right = tf_hero.margin_top = tf_hero.margin_bottom = 0

p_eye = tf_hero.paragraphs[0]
p_eye.text = "SOLUSI RANTAI PASOK LOGISTIK KAMPUS TERINTEGRASI"
p_eye.font.name = FONT_TITLE
p_eye.font.size = Pt(11)
p_eye.font.bold = True
p_eye.font.color.rgb = C_RED
p_eye.space_after = Pt(4)

p_title = tf_hero.add_paragraph()
r_t1 = p_title.add_run()
r_t1.text = "HORIZONU "
r_t1.font.name = FONT_TITLE
r_t1.font.size = Pt(36)
r_t1.font.bold = True
r_t1.font.color.rgb = C_TEXT_DARK

r_t2 = p_title.add_run()
r_t2.text = "UNIFORM"
r_t2.font.name = FONT_TITLE
r_t2.font.size = Pt(36)
r_t2.font.bold = True
r_t2.font.color.rgb = C_RED
r_t2.font.underline = True
p_title.space_after = Pt(8)

p_desc = tf_hero.add_paragraph()
p_desc.text = "Transformasi digital operasional seragam mahasiswa: Menghubungkan Hulu (Vendor Pabrik), Gudang Kampus, dan Bagian Keuangan hingga Hilir (Mahasiswa) berbasis data presisi dan aturan inventaris FIFO."
p_desc.font.name = FONT_BODY
p_desc.font.size = Pt(12)
p_desc.font.color.rgb = RGBColor(75, 85, 99)
p_desc.line_spacing = 1.25

# 3 Bento Cards
add_card(s1, 0.8, 3.85, 3.75, 2.95, "Objek & Komoditas", "Pengadaan Perlengkapan Kampus", [
    "Pengadaan dan pembagian tahunan: Jas Almamater, Kemeja Putih, Celana/Rok, Sepatu Lab & Dinas, serta Medical Kit.",
    "Penyaluran langsung ke ribuan mahasiswa baru tanpa perantara ritel komersial."
], "Model: Closed-Loop Campus SCM")

add_card(s1, 4.78, 3.85, 3.75, 2.95, "Tantangan Utama", "Hambatan Spreadsheet & Posko", [
    "Spreadsheet Excel 4.5 MB crash saat ribuan maba mendaftar serentak.",
    "Antrean fisik posko 15–20 menit/orang akibat verifikasi berkas manual.",
    "Tebakan order pabrik memicu penumpukan dead-stock ukuran ekstrem."
], "Dampak: Modal Mengendap", is_highlight=True)

add_card(s1, 8.76, 3.85, 3.75, 2.95, "Nirwana Team", "Tim Pengembang Sistem", [
    "Fhazar Raffiful Aqyla (Project Manager)",
    "Ferry Noer Hendriawan (Frontend) • Hildan (Backend)",
    "Fadel Rahmadhan (QA) • Daffa (UI/UX) • Acep (Analyst)"
], "Horizon University")

set_notes(s1, """NASKAH BACA PRESENTER SLIDE 1 (Target: 01:10 Menit):
"Selamat pagi/siang Yang Terhormat Bapak/Ibu Dosen Penguji dan Dewan Juri Technospark. Kami dari Tim Nirwana, yang beranggotakan Fhazar, Ferry, Hildan, Fadel, Daffa, dan Acep. Hari ini kami mempresentasikan analisis dan solusi sistem informasi rantai pasok terpadu bertajuk: HorizonU Uniform, dengan engine sistem bernama UniStock.

Studi kasus kami berfokus pada Departemen Keuangan Universitas Horizon Indonesia, yang bertanggung jawab atas pengadaan dan distribusi ribuan paket seragam kuliah, jas almamater, sepatu laboratorium, hingga perlengkapan medis mahasiswa baru setiap tahunnya.

Sebelum UniStock dibangun, pengelolaan dilakukan manual memakai spreadsheet Excel induk sebesar 4.5 Megabytes dengan belasan lembar kerja yang sering sekali mengalami lag dan crash. Di lapangan terjadi antrean panjang hingga 20 menit per mahasiswa, ketidakcocokan ukuran pakaian yang memicu penumpukan dead-stock, serta kerentanan klaim ganda. Mari kita lihat bagaimana rantai pasok ini bekerja." """)

# ==========================================
# SLIDE 2: OUR TEAM (NIRWANA DEVELOPMENT TEAM)
# ==========================================
s2 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s2, "Profil Tim Pengembang",
             "Our Team • Nirwana Development Team",
             "Kolaborasi lintas disiplin dalam perancangan arsitektur, rekayasa kode, dan tata kelola platform UniStock")

team_members = [
    {
        "name": "Ferry Noer Hendriawan",
        "role": "Frontend Developer",
        "desc": "Blade + Tailwind • Responsive UI • Scanner Client",
        "img": "assets/team/ferry.jpg",
        "col": 0, "row": 0, "is_pm": False
    },
    {
        "name": "Fhazar Raffiful Aqyla",
        "role": "Project Manager",
        "desc": "Scrum Master • Product Roadmap • SCM Strategy",
        "img": "assets/team/fhazar.jpg",
        "col": 1, "row": 0, "is_pm": True
    },
    {
        "name": "Hildan Anugrah Tamadi Putra",
        "role": "Backend Developer",
        "desc": "Laravel 12 • FIFO Engine • Pessimistic Lock",
        "img": "assets/team/hildan.png",
        "col": 2, "row": 0, "is_pm": False
    },
    {
        "name": "Fadel Rahmadhan",
        "role": "Quality Assurance",
        "desc": "Blackbox Testing • Stress Load • Anti-Double Claim",
        "img": "assets/team/fadel.png",
        "col": 0, "row": 1, "is_pm": False
    },
    {
        "name": "Daffa Nazriel Zaidan",
        "role": "UI/UX Designer",
        "desc": "Neo-Brutalist Design • Student Flow • Usability Test",
        "img": "assets/team/daffa.jpg",
        "col": 1, "row": 1, "is_pm": False
    },
    {
        "name": "Acep Ugan Saputra",
        "role": "System Analyst",
        "desc": "BPMN Process • Relational Database • SCM Audit Trail",
        "img": "assets/team/acep.png",
        "col": 2, "row": 1, "is_pm": False
    }
]

col_x = [0.8, 4.78, 8.76]
row_y = [1.55, 4.25]
card_w = 3.75
card_h = 2.5

for m in team_members:
    x = col_x[m["col"]]
    y = row_y[m["row"]]

    # Card Background
    card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(card_w), Inches(card_h))
    card.fill.solid()
    card.fill.fore_color.rgb = C_RED_BG if m["is_pm"] else C_CARD_BG
    card.line.color.rgb = C_RED if m["is_pm"] else C_BORDER
    card.line.width = Pt(1.5)

    # Member Circular Photo
    pic_size = 1.05
    pic_x = x + (card_w - pic_size) / 2
    pic_y = y + 0.15
    if os.path.exists(m["img"]):
        s2.shapes.add_picture(m["img"], Inches(pic_x), Inches(pic_y), Inches(pic_size), Inches(pic_size))

    # Name Pill Box
    pill_w = 3.2
    pill_h = 0.32
    pill_x = x + (card_w - pill_w) / 2
    pill_y = y + 1.28
    pill = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(pill_x), Inches(pill_y), Inches(pill_w), Inches(pill_h))
    pill.fill.solid()
    pill.fill.fore_color.rgb = C_RED
    pill.line.color.rgb = C_BORDER
    pill.line.width = Pt(1)
    tf_p = pill.text_frame
    tf_p.word_wrap = False
    tf_p.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_p.margin_left = tf_p.margin_right = tf_p.margin_top = tf_p.margin_bottom = 0
    p_n = tf_p.paragraphs[0]
    p_n.text = m["name"].upper()
    p_n.font.name = FONT_TITLE
    p_n.font.size = Pt(8.5)
    p_n.font.bold = True
    p_n.font.color.rgb = C_WHITE
    p_n.alignment = PP_ALIGN.CENTER

    # Role & Subtext
    text_box = s2.shapes.add_textbox(Inches(x + 0.1), Inches(y + 1.63), Inches(card_w - 0.2), Inches(0.75))
    tf_t = text_box.text_frame
    tf_t.word_wrap = True
    tf_t.margin_left = tf_t.margin_right = tf_t.margin_top = tf_t.margin_bottom = 0

    p_r = tf_t.paragraphs[0]
    p_r.text = m["role"]
    p_r.font.name = FONT_TITLE
    p_r.font.size = Pt(10)
    p_r.font.bold = True
    p_r.font.color.rgb = C_RED if m["is_pm"] else C_TEXT_DARK
    p_r.alignment = PP_ALIGN.CENTER
    p_r.space_after = Pt(2)

    p_d = tf_t.add_paragraph()
    p_d.text = m["desc"]
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(8.5)
    p_d.font.color.rgb = RGBColor(100, 116, 139)
    p_d.alignment = PP_ALIGN.CENTER

set_notes(s2, """NASKAH BACA PRESENTER SLIDE 2 (Target: 00:45 Menit):
"Pada Slide 2, izinkan kami memperkenalkan 6 anggota Tim Nirwana yang memiliki spesialisasi peran masing-masing dalam membangun UniStock:

1. Fhazar Raffiful Aqyla sebagai Project Manager, memimpin perumusan roadmap produk dan keselarasan strategi rantai pasok.
2. Ferry Noer Hendriawan sebagai Frontend Developer, merancang tampilan antarmuka interaktif dan modul scanner posko.
3. Hildan Anugrah Tamadi Putra sebagai Backend Developer, membangun logic Laravel 12, algoritma FIFO, dan concurrency lock.
4. Fadel Rahmadhan sebagai Quality Assurance, menguji ketahanan sistem terhadap skenario double-claim dan stress test transaksi.
5. Daffa Nazriel Zaidan sebagai UI/UX Designer, menyusun prototipe sistem desain Neo-Brutalism yang ergonomis bagi mahasiswa.
6. Acep Ugan Saputra sebagai System Analyst, merancang pemodelan proses bisnis BPMN dan normalisasi basis data relasional.

Dengan sinergi lintas peran inilah kami mentransformasi sistem rantai pasok seragam kampus secara utuh." """)

# ==========================================
# SLIDE 3: SUPPLY CHAIN STRUCTURE
# ==========================================
s3 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s3, "Struktur Rantai Pasok",
             "Pemetaan Stakeholder & Aliran Fisik Barang",
             "Aliran terpadu dari pabrik vendor hingga serah terima mahasiswa dengan prinsip 'Data Mengunci Fisik'")

add_card(s3, 0.8, 1.55, 2.78, 5.25, "01 • Supplier (Hulu)", "Pabrik Garmen & Sepatu", [
    "Memproduksi paket seragam dan sepatu sesuai pesanan pengadaan kampus (PO).",
    "Menerapkan standarisasi kode SKU per kategori dan ukuran.",
    "Titik Barang: Pengiriman kontainer stok ke gudang kampus (Inbound Logistics)."
], "Aliran: PO Agregat ➔ Fisik Masuk")

add_card(s3, 3.78, 1.55, 2.78, 5.25, "02 • Gudang (Inbound)", "Gudang Logistik Kampus", [
    "Penerimaan fisik barang (StockReceive) dan pemeriksaan mutu (QC).",
    "Pencatatan batch urutan FIFO (First-In, First-Out) dan penetapan harga beli unit.",
    "Titik Barang: Transfer stok batch tertua menuju posko distribusi loket."
], "Aliran: Inbound ➔ POS Loket")

add_card(s3, 6.76, 1.55, 2.78, 5.25, "03 • Verifikator & Loket", "Staf Keuangan & Posko", [
    "Keuangan: Otorisasi status pelunasan biaya kuliah mahasiswa (Eligibility).",
    "Staf Posko: Melayani meja pembagian fisik seragam di posko kampus.",
    "Titik Kritis: Validasi identitas QR Code dan pencocokan ukuran saat proses fitting."
], "Aliran: Data Lunas ➔ Serah Fisik", is_highlight=True)

add_card(s3, 9.74, 1.55, 2.78, 5.25, "04 • Konsumen (Hilir)", "Mahasiswa (Customer)", [
    "Konsumen akhir yang memiliki hak jatah barang (Entitlement) sesuai prodi.",
    "Mengisi profil ukuran mandiri di web dan menerima tiket jadwal pembagian.",
    "Titik Info: Menunjukkan tiket QR Code beresolusi tinggi (NIM murni) di loket."
], "Aliran: Profil ➔ Seragam Pas")

set_notes(s3, """NASKAH BACA PRESENTER SLIDE 3 (Target: 01:15 Menit):
"Masuk ke Slide 3 mengenai Struktur Rantai Pasok. Rantai pasok HorizonU Uniform menghubungkan empat entitas stakeholder secara closed-loop:

Pertama, di sisi Hulu (Supplier), terdapat Pabrik Garmen dan Sepatu yang memproduksi barang sesuai Purchase Order agregat kampus.
Kedua, Gudang Logistik Kampus, yang bertindak sebagai distributor internal untuk memeriksa fisik, mencatat penerimaan batch, dan memberi nomor urut FIFO.
Ketiga, Departemen Keuangan dan Staf Posko, yang bertugas memvalidasi status kelayakan pelunasan biaya serta melayani serah terima barang di loket.
Dan keempat, di sisi Hilir (Customer), adalah Mahasiswa yang memiliki kuota hak barang sesuai prodinya.

Prinsip dasar yang kami tanamkan adalah: 'Data Mengunci Fisik'. Artinya, seragam fisik di meja loket pantang keluar sebelum sistem memindai QR Code mahasiswa dan memastikan hak kuota serta status pembayarannya sah." """)

# ==========================================
# SLIDE 4: PROBLEM ANALYSIS
# ==========================================
s4 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s4, "Analisis Masalah Sistem Lama",
             "Evaluasi Kendala Operasional & Dampak Sistemik",
             "Analisis akar masalah pengelolaan manual terhadap pembengkakan biaya, waktu kerja, dan penurunan mutu layanan")

t_s4 = s4.shapes.add_table(5, 3, Inches(0.8), Inches(1.55), Inches(11.733), Inches(5.25)).table
t_s4.columns[0].width = Inches(3.2)
t_s4.columns[1].width = Inches(4.2)
t_s4.columns[2].width = Inches(4.333)

for i, h in enumerate(["Masalah Utama (Gejala Lapangan)", "Akar Penyebab Masalah (Root Cause)", "Dampak terhadap Biaya, Waktu, Stok & Layanan"]):
    c = t_s4.cell(0, i)
    c.fill.solid()
    c.fill.fore_color.rgb = C_RED
    p = c.text_frame.paragraphs[0]
    p.text = h
    p.font.name = FONT_TITLE
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_WHITE

rows_s4 = [
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

for r_i, (m, p_c, d) in enumerate(rows_s4):
    bg = C_RED_BG if r_i % 2 == 1 else C_CARD_BG
    for c_i, val in enumerate([m, p_c, d]):
        c = t_s4.cell(r_i + 1, c_i)
        c.fill.solid()
        c.fill.fore_color.rgb = bg
        p = c.text_frame.paragraphs[0]
        p.text = val
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        p.font.color.rgb = C_RED if c_i == 0 else C_TEXT_DARK
        if c_i == 0: p.font.bold = True

set_notes(s4, """NASKAH BACA PRESENTER SLIDE 4 (Target: 01:30 Menit):
"Pada Slide 4, kami membedah empat akar masalah utama melalui tabel hubungan Masalah, Penyebab, dan Dampak sistemik:

Masalah Pertama: Ketidakcocokan ukuran dan penumpukan dead-stock. Penyebabnya adalah pemesanan ke vendor hanya berbasis estimasi historis tanpa survey ukuran mandiri mahasiswa. Dampaknya, ukuran favorit habis seketika, ukuran ekstrem menumpuk bertahun-tahun, dan dana kampus tertahan.

Masalah Kedua: Ketergantungan pada lembar kerja Excel raksasa yang sering crash saat mengolah ribuan data maba, ditambah broadcast jadwal dikirim manual per surel. Dampaknya waktu kerja staf terbuang berminggu-minggu dan informasi jadwal terlambat diterima mahasiswa.

Masalah Ketiga: Kemacetan parah di loket posko karena verifikasi lunas dan pencatatan dilakukan manual di atas kertas. Dampaknya antrean meliuk ratusan meter dengan waktu layan hingga 15-20 menit per orang, serta rawan klaim ganda.

Masalah Keempat: Penyusutan stok tanpa jejak audit karena pencampuran barang antar-pembelian tanpa kaidah FIFO, sehingga nilai HPP dan laba kotor tidak dapat dihitung akurat." """)

# ==========================================
# SLIDE 5: INFORMATION FLOW ANALYSIS
# ==========================================
s5 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s5, "Analisis Aliran Informasi",
             "Titik Kemacetan & Isolasi Data (As-Is State)",
             "Hambatan komunikasi antarbagian yang memicu keterlambatan, inkonsistensi data, dan pembatalan layanan")

add_card(s5, 0.8, 1.55, 5.75, 2.55, "Aliran 01 • Mahasiswa ➔ Kampus", "Kebutuhan: Profil Ukuran & Jadwal", [
    "Asal & Tujuan: Mahasiswa mengisi form ke kampus dan menerima jadwal pembagian via email.",
    "Titik Masalah: Google Form terpisah tanpa validasi SKU baku, memicu input ganda dan rekapitulasi data staf terlambat berminggu-minggu."
], "Kondisi: Informasi Terlambat & Format Liar")

add_card(s5, 6.78, 1.55, 5.75, 2.55, "Aliran 02 • Keuangan ➔ Posko Hari-H", "Kebutuhan: Status Lunas (Eligibility)", [
    "Asal & Tujuan: Staf Keuangan mengekspor data lunas ke staf meja posko pembagian seragam.",
    "Titik Masalah: Data terisolasi di file Excel lokal staf. Saat ada pelunasan baru di bank pada hari-H, staf posko tidak terupdate sehingga maba tertolak."
], "Kondisi: Informasi Terputus (Silo Data Lokal)", is_highlight=True)

add_card(s5, 0.8, 4.25, 5.75, 2.55, "Aliran 03 • Meja Posko ➔ Gudang", "Kebutuhan: Kuota Hak & Kartu Mutasi", [
    "Asal & Tujuan: Staf posko memverifikasi paket hak prodi dan mencatat mutasi seragam yang keluar.",
    "Titik Masalah: Penyerahan seragam dicatat di lembaran kertas. Pengurangan saldo stok gudang baru direkap malam hari, memicu risiko susut stok."
], "Kondisi: Informasi Terlambat (Paper-Based Tracking)")

add_card(s5, 6.78, 4.25, 5.75, 2.55, "Aliran 04 • Pengadaan ➔ Pabrik", "Kebutuhan: Purchase Order Agregat", [
    "Asal & Tujuan: Pengadaan kampus mengirim rincian jumlah potong seragam dan sepatu ke pabrik.",
    "Titik Masalah: Purchase Order ke pabrik hanya estimasi kasar tanpa dasar profil data riil maba, memicu lead-time penukaran barang berbulan-bulan."
], "Kondisi: Informasi Tidak Akurat (Blind Ordering)")

set_notes(s5, """NASKAH BACA PRESENTER SLIDE 5 (Target: 01:15 Menit):
"Selanjutnya pada Slide 5, kami memetakan Analisis Aliran Informasi pada kondisi As-Is dan titik-titik kemacetannya:

Pada Aliran 1 dari Mahasiswa ke Kampus, data ukuran diisi via formulir acak tanpa validasi SKU baku, sehingga rekapitulasi data terlambat dan penuh duplikasi.
Pada Aliran 2 dari Keuangan ke Posko, data pelunasan terisolasi di laptop staf finance. Saat mahasiswa baru saja melunasi di bank pada hari-H, staf posko tidak mengetahuinya karena data belum tersinkronisasi.
Pada Aliran 3 di meja posko, pencatatan serah terima memakai kertas checklist yang baru direkap malam hari, memicu celah barang hilang dan manipulasi.
Dan pada Aliran 4 ke pabrik vendor, order produksi dibuat berdasar tebakan kasar sehingga waktu tunggu revisi ukuran memakan waktu berbulan-bulan.

Kesimpulannya, terjadi silo data dan keterlambatan informasi akut yang melumpuhkan efisiensi." """)

# ==========================================
# SLIDE 6: RECOMMENDED INFORMATION SYSTEMS
# ==========================================
s6 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s6, "Rekomendasi Sistem Terpadu",
             "Pemilihan Arsitektur Sistem Informasi (UniStock Engine)",
             "Integrasi empat pilar sistem: ERP, SCM, POS, dan WMS dalam satu platform web modern")

t_s6 = s6.shapes.add_table(5, 4, Inches(0.8), Inches(1.55), Inches(11.733), Inches(5.25)).table
t_s6.columns[0].width = Inches(2.5)
t_s6.columns[1].width = Inches(2.9)
t_s6.columns[2].width = Inches(4.1)
t_s6.columns[3].width = Inches(2.233)

for i, h in enumerate(["Masalah yang Diselesaikan", "Sistem & Modul Terpilih", "Fungsi Sistem dalam Kasus", "Manfaat Nyata Terukur"]):
    c = t_s6.cell(0, i)
    c.fill.solid()
    c.fill.fore_color.rgb = C_RED
    p = c.text_frame.paragraphs[0]
    p.text = h
    p.font.name = FONT_TITLE
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_WHITE

rows_s6 = [
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

for r_i, (m, sys, fn, ben) in enumerate(rows_s6):
    bg = C_RED_BG if r_i % 2 == 1 else C_CARD_BG
    for c_i, val in enumerate([m, sys, fn, ben]):
        c = t_s6.cell(r_i + 1, c_i)
        c.fill.solid()
        c.fill.fore_color.rgb = bg
        p = c.text_frame.paragraphs[0]
        p.text = val
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        p.font.color.rgb = C_RED if c_i == 0 else C_TEXT_DARK
        if c_i == 0: p.font.bold = True

set_notes(s6, """NASKAH BACA PRESENTER SLIDE 6 (Target: 01:30 Menit):
"Untuk mengatasi persoalan tersebut, pada Slide 6 kami merekomendasikan empat subsistem terpadu di dalam arsitektur HorizonU Uniform (UniStock):

1. ERP Master & Entitlement Engine: Berfungsi menggantikan Excel dengan basis data relasional MySQL InnoDB terstruktur, mengelola kuota hak per program studi, dan mengunci integritas transaksi. Manfaatnya: 100% bebas kendala Excel rusak.

2. SCM Demand Planning Portal: Membuka portal mandiri bagi mahasiswa untuk mengisi ukuran baju dan sepatu sebelum produksi, serta menghitung kalkulasi demand vs shortage secara otomatis. Manfaatnya: Zero dead-stock dan pengadaan pabrik tepat sasaran.

3. POS QR Verification Engine: Menghasilkan QR Code instan berbasis NIM dan mengeksekusi 6-Lapis Validasi otomatis melalui kamera webcam posko. Manfaatnya: Memangkas waktu layan menjadi di bawah 30 detik dan nol risiko klaim ganda.

4. WMS & FIFO Inventory Costing Engine: Mengatur pemotongan mutasi dari batch pembelian tertua secara FIFO, rekonsiliasi stock opname fisik, serta perhitungan valuasi HPP dan margin laba secara presisi." """)

# ==========================================
# SLIDE 7: PROPOSED SOLUTION DESIGN
# ==========================================
s7 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s7, "Desain Arsitektur Solusi",
             "Aliran 4-Fase Closed-Loop Supply Chain Engine",
             "Konektivitas sistem end-to-end, pemrosesan transaksi atomik, dan closed-loop data feedback")

add_card(s7, 0.8, 1.55, 2.78, 5.25, "Fase 1 • Hulu (Inbound)", "Inbound & Batch FIFO", [
    "Pencatatan barang dari vendor garmen pada modul StockReceive.",
    "Sistem menerbitkan ID batch terurut (FIFO Queue Sequence).",
    "Pencatatan otomatis jurnal mutasi masuk (StockMovement IN) dan penetapan unit HPP batch."
], "Output: Batch FIFO Terdaftar")

add_card(s7, 3.78, 1.55, 2.78, 5.25, "Fase 2 • Demand (Planning)", "Eligibility & Profiling", [
    "Keuangan mengaktifkan data mahasiswa lunas di EligibilityRecord.",
    "Mahasiswa input profil ukuran badan mandiri di event portal.",
    "Sistem menghitung Demand vs Shortage untuk acuan belanja pengadaan vendor."
], "Output: QR Code & Jadwal Aktif")

add_card(s7, 6.76, 1.55, 2.78, 5.25, "Fase 3 • Hilir (Outbound)", "POS QR & 6-Lapis Validasi", [
    "Staf memindai QR NIM mahasiswa di loket posko kampus.",
    "Eksekusi 6-Lapis Validasi Atomik via pessimistic lock (lockForUpdate).",
    "Pemotongan batch tertua otomatis (deductStockFifo) dan cetak tiket serah terima fisik."
], "Output: Seragam Diterima Pas", is_highlight=True)

add_card(s7, 9.74, 1.55, 2.78, 5.25, "Fase 4 • Kontrol (Audit)", "Opname & Closed-Loop", [
    "Stock Opname fisik berkala menghitung selisih variance otomatis.",
    "Penerbitan jurnal penyesuaian susut/surplus stok gudang.",
    "Generate analitik Gross Profit Margin (GPM) dan laporan sisa stok untuk pimpinan."
], "Output: Feedback Siklus Baru")

set_notes(s7, """NASKAH BACA PRESENTER SLIDE 7 (Target: 01:25 Menit):
"Pada Slide 7, kami tampilkan Desain Arsitektur Solusi yang bekerja dalam 4 Fase Tertutup (Closed-Loop Engine):

Fase 1 (Inbound): Saat barang dari pabrik tiba, staf gudang mencatatnya pada modul StockReceive, menetapkan batch FIFO, dan mencatat unit HPP pembelian.

Fase 2 (Planning): Departemen Keuangan mengaktifkan status lunas di Eligibility Record, mahasiswa mengisi profil ukuran di portal, dan sistem mengalokasikan paket hak barang.

Fase 3 (Outbound): Di posko hari-H, staf memindai QR Code mahasiswa. Sistem mengeksekusi 6-lapis validasi menggunakan teknik pessimistic locking, memotong stok batch tertua, dan menyerahkan seragam.

Fase 4 (Audit & Control): Stock opname fisik berkala menghitung selisih varians, dan sistem menerbitkan laporan Gross Profit Margin.

Data sisa stok dan tren ukuran dari Fase 4 ini secara otomatis menjadi acuan belanja pengadaan Fase 1 pada semester berikutnya, menutup siklus rantai pasok secara sempurna." """)

# ==========================================
# SLIDE 8: IMPLEMENTATION AND RISKS
# ==========================================
s8 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s8, "Rencana Penerapan & Mitigasi",
             "Prioritas Implementasi & Manajemen Risiko Lapangan",
             "Tahapan kesiapan operasional serta prosedur kontingensi darurat saat hari-H distribusi")

add_card(s8, 0.8, 1.55, 3.75, 5.25, "3 Prioritas Implementasi", "Tahapan Kesiapan Sistem", [
    "Prioritas 1 (Master Data): Pembersihan data lama, pembuatan skema SKU 5-segmen, impor data mahasiswa, dan konfigurasi hak seragam prodi.",
    "Prioritas 2 (Integrasi Portal): Integrasi status lunas Keuangan (Eligibility), pembukaan jendela waktu pengisian profil ukuran maba, dan rilis jadwal.",
    "Prioritas 3 (Kesiapan SDM): Pelatihan teknis staf posko memakai scanner webcam, prosedur fitting ukuran, dan drill skenario darurat."
], "Roadmap: 6 Minggu Implementasi Penuh")

add_card(s8, 4.78, 1.55, 7.75, 5.25, "3 Risiko Lapangan & Cara Mitigasi", "SOP Kontingensi Hari-H Posko", [
    "RISIKO 1 (Baterai HP Mati / QR Rusak): Fallback Search manual via NIM atau Nama langsung memanggil profil hak seketika.",
    "RISIKO 2 (Ukuran Rak Habis / Fitting Beda): Fitur Partial Pickup serahkan barang yang tersedia tanpa menghanguskan sisa hak.",
    "RISIKO 3 (Jaringan Internet Kampus Lambat): Pessimistic Row Locking (lockForUpdate) dan idempotensi menjamin nol pemotongan ganda."
], "Toleransi Kesalahan: Resiliensi Operasional Tinggi", is_highlight=True)

set_notes(s8, """NASKAH BACA PRESENTER SLIDE 8 (Target: 01:15 Menit):
"Masuk ke Slide 8 mengenai Prioritas Implementasi dan Mitigasi Risiko Lapangan.

Kami membagi tahapan implementasi menjadi 3 prioritas: Prioritas 1 adalah standarisasi master data dan SKU; Prioritas 2 adalah sinkronisasi status keuangan dan pembukaan portal ukuran; dan Prioritas 3 adalah pelatihan staf loket serta simulasi antrean posko.

Kami juga telah merancang solusi atas 3 risiko darurat nyata di lapangan:
Pertama, jika baterai HP mahasiswa mati atau tidak membawa QR, staf posko dapat menggunakan fitur fallback search manual via NIM.
Kedua, jika stok ukuran di rak habis saat fitting, sistem mendukung fitur Partial Pickup di mana barang yang ada diserahkan tanpa menghanguskan sisa hak mahasiswa.
Ketiga, jika koneksi internet kampus fluktuatif, database diproteksi oleh pessimistic row locking agar tidak terjadi pengurangan stok ganda." """)

# ==========================================
# SLIDE 9: CONCLUSION AND BENEFITS
# ==========================================
s9 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s9, "Kesimpulan & Hasil Terukur",
             "Dampak Strategis & Manfaat Nyata Implementasi",
             "Transformasi operasional Departemen Keuangan Universitas Horizon Indonesia pasca-digitalisasi")

add_card(s9, 0.8, 1.55, 3.75, 5.25, "Manfaat 01 • Efisiensi Waktu", "< 30 Detik per Mahasiswa", [
    "Memangkas waktu layanan loket dari yang sebelumnya 15–20 menit per mahasiswa menjadi di bawah 30 detik.",
    "Pemindaian QR Code instan berbasis NIM dan eksekusi 6-lapis validasi otomatis.",
    "Mengeliminasi antrean panjang yang berdesakan di posko kampus setiap awal tahun ajaran baru."
], "Dampak: Pelayanan Mahasiswa Cepat & Nyaman", is_highlight=True)

add_card(s9, 4.78, 1.55, 3.75, 5.25, "Manfaat 02 • Akurasi Inventaris", "Zero (0) Dead-Stock", [
    "Profiling ukuran mandiri oleh mahasiswa sebelum tender vendor garmen dibuka.",
    "Kalkulasi Demand vs Shortage otomatis memastikan pesanan pabrik selaras 100% dengan kebutuhan tubuh riil mahasiswa.",
    "Tidak ada lagi seragam berukuran ekstrem yang mengendap bertahun-tahun di gudang."
], "Dampak: Optimalisasi Modal Kerja Kampus")

add_card(s9, 8.76, 1.55, 3.75, 5.25, "Manfaat 03 • Akuntabilitas Biaya", "100% Valuasi FIFO Real-Time", [
    "Mengeliminasi ketergantungan pada spreadsheet Excel raksasa yang rawan rusak atau korup.",
    "Seluruh pergerakan stok dicatat otomatis ke kartu mutasi persediaan berbasis urutan batch FIFO.",
    "Laporan Harga Pokok Penjualan (HPP) dan Gross Profit Margin (GPM) tersedia secara transparan bagi pimpinan."
], "Dampak: Audit Trail Keuangan Bebas Selisih")

set_notes(s9, """NASKAH BACA PRESENTER SLIDE 9 (Target: 00:55 Menit):
"Sebagai penutup pada Slide 9, implementasi HorizonU Uniform menghadirkan 3 manfaat nyata dan terukur:

1. Efisiensi Waktu: Waktu pelayanan posko berhasil dipangkas dari 15–20 menit menjadi di bawah 30 detik per mahasiswa.
2. Akurasi Persediaan: Mewujudkan target Zero Dead-Stock karena pengadaan pabrik 100% selaras dengan ukuran tubuh riil mahasiswa.
3. Akuntabilitas Biaya: Menghilangkan kerentanan crash Excel dengan sistem penilaian inventaris berbasis FIFO dan analitik Gross Profit Margin real-time.

Statement akhir kami: Sistem Informasi bukan sekadar alat pencatat administrasi, melainkan saraf penggerak utama rantai pasok yang mengunci fisik barang dengan kepatuhan finansial, serta mengubah tebakan manual menjadi keputusan bisnis berakurasi tinggi.

Sekian presentasi dari Tim Nirwana. Kami siap menerima pertanyaan dari Dewan Juri. Terima kasih." """)

prs.save("HorizonU_Uniform_UniStock_SCM_Presentasi_Technospark.pptx")
print("Clean executive 9-slide PPTX successfully created!")
