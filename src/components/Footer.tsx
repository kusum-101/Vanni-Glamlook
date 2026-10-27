import { business, links } from '../content/business';
import { MonogramMark } from './Monogram';

export default function Footer() {
  return (
    <footer className="on-dark bg-ink pb-28 pt-16 text-ivory/80 md:pb-12">
      <div className="page grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-gold-light">
            <MonogramMark className="h-11 w-11" />
            <span className="font-display text-2xl font-semibold text-ivory">{business.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm">Makeup Studio & Academy by {business.artist}. Bridal, pre-bridal, engagement and party makeup in Chhapraula, Noida.</p>
          <p className="mt-2 font-display text-lg italic text-gold-light">{business.tagline}</p>
        </div>

        <div className="text-sm">
          <h2 className="font-sans text-xs font-medium uppercase tracking-eyebrow text-gold-light">Visit</h2>
          <address className="mt-4 not-italic leading-relaxed">
            {business.address.lines.map((l) => <span key={l} className="block">{l}</span>)}
            {business.address.locality}, {business.address.region} {business.address.postalCode}
          </address>
          <a href={links.directions} target="_blank" rel="noopener" className="link-underline mt-3 inline-block text-ivory">Directions →</a>
        </div>

        <div className="text-sm">
          <h2 className="font-sans text-xs font-medium uppercase tracking-eyebrow text-gold-light">Contact</h2>
          <ul className="mt-4 space-y-2">
            {business.phones.map((p) => (
              <li key={p.e164}><a href={links.tel(p.e164)} className="link-underline text-ivory">{p.display}</a></li>
            ))}
            <li><a href={business.instagram.url} target="_blank" rel="noopener" className="link-underline text-ivory">Instagram @{business.instagram.handle}</a></li>
            <li><a href={links.maps} target="_blank" rel="noopener" className="link-underline text-ivory">Google reviews</a></li>
          </ul>
          <p className="mt-4">{business.hours.summary}</p>
        </div>
      </div>
      <div className="page mt-12 border-t border-ivory/10 pt-6 text-xs text-ivory/50">
        © {new Date().getFullYear()} {business.legalName}
      </div>
    </footer>
  );
}
