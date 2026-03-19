import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, X, Download, PlusCircle, 
  Server, Code2, ShieldCheck, GraduationCap, Briefcase, 
  User, MapPin, Calendar, Fingerprint, Info, Zap, CheckCircle2 
} from 'lucide-react';
import { portfolioData } from './data/portfolioData';

const App = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  const IconMap = { Server, Code2, ShieldCheck };

  const reveal = {
    initial: { opacity: 0, y: 80, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-blue-500/30 overflow-x-hidden font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/5 h-20 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-8 flex justify-between items-center">
          <span className="text-xl font-black tracking-tighter uppercase italic text-white">
            Portfolio <span className="text-blue-500">.</span>
          </span>
          <div className="flex items-center gap-8 font-black uppercase text-[10px] tracking-widest">
            <button onClick={() => setIsAboutOpen(true)} className="hover:text-blue-500 transition cursor-pointer">Qui suis-je ?</button>
            <button onClick={() => setIsContactOpen(true)} className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-500 transition-all">Contact</button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8">
        
        {/* --- SECTION: PROFIL --- */}
        <section className="pt-56 pb-32 border-b border-white/5">
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
                  Mon CV <Download size={18} />
              </a>
            </div>
          </motion.div>
        </section>

        {/* --- SECTION 01: COMPÉTENCES --- */}
        <section className="py-32 border-b border-white/5">
          <motion.h2 {...reveal} className="text-lg font-black uppercase tracking-[0.3em] text-blue-500 mb-20 italic">01. Compétences</motion.h2>
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
        <section className="py-32 border-b border-white/5">
          <motion.h2 {...reveal} className="text-lg font-black uppercase tracking-[0.3em] text-blue-500 mb-20 italic">02. Expériences Pro</motion.h2>
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
        <section className="py-32 border-b border-white/5">
          <motion.h2 {...reveal} className="text-lg font-black uppercase tracking-[0.3em] text-blue-500 mb-20 italic">03. Formations</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.formations.map((f, i) => (
              <motion.div key={i} {...reveal} className="bg-slate-900/30 border border-white/5 p-12 rounded-[40px] group shadow-inner">
                <GraduationCap className="text-white/[0.03] mb-8 group-hover:text-blue-500 transition-colors" size={60} />
                <span className="text-blue-500 font-black text-xs uppercase tracking-widest">{f.periode}</span>
                <h3 className="text-2xl font-black text-white mt-4 uppercase italic tracking-tighter leading-tight">{f.diplome}</h3>
                <p className="text-blue-400 font-bold mt-2 text-lg italic">{f.option}</p>
                <p className="text-slate-500 mt-6 text-xs font-black uppercase tracking-widest">{f.etablissement}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SECTION 04: LANGUES --- */}
        <section className="py-32 border-b border-white/5">
          <motion.h2 {...reveal} className="text-lg font-black uppercase tracking-[0.3em] text-blue-500 mb-20 italic">04. Langues</motion.h2>
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
        <section className="py-32 mb-40">
          <motion.h2 {...reveal} className="text-lg font-black uppercase tracking-[0.3em] text-blue-500 mb-20 italic">05. Atouts</motion.h2>
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
      <footer className="py-32 text-center border-t border-white/5">
        <h2 className="text-4xl font-black text-white italic tracking-[0.5em] mb-12 uppercase">{portfolioData.profil.prenom}</h2>
        <div className="flex justify-center gap-12 mb-12 font-bold uppercase text-[10px] tracking-widest">
           <a href="#" className="hover:text-blue-500 transition cursor-pointer flex items-center gap-2"><Linkedin size={20} /> LinkedIn</a>
           <a href="#" className="hover:text-white transition cursor-pointer flex items-center gap-2"><Github size={20} /> GitHub</a>
           <button onClick={() => setIsContactOpen(true)} className="hover:text-blue-400 transition cursor-pointer flex items-center gap-2"><Mail size={20} /> Email</button>
        </div>
        <p className="text-[10px] font-black text-slate-800 uppercase tracking-[1em]">Engineering Portfolio 2026</p>
      </footer>

      {/* --- MODAUX (AVEC SCROLLING CORRIGÉ) --- */}
      <AnimatePresence>
        
        {/* MODAL QUI SUIS-JE */}
        {isAboutOpen && (
          <div className="fixed inset-0 z-[150] flex justify-center items-start md:items-center p-4 bg-slate-950/98 backdrop-blur-2xl overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="bg-slate-900 border border-white/10 rounded-[40px] md:rounded-[50px] w-full max-w-5xl relative flex flex-col md:flex-row overflow-hidden my-8 shadow-2xl"
            >
              <div className="md:w-1/2 h-[450px] md:h-auto bg-slate-800 relative overflow-hidden group">
                <img 
                  src={portfolioData.aPropos.photos[0]} 
                  alt="Marsouk" 
                  className="w-full h-full object-cover object-top transition-all duration-1000 ease-in-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent md:hidden pointer-events-none" />
              </div>

              <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center relative">
                <button onClick={() => setIsAboutOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors cursor-pointer z-10 p-2 bg-white/5 rounded-full">
                  <X size={24} />
                </button>
                <h2 className="text-3xl font-black text-white italic uppercase mb-10 flex items-center gap-4">
                  <Fingerprint className="text-blue-500" size={32} /> Qui suis-je ?
                </h2>
                <div className="mb-10 pb-6 border-b border-white/5">
                  <p className="text-[10px] uppercase font-black text-blue-500 tracking-[0.3em] mb-2 italic">Identité complète</p>
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                    {portfolioData.aPropos.nomComplet}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 italic">
                  <div className="flex items-center gap-5 pb-4 border-b border-white/5 font-bold">
                    <Calendar className="text-blue-500/50" size={24} /> 
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Né le</p>
                      <p className="text-base text-white">{portfolioData.aPropos.naissance}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 pb-4 border-b border-white/5 font-bold">
                    <MapPin className="text-blue-500/50" size={24} /> 
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Lieu</p>
                      <p className="text-base text-white">{portfolioData.aPropos.lieu}</p>
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed italic text-lg mb-10 border-l-2 border-blue-500/30 pl-6">
                  {portfolioData.aPropos.bioLongue}
                </p>
                <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                  <p className="text-[10px] font-black text-blue-500 mb-2 uppercase tracking-widest">Ma Passion Digitale</p>
                  <p className="text-white italic font-medium leading-relaxed">{portfolioData.aPropos.passion}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* MODAL CONTACT */}
        {isContactOpen && (
          <div className="fixed inset-0 z-[200] flex justify-center items-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-white/10 p-12 rounded-[40px] w-full max-w-xl relative my-8">
                <button onClick={() => setIsContactOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition"><X size={32} /></button>
                <h2 className="text-4xl font-black text-white mb-10 italic uppercase tracking-tighter">Contact<span className="text-blue-500">.</span></h2>
                <form className="space-y-4">
                  <input type="text" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 text-white" placeholder="Nom complet" />
                  <input type="email" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 text-white" placeholder="Email professionnel" />
                  <textarea rows="4" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 text-white" placeholder="Votre message"></textarea>
                  <button className="w-full bg-blue-600 py-6 rounded-2xl font-black text-white uppercase tracking-widest text-xs hover:bg-blue-500 shadow-2xl shadow-blue-600/20">Envoyer maintenant</button>
                </form>
             </motion.div>
          </div>
        )}

        {/* MODAL DÉTAILS EXPÉRIENCE (Scrolling Corrigé) */}
        {selectedExp && (
          <div className="fixed inset-0 z-[200] flex justify-center items-start md:items-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto">
            <motion.div 
              initial={{ y: 100, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 100, opacity: 0 }} 
              className="bg-slate-900 border border-white/10 p-10 md:p-16 rounded-[40px] md:rounded-[50px] w-full max-w-3xl relative shadow-2xl my-8"
            >
              <button onClick={() => setSelectedExp(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition cursor-pointer"><X size={32} /></button>
              <span className="text-blue-500 font-black text-sm uppercase tracking-widest">{selectedExp.periode}</span>
              <h3 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter italic uppercase mt-4 leading-none text-white">{selectedExp.entreprise}</h3>
              <p className="text-blue-400 font-black text-xl mb-10 italic border-l-4 border-blue-500 pl-6 uppercase">{selectedExp.poste}</p>
              <p className="text-slate-300 leading-relaxed text-xl md:text-2xl font-light mb-12 italic opacity-80 underline decoration-slate-800 underline-offset-8">
                {selectedExp.details}
              </p>
              <div className="flex flex-wrap gap-3">
                {selectedExp.tags.map(t => <span key={t} className="bg-white/5 px-6 py-2 rounded-xl text-xs font-black text-blue-400 border border-white/10 uppercase tracking-widest">{t}</span>)}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;