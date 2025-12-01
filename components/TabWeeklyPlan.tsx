import React, { useState } from 'react';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { MessageBox } from './ui/MessageBox';
import { RPSData, GenerationType } from '../types';
import { generateContent } from '../services/geminiService';
import { Calendar, Sparkles } from 'lucide-react';

interface TabWeeklyPlanProps {
  data: RPSData;
  updateData: (key: keyof RPSData, value: string | number) => void;
}

export const TabWeeklyPlan: React.FC<TabWeeklyPlanProps> = ({ data, updateData }) => {
  const [status, setStatus] = useState<{ msg: string | null; type: 'loading' | 'error' | 'success' }>({ msg: null, type: 'success' });
  const [loading, setLoading] = useState(false);

  const handleGenerateWeekly = async () => {
    // Validation
    const requiredKeys: (keyof RPSData)[] = ['courseName', 'cpmk', 'subCpmk', 'bahanKajian', 'mainReferences', 'evaluationPlan', 'learningMedia'];
    const missing = requiredKeys.filter(k => !data[k]);
    
    if (missing.length > 0) {
      setStatus({ msg: "Harap lengkapi semua data di tab 'Detail RPS' (CPMK, Sub-CPMK, Bahan Kajian, Referensi, Media, Evaluasi).", type: 'error' });
      return;
    }

    setLoading(true);
    setStatus({ msg: "Menyusun Rencana Pembelajaran 16 Minggu (ini mungkin memakan waktu)...", type: 'loading' });

    const prompt = `
      Buatkan Rencana Pembelajaran 16 Minggu (termasuk 1 UTS di Minggu 8 dan 1 UAS di Minggu 16).
      Data Mata Kuliah:
      - Nama: ${data.courseName}
      - CPMK: ${data.cpmk}
      - Sub-CPMK (DAFTAR INI WAJIB DIGUNAKAN UNTUK KOLOM 2): 
      ${data.subCpmk}
      - Bahan Kajian: ${data.bahanKajian}
      - Ref Utama: ${data.mainReferences}
      - Ref Pendukung: ${data.supportingReferences}
      - Media: ${data.learningMedia}
      - Evaluasi: ${data.evaluationPlan}

      Instruksi Umum:
      - Pastikan output JSON valid.
      - PENTING: Gunakan karakter baris baru (ENTER) untuk memisahkan setiap poin/kalimat dalam satu kolom agar tampilan rapi ke bawah.

      Instruksi Per Kolom:
      1. 16 Minggu.
      2. Kolom 'fullCpmk' (Sub-CPMK):
         - PENTING: Isi kolom ini dengan kalimat Sub-CPMK yang diambil dari daftar Sub-CPMK di atas.
         - Pilih Sub-CPMK yang paling selaras dengan "Bahan Kajian" pada minggu tersebut.
         - JANGAN membuat Sub-CPMK baru, gunakan yang ada.
      3. Kolom 'indicators' (Indikator):
         - Buat 2-4 Indikator Penilaian.
         - WAJIB dipisahkan dengan ENTER (baris baru) untuk setiap poin indikator.
         - Gunakan simbol bullet (*) di awal setiap indikator.
         - Gunakan format SMART (Specific, Measurable, Achievable, Relevant, Time-bound).
         - Fokus pada tindakan yang dapat diobservasi (observable).
         - Gunakan awalan kata seperti "Ketepatan menganalisis...", "Kesesuaian menjelaskan...", "Ketepatan menyusun...".
      4. Kolom 'criteriaAndAssessment' (Kolom 4 - Kriteria & Bentuk Penilaian):
         - WAJIB pisahkan dengan ENTER (baris baru) antar poin.
         - Jika bentuk penilaian adalah Tes atau Quiz, WAJIB ditulis "Tes Berbasis HOTS" atau "Quiz Berbasis HOTS".
         - Format:
           Kriteria: [Isi Kriteria/Rubrik]
           Bentuk Penilaian: [Isi Bentuk Tes/Non-Tes]
      5. Kolom 'learningMethodAndAssignment' (Kolom 5):
         - WAJIB pisahkan setiap item dengan ENTER (baris baru).
         - Format urutan harus seperti ini:
           Bentuk Pembelajaran: [Isi]
           BM: [Waktu]
           TM: 2 x 50 menit (Sesuaikan dengan SKS)
           TT: [Waktu]
           Metode Pembelajaran: [Isi]
      6. Kolom 'materialAndRefs' (Kolom 6 - Materi Pembelajaran [Pustaka]):
         - WAJIB pisahkan dengan ENTER (baris baru).
         - Format:
           [Topik Bahan Kajian]
           Referensi Utama: [Sebutkan Nomor saja, misal: Nomor 1 dan 2]
           Referensi Pendukung: [Nomor]
      7. Kolom 'weight' (Kolom 7) WAJIB berisi persentase. Setiap pertemuan (minggu) WAJIB memiliki bobot minimal 5%. Total keseluruhan minggu 1-16 harus 100%.
    `;

    try {
      const result = await generateContent(prompt, (await import('../types')).WEEKLY_PLAN_SCHEMA);
      
      if (result?.weeklyPlan) {
        const headers = ["Mg", "Sub-CPMK", "Indikator", "Kriteria & Bentuk", "Bentuk & Metode [Waktu]", "Materi [Pustaka]", "Bobot (%)"];
        let md = `| ${headers.join(' | ')} |\n| :---: | :--- | :--- | :--- | :--- | :--- | :---: |\n`;
        
        result.weeklyPlan.forEach((w: any) => {
            // Clean up formatting for Markdown table compatibility (replace newlines with <br>)
            const clean = (s: string) => (s || "").replace(/\n/g, '<br>');
            const indicators = (w.indicators || "").replace(/\n/g, '<br>').replace(/[*•-]/g, '&bull;');

            md += `| ${w.week} | ${clean(w.fullCpmk)} | ${indicators} | ${clean(w.criteriaAndAssessment)} | ${clean(w.learningMethodAndAssignment)} | ${clean(w.materialAndRefs)} | ${w.weight} |\n`;
        });

        updateData('weeklyPlan', md);
        setStatus({ msg: "Rencana Pembelajaran berhasil dibuat!", type: 'success' });
      }
    } catch (err: any) {
      setStatus({ msg: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <MessageBox message={status.msg} type={status.type} />
      
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <div>
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Rencana Mingguan (1-16)
                </h3>
                <p className="text-gray-500 text-sm mt-1">Pastikan data di tab sebelumnya sudah lengkap.</p>
            </div>
            <Button onClick={handleGenerateWeekly} isLoading={loading}>
                <Sparkles className="w-4 h-4 mr-2" /> Generate Rencana
            </Button>
        </div>
        
        <Textarea 
            label="Preview Markdown Table" 
            id="weeklyPlan"
            value={data.weeklyPlan}
            onChange={(e) => updateData('weeklyPlan', e.target.value)}
            className="min-h-[500px] font-mono text-sm leading-relaxed"
            placeholder="Klik tombol Generate untuk membuat tabel..."
        />
      </div>
    </div>
  );
};