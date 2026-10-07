import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import {
  Linkedin, Mail, X, Download, Server, Code2, ShieldCheck, Workflow,
  MapPin, Calendar, Globe, Github, HardDrive, ExternalLink, FileText,
  MessageCircle, Facebook, ArrowUpRight, GraduationCap, Phone,
} from 'lucide-react';
import { portfolioData as d } from './data/portfolioData';

/* ---------- Design tokens ----------
   Encre  #0F1B2D  (sidebar, titres)
   Papier #F1F4F8  (fond)
   Cobalt #1D4ED8  (accent sur clair)
   Ciel   #9DB8FF  (accent sur encre)
   Ardoise #52607A (texte secondaire)
------------------------------------ */
const DISPLAY = "font-['Bricolage_Grotesque',sans-serif]";
const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]';

const IconMap = { Server, Code2, ShieldCheck, Workflow };
const linkIcon = (type) =>
  ({ github: <Github size={15} />, drive: <HardDrive size={15} />, web: <Globe size={15} /> }[type] || <ExternalLink size={15} />);

/* ---------- Petits composants ---------- */
const SectionTitle = ({ id, children }) => (
  <h2 id={id} className={`${DISPLAY} mb-10 scroll-mt-24 text-3xl font-bold tracking-tight text-[#0F1B2D] md:text-4xl`}>
    {children}
  </h2>
);

const Modal = ({ onClose, label, wide, children }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#0F1B2D]/70 p-4 backdrop-blur-sm md:items-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog" aria-modal="true" aria-label={label}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}
        className={`relative my-8 w-full overflow-hidden rounded-2xl bg-white shadow-2xl ${wide ? 'max-w-5xl' : 'max-w-2xl'}`}
      >
        <button
          onClick={onClose} aria-label="Fermer"
          className={`absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-[#0F1B2D] shadow hover:bg-white ${FOCUS}`}
        >
          <X size={20} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

const Tag = ({ children }) => (
  <span className="rounded-md bg-[#E3EAFB] px-2.5 py-1 text-xs font-medium text-[#1D4ED8]">{children}</span>
);

const DocLink = ({ href, children }) => (
  <a
    href={href} target="_blank" rel="noreferrer"
    className={`inline-flex items-center gap-2 rounded-lg bg-[#1D4ED8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1A43B8] ${FOCUS}`}
  >
    <FileText size={16} /> {children}
  </a>
);

/* Schéma réseau du hero : les trois pôles du profil, MIAGE au centre */
const Topology = () => (
  <svg viewBox="0 0 520 220" role="img" aria-label="Schéma : réseaux, MIAGE et développement reliés" className="w-full max-w-xl">
    <g stroke="#9DB8FF" strokeWidth="2" strokeDasharray="5 6" fill="none">
      <path d="M95 110 H225" />
      <path d="M295 110 H425" />
    </g>
    {[
      { x: 95, y: 110, t: 'Réseaux', s: 'Cisco · Linux', fill: '#fff', ink: '#0F1B2D' },
      { x: 260, y: 110, t: 'MIAGE', s: 'Systèmes d\'information', fill: '#1D4ED8', ink: '#fff' },
      { x: 425, y: 110, t: 'Développement', s: 'React · Laravel', fill: '#fff', ink: '#0F1B2D' },
    ].map((n) => (
      <g key={n.t}>
        <rect x={n.x - 68} y={n.y - 40} width="136" height="80" rx="14" fill={n.fill} stroke="#C9D5EE" />
        <text x={n.x} y={n.y - 4} textAnchor="middle" fontSize="17" fontWeight="700" fill={n.ink} fontFamily="Bricolage Grotesque, sans-serif">{n.t}</text>
        <text x={n.x} y={n.y + 18} textAnchor="middle" fontSize="11" fill={n.fill === '#fff' ? '#52607A' : '#DCE6FF'}>{n.s}</text>
      </g>
    ))}
  </svg>
);

const ContactForm = ({ onDone }) => {
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) return setStatus('error');
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(onDone, 2000);
    } catch {
      setStatus('error');
    }
  };

  const field = 'w-full rounded-lg border border-[#C9D5EE] bg-white px-4 py-3 text-[#0F1B2D] outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20';
  const label = 'mb-1.5 block text-sm font-medium text-[#0F1B2D]';

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={label} htmlFor="c-name">Nom complet</label>
          <input id="c-name" required type="text" value={form.name} onChange={set('name')} className={field} /></div>
        <div><label className={label} htmlFor="c-email">Email</label>
          <input id="c-email" required type="email" value={form.email} onChange={set('email')} className={field} /></div>
      </div>
      <div><label className={label} htmlFor="c-subject">Sujet</label>
        <input id="c-subject" required type="text" value={form.subject} onChange={set('subject')} className={field} /></div>
      <div><label className={label} htmlFor="c-msg">Message</label>
        <textarea id="c-msg" required rows="5" value={form.message} onChange={set('message')} className={`${field} resize-none`} /></div>
      <button
        type="submit" disabled={status === 'loading'}
        className={`w-full rounded-lg bg-[#1D4ED8] px-6 py-3.5 font-semibold text-white hover:bg-[#1A43B8] disabled:opacity-60 ${FOCUS}`}
      >
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer le message'}
      </button>
      <p aria-live="polite" className="min-h-5 text-center text-sm">
        {status === 'success' && <span className="text-green-700">Message envoyé. Je vous réponds rapidement.</span>}
        {status === 'error' && <span className="text-red-700">L'envoi a échoué. Réessayez ou écrivez-moi à {d.contact.email}.</span>}
      </p>
    </form>
  );
};

/* ---------- App ---------- */
const App = () => {
  const [modal, setModal] = useState(null); // 'about' | 'contact' | {type:'exp'|'form', item}
  const close = React.useCallback(() => setModal(null), []);

  const nav = [
    ['parcours', 'Parcours'],
    ['experiences', 'Expériences'],
    ['competences', 'Compétences'],
    ['projets', 'Projets'],
  ];

  const socials = [
    { href: d.contact.linkedin, label: 'LinkedIn', icon: <Linkedin size={18} /> },
    { href: d.contact.whatsapp, label: 'WhatsApp', icon: <MessageCircle size={18} /> },
    { href: d.contact.facebook, label: 'Facebook', icon: <Facebook size={18} /> },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
      />

      <div className="min-h-screen scroll-smooth bg-[#F1F4F8] font-['IBM_Plex_Sans',sans-serif] text-[#52607A] lg:grid lg:grid-cols-[340px_1fr]">
        {/* ===== Colonne identité ===== */}
        <aside className="bg-[#0F1B2D] px-6 py-8 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:px-10 lg:py-12">
          <div>
            <p className={`${DISPLAY} text-3xl font-bold leading-tight`}>
              {d.profil.prenom}<br />{d.profil.nom}
            </p>
            <p className="mt-3 text-sm text-[#9DB8FF]">{d.profil.titre}</p>

            <nav aria-label="Sections" className="mt-8 hidden lg:block">
              <ul className="space-y-1">
                {nav.map(([id, text]) => (
                  <li key={id}>
                    <a href={`#${id}`} className={`block rounded-md py-1.5 text-slate-300 hover:text-white ${FOCUS}`}>{text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-8 space-y-5 lg:mt-0">
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><MapPin size={15} className="text-[#9DB8FF]" /> {d.contact.localisation}</li>
              <li className="flex items-center gap-2"><Mail size={15} className="text-[#9DB8FF]" /> {d.contact.email}</li>
              <li className="flex items-center gap-2"><Phone size={15} className="text-[#9DB8FF]" /> {d.contact.telephone}</li>
            </ul>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                   className={`rounded-lg border border-white/15 p-2.5 hover:bg-white hover:text-[#0F1B2D] ${FOCUS}`}>
                  {s.icon}
                </a>
              ))}
            </div>
            <button onClick={() => setModal('contact')}
              className={`w-full rounded-lg bg-white px-4 py-3 font-semibold text-[#0F1B2D] hover:bg-[#E3EAFB] ${FOCUS}`}>
              Me contacter
            </button>
          </div>
        </aside>

        {/* ===== Contenu ===== */}
        <main className="px-6 py-14 md:px-12 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-3xl">
            {/* Hero */}
            <section className="pb-20">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-[#1D4ED8] shadow-sm">
                <GraduationCap size={16} /> {d.profil.statut}
              </p>
              <h1 className={`${DISPLAY} text-4xl font-bold leading-[1.1] tracking-tight text-[#0F1B2D] md:text-6xl`}>
                {d.profil.accroche}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed">{d.profil.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => setModal('about')}
                  className={`rounded-lg bg-[#0F1B2D] px-5 py-3 font-semibold text-white hover:bg-[#1C2D47] ${FOCUS}`}>
                  Qui suis-je ?
                </button>
                <a href={d.profil.cvLink} download="CV_Marsouk_Biaou.pdf"
                   className={`inline-flex items-center gap-2 rounded-lg border border-[#C9D5EE] bg-white px-5 py-3 font-semibold text-[#0F1B2D] hover:border-[#1D4ED8] ${FOCUS}`}>
                  <Download size={18} /> Télécharger mon CV
                </a>
              </div>
              <div className="mt-12"><Topology /></div>
            </section>

            {/* Parcours */}
            <section className="pb-20">
              <SectionTitle id="parcours">Parcours</SectionTitle>
              <ol className="relative space-y-8 border-l-2 border-[#C9D5EE] pl-8">
                {d.formations.map((f) => (
                  <li key={f.id} className="relative">
                    <span className={`absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-[#F1F4F8] ${f.enCours ? 'bg-[#1D4ED8]' : 'bg-[#9DB8FF]'}`} />
                    <p className="text-sm font-medium text-[#1D4ED8]">{f.periode}</p>
                    <h3 className={`${DISPLAY} mt-1 text-xl font-bold text-[#0F1B2D]`}>{f.diplome}</h3>
                    <p className="mt-1">{f.option}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm"><MapPin size={14} /> {f.etablissement}</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {f.details && (
                        <button onClick={() => setModal({ type: 'form', item: f })}
                          className={`rounded-lg border border-[#C9D5EE] bg-white px-4 py-2 text-sm font-semibold text-[#0F1B2D] hover:border-[#1D4ED8] ${FOCUS}`}>
                          Voir le détail
                        </button>
                      )}
                      {!f.details && f.document && (
                        <a href={f.document} target="_blank" rel="noreferrer"
                           className={`inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:underline ${FOCUS}`}>
                          <Download size={15} /> Voir le diplôme
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Expériences */}
            <section className="pb-20">
              <SectionTitle id="experiences">Expériences</SectionTitle>
              <ul className="space-y-4">
                {d.experiences.map((e) => (
                  <li key={e.id}>
                    <button onClick={() => setModal({ type: 'exp', item: e })}
                      className={`group flex w-full items-center justify-between gap-4 rounded-xl border border-[#DCE4F2] bg-white p-6 text-left hover:border-[#1D4ED8] ${FOCUS}`}>
                      <span>
                        <span className="text-sm font-medium text-[#1D4ED8]">{e.periode}</span>
                        <span className={`${DISPLAY} mt-1 block text-xl font-bold text-[#0F1B2D]`}>{e.entreprise}</span>
                        <span className="mt-0.5 block text-sm">{e.poste}</span>
                      </span>
                      <ArrowUpRight className="shrink-0 text-[#9DB8FF] group-hover:text-[#1D4ED8]" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Compétences */}
            <section className="pb-20">
              <SectionTitle id="competences">Compétences</SectionTitle>
              <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
                {d.competences.map((c) => {
                  const Icon = IconMap[c.icon] || Code2;
                  return (
                    <div key={c.titre}>
                      <h3 className={`${DISPLAY} mb-3 flex items-center gap-2.5 text-lg font-bold text-[#0F1B2D]`}>
                        <Icon size={20} className="text-[#1D4ED8]" /> {c.titre}
                      </h3>
                      <ul className="space-y-1.5 border-l-2 border-[#C9D5EE] pl-4">
                        {c.items.map((i) => <li key={i}>{i}</li>)}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Projets */}
            <section className="pb-20">
              <SectionTitle id="projets">Projets</SectionTitle>
              <div className="space-y-6">
                {d.projets.map((p) => (
                  <article key={p.id} className="rounded-xl border border-[#DCE4F2] bg-white p-6 md:p-8">
                    <h3 className={`${DISPLAY} text-xl font-bold text-[#0F1B2D]`}>{p.titre}</h3>
                    <p className="mt-2 leading-relaxed">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{p.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {p.liens.filter((l) => !l.url.includes('...')).map((l) => (
                        <a key={l.nom} href={l.url} target="_blank" rel="noreferrer"
                           className={`inline-flex items-center gap-2 rounded-lg border border-[#C9D5EE] px-4 py-2 text-sm font-semibold text-[#0F1B2D] hover:border-[#1D4ED8] ${FOCUS}`}>
                          {linkIcon(l.type)} {l.nom}
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Langues + atouts */}
            <section className="grid gap-12 pb-16 sm:grid-cols-2">
              <div>
                <h2 className={`${DISPLAY} mb-4 text-2xl font-bold text-[#0F1B2D]`}>Langues</h2>
                <ul className="space-y-2">
                  {d.langues.map((l) => (
                    <li key={l.nom} className="flex justify-between border-b border-[#DCE4F2] pb-2">
                      <span className="font-medium text-[#0F1B2D]">{l.nom}</span><span>{l.niveau}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className={`${DISPLAY} mb-4 text-2xl font-bold text-[#0F1B2D]`}>Atouts</h2>
                <div className="flex flex-wrap gap-2">{d.atouts.map((a) => <Tag key={a}>{a}</Tag>)}</div>
              </div>
            </section>

            <footer className="border-t border-[#DCE4F2] pt-6 text-sm">
              © {new Date().getFullYear()} {d.profil.prenom} {d.profil.nom}
            </footer>
          </div>
        </main>
      </div>

      {/* ===== Modales ===== */}
      <AnimatePresence>
        {modal === 'about' && (
          <Modal key="about" onClose={close} label="Qui suis-je ?" wide>
            <div className="md:flex">
              <div className="h-80 bg-[#DCE4F2] md:h-auto md:w-2/5">
                <img src={d.aPropos.photos[0]} alt={d.aPropos.nomComplet} className="h-full w-full object-cover object-top" />
              </div>
              <div className="p-8 md:w-3/5 md:p-12">
                <h2 className={`${DISPLAY} text-3xl font-bold text-[#0F1B2D]`}>{d.aPropos.nomComplet}</h2>
                <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                  {[
                    [<Calendar size={16} />, 'Né le', d.aPropos.naissance],
                    [<MapPin size={16} />, 'À', d.aPropos.lieu],
                    [<MapPin size={16} />, 'Habite à', d.aPropos.reside],
                    [<Globe size={16} />, 'Nationalité', d.aPropos.nationalite],
                  ].map(([ic, k, v]) => (
                    <div key={k} className="flex items-start gap-3">
                      <span className="mt-0.5 text-[#1D4ED8]">{ic}</span>
                      <div><dt>{k}</dt><dd className="font-semibold text-[#0F1B2D]">{v}</dd></div>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-base leading-relaxed">{d.aPropos.bioLongue}</p>
                <div className="mt-6 rounded-lg bg-[#E3EAFB] p-5">
                  <h3 className="font-semibold text-[#0F1B2D]">Ce qui me motive</h3>
                  <p className="mt-1">{d.aPropos.passion}</p>
                </div>
              </div>
            </div>
          </Modal>
        )}

        {modal === 'contact' && (
          <Modal key="contact" onClose={close} label="Me contacter">
            <div className="p-8 md:p-10">
              <h2 className={`${DISPLAY} text-3xl font-bold text-[#0F1B2D]`}>Écrivez-moi</h2>
              <p className="mb-6 mt-2">Stage, alternance, projet : décrivez votre besoin en quelques lignes.</p>
              <ContactForm onDone={close} />
            </div>
          </Modal>
        )}

        {modal?.type === 'exp' && (
          <Modal key="exp" onClose={close} label={modal.item.entreprise} wide={!!modal.item.photo}>
            <div className={modal.item.photo ? 'md:flex' : ''}>
              {modal.item.photo && (
                <div className="h-64 bg-[#DCE4F2] md:h-auto md:w-2/5">
                  <img src={modal.item.photo} alt={modal.item.entreprise} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="p-8 md:p-10">
                <p className="text-sm font-medium text-[#1D4ED8]">{modal.item.periode}</p>
                <h2 className={`${DISPLAY} mt-1 text-3xl font-bold text-[#0F1B2D]`}>{modal.item.entreprise}</h2>
                <p className="mt-1 font-medium text-[#0F1B2D]">{modal.item.poste}</p>
                <p className="mt-5 text-lg leading-relaxed">{modal.item.details}</p>
                <div className="mt-5 flex flex-wrap gap-2">{modal.item.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                {modal.item.document && <div className="mt-6"><DocLink href={modal.item.document}>Voir l'attestation</DocLink></div>}
              </div>
            </div>
          </Modal>
        )}

        {modal?.type === 'form' && (
          <Modal key="form" onClose={close} label={modal.item.diplome} wide={!!modal.item.photo}>
            <div className={modal.item.photo ? 'md:flex' : ''}>
              {modal.item.photo && (
                <div className="h-64 bg-[#DCE4F2] md:h-auto md:w-2/5">
                  <img src={modal.item.photo} alt={`Diplôme : ${modal.item.diplome}`} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="p-8 md:p-10">
                <p className="text-sm font-medium text-[#1D4ED8]">{modal.item.periode}</p>
                <h2 className={`${DISPLAY} mt-1 text-2xl font-bold text-[#0F1B2D]`}>{modal.item.diplome}</h2>
                <p className="mt-1">{modal.item.option}</p>
                <p className="mt-5 text-lg leading-relaxed">{modal.item.details}</p>
                <p className="mt-5 flex items-center gap-2 text-sm"><MapPin size={14} /> {modal.item.etablissement}</p>
                {modal.item.document && <div className="mt-6"><DocLink href={modal.item.document}>Voir le diplôme (PDF)</DocLink></div>}
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
};

export default App;