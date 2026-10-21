# -*- coding: utf-8 -*-
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

C_MAROON_DARK = RGBColor(88, 11, 19)
C_MAROON_MAIN = RGBColor(107, 15, 26)
C_GOLD        = RGBColor(255, 209, 102)
C_WHITE       = RGBColor(255, 255, 255)
C_BG_LIGHT    = RGBColor(248, 250, 252)
C_TEXT_DARK   = RGBColor(30, 41, 59)
C_TEXT_MUTED  = RGBColor(71, 85, 105)

def apply_header(slide, tag_text, title_text, subtitle_text, is_dark=False):
    bg_color = C_MAROON_DARK if is_dark else C_BG_LIGHT
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = bg_color

    tag_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(0.35), Inches(3.6), Inches(0.35))
    tag_box.fill.solid()
    tag_box.fill.fore_color.rgb = C_GOLD if is_dark else C_MAROON_DARK
    tag_box.line.color.rgb = C_GOLD if is_dark else C_MAROON_DARK
    tf_tag = tag_box.text_frame
    tf_tag.word_wrap = True
    p_tag = tf_tag.paragraphs[0]
    p_tag.text = tag_text.upper()
    p_tag.font.size = Pt(10)
    p_tag.font.bold = True
    p_tag.alignment = PP_ALIGN.CENTER
    p_tag.font.color.rgb = C_MAROON_DARK if is_dark else C_GOLD

    tx_box = slide.shapes.add_textbox(Inches(0.6), Inches(0.75), Inches(12.1), Inches(0.48))
    tf_title = tx_box.text_frame
    tf_title.word_wrap = True
    p_title = tf_title.paragraphs[0]
    p_title.text = title_text
    p_title.font.size = Pt(19)
    p_title.font.bold = True
    p_title.font.color.rgb = C_WHITE if is_dark else C_MAROON_DARK

    tx_sub = slide.shapes.add_textbox(Inches(0.6), Inches(1.22), Inches(12.1), Inches(0.38))
    tf_sub = tx_sub.text_frame
    tf_sub.word_wrap = True
    p_sub = tf_sub.paragraphs[0]
    p_sub.text = subtitle_text
    p_sub.font.size = Pt(11.5)
    p_sub.font.color.rgb = C_GOLD if is_dark else C_TEXT_MUTED

def add_banner(slide, text):
    banner = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.6), Inches(6.35), Inches(12.1), Inches(0.75))
    banner.fill.solid()
    banner.fill.fore_color.rgb = C_MAROON_DARK
    banner.line.color.rgb = C_GOLD
    banner.line.width = Pt(1.5)
    tf = banner.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_WHITE

def add_card(slide, x, y, w, h, head_text, title_text, body_text):
    card = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    card.fill.solid()
    card.fill.fore_color.rgb = C_WHITE
    card.line.color.rgb = C_MAROON_MAIN
    card.line.width = Pt(1.5)

    head = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(0.38))
    head.fill.solid()
    head.fill.fore_color.rgb = C_MAROON_DARK
    head.line.fill.background()
    p_head = head.text_frame.paragraphs[0]
    p_head.text = head_text
    p_head.font.size = Pt(9.5)
    p_head.font.bold = True
    p_head.font.color.rgb = C_GOLD

    body_box = slide.shapes.add_textbox(Inches(x + 0.12), Inches(y + 0.42), Inches(w - 0.24), Inches(h - 0.5))
    tf = body_box.text_frame
    tf.word_wrap = True
    p_t = tf.paragraphs[0]
    p_t.text = title_text
    p_t.font.size = Pt(12.5)
    p_t.font.bold = True
    p_t.font.color.rgb = C_MAROON_DARK

    p_b = tf.add_paragraph()
    p_b.text = body_text
    p_b.font.size = Pt(10.5)
    p_b.font.color.rgb = C_TEXT_DARK

def set_notes(slide, notes_text):
    notes_slide = slide.notes_slide
    tf = notes_slide.notes_text_frame
    tf.text = notes_text

# SLIDE 1
s1 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s1, 'Slide 1 • Case Introduction', 'HORIZONU UNIFORM (UNISTOCK SCM) — TRANSFORMASI LOGISTIK KAMPUS', 'Sistem Persediaan dan Distribusi Seragam Terpusat Berbasis Closed-Loop SCM pada Departemen Keuangan Universitas Horizon Indonesia', True)
add_card(s1, 0.6, 1.7, 3.8, 4.4, '01 • PROFIL BISNIS & INDUSTRI', 'Logistik Pendidikan Kampus', 'Departemen Keuangan Universitas Horizon Indonesia mengelola pengadaan dan distribusi seragam, sepatu lab, dan medical kits mahasiswa baru.\n\nModel bisnis: Direct Closed-Loop Campus Supply Chain.')
add_card(s1, 4.75, 1.7, 3.8, 4.4, '02 • MASALAH UTAMA AS-IS', 'Spreadsheet Crash & Antrean', 'File Excel induk 4.5 MB sering lag/crash saat ribuan mahasiswa mendaftar.\n\nTerjadi antrean 15-20 menit/orang, size mismatch memicu dead-stock, dan rawan klaim ganda di loket.')
add_card(s1, 8.9, 1.7, 3.8, 4.4, '03 • NAMA PRESENTER (NIRWANA)', 'Tim Analis & Pengembang', '• Fhazar Raffiful Aqyla (Project Manager)\n• Ferry Noer Hendriawan (Frontend)\n• Hildan Anugrah Tamadi Putra (Backend)\n• Fadel Rahmadhan (QA)\n• Daffa Nazriel Zaidan (UI/UX)\n• Acep Ugan Saputra (System Analyst)\n\nLive URL: unistok.nirwana.biz.id')
add_banner(s1, 'Misi Solusi UniStock: Menyatukan Hulu (Pabrik Vendor), Gudang Kampus, Keuangan, hingga Hilir (Mahasiswa) dalam satu arsitektur terintegrasi.')
set_notes(s1, """NASKAH PRESENTASI SLIDE 1 (Target: 01:10 Menit):
"Selamat pagi/siang Yang Terhormat Bapak/Ibu Dosen Penguji dan Dewan Juri Technospark. Kami dari Tim Nirwana, beranggotakan Fhazar, Ferry, Hildan, Fadel, Daffa, dan Acep. Hari ini kami mempresentasikan analisis dan solusi sistem informasi rantai pasok terpadu bertajuk: HorizonU Uniform, dengan engine sistem bernama UniStock.

Studi kasus kami berfokus pada Departemen Keuangan Universitas Horizon Indonesia, yang bertanggung jawab atas pengadaan dan distribusi ribuan paket seragam kuliah, jas almamater, sepatu laboratorium, hingga perlengkapan medis mahasiswa baru setiap tahunnya.

Sebelum UniStock dibangun, pengelolaan dilakukan manual memakai spreadsheet Excel induk sebesar 4.5 Megabytes dengan belasan lembar kerja yang sering sekali mengalami lag dan crash. Di lapangan terjadi antrean panjang hingga 20 menit per mahasiswa, ketidakcocokan ukuran pakaian yang memicu penumpukan dead-stock, serta kerentanan klaim ganda. Mari kita lihat bagaimana rantai pasok ini bekerja.\"""")

# SLIDE 2
s2 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s2, 'Slide 2 • Supply Chain Structure', 'STRUKTUR RANTAI PASOK: STAKEHOLDER, ALIRAN FISIK & INFORMASI', 'Pemetaan peran stakeholder end-to-end dari hulu ke hilir serta titik kritis perpindahan barang dan otorisasi data.', False)
add_card(s2, 0.6, 1.7, 2.85, 4.4, '01 • SUPPLIER (HULU)', 'Vendor Pabrik', 'Memproduksi paket seragam dan sepatu sesuai PO agregat kampus dengan kode SKU terstandarisasi.\n\nTitik Barang: Pengiriman kontainer ke gudang kampus.')
add_card(s2, 3.68, 1.7, 2.85, 4.4, '02 • GUDANG (INBOUND)', 'Gudang Kampus', 'Penerimaan stok (StockReceive), penomoran batch FIFO, dan transfer barang ke posko loket.\n\nTitik Barang & Info: Generate StockMovement dan batch tertua.')
add_card(s2, 6.76, 1.7, 2.85, 4.4, '03 • KEUANGAN & POSKO', 'Keuangan & Staf Posko', 'Keuangan otorisasi status pelunasan (Eligibility). Posko memindai QR Code dan serah terima seragam fisik.\n\nTitik Kritis: Validasi hak dan fitting.')
add_card(s2, 9.85, 1.7, 2.85, 4.4, '04 • CUSTOMER (HILIR)', 'Mahasiswa', 'Mengisi profil ukuran mandiri di web, menerima jadwal pembagian, dan klaim fisik via identitas QR Code.\n\nTitik Info: Tiket QR Code beresolusi tinggi.')
add_banner(s2, 'Prinsip Inti "Data Mengunci Fisik": Barang fisik pantang diserahkan tanpa otorisasi digital. Scan QR Code memvalidasi kelayakan bayar dan memotong stok FIFO terlama.')
set_notes(s2, """NASKAH PRESENTASI SLIDE 2 (Target: 01:15 Menit):
"Masuk ke Slide 2 mengenai Struktur Rantai Pasok. Rantai pasok HorizonU Uniform menghubungkan empat entitas stakeholder secara closed-loop:

Pertama, di sisi Hulu (Supplier), terdapat Pabrik Garmen dan Sepatu yang memproduksi barang sesuai Purchase Order agregat kampus.
Kedua, Gudang Logistik Kampus, yang bertindak sebagai distributor internal untuk memeriksa fisik, mencatat penerimaan batch, dan memberi nomor urut FIFO.
Ketiga, Departemen Keuangan dan Staf Posko, yang bertugas memvalidasi status kelayakan pelunasan biaya serta melayani serah terima barang di loket.
Dan keempat, di sisi Hilir (Customer), adalah Mahasiswa yang memiliki kuota hak barang sesuai prodinya.

Prinsip dasar yang kami tanamkan adalah: 'Data Mengunci Fisik'. Artinya, seragam fisik di meja loket pantang keluar sebelum sistem memindai QR Code mahasiswa dan memastikan hak kuota serta status pembayarannya sah.\"""")

# SLIDE 3
s3 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s3, 'Slide 3 • Problem Analysis', 'ANALISIS AKAR MASALAH: MENGAPA SISTEM MANUAL GAGAL?', 'Tabel terstruktur menganalisis empat akar masalah utama serta dampaknya terhadap biaya, waktu, stok, dan mutu pelayanan.', False)
rows, cols = 5, 3
table_shape = s3.shapes.add_table(rows, cols, Inches(0.6), Inches(1.7), Inches(12.1), Inches(4.4))
table = table_shape.table
table.columns[0].width = Inches(3.2)
table.columns[1].width = Inches(4.4)
table.columns[2].width = Inches(4.5)

headers = ['Masalah Utama (Gejala)', 'Analisis Akar Penyebab (Root Cause)', 'Dampak terhadap Biaya, Waktu, Stok & Pelayanan']
for c_idx, h_text in enumerate(headers):
    cell = table.cell(0, c_idx)
    cell.fill.solid()
    cell.fill.fore_color.rgb = C_MAROON_DARK
    p = cell.text_frame.paragraphs[0]
    p.text = h_text
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = C_GOLD

data_s3 = [
    ('1. Ketidakcocokan Ukuran & Dead-Stock', 'Pemesanan ke pabrik hanya estimasi historis tanpa survey ukuran mandiri mahasiswa sebelum tender.', 'Ukuran populer (M/L) ludes hari pertama, ukuran ekstrem menumpuk bertahun-tahun. Modal kampus mengendap jadi dead-stock.'),
    ('2. Excel Crash & Broadcast Lambat', 'Menggunakan spreadsheet Excel induk (~4.5 MB) dan broadcast jadwal dikirim manual per email.', 'Aplikasi sering not responding, rekap data berminggu-minggu, mahasiswa terlambat mengetahui sesi pengambilan.'),
    ('3. Bottleneck Loket & Double-Claim', 'Validasi lunas dan checklist serah terima masih menggunakan formulir kertas manual.', 'Waktu layan sangat lambat (15-20 menit/orang), antrean berjam-jam, serta rawan klaim ganda di loket/hari berbeda.'),
    ('4. Susut Stok Liar & HPP Buram', 'Penerimaan barang berbeda harga tidak dicatat per batch FIFO dan tanpa kartu stok otomatis.', 'Selisih barang hilang tidak terlacak penanggungjawabnya, valuasi HPP dan laba kotor (GPM) terdistorsi.')
]
for r_idx, row_data in enumerate(data_s3):
    for c_idx, val in enumerate(row_data):
        cell = table.cell(r_idx + 1, c_idx)
        cell.fill.solid()
        cell.fill.fore_color.rgb = RGBColor(253, 244, 245) if r_idx % 2 == 1 else C_WHITE
        p = cell.text_frame.paragraphs[0]
        p.text = val
        p.font.size = Pt(9.5)
        p.font.color.rgb = C_MAROON_DARK if c_idx == 0 else C_TEXT_DARK
        if c_idx == 0: p.font.bold = True

add_banner(s3, 'Akar Kegagalan Sistemik: Ketiadaan Single Source of Truth menyebabkan data silo, inefisiensi hulu-hilir, dan membahayakan akuntabilitas keuangan.')
set_notes(s3, """NASKAH PRESENTASI SLIDE 3 (Target: 01:30 Menit):
"Pada Slide 3, kami membedah empat akar masalah utama melalui tabel hubungan Masalah, Penyebab, dan Dampak sistemik:

Masalah Pertama: Ketidakcocokan ukuran dan penumpukan dead-stock. Penyebabnya adalah pemesanan ke vendor hanya berbasis estimasi historis tanpa survey ukuran mandiri mahasiswa. Dampaknya, ukuran favorit habis seketika, ukuran ekstrem menumpuk bertahun-tahun, dan dana kampus tertahan.

Masalah Kedua: Ketergantungan pada lembar kerja Excel raksasa yang sering crash saat mengolah ribuan data maba, ditambah broadcast jadwal dikirim manual per surel. Dampaknya waktu kerja staf terbuang berminggu-minggu dan informasi jadwal terlambat diterima mahasiswa.

Masalah Ketiga: Kemacetan parah di loket posko karena verifikasi lunas dan pencatatan dilakukan manual di atas kertas. Dampaknya antrean meliuk ratusan meter dengan waktu layan hingga 15-20 menit per orang, serta rawan klaim ganda.

Masalah Keempat: Penyusutan stok tanpa jejak audit karena pencampuran barang antar-pembelian tanpa kaidah FIFO, sehingga nilai HPP dan laba kotor tidak dapat dihitung akurat.\"""")

# SLIDE 4
s4 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s4, 'Slide 4 • Information Flow Analysis', 'DIAGRAM ALIRAN INFORMASI & TITIK KEMACETAN (AS-IS STATE)', 'Identifikasi informasi kebutuhan stakeholder, asal-tujuan data, dan titik kritis informasi terlambat/terputus.', False)
add_card(s4, 0.6, 1.7, 5.85, 2.1, 'ALIRAN 01 • MAHASISWA ➔ KEUANGAN', 'Kebutuhan: Profil Ukuran & Jadwal', 'Asal & Tujuan: Mahasiswa mengisi form ke kampus dan menerima jadwal via email.\nTitik Masalah: Form tidak terstandarisasi, input ganda, dan jadwal terlambat.')
add_card(s4, 6.85, 1.7, 5.85, 2.1, 'ALIRAN 02 • KEUANGAN ➔ POSKO HARI-H', 'Kebutuhan: Status Lunas (Eligibility)', 'Asal & Tujuan: Keuangan mengekspor status bayar mahasiswa ke posko.\nTitik Masalah: Data terisolasi di Excel lokal, posko tidak terupdate jika ada pelunasan baru.')
add_card(s4, 0.6, 4.0, 5.85, 2.1, 'ALIRAN 03 • POSKO ➔ GUDANG & SISWA', 'Kebutuhan: Kuota Hak & Kartu Stok', 'Asal & Tujuan: Posko verifikasi hak paket prodi dan mencatat mutasi stok.\nTitik Masalah: Serah terima dicatat di kertas, mutasi stok terlambat direkap, picu stock shrinkage.')
add_card(s4, 6.85, 4.0, 5.85, 2.1, 'ALIRAN 04 • GUDANG ➔ VENDOR PABRIK', 'Kebutuhan: Purchase Order Agregat', 'Asal & Tujuan: Pengadaan mengirim jumlah seragam/sepatu ke vendor pabrik.\nTitik Masalah: PO hanya estimasi kasar tanpa dasar profil data riil maba.')
add_banner(s4, 'Diagnosa Kunci: Terjadi Information Latency dan Data Asymmetry akut yang menuntut platform web tunggal real-time.')
set_notes(s4, """NASKAH PRESENTASI SLIDE 4 (Target: 01:15 Menit):
"Selanjutnya pada Slide 4, kami memetakan Analisis Aliran Informasi pada kondisi As-Is dan titik-titik kemacetannya:

Pada Aliran 1 dari Mahasiswa ke Kampus, data ukuran diisi via formulir acak tanpa validasi SKU baku, sehingga rekapitulasi data terlambat dan penuh duplikasi.
Pada Aliran 2 dari Keuangan ke Posko, data pelunasan terisolasi di laptop staf finance. Saat mahasiswa baru saja melunasi di bank pada hari-H, staf posko tidak mengetahuinya karena data belum tersinkronisasi.
Pada Aliran 3 di meja posko, pencatatan serah terima memakai kertas checklist yang baru direkap malam hari, memicu celah barang hilang dan manipulasi.
Dan pada Aliran 4 ke pabrik vendor, order produksi dibuat berdasar tebakan kasar sehingga waktu tunggu revisi ukuran memakan waktu berbulan-bulan.

Kesimpulannya, terjadi silo data dan keterlambatan informasi akut yang melumpuhkan efisiensi.\"""")

# SLIDE 5
s5 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s5, 'Slide 5 • Recommended Information Systems', 'REKOMENDASI SISTEM INFORMASI: ARSITEKTUR HORIZONU UNIFORM', 'Pemilihan sistem spesifik (ERP, SCM, POS, WMS), justifikasi pemilihan, fungsi, dan manfaatnya.', False)
rows, cols = 5, 4
table_shape5 = s5.shapes.add_table(rows, cols, Inches(0.6), Inches(1.7), Inches(12.1), Inches(4.4))
table5 = table_shape5.table
table5.columns[0].width = Inches(2.5)
table5.columns[1].width = Inches(3.0)
table5.columns[2].width = Inches(4.2)
table5.columns[3].width = Inches(2.4)

headers5 = ['Masalah Diselesaikan', 'Sistem & Modul Terpilih', 'Fungsi Sistem dalam Kasus', 'Manfaat Terukur']
for c_idx, h_text in enumerate(headers5):
    cell = table5.cell(0, c_idx)
    cell.fill.solid()
    cell.fill.fore_color.rgb = C_MAROON_DARK
    p = cell.text_frame.paragraphs[0]
    p.text = h_text
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = C_GOLD

data_s5 = [
    ('Excel Crash & Data Terpecah', 'ERP Master & Entitlement Engine', 'Kelola master data mahasiswa, base code SKU, import massal, dan kuota jatah paket seragam prodi.', '100% bebas crash Excel, data terisolasi ACID.'),
    ('Dead-Stock & Info Lambat', 'SCM Demand Planning Portal', 'Portal input ukuran mandiri mahasiswa, siaran jadwal web, serta kalkulasi demand vs shortage otomatis.', 'Zero dead-stock pengadaan pabrik presisi 100%.'),
    ('Bottleneck Loket & Double-Claim', 'POS QR Verification Engine', 'QR Code NIM instan (Level H) dan eksekusi 6-lapis validasi atomik via webcam scanner loket.', 'Waktu layan < 30 detik/mhs, nol potensi klaim ganda.'),
    ('Susut Stok & HPP Buram', 'WMS & FIFO Costing Engine', 'Melacak batch FIFO, pemotongan stok berkartu audit, rekonsiliasi opname, dan laporan margin GPM.', 'Valuasi HPP presisi real-time, audit transparan.')
]
for r_idx, row_data in enumerate(data_s5):
    for c_idx, val in enumerate(row_data):
        cell = table5.cell(r_idx + 1, c_idx)
        cell.fill.solid()
        cell.fill.fore_color.rgb = RGBColor(253, 244, 245) if r_idx % 2 == 1 else C_WHITE
        p = cell.text_frame.paragraphs[0]
        p.text = val
        p.font.size = Pt(9.5)
        p.font.color.rgb = C_MAROON_DARK if c_idx == 0 else C_TEXT_DARK
        if c_idx == 0: p.font.bold = True

add_banner(s5, 'Keunggulan UniStock: Menggabungkan keandalan ERP, perencanaan SCM, kecepatan POS, dan ketatnya WMS dalam satu portal Laravel 12 modern.')
set_notes(s5, """NASKAH PRESENTASI SLIDE 5 (Target: 01:30 Menit):
"Untuk mengatasi persoalan tersebut, pada Slide 5 kami merekomendasikan empat subsistem terpadu di dalam arsitektur HorizonU Uniform (UniStock):

1. ERP Master & Entitlement Engine: Berfungsi menggantikan Excel dengan basis data relasional MySQL InnoDB terstruktur, mengelola kuota hak per program studi, dan mengunci integritas transaksi. Manfaatnya: 100% bebas kendala Excel rusak.

2. SCM Demand Planning Portal: Membuka portal mandiri bagi mahasiswa untuk mengisi ukuran baju dan sepatu sebelum produksi, serta menghitung kalkulasi demand vs shortage secara otomatis. Manfaatnya: Zero dead-stock dan pengadaan pabrik tepat sasaran.

3. POS QR Verification Engine: Menghasilkan QR Code instan berbasis NIM dan mengeksekusi 6-Lapis Validasi otomatis melalui kamera webcam posko. Manfaatnya: Memangkas waktu layan menjadi di bawah 30 detik dan nol risiko klaim ganda.

4. WMS & FIFO Inventory Costing Engine: Mengatur pemotongan mutasi dari batch pembelian tertua secara FIFO, rekonsiliasi stock opname fisik, serta perhitungan valuasi HPP dan margin laba secara presisi.\"""")

# SLIDE 6
s6 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s6, 'Slide 6 • Proposed Solution Design', 'DIAGRAM ARSITEKTUR SOLUSI: 4 FASE CLOSED-LOOP SCM ENGINE', 'Bagaimana subsistem terhubung erat, aliran data perbaikan, dan pemanfaatan data untuk keputusan.', False)
add_card(s6, 0.6, 1.7, 2.85, 4.4, 'FASE 1 • HULU (INBOUND)', 'Inbound & Batch FIFO', '• Catat barang vendor di StockReceive.\n• Terbitkan ID urutan Batch FIFO.\n• Catat jurnal mutasi StockMovement IN dan unit HPP batch pembelian.')
add_card(s6, 3.68, 1.7, 2.85, 4.4, 'FASE 2 • DEMAND (PLANNING)', 'Eligibility & Profiling', '• Keuangan aktifkan data lunas di EligibilityRecord.\n• Mahasiswa isi ukuran di event portal.\n• Kalkulasi Demand vs Shortage untuk belanja vendor.')
add_card(s6, 6.76, 1.7, 2.85, 4.4, 'FASE 3 • HILIR (OUTBOUND)', 'POS QR & Validasi 6-Lapis', '• Staf scan QR NIM di loket gudang.\n• Eksekusi 6-lapis validasi via lockForUpdate().\n• Potong batch tertua otomatis (deductStockFifo).')
add_card(s6, 9.85, 1.7, 2.85, 4.4, 'FASE 4 • KONTROL (AUDIT)', 'Opname & Closed-Loop', '• Stock opname berkala menghitung variance.\n• Jurnal penyesuaian susut/surplus.\n• Dasbor analitik GPM dan feedback pengadaan siklus baru.')
add_banner(s6, 'Pengambilan Keputusan Closed-Loop: Data analitik stok sisa dan tren ukuran dari Fase 4 otomatis menjadi input PO vendor pada Fase 1 semester depan.')
set_notes(s6, """NASKAH PRESENTASI SLIDE 6 (Target: 01:25 Menit):
"Pada Slide 6, kami tampilkan Desain Arsitektur Solusi yang bekerja dalam 4 Fase Tertutup (Closed-Loop Engine):

Fase 1 (Inbound): Saat barang dari pabrik tiba, staf gudang mencatatnya pada modul StockReceive, menetapkan batch FIFO, dan mencatat unit HPP pembelian.

Fase 2 (Planning): Departemen Keuangan mengaktifkan status lunas di Eligibility Record, mahasiswa mengisi profil ukuran di portal, dan sistem mengalokasikan paket hak barang.

Fase 3 (Outbound): Di posko hari-H, staf memindai QR Code mahasiswa. Sistem mengeksekusi 6-lapis validasi menggunakan teknik pessimistic locking, memotong stok batch tertua, dan menyerahkan seragam.

Fase 4 (Audit & Control): Stock opname fisik berkala menghitung selisih varians, dan sistem menerbitkan laporan Gross Profit Margin.

Data sisa stok dan tren ukuran dari Fase 4 ini secara otomatis menjadi acuan belanja pengadaan Fase 1 pada semester berikutnya, menutup siklus rantai pasok secara sempurna.\"""")

# SLIDE 7
s7 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s7, 'Slide 7 • Implementation and Risks', 'PRIORITAS IMPLEMENTASI & MITIGASI RISIKO LAPANGAN', 'Langkah penerapan terencana, kebutuhan SDM, serta mitigasi risiko kontingensi hari-H.', False)
add_card(s7, 0.6, 1.7, 3.8, 2.05, 'PRIORITAS 1 • DATA FOUNDATION', 'Standarisasi Master Data', 'Pembersihan data lama, pembuatan skema SKU 5-segmen, impor data mahasiswa, dan konfigurasi hak seragam per prodi.')
add_card(s7, 4.75, 1.7, 3.8, 2.05, 'PRIORITAS 2 • INTEGRASI PORTAL', 'Sinkronisasi Keuangan', 'Integrasi status lunas Keuangan, pembukaan portal ukuran mandiri, dan penyiaran jadwal distribusi bertahap.')
add_card(s7, 8.9, 1.7, 3.8, 2.05, 'PRIORITAS 3 • PELATIHAN SDM', 'Pelatihan Staf Posko & SOP', 'Pelatihan staf loket memakai scanner webcam, prosedur fitting ukuran aktual, simulasi antrean, dan drill darurat.')
add_card(s7, 0.6, 3.95, 3.8, 2.15, 'RISIKO 1: HP MATI / NO QR', 'Mitigasi Fallback Search', 'Staf posko dapat mencari data mahasiswa secara manual melalui input NIM atau Nama pada bilah scanner.')
add_card(s7, 4.75, 3.95, 3.8, 2.15, 'RISIKO 2: UKURAN HABIS / FITTING', 'Mitigasi Partial Pickup', 'Serahkan seragam yang tersedia (Partial Pickup, sisa hak tidak hangus) dan catat tukar ukuran di student_size_histories.')
add_card(s7, 8.9, 3.95, 3.8, 2.15, 'RISIKO 3: INTERNET DOWN', 'Mitigasi Pessimistic Lock', 'Database InnoDB dilindungi pessimistic lock (lockForUpdate) dan proteksi idempotensi mencegah pemotongan stok dobel.')
add_banner(s7, 'Resiliensi Operasional Tinggi: UniStock dirancang fault-tolerant menjamin posko tetap beroperasi dalam kondisi darurat.')
set_notes(s7, """NASKAH PRESENTASI SLIDE 7 (Target: 01:15 Menit):
"Masuk ke Slide 7 mengenai Prioritas Implementasi dan Mitigasi Risiko Lapangan.

Kami membagi tahapan implementasi menjadi 3 prioritas: Prioritas 1 adalah standarisasi master data dan SKU; Prioritas 2 adalah sinkronisasi status keuangan dan pembukaan portal ukuran; dan Prioritas 3 adalah pelatihan staf loket serta simulasi antrean posko.

Kami juga telah merancang solusi atas 3 risiko darurat nyata di lapangan:
Pertama, jika baterai HP mahasiswa mati atau tidak membawa QR, staf posko dapat menggunakan fitur fallback search manual via NIM.
Kedua, jika stok ukuran di rak habis saat fitting, sistem mendukung fitur Partial Pickup di mana barang yang ada diserahkan tanpa menghanguskan sisa hak mahasiswa.
Ketiga, jika koneksi internet kampus fluktuatif, database diproteksi oleh pessimistic row locking agar tidak terjadi pengurangan stok ganda.\"""")

# SLIDE 8
s8 = prs.slides.add_slide(prs.slide_layouts[6])
apply_header(s8, 'Slide 8 • Conclusion & Benefits', 'KESIMPULAN & TIGA MANFAAT TERUKUR YANG DIHASILKAN', 'Rangkuman dampak nyata sistem informasi HorizonU Uniform (UniStock SCM) bagi operasional kampus.', True)
add_card(s8, 0.6, 1.7, 3.8, 4.4, 'MANFAAT 01 • EFISIENSI WAKTU', '< 30 Detik per Mahasiswa', 'Memangkas waktu layanan posko dari 15-20 menit menjadi di bawah 30 detik melalui pemindaian QR Code dan validasi 6-lapis otomatis.')
add_card(s8, 4.75, 1.7, 3.8, 4.4, 'MANFAAT 02 • AKURASI INVENTARIS', 'Zero (0) Dead-Stock', 'Profiling ukuran mandiri memastikan pengadaan barang pabrik selaras 100% dengan ukuran tubuh riil mahasiswa aktif.')
add_card(s8, 8.9, 1.7, 3.8, 4.4, 'MANFAAT 03 • AKUNTABILITAS BIAYA', '100% Valuasi FIFO Real-Time', 'Mengeliminasi ketergantungan pada Excel yang rentan rusak. Semua mutasi terikat batch FIFO dan perhitungan Gross Profit Margin.')
add_banner(s8, 'Kesimpulan: Sistem Informasi bukan sekadar alat administratif, melainkan saraf pusat rantai pasok yang mengunci fisik barang dengan kepatuhan finansial secara closed-loop.')
set_notes(s8, """NASKAH PRESENTASI SLIDE 8 (Target: 00:55 Menit):
"Sebagai penutup pada Slide 8, implementasi HorizonU Uniform menghadirkan 3 manfaat nyata dan terukur:

1. Efisiensi Waktu: Waktu pelayanan posko berhasil dipangkas dari 15–20 menit menjadi di bawah 30 detik per mahasiswa.
2. Akurasi Persediaan: Mewujudkan target Zero Dead-Stock karena pengadaan pabrik 100% selaras dengan ukuran tubuh riil mahasiswa.
3. Akuntabilitas Biaya: Menghilangkan kerentanan crash Excel dengan sistem penilaian inventaris berbasis FIFO dan analitik Gross Profit Margin real-time.

Statement akhir kami: Sistem Informasi bukan sekadar alat pencatat administrasi, melainkan saraf penggerak utama rantai pasok yang mengunci fisik barang dengan kepatuhan finansial, serta mengubah tebakan manual menjadi keputusan bisnis berakurasi tinggi.

Sekian presentasi dari Tim Nirwana. Kami siap menerima pertanyaan dari Dewan Juri. Terima kasih.\"""")

output_path = 'HorizonU_Uniform_UniStock_SCM_Presentasi_Technospark.pptx'
prs.save(output_path)
print(f'PowerPoint saved successfully to {output_path}!')
