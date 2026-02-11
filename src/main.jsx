import React, { useState } from 'react';
import { 
  Search, MapPin, Briefcase, FileText, CheckCircle, ArrowRight, 
  ChevronLeft, Menu, X, Users, ShieldCheck, 
  LayoutDashboard, Building2, UserCircle, LogIn, Plus, Edit3, Send, Save
} from 'lucide-react';

// --- DATI MOCK (In un'app reale questi verrebbero da un API/Database) ---
const INITIAL_COMPANIES = [
  { id: 101, name: "Logistica Nord S.p.A.", sector: "Trasporti", city: "Milano", contact: "Mario Rossi", email: "hr@lognord.it" },
  { id: 102, name: "Meccanica Moderna", sector: "Manifatturiero", city: "Torino", contact: "Laura Bianchi", email: "l.bianchi@mecmod.com" }
];

const INITIAL_CANDIDATES = [
  { id: 1001, city: "Milano", skills: ["Logistica", "Guida Muletto"], notes: "Persona puntuale, ha seguito corso sicurezza.", realName: "Giovanni N." },
  { id: 1002, city: "Roma", skills: ["Cucina", "HACCP", "Magazzino"], notes: "Ottime doti relazionali.", realName: "Paolo B." }
];

const INITIAL_JOBS = [
  { id: 1, title: "Addetto Logistica", sector: "Logistica", location: "Milano", type: "Full-time", description: "Gestione magazzino merci.", companyId: 101 },
  { id: 2, title: "Manutentore Meccanico", sector: "Industria", location: "Torino", type: "Determinato", description: "Manutenzione impianti industriali.", companyId: 102 }
];

const INITIAL_APPLICATIONS = [
  { id: 1, candidateId: 1001, jobId: 1, status: "In attesa", candidateMessage: "Ho lavorato 5 anni in magazzino.", date: "2024-05-12" }
];

/**
 * Componente App: Gestisce il routing interno e lo stato globale dell'applicazione.
 * @returns {JSX.Element}
 */
export default function App() {
  // Stati di navigazione e permessi
  const [view, setView] = useState('home'); 
  const [adminSubView, setAdminSubView] = useState('dashboard');
  const [userRole, setUserRole] = useState(null); // 'operator' o null
  
  // Stato dei Dati (Sincronizzazione simulata)
  const [jobs] = useState(INITIAL_JOBS);
  const [companies] = useState(INITIAL_COMPANIES);
  const [candidates] = useState(INITIAL_CANDIDATES);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);

  // Stato Selezioni e Form
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // --- LOGICA UTENTE ---

  const handleLogin = (e) => {
    e.preventDefault();
    setUserRole('operator');
    setView('admin');
    setAdminSubView('dashboard');
  };

  const logout = () => {
    setUserRole(null);
    setView('home');
  };

  // --- COMPONENTI UI NAVBAR ---
  const Navbar = () => (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
        <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
          <ShieldCheck className="text-blue-600 w-8 h-8 mr-2" />
          <span className="font-bold text-xl text-slate-800">Second Chance</span>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={() => setView('list')} className="text-slate-600 hover:text-blue-600 font-medium">Offerte</button>
          {userRole === 'operator' ? (
            <button onClick={() => setView('admin')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md flex items-center">
              <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
            </button>
          ) : (
            <button onClick={() => setView('login')} className="flex items-center text-slate-600 font-medium border px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
              <LogIn className="w-4 h-4 mr-2" /> Login Operatore
            </button>
          )}
        </div>
      </div>
    </nav>
  );

  // --- VISTE PUBBLICHE (CANDIDATI) ---

  const HomeView = () => (
    <div className="animate-in fade-in duration-500">
      <section className="py-20 text-center bg-slate-50 border-b">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Il talento merita una <br/><span className="text-blue-600">seconda occasione.</span></h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 px-4">Intermediazione sicura per il reinserimento lavorativo assistito.</p>
        <button onClick={() => setView('list')} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">Esplora Offerte</button>
      </section>
      <section className="py-20 max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
        <div className="p-6">
          <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"><Users className="text-blue-600"/></div>
          <h3 className="font-bold text-xl mb-2 text-slate-800">Anonimato</h3>
          <p className="text-slate-500 leading-relaxed">I tuoi dati reali sono visibili solo agli operatori che curano il tuo match.</p>
        </div>
        <div className="p-6">
          <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"><ShieldCheck className="text-green-600"/></div>
          <h3 className="font-bold text-xl mb-2 text-slate-800">Certificazione</h3>
          <p className="text-slate-500 leading-relaxed">Gli operatori validano le tue competenze per darti più forza con le aziende.</p>
        </div>
        <div className="p-6">
          <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"><Building2 className="text-purple-600"/></div>
          <h3 className="font-bold text-xl mb-2 text-slate-800">Impatto Sociale</h3>
          <p className="text-slate-500 leading-relaxed">Collaboriamo con aziende partner che credono nella responsabilità sociale.</p>
        </div>
      </section>
    </div>
  );

  const JobListView = () => (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold mb-8 text-slate-800">Posizioni Aperte</h2>
      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job.id} onClick={() => {setSelectedJob(job); setView('detail');}} className="bg-white p-6 border rounded-2xl cursor-pointer hover:border-blue-400 hover:shadow-lg transition-all flex justify-between items-center group">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded">{job.sector}</span>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{job.title}</h3>
              <p className="text-slate-500 flex items-center text-sm"><MapPin className="w-4 h-4 mr-1 text-slate-400"/> {job.location} | {job.type}</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors text-slate-300">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const JobDetailView = () => (
    <div className="max-w-3xl mx-auto py-12 px-4 animate-in slide-in-from-bottom-4">
      <button onClick={() => setView('list')} className="flex items-center text-blue-600 mb-6 font-medium hover:underline"><ChevronLeft className="w-5 h-5 mr-1" /> Torna alle offerte</button>
      <div className="bg-white border rounded-3xl p-8 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900 mb-4">{selectedJob?.title}</h1>
        <div className="flex space-x-3 mb-8">
          <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600">{selectedJob?.location}</span>
          <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600">{selectedJob?.type}</span>
          <span className="bg-blue-50 px-3 py-1 rounded-full text-xs font-bold text-blue-600">Azienda Verificata</span>
        </div>
        <div className="prose prose-slate max-w-none mb-10">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Descrizione</h3>
          <p className="text-slate-600 leading-relaxed">{selectedJob?.description}</p>
        </div>
        <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl mb-8 flex items-start">
          <ShieldCheck className="text-blue-600 w-6 h-6 mr-3 mt-1 flex-shrink-0" />
          <p className="text-sm text-blue-800 italic">
            <strong>Nota sulla Privacy:</strong> Inviando la candidatura, i tuoi dati saranno visibili solo all'operatore. 
            L'azienda riceverà un profilo anonimizzato con le tue competenze.
          </p>
        </div>
        <button onClick={() => setView('apply')} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all">
          Candidati Ora
        </button>
      </div>
    </div>
  );

  const ApplicationForm = () => {
    const [msg, setMsg] = useState("");
    const [sent, setSent] = useState(false);
    
    const submitApp = () => {
      setSent(true);
      setTimeout(() => setView('home'), 3000);
    };

    if (sent) return (
      <div className="max-w-md mx-auto py-32 text-center animate-in zoom-in-95">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-100">
          <CheckCircle className="text-green-600 w-12 h-12"/>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Candidatura inviata!</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">I nostri operatori valuteranno il match con l'azienda. Riceverai un aggiornamento via email.</p>
        <button onClick={() => setView('home')} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800">Torna alla Home</button>
      </div>
    );

    return (
      <div className="max-w-xl mx-auto py-12 px-4 animate-in slide-in-from-right-4">
        <div className="bg-white border rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Inoltro Candidatura Protetta</h2>
          <p className="text-slate-500 mb-8">Stai applicando per: <span className="text-blue-600 font-bold">{selectedJob?.title}</span></p>
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl border">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Il tuo profilo (Autenticato)</p>
               <p className="font-bold text-slate-800">Candidato #1001 - Milano</p>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700">Perché sei la persona giusta per questo ruolo?</label>
              <textarea 
                rows="6" 
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all" 
                placeholder="Evidenzia qui le tue esperienze e competenze specifiche..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              ></textarea>
            </div>
            <button onClick={submitApp} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-md">
              Invia all'Operatore
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- AREA OPERATORE (BACK-OFFICE) ---

  const AdminView = () => {
    const renderSubView = () => {
      switch(adminSubView) {
        case 'dashboard': return <AdminDashboard />;
        case 'companies': return <CompanyList />;
        case 'candidates': return <CandidateList />;
        case 'request_detail': return <RequestDetail />;
        case 'company_form': return <CompanyForm />;
        case 'candidate_form': return <CandidateForm />;
        default: return <AdminDashboard />;
      }
    };

    return (
      <div className="flex min-h-screen bg-slate-50">
        <aside className="w-72 bg-slate-900 text-slate-300 p-6 flex flex-col fixed h-full">
          <div className="flex items-center text-white mb-12"><ShieldCheck className="mr-2 text-blue-500 w-8 h-8"/> <span className="font-black text-2xl tracking-tighter uppercase">Ops Panel</span></div>
          <nav className="flex-1 space-y-3">
            <button onClick={() => setAdminSubView('dashboard')} className={`w-full text-left p-4 rounded-2xl flex items-center transition-all ${adminSubView === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}><LayoutDashboard className="w-5 h-5 mr-4"/> Dashboard</button>
            <button onClick={() => setAdminSubView('companies')} className={`w-full text-left p-4 rounded-2xl flex items-center transition-all ${adminSubView === 'companies' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}><Building2 className="w-5 h-5 mr-4"/> Aziende Partner</button>
            <button onClick={() => setAdminSubView('candidates')} className={`w-full text-left p-4 rounded-2xl flex items-center transition-all ${adminSubView === 'candidates' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}><UserCircle className="w-5 h-5 mr-4"/> Anagrafica Utenti</button>
          </nav>
          <button onClick={logout} className="mt-auto flex items-center text-slate-500 hover:text-white transition-colors py-4 border-t border-slate-800"><X className="w-5 h-5 mr-3"/> Chiudi Sessione</button>
        </aside>
        <main className="flex-1 p-10 ml-72 overflow-y-auto">{renderSubView()}</main>
      </div>
    );
  };

  const AdminDashboard = () => (
    <div className="animate-in fade-in duration-300">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900">Dashboard Operativa</h1>
        <p className="text-slate-500 text-lg">Benvenuto, ecco le richieste che attendono un match.</p>
      </div>
      <div className="grid xl:grid-cols-2 gap-10">
        <div className="bg-white p-8 border rounded-[2rem] shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center text-blue-600 uppercase tracking-widest text-sm"><FileText className="w-5 h-5 mr-3"/> Candidature da Validare</h2>
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="p-5 border rounded-2xl flex justify-between items-center bg-slate-50 hover:bg-blue-50/50 transition-colors">
                <div>
                  <p className="font-bold text-slate-800">Candidato #{app.candidateId}</p>
                  <p className="text-xs text-slate-400 font-medium">Data invio: {app.date}</p>
                </div>
                <button onClick={() => {setSelectedRequest(app); setAdminSubView('request_detail');}} className="bg-white border text-blue-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all">Gestisci</button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-8 border rounded-[2rem] shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center text-green-600 uppercase tracking-widest text-sm"><Briefcase className="w-5 h-5 mr-3"/> Offerte di Lavoro Attive</h2>
          <div className="space-y-4">
            {jobs.map(j => (
              <div key={j.id} className="p-5 border rounded-2xl flex justify-between items-center bg-slate-50">
                <div><p className="font-bold text-slate-800">{j.title}</p><p className="text-xs text-slate-400">{j.location}</p></div>
                <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-black uppercase tracking-tighter">Attiva</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const RequestDetail = () => {
    const candidate = candidates.find(c => c.id === selectedRequest?.candidateId);
    return (
      <div className="animate-in slide-in-from-right-5">
        <button onClick={() => setAdminSubView('dashboard')} className="flex items-center text-blue-600 mb-8 font-bold hover:underline">
          <ChevronLeft className="w-5 h-5 mr-1" /> Indietro alla Dashboard
        </button>
        <div className="bg-white border rounded-[2.5rem] p-10 shadow-sm">
          <div className="flex justify-between items-start border-b border-slate-100 pb-8 mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Validazione Matching #{selectedRequest?.id}</h2>
              <p className="text-slate-400 mt-1 uppercase tracking-widest text-xs font-bold">Ricevuta il {selectedRequest?.date}</p>
            </div>
            <div className="bg-yellow-50 text-yellow-700 px-5 py-2 rounded-2xl text-xs font-black border border-yellow-100 uppercase tracking-widest">In Revisione</div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Profilo Beneficiario</h3>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-2">
                   <p className="text-xl font-bold text-slate-800">Candidato #{candidate?.id}</p>
                   <p className="text-sm text-slate-500 font-medium">Sede: {candidate?.city}</p>
                   <div className="pt-2 flex flex-wrap gap-2">
                     {candidate?.skills.map(s => <span key={s} className="bg-white border px-3 py-1 rounded-lg text-xs font-bold text-slate-600">{s}</span>)}
                   </div>
                </div>
              </section>
              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Competenze Dichiarate</h3>
                <p className="text-slate-700 text-lg leading-relaxed italic border-l-4 border-blue-400 pl-6 bg-blue-50/30 py-4 rounded-r-2xl">
                  "{selectedRequest?.candidateMessage}"
                </p>
              </section>
            </div>
            <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl">
              <h3 className="text-xl font-bold mb-6 flex items-center"><Send className="w-5 h-5 mr-3 text-blue-400"/> Inoltro all'Azienda</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">L'azienda riceverà solo le competenze del candidato e l'ID identificativo. L'operazione è tracciata.</p>
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Scegli Azienda Destinataria</label>
                <select className="w-full p-4 bg-slate-800 border-none rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 mb-6">
                  <option value="">Seleziona Partner...</option>
                  {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/50">
                  Valida e Invia Candidatura
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CompanyList = () => (
    <div className="animate-in fade-in">
      <div className="flex justify-between items-center mb-10">
        <div><h1 className="text-3xl font-black">Aziende Partner</h1><p className="text-slate-500">Gestione della rete di accoglienza.</p></div>
        <button onClick={() => {setEditingItem(null); setAdminSubView('company_form');}} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center hover:bg-blue-700 shadow-lg shadow-blue-100">
          <Plus className="w-5 h-5 mr-3"/> Registra Nuova
        </button>
      </div>
      <div className="bg-white border rounded-[2rem] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Azienda</th>
              <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Settore</th>
              <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Città</th>
              <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {companies.map(c => (
              <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5"><p className="font-bold text-slate-800 text-lg">{c.name}</p><p className="text-xs text-slate-400 font-medium">{c.contact}</p></td>
                <td className="px-8 py-5 text-sm font-semibold text-slate-600">{c.sector}</td>
                <td className="px-8 py-5 text-sm text-slate-500">{c.city}</td>
                <td className="px-8 py-5 text-right">
                  <button onClick={() => {setEditingItem(c); setAdminSubView('company_form');}} className="p-3 text-slate-300 hover:text-blue-600 bg-slate-50 rounded-xl hover:bg-blue-50 transition-all">
                    <Edit3 className="w-5 h-5"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CompanyForm = () => (
    <div className="max-w-2xl animate-in slide-in-from-right-5">
      <h2 className="text-3xl font-black mb-8 text-slate-900">{editingItem ? 'Modifica Azienda' : 'Registra Nuovo Partner'}</h2>
      <div className="bg-white p-10 border rounded-[2.5rem] shadow-sm space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <div><label className="block text-xs font-black mb-3 uppercase text-slate-400 tracking-widest">Ragione Sociale</label><input defaultValue={editingItem?.name} type="text" className="w-full p-4 border border-slate-100 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div><label className="block text-xs font-black mb-3 uppercase text-slate-400 tracking-widest">Settore</label><input defaultValue={editingItem?.sector} type="text" className="w-full p-4 border border-slate-100 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" /></div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div><label className="block text-xs font-black mb-3 uppercase text-slate-400 tracking-widest">Sede Legale</label><input defaultValue={editingItem?.city} type="text" className="w-full p-4 border border-slate-100 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div><label className="block text-xs font-black mb-3 uppercase text-slate-400 tracking-widest">Referente Risorse Umane</label><input defaultValue={editingItem?.contact} type="text" className="w-full p-4 border border-slate-100 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" /></div>
        </div>
        <div className="pt-8 flex space-x-4 border-t border-slate-50">
          <button onClick={() => setAdminSubView('companies')} className="flex-1 py-4 border border-slate-100 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Annulla</button>
          <button onClick={() => setAdminSubView('companies')} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">Salva Informazioni</button>
        </div>
      </div>
    </div>
  );

  const CandidateList = () => (
    <div className="animate-in fade-in">
      <div className="flex justify-between items-center mb-10">
        <div><h1 className="text-3xl font-black">Anagrafica Beneficiari</h1><p className="text-slate-500">Gestione dei profili in forma protetta.</p></div>
        <button onClick={() => {setEditingItem(null); setAdminSubView('candidate_form');}} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center shadow-lg shadow-blue-100">
          <Plus className="w-5 h-5 mr-3"/> Nuovo Profilo
        </button>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {candidates.map(c => (
          <div key={c.id} className="bg-white border rounded-[2rem] p-8 shadow-sm hover:border-blue-400 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 -mr-8 -mt-8 rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>
            <div className="flex justify-between items-start mb-6 relative">
               <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-blue-100 transition-colors"><UserCircle className="text-slate-400 group-hover:text-blue-600 w-8 h-8" /></div>
               <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest">ID: {c.id}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Candidato #{c.id}</h3>
            <p className="text-slate-500 font-medium mb-6 flex items-center"><MapPin className="w-4 h-4 mr-2 text-slate-300" /> {c.city}</p>
            <div className="flex flex-wrap gap-2 mb-8 h-16 overflow-hidden">
              {c.skills.map(s => <span key={s} className="text-[10px] bg-slate-50 px-3 py-1.5 rounded-lg font-black uppercase text-slate-500 border border-slate-100">{s}</span>)}
            </div>
            <button onClick={() => {setEditingItem(c); setAdminSubView('candidate_form');}} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg relative z-10">
              Dettaglio Protettore
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const CandidateForm = () => (
    <div className="max-w-3xl animate-in slide-in-from-right-5">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900">{editingItem ? `Profilo Candidato #${editingItem.id}` : 'Inserimento Beneficiario'}</h2>
          <p className="text-slate-500">I dati anagrafici sono trattati secondo protocolli di sicurezza.</p>
        </div>
        {editingItem && <div className="bg-blue-900 text-blue-200 text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest mb-1 shadow-lg">Accesso Limitato Operatori</div>}
      </div>
      <div className="bg-white p-10 border rounded-[2.5rem] shadow-sm space-y-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner">
             <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Identità Legale (Sola Lettura)</label>
             <p className="text-2xl font-black text-slate-900">{editingItem?.realName || "In attesa di verifica..."}</p>
          </div>
          <div>
            <label className="block text-xs font-black mb-3 uppercase text-slate-400 tracking-widest">Città di Residenza</label>
            <input defaultValue={editingItem?.city} type="text" className="w-full p-4 border border-slate-100 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-black mb-4 uppercase text-slate-400 tracking-widest flex justify-between items-center">
            Competenze Validate
            <button className="bg-blue-50 text-blue-600 p-1.5 rounded-lg hover:bg-blue-100 transition-colors"><Plus className="w-4 h-4"/></button>
          </label>
          <div className="flex flex-wrap gap-3">
             {editingItem?.skills.map(s => <span key={s} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center shadow-sm">
               {s} <X className="w-4 h-4 ml-3 text-slate-300 cursor-pointer hover:text-red-500"/>
             </span>)}
          </div>
        </div>
        <div>
          <label className="block text-xs font-black mb-3 uppercase text-slate-400 tracking-widest">Informazioni Aggiuntive e Note Sociali</label>
          <textarea defaultValue={editingItem?.notes} rows="5" className="w-full p-6 border border-slate-100 rounded-3xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed" placeholder="Percorso formativo, note sulla condotta, attitudini particolari..."></textarea>
        </div>
        <div className="pt-10 flex space-x-4 border-t border-slate-50">
          <button onClick={() => setAdminSubView('candidates')} className="flex-1 py-4 border border-slate-100 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Annulla</button>
          <button onClick={() => setAdminSubView('candidates')} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700">Aggiorna Profilo</button>
        </div>
      </div>
    </div>
  );

  const LoginView = () => (
    <div className="max-w-md mx-auto py-24 px-4 animate-in zoom-in-95 duration-500">
      <div className="bg-white p-12 border rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
        <div className="text-center mb-12">
          <div className="bg-blue-600 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-200 rotate-3 transition-transform hover:rotate-0 hover:scale-110 duration-300">
            <ShieldCheck className="text-white w-10 h-10"/>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Login Operatore</h2>
          <p className="text-slate-400 mt-2 font-medium">Gestione riservata del portale sociale.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Username</label>
            <input type="text" defaultValue="admin_operator" className="w-full p-4 border border-slate-100 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Password</label>
            <input type="password" defaultValue="••••••••" className="w-full p-4 border border-slate-100 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200">
            Entra nel Sistema
          </button>
        </form>
      </div>
    </div>
  );

  // --- RENDERIZZA VISTA ATTUALE ---
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100">
      {view !== 'admin' && <Navbar />}
      <main>
        {view === 'home' && <HomeView />}
        {view === 'list' && <JobListView />}
        {view === 'detail' && <JobDetailView />}
        {view === 'apply' && <ApplicationForm />}
        {view === 'login' && <LoginView />}
        {view === 'admin' && <AdminView />}
      </main>
      
      {view !== 'admin' && (
        <footer className="bg-white border-t py-20 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-10">
               <ShieldCheck className="text-blue-600 mr-2 w-8 h-8"/>
               <span className="text-slate-900 font-black text-2xl tracking-tighter">Second Chance</span>
            </div>
            <p className="text-slate-400 max-w-xl mx-auto leading-relaxed mb-10 italic">
              "Il reinserimento sociale non è solo una missione di giustizia, ma una vittoria per l'intera comunità civile."
            </p>
            <div className="flex justify-center space-x-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy & GDPR</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Aziende Partner</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Rapporto Sociale</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}