import { useEffect, useRef, useState } from 'react';
import { business, links } from '../content/business';
import { formatDate } from '../lib/format';
import { fetchGoogleReviews, type GoogleReviewsPayload } from '../lib/reviews';
import { ExternalIcon, GoogleG } from './Icons';
import Stars from './Stars';

const REVIEWS_SHOWN = 3;

export default function Reviews() {
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState<GoogleReviewsPayload | null>(null);
  const [expanded, setExpanded] = useState(false);

  // Only call the reviews API once the section is close to the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctrl = new AbortController();
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        fetchGoogleReviews(ctrl.signal).then((d) => d && setLive(d));
      },
      { rootMargin: '400px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      ctrl.abort();
    };
  }, []);

  const rating = live?.rating ?? business.google.rating;
  const count = live?.userRatingCount ?? business.google.reviewCount;
  const reviews = live?.reviews ?? [];
  const visible = expanded ? reviews : reviews.slice(0, REVIEWS_SHOWN);
  const asOf = live ? 'Live from Google' : `Checked on Google · ${formatDate(business.google.verifiedOn)}`;

  return (
    <section ref={ref} id="reviews" aria-labelledby="reviews-title" className="border-t border-ink/10 bg-linen/60 py-20 md:py-28">
      <div className="page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="eyebrow">Google reviews</p>
          <h2 id="reviews-title" className="mt-4 text-4xl sm:text-5xl">
            What clients say <em className="italic text-wine">on Google.</em>
          </h2>

          <div className="mt-10 rounded-2xl bg-ivory p-7 ring-1 ring-ink/10 sm:p-9">
            {rating !== null ? (
              <>
                <p className="flex items-end gap-4">
                  <span className="font-display text-7xl leading-none text-ink">{rating.toFixed(1)}</span>
                  <span className="pb-2 text-sm text-muted">out of 5</span>
                </p>
                <p className="mt-3 text-gold">
                  <Stars value={rating} size={24} />
                  <span className="sr-only">Rated {rating.toFixed(1)} out of 5 stars on Google</span>
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <GoogleG />
                  {count !== null ? `${count.toLocaleString('en-IN')} reviews · ` : ''}
                  {asOf}
                </p>
                {count === null && import.meta.env.DEV && (
                  <p className="mt-3 rounded bg-amber-100 px-3 py-2 text-xs text-amber-900">
                    Dev note: review count not verified. Set <code>google.reviewCount</code> in src/content/business.ts or configure the
                    Places API (see README).
                  </p>
                )}
              </>
            ) : (
              <p className="text-muted">See the studio&rsquo;s rating and reviews on Google.</p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href={live?.mapsUri ?? links.maps} target="_blank" rel="noopener" className="btn btn-primary">
                Read all Google reviews <ExternalIcon width={16} height={16} />
              </a>
              <a href={links.writeReview} target="_blank" rel="noopener" className="btn btn-ghost">
                Write a review
              </a>
            </div>
          </div>
        </div>

        <div>
          {visible.length > 0 ? (
            <>
              <ul className="grid gap-4">
                {visible.map((r) => (
                  <li key={`${r.author}-${r.publishTime}`} className="rounded-2xl bg-ivory p-6 ring-1 ring-ink/10 sm:p-7">
                    <figure>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-gold">
                          <Stars value={r.rating} size={17} />
                          <span className="sr-only">{r.rating} out of 5 stars</span>
                        </span>
                        {r.relativeTime && <span className="text-xs text-muted">{r.relativeTime}</span>}
                      </div>
                      <blockquote className="mt-4 line-clamp-6 text-[1.02rem] text-ink/85">{r.text}</blockquote>
                      <figcaption className="mt-5 flex items-center gap-3 text-sm">
                        {r.photoUri && <img src={r.photoUri} alt="" width={32} height={32} loading="lazy" referrerPolicy="no-referrer" className="h-8 w-8 rounded-full" />}
                        {r.authorUri ? (
                          <a href={r.authorUri} target="_blank" rel="noopener" className="font-medium text-ink hover:text-wine">{r.author}</a>
                        ) : (
                          <span className="font-medium text-ink">{r.author}</span>
                        )}
                        <span className="text-muted">on Google</span>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
              {reviews.length > REVIEWS_SHOWN && (
                <button type="button" onClick={() => setExpanded((x) => !x)} className="btn btn-ghost mt-6" aria-expanded={expanded}>
                  {expanded ? 'Show fewer' : `Show ${reviews.length - REVIEWS_SHOWN} more`}
                </button>
              )}
              <p className="mt-4 text-xs text-muted">Reviews are shown as provided by Google and may not include every review.</p>
            </>
          ) : (
            <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-wine/25 p-8 sm:p-12">
              <p className="font-display text-3xl leading-snug text-wine-deep sm:text-4xl">
                We don&rsquo;t write our own testimonials. Every review lives on Google, in the client&rsquo;s own words.
              </p>
              <p className="mt-5 max-w-md text-muted">
                Read what brides and students have written about {business.name} on the studio&rsquo;s Google listing, and if Vani has done
                your makeup, add your own.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
