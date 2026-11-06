import { Link, NavLink } from "react-router-dom";
import { useState, type ReactNode } from "react";
import { Menu, X, Globe, ArrowUpRight } from "lucide-react";
import { useI18n, LOCALES, type Locale } from "@/i18n";

export const NAV = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/services", key: "services" },
  { to: "/divisions", key: "divisions" },
  { to: "/projects", key: "projects" },
  { to: "/store", key: "store" },
] as const;

/** Provisional wordmark. Replace the slot with the real logo file when available. */
export function Wordmark() {
  const { t } = useI18n();
  return (
    <span className="flex items-center gap-3">
      <span aria-label={t.common.logoSlot} className="grid h-9 w-9 place-items-center border border-primary/60 cut-corner bg-card">
        <span className="h-3 w-3 rotate-45 bg-primary" />
      </span>
      <span className="font-display text-sm font-extrabold leading-none tracking-[0.18em]">
        PROJECT<br /><span className="text-primary">ART IMPACT</span>
      </span>
    </span>
  );
}

function LanguageSelect() {
  const { locale, setLocale, t } = useI18n();
  return (
    <label className="relative flex items-center gap-2 text-sm text-muted-foreground">
      <Globe className="h-4 w-4" aria-hidden />
      <span className="sr-only">{t.nav.language}</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="h-10 cursor-pointer appearance-none border border-input bg-card px-3 pr-6 text-foreground"
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code} lang={l.code}>{l.label}</option>
        ))}
      </select>
    </label>
  );
}

const linkCls = "relative py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:after:absolute data-[status=active]:after:inset-x-0 data-[status=active]:after:-bottom-0.5 data-[status=active]:after:h-0.5 data-[status=active]:after:bg-primary";

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 bg-primary px-3 py-2">{t.nav.skip}</a>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" aria-label="Project Art Impact"><Wordmark /></Link>
        <nav aria-label={t.nav.primary} className="hidden items-center gap-6 xl:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({isActive}) => `${linkCls} ${isActive ? "text-foreground border-b-2 border-primary" : ""}`} >{t.nav[n.key]}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSelect />
          <Link to="/contact" className="btn-primary">{t.nav.cta}</Link>
        </div>
        <button className="grid h-11 w-11 place-items-center border xl:hidden" aria-label={open ? t.nav.close : t.nav.menu} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-background px-5 pb-6 xl:hidden">
          <nav aria-label={t.nav.primary} className="flex flex-col">
            {[...NAV, { to: "/contact", key: "contact" } as const].map((n) => (
              <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)} 
                className="border-b py-4 font-display text-lg font-bold data-[status=active]:text-primary">{t.nav[n.key]}</Link>
            ))}
          </nav>
          <div className="mt-5"><LanguageSelect /></div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative mt-24 overflow-hidden border-t bg-card slash-bg">
      <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2">
        <div>
          <Wordmark />
          <p className="mt-5 font-tech-label text-muted-foreground">{t.footer.tagline}</p>
          <p className="mt-3 font-display text-2xl font-bold">{t.footer.philosophy}</p>
        </div>
        <div>
          <p className="font-tech-label text-primary">{t.footer.explore}</p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {[...NAV, { to: "/contact", key: "contact" } as const].map((n) => (
              <li key={n.to}><Link to={n.to} className="inline-block py-1 text-muted-foreground hover:text-foreground">{t.nav[n.key]}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t px-5 py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Project Art Impact. {t.footer.rights}</div>
    </footer>
  );
}

/** Abstract fragmented impact art — shards radiating from a strike point. Not a dragon. */
export function ImpactArt({ className = "" }: { className?: string }) {
  const shards = [
    "M300 300 L520 120 L470 260Z", "M300 300 L560 330 L430 380Z", "M300 300 L420 540 L330 450Z",
    "M300 300 L120 520 L210 380Z", "M300 300 L60 250 L190 230Z", "M300 300 L230 60 L300 180Z",
    "M300 300 L400 40 L360 200Z",
  ];
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden>
      <g stroke="currentColor" className="text-foreground/20" strokeWidth="1" fill="none">
        {[80, 160, 240].map((r) => <circle key={r} cx="300" cy="300" r={r} strokeDasharray="2 10" />)}
      </g>
      {shards.map((d, i) => (
        <path key={i} d={d} className={`animate-shard ${i % 3 === 0 ? "fill-primary" : i % 3 === 1 ? "fill-card stroke-foreground/30" : "fill-primary/40"}`}
          style={{ animationDelay: `${i * 70}ms`, ["--sx" as string]: `${(i % 2 ? 1 : -1) * 40}px` }} />
      ))}
      <g stroke="currentColor" className="text-primary" strokeWidth="3" strokeLinecap="square">
        <path d="M20 580 L300 300" className="animate-strike" />
        <path d="M300 300 L590 20" className="animate-strike" style={{ animationDelay: "200ms" }} />
      </g>
      <path d="M300 300 L585 300" stroke="currentColor" className="text-tech/70" strokeWidth="1" />
      <rect x="292" y="292" width="16" height="16" transform="rotate(45 300 300)" className="fill-foreground" />
    </svg>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="flex items-center gap-3 font-tech-label text-primary"><span className="h-px w-8 bg-primary" />{children}</p>;
}

export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b slash-bg cut-diagonal-bottom">
      <ImpactArt className="pointer-events-none absolute -right-24 -top-10 w-[420px] opacity-40 md:w-[560px]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-20 md:pt-28">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight animate-rise sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{lead}</p>
        {children}
      </div>
    </section>
  );
}

export function Card({ index, title, body, tag, icon }: { index?: number; title: string; body: string; tag?: string; icon?: ReactNode }) {
  return (
    <article className="group relative flex h-full flex-col border bg-card p-7 cut-corner transition-transform duration-300 hover:-translate-y-1 hover:shadow-impact">
      <span className="absolute left-0 top-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
      <div className="flex items-start justify-between gap-4">
        {icon && <span className="text-primary">{icon}</span>}
        {index !== undefined && <span className="font-tech-label text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <h3 className="mt-6 text-xl font-bold">{title}</h3>
      {tag && <p className="mt-1 font-tech-label text-primary">{tag}</p>}
      <p className="mt-3 text-muted-foreground">{body}</p>
    </article>
  );
}

export function CtaBand() {
  const { t } = useI18n();
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5">
      <div className="relative overflow-hidden bg-primary p-10 text-primary-foreground cut-corner md:p-16">
        <div className="absolute inset-0 slash-bg opacity-60" />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="max-w-2xl text-3xl font-black uppercase leading-tight md:text-5xl">{t.home.ctaTitle}</h2>
          <Link to="/contact" className="btn-dark">{t.home.ctaButton} <ArrowUpRight className="h-5 w-5" /></Link>
        </div>
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto mt-24 max-w-7xl px-5 ${className}`}>{children}</section>;
}
