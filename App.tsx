import React, { useState } from 'react';
import { TabDetailRPS } from './components/TabDetailRPS';
import { TabWeeklyPlan } from './components/TabWeeklyPlan';
import { TabDownload } from './components/TabDownload';
import { RPSData } from './types';
import { Layout, BookOpen, Download, GraduationCap } from 'lucide-react';

// Initial State
const initialData: RPSData = {
  courseName: '',
  courseCode: '',
  studyProgram: '',
  credits: 3,
  semester: 'III',
  compilationDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  developerName: '',
  koordinatorField: '',
  kaprodiField: '',
  cpl: '',
  cpmk: '',
  subCpmk: '',
  shortDescription: '',
  bahanKajian: '',
  mainReferences: '',
  supportingReferences: '',
  learningMedia: '',
  evaluationPlan: '',
  weeklyPlan: ''
};

function App() {
  const [activeTab, setActiveTab] = useState<'detail' | 'weekly' | 'download'>('detail');
  const [data, setData] = useState<RPSData>(initialData);

  const updateData = (key: keyof RPSData, value: string | number) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] text-gray-800 flex flex-col">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6 px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight mb-2">
            Selamat Datang Di Aplikasi ROGtor
          </h1>
          <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-3">
            FSAINTEK UIN Datokarama Palu Sulawesi Tengah
          </h2>
          <p className="text-gray-500 font-medium text-sm">
            Aplikasi ini merupakan aplikasi pembuatan RPS OBE secara otomatis menggunakan bantuan AI. 
          </p>
           
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row min-h-[800px]">
            
            {/* Sidebar / Vertical Tabs */}
            <aside className="w-full lg:w-64 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 flex-shrink-0">
              <nav className="flex lg:flex-col p-2 lg:p-0 sticky top-0">
                
                <button
                  onClick={() => setActiveTab('detail')}
                  className={`flex-1 lg:flex-none text-left px-6 py-5 font-semibold text-sm sm:text-base transition-all duration-200 border-l-4 flex items-center
                    ${activeTab === 'detail' 
                      ? 'bg-white border-blue-500 text-blue-600 shadow-[rgba(0,0,0,0.05)_-2px_0_5px]' 
                      : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                >
                  <BookOpen className={`w-5 h-5 mr-3 ${activeTab === 'detail' ? 'text-blue-500' : 'text-gray-400'}`} />
                  Detail RPS
                </button>

                <button
                  onClick={() => setActiveTab('weekly')}
                  className={`flex-1 lg:flex-none text-left px-6 py-5 font-semibold text-sm sm:text-base transition-all duration-200 border-l-4 flex items-center
                    ${activeTab === 'weekly' 
                      ? 'bg-white border-blue-500 text-blue-600 shadow-[rgba(0,0,0,0.05)_-2px_0_5px]' 
                      : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                >
                  <Layout className={`w-5 h-5 mr-3 ${activeTab === 'weekly' ? 'text-blue-500' : 'text-gray-400'}`} />
                  Rencana Pembelajaran
                </button>

                <button
                  onClick={() => setActiveTab('download')}
                  className={`flex-1 lg:flex-none text-left px-6 py-5 font-semibold text-sm sm:text-base transition-all duration-200 border-l-4 flex items-center
                    ${activeTab === 'download' 
                      ? 'bg-white border-blue-500 text-blue-600 shadow-[rgba(0,0,0,0.05)_-2px_0_5px]' 
                      : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                >
                  <Download className={`w-5 h-5 mr-3 ${activeTab === 'download' ? 'text-blue-500' : 'text-gray-400'}`} />
                  Download RPS
                </button>

              </nav>
            </aside>

            {/* Content Area */}
            <div className="flex-grow p-6 sm:p-10 bg-white overflow-y-auto max-h-[calc(100vh-200px)] lg:max-h-none">
              {activeTab === 'detail' && (
                <TabDetailRPS data={data} updateData={updateData} />
              )}
              {activeTab === 'weekly' && (
                <TabWeeklyPlan data={data} updateData={updateData} />
              )}
              {activeTab === 'download' && (
                <TabDownload data={data} />
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;