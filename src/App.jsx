import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, Briefcase, ChevronRight, Lock, 
  LayoutDashboard, Building2, User, FileText, 
  Plus, Edit, Trash2, Save, X, LogOut, CheckCircle,
  MapPin, Phone, Mail, Globe, Search, ArrowRight
} from 'lucide-react';

// --- MOCK DATA ---
const initialJobs = [
  { id: 1, title: "Addetto Magazzino", company: "Logistica Nord", location: "Milano", type: "Full-time", description: "Gestione carico/scarico e inventario." },
  { id: 2, title: "Giardiniere", company: "Verde Pubblico Srl", location: "Roma", type: "Part-time", description: "Manutenzione parchi e giardini." },
  { id: 3, title: "Aiuto Cuoco", company: "Ristorante Il Porto", location: "Genova", type: "Turni", description: "Preparazione linea e supporto chef." },
];

const initialCompanies = [
  { id: 101, name: "Logistica Nord", piva: "IT12345678901", address: "Via Roma 1, Milano", contact: "Mario Rossi", email: "hr@logisticanord.it", phone: "021234567" },
  { id: 102, name: "Verde Pubblico Srl", piva: "IT98765432109", address: "Via Appia 20, Roma", contact: "Giulia Bianchi", email: "info@verdepubblico.it", phone: "061234567" },
];

const initialCandidates = [
  { id: "CAND-001", city: "Milano", skills: ["Patente Muletto", "Gestione Magazzino"], notes: "Disponibile per turni notturni." },
  { id: "CAND-002", city: "Torino", skills: ["Muratura", "Imbiancatura"], notes: "Esperienza pregressa in cantieri edili." },
  { id: "CAND-003", city: "Roma", skills: ["Cucina Base", "HACCP"], notes: "Molto motivato, ha seguito corso di formazione interno." },
];

const initialApplications = [
  { id: 1, jobId: 1, candidateId: "CAND-001", status: "Nuova", skillsHighlight: "Ho 5 anni di esperienza col muletto." },
  { id: 2, jobId: 2, candidateId: "CAND-002", status: "In Valutazione", skillsHighlight: "Sono abituato al lavoro fisico all'aperto." },
];

// --- COMPONENTS ---

// 1. Navbar Pubblica
const Navbar = ({ onNavigate, currentPage }) => (
  <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
          <Shield className="h-8 w-8 text-emerald-400 mr-2" />
          <span className="font-bold text-xl tracking-wider">SECOND CHANCE</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <button onClick={() => onNavigate('home')} className={`hover:text-emerald-400 transition ${currentPage === 'home' ? 'text-emerald-400' : ''}`}>Home</button>
          <button onClick={() => onNavigate('jobs')} className={`hover:text-emerald-400 transition ${currentPage === 'jobs' ? 'text-emerald-400' : ''}`}>Offerte di Lavoro</button>
          <button onClick={() => onNavigate('login')} className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md font-medium transition flex items-center">
            <Lock className="w-4 h-4 mr-2" /> Area Operatore
          </button>
        </div>
      </div>
    </div>
  </nav>
);

// 2. Home Page
const HomePage = ({ onNavigate }) => (
  <div className="flex flex-col min-h-screen">
    {/* Hero Section */}
    <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Costruiamo ponti verso <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            nuove opportunità
          </span>
        </h1>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          La piattaforma che connette competenze e aziende, garantendo privacy e professionalità nel percorso di reinserimento lavorativo.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={() => onNavigate('jobs')} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition flex items-center">
            Trova Lavoro <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-slate-800">Privacy Garantita</h3>
          <p className="text-slate-600">
            L'identità dei candidati è protetta. Le aziende valutano solo le competenze e le qualifiche professionali.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-slate-800">Mediazione Attiva</h3>
          <p className="text-slate-600">
            Gli operatori agiscono come ponte tra domanda e offerta, facilitando il matching perfetto.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-slate-800">Competenze al Centro</h3>
          <p className="text-slate-600">
            Valorizziamo le skill acquisite e le attitudini personali per creare valore reale nelle aziende.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// 3. Jobs Page & Application
const JobsPage = ({ jobs, onApply }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [skillsText, setSkillsText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply(selectedJob.id, skillsText);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedJob(null);
      setSkillsText("");
    }, 2000);
  };

  if (selectedJob) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <button onClick={() => setSelectedJob(null)} className="mb-6 text-slate-500 hover:text-slate-800 flex items-center">
          <ChevronRight className="rotate-180 mr-1 w-4 h-4" /> Torna alle offerte
        </button>
        
        {submitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-10 rounded-lg text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Candidatura Inviata!</h2>
            <p>La tua richiesta è stata inoltrata agli operatori per la valutazione.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-slate-800 p-6 text-white">
              <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
              <p className="text-slate-300 flex items-center mt-2"><Building2 className="w-4 h-4 mr-2"/> {selectedJob.company}</p>
            </div>
            <div className="p-8">
              <div className="mb-6">
                <h3 className="font-bold text-slate-800 mb-2">Descrizione</h3>
                <p className="text-slate-600">{selectedJob.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-3 rounded border">
                  <span className="text-sm text-slate-500 block">Sede</span>
                  <span className="font-medium">{selectedJob.location}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded border">
                  <span className="text-sm text-slate-500 block">Contratto</span>
                  <span className="font-medium">{selectedJob.type}</span>
                </div>
              </div>

              <hr className="my-6 border-slate-200" />

              <form onSubmit={handleSubmit}>
                <h3 className="font-bold text-lg mb-4">Invia la tua candidatura</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Nota: La tua identità non sarà visibile all'azienda in questa fase. 
                  Usa il campo sottostante per descrivere le tue competenze specifiche per questo ruolo.
                </p>
                <div className="mb-4">
                  <label className="block text-slate-700 font-medium mb-2">Le tue competenze / Esperienze rilevanti</label>
                  <textarea 
                    className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none h-32"
                    placeholder="Es: Ho lavorato per 3 anni in magazzino, possiedo il patentino..."
                    required
                    value={skillsText}
                    onChange={(e) => setSkillsText(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition">
                  Invia Candidatura Agli Operatori
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-slate-800 mb-8">Offerte di Lavoro Disponibili</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-slate-100 p-6 flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-1">{job.title}</h3>
              <p className="text-emerald-600 font-medium text-sm mb-4">{job.company}</p>
              <div className="flex items-center text-slate-500 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-2" /> {job.location}
              </div>
              <div className="flex items-center text-slate-500 text-sm mb-4">
                <Briefcase className="w-4 h-4 mr-2" /> {job.type}
              </div>
              <p className="text-slate-600 text-sm line-clamp-3">{job.description}</p>
            </div>
            <button 
              onClick={() => setSelectedJob(job)}
              className="mt-6 w-full py-2 border-2 border-emerald-600 text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition"
            >
              Vedi Dettagli
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Operator Login
const OperatorLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock login
    if (username === "admin" && password === "admin") {
      onLogin();
    } else {
      alert("Credenziali non valide (usa admin/admin)");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800">Area Operatori</h2>
          <p className="text-slate-500">Accedi per gestire il portale</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-bold mb-2">Username</label>
            <input 
              type="text" 
              className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:border-emerald-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:border-emerald-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin"
            />
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition">
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
};

// 5. Operator Layout
const OperatorLayout = ({ children, activeTab, onTabChange, onLogout }) => (
  <div className="flex h-screen bg-slate-100">
    {/* Sidebar */}
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col">
      <div className="p-6 font-bold text-white text-xl flex items-center">
        <Shield className="mr-2 text-emerald-500" /> OPERATORE
      </div>
      <nav className="flex-1 px-2 space-y-1">
        <button 
          onClick={() => onTabChange('dashboard')}
          className={`w-full flex items-center px-4 py-3 rounded-md transition ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800'}`}
        >
          <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
        </button>
        <button 
          onClick={() => onTabChange('companies')}
          className={`w-full flex items-center px-4 py-3 rounded-md transition ${activeTab === 'companies' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800'}`}
        >
          <Building2 className="w-5 h-5 mr-3" /> Aziende
        </button>
        <button 
          onClick={() => onTabChange('candidates')}
          className={`w-full flex items-center px-4 py-3 rounded-md transition ${activeTab === 'candidates' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800'}`}
        >
          <User className="w-5 h-5 mr-3" /> Ex Detenuti
        </button>
      </nav>
      <div className="p-4 border-t border-slate-800">
        <button onClick={onLogout} className="flex items-center text-slate-400 hover:text-white w-full">
          <LogOut className="w-5 h-5 mr-2" /> Disconnetti
        </button>
      </div>
    </div>
    
    {/* Main Content */}
    <div className="flex-1 overflow-auto p-8">
      {children}
    </div>
  </div>
);

// --- OPERATOR VIEWS ---

const OperatorDashboard = ({ applications, jobs, candidates, companies, onNavigateToApp }) => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
        <div className="text-slate-500 text-sm font-medium">Candidature Ricevute</div>
        <div className="text-3xl font-bold text-slate-800 mt-2">{applications.length}</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
        <div className="text-slate-500 text-sm font-medium">Offerte Attive</div>
        <div className="text-3xl font-bold text-slate-800 mt-2">{jobs.length}</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
        <div className="text-slate-500 text-sm font-medium">Candidati Totali</div>
        <div className="text-3xl font-bold text-slate-800 mt-2">{candidates.length}</div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Lista Candidature */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-slate-500" /> Ultime Candidature
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-slate-500 font-medium border-b">
              <tr>
                <th className="py-2">Candidato ID</th>
                <th className="py-2">Offerta</th>
                <th className="py-2">Stato</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => {
                const job = jobs.find(j => j.id === app.jobId);
                return (
                  <tr key={app.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="py-3 font-mono text-slate-600">{app.candidateId}</td>
                    <td className="py-3 font-medium text-slate-800">{job ? job.title : 'N/A'}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        app.status === 'Nuova' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {applications.length === 0 && (
                <tr><td colSpan="3" className="py-4 text-center text-slate-400">Nessuna candidatura.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lista Offerte */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-slate-500" /> Offerte Attive
        </h2>
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
              <div>
                <div className="font-bold text-slate-800">{job.title}</div>
                <div className="text-xs text-slate-500">{job.company} - {job.location}</div>
              </div>
              <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Attiva</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- COMPANIES SECTION ---
const CompaniesSection = ({ companies, setCompanies }) => {
  const [view, setView] = useState('list'); // list, detail, form
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSave = (company) => {
    if (selectedCompany && selectedCompany.id) {
      setCompanies(companies.map(c => c.id === company.id ? company : c));
    } else {
      setCompanies([...companies, { ...company, id: Date.now() }]);
    }
    setView('list');
    setSelectedCompany(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa azienda?")) {
      setCompanies(companies.filter(c => c.id !== id));
      setView('list');
    }
  };

  // Sub-components for Companies
  const CompanyList = () => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Aziende Registrate</h2>
        <button onClick={() => { setSelectedCompany({}); setView('form'); }} className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Nuova Azienda
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-xs">
            <tr>
              <th className="p-4">Nome Azienda</th>
              <th className="p-4">P.IVA</th>
              <th className="p-4">Referente</th>
              <th className="p-4 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {companies.map(company => (
              <tr key={company.id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-900">{company.name}</td>
                <td className="p-4 text-slate-500">{company.piva}</td>
                <td className="p-4 text-slate-600">{company.contact}</td>
                <td className="p-4 text-right">
                  <button onClick={() => { setSelectedCompany(company); setView('detail'); }} className="text-blue-600 hover:text-blue-800 mr-3 font-medium">Dettagli</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CompanyDetail = () => (
    <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-6 border-b pb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{selectedCompany.name}</h2>
          <p className="text-slate-500">P.IVA: {selectedCompany.piva}</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setView('form')} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-5 h-5" /></button>
          <button onClick={() => handleDelete(selectedCompany.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-5 h-5" /></button>
          <button onClick={() => setView('list')} className="p-2 text-slate-400 hover:bg-slate-50 rounded"><X className="w-5 h-5" /></button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-slate-400 mr-3 mt-1" />
          <div>
            <span className="block text-sm text-slate-500">Indirizzo</span>
            <span className="text-slate-800">{selectedCompany.address}</span>
          </div>
        </div>
        <div className="flex items-start">
          <User className="w-5 h-5 text-slate-400 mr-3 mt-1" />
          <div>
            <span className="block text-sm text-slate-500">Referente</span>
            <span className="text-slate-800">{selectedCompany.contact}</span>
          </div>
        </div>
        <div className="flex items-start">
          <Mail className="w-5 h-5 text-slate-400 mr-3 mt-1" />
          <div>
            <span className="block text-sm text-slate-500">Email</span>
            <span className="text-slate-800">{selectedCompany.email}</span>
          </div>
        </div>
        <div className="flex items-start">
          <Phone className="w-5 h-5 text-slate-400 mr-3 mt-1" />
          <div>
            <span className="block text-sm text-slate-500">Telefono</span>
            <span className="text-slate-800">{selectedCompany.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CompanyForm = () => {
    const [formData, setFormData] = useState(selectedCompany || { name: '', piva: '', address: '', contact: '', email: '', phone: '' });

    return (
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{formData.id ? 'Modifica Azienda' : 'Nuova Azienda'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(formData); }}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome Azienda</label>
              <input required type="text" className="w-full border rounded p-2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">P.IVA</label>
              <input required type="text" className="w-full border rounded p-2" value={formData.piva} onChange={e => setFormData({...formData, piva: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Indirizzo</label>
              <input required type="text" className="w-full border rounded p-2" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Referente</label>
              <input required type="text" className="w-full border rounded p-2" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input required type="email" className="w-full border rounded p-2" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefono</label>
                <input required type="text" className="w-full border rounded p-2" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-3">
            <button type="button" onClick={() => setView('list')} className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-50">Annulla</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 flex items-center">
              <Save className="w-4 h-4 mr-2" /> Salva
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      {view === 'list' && <CompanyList />}
      {view === 'detail' && <CompanyDetail />}
      {view === 'form' && <CompanyForm />}
    </div>
  );
};

// --- CANDIDATES SECTION (STRICTLY ANONYMOUS) ---
const CandidatesSection = ({ candidates, setCandidates }) => {
  const [view, setView] = useState('list');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleSave = (candidate) => {
    // Process skills string to array if needed
    const processedCandidate = {
      ...candidate,
      skills: typeof candidate.skills === 'string' ? candidate.skills.split(',').map(s => s.trim()) : candidate.skills
    };

    if (selectedCandidate && selectedCandidate.id) {
      setCandidates(candidates.map(c => c.id === candidate.id ? processedCandidate : c));
    } else {
      setCandidates([...candidates, { ...processedCandidate, id: `CAND-${String(candidates.length + 1).padStart(3, '0')}` }]);
    }
    setView('list');
    setSelectedCandidate(null);
  };

  const CandidateList = () => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Elenco Ex Detenuti</h2>
          <p className="text-sm text-slate-500">Visualizzazione anonima (ID e Città)</p>
        </div>
        <button onClick={() => { setSelectedCandidate({}); setView('form'); }} className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Nuovo Profilo
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-xs">
            <tr>
              <th className="p-4">ID Candidato</th>
              <th className="p-4">Città di Residenza</th>
              <th className="p-4">Competenze Principali</th>
              <th className="p-4 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {candidates.map(candidate => (
              <tr key={candidate.id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-mono font-medium text-emerald-700">{candidate.id}</td>
                <td className="p-4 text-slate-800">{candidate.city}</td>
                <td className="p-4 text-slate-600">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 2).map((s, i) => (
                      <span key={i} className="bg-slate-100 px-2 py-1 rounded text-xs">{s}</span>
                    ))}
                    {candidate.skills.length > 2 && <span className="text-xs text-slate-400 p-1">+{candidate.skills.length - 2}</span>}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => { setSelectedCandidate(candidate); setView('detail'); }} className="text-blue-600 hover:text-blue-800 font-medium">Visualizza Scheda</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CandidateDetail = () => (
    <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto border-t-4 border-emerald-500">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-mono font-bold text-slate-800">{selectedCandidate.id}</h2>
          <div className="flex items-center text-slate-500 mt-1">
            <MapPin className="w-4 h-4 mr-1" /> {selectedCandidate.city}
          </div>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setView('form')} className="bg-blue-50 text-blue-600 px-3 py-2 rounded font-medium flex items-center hover:bg-blue-100">
            <Edit className="w-4 h-4 mr-2" /> Modifica
          </button>
          <button onClick={() => setView('list')} className="bg-slate-50 text-slate-600 px-3 py-2 rounded font-medium flex items-center hover:bg-slate-100">
            <ArrowRight className="w-4 h-4 mr-2" /> Torna alla lista
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Skillset</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCandidate.skills.map((skill, i) => (
              <span key={i} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium border border-emerald-100">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Informazioni Aggiuntive</h3>
          <p className="text-slate-700 whitespace-pre-wrap">{selectedCandidate.notes}</p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded text-sm text-yellow-800 flex items-start">
          <Shield className="w-5 h-5 mr-2 flex-shrink-0" />
          <p>
            Questo profilo è anonimizzato. Per procedere al matching con un'azienda, utilizzare l'ID <strong>{selectedCandidate.id}</strong> nelle comunicazioni ufficiali.
          </p>
        </div>
      </div>
    </div>
  );

  const CandidateForm = () => {
    const [formData, setFormData] = useState({
      id: selectedCandidate?.id || '',
      city: selectedCandidate?.city || '',
      skills: selectedCandidate?.skills ? selectedCandidate.skills.join(', ') : '',
      notes: selectedCandidate?.notes || ''
    });

    return (
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{formData.id ? 'Modifica Profilo Anonimo' : 'Inserimento Nuovo Profilo'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(formData); }}>
          <div className="space-y-4">
            {formData.id && (
              <div className="bg-slate-100 p-3 rounded">
                <span className="text-xs text-slate-500 block uppercase">ID Univoco</span>
                <span className="font-mono font-bold text-slate-800">{formData.id}</span>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Città di Residenza</label>
              <input required type="text" className="w-full border rounded p-2" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Es: Milano" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Competenze / Skills (separate da virgola)</label>
              <input required type="text" className="w-full border rounded p-2" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} placeholder="Es: Inglese, Saldatura, Patente B" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Informazioni Aggiuntive / Note</label>
              <textarea required rows="5" className="w-full border rounded p-2" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Descrizione del profilo, esperienze passate, vincoli orari..." />
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-3">
            <button type="button" onClick={() => setView('list')} className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-50">Annulla</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 flex items-center">
              <Save className="w-4 h-4 mr-2" /> Salva Profilo
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      {view === 'list' && <CandidateList />}
      {view === 'detail' && <CandidateDetail />}
      {view === 'form' && <CandidateForm />}
    </div>
  );
};

// --- APP ROOT ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, jobs, login, operator
  const [operatorTab, setOperatorTab] = useState('dashboard'); // dashboard, companies, candidates
  const [isOperatorLoggedIn, setIsOperatorLoggedIn] = useState(false);

  // Data State
  const [jobs, setJobs] = useState(initialJobs);
  const [applications, setApplications] = useState(initialApplications);
  const [companies, setCompanies] = useState(initialCompanies);
  const [candidates, setCandidates] = useState(initialCandidates);

  const handleNavigate = (page) => {
    if (page === 'login' && isOperatorLoggedIn) {
      setCurrentPage('operator');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo(0, 0);
  };

  const handleJobApply = (jobId, skillsText) => {
    // Generate a temporary ID since public users aren't logged in in this demo,
    // or assume the user is "CAND-001" for demo purposes.
    const newApp = {
      id: applications.length + 1,
      jobId: jobId,
      candidateId: "CAND-??? (Anonimo)", // In real app, this comes from logged in user session
      status: "Nuova",
      skillsHighlight: skillsText
    };
    setApplications([newApp, ...applications]);
  };

  const handleOperatorLogin = () => {
    setIsOperatorLoggedIn(true);
    setCurrentPage('operator');
  };

  const handleOperatorLogout = () => {
    setIsOperatorLoggedIn(false);
    setCurrentPage('home');
    setOperatorTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {currentPage !== 'operator' && (
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      )}

      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      
      {currentPage === 'jobs' && (
        <JobsPage jobs={jobs} onApply={handleJobApply} />
      )}

      {currentPage === 'login' && (
        <OperatorLogin onLogin={handleOperatorLogin} />
      )}

      {currentPage === 'operator' && isOperatorLoggedIn && (
        <OperatorLayout 
          activeTab={operatorTab} 
          onTabChange={setOperatorTab} 
          onLogout={handleOperatorLogout}
        >
          {operatorTab === 'dashboard' && (
            <OperatorDashboard 
              applications={applications} 
              jobs={jobs} 
              candidates={candidates}
              companies={companies}
            />
          )}
          {operatorTab === 'companies' && (
            <CompaniesSection companies={companies} setCompanies={setCompanies} />
          )}
          {operatorTab === 'candidates' && (
            <CandidatesSection candidates={candidates} setCandidates={setCandidates} />
          )}
        </OperatorLayout>
      )}
    </div>
  );
}