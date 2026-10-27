import { useEffect, useRef, useState } from 'react';
import { business, links } from '../content/business';
import { CloseIcon, MenuIcon, PhoneIcon } from './Icons';
import { MonogramMark } from './Monogram';

const nav = [
  { href: '#services', label: 'Services' },
  { href: '#academy', label: 'Academy' },
  { href: '#work', label: 'Work' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#visit', label: 'Visit' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const phone = business.phones[0];

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? 'bg-ivory shadow-[0_1px_0_rgba(36,22,27,0.08)]' : 'bg-ivory'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-wine focus:px-4 focus:py-2 focus:text-ivory">
        Skip to content
      </a>
      <div className="page flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 text-wine">
          <MonogramMark className="h-10 w-10" />
          <span className="leading-none">
            <span className="block font-display text-[1.45rem] font-semibold text-ink">{business.name}</span>
            <span className="mt-1 block text-[0.62rem] uppercase tracking-eyebrow text-muted">Makeup Studio & Academy</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.92rem]">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="link-underline py-1 text-ink/80 hover:text-wine">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={links.tel(phone.e164)} className="hidden items-center gap-2 px-3 text-[0.92rem] text-ink/80 hover:text-wine md:inline-flex">
            <PhoneIcon width={17} height={17} /> {phone.display}
          </a>
          <a href="#contact" className="btn btn-primary hidden sm:inline-flex">Book a date</a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full text-ink hover:bg-linen lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="border-t border-ink/10 bg-ivory lg:hidden">
        <ul className="page flex flex-col py-3">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} onClick={() => setOpen(false)} className="flex min-h-[52px] items-center border-b border-ink/5 font-display text-2xl text-ink hover:text-wine">
                {n.label}
              </a>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">Book a date</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
