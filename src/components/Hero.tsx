import { business, heroPhoto, links, type Photo } from '../content/business';
import { formatMonthYear } from '../lib/format';
import { ArrowIcon, PhoneIcon } from './Icons';
import { ArchArt } from './Monogram';
import Stars from './Stars';

const chips = [
  { label: 'Bridal', href: '#services' },
  { label: 'Engagement', href: '#services' },
  { label: 'Pre-bridal', href: '#services' },
  { label: 'Day & night party', href: '#services' },
  { label: 'Makeup academy', href: '#academy' },
];

/** Supporting collage shots: re-use the small gallery renditions so they cost little extra. */
const side: (Photo & { tag: string })[] = [
  {
    tag: 'Party',
    src: '/photos/party-teal-01-400.webp',
    srcSet: '/photos/party-teal-01-400.webp 400w, /photos/party-teal-01-800.webp 800w',
    width: 400,
    height: 533,
    alt: 'Party makeup with teal shimmer eyes and soft curls',
  },
  {
    tag: 'Glam',
    src: '/photos/bridal-floral-02-400.webp',
    srcSet: '/photos/bridal-floral-02-400.webp 400w, /photos/bridal-floral-02-800.webp 800w',
    width: 400,
    height: 533,
    alt: 'Close-up of pink and gold eye makeup with fresh roses in the hair',
  },
];

function Tag({ children }: { children: string }) {
  return (
    <span className="absolute left-3 top-3 rounded-full bg-ivory/90 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-eyebrow text-wine-deep shadow-sm">
      {children}
    </span>
  );
}

function Collage({ main }: { main: Photo }) {
  return (
    <div className="relative mx-auto aspect-[10/9] w-full max-w-[25rem] sm:max-w-[30rem] md:max-w-none">
      <div aria-hidden="true" className="absolute left-[6%] top-[8%] h-[88%] w-[56%] rounded-t-full bg-blush/60" />

      {/* Main arch: bridal */}
      <div className="absolute left-0 top-0 w-[58%] overflow-hidden rounded-t-full bg-wine-deep p-1.5 shadow-[0_30px_50px_-24px_rgba(58,15,31,0.55)] ring-1 ring-gold/60 sm:p-2">
        <img
          src={main.src}
          srcSet={main.srcSet}
          sizes="(min-width: 1024px) 300px, (min-width: 768px) 30vw, (min-width: 640px) 280px, calc(58vw - 24px)"
          width={main.width}
          height={main.height}
          alt={main.alt}
          fetchPriority="high"
          className="aspect-[3/4] w-full rounded-t-full object-cover"
        />
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ivory/90 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-eyebrow text-wine-deep shadow-sm">
          Bridal
        </span>
      </div>

      {/* Party */}
      <figure className="absolute right-0 top-[4%] w-[38%] overflow-hidden rounded-2xl shadow-[0_24px_40px_-24px_rgba(58,15,31,0.5)] ring-4 ring-ivory">
        <img src={side[0].src} srcSet={side[0].srcSet} sizes="(min-width: 768px) 200px, 38vw" width={side[0].width} height={side[0].height} alt={side[0].alt} className="aspect-[3/4] w-full object-cover" />
        <Tag>{side[0].tag}</Tag>
      </figure>

      {/* Glam */}
      <figure className="absolute bottom-0 right-[8%] w-[34%] overflow-hidden rounded-2xl shadow-[0_24px_40px_-24px_rgba(58,15,31,0.5)] ring-4 ring-ivory">
        <img src={side[1].src} srcSet={side[1].srcSet} sizes="(min-width: 768px) 180px, 34vw" width={side[1].width} height={side[1].height} alt={side[1].alt} className="aspect-square w-full object-cover object-top" />
        <Tag>{side[1].tag}</Tag>
      </figure>

      {/* Academy card */}
      <a
        href="#academy"
        className="group absolute -bottom-5 left-[4%] flex items-center gap-3 rounded-2xl bg-wine-deep py-3 pl-4 pr-5 text-ivory shadow-[0_20px_40px_-20px_rgba(58,15,31,0.8)] transition-transform hover:-translate-y-0.5 sm:left-[8%]"
      >
        <span className="font-display text-3xl italic leading-none text-gold-light" aria-hidden="true">✦</span>
        <span className="leading-tight">
          <span className="block text-[0.6rem] uppercase tracking-eyebrow text-gold-light">Glamlook Academy</span>
          <span className="block text-sm">Learn professional makeup</span>
        </span>
        <ArrowIcon width={16} height={16} className="text-gold-light transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

export default function Hero() {
  const { rating, verifiedOn } = business.google;
  const phone = business.phones[0];

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="page grid items-center gap-14 pb-20 pt-8 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:pb-24 md:pt-14 lg:gap-16">
        <div className="order-2 md:order-none">
          <p className="eyebrow rise">Make-up studio & academy · Chhapraula, Noida</p>
          <h1 id="hero-title" className="rise rise-2 mt-5 text-[2.9rem] text-ink sm:text-6xl lg:text-[4.1rem] xl:text-[5rem]">
            Makeup for <em className="font-medium italic text-wine">every celebration.</em>
          </h1>
          <p className="rise rise-3 mt-6 max-w-xl text-lg text-muted">
            From the wedding day to the engagement, sangeet and party nights, {business.artist} creates looks for every occasion at her
            studio in Dwarka City, Chhapraula. She also teaches the craft at the Glamlook Academy.
          </p>

          <ul className="rise rise-3 mt-7 flex flex-wrap gap-2" aria-label="What we do">
            {chips.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="inline-flex min-h-[36px] items-center rounded-full border border-wine/20 bg-white/60 px-4 text-sm text-wine-deep transition-colors hover:border-wine hover:bg-wine hover:text-ivory"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">
              Book your look <ArrowIcon width={18} height={18} />
            </a>
            <a href={links.tel(phone.e164)} className="btn btn-ghost">
              <PhoneIcon width={18} height={18} /> Call {phone.display}
            </a>
          </div>

          {rating !== null && (
            <a
              href={links.maps}
              target="_blank"
              rel="noopener"
              className="rise rise-3 mt-8 inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white/60 py-2 pl-3 pr-5 text-sm text-ink/80 transition-colors hover:border-wine/40"
            >
              <span className="text-gold"><Stars value={rating} size={16} /></span>
              <span>
                <strong className="font-semibold text-ink">{rating.toFixed(1)}</strong> on Google
                <span className="text-muted"> · as of {formatMonthYear(verifiedOn)}</span>
              </span>
            </a>
          )}
        </div>

        <div className="order-1 md:order-none">
          {heroPhoto ? <Collage main={heroPhoto} /> : <ArchArt className="mx-auto h-auto w-full max-w-[22rem] drop-shadow-[0_30px_40px_rgba(58,15,31,0.18)]" />}
        </div>
      </div>
    </section>
  );
}
