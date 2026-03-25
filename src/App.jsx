import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, Mail, X, Download, PlusCircle, 
  Server, Code2, ShieldCheck, GraduationCap, Briefcase, 
  User, MapPin, Calendar, Fingerprint, Info, Zap, 
  CheckCircle2, Award, FileText, ArrowRight,
  Facebook, MessageCircle // <-- On ajoute ces deux là
} from 'lucide-react';
import { portfolioData } from './data/portfolioData';

const App = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState(null);

  const IconMap = { Server, Code2, ShieldCheck };

  const [scrolled, setScrolled] = React.useState(false);

  // 1. Ajoute ces états en haut de ton composant App
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  // 2. Ajoute la fonction de soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsContactOpen(false), 2000); // Ferme après 2s
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const reveal = {
    initial: { opacity: 0, y: 80, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-blue-500/30 overflow-x-hidden font-sans italic">
      {/* --- NAVBAR ADAPTATIVE --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled 
        ? 'h-16 bg-slate-950/95 backdrop-blur-xl border-white/10 shadow-2xl' 
        : 'h-24 bg-transparent border-transparent'
      }`}>
        <div className="max-w-6xl mx-auto w-full h-full px-6 md:px-8 flex justify-between items-center">
          
          {/* LOGO : Taille adaptable */}
          <span className={`font-black tracking-tighter uppercase italic text-white transition-all duration-500 ${
            scrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
          }`}>
            Portfolio <span className="text-blue-500">.</span>
          </span>

          {/* ACTIONS : Flexbox intelligente */}
          <div className="flex items-center gap-3 md:gap-8 font-black uppercase tracking-widest">
            {/* Bouton Contact */}
            <button 
              onClick={() => setIsContactOpen(true)} 
              className={`bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 cursor-pointer flex items-center gap-2 ${
                scrolled 
                ? 'px-4 py-2 text-[10px] md:text-sm' 
                : 'px-6 py-3 md:px-8 md:py-3 text-[10px] md:text-lg'
              }`}
            >
              <span className="hidden sm:inline">Contactez-moi</span>
              <span className="sm:hidden font-bold">Contactez-moi</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 md:px-8">
        
        {/* --- SECTION: PROFIL --- */}
        <section className="pt-40 md:pt-56 pb-16 md:pb-32 border-b border-white/5">
          <motion.div {...reveal}>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 italic capitalize leading-tight">
              {portfolioData.profil.prenom} <br />
              <span className="text-slate-700">{portfolioData.profil.nom}</span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-400 max-w-3xl leading-relaxed mb-12 font-light italic">
              "{portfolioData.profil.description}"
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setIsAboutOpen(true)} className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-black text-xs uppercase hover:scale-105 transition-transform shadow-xl">
                <User size={18} /> Qui suis-je ?
              </button>
              <a 
                  href={portfolioData.profil.cvLink} 
                  download="CV_MARSOUK.pdf" 
                  className="flex items-center gap-3 p-5 border border-slate-800 rounded-2xl hover:bg-slate-900 hover:border-blue-500 transition-all text-white font-black text-xs uppercase tracking-widest"
                >
                  Télécharger mon CV <Download size={18} />
              </a>
            </div>
          </motion.div>
        </section>

        {/* --- SECTION 01: COMPÉTENCES --- */}
        <section className="py-16 md:py-32 border-b border-white/5">
          <motion.h2 {...reveal} className="text-lg font-black uppercase tracking-[0.3em] text-blue-500 mb-12 md:mb-20 italic">01. Compétences</motion.h2>
          <div className="grid md:grid-cols-3 gap-12">
            {portfolioData.competences.map((skill, i) => {
              const Icon = IconMap[skill.icon];
              return (
                <motion.div key={i} {...reveal} transition={{ delay: i * 0.15 }} className="group">
                  <div className="mb-8 text-blue-500 group-hover:scale-110 transition-transform inline-block">
                    <Icon size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter italic text-white">{skill.titre}</h3>
                  <ul className="space-y-4">
                    {skill.items.map((item, j) => (
                      <li key={j} className="text-slate-500 text-lg flex items-center gap-3 font-medium">
                        <CheckCircle2 size={16} className="text-blue-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* --- SECTION 02: EXPÉRIENCES PROFESSIONNELLES --- */}
        <section className="py-16 md:py-32 border-b border-white/5">
          <motion.h2 {...reveal} className="text-lg font-black uppercase tracking-[0.3em] text-blue-500 mb-12 md:mb-20 italic">02. Expériences Pro</motion.h2>
          <div className="space-y-6">
            {portfolioData.experiences.map((exp, i) => (
              <motion.div 
                key={exp.id} 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white/[0.02] border border-white/5 p-10 rounded-[40px] flex flex-col md:flex-row justify-between items-center group hover:bg-white/[0.04] transition-all cursor-pointer shadow-lg"
                onClick={() => setSelectedExp(exp)}
              >
                <div>
                  <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest">{exp.periode}</span>
                  <h3 className="text-3xl font-black text-white mt-1 italic tracking-tighter">{exp.entreprise}</h3>
                  <p className="text-slate-500 font-bold uppercase text-xs mt-1 tracking-tighter italic">{exp.poste}</p>
                </div>
                <button className="mt-8 md:mt-0 flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                  Détails <PlusCircle size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SECTION 03: DIPLÔMES ET FORMATIONS --- */}
        <section className="py-16 md:py-32 border-b border-white/5">
          <motion.h2 {...reveal} className="text-lg font-black uppercase tracking-[0.3em] text-blue-500 mb-12 md:mb-20 italic">
            03. Formations
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {portfolioData.formations.map((f, i) => (
              <motion.div 
                key={i} 
                {...reveal} 
                className="group relative bg-white/[0.02] border border-white/5 p-10 md:p-14 rounded-[50px] hover:bg-white/[0.04] hover:border-blue-500/20 transition-all duration-500 flex flex-col justify-between min-h-[450px] shadow-2xl overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 pointer-events-none text-white">
                  <GraduationCap size={200} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-[2px] w-12 bg-blue-500" />
                    <span className="text-blue-500 font-black text-xs uppercase tracking-[0.3em]">Promotion {f.periode}</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-6 group-hover:text-blue-400 transition-colors duration-500">
                    {f.diplome}
                  </h3>
                  <p className="text-blue-400/80 font-bold text-xl italic mb-10 underline decoration-blue-500/20 underline-offset-8">
                    {f.option}
                  </p>
                </div>
                <div className="mt-auto relative z-10">
                  <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-10 flex items-center gap-3 italic font-bold">
                     <MapPin size={14} className="text-blue-500" /> {f.etablissement}
                  </p>
                  
                  {f.details ? (
                    <button 
                      onClick={() => setSelectedFormation(f)}
                      className="inline-flex items-center gap-4 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 group/btn cursor-pointer shadow-xl"
                    >
                      Détails du diplôme 
                      <PlusCircle size={18} className="group-hover/btn:rotate-90 transition-transform duration-500 text-blue-500 group-hover/btn:text-black" />
                    </button>
                  ) : f.document ? (
                    <a 
                      href={f.document} 
                      download 
                      className="inline-flex items-center gap-4 bg-blue-600/10 text-blue-400 border border-blue-500/30 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-500 group/btn shadow-xl"
                    >
                      Télécharger le diplôme 
                      <Download size={18} className="group-hover/btn:-translate-y-1 transition-transform duration-500" />
                    </a>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SECTION 04: LANGUES --- */}
        <section className="py-16 md:py-32 border-b border-white/5">
          <motion.h2 {...reveal} className="text-lg font-black uppercase tracking-[0.3em] text-blue-500 mb-12 md:mb-20 italic">04. Langues</motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            {portfolioData.langues.map(l => (
              <div key={l.nom} className="flex justify-between items-end border-b-4 border-white/5 pb-6">
                <span className="text-5xl font-black italic tracking-tighter uppercase text-white">{l.nom}</span>
                <span className="text-blue-500 text-sm font-black uppercase tracking-widest mb-2">{l.niveau}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 05: ATOUTS --- */}
        <section className="py-16 md:py-32 mb-20 md:mb-40">
          <motion.h2 {...reveal} className="text-lg font-black uppercase tracking-[0.3em] text-blue-500 mb-12 md:mb-20 italic">05. Atouts</motion.h2>
          <div className="flex flex-wrap gap-6">
            {portfolioData.atouts.map(a => (
              <span key={a} className="bg-white/5 px-10 py-6 rounded-[30px] text-2xl font-black text-slate-300 border border-white/10 hover:border-blue-500 transition-all uppercase tracking-tighter italic shadow-md">
                {a}
              </span>
            ))}
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="py-20 md:py-32 text-center border-t border-white/5 bg-slate-950/20 font-bold uppercase text-[10px] tracking-widest italic">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div {...reveal}>
            <h2 className="text-3xl md:text-6xl font-black text-white italic tracking-tighter mb-8 leading-tight uppercase tracking-tighter">
              Prêt à propulser <br />
              <span className="text-blue-500 underline decoration-white/10 underline-offset-8 italic">vos projets informatiques ?</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-20 font-black uppercase text-[10px] tracking-[0.2em]">
               <a href={portfolioData.contact.linkedin} className="hover:text-blue-500 transition-all flex flex-col items-center gap-4 group">
                  <div className="p-5 bg-white/5 rounded-full border border-white/10 group-hover:bg-blue-600 transition-all duration-500 shadow-xl"><Linkedin size={28} /></div>
                  <span>LinkedIn</span>
               </a>
               <a href={portfolioData.contact.whatsapp} className="hover:text-blue-500 transition-all flex flex-col items-center gap-4 group">
                  <div className="p-5 bg-white/5 rounded-full border border-white/10 group-hover:bg-blue-600 transition-all duration-500 shadow-xl"><MessageCircle size={28} /></div>
                  <span>Whatsapp</span>
               </a>
               <a href={portfolioData.contact.facebook} className="hover:text-blue-500 transition-all flex flex-col items-center gap-4 group">
                  <div className="p-5 bg-white/5 rounded-full border border-white/10 group-hover:bg-blue-600 transition-all duration-500 shadow-xl"><Facebook size={28} /></div>
                  <span>Facebook</span>
               </a>
            </div>
            <div className="pt-12 border-t border-white/5 font-black uppercase text-[10px] tracking-widest italic">
              <p className="text-slate-800 tracking-[1em]">Engineering Portfolio — 2026</p>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* --- MODAUX --- */}
      <AnimatePresence>
        {/* MODAL QUI SUIS-JE */}
        {isAboutOpen && (
          <div className="fixed inset-0 z-[150] flex justify-center items-start md:items-center p-4 bg-slate-950/98 backdrop-blur-2xl overflow-y-auto font-bold uppercase text-[10px] tracking-widest italic font-bold">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-slate-900 border border-white/10 rounded-[40px] md:rounded-[50px] w-full max-w-5xl relative flex flex-col md:flex-row overflow-hidden my-8 shadow-2xl">
              <div className="md:w-1/2 h-[450px] md:h-auto bg-slate-800 relative overflow-hidden">
                <img src={portfolioData.aPropos.photos[0]} alt="Marsouk" className="w-full h-full object-cover object-top transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent md:hidden pointer-events-none font-bold uppercase text-[10px] tracking-widest italic font-bold" />
              </div>
              <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center relative">
                <button onClick={() => setIsAboutOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors cursor-pointer z-10 p-2 bg-white/5 rounded-full"><X size={24} /></button>
                <h2 className="text-3xl font-black text-white italic uppercase mb-10 flex items-center gap-4"><Fingerprint className="text-blue-500" size={32} /> Qui suis-je ?</h2>
                <div className="mb-10 pb-6 border-b border-white/5">
                  <p className="text-[10px] uppercase font-black text-blue-500 tracking-[0.3em] mb-2 italic font-bold">Identité complète</p>
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{portfolioData.aPropos.nomComplet}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 italic font-bold">
                  <div className="flex items-center gap-5 pb-4 border-b border-white/5"><Calendar className="text-blue-500/50" size={24} /><div><p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Né le</p><p className="text-base text-white">{portfolioData.aPropos.naissance}</p></div></div>
                  <div className="flex items-center gap-5 pb-4 border-b border-white/5"><MapPin className="text-blue-500/50" size={24} /><div><p className="text-[10px] uppercase font-black text-slate-500 tracking-widest font-bold">Lieu</p><p className="text-base text-white">{portfolioData.aPropos.lieu}</p></div></div>
                </div>
                <p className="text-slate-400 leading-relaxed italic text-lg mb-10 border-l-2 border-blue-500/30 pl-6 font-bold uppercase text-[10px] tracking-widest italic font-bold font-bold uppercase text-[10px] tracking-widest italic font-bold">{portfolioData.aPropos.bioLongue}</p>
                <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5"><p className="text-[10px] font-black text-blue-500 mb-2 uppercase tracking-widest italic font-bold">Ma Passion Digitale</p><p className="text-white italic font-medium leading-relaxed font-bold uppercase text-[10px] tracking-widest italic font-bold">{portfolioData.aPropos.passion}</p></div>
              </div>
            </motion.div>
          </div>
        )}

        {/* MODAL CONTACT CORRIGÉ */}
        {isContactOpen && (
          <div className="fixed inset-0 z-[200] flex justify-center items-start md:items-center p-4 sm:p-6 bg-slate-950/98 backdrop-blur-3xl overflow-y-auto font-sans italic font-bold">
             <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 40 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.9, opacity: 0, y: 40 }} 
                className="bg-slate-900 border border-white/10 rounded-[40px] md:rounded-[60px] w-full max-w-6xl relative flex flex-col md:flex-row my-auto shadow-2xl overflow-hidden"
             >
                {/* --- COLONNE GAUCHE : INFOS --- */}
                <div className="md:w-2/5 bg-blue-600 p-8 md:p-16 text-white relative overflow-hidden flex flex-col justify-between min-h-[300px] md:min-h-full">
                  <Zap size={300} className="absolute -bottom-20 -left-20 text-white/10 rotate-12 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 leading-none">
                      Parlons <br className="hidden md:block" /> de votre <br /> <span className="underline decoration-white/20 underline-offset-8">Projet.</span>
                    </h2>
                    <p className="text-blue-100 text-sm md:text-xl font-medium italic mb-8 opacity-80 leading-relaxed max-w-xs md:max-w-full">
                      Expertise en Réseau, Sécurité et Développement Web.
                    </p>
                  </div>

                  <div className="space-y-6 relative z-10 font-bold uppercase text-[9px] md:text-[10px] tracking-[0.2em]">
                    <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white group-hover:text-blue-600 transition-all duration-500"><Mail size={20} /></div>
                      <div><p className="opacity-50">Email</p><p className="text-sm font-black lowercase tracking-normal italic">{portfolioData.contact.email}</p></div>
                    </div>
                    <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white group-hover:text-blue-600 transition-all duration-500"><MapPin size={20} /></div>
                      <div><p className="opacity-50 font-bold uppercase text-[10px] tracking-widest italic font-bold">Localisation</p><p className="text-sm font-black italic">{portfolioData.contact.localisation}</p></div>
                    </div>
                  </div>
                </div>

                {/* --- COLONNE DROITE : FORMULAIRE --- */}
                <div className="md:w-3/5 p-8 md:p-20 relative bg-slate-900 flex flex-col justify-center">
                  <button 
                    onClick={() => setIsContactOpen(false)} 
                    className="absolute top-4 right-4 md:top-8 md:right-8 text-slate-500 hover:text-white transition cursor-pointer p-3 bg-white/5 rounded-full z-20"
                  >
                    <X size={28} />
                  </button>
                  
                  {/* handleSubmit ajouté ici pour l'envoi de mail */}
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 italic font-bold mt-4 md:mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-blue-500 tracking-widest ml-2 italic">Nom complet</label>
                        <input 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 text-white transition-all shadow-inner" placeholder="Marsouk ..." 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-blue-500 tracking-widest ml-2 italic">Votre Email</label>
                        <input 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 text-white transition-all shadow-inner" placeholder="email@domaine.com" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-blue-500 tracking-widest ml-2 italic">Sujet</label>
                      <input 
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 text-white transition-all shadow-inner" placeholder="Audit / Développement..." 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-blue-500 tracking-widest ml-2 italic">Votre Message</label>
                      <textarea 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows="4" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 text-white transition-all shadow-inner resize-none" placeholder="Dites-moi tout..."
                      ></textarea>
                    </div>

                    <motion.button 
                      disabled={status === 'loading'}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full bg-blue-600 py-5 md:py-6 rounded-3xl font-black text-white uppercase tracking-[0.3em] text-[11px] md:text-xs hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-4 group"
                    >
                      {status === 'loading' ? 'Envoi en cours...' : 'Envoyer la demande'} 
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </motion.button>

                    {/* Affichage des états d'envoi */}
                    {status === 'success' && <p className="text-green-500 text-center text-xs font-bold">Message envoyé avec succès ! 🚀</p>}
                    {status === 'error' && <p className="text-red-500 text-center text-xs font-bold">Erreur lors de l'envoi. Réessayez.</p>}
                  </form>
                </div>
             </motion.div>
          </div>
        )}

        {/* MODAL EXPÉRIENCE AVEC PHOTO (SPLIT VIEW) */}
        {selectedExp && (
          <div className="fixed inset-0 z-[200] flex justify-center items-start md:items-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto">
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className={`bg-slate-900 border border-white/10 rounded-[40px] md:rounded-[50px] w-full ${selectedExp.photo ? 'max-w-6xl flex flex-col md:flex-row' : 'max-w-3xl p-10 md:p-16'} relative shadow-2xl my-8 overflow-hidden`} >
              <button onClick={() => setSelectedExp(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition z-50 p-2 bg-black/20 rounded-full"><X size={32} /></button>
              {selectedExp.photo && (
                <div className="md:w-1/2 h-[400px] md:h-auto bg-slate-800 relative">
                  <img src={selectedExp.photo} alt={selectedExp.entreprise} className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent md:hidden" />
                </div>
              )}
              <div className={`${selectedExp.photo ? 'md:w-1/2 p-8 md:p-16' : ''}`}>
                <span className="text-blue-500 font-black text-sm uppercase tracking-widest">{selectedExp.periode}</span>
                <h3 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter italic uppercase mt-4 leading-none text-white">{selectedExp.entreprise}</h3>
                <p className="text-blue-400 font-black text-xl mb-10 italic border-l-4 border-blue-500 pl-6 uppercase">{selectedExp.poste}</p>
                <p className="text-slate-300 leading-relaxed text-xl md:text-2xl font-light mb-12 italic opacity-80 underline decoration-slate-800 underline-offset-8">{selectedExp.details}</p>
                {selectedExp.document && (
                  <a href={selectedExp.document} download className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all mb-8 shadow-xl">
                    <FileText size={18} /> Télécharger l'attestation
                  </a>
                )}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5 font-bold">
                  {selectedExp.tags.map(t => <span key={t} className="bg-white/5 px-6 py-2 rounded-xl text-xs font-black text-blue-400 border border-white/10 uppercase">{t}</span>)}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* MODAL DÉTAILS DIPLÔME */}
        {selectedFormation && (
          <div className="fixed inset-0 z-[200] flex justify-center items-start md:items-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto italic font-bold">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="bg-slate-900 border border-white/10 rounded-[40px] md:rounded-[50px] w-full max-w-5xl relative flex flex-col md:flex-row overflow-hidden my-8 shadow-2xl italic font-bold">
              <div className="md:w-1/2 h-[400px] md:h-auto bg-slate-800 relative italic font-bold">
                <img src={selectedFormation.photo} alt="Diplôme" className="w-full h-full object-cover object-center italic font-bold" />
              </div>
              <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center italic font-bold">
                <button onClick={() => setSelectedFormation(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition cursor-pointer italic font-bold"><X size={32} /></button>
                <h2 className="text-3xl font-black text-white italic uppercase mb-4 tracking-widest italic font-bold">Succès Académique</h2>
                <div className="mb-8"><p className="text-[10px] uppercase font-black text-blue-500 tracking-[0.3em] mb-2 italic tracking-widest italic font-bold font-bold">Diplôme obtenu</p><h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight tracking-widest italic font-bold font-bold">{selectedFormation.diplome}</h3></div>
                <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5 mb-8"><p className="text-slate-400 leading-relaxed italic text-lg tracking-widest italic font-bold font-bold">{selectedFormation.details}</p></div>
                {selectedFormation.document && (
                  <a href={selectedFormation.document} download className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all mb-8 w-fit shadow-xl italic font-bold font-bold">
                    <Download size={18} /> Télécharger le diplôme (PDF)
                  </a>
                )}
                <div className="flex items-center gap-4 text-slate-500 font-black text-[10px] uppercase tracking-widest italic mt-auto tracking-widest italic font-bold font-bold"><Award className="text-blue-500" /> {selectedFormation.etablissement} — {selectedFormation.periode}</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;