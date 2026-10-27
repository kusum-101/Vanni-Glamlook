import { services } from '../content/business';
import { ArrowIcon } from './Icons';

export default function Services({ onEnquire }: { onEnquire: (occasion: string) => void }) {
  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-ink/10 bg-linen/60 py-20 md:py-28">
      <div className="page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Services</p>
          <h2 id="services-title" className="mt-4 text-4xl sm:text-5xl">
            One artist, <em className="italic text-wine">every function.</em>
          </h2>
          <p className="mt-5 max-w-md text-muted">
            From the first pre-wedding ritual to the reception, each look is planned with you. Tell us the date and the occasion, and Vani will
            get back to you with availability and a quote.
          </p>
        </div>

        <ol className="divide-y divide-ink/10 border-y border-ink/10">
          {services.map((s, i) => (
            <li key={s.id} className="group grid grid-cols-[3rem_1fr] gap-x-4 py-7 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-x-8">
              <span className="font-display text-2xl italic text-gold-deep" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[1.9rem] text-ink transition-colors group-hover:text-wine">{s.name}</h3>
                <p className="mt-2 max-w-xl text-[0.98rem] text-muted">{s.blurb}</p>
              </div>
              <button
                type="button"
                onClick={() => onEnquire(s.id)}
                className="col-start-2 mt-4 inline-flex min-h-[44px] items-center gap-2 justify-self-start text-[0.92rem] font-medium text-wine sm:col-start-3 sm:mt-0"
              >
                <span className="link-underline">Enquire</span>
                <ArrowIcon width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                <span className="sr-only"> about {s.name}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
