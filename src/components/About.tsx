import { business } from '../content/business';
import { MonogramMark } from './Monogram';

export default function About() {
  const facts = [
    { k: business.google.rating !== null ? business.google.rating.toFixed(1) : '—', v: 'Google rating' },
    { k: '5', v: 'Occasion looks' },
    { k: '1', v: 'Studio + academy' },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="py-20 md:py-28">
      <div className="page grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center lg:gap-24">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-full bg-blush/60">
          <div className="absolute inset-4 rounded-t-full border border-wine/25" aria-hidden="true" />
          <div className="flex h-full flex-col items-center justify-center px-8 text-center">
            <MonogramMark className="h-20 w-20 text-wine" />
            <p className="mt-6 font-display text-3xl italic text-wine-deep" lang="hi">
              {business.nameHindi}
            </p>
            <p className="mt-3 text-xs uppercase tracking-eyebrow text-muted">Chhapraula · Noida</p>
          </div>
        </div>

        <div>
          <p className="eyebrow">About the studio</p>
          <h2 id="about-title" className="mt-4 text-4xl sm:text-5xl">
            Meet <em className="italic text-wine">{business.artist.split(' ')[0]}.</em>
          </h2>
          <div className="mt-6 space-y-4 text-muted">
            <p>
              {business.legalName.replace(' – Noida', '')} is {business.artist}&rsquo;s makeup studio on the ground floor of Om Niwas-1 in
              Dwarka City, Chhapraula. Brides, families and friends come here for wedding-season looks, from pre-bridal functions to
              the reception night.
            </p>
            <p>
              The studio is also an academy, where Vani trains people who want to learn professional makeup. Her latest work, bookings
              and announcements are on Instagram at{' '}
              <a href={business.instagram.url} target="_blank" rel="noopener" className="text-wine underline decoration-wine/30 underline-offset-4 hover:decoration-wine">
                @{business.instagram.handle}
              </a>
              .
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8">
            {facts.map((f) => (
              <div key={f.v} className="flex flex-col">
                <dt className="text-xs uppercase tracking-[0.14em] text-muted">{f.v}</dt>
                <dd className="order-first font-display text-4xl text-wine sm:text-5xl">{f.k}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
