import React, { useState } from 'react';
import { 
  ShieldCheck, LayoutDashboard, Building2, UserCircle, LogIn, 
  MapPin, ArrowRight, CheckCircle, Search, Menu, X, FileText, Send
} from 'lucide-react';

// --- DATI DI ESEMPIO ---
const MOCK_DATA = {
  jobs: [
    { id: 1, title: "Addetto Logistica", sector: "Logistica", location: "Milano", type: "Full-time", desc: "Gestione magazzino.", companyId: 101 },
    { id: 2, title: "Manutentore", sector: "Industria", location: "Torino", type: "Part-time", desc: "Riparazione macchinari.", companyId: 102 }
  ],
  companies: [
    { id: 101, name: "Logistica Nord", sector: "Trasporti", city: "Milano" },
    { id: 102, name: "Meccanica Futura", sector: "Manifatturiero", city: "Torino" }
  ],
  candidates: [
    { id: 1001, city: "Milano", skills: ["Muletto", "Magazzino"], realName: "Mario Rossi", status: "Validato" },
    { id: 1002, city: "Roma", skills: ["Cucina"], realName: "Luigi Verdi", status: "In attesa" }
  ],
  applications: [
    { id: 501, candidateId: 1001, jobId: 1, date: "2024-02-20", msg: "Esperienza pregressa." }
  ]
};

export default function App() {
  const [view, setView] = useState('home'); 
  const [user, setUser] = useState(null); 
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  const go = (v) => { setView(v); window.scrollTo(0,0); };

  const login = (e) => {
    e.preventDefault();
    setUser({ role: 'admin', name: 'Operatore' });
    go('admin_dash');
  };

  const Navbar = () => (
    <nav className="bg-white border-b h-16 px-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2 font-bold text-xl cursor-pointer text-slate-800" onClick={() => go('home')}>
        <ShieldCheck className="text-blue-600" /> Second Chance
      </div>
      <div className="flex gap-4">
        <button onClick={() => go('list')} className="text-slate-600 font-medium hover:text-blue-600">Offerte</button>
        {user ? (
          <button onClick={() => go('admin_dash')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Dashboard</button>
        ) : (
          <button onClick={() => go('login')} className="flex items-center gap-1 text-slate-600 font-medium hover:text-blue-600">
            <LogIn size={18} /> Login
          </button>
        )}
      </div>
    </nav>
  );

  const Home = () => (
    <div className="py-20 px-4 text-center max-w-4xl mx-auto">
      <h1 className="text-5xl font-black text-slate-900 mb-6">Il tuo futuro inizia <span className="text-blue-600">qui.</span></h1>
      <p className="text-xl text-slate-600 mb-10">Piattaforma protetta per il reinserimento lavorativo. Anonimato garantito.</p>
      <button onClick={() => go('list')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition">Trova Lavoro</button>
    </div>
  );

  const JobList = () => (
    <div className="py-10 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Offerte Disponibili</h2>
      <div className="space-y-4">
        {MOCK_DATA.jobs.map(job => (
          <div key={job.id} onClick={() => { setSelectedJob(job); go('detail'); }} className="bg-white p-6 rounded-xl border hover:border-blue-500 cursor-pointer shadow-sm group">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase">{job.sector}</span>
                <h3 className="text-xl font-bold mt-1 group-hover:text-blue-600">{job.title}</h3>
                <p className="text-slate-500 text-sm">{job.location} • {job.type}</p>
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-blue-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const JobDetail = () => (
    <div className="py-10 px-4 max-w-2xl mx-auto">
      <button onClick={() => go('list')} className="text-sm font-bold text-slate-500 mb-4 hover:text-blue-600">← Torna alla lista</button>
      <div className="bg-white p-8 rounded-2xl border shadow-sm">
        <h1 className="text-3xl font-bold mb-2">{selectedJob?.title}</h1>
        <div className="flex gap-2 mb-6">
          <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold">{selectedJob?.location}</span>
          <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold">{selectedJob?.type}</span>
        </div>
        <p className="text-slate-600 mb-8">{selectedJob?.desc}</p>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 flex gap-3">
          <ShieldCheck className="text-blue-600 shrink-0" />
          <p className="text-sm text-blue-800">Candidatura Protetta: I tuoi dati reali non saranno inviati all'azienda, ma filtrati da un operatore.</p>
        </div>
        <button onClick={() => go('apply')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">Candidati (ID #1001)</button>
      </div>
    </div>
  );

  const ApplyForm = () => (
    <div className="py-20 px-4 max-w-md mx-auto text-center">
      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="text-green-600 w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Inviato!</h2>
      <p className="text-slate-500 mb-6">La tua richiesta è stata inoltrata agli operatori.</p>
      <button onClick={() => go('home')} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold">Torna alla Home</button>
    </div>
  );

  const Login = () => (
    <div className="py-20 px-4 max-w-sm mx-auto">
      <form onSubmit={login} className="bg-white p-8 rounded-2xl border shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">Login Operatore</h2>
        <input type="text" placeholder="Username (admin)" defaultValue="admin" className="w-full p-3 border rounded-lg" />
        <input type="password" placeholder="Password (password)" defaultValue="password" className="w-full p-3 border rounded-lg" />
        <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold">Entra</button>
      </form>
    </div>
  );

  const AdminDash = () => (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <div className="font-bold text-xl mb-8 flex items-center gap-2"><LayoutDashboard /> Ops Panel</div>
        <nav className="space-y-2">
          <div className="p-3 bg-blue-600 rounded-lg cursor-pointer">Dashboard</div>
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer opacity-50">Aziende</div>
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer opacity-50">Candidati</div>
        </nav>
        <button onClick={() => { setUser(null); go('home'); }} className="mt-10 text-sm text-slate-400 hover:text-white">Esci</button>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Richieste da Validare</h1>
        <div className="space-y-4">
          {MOCK_DATA.applications.map(app => (
            <div key={app.id} className="bg-white p-6 rounded-xl border shadow-sm flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">Candidato #{app.candidateId}</p>
                <p className="text-slate-500 text-sm">Offerta #{app.jobId} • Data: {app.date}</p>
              </div>
              <button onClick={() => { setSelectedApp(app); go('admin_detail'); }} className="bg-slate-100 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50">Gestisci</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  const AdminDetail = () => {
    const candidate = MOCK_DATA.candidates.find(c => c.id === selectedApp?.candidateId);
    return (
      <div className="py-10 px-4 max-w-3xl mx-auto">
        <button onClick={() => go('admin_dash')} className="text-sm font-bold text-slate-500 mb-4 hover:text-blue-600">← Dashboard</button>
        <div className="bg-white p-8 rounded-2xl border shadow-sm space-y-8">
          <div className="flex justify-between items-center border-b pb-4">
            <h1 className="text-2xl font-bold">Match #{selectedApp?.id}</h1>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold uppercase">In Revisione</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Profilo (Visibile solo a te)</h3>
              <div className="bg-slate-50 p-4 rounded-xl border">
                <p className="font-bold text-lg">{candidate?.realName}</p>
                <p className="text-sm text-slate-500">ID Pubblico: #{candidate?.id}</p>
                <p className="text-sm text-slate-500">Città: {candidate?.city}</p>
                <div className="mt-2 flex gap-1">
                  {candidate?.skills.map(s => <span key={s} className="text-xs bg-white border px-2 py-1 rounded">{s}</span>)}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Messaggio Candidato</h3>
              <p className="italic text-slate-600 border-l-4 border-blue-500 pl-4">"{selectedApp?.msg}"</p>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-xl">
            <h3 className="font-bold flex items-center gap-2 mb-4"><Send size={18}/> Inoltra all'Azienda</h3>
            <p className="text-sm text-slate-400 mb-4">L'azienda vedrà solo l'ID e le competenze.</p>
            <select className="w-full p-3 bg-slate-800 rounded-lg border-none text-white mb-4">
              <option>Seleziona Azienda...</option>
              {MOCK_DATA.companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <button onClick={() => go('admin_dash')} className="w-full bg-blue-600 py-3 rounded-lg font-bold hover:bg-blue-500">Valida e Invia</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {view !== 'admin_dash' && view !== 'admin_detail' && <Navbar />}
      
      {view === 'home' && <Home />}
      {view === 'list' && <JobList />}
      {view === 'detail' && <JobDetail />}
      {view === 'apply' && <ApplyForm />}
      {view === 'login' && <Login />}
      {view === 'admin_dash' && <AdminDash />}
      {view === 'admin_detail' && <AdminDetail />}
    </div>
  );
}