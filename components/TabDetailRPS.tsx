import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { MessageBox } from './ui/MessageBox';
import { RPSData, GenerationType } from '../types';
import { generateContent } from '../services/geminiService';
import { Sparkles, BookOpen, List, FileText, MonitorPlay, BarChart, ChevronDown, Filter } from 'lucide-react';

interface TabDetailRPSProps {
  data: RPSData;
  updateData: (key: keyof RPSData, value: string | number) => void;
}

// --- DATABASE PRODI (DATA BASE LULUSAN & CPL) ---
const PRODI_DATA: Record<string, { cpl: string; pl: string }> = {

 "Informatika": {
    pl: `PL-1: Software Engineer/Software Developer.
PL-2: AI Engineer.
PL-3: Administrator Basis Data.
PL-4: Akademisi.`,
    cpl: `CPL-1	: Bertakwa kepada Tuhan Yang Maha Esa dan mampu menunjukkan sikap religius.
CPL-2	: Menjunjung tinggi nilai kemanusiaan dalam menjalankan tugas berdasarkan agama, moral, dan etika.
CPL-3	: Berkontribusi dalam peningkatan mutu kehidupan bermasyarakat,berbangsa.
CPL-4	: Berperan sebagai warga negara yang bangga dan cinta tanah air, memiliki nasionalisme serta rasa tanggungjawab pada negara dan bangsa.
CPL-5	: Menghargai keanekaragaman budaya, pandangan, agama, dan kepercayaan, serta pendapat atau temuan orisinal orang lain.
CPL-6	: Bekerja sama dan memiliki kepekaan sosial serta kepedulian terhadap masyarakat dan lingkungan.
CPL-7	: Taat hukum dan disiplin dalam kehidupan bermasyarakat dan bernegara.
CPL-8	: Menginternalisasi nilai, norma, dan etika akademik.
CPL-9	: Menunjukkan sikap bertanggungjawab atas pekerjaan di bidang keahliannya secara mandiri.
CPL-10	: Menginternalisasi semangat kemandirian, kejuangan, dan kewirausahaan.
CPL-11	: Berwawasan terbuka dan menghargai sikap dan pandangan berbeda dalam kerangka semangat Islam yang moderat.
CPL-12	: Menguasai konsep-konsep matematika dalam tujuan untuk memecahkan masalah yang berkaitan dengan logika.
CPL-13	: Menguasai prinsip-prinsip pemodelan matematika, program linear serta metode numerik.
CPL-14	: Menguasai konsep dan ilmu probabilitas dan statistik untuk mendukung dan menganalisis sistem komputasi.
CPL-15	: Menguasai konsep dan teori konsep struktur diskrit, yang meliputi materi dasar matematika yang digunakan untuk memodelkan dan menganalisis sistem komputasi.
CPL-16	: Memahami konsep dasar tentang teori informasi yang berhubungan dengan komputasi numerik.
CPL-17	: Memahami konsep dan teori tentang kalkulus differensial dan kalkulus integral dengan teorema dasar kalkulus.
CPL-18	: Memahami konsep dan teori dasar diskrit seperti logika himpunan, boolean dan graf.
CPL-19	: Memahami konsep dan teori tentang persamaan linier dengan menggunakan matriks dan vektor.
CPL-20	: Menguasai teori dan konsep yang mendasari ilmu komputer.
CPL-21	: Menerapkan Metode dan Praktik Penggunaan Kembali (Reusable) Subrutin-Subrutin.
CPL-22	: Menguasai metodologi pengembangan sistem, yaitu perencanaan, desain, penerapan, pengujian, dan pemelihaan sistem.
CPL-23	: Memahami konsep-konsep algoritma dan kompleksitas meliputi konsepkonsep sentral dan kecakapan yang dibutuhkan untuk merancang. menerapkan dan menganalisis algoritma untuk menyelesaikan masalah.
CPL-24	: Menguasai konsep dan prinsip algoritma serta teori ilmu komputer yang dapat digunakan dalam pemodelan dan desain sistem berbasis komputer.
CPL-25	: Menentukan pendekatan sistem cerdas yang sesuai dengan problem yang dihadapi, memilih representasi pengetahuan dan mekanisme penalarannya.
CPL-26	: Memahami konsep dasar dan teori kecerdasan buatan berikut konsep dan turunan algoritmanya.
CPL-27	: Memahami konsep dan teori tentang database, Rekayasa Perangkat Lunak, berikut pengujian perangkat lunak itu sendiri.
CPL-28	: Memahami abstraksi dari ekskusi sebuah program pada sebuah sistem komputer.
CPL-29	: Memahami prinsip dasar sistem jaringan komputer.
CPL-30	: Menunjukkan pengetahuan tentang keagamaan dan kebhinekaan masyarakat.
CPL-31	: Mampu menerapkan pemikiran logis, kritis, sistematis, dan inovatif dalam konteks pengembangan atau implementasi ilmu pengetahuan dan teknologi yang memperhatikan dan menerapkan nilai humaniora yang sesuai dengan bidang keahliannya.
CPL-32	: Mampu menunjukkan kinerja mandiri, bermutu, dan terukur.
CPL-33	: Mampu mengkaji implikasi pengembangan atau implementasi ilmu pengetahuan teknologi yang memperhatikan dan menerapkan nilai humaniora sesuai dengan keahliannya berdasarkan kaidah, tata cara dan etika ilmiah dalam rangka menghasilkan solusi, gagasan, desain atau kritik seni, menyusun deskripsi saintifik hasil kajiannya dalam bentuk skripsi atau laporan tugas akhir, dan mengunggahnya dalam laman perguruan tinggi.
CPL-34	: Menyusun deskripsi saintifik hasil kajian tersebut di atas dalam bentuk skripsi atau laporan tugas akhir, dan mengunggahnya dalam laman perguruan tinggi.
CPL-35	: Mampu mengambil keputusan secara tepat dalam konteks penyelesaian masalah di bidang keahliannya, berdasarkan hasil analisis informasi dan data.
CPL-36	: Mampu memelihara dan mengembang-kan jaringan kerja dengan pembimbing, kolega, sejawat baik di dalam maupun di luar lembaganya.
CPL-37	: Mampu bertanggungjawab atas pencapaian hasil kerja kelompok dan melakukan supervisi dan evaluasi terhadap penyelesaian pekerjaan yang ditugaskan kepada pekerja yang berada di bawah tanggungjawabnya.
CPL-38	: Mampu melakukan proses evaluasi diri terhadap kelompok kerja yang berada dibawah tanggung jawabnya, dan mampu mengelola pembelajaran secara mandiri.
CPL-39	: Mampu mendokumentasikan, menyimpan, mengamankan, dan menemukan kembali data untuk menjamin kesahihan dan mencegah plagiasi.
CPL-40	: Menerapkan intergrasi antara sains dan nilai spiritualisme dalam landasan konsep berfikir.
CPL-41	: Memahami konsep-konsep bahasa pemrograman, mengidentikasi model - model bahasa pemrograman, serta membandingkan berbagai solusi.
CPL-42	: Menguasai konsep-konsep bahasa pemrograman, serta mampu membandingkan berbagai solusi serta berbagai model bahasa pemrograman.
CPL-43	: Menganalisis suatu sistem berbasis komputer secara efisien untuk menyelesaikan masalah. Menggunakan pemrograman prosedural dan berorientasi objek.
CPL-44	: Menguasai bahasa dan algoritma pemrograman yang berkaitan dengan program aplikasi untuk memanipulasi model gambar. grafis. dan citra. Menerapkan pendekatan berbagai sistem dihadapi.
CPL-45	: Menerapkan penggunaan representasi pengetahuan dan mekanisme penalarannya.
CPL-46	: Evaluasi kinerja dari penerapan sistem cerdas yang sesuai dengan problem yang dihadapi. termasuk dalam pemilihan representasi pengetahuan dan mekanisme penalarannya.
CPL-47	: Menerapkan kecerdasan buatan dengan mengimplementasikan algoritma secara pendekatan yang berbeda yaitu supervised, unsupervised. dan semi supervised.
CPL-48	: Menganalisa implementasi algoritma secara secara pendekatan yang berbeda yaitu supervised, unsupervised, dan semi supervised.
CPL-49	: Mengevaluasi implementasi algoritma secara secara pendekatan yang berbeda yaitu supervised, unsupervised. dan semi supervised
CPL-50	: Membangun aplikasi perangkat lunak yang berkaitan dengan pengetahuan ilmu komputer.
CPL-51	: Menulis kode yang diperlukan untuk digunakan sebagai instruksi dalam membangun aplikasi komputer.
CPL-52	: Memanfaatkan pengetahuan yang dimiliki berkaitan dengan konsepkonsep dasar pengembangan perangkat lunak dan kecakapan yang berhubungan dengan proses pengembangan perangkat lunak, serta mampu membuat program untuk meningkatkan efektivitas penggunaan komputer untuk memecahkan masalah tertentu.
CPL-53	: Merancang program aplikasi untuk memanipulasi model gambar, grafis. dan citra, serta dapat memvisualisasikannya.
CPL-54	: Membangun dan mengevaluasi perangkat lunak dalam berbagai area, termasuk yang berkaitan dengan interaksi antara manusia dan komputer.
CPL-55	: Membangun aplikasi perangkat lunak dalam berbagai area yang berkaitan dengan bidang robotik, pengenalan suara, sistem cerdas, dan bahasanatural.
CPL-56	: Menerapkan konsep-konsep yang berkaitan dengan manajemen informasi, termasuk menyusun pemodelan dan abstraksi data serta membangun aplikasi perangkat lunak untuk pengorganisasian data dan penjaminan keamanan akses data.
CPL-57	: Menganalisis sistem serta prosedur yang berkaitan dengan sistem komputer serta memberikan rekomendasi yang berkaitan dengan sistem komputer yang lebih efisien dan efektif.
CPL-58	: Menerapkan konsep-konsep yang berkaitan dengan arsitektur dan organisasi komputer serta memanfaatkannya untuk menunjang aplikasi komputer
CPL-59	: Menerapkan konsep-konsep yang berkaitan dengan pengembangan berbasis platform pada Mobile Computing, serta mampu mengembangkan program aplikasi berbasis platform untuk berbagai area.
CPL-60	: Merancang sistem keamanannya serta melakukan pengelolaan secara kontinu terhadap proteksi profil yang ada.
CPL-61	: Mengimplementasikan konfigurasi keamanan informasi.
CPL-62	: Merancang sistem jaringan komputer serta melakukan pengelolaan secara kontinyu.
CPL-63	: Menerapkan algoritma paralel yang dapat memanfaatkan sumberdaya komputasi yang tersedia dengan efisien.
CPL-64	: Mengembangkan aplikasi sederhana berbasis jaringan.
CPL-65	: Mengidentifikasi akar masalah secara komprehensif, serta mengambil keputusan yang tepat berdasarkan analisis informasi dan data.
CPL-66	: Menyarikan informasi ilmiah dan non-imiah secara mandiri dan kritis.
CPL-67	: Menerapkan variabel khasanah dan kearifan lokal sebagai bagian dari riset baik berupa data, subjek, maupun objek penelitian.`
  },

"Arsitektur": {
    pl: `PL-1: Memiliki kemampuan merancang bangunan dan lingkungan binaan secara kreatif dan inovatif berbasisarsitektur Islam dan Kearifan lokal.
PL-2: Memiliki kemampuan untuk memberikan solusi alternatif rancangan untuk permasalahan- permasalahan terkait keilmuan arsitektur dengan mempertimbangkan arsitektur nusantara, perkembangan ilmu pengetahuan dan teknologi.
PL-3: Memiliki kemampuan untuk mengatur dan mengkoordinir (manajemen) proses perencanaan bangunan dan lingkungan binaan dengan baik danterstruktur 
PL-4: Memiliki kemampuan untuk bekerjasama dengan penyedia jasa konstruksi dan pengawas dalam hal mengkomunikasikan hasil rancangan dan penyelesaian permasalahan-permasalahan yang terjadi di lapangan, sehingga menghasilkan karya arsitektur yang fungsional, estetis dan aman dan berbasis arsitektur Islam dan Kearifan Lokal.
PL-5: Memiliki wawasan terkait pengembangan perumahandan permukiman yang sesuai dengan tuntutan kebutuhan terkini dengan mempertimbangkan perkembangan ilmu pengetahuan dan teknologi dan arsitektur Islam dan Kearifan local.
PL-6: Memiliki pengetahuan terkait manajemen dan investasi pengembangan real estate sesuai dengan tuntutan perkembangan zaman.
PL-7: Memiliki kemampuan untuk merancang ruang dalam (interior) secara detail sesuai dengan perkembanganilmu pengetahuan dan teknologi. 
PL-8: Memiliki wawasan mengenai bahan, material, alat dan teknologi terkait perancangan ruang dalam sesuai dengan perkembangan ilmu pengetahuan dan teknologi.
PL-9: Memiliki kemampuan untuk merancang ruang luar (lansekap) secara detail sesuai dengan perkembanganilmu pengetahuan dan teknologi, berbasisi arsitektur Islam dan Kearifan Lokal. 
PL-10: Memiliki wawasan mengenai bahan, material, alat dan teknologi terkait perancangan ruang luar sesuai denganperkembangan ilmu pengetahuan dan teknologi.
PL-11: Memiliki kemampuan untuk merancang kota/ bagian kota/ kawasan berbasis arsitektur islam dan kearifan local sesuai dengan isu global dan terkini. 
PL-12: Memiliki wawasan mengenai permasalahan – permasalahan kota dan inovasi penyelesaian sesuaidengan isu global dan terkini.
PL-13: Memiliki wawasan mengenai system struktur,konstruksi, bahan dan teknologi terkini.
PL-14: Memiliki wawasan mengenai peraturan, pedomanteknis, dan standar – standar terkini. 
PL-15: Memiliki kemampuan untuk memahami dokumenteknis dan spesifikasi untuk pelaksanaan control.
PL-16: Memiliki kemampuan mengembangkan bisnis dan investasi terkait bidang arsitektur yang sesuai dengantuntutan perkembangan zaman.
PL-17: Memiliki wawasan pengembangan bisnis terkait bidang arsitektur yang kreatif dan inovatif, serta sesuaiperkembangan ilmu pengetahuan dan teknologi.
PL-18: Memiliki wawasan dibidang Arsitektur terkait isu – isuterkini, perkembangan ilmu pengetahuan dan teknologi.
PL-19: Memiliki kemampuan melakukan kajian dan penelitian untuk pengembangan keilmuan dibidangarsitektur yang terkait dengan isu terkini , perkembangan ilmu pengetahuan dan teknologi.
PL-20: Memiliki wawasan dibidang arsitektur terkait isu-isuterkini, perkembangan ilmu pengetahuan dan teknologi.
PL-21: Memiliki kemampuan melakukan kajian dan penelitian untuk pengembangan keilmuan dibidangarsitektur yang terkait dengan isu terkinI perkembangan ilmupengetahuan dan teknologi.`,
    cpl: `CPL-1	:	Menjunjung tinggi nilai kemanusiaan dalam menjalankan tugas berdasarkan agama, moral, dan etika, serta berwawasan terbuka.
CPL-2	:	Berkontribusi dalam meningkatkan mutu kehidupan bermasyarakat dan berbangsa.
CPL-3	:	Taat hukum dan disiplin dalam kehidupan bermasyarakat dan bernegara, serta menghargai keanekaragaman dan pendapat orang lain.
CPL-4	:	Menunjukan sikap bertanggung jawab, semangat kemandirian dan kewirausahaan.
CPL-5	:	Memahami dan menguasai pengetahuan tentang sejarah dan budaya secara umum, khususnya budaya lokal.
CPL-6	:	Memahami dan menguasai secara teoritis tentang perancangan arsitektur untuk menghasilkan karya arsitektur yang kontekstual, fungsional dan efektif.
CPL-7	:	Memahami dan menguasai secara teoritis tentang arsitektur rancang luar, kota dan permukiman untuk menghasilkan lingkungan binaan yang kontekstual, terintegrasi dan berkualitas.
CPL-8	:	Mengetahui dan memahami kaidah, pedoman teknis dan standar-standar dalam merumuskan konsep hingga menghasilkan desain 2D-3D dalam perancangan Arsitektur.
CPL-9	:	Memahami dan menguasai metode komunikasi, penggunaan bahasa Indonesia dan bahasa Inggris, etika profesional dan kode etik dalam praktek berarsitektur.
CPL-10	:	Mengetahui dan memahami prinsip-prinsip bisnis dan berbagai bentuk penyediaan jasa arsitek, manajemen proyek, konstruksi dan pembangunan serta konsultan profesional.
CPL-11	:	Memahami dan menguasai secara teoritis penyelesaian permasalahan arsitektur yang menitikberatkan pada nilai lokalitas dan berbasis mitigasi bencana.
CPL-12	:	Menunjukkan pengetahuan tentang keagamaan dan kebhinekaan masyarakat.
CPL-13	:	Mampu mengambil keputusan secara tepat serta menerapkan pemikiran logis, kritis, sistematis, dan inovatif dalam konteks pengembangan ilmu pengetahuan dan teknologi yang memperhatikan nilai humaniora sesuai dengan keahliannya berdasarkan kaidah, tata cara dan etika ilmiah sehingga bisa menghasilkan solusi, desain maupun kritik seni.
CPL-14	:	Mampu menunjukkan kinerja mandiri, bermutu, dan terukur.
CPL-15	:	Mampu meyusun serta mengamankan data laporan guna mencegah terjadinya plagiasi dalam konteks penyusunan skripsi atau laporan tugas akhir.
CPL-16	:	Mampi bertanggung jawab dalam bekerja baik secara mandiri maupun berkelompok.
CPL-17	:	Mampu menyusun konsep perancangan arsitektur untuk menghasilkan karya yang kontekstual, berkualitas, efektif dan efisien.
CPL-18	:	Mampu menghasilkan karya arsitektur yang kreatif dan inovatif, menyajikan beberapa solusi alternative rancangan dan memanfaatkan kemampuan merancangnya untuk membantu melakukan pengawasan atau pelaksanaan pembangunan.
CPL-19	:	Mampu mengkomunikasikan pemikiran dan hasil rancangan dalam bentuk grafis, tulisan dan model yang komunikatif terhadap klien, masyarakat dan pengguna yang mewakili masyarakat.
CPL-20	:	Menerapkan variabel khasanah dan kearifan lokal sebagai bagian dari riset baik berupa data, subjek, maupun objek penelitian.`
  } 

 
};

export const TabDetailRPS: React.FC<TabDetailRPSProps> = ({ data, updateData }) => {
  const [status, setStatus] = useState<{ msg: string | null; type: 'loading' | 'error' | 'success' }>({ msg: null, type: 'success' });
  const [loadingBtn, setLoadingBtn] = useState<GenerationType | null>(null);

  const handleProdiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProdi = e.target.value;
    updateData('studyProgram', selectedProdi);
    
    // Auto-fill has been removed to allow for relevant selection via AI instead of dumping all data.
    // If user changes prodi, we might want to clear existing CPL if it doesn't match, 
    // but let's leave it to the user to clear or regenerate.
    updateData('cpl', '');
  };

  const handleGenerate = async (type: GenerationType) => {
    setLoadingBtn(type);
    setStatus({ msg: `Memproses permintaan ${type.toLowerCase().replace('_', ' ')}...`, type: 'loading' });

    try {
      let prompt = '';
      let result: any = null;

      // Inject Profil Lulusan into context if available for the selected prodi
      const profilLulusanContext = (data.studyProgram && PRODI_DATA[data.studyProgram]) 
        ? `\nKONTEKS PROFIL LULUSAN PRODI INI (Wajib Selaras): \n${PRODI_DATA[data.studyProgram].pl}\n` 
        : '';

      switch (type) {
        case GenerationType.SELECT_CPL:
            if (!data.courseName || !data.studyProgram) throw new Error("Harap isi Nama Mata Kuliah dan pilih Program Studi.");
            const currentProdiData = PRODI_DATA[data.studyProgram];
            if (!currentProdiData) throw new Error("Data Prodi tidak ditemukan.");

            prompt = `Bertindak sebagai Kaprodi yang menyusun Kurikulum.
Mata Kuliah: "${data.courseName}"
Daftar CPL (Capaian Pembelajaran Lulusan) Tersedia untuk Prodi ${data.studyProgram}:
${currentProdiData.cpl}

Tugas: Pilihlah 2 sampai 4 CPL yang PALING RELEVAN dan berkaitan langsung dengan mata kuliah ini.
Jangan memilih semua CPL. Hanya pilih yang benar-benar inti dan didukung oleh mata kuliah ini.
Output hanya daftar CPL yang dipilih (teks asli dari daftar di atas), dipisahkan baris baru.`;

            result = await generateContent(prompt, (await import('../types')).SELECT_CPL_SCHEMA);
            if (result?.selectedCpl) {
                updateData('cpl', result.selectedCpl.join('\n\n'));
            }
            break;

        case GenerationType.CPMK:
          if (!data.courseName || !data.cpl || !data.credits) throw new Error("Isi Nama Mata Kuliah, CPL, dan SKS.");
          const count = data.credits >= 3 ? 5 : 3;
          
          prompt = `Nama Mata Kuliah: ${data.courseName}
Bobot SKS: ${data.credits}
CPL yang dibebankan: ${data.cpl}
${profilLulusanContext}

Tugas: Buatkan ${count} poin Capaian Pembelajaran Mata Kuliah (CPMK) dalam Bahasa Indonesia untuk tingkat Sarjana (S1).
Pastikan CPMK mendukung tercapainya Profil Lulusan yang disebutkan di atas (jika ada).

INSTRUKSI KHUSUS KATA KERJA OPERASIONAL (KKO) BERBASIS HOTS (LEVEL 3 KE ATAS):
Anda WAJIB HANYA menggunakan Kata Kerja Operasional dari daftar berikut ini (Dilarang menggunakan level 1 atau 2):

1. RANAH KOGNITIF (C3 - C6):
   - C3 (Menerapkan): Melaksanakan, Mengimplementasikan, Menggunakan, Mengonsepkan, Menentukan, Memproseskan, Mendemonstrasikan, Menghitung, Menghubungkan, Melakukan, Membuktikan, Menghasilkan, Memperagakan, Melengkapi, Menyesuaikan, Menemukan.
   - C4 (Menganalisis): Mendiferensiasikan, Mengorganisasikan, Mengatribusikan, Mendiagnosis, Memerinci, Menelaah, Mendeteksi, Mengaitkan, Memecahkan, Menguraikan, Memisahkan, Menyeleksi, Memilih, Membandingkan, Mempertentangkan, Membagi.
   - C5 (Mengevaluasi): Mengecek, Mengkritik, Membuktikan, Mempertahankan, Memvalidasi, Mendukung, Memproyeksikan, Memperbandingkan, Menyimpulkan, Menilai, Mengevaluasi, Memberi saran, Memberi argumentasi, Menafsirkan, Merekomendasi, Memutuskan.
   - C6 (Menciptakan): Membangun, Merencanakan, Memproduksi, Mengkombinasikan, Merancang, Merekonstruksi, Membuat, Menciptakan, Mengabstraksi, Mengkategorikan, Mengarang, Mendesain, Menyusun kembali, Merangkaikan, Membuat pola.

2. RANAH PSIKOMOTOR (P3 - P5):
   - P3 (Presisi): Menunjukkan, Melengkapi, Menyempurnakan, Mengkalibrasi, Mengendalikan, Mempraktekkan, Memainkan, Mengerjakan, Membuat, Mencoba, Memposisikan.
   - P4 (Artikulasi): Membangun, Mengatasi, Menggabungkan, Koordinat, Mengintegrasikan, Beradaptasi, Mengembangkan, Merumuskan, Memodifikasi, Memasang, Membongkar, Merangkaikan, Mempolakan.
   - P5 (Naturalisasi): Mendesain, Menentukan, Mengelola, Menciptakan, Membangun, Membuat, Mencipta menghasilkan karya, Mengoperasikan, Melakukan, Melaksanakan, Mengerjakan, Menggunakan, Memainkan, Mengatasi, Menyelesaikan.

3. RANAH AFEKTIF (A3 - A5):
   - A3 (Menghargai): Menunjukkan, Melaksanakan, Menyatakan pendapat, Mengambil prakarsa, Mengikuti, Memilih, Ikut serta, Menggabungkan diri, Mengundang, Mengusulkan, Membedakan, Membimbing, Membenarkan, Menolak, Mengajak.
   - A4 (Mengorganisasikan): Merumuskan, Berpegang pada, Mengintegrasikan, Menghubungkan, Mengaitkan, Menyusun, Mengubah, Melengkapi, Menyempurnakan, Menyesuaikan, Menyamakan, Mengatur, Memperbandingkan, Mempertahankan, Memodifikasi, Mengorganisasi, Mengkoordinir, Merangkai.
   - A5 (Karakterisasi): Bertindak, Menyatakan, Memperhatikan, Melayani, Membuktikan, Menunjukkan, Bertahan, Mempertimbangkan, Mempersoalkan.

STRUKTUR KALIMAT CPMK (WAJIB):
Setiap poin CPMK harus menggabungkan 3 ranah dalam satu kalimat utuh:
"Mampu [Pilih KKO Kognitif C3-C6] (Kode C) [Materi Pembelajaran] ... untuk [Pilih KKO Psikomotor P3-P5] (Kode P) [Aktivitas/Keterampilan] ... sebagai wujud [Pilih KKO Afektif A3-A5] (Kode A) [Sikap/Nilai] (CPMK-N)"

Contoh Output yang Diharapkan:
1. "Mampu menganalisis (C4) teori pendidikan untuk merumuskan (P4) strategi pembelajaran yang efektif sebagai wujud menyatakan pendapat (A3) yang ilmiah (CPMK-1)"
2. "Mampu merencanakan (C6) proyek pengembangan perangkat lunak untuk membangun (P5) aplikasi web yang aman sebagai wujud mengintegrasikan (A4) nilai tanggung jawab profesional (CPMK-2)"`;
          
          result = await generateContent(prompt, (await import('../types')).CPMK_SCHEMA);
          if (result?.cpMKList) {
            updateData('cpmk', result.cpMKList.map((item: string, i: number) => `${i + 1}. ${item}`).join('\n\n'));
          }
          break;

        case GenerationType.SUB_CPMK:
           if (!data.courseName || !data.cpmk) throw new Error("Isi Nama Mata Kuliah dan CPMK terlebih dahulu.");

           prompt = `Nama Mata Kuliah: ${data.courseName}
CPMK Induk: ${data.cpmk}

Tugas: Buatlah 8 butir Sub-CPMK (Sub-Capaian Pembelajaran Mata Kuliah) yang spesifik dan terukur.

ATURAN PENYUSUNAN (WAJIB DIPATUHI):
1. Gunakan Formula A-B-C-D untuk merancang kalimat:
   - Audience (A): Mahasiswa
   - Behavior (B): Perilaku spesifik (KKO)
   - Condition (C): Konteks/kondisi
   - Degree (D): Standar keberhasilan
   
2. FORMAT OUTPUT (SANGAT PENTING):
   - Hasilkan kalimat yang mengalir alami dan profesional.
   - DILARANG MENYERTAKAN LABEL (A), (B), (C), (D) dalam hasil akhir.
   - Jangan menulis "Mahasiswa (A) mampu...", tapi tulis "Mahasiswa mampu...".
   - CONTOH BENAR: "Mahasiswa mampu menjelaskan konsep dasar filsafat dengan menggunakan terminologi yang akurat."
   - CONTOH SALAH: "Mahasiswa (A) mampu menjelaskan (B)..."

3. Level Kognitif & KKO:
   - Level Sub-CPMK <= CPMK induk.
   - Gunakan KKO operasional (Menjelaskan, Menganalisis, Merumuskan, dll). Hindari kata "Memahami".

4. Aspek Penilaian:
   - Pastikan perilaku dapat diobservasi dan dinilai.

Output: Hasilkan 8 butir Sub-CPMK yang terurut dan logis.`;

           result = await generateContent(prompt, (await import('../types')).SUB_CPMK_SCHEMA);
           if (result?.subCpmkList) {
               updateData('subCpmk', result.subCpmkList.map((item: string, i: number) => `Sub-CPMK ${i + 1}: ${item}`).join('\n\n'));
           }
           break;

        case GenerationType.DESCRIPTION:
            // Logic: Format existing or Generate new
            const rawDesc = data.shortDescription.trim();
            if (rawDesc) {
               prompt = `Format deskripsi ini (140-160 kata, akademik baku, no SKS): \n${rawDesc}`;
            } else {
               if (!data.courseName || !data.cpmk) throw new Error("Isi Nama MK dan CPMK.");
               prompt = `Buat deskripsi MK singkat (140-160 kata) untuk ${data.courseName}, Prodi ${data.studyProgram}. 
               ${profilLulusanContext}
               CPL: ${data.cpl}. 
               CPMK: ${data.cpmk}.`;
            }
            result = await generateContent(prompt, (await import('../types')).DESCRIPTION_SCHEMA);
            if (result?.description) updateData('shortDescription', result.description);
            break;
        
        case GenerationType.BAHAN_KAJIAN:
            const rawBahan = data.bahanKajian.trim();
            if (rawBahan) {
                prompt = `Format bahan kajian ini menjadi daftar bernomor rapi: \n${rawBahan}`;
            } else {
                if (!data.courseName || !data.cpmk || !data.shortDescription) throw new Error("Isi Nama MK, CPMK, dan Deskripsi.");
                prompt = `Buat 8-14 Bahan Kajian (Main Topics) untuk ${data.courseName}. CPMK: ${data.cpmk}. Deskripsi: ${data.shortDescription}.`;
            }
            result = await generateContent(prompt, (await import('../types')).BAHAN_KAJIAN_SCHEMA);
            if (result?.bahanKajianList) {
                updateData('bahanKajian', result.bahanKajianList.map((item: string, i: number) => `${i + 1}. ${item}`).join('\n\n'));
            }
            break;

        case GenerationType.MAIN_REFS:
        case GenerationType.SUPPORT_REFS:
            const isMain = type === GenerationType.MAIN_REFS;
            const rawRefs = isMain ? data.mainReferences : data.supportingReferences;
            if (!rawRefs.trim()) throw new Error("Kolom referensi kosong.");
            prompt = `Format referensi berikut ke APA 7th Style dan urutkan alfabetis: \n${rawRefs}`;
            result = await generateContent(prompt, (await import('../types')).REFERENCE_SCHEMA);
            if (result?.formattedReferences) {
                const formatted = result.formattedReferences.map((item: string, i: number) => `${i + 1}. ${item}`).join('\n\n');
                updateData(isMain ? 'mainReferences' : 'supportingReferences', formatted);
            }
            break;

        case GenerationType.MEDIA:
             if (!data.courseName || !data.cpmk) throw new Error("Isi Nama MK dan CPMK.");
             prompt = `Buat daftar media pembelajaran (5-7 item, dipisah koma) untuk ${data.courseName}. CPMK: ${data.cpmk}.`;
             result = await generateContent(prompt, (await import('../types')).MEDIA_SCHEMA);
             if (result?.mediaString) updateData('learningMedia', result.mediaString);
             break;

        case GenerationType.EVALUATION:
            if (!data.courseName || !data.cpl || !data.subCpmk) throw new Error("Isi Nama MK, CPL, dan Sub-CPMK terlebih dahulu.");
            
            // Robust CPL Header Extraction
            const cplLines = data.cpl.split('\n').filter(line => line.trim().length > 0);
            let cplHeaders = cplLines
                .map(line => {
                    const match = line.match(/^(CPL[\s-]*\d+)/i) || line.match(/^(CPL\s*[A-Z0-9]+)/i);
                    return match ? match[0] : null;
                })
                .filter(h => h !== null) as string[];

            if (cplHeaders.length === 0) {
                 // Fallback if formatting is weird
                 cplHeaders = cplLines.map((_, i) => `CPL-${i+1}`);
            }
            
            // Extract Sub-CPMK Count
            const subCpmkLines = data.subCpmk.split('\n').filter(line => line.trim().length > 0);
            const subCpmkCount = subCpmkLines.length;

            prompt = `Buatkan Matriks Evaluasi (Mapping Sub-CPMK terhadap CPL, Bobot, dan Waktu).
Mata Kuliah: "${data.courseName}"

DATA CPL (Terdapat ${cplHeaders.length} CPL):
${cplLines.join('\n')}

DATA Sub-CPMK (Terdapat ${subCpmkCount} Sub-CPMK):
${subCpmkLines.join('\n')}

Tugas: Buatlah mapping untuk ${subCpmkCount} baris Sub-CPMK.
1. Mapping CPL: Tentukan apakah Sub-CPMK tersebut mendukung masing-masing CPL di atas. Berikan nilai 1 jika YA, 0 jika TIDAK untuk setiap CPL.
2. Bobot Penilaian (%): Berikan bobot untuk setiap Sub-CPMK. TOTAL KESELURUHAN HARUS 100%.
3. Jumlah Minggu: Distribusikan durasi waktu (TOTAL 14 MINGGU efektif) ke dalam Sub-CPMK tersebut.

Output JSON harus berisi array 'evaluationRows'. Setiap row memiliki:
- 'subCpmkIndex' (nomor urut)
- 'cplMatches' (array angka 0 atau 1 sejumlah ${cplHeaders.length} CPL)
- 'weight' (angka bobot %)
- 'weeks' (angka jumlah minggu)`;
            
            result = await generateContent(prompt, (await import('../types')).EVALUATION_SCHEMA);
            
            if (result?.evaluationRows) {
                // Convert to Markdown Table
                // Headers: Sub-CPMK | CPL-1 | CPL-2 | ... | Bobot Penilaian (%) | Jumlah Minggu
                
                // 1. Headers
                const tableHeaders = ["Sub-CPMK", ...cplHeaders, "Bobot Penilaian", "Jumlah Minggu"];
                const separator = tableHeaders.map(() => '---');
                
                let md = `| ${tableHeaders.join(' | ')} |\n| ${separator.join(' | ')} |\n`;
                
                let totalWeight = 0;
                let totalWeeks = 0;

                result.evaluationRows.forEach((row: any) => {
                    const rowWeight = row.weight || 0;
                    const rowWeeks = row.weeks || 0;
                    
                    totalWeight += rowWeight;
                    totalWeeks += rowWeeks;

                    // Format CPL matches: 1 -> "√", 0 -> "-"
                    const cplCells = (row.cplMatches || []).map((val: number) => val === 1 ? '√' : '-');
                    
                    // Ensure cplCells matches header length (pad if necessary)
                    while(cplCells.length < cplHeaders.length) cplCells.push('-');

                    md += `| Sub-CPMK ${row.subCpmkIndex} | ${cplCells.join(' | ')} | ${rowWeight}% | ${rowWeeks} |\n`;
                });

                // Footer Row
                // Total | [Empty]... | 100% | 14
                const footerCplCells = new Array(cplHeaders.length).fill('');
                md += `| **Total** | ${footerCplCells.join(' | ')} | **${totalWeight}%** | **${totalWeeks}** |`;

                updateData('evaluationPlan', md);
            }
            break;
      }
      setStatus({ msg: "Berhasil diproses!", type: 'success' });
    } catch (err: any) {
      setStatus({ msg: err.message, type: 'error' });
    } finally {
      setLoadingBtn(null);
      // Auto-hide success message after 3s
      if (status.type !== 'error') {
        setTimeout(() => setStatus({ msg: null, type: 'success' }), 5000);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500" >
      <MessageBox message={status.msg} type={status.type} />

      {/* Identitas MK Section */}
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Identitas Mata Kuliah</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <Input 
                label="Nama Mata Kuliah" 
                id="courseName" 
                placeholder="Contoh: Pemrograman Web"
                value={data.courseName}
                onChange={(e) => updateData('courseName', e.target.value)}
            />
             <Input 
                label="Kode Mata Kuliah" 
                id="courseCode" 
                placeholder="Contoh: 2407025004"
                value={data.courseCode}
                onChange={(e) => updateData('courseCode', e.target.value)}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
             <div className="w-full">
                <label htmlFor="studyProgram" className="block text-sm font-semibold text-gray-700 mb-2">
                    Program Studi
                </label>
                <div className="relative">
                    <select
                        id="studyProgram"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 appearance-none text-gray-700 cursor-pointer"
                        value={data.studyProgram}
                        onChange={handleProdiChange}
                    >
                        <option value="" disabled>Pilih Program Studi...</option>
                        {Object.keys(PRODI_DATA).map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                     <Input 
                        label="Bobot SKS" 
                        id="credits" 
                        type="number" 
                        min={1} max={6}
                        value={data.credits}
                        onChange={(e) => updateData('credits', parseInt(e.target.value) || 0)}
                    />
                </div>
                 <div className="flex-1">
                     <Input 
                        label="Semester" 
                        id="semester" 
                        placeholder="Contoh: III"
                        value={data.semester}
                        onChange={(e) => updateData('semester', e.target.value)}
                    />
                </div>
            </div>
        </div>

        <div className="mb-4">
             <Input 
                label="Tanggal Penyusunan" 
                id="compilationDate" 
                placeholder="Contoh: 21-11-2025"
                value={data.compilationDate}
                onChange={(e) => updateData('compilationDate', e.target.value)}
            />
        </div>
      </section>

      {/* Otorisasi Section */}
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Otorisasi (Tanda Tangan)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input 
                label="Dosen Pengembang RPS" 
                id="developerName" 
                placeholder="Nama & Gelar"
                value={data.developerName}
                onChange={(e) => updateData('developerName', e.target.value)}
            />
            <Input 
                label="Koordinator Bidang Keahlian" 
                id="koordinator" 
                placeholder="Nama & Gelar"
                value={data.koordinatorField}
                onChange={(e) => updateData('koordinatorField', e.target.value)}
            />
            <Input 
                label="Ketua Prodi" 
                id="kaprodi" 
                placeholder="Nama & Gelar"
                value={data.kaprodiField}
                onChange={(e) => updateData('kaprodiField', e.target.value)}
            />
        </div>
      </section>

      <div>
        <Textarea 
            label="Capaian Pembelajaran Lulusan (CPL)" 
            id="cpl"
            placeholder="Pilih Program Studi, isi Nama MK, lalu klik tombol filter untuk mendapatkan CPL yang relevan..."
            value={data.cpl}
            onChange={(e) => updateData('cpl', e.target.value)}
            className="min-h-[200px]"
        />
        <div className="flex justify-between items-start mt-2">
             <p className="text-xs text-gray-500 italic max-w-[60%]">
                *Klik tombol filter di kanan untuk memilih 2-4 CPL yang paling relevan dari database Prodi berdasarkan Mata Kuliah.
            </p>
            <Button 
                variant="search" 
                className="py-2 px-4 text-xs"
                onClick={() => handleGenerate(GenerationType.SELECT_CPL)}
                isLoading={loadingBtn === GenerationType.SELECT_CPL}
                disabled={!data.studyProgram || !data.courseName}
            >
                <Filter className="w-3 h-3 mr-2" /> Filter 2-4 CPL Sesuai MK
            </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Textarea 
            label="Capaian Pembelajaran Mata Kuliah (CPMK)" 
            id="cpmk"
            placeholder="CPMK..."
            value={data.cpmk}
            onChange={(e) => updateData('cpmk', e.target.value)}
        />
        <div className="flex justify-end">
            <Button 
                variant="secondary" 
                onClick={() => handleGenerate(GenerationType.CPMK)}
                isLoading={loadingBtn === GenerationType.CPMK}
            >
                <Sparkles className="w-4 h-4 mr-2" /> Generate CPMK
            </Button>
        </div>
      </div>

      {/* New Sub-CPMK Field */}
      <div className="space-y-2">
        <Textarea 
            label="Sub-CPMK (Kemampuan Akhir Tiap Tahapan)" 
            id="subCpmk"
            placeholder="8 butir Sub-CPMK dengan format A-B-C-D..."
            value={data.subCpmk}
            onChange={(e) => updateData('subCpmk', e.target.value)}
        />
        <div className="flex justify-end">
            <Button 
                variant="secondary" 
                onClick={() => handleGenerate(GenerationType.SUB_CPMK)}
                isLoading={loadingBtn === GenerationType.SUB_CPMK}
            >
                <Sparkles className="w-4 h-4 mr-2" /> Generate Sub-CPMK (ABCD)
            </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Textarea 
            label="Deskripsi Singkat Mata Kuliah" 
            id="shortDescription"
            placeholder="Deskripsi singkat..."
            value={data.shortDescription}
            onChange={(e) => updateData('shortDescription', e.target.value)}
        />
        <div className="flex justify-end">
            <Button 
                variant="secondary" 
                onClick={() => handleGenerate(GenerationType.DESCRIPTION)}
                isLoading={loadingBtn === GenerationType.DESCRIPTION}
            >
                <FileText className="w-4 h-4 mr-2" /> {data.shortDescription ? 'Rapikan & Format' : 'Generate Deskripsi'}
            </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Textarea 
            label="Bahan Kajian (Materi Pembelajaran)" 
            id="bahanKajian"
            placeholder="Daftar topik..."
            value={data.bahanKajian}
            onChange={(e) => updateData('bahanKajian', e.target.value)}
        />
        <div className="flex justify-end">
            <Button 
                variant="secondary" 
                onClick={() => handleGenerate(GenerationType.BAHAN_KAJIAN)}
                isLoading={loadingBtn === GenerationType.BAHAN_KAJIAN}
            >
                <List className="w-4 h-4 mr-2" /> {data.bahanKajian ? 'Rapikan & Format' : 'Generate Bahan Kajian'}
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
            <Textarea 
                label="Pustaka Utama" 
                id="mainRefs"
                placeholder="Paste daftar referensi utama..."
                value={data.mainReferences}
                onChange={(e) => updateData('mainReferences', e.target.value)}
            />
            <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => handleGenerate(GenerationType.MAIN_REFS)}
                isLoading={loadingBtn === GenerationType.MAIN_REFS}
            >
                <BookOpen className="w-4 h-4 mr-2" /> Format APA
            </Button>
        </div>
        <div className="space-y-2">
            <Textarea 
                label="Pustaka Pendukung" 
                id="supportRefs"
                placeholder="Paste daftar referensi pendukung..."
                value={data.supportingReferences}
                onChange={(e) => updateData('supportingReferences', e.target.value)}
            />
            <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => handleGenerate(GenerationType.SUPPORT_REFS)}
                isLoading={loadingBtn === GenerationType.SUPPORT_REFS}
            >
                <BookOpen className="w-4 h-4 mr-2" /> Format APA
            </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Textarea 
            label="Media Pembelajaran" 
            id="media"
            placeholder="PPT, Canva, dsb..."
            rows={2}
            className="min-h-[80px]"
            value={data.learningMedia}
            onChange={(e) => updateData('learningMedia', e.target.value)}
        />
        <div className="flex justify-end">
            <Button 
                variant="secondary" 
                onClick={() => handleGenerate(GenerationType.MEDIA)}
                isLoading={loadingBtn === GenerationType.MEDIA}
            >
                <MonitorPlay className="w-4 h-4 mr-2" /> Generate Media
            </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Textarea 
            label="Rencana Evaluasi (Matriks)" 
            id="evaluation"
            placeholder="Matriks mapping Sub-CPMK ke CPL, Bobot, dan Minggu..."
            rows={8}
            value={data.evaluationPlan}
            onChange={(e) => updateData('evaluationPlan', e.target.value)}
        />
        <div className="flex justify-end">
            <Button 
                variant="secondary" 
                onClick={() => handleGenerate(GenerationType.EVALUATION)}
                isLoading={loadingBtn === GenerationType.EVALUATION}
                disabled={!data.cpl || !data.subCpmk}
            >
                <BarChart className="w-4 h-4 mr-2" /> Generate Evaluasi (Matriks)
            </Button>
        </div>
      </div>
    </div>
  );
};