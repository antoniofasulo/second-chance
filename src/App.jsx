import React, { useState } from 'react';
import { 
  Shield, Users, Briefcase, ChevronRight, Lock, 
  LayoutDashboard, Building2, User, FileText, 
  Plus, Edit, Trash2, Save, X, LogOut, CheckCircle,
  MapPin, Phone, Mail, ArrowRight, Star, Menu
} from 'lucide-react';

// --- MOCK DATA ---
// Nota: I dati 'realName' sono presenti nel database simulato ma NON vengono mai mostrati nell'interfaccia operatore per garantire l'anonimato richiesto.
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
          <span className="font-bold text-xl tracking-wider">SECOND CHANCE</span>
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
            <div className="bg-white border-2 border-emerald-100 p-12 rounded-3xl text-center shadow-xl shadow-emerald-1