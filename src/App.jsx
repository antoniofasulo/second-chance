import React, { useState } from 'react';
import { 
  Shield, Users, Briefcase, ChevronRight, Lock, 
  LayoutDashboard, Building2, User, FileText, 
  Plus, Edit, Trash2, Save, X, LogOut, CheckCircle,
  MapPin, Phone, Mail, ArrowRight, Star, Menu
} from 'lucide-react';

// --- MOCK DATA ---
const initialJobs = [
  { id: 1, title: "Addetto Magazzino", company: "Logistica Nord", location: "Milano", type: "Full-time", description: "Gestione carico/scarico e inventario con utilizzo transpallet elettrico." },
  { id: 2, title: "Giardiniere", company: "Verde Pubblico Srl", location: "Roma", type: "Part-time", description: "Manutenzione parchi e giardini, potatura siepi e rasatura prati." },
  { id: 3, title: "Aiuto Cuoco", company: "Ristorante Il Porto", location: "Genova", type: "Turni", description: "Preparazione linea, pulizia verdure e supporto allo chef durante il servizio." },
];

const initialCompanies = [
  { id: 101, name: "Logistica Nord", piva: "IT12345678901", address: "Via Roma 1, Milano", contact: "Mario Rossi", email: "hr@logisticanord.it", phone: "021234567" },
  { id: 102, name: "Verde Pubblico Srl", piva: "IT98765432109", address: "Via Appia 20, Roma", contact: "Giulia Bianchi", email: "info@verdepubblico.it", phone: "061234567" },
];

const initialCandidates = [
  { id: "CAND-001", city: "Milano", skills: ["Patente Muletto", "Gestione Magazzino"], notes: "Disponibile per turni notturni. Ha completato il percorso di riabilitazione con successo.", realName: "Giovanni Neri" },
  { id: "CAND-002", city: "Torino", skills: ["Muratura", "Imbiancatura"], notes: "Esperienza pregressa in cantieri edili prima della detenzione.", realName: "Marco Verdi" },
  { id: "CAND-003", city: "Roma", skills: ["Cucina Base", "HACCP"], notes: "Molto motivato, ha seguito corso di formazione professionale in istituto.", realName: "Luigi Bianchi" },
];

const initialApplications = [
  { id: 1, jobId: 1, candidateId: "CAND-001", status: "Nuova", skillsHighlight: "Ho 5 anni di esperienza col muletto." },
  { id: 2, jobId: 2, candidateId: "CAND-002", status: "In Valutazione", skillsHighlight: "Sono abituato al lavoro fisico all'aperto." },
];

// --- COMPONENTS ---

// 1. Navbar Pubblica
const Navbar = ({ onNavigate, currentPage }) => (
  <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
        <div className="flex items-center cursor-pointer gap-3" onClick={() => onNavigate('home')}>
          <div className="bg-emerald-500 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-slate-900" />
          </div>
          <span className="font-bold text-xl tracking-wider">SECONDA CHANCE</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => onNavigate('home')} className={`text-sm font-medium hover:text-emerald-400 transition ${currentPage === 'home' ? 'text-emerald-400' : 'text-slate-300'}`}>HOME</button>
          <button onClick={() => onNavigate('jobs')} className={`text-sm font-medium hover:text-emerald-400 transition ${currentPage === 'jobs' ? 'text-emerald-400' : 'text-slate-300'}`}>OFFERTE DI LAVORO</button>
          <div className="h-6 w-px bg-slate-700 mx-4"></div>
          <button onClick={() => onNavigate('login')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full font-bold text-sm transition shadow-lg hover:shadow-emerald-500/20 flex items-center">
            <Lock className="w-4 h-4 mr-2" /> AREA OPERATORE
          </button>
        </div>
      </div>
    </div>
  </nav>
);

// 2. Home Page
const HomePage = ({ onNavigate }) => (
  <div className="flex flex-col min-h-screen font-sans">
    {/* Hero Section */}
    <div className="bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-900/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-48 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
            PIATTAFORMA DI REINSERIMENTO LAVORATIVO
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
            Il talento merita una <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              seconda occasione.
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
            Connettiamo competenze e aziende attraverso un processo sicuro e anonimo. 
            Il passato non definisce il futuro professionale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => onNavigate('jobs')} className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 px-8 rounded-xl shadow-xl shadow-emerald-500/20 transition transform hover:-translate-y-1 flex items-center justify-center">
              Trova Lavoro Ora <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl border border-slate-700 transition flex items-center justify-center">
              Scopri come funziona
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Candidati Inseriti</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">120+</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Aziende Partner</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Anonimato Garantito</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">24h</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Supporto Operatori</div>
          </div>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <div className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Come funziona la piattaforma</h2>
          <p className="text-slate-600 text-lg">Un processo trasparente e sicuro progettato per tutelare i candidati e facilitare le aziende.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-emerald-500/30 transition duration-300 group">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-500 transition duration-300">
              <Shield className="w-8 h-8 text-blue-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-900">1. Privacy Totale</h3>
            <p className="text-slate-600 leading-relaxed">
              L'identità dei candidati è protetta da ID numerici. Nessun dato sensibile viene condiviso nella prima fase di selezione.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-emerald-500/30 transition duration-300 group">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-500 transition duration-300">
              <Users className="w-8 h-8 text-emerald-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-900">2. Validazione Operatori</h3>
            <p className="text-slate-600 leading-relaxed">
              Ogni profilo viene verificato dai nostri operatori che agiscono come garanti delle competenze acquisite.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-emerald-500/30 transition duration-300 group">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-500 transition duration-300">
              <Briefcase className="w-8 h-8 text-purple-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-900">3. Matching Etico</h3>
            <p className="text-slate-600 leading-relaxed">
              Colleghiamo i candidati solo con aziende che hanno aderito al nostro codice etico di responsabilità sociale.
            </p>
          </div>
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
    }, 3000);
  };

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setSelectedJob(null)} className="mb-8 text-slate-500 hover:text-emerald-600 font-medium flex items-center transition">
            <ChevronRight className="rotate-180 mr-1 w-5 h-5" /> Torna alla lista offerte
          </button>
          
          {submitted ? (
            <div className="bg-white border-2 border-emerald-100 p-12 rounded-3xl text-center shadow-xl shadow-emerald-100/50">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Candidatura Inviata!</h2>
              <p className="text-slate-600 text-lg mb-8">La tua richiesta è stata inoltrata in modo sicuro agli operatori. <br/>Ti contatteranno presto per il prossimo step.</p>
              <button onClick={() => setSelectedJob(null)} className="text-emerald-600 font-bold hover:underline">Torna alle offerte</button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
              <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full opacity-10 -mr-20 -mt-20 blur-3xl"></div>
                <h2 className="text-3xl font-bold mb-4 relative z-10">{selectedJob.title}</h2>
                <div className="flex flex-wrap gap-4 relative z-10">
                   <span className="flex items-center text-slate-300 bg-slate-800 px-3 py-1 rounded-lg text-sm"><Building2 className="w-4 h-4 mr-2 text-emerald-400"/> {selectedJob.company}</span>
                   <span className="flex items-center text-slate-300 bg-slate-800 px-3 py-1 rounded-lg text-sm"><MapPin className="w-4 h-4 mr-2 text-emerald-400"/> {selectedJob.location}</span>
                </div>
              </div>
              
              <div className="p-10">
                <div className="mb-10">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Dettagli Posizione</h3>
                  <p className="text-slate-700 leading-relaxed text-lg">{selectedJob.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Sede di Lavoro</span>
                    <span className="font-bold text-slate-900">{selectedJob.location}</span>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Tipo Contratto</span>
                    <span className="font-bold text-slate-900">{selectedJob.type}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Invia la tua candidatura</h3>
                  <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-8 flex items-start">
                    <Shield className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-blue-900 mb-1">Candidatura Protetta</h4>
                      <p className="text-sm text-blue-800">
                        La tua identità rimarrà anonima in questa fase. L'azienda vedrà solo le competenze che inserirai qui sotto.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label className="block text-slate-700 font-bold mb-3">Le tue competenze specifiche per questo ruolo</label>
                      <textarea 
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-emerald-500 outline-none h-40 transition"
                        placeholder="Descrivi qui le tue esperienze passate pertinenti, i corsi seguiti o le abilità pratiche che possiedi per questo lavoro..."
                        required
                        value={skillsText}
                        onChange={(e) => setSkillsText(e.target.value)}
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/20 transition transform hover:-translate-y-1">
                      Invia Candidatura Agli Operatori
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Offerte di Lavoro Disponibili</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">Esplora le opportunità offerte dalle nostre aziende partner. Seleziona un ruolo per vedere i dettagli e candidarti in modo anonimo.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map(job => (
            <div key={job.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition duration-300 border border-slate-100 p-8 flex flex-col group cursor-pointer" onClick={() => setSelectedJob(job)}>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{job.type}</span>
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-emerald-500 transition duration-300">
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition">{job.title}</h3>
                <p className="text-slate-500 font-medium mb-6 flex items-center"><Building2 className="w-4 h-4 mr-2"/> {job.company}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-slate-600 text-sm">
                    <MapPin className="w-4 h-4 mr-3 text-slate-400" /> {job.location}
                  </div>
                  <div className="flex items-center text-slate-600 text-sm">
                    <Briefcase className="w-4 h-4 mr-3 text-slate-400" /> Settore Logistica/Servizi
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-50">
                <span className="text-emerald-600 font-bold text-sm flex items-center group-hover:translate-x-2 transition duration-300">
                  Vedi Dettagli e Candidati <ChevronRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
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
    if (username === "admin" && password === "admin") {
      onLogin();
    } else {
      alert("Credenziali non valide (usa admin/admin)");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
            <Lock className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Area Operatori</h2>
          <p className="text-slate-500">Accesso riservato al personale autorizzato</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-700 text-sm font-bold mb-2 ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Inserisci username"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-bold mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Inserisci password"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/20 transition duration-300 transform hover:-translate-y-1">
            Accedi al Portale
          </button>
        </form>
        <div className="mt-8 text-center">
           <p className="text-xs text-slate-400">Sistema protetto da crittografia end-to-end.</p>
        </div>
      </div>
    </div>
  );
};

// 5. Operator Layout
const OperatorLayout = ({ children, activeTab, onTabChange, onLogout }) => (
  <div className="flex h-screen bg-slate-100">
    {/* Sidebar */}
    <div className="w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-20">
      <div className="p-8 font-bold text-white text-2xl flex items-center tracking-wider border-b border-slate-800">
        <Shield className="mr-3 text-emerald-500 w-8 h-8" /> 
        <div>
          <span className="block text-xs text-emerald-500 font-normal tracking-widest uppercase">Portale</span>
          OPERATORE
        </div>
      </div>
      <nav className="flex-1 px-4 py-8 space-y-2">
        <button 
          onClick={() => onTabChange('dashboard')}
          className={`w-full flex items-center px-4 py-4 rounded-xl transition font-medium ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' : 'hover:bg-slate-800 hover:text-white'}`}
        >
          <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
        </button>
        <button 
          onClick={() => onTabChange('companies')}
          className={`w-full flex items-center px-4 py-4 rounded-xl transition font-medium ${activeTab === 'companies' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' : 'hover:bg-slate-800 hover:text-white'}`}
        >
          <Building2 className="w-5 h-5 mr-3" /> Aziende
        </button>
        <button 
          onClick={() => onTabChange('candidates')}
          className={`w-full flex items-center px-4 py-4 rounded-xl transition font-medium ${activeTab === 'candidates' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' : 'hover:bg-slate-800 hover:text-white'}`}
        >
          <User className="w-5 h-5 mr-3" /> Ex Detenuti
        </button>
      </nav>
      <div className="p-6 border-t border-slate-800 bg-slate-900">
        <div className="flex items-center mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold mr-3">OP</div>
          <div>
            <div className="text-sm font-bold text-white">Admin User</div>
            <div className="text-xs text-emerald-500">Online</div>
          </div>
        </div>
        <button onClick={onLogout} className="flex items-center justify-center text-slate-400 hover:text-white w-full bg-slate-800 hover:bg-slate-700 py-3 rounded-xl transition">
          <LogOut className="w-4 h-4 mr-2" /> Disconnetti
        </button>
      </div>
    </div>
    
    {/* Main Content */}
    <div className="flex-1 overflow-auto p-10 bg-slate-50">
      {children}
    </div>
  </div>
);

// --- OPERATOR VIEWS ---

const OperatorDashboard = ({ applications, jobs, candidates }) => (
  <div className="space-y-8 max-w-6xl mx-auto">
    <div className="flex justify-between items-end mb-2">
      <div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-500">Panoramica delle attività del portale</p>
      </div>
      <div className="text-right">
        <div className="text-sm text-slate-500">Data odierna</div>
        <div className="font-bold text-slate-900">{new Date().toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center">
        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mr-4">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <div className="text-slate-500 text-sm font-medium">Richieste Candidati</div>
          <div className="text-3xl font-black text-slate-900">{applications.length}</div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mr-4">
          <Briefcase className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <div className="text-slate-500 text-sm font-medium">Offerte Attive</div>
          <div className="text-3xl font-black text-slate-900">{jobs.length}</div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center">
        <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mr-4">
          <User className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <div className="text-slate-500 text-sm font-medium">Ex Detenuti Registrati</div>
          <div className="text-3xl font-black text-slate-900">{candidates.length}</div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Lista Candidature */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Ultime Richieste</h2>
          <button className="text-sm text-emerald-600 font-bold hover:underline">Vedi tutte</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-slate-400 font-bold uppercase text-xs border-b border-slate-100">
              <tr>
                <th className="py-3 pl-2">ID Candidato</th>
                <th className="py-3">Offerta</th>
                <th className="py-3">Stato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {applications.map(app => {
                const job = jobs.find(j => j.id === app.jobId);
                return (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 pl-2 font-mono font-medium text-slate-600">{app.candidateId}</td>
                    <td className="py-4 font-bold text-slate-800">{job ? job.title : 'N/A'}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'Nuova' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lista Offerte */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Offerte Pubblicate</h2>
          <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <div className="font-bold text-slate-900 mb-1">{job.title}</div>
                <div className="text-xs text-slate-500 font-medium flex items-center">
                  <Building2 className="w-3 h-3 mr-1"/> {job.company}
                </div>
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold bg-white border border-emerald-100 text-emerald-700 px-2 py-1 rounded-md">
                  {job.location}
                </span>
              </div>
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
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Aziende Registrate</h2>
          <p className="text-slate-500">Gestisci l'anagrafica dei partner</p>
        </div>
        <button onClick={() => { setSelectedCompany({}); setView('form'); }} className="bg-emerald-600 text-white px-5 py-3 rounded-xl hover:bg-emerald-700 flex items-center font-bold shadow-lg shadow-emerald-500/20 transition transform hover:-translate-y-1">
          <Plus className="w-5 h-5 mr-2" /> Nuova Azienda
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs rounded-lg">
            <tr>
              <th className="p-4 rounded-l-xl">Nome Azienda</th>
              <th className="p-4">P.IVA</th>
              <th className="p-4">Referente</th>
              <th className="p-4 text-right rounded-r-xl">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {companies.map(company => (
              <tr key={company.id} className="hover:bg-slate-50/80 transition group">
                <td className="p-4 font-bold text-slate-900">{company.name}</td>
                <td className="p-4 text-slate-500 font-mono text-sm">{company.piva}</td>
                <td className="p-4 text-slate-600">{company.contact}</td>
                <td className="p-4 text-right">
                  <button onClick={() => { setSelectedCompany(company); setView('detail'); }} className="text-emerald-600 hover:text-emerald-800 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition">Gestisci</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CompanyDetail = () => (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-8">
        <div>
          <div className="flex items-center mb-2">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4 text-emerald-600 font-bold text-xl">
              {selectedCompany.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">{selectedCompany.name}</h2>
              <p className="text-slate-500 font-mono text-sm">P.IVA: {selectedCompany.piva}</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setView('form')} className="p-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition"><Edit className="w-5 h-5" /></button>
          <button onClick={() => handleDelete(selectedCompany.id)} className="p-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition"><Trash2 className="w-5 h-5" /></button>
          <button onClick={() => setView('list')} className="p-3 text-slate-400 bg-slate-50 hover:bg-slate-100 rounded-xl transition"><X className="w-5 h-5" /></button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Contatti</h4>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-slate-50 rounded-xl">
              <User className="w-5 h-5 text-slate-400 mr-3" />
              <div>
                <span className="block text-xs text-slate-400 font-bold">Referente</span>
                <span className="text-slate-800 font-medium">{selectedCompany.contact}</span>
              </div>
            </div>
            <div className="flex items-center p-3 bg-slate-50 rounded-xl">
              <Mail className="w-5 h-5 text-slate-400 mr-3" />
              <div>
                <span className="block text-xs text-slate-400 font-bold">Email</span>
                <span className="text-slate-800 font-medium">{selectedCompany.email}</span>
              </div>
            </div>
            <div className="flex items-center p-3 bg-slate-50 rounded-xl">
              <Phone className="w-5 h-5 text-slate-400 mr-3" />
              <div>
                <span className="block text-xs text-slate-400 font-bold">Telefono</span>
                <span className="text-slate-800 font-medium">{selectedCompany.phone}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Sede Legale</h4>
          <div className="flex items-start p-4 bg-slate-50 rounded-xl h-full">
            <MapPin className="w-5 h-5 text-slate-400 mr-3 mt-1" />
            <div>
              <span className="block text-xs text-slate-400 font-bold mb-1">Indirizzo</span>
              <span className="text-slate-800 font-medium text-lg leading-snug">{selectedCompany.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CompanyForm = () => {
    const [formData, setFormData] = useState(selectedCompany || { name: '', piva: '', address: '', contact: '', email: '', phone: '' });

    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">{formData.id ? 'Modifica Azienda' : 'Nuova Azienda'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(formData); }}>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Nome Azienda</label>
                <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">P.IVA</label>
                <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition" value={formData.piva} onChange={e => setFormData({...formData, piva: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Telefono</label>
                <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Indirizzo Sede</label>
              <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">Dati Referente</h4>
              <div className="grid grid-cols-2 gap-4">
                 <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Nome Cognome</label>
                  <input required type="text" className="w-full bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Email Aziendale</label>
                  <input required type="email" className="w-full bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-end space-x-4">
            <button type="button" onClick={() => setView('list')} className="px-6 py-3 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition">Annulla</button>
            <button type="submit" className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-bold shadow-lg shadow-emerald-500/20 transition flex items-center">
              <Save className="w-5 h-5 mr-2" /> Salva Azienda
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
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Elenco Ex Detenuti</h2>
          <div className="flex items-center mt-2 text-slate-500 text-sm">
             <Shield className="w-4 h-4 mr-1 text-emerald-500"/>
             <span>Visualizzazione Anonima (Solo ID)</span>
          </div>
        </div>
        <button onClick={() => { setSelectedCandidate({}); setView('form'); }} className="bg-emerald-600 text-white px-5 py-3 rounded-xl hover:bg-emerald-700 flex items-center font-bold shadow-lg shadow-emerald-500/20 transition transform hover:-translate-y-1">
          <Plus className="w-5 h-5 mr-2" /> Nuovo Profilo
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs rounded-lg">
            <tr>
              <th className="p-4 rounded-l-xl">ID Candidato</th>
              <th className="p-4">Città di Residenza</th>
              {/* REMOVED SKILLS COLUMN AS REQUESTED */}
              <th className="p-4 text-right rounded-r-xl">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {candidates.map(candidate => (
              <tr key={candidate.id} className="hover:bg-slate-50/80 transition group">
                <td className="p-4 font-mono font-bold text-slate-700 bg-slate-50/50 w-48">
                  <span className="bg-slate-200 px-2 py-1 rounded text-slate-600">{candidate.id}</span>
                </td>
                <td className="p-4 text-slate-800 font-medium">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-slate-400"/>
                    {candidate.city}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => { setSelectedCandidate(candidate); setView('detail'); }} className="text-emerald-600 hover:text-emerald-800 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-lg transition hover:bg-emerald-100">Visualizza Scheda</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CandidateDetail = () => (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 max-w-2xl mx-auto border-t-8 border-emerald-500">
      <div className="flex justify-between items-start mb-10">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">ID PROTETTO</span>
          <h2 className="text-4xl font-mono font-black text-slate-800">{selectedCandidate.id}</h2>
          <div className="flex items-center text-slate-600 font-medium mt-2 bg-slate-100 w-fit px-3 py-1 rounded-lg">
            <MapPin className="w-4 h-4 mr-2" /> {selectedCandidate.city}
          </div>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => setView('form')} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold flex items-center hover:bg-blue-100 transition">
            <Edit className="w-4 h-4 mr-2" /> Modifica
          </button>
          <button onClick={() => setView('list')} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl font-bold flex items-center hover:bg-slate-100 transition">
            <ArrowRight className="w-4 h-4 mr-2" /> Indietro
          </button>
        </div>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
            <Star className="w-4 h-4 mr-2 text-yellow-500" /> Competenze Validate
          </h3>
          <div className="flex flex-wrap gap-3">
            {selectedCandidate.skills.map((skill, i) => (
              <span key={i} className="bg-white text-slate-700 px-4 py-2 rounded-lg font-bold border-2 border-slate-100 shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Note Operatore / Info Aggiuntive</h3>
          <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{selectedCandidate.notes}</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800 flex items-start">
          <Shield className="w-5 h-5 mr-3 flex-shrink-0 text-blue-600" />
          <p>
            <strong>Profilo Anonimizzato.</strong> Per procedere al matching con un'azienda, utilizzare l'ID <strong>{selectedCandidate.id}</strong> nelle comunicazioni. Non condividere mai il vero nome (presente solo nel DB sicuro) all'esterno.
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
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">{formData.id ? 'Modifica Profilo Anonimo' : 'Inserimento Nuovo Profilo'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(formData); }}>
          <div className="space-y-6">
            {formData.id && (
              <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block uppercase font-bold mb-1">ID Univoco (Generato Automaticamente)</span>
                <span className="font-mono font-black text-xl text-slate-800">{formData.id}</span>
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Città di Residenza</label>
              <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Es: Milano" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Competenze / Skills (separate da virgola)</label>
              <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} placeholder="Es: Inglese, Saldatura, Patente B" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Informazioni Aggiuntive / Note</label>
              <textarea required rows="5" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Descrizione del profilo, esperienze passate, vincoli orari..." />
            </div>
          </div>
          <div className="mt-10 flex justify-end space-x-4">
            <button type="button" onClick={() => setView('list')} className="px-6 py-3 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition">Annulla</button>
            <button type="submit" className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-bold shadow-lg shadow-emerald-500/20 transition flex items-center">
              <Save className="w-5 h-5 mr-2" /> Salva Profilo
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
    const newApp = {
      id: applications.length + 1,
      jobId: jobId,
      candidateId: "CAND-??? (Anonimo)", 
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