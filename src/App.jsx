import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion, AnimatePresence, MotionConfig,
  useScroll, useSpring, useTransform, useMotionValue,
} from 'framer-motion';
import {
  Linkedin, Mail, X, Download, Server, Code2, Database, Workflow, PenTool,
  MapPin, Calendar, Globe, Github, HardDrive, ExternalLink, FileText,
  MessageCircle, Facebook, GraduationCap, Phone, ChevronDown, CheckCircle2,
  Quote, Languages, Sparkles, Target, ArrowRight, Briefcase, Award,
} from 'lucide-react';
import { portfolioData as d } from './data/portfolioData';

/* Encre #0F1B2D · Papier #F1F4F8 · Cobalt #1D4ED8 · Ciel #9DB8FF · Ardoise #52607A */
const DISPLAY = "font-['Bricolage_Grotesque',sans-serif]";
const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]';
const EASE = [0.22, 1, 0.36, 1];

const OBJECTIF_TYPES = ['Stage', 'Alternance', 'CDD', 'CDI'];

const IconMap = { Server, Code2, Database, Workflow, PenTool };
const linkIcon = (t) =>
  ({ github: <Github size={15} />, drive: <HardDrive size={15} />, web: <Globe size={15} /> }[t] || <ExternalLink size={15} />);

const NAV = [
  ['top', 'Accueil'],
  ['objectif', 'Objectif actuel'],
  ['parcours', 'Parcours'],
  ['experiences', 'Expériences'],
  ['competences', 'Compétences'],
  ['certifications', 'Certifications'],
  ['projets', 'Projets'],
].filter(([id]) =>
  (id !== 'objectif' || d.objectif?.actif) && (id !== 'certifications' || d.certifications?.length > 0));
const NAV_IDS = NAV.map(([id]) => id);

const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/* ---------- Hooks ---------- */
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -55% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); el && obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
};

/* ---------- Briques animées ---------- */
const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: EASE }} className={className}
  >
    {children}
  </motion.div>
);

const Expand = ({ open, children }) => (
  <AnimatePresence initial={false}>
    {open && (
      <motion.div
        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden"
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const Tilt = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <motion.article
      onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      whileHover={{ y: -4, boxShadow: '0 18px 40px -18px rgba(29,78,216,.45)' }}
      className={className}
    >
      {children}
    </motion.article>
  );
};

const SectionTitle = ({ id, children }) => (
  <Reveal>
    <h2 id={id} className={`${DISPLAY} mb-10 scroll-mt-24 text-3xl font-bold tracking-tight text-[#0F1B2D] md:text-4xl`}>
      {children}
    </h2>
  </Reveal>
);

const Tag = ({ children }) => (
  <motion.span whileHover={{ scale: 1.08, y: -2 }} className="inline-block rounded-md bg-[#E3EAFB] px-2.5 py-1 text-xs font-medium text-[#1D4ED8]">
    {children}
  </motion.span>
);

const DocLink = ({ href, children }) => (
  <motion.a
    href={href} target="_blank" rel="noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
    className={`inline-flex items-center gap-2 rounded-lg bg-[#1D4ED8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1A43B8] ${FOCUS}`}
  >
    <FileText size={16} /> {children}
  </motion.a>
);

const Photo = ({ src, alt }) => (
  <img src={src} alt={alt} onError={(e) => { e.currentTarget.style.display = 'none'; }}
       className="h-44 w-full rounded-lg bg-[#DCE4F2] object-cover md:h-full md:w-48" />
);

/* ---------- Menu ---------- */
const MenuButton = ({ open, onClick }) => (
  <motion.button
    onClick={onClick} aria-expanded={open} aria-controls="menu-panel" whileTap={{ scale: 0.94 }}
    animate={{ backgroundColor: open ? '#FFFFFF' : '#0F1B2D', color: open ? '#0F1B2D' : '#FFFFFF' }}
    className={`fixed right-4 top-4 z-[60] flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold shadow-lg md:right-6 md:top-6 ${FOCUS}`}
  >
    <span className="relative block h-4 w-5" aria-hidden="true">
      <motion.span className="absolute left-0 top-0 h-0.5 w-5 rounded bg-current" animate={{ y: open ? 7 : 0, rotate: open ? 45 : 0 }} />
      <motion.span className="absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current" animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }} />
      <motion.span className="absolute left-0 top-[14px] h-0.5 w-5 rounded bg-current" animate={{ y: open ? -7 : 0, rotate: open ? -45 : 0 }} />
    </span>
    {open ? 'Fermer' : 'Menu'}
  </motion.button>
);

const MenuPanel = ({ active, onNavigate, onContact, socials }) => (
  <motion.div
    id="menu-panel" role="dialog" aria-modal="true" aria-label="Menu"
    initial={{ clipPath: 'circle(0px at calc(100% - 60px) 44px)' }}
    animate={{ clipPath: 'circle(150% at calc(100% - 60px) 44px)' }}
    exit={{ clipPath: 'circle(0px at calc(100% - 60px) 44px)' }}
    transition={{ duration: 0.65, ease: EASE }}
    className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[#0F1B2D] px-6 pb-8 pt-28 text-white md:px-16"
  >
    <nav aria-label="Sections">
      <ul className="space-y-1">
        {NAV.map(([id, text], i) => (
          <motion.li
            key={id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.07, duration: 0.5, ease: EASE }}
          >
            <button
              onClick={() => onNavigate(id)}
              className={`${DISPLAY} group flex items-center gap-4 py-1.5 text-left text-4xl font-bold transition-colors md:text-6xl ${
                active === id ? 'text-[#9DB8FF]' : 'text-white hover:text-[#9DB8FF]'
              } ${FOCUS}`}
            >
              <motion.span
                aria-hidden="true" className="block h-2.5 rounded-full bg-[#9DB8FF]"
                animate={{ width: active === id ? 40 : 0 }} transition={{ duration: 0.4, ease: EASE }}
              />
              <span className="transition-transform duration-300 group-hover:translate-x-2">{text}</span>
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>

    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
      className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
    >
      <div className="space-y-2 text-sm text-slate-300">
        <p className="flex items-center gap-2"><Mail size={15} className="text-[#9DB8FF]" /> {d.contact.email}</p>
        <p className="flex items-center gap-2"><MapPin size={15} className="text-[#9DB8FF]" /> {d.contact.localisation}</p>
        <div className="flex gap-2 pt-2">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
               className={`rounded-lg border border-white/15 p-2.5 transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0F1B2D] ${FOCUS}`}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <button onClick={onContact}
        className={`rounded-lg bg-white px-6 py-3.5 font-semibold text-[#0F1B2D] transition hover:bg-[#E3EAFB] ${FOCUS}`}>
        Me contacter
      </button>
    </motion.div>
  </motion.div>
);

/* ---------- Modale ---------- */
const Modal = ({ onClose, label, wide, children }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70]"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Fond défilant */}
      <div
        className="absolute inset-0 flex overflow-y-auto bg-[#0F1B2D]/70 p-4 backdrop-blur-sm md:px-8 md:py-6"
        onClick={onClose}
      >
        <motion.div
          role="dialog" aria-modal="true" aria-label={label} onClick={(e) => e.stopPropagation()}
          initial={{ y: 40, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease: EASE }}
          className={`relative m-auto w-full overflow-hidden rounded-2xl bg-white text-[#1C2D47] shadow-2xl ${wide ? 'max-w-5xl' : 'max-w-2xl'}`}
        >
          {children}
        </motion.div>
      </div>

      {/* Bouton fermer : toujours visible, hors de la zone qui défile */}
      <button
        onClick={onClose} aria-label="Fermer"
        className={`absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0F1B2D] bg-white text-[#0F1B2D] shadow-xl transition hover:rotate-90 hover:bg-[#E3EAFB] md:right-6 md:top-6 ${FOCUS}`}
      >
        <X size={24} />
      </button>
    </motion.div>
  );
};

/* ---------- Schéma du hero (cliquable) ---------- */
const Topology = () => {
  const nodes = [
    { x: 95, t: 'Développement', s: 'React · Laravel', target: 'competences', main: false },
    { x: 260, t: 'MIAGE', s: "Systèmes d'information", target: 'parcours', main: true },
    { x: 425, t: 'Data · DABI', s: 'SQL · Python', target: 'projets', main: false },
  ];
  return (
    <svg viewBox="0 0 520 220" role="group" aria-label="Schéma interactif : développement, MIAGE et data" className="w-full max-w-xl">
      {[[163, 192], [328, 357]].map(([a, b], i) => (
        <motion.path
          key={i} d={`M${a} 110 H${b}`} stroke="#9DB8FF" strokeWidth="2" strokeDasharray="5 6" fill="none"
          animate={{ strokeDashoffset: [0, -22] }} transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.g
          key={n.t} role="button" tabIndex={0} aria-label={`Aller à la section ${n.target}`}
          onClick={() => goTo(n.target)} onKeyDown={(e) => e.key === 'Enter' && goTo(n.target)}
          style={{ transformBox: 'fill-box', transformOrigin: 'center', cursor: 'pointer', outline: 'none' }}
          initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 + i * 0.15, duration: 0.6, ease: EASE }}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }} whileFocus={{ scale: 1.08 }}
        >
          {n.main && (
            <motion.rect
              x={n.x - 68} y={70} width="136" height="80" rx="14" fill="none" stroke="#1D4ED8" strokeWidth="2"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              animate={{ scale: [1, 1.25], opacity: [0.6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
            />
          )}
          <rect x={n.x - 68} y={70} width="136" height="80" rx="14" fill={n.main ? '#1D4ED8' : '#fff'} stroke="#C9D5EE" />
          <text x={n.x} y={106} textAnchor="middle" fontSize="17" fontWeight="700" fill={n.main ? '#fff' : '#0F1B2D'} fontFamily="Bricolage Grotesque, sans-serif">{n.t}</text>
          <text x={n.x} y={128} textAnchor="middle" fontSize="11" fill={n.main ? '#DCE6FF' : '#52607A'}>{n.s}</text>
        </motion.g>
      ))}
    </svg>
  );
};

/* ---------- Formulaire ---------- */
const ContactForm = ({ onDone }) => {
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      if (!res.ok) return setStatus('error');
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(onDone, 2000);
    } catch { setStatus('error'); }
  };

  const field = 'w-full rounded-lg border border-[#C9D5EE] bg-white px-4 py-3 text-[#0F1B2D] outline-none transition focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20';
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
      <motion.button
        type="submit" disabled={status === 'loading'} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
        className={`w-full rounded-lg bg-[#1D4ED8] px-6 py-3.5 font-semibold text-white hover:bg-[#1A43B8] disabled:opacity-60 ${FOCUS}`}
      >
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer le message'}
      </motion.button>
      <p aria-live="polite" className="min-h-5 text-center text-sm">
        {status === 'success' && <span className="text-green-700">Message envoyé. Je vous réponds rapidement.</span>}
        {status === 'error' && <span className="text-red-700">L'envoi a échoué. Réessayez ou écrivez-moi à {d.contact.email}.</span>}
      </p>
    </form>
  );
};

/* ---------- Bloc dépliable (parcours + expériences) ---------- */
const Accordion = ({ open, onToggle, header, children, expandable = true }) => (
  <div className={`rounded-xl border bg-white transition-colors ${open ? 'border-[#1D4ED8]' : 'border-[#DCE4F2] hover:border-[#9DB8FF]'}`}>
    <button
      onClick={expandable ? onToggle : undefined} aria-expanded={expandable ? open : undefined}
      disabled={!expandable}
      className={`flex w-full items-center justify-between gap-4 rounded-xl p-5 text-left md:p-6 ${expandable ? 'cursor-pointer' : 'cursor-default'} ${FOCUS}`}
    >
      <span>{header}</span>
      {expandable && (
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.35, ease: EASE }} className="shrink-0 text-[#1D4ED8]">
          <ChevronDown />
        </motion.span>
      )}
    </button>
    <Expand open={open}><div className="px-5 pb-6 md:px-6">{children}</div></Expand>
  </div>
);

/* ---------- Contenu de « Qui suis-je ? » ---------- */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
const rise = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };

const AboutContent = ({ onContact, socials }) => {
  const [imgOk, setImgOk] = useState(true);
  const a = d.aPropos;
  const initials = `${d.profil.prenom[0]}${d.profil.nom[0]}`;
  const facts = [
    [<Calendar size={16} />, 'Né le', a.naissance],
    [<MapPin size={16} />, 'Originaire de', a.lieu],
    [<MapPin size={16} />, 'Habite à', a.reside],
    [<Globe size={16} />, 'Nationalité', a.nationalite],
  ];

  return (
    <div className="md:flex">
      {/* Colonne portrait */}
      <div className="flex flex-col items-center bg-[#0F1B2D] p-8 pt-12 text-center text-white md:w-[38%] md:p-10 md:pt-14">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: EASE }}
          className="relative"
        >
          <motion.span
            aria-hidden="true" className="absolute -inset-2 rounded-full border border-[#9DB8FF]"
            animate={{ scale: [1, 1.12], opacity: [0.7, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
          />
          <div className="h-44 w-44 overflow-hidden rounded-full border-4 border-[#1D4ED8] bg-[#1C2D47] md:h-52 md:w-52">
            {imgOk ? (
              <img src={a.photos[0]} alt={a.nomComplet} onError={() => setImgOk(false)} className="h-full w-full object-cover object-top" />
            ) : (
              <div className={`${DISPLAY} flex h-full w-full items-center justify-center text-6xl font-bold text-[#9DB8FF]`}>{initials}</div>
            )}
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="mt-8 flex flex-col items-center">
          <motion.h3 variants={rise} className={`${DISPLAY} text-2xl font-bold`}>{d.profil.prenom} {d.profil.nom}</motion.h3>
          <motion.p variants={rise} className="mt-1 text-sm text-[#9DB8FF]">{d.profil.titre}</motion.p>
          <motion.p variants={rise} className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">
            <GraduationCap size={14} /> {d.profil.statut}
          </motion.p>
          <motion.div variants={rise} className="mt-6 flex gap-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                 className={`rounded-lg border border-white/15 p-2.5 transition hover:-translate-y-1 hover:bg-white hover:text-[#0F1B2D] ${FOCUS}`}>
                {s.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Colonne contenu */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="p-8 md:w-[62%] md:p-10">
        <motion.div variants={rise} className="pr-10">
          <h2 className={`${DISPLAY} text-3xl font-bold text-[#0F1B2D]`}>Qui suis-je ?</h2>
          <p className="mt-1 text-sm font-medium text-[#1C2D47]">{a.nomComplet}</p>
        </motion.div>

        <motion.p variants={rise} className="mt-5 text-base leading-relaxed text-[#0F1B2D]">{a.bioLongue}</motion.p>

        <motion.dl variants={rise} className="mt-6 grid gap-3 sm:grid-cols-2">
          {facts.map(([ic, k, v]) => (
            <motion.div key={k} whileHover={{ y: -3 }} className="flex items-center gap-3 rounded-lg bg-[#F1F4F8] p-3.5">
              <span className="rounded-md bg-white p-2 text-[#1D4ED8]">{ic}</span>
              <div><dt className="text-xs text-[#52607A]">{k}</dt><dd className="font-semibold text-[#0F1B2D]">{v}</dd></div>
            </motion.div>
          ))}
        </motion.dl>

        <motion.blockquote variants={rise} className="relative mt-6 rounded-lg border-l-4 border-[#1D4ED8] bg-[#E3EAFB] p-5 pl-6">
          <Quote size={18} className="mb-2 text-[#1D4ED8]" aria-hidden="true" />
          <p className="font-semibold text-[#0F1B2D]">Ce qui me motive</p>
          <p className="mt-1 text-[#0F1B2D]">{a.passion}</p>
        </motion.blockquote>

        <motion.div variants={rise} className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F1B2D]"><Languages size={16} className="text-[#1D4ED8]" /> Langues</p>
            <div className="flex flex-wrap gap-2">
              {d.langues.map((l) => <Tag key={l.nom}>{l.nom} · {l.niveau}</Tag>)}
            </div>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F1B2D]"><Sparkles size={16} className="text-[#1D4ED8]" /> Atouts</p>
            <div className="flex flex-wrap gap-2">{d.atouts.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          </div>
        </motion.div>

        <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3">
          <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={d.profil.cvLink} download="CV_Marsouk_Biaou.pdf"
            className={`inline-flex items-center gap-2 rounded-lg bg-[#1D4ED8] px-5 py-3 font-semibold text-white hover:bg-[#1A43B8] ${FOCUS}`}>
            <Download size={18} /> Télécharger mon CV
          </motion.a>
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={onContact}
            className={`rounded-lg border border-[#C9D5EE] px-5 py-3 font-semibold text-[#0F1B2D] hover:border-[#1D4ED8] ${FOCUS}`}>
            Me contacter
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ---------- Objectif actuel ---------- */
const ObjectiveBadge = () => (
  <span className="inline-flex items-center gap-2 rounded-full bg-[#E3EAFB] px-3.5 py-1.5 text-sm font-semibold text-[#1D4ED8]">
    <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75 motion-safe:animate-ping" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
    </span>
    {d.objectif.statut} · {d.objectif.types.join(' / ')}
  </span>
);

const ObjectiveDetails = () => {
  const o = d.objectif;
  const rows = [
    [<Calendar size={16} />, 'Disponibilité', o.disponibilite],
    [<Briefcase size={16} />, 'Rythme', o.rythme],
    [<MapPin size={16} />, 'Lieu', o.lieu],
  ].filter(([, , v]) => v);
  return (
    <>
      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        {rows.map(([ic, k, v]) => (
          <div key={k} className="rounded-lg bg-[#F1F4F8] p-3.5">
            <dt className="flex items-center gap-1.5 text-xs text-[#52607A]">{ic} {k}</dt>
            <dd className="mt-1 font-semibold text-[#0F1B2D]">{v}</dd>
          </div>
        ))}
      </dl>
      {o.domaines?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">{o.domaines.map((x) => <Tag key={x}>{x}</Tag>)}</div>
      )}
    </>
  );
};

const Welcome = ({ onContinue, onContact }) => {
  const o = d.objectif;
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onContinue();
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onContinue]);

  return (
    <motion.div
      role="dialog" aria-modal="true" aria-labelledby="welcome-title"
      className="fixed inset-0 z-[100] flex overflow-y-auto bg-[radial-gradient(circle_at_20%_15%,#1C2D47,#0F1B2D_65%)] p-4 md:p-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -30, opacity: 0, scale: 0.97 }} transition={{ duration: 0.6, ease: EASE }}
        className="m-auto w-full max-w-2xl rounded-2xl bg-white p-7 text-[#1C2D47] shadow-2xl md:p-10"
      >
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p variants={rise} className="flex items-center gap-2 text-sm font-medium text-[#1D4ED8]">
            <Sparkles size={16} /> Bienvenue sur mon portfolio
          </motion.p>
          <motion.h2 variants={rise} id="welcome-title" className={`${DISPLAY} mt-2 text-3xl font-bold leading-tight text-[#0F1B2D] md:text-4xl`}>
            Je suis {d.profil.prenom} {d.profil.nom}
          </motion.h2>
          <motion.p variants={rise} className="mt-1 text-[#52607A]">{d.profil.titre}</motion.p>

          <motion.div variants={rise} className="mt-7 rounded-xl border border-[#C9D5EE] p-5 md:p-6">
            <ObjectiveBadge />
            <h2 className={`${DISPLAY} mt-4 text-2xl font-bold text-[#0F1B2D]`}>{o.intitule}</h2>
            <p className="mt-2 leading-relaxed text-[#0F1B2D]">{o.details}</p>
            <ObjectiveDetails />
            {o.misAJour && <p className="mt-4 text-xs text-[#52607A]">Mis à jour : {o.misAJour}</p>}
          </motion.div>

          <motion.div variants={rise} className="mt-7 flex flex-wrap gap-3">
            <motion.button
              autoFocus onClick={onContinue} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2 rounded-lg bg-[#1D4ED8] px-6 py-3.5 font-semibold text-white hover:bg-[#1A43B8] ${FOCUS}`}
            >
              Continuer <ArrowRight size={18} />
            </motion.button>
            <motion.button
              onClick={onContact} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              className={`rounded-lg border border-[#C9D5EE] px-6 py-3.5 font-semibold text-[#0F1B2D] hover:border-[#1D4ED8] ${FOCUS}`}
            >
              Me contacter
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ---------- App ---------- */
const App = () => {
  const [welcome, setWelcome] = useState(!!d.objectif?.actif);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null); // 'about' | 'contact'
  const [openForm, setOpenForm] = useState('miage');
  const [openExp, setOpenExp] = useState(null);
  const [tab, setTab] = useState(0);

  const closeModal = useCallback(() => setModal(null), []);
  const closeWelcome = useCallback(() => setWelcome(false), []);
  const active = useActiveSection(NAV_IDS);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const lineRef = useRef(null);
  const { scrollYProgress: lineProg } = useScroll({ target: lineRef, offset: ['start 75%', 'end 60%'] });

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  const navigate = (id) => { setMenuOpen(false); setTimeout(() => goTo(id), 350); };

  const socials = [
    { href: d.contact.linkedin, label: 'LinkedIn', icon: <Linkedin size={18} /> },
    { href: d.contact.whatsapp, label: 'WhatsApp', icon: <MessageCircle size={18} /> },
    { href: d.contact.facebook, label: 'Facebook', icon: <Facebook size={18} /> },
  ];

  const words = d.profil.accroche.split(' ');
  const skill = d.competences[tab];
  const SkillIcon = IconMap[skill.icon] || Code2;

  return (
    <MotionConfig reducedMotion="user">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap" />

      <motion.div style={{ scaleX: progress }} className="fixed left-0 right-0 top-0 z-[80] h-1 origin-left bg-[#1D4ED8]" />

      <MenuButton open={menuOpen} onClick={() => setMenuOpen((o) => !o)} />
      <AnimatePresence>
        {menuOpen && (
          <MenuPanel
            active={active} onNavigate={navigate} socials={socials}
            onContact={() => { setMenuOpen(false); setModal('contact'); }}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#F1F4F8] font-['IBM_Plex_Sans',sans-serif] text-[#52607A] lg:grid lg:grid-cols-[340px_1fr]">
        {/* Colonne identité */}
        <aside className="bg-[#0F1B2D] px-6 pb-8 pt-8 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:px-10 lg:py-12">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <p className={`${DISPLAY} text-3xl font-bold leading-tight`}>{d.profil.prenom}<br />{d.profil.nom}</p>
            <p className="mt-3 max-w-[16rem] text-sm text-[#9DB8FF]">{d.profil.titre}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
            className="mt-8 space-y-5 lg:mt-0"
          >
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><MapPin size={15} className="text-[#9DB8FF]" /> {d.contact.localisation}</li>
              <li className="flex items-center gap-2"><Mail size={15} className="text-[#9DB8FF]" /> {d.contact.email}</li>
              <li className="flex items-center gap-2"><Phone size={15} className="text-[#9DB8FF]" /> {d.contact.telephone}</li>
            </ul>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                   className={`rounded-lg border border-white/15 p-2.5 transition hover:-translate-y-1 hover:bg-white hover:text-[#0F1B2D] ${FOCUS}`}>
                  {s.icon}
                </a>
              ))}
            </div>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => setModal('contact')}
              className={`w-full rounded-lg bg-white px-4 py-3 font-semibold text-[#0F1B2D] hover:bg-[#E3EAFB] ${FOCUS}`}>
              Me contacter
            </motion.button>
          </motion.div>
        </aside>

        {/* Contenu */}
        <main className="px-6 py-14 md:px-12 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-3xl">
            {/* Hero */}
            <section id="top" className="scroll-mt-24 pb-24">
              <motion.p
                initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
                className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-[#1D4ED8] shadow-sm"
              >
                <GraduationCap size={16} /> {d.profil.statut}
              </motion.p>
              {d.objectif.actif && (
                <motion.button
                  initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
                  whileHover={{ y: -2 }} onClick={() => goTo('objectif')}
                  className={`mb-5 ml-0 mr-2 inline-flex items-center gap-2 rounded-full bg-[#0F1B2D] px-4 py-1.5 text-sm font-medium text-white shadow-sm sm:ml-2 ${FOCUS}`}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <motion.span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400" animate={{ scale: [1, 2.2], opacity: [0.7, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  {d.objectif.statut} : {d.objectif.types.join(' / ')}
                </motion.button>
              )}
              <h1 className={`${DISPLAY} text-4xl font-bold leading-[1.15] tracking-tight text-[#0F1B2D] md:text-6xl`}>
                {words.map((w, i) => (
                  <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom">
                    <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: EASE }}>
                      {w}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
                className="mt-6 max-w-2xl text-lg leading-relaxed"
              >
                {d.profil.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => setModal('about')}
                  className={`rounded-lg bg-[#0F1B2D] px-5 py-3 font-semibold text-white hover:bg-[#1C2D47] ${FOCUS}`}>
                  Qui suis-je ?
                </motion.button>
                <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={d.profil.cvLink} download="CV_Marsouk_Biaou.pdf"
                  className={`inline-flex items-center gap-2 rounded-lg border border-[#C9D5EE] bg-white px-5 py-3 font-semibold text-[#0F1B2D] hover:border-[#1D4ED8] ${FOCUS}`}>
                  <Download size={18} /> Télécharger mon CV
                </motion.a>
              </motion.div>
              <div className="mt-12"><Topology /></div>
            </section>

            {/* Objectif actuel */}
            {d.objectif.actif && (
              <section className="pb-24">
                <SectionTitle id="objectif">Objectif actuel</SectionTitle>
                <Reveal>
                  <div className="relative overflow-hidden rounded-2xl bg-[#0F1B2D] p-6 text-white md:p-10">
                    <motion.div
                      aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1D4ED8]/40 blur-3xl"
                      animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                    />
                    <div className="relative">
                      <p className="inline-flex items-center gap-2 text-sm font-medium text-[#9DB8FF]">
                        <span className="relative flex h-2.5 w-2.5">
                          <motion.span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400" animate={{ scale: [1, 2.4], opacity: [0.7, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        </span>
                        <Target size={16} /> {d.objectif.statut}
                      </p>
                      <h3 className={`${DISPLAY} mt-3 text-2xl font-bold leading-tight md:text-4xl`}>{d.objectif.intitule}</h3>

                      <div className="mt-5 flex flex-wrap gap-2" aria-label="Types de contrat recherchés">
                        {OBJECTIF_TYPES.map((t) => {
                          const on = d.objectif.types.includes(t);
                          return (
                            <motion.span
                              key={t} whileHover={{ y: -2 }}
                              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${on ? 'bg-white text-[#0F1B2D]' : 'border border-white/20 text-slate-400'}`}
                            >
                              {on && <CheckCircle2 size={14} className="mr-1.5 inline text-[#1D4ED8]" aria-hidden="true" />}
                              {t}
                            </motion.span>
                          );
                        })}
                      </div>

                      <p className="mt-5 max-w-2xl leading-relaxed text-slate-200">{d.objectif.details}</p>

                      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                        {[
                          [<Calendar size={16} />, 'Disponibilité', d.objectif.disponibilite],
                          [<Briefcase size={16} />, 'Rythme', d.objectif.rythme],
                          [<MapPin size={16} />, 'Lieu', d.objectif.lieu],
                        ].filter(([, , v]) => v).map(([ic, k, v]) => (
                          <motion.div key={k} whileHover={{ y: -3 }} className="rounded-lg bg-white/10 p-4">
                            <dt className="flex items-center gap-2 text-xs text-[#9DB8FF]">{ic} {k}</dt>
                            <dd className="mt-1 font-semibold text-white">{v}</dd>
                          </motion.div>
                        ))}
                      </dl>

                      {d.objectif.domaines?.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {d.objectif.domaines.map((x) => (
                            <span key={x} className="rounded-md bg-[#1D4ED8]/40 px-2.5 py-1 text-xs font-medium text-[#DCE6FF]">{x}</span>
                          ))}
                        </div>
                      )}

                      <div className="mt-8 flex flex-wrap gap-3">
                        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => setModal('contact')}
                          className={`rounded-lg bg-white px-5 py-3 font-semibold text-[#0F1B2D] hover:bg-[#E3EAFB] ${FOCUS}`}>
                          Me proposer une opportunité
                        </motion.button>
                        <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={d.profil.cvLink} download="CV_Marsouk_Biaou.pdf"
                          className={`inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 font-semibold text-white hover:bg-white/10 ${FOCUS}`}>
                          <Download size={18} /> Télécharger mon CV
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>
            )}

            {/* Parcours */}
            <section className="pb-24">
              <SectionTitle id="parcours">Parcours</SectionTitle>
              <div ref={lineRef} className="relative pl-9">
                <div className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-[#C9D5EE]" />
                <motion.div style={{ scaleY: lineProg }} className="absolute bottom-2 left-[7px] top-2 w-0.5 origin-top bg-[#1D4ED8]" />
                <div className="space-y-5">
                  {d.formations.map((f, i) => {
                    const expandable = !!(f.details || f.document);
                    return (
                      <Reveal key={f.id} delay={i * 0.05} className="relative">
                        <motion.span
                          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                          className={`absolute -left-9 top-7 h-4 w-4 rounded-full border-4 border-[#F1F4F8] ${f.enCours ? 'bg-[#1D4ED8]' : 'bg-[#9DB8FF]'}`}
                        />
                        <Accordion
                          open={openForm === f.id} expandable={expandable}
                          onToggle={() => setOpenForm(openForm === f.id ? null : f.id)}
                          header={
                            <>
                              <span className="flex items-center gap-2 text-sm font-medium text-[#1D4ED8]">
                                {f.periode}
                                {f.enCours && <span className="rounded-full bg-[#1D4ED8] px-2 py-0.5 text-xs text-white">En cours</span>}
                              </span>
                              <span className={`${DISPLAY} mt-1 block text-xl font-bold text-[#0F1B2D]`}>{f.diplome}</span>
                              <span className="mt-0.5 block text-sm">{f.option}</span>
                            </>
                          }
                        >
                          <div className="md:flex md:gap-6">
                            {f.photo && <Photo src={f.photo} alt={`Diplôme : ${f.diplome}`} />}
                            <div>
                              {f.details && <p className="leading-relaxed">{f.details}</p>}
                              <p className="mt-3 flex items-center gap-1.5 text-sm"><MapPin size={14} /> {f.etablissement}</p>
                              {f.document && <div className="mt-4"><DocLink href={f.document}>Voir le diplôme</DocLink></div>}
                            </div>
                          </div>
                        </Accordion>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Expériences */}
            <section className="pb-24">
              <SectionTitle id="experiences">Expériences</SectionTitle>
              <div className="space-y-4">
                {d.experiences.map((e, i) => (
                  <Reveal key={e.id} delay={i * 0.08}>
                    <Accordion
                      open={openExp === e.id} onToggle={() => setOpenExp(openExp === e.id ? null : e.id)}
                      header={
                        <>
                          <span className="text-sm font-medium text-[#1D4ED8]">{e.periode}</span>
                          <span className={`${DISPLAY} mt-1 block text-xl font-bold text-[#0F1B2D]`}>{e.entreprise}</span>
                          <span className="mt-0.5 block text-sm">{e.poste}</span>
                        </>
                      }
                    >
                      <div className="md:flex md:gap-6">
                        {e.photo && <Photo src={e.photo} alt={e.entreprise} />}
                        <div>
                          <p className="leading-relaxed">{e.details}</p>
                          <div className="mt-4 flex flex-wrap gap-2">{e.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                          {e.document && <div className="mt-5"><DocLink href={e.document}>Voir l'attestation</DocLink></div>}
                        </div>
                      </div>
                    </Accordion>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Compétences : onglets */}
            <section className="pb-24">
              <SectionTitle id="competences">Compétences</SectionTitle>
              <Reveal>
                <div role="tablist" aria-label="Domaines de compétences" className="mb-6 flex flex-wrap gap-2">
                  {d.competences.map((c, i) => (
                    <button
                      key={c.titre} role="tab" aria-selected={tab === i} onClick={() => setTab(i)}
                      className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        tab === i ? 'text-white' : 'bg-white text-[#0F1B2D] hover:bg-[#E3EAFB]'
                      } ${FOCUS}`}
                    >
                      {tab === i && (
                        <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-[#1D4ED8]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                      )}
                      <span className="relative">{c.titre}</span>
                    </button>
                  ))}
                </div>
                <div className="min-h-[15rem] rounded-xl border border-[#DCE4F2] bg-white p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab} role="tabpanel"
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <h3 className={`${DISPLAY} mb-5 flex items-center gap-3 text-2xl font-bold text-[#0F1B2D]`}>
                        <SkillIcon className="text-[#1D4ED8]" /> {skill.titre}
                      </h3>
                      <ul className="space-y-3">
                        {skill.items.map((it, j) => (
                          <motion.li
                            key={it} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + j * 0.07, duration: 0.4, ease: EASE }}
                            whileHover={{ x: 6 }}
                            className="flex items-center gap-3 text-lg"
                          >
                            <CheckCircle2 size={18} className="shrink-0 text-[#1D4ED8]" /> {it}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Reveal>
            </section>

            {/* Certifications */}
            {d.certifications?.length > 0 && (
              <section className="pb-24">
                <SectionTitle id="certifications">Certifications</SectionTitle>
                <div className="grid gap-4 sm:grid-cols-2">
                  {d.certifications.map((c, i) => (
                    <Reveal key={c.intitule} delay={i * 0.08}>
                      <motion.div
                        whileHover={{ y: -4, boxShadow: '0 18px 40px -18px rgba(29,78,216,.45)' }}
                        className="flex h-full flex-col rounded-xl border border-[#DCE4F2] bg-white p-6"
                      >
                        <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#E3EAFB] text-[#1D4ED8]">
                          <Award size={22} />
                        </span>
                        <h3 className={`${DISPLAY} text-lg font-bold text-[#0F1B2D]`}>{c.intitule}</h3>
                        <p className="mt-1 text-sm">{[c.organisme, c.date].filter(Boolean).join(' · ')}</p>
                        {c.document && (
                          <a href={c.document} target="_blank" rel="noreferrer"
                             className={`mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-[#1D4ED8] hover:underline ${FOCUS}`}>
                            <FileText size={15} /> Voir le certificat
                          </a>
                        )}
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {/* Projets */}
            <section className="pb-24">
              <SectionTitle id="projets">Projets</SectionTitle>
              <div className="space-y-6">
                {d.projets.map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.1}>
                    <Tilt className="rounded-xl border border-[#DCE4F2] bg-white p-6 md:p-8">
                      <h3 className={`${DISPLAY} text-xl font-bold text-[#0F1B2D]`}>{p.titre}</h3>
                      <p className="mt-2 leading-relaxed">{p.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">{p.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        {p.liens.filter((l) => !l.url.includes('...')).map((l) => (
                          <motion.a key={l.nom} href={l.url} target="_blank" rel="noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}
                            className={`inline-flex items-center gap-2 rounded-lg border border-[#C9D5EE] px-4 py-2 text-sm font-semibold text-[#0F1B2D] hover:border-[#1D4ED8] hover:text-[#1D4ED8] ${FOCUS}`}>
                            {linkIcon(l.type)} {l.nom}
                          </motion.a>
                        ))}
                      </div>
                    </Tilt>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Langues + atouts */}
            <section className="grid gap-12 pb-16 sm:grid-cols-2">
              <Reveal>
                <h2 className={`${DISPLAY} mb-4 text-2xl font-bold text-[#0F1B2D]`}>Langues</h2>
                <ul className="space-y-2">
                  {d.langues.map((l) => (
                    <li key={l.nom} className="flex justify-between border-b border-[#DCE4F2] pb-2">
                      <span className="font-medium text-[#0F1B2D]">{l.nom}</span><span>{l.niveau}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className={`${DISPLAY} mb-4 text-2xl font-bold text-[#0F1B2D]`}>Atouts</h2>
                <div className="flex flex-wrap gap-2">{d.atouts.map((a) => <Tag key={a}>{a}</Tag>)}</div>
              </Reveal>
            </section>

            <footer className="border-t border-[#DCE4F2] pt-6 text-sm">
              © {new Date().getFullYear()} {d.profil.prenom} {d.profil.nom}
            </footer>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {welcome && (
          <Welcome key="welcome" onContinue={closeWelcome} onContact={() => { setWelcome(false); setModal('contact'); }} />
        )}
      </AnimatePresence>

      {/* Modales */}
      <AnimatePresence>
        {modal === 'about' && (
          <Modal key="about" onClose={closeModal} label="Qui suis-je ?" wide>
            <AboutContent socials={socials} onContact={() => setModal('contact')} />
          </Modal>
        )}
        {modal === 'contact' && (
          <Modal key="contact" onClose={closeModal} label="Me contacter">
            <div className="p-8 md:p-10">
              <h2 className={`${DISPLAY} text-3xl font-bold text-[#0F1B2D]`}>Écrivez-moi</h2>
              <p className="mb-6 mt-2">Stage, alternance, projet : décrivez votre besoin en quelques lignes.</p>
              <ContactForm onDone={closeModal} />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
};

export default App;