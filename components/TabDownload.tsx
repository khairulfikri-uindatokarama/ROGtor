import React, { useState } from 'react';
import { Button } from './ui/Button';
import { MessageBox } from './ui/MessageBox';
import { RPSData } from '../types';
import { Download, FileText } from 'lucide-react';
import FileSaver from 'file-saver';

interface TabDownloadProps {
  data: RPSData;
}

export const TabDownload: React.FC<TabDownloadProps> = ({ data }) => {
  const [status, setStatus] = useState<{ msg: string | null; type: 'loading' | 'error' | 'success' }>({ msg: null, type: 'success' });

  // Helper to convert Markdown table to HTML table for Word
  const convertMarkdownToHtml = (md: string, type: 'evaluation' | 'weekly') => {
    if (!md) return "<p>[Data Kosong]</p>";
    
    // Parse Markdown Table lines
    const lines = md.trim().split('\n');
    // Filter out separator lines (containing dashes '---')
    const dataLines = lines.filter(line => !line.includes('---'));
    
    // Header Row processing
    const headerRow = dataLines[0];
    const headers = headerRow.split('|').map(h => h.trim()).filter(h => h); // remove empty strings from split
    
    // Body Rows processing
    const bodyRows = dataLines.slice(1);
    
    let html = "<table style='width:100%; border-collapse:collapse; border:1px solid black; font-family:Times New Roman, serif; font-size:11pt;'>";
    
    if (type === 'evaluation') {
        // Standard rendering for Evaluation Matrix
        html += "<thead style='background-color:#59a7eb; font-weight:bold;'><tr>";
        headers.forEach(h => html += `<th style='border:1px solid black; padding:5px; text-align:center;'>${h}</th>`);
        html += "</tr></thead><tbody>";
        
        bodyRows.forEach(line => {
             const cells = line.split('|').slice(1, -1); // remove outer pipes
             html += "<tr>";
             cells.forEach(cell => {
                 let content = cell.trim().replace(/<br>/g, '<br/>');
                 html += `<td style='border:1px solid black; padding:5px; vertical-align:top; text-align:center;'>${content}</td>`;
             });
             html += "</tr>";
        });
        html += "</tbody></table>";
        
    } else if (type === 'weekly') {
        // Custom rendering for Weekly Plan to match Template (8 Columns)
        // Current MD: | Mg | Sub-CPMK | Indikator | Kriteria & Bentuk | Bentuk & Metode [Waktu] | Materi [Pustaka] | Bobot (%) |
        // Template:   | Mg | Sub-CPMK | Indikator | Kriteria & Bentuk | Luring | Daring | Materi | Bobot |
        
        html += `
            <thead style='background-color:#59a7eb; font-weight:bold; text-align:center;'>
                <tr>
                    <th rowspan="2" style="border:1px solid black; padding:4px;">Mg<br>Ke-</th>
                    <th rowspan="2" style="border:1px solid black; padding:4px;">Sub-CPMK (Sebagai<br>Kemampuan Akhir yang<br>Diharapkan)</th>
                    <th colspan="2" style="border:1px solid black; padding:4px;">Penilaian</th>
                    <th colspan="2" style="border:1px solid black; padding:4px;">Bentuk Pembelajaran;<br>Metode Pembelajaran;<br>Penugasan Mahasiswa;<br>[Estimasi Waktu]</th>
                    <th rowspan="2" style="border:1px solid black; padding:4px;">Materi<br>Pembelajaran<br>[Pustaka]</th>
                    <th rowspan="2" style="border:1px solid black; padding:4px;">Bobot<br>Penilaian<br>(%)</th>
                </tr>
                <tr>
                    <th style="border:1px solid black; padding:4px;">Indikator</th>
                    <th style="border:1px solid black; padding:4px;">Kriteria &<br>Bentuk</th>
                    <th style="border:1px solid black; padding:4px;">Luring</th>
                    <th style="border:1px solid black; padding:4px;">Daring</th>
                </tr>
                <tr style="font-size:9pt; background-color:#f0f0f0;">
                    <td style="border:1px solid black;">(1)</td>
                    <td style="border:1px solid black;">(2)</td>
                    <td style="border:1px solid black;">(3)</td>
                    <td style="border:1px solid black;">(4)</td>
                    <td style="border:1px solid black;">(5)</td>
                    <td style="border:1px solid black;">(6)</td>
                    <td style="border:1px solid black;">(7)</td>
                    <td style="border:1px solid black;">(8)</td>
                </tr>
            </thead>
            <tbody>
        `;
        
        bodyRows.forEach(line => {
            const rawCells = line.split('|');
            // rawCells[0] is empty, rawCells[1] is Mg, etc.
            // 1:Mg, 2:Sub, 3:Ind, 4:Krit, 5:Method(Combined), 6:Material, 7:Weight
            
            if (rawCells.length < 8) return; // Skip invalid rows
            
            const mg = rawCells[1].trim();
            const sub = rawCells[2].trim().replace(/<br>/g, '<br/>');
            const ind = rawCells[3].trim().replace(/<br>/g, '<br/>').replace(/&bull;/g, '•');
            const krit = rawCells[4].trim().replace(/<br>/g, '<br/>');
            const method = rawCells[5].trim().replace(/<br>/g, '<br/>'); // Put this in Luring
            const materi = rawCells[6].trim().replace(/<br>/g, '<br/>');
            const bobot = rawCells[7].trim();
            
            html += `
                <tr>
                    <td style='border:1px solid black; padding:5px; vertical-align:top; text-align:center;'>${mg}</td>
                    <td style='border:1px solid black; padding:5px; vertical-align:top;'>${sub}</td>
                    <td style='border:1px solid black; padding:5px; vertical-align:top;'>${ind}</td>
                    <td style='border:1px solid black; padding:5px; vertical-align:top;'>${krit}</td>
                    <td style='border:1px solid black; padding:5px; vertical-align:top;'>${method}</td>
                    <td style='border:1px solid black; padding:5px; vertical-align:top; background-color:#f9f9f9;'></td> <!-- Daring Empty -->
                    <td style='border:1px solid black; padding:5px; vertical-align:top;'>${materi}</td>
                    <td style='border:1px solid black; padding:5px; vertical-align:top; text-align:center;'>${bobot}</td>
                </tr>
            `;
        });
        html += "</tbody></table>";
    }
    
    return html;
  };

  const convertListToHtml = (text: string) => {
      if (!text) return "-";
      return text.split('\n').map(l => `<div style='margin-bottom:4px;'>${l}</div>`).join('');
  };
  
  // Helper to create list rows for CPL/CPMK tables
  const createListTableRows = (text: string, prefix: string) => {
      if(!text) return "";
      return text.split('\n').map(line => {
          // Try to split by first colon or space to separate Code from Text if possible, otherwise just dump text
          // Example "CPL-1: Mampu..."
          const match = line.match(/^([A-Za-z0-9-]+)[:\.\)]\s*(.*)/);
          const code = match ? match[1] : prefix;
          const content = match ? match[2] : line;
          
          return `
            <tr>
                <td style="border:1px solid black; padding:5px; font-weight:bold; width:100px; vertical-align:top;">${code}</td>
                <td style="border:1px solid black; padding:5px; vertical-align:top;">${content}</td>
            </tr>
          `;
      }).join('');
  };

  const handleDownload = () => {
    if (!data.courseName || !data.weeklyPlan) {
        setStatus({ msg: "Data belum lengkap. Harap lengkapi Detail RPS dan Generate Rencana Mingguan.", type: 'error' });
        return;
    }

    setStatus({ msg: "Mempersiapkan dokumen sesuai template...", type: 'loading' });

    try {
        const logoUrl = "https://upload.wikimedia.org/wikipedia/id/3/39/Logo_UIN_Palu.png";
        
        const html = `
            <!DOCTYPE html>
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset='utf-8'>
                <title>RPS ${data.courseName}</title>
                <style>
                    body { font-family: 'Times New Roman', serif; font-size: 11pt; }
                    table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
                    td, th { border: 1px solid black; padding: 4px; vertical-align: top; }
                    .header-bg { background-color: #59a7eb; }
                    .no-border { border: none; }
                </style>
            </head>
            <body>
                <!-- HEADER TABLE -->
                <table>
                  <tr>
                    <td rowspan="4" align="center" style="width: 15%; vertical-align: middle;">
                      <img src="${logoUrl}" width="90" height="105" alt="Logo UIN">
                    </td>
                    <td colspan="5" align="center" class="header-bg">
                      <p style="margin:0; font-size:14pt; font-weight:bold;">UNIVERSITAS ISLAM NEGERI DATOKARAMA PALU</p>
                      <p style="margin:0; font-size:12pt; font-weight:bold;">FAKULTAS SAINS DAN TEKNOLOGI</p>
                      <p style="margin:0; font-size:12pt; font-weight:bold;">PROGRAM STUDI ${data.studyProgram.toUpperCase()}</p>
                      <p style="margin:0; font-size:12pt; font-weight:bold;">TAHUN AKADEMIK 2025-2026</p>
                    </td>
                  </tr>
                  <tr class="header-bg">
                      <td colspan="5" align="center" style="font-weight:bold;">RENCANA PEMBELAJARAN SEMESTER</td>
                  </tr>
                  <tr style="font-weight:bold; text-align:center;">
                      <td>Mata Kuliah</td>
                      <td>Kode Mata Kuliah</td>
                      <td>Bobot (SKS)</td>
                      <td>Semester</td>
                      <td>Tgl. Penyusunan</td>
                  </tr>
                  <tr style="text-align:center;">
                      <td>${data.courseName}</td>
                      <td>${data.courseCode}</td>
                      <td>${data.credits}</td>
                      <td>${data.semester}</td>
                      <td>${data.compilationDate}</td>
                  </tr>
                </table>

                <!-- OTORITASI TABLE -->
                <table style="margin-top:-21px;">
                    <tr>
                        <td style="width:20%; font-weight:bold; vertical-align:middle;">OTORITASI</td>
                        <td style="width:26%;">
                            <div style="margin-bottom:40px; font-weight:bold;">Dosen Pengembang RPS</div>
                            <u>${data.developerName}</u>
                        </td>
                        <td style="width:27%;">
                            <div style="margin-bottom:40px; font-weight:bold;">Koordinator Bidang Keahlian</div>
                            <u>${data.koordinatorField}</u>
                        </td>
                        <td style="width:27%;">
                            <div style="margin-bottom:40px; font-weight:bold;">Ketua Prodi</div>
                            <u>${data.kaprodiField}</u>
                        </td>
                    </tr>
                </table>

                <!-- CAPAIAN PEMBELAJARAN (CPL) -->
                <table>
                    <tr>
                        <td colspan="2" class="header-bg" style="font-weight:bold;">Capaian Pembelajaran</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="font-weight:bold; background-color:#f0f0f0;">CPL-PRODI yang dibebankan pada MK</td>
                    </tr>
                    ${createListTableRows(data.cpl, "CPL")}
                    
                    <tr>
                        <td colspan="2" style="font-weight:bold; background-color:#f0f0f0;">Capaian Pembelajaran Mata Kuliah (CPMK)</td>
                    </tr>
                    ${createListTableRows(data.cpmk, "CPMK")}
                    
                    <tr>
                         <td colspan="2" style="font-weight:bold; background-color:#f0f0f0;">CPL &#8594; Sub-CPMK</td>
                    </tr>
                     ${createListTableRows(data.subCpmk, "Sub-CPMK")}
                </table>

                <!-- DESKRIPSI SINGKAT -->
                <table>
                    <tr>
                        <td style="width:25%; font-weight:bold;">Deskripsi Singkat MK</td>
                        <td>${convertListToHtml(data.shortDescription)}</td>
                    </tr>
                    <tr>
                        <td style="font-weight:bold;">Bahan Kajian / Materi Pembelajaran</td>
                        <td>${convertListToHtml(data.bahanKajian)}</td>
                    </tr>
                    <tr>
                        <td style="font-weight:bold;">Pustaka</td>
                        <td>
                            <strong>Utama:</strong><br/>
                            ${convertListToHtml(data.mainReferences)}
                            <br/>
                            <strong>Pendukung:</strong><br/>
                            ${convertListToHtml(data.supportingReferences)}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight:bold;">Media Pembelajaran</td>
                        <td>${data.learningMedia}</td>
                    </tr>
                    <tr>
                        <td style="font-weight:bold;">Dosen Pengampu</td>
                        <td>${data.developerName}</td>
                    </tr>
                    <tr>
                        <td style="font-weight:bold;">Mata Kuliah Syarat</td>
                        <td>-</td>
                    </tr>
                </table>
                
                <br/>
                
                <!-- EVALUASI MATRIX (Using Markdown Parser) -->
                <h3 style="text-align:center;">Matriks Evaluasi</h3>
                ${convertMarkdownToHtml(data.evaluationPlan, 'evaluation')}
                
                <br style="page-break-before:always" />

                <!-- WEEKLY PLAN (Using Custom Parser) -->
                <h3 style="text-align:center;">Rencana Pembelajaran Mingguan</h3>
                ${convertMarkdownToHtml(data.weeklyPlan, 'weekly')}

            </body>
            </html>
        `;

        const blob = new Blob([html], { type: "application/msword;charset=utf-8" });
        const saveFile = (FileSaver as any).saveAs || FileSaver;
        saveFile(blob, `RPS_${data.courseName.replace(/\s+/g, '_')}_${data.studyProgram.replace(/\s+/g, '_')}.doc`);
        
        setStatus({ msg: "Download RPS Template Berhasil!", type: 'success' });

    } catch (e: any) {
        setStatus({ msg: "Gagal download: " + e.message, type: 'error' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full py-12 space-y-8 animate-in fade-in duration-500">
        <div className="text-center max-w-xl mx-auto">
            <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <FileText className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Siap Mengunduh Dokumen?</h2>
            <p className="text-gray-600">
                Dokumen akan diformat secara otomatis sesuai Template RPS UIN Datokarama Palu (Format .doc).
            </p>
        </div>

        <MessageBox message={status.msg} type={status.type} />

        <Button onClick={handleDownload} className="px-8 py-4 text-lg shadow-xl bg-blue-600 hover:bg-blue-700">
            <Download className="w-6 h-6 mr-3" /> Download RPS (.doc)
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 mt-8 w-full max-w-3xl">
            <div className="bg-white p-4 rounded border text-center">
                <strong className="block text-gray-800 mb-1">Standard UIN Palu</strong>
                Layout header, tabel, dan tanda tangan sesuai template.
            </div>
            <div className="bg-white p-4 rounded border text-center">
                <strong className="block text-gray-800 mb-1">Tabel 8 Kolom</strong>
                Format Luring/Daring terpisah secara otomatis.
            </div>
            <div className="bg-white p-4 rounded border text-center">
                <strong className="block text-gray-800 mb-1">Editable Word</strong>
                Dapat diedit penuh di Microsoft Word.
            </div>
        </div>
    </div>
  );
};