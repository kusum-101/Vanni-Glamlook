import { useEffect, useRef, useState } from 'react';
import { business, galleryPhotos } from '../content/business';
import { ArrowIcon, CloseIcon, ExternalIcon, InstagramIcon } from './Icons';

export default function InstagramGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const total = galleryPhotos.length;
  const current = index === null ? null : galleryPhotos[index];

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + total) % total));

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index]);

  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-ink/10 py-20 md:py-28">
      <div className="page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2 id="work-title" className="mt-4 text-4xl sm:text-5xl">
              Fresh from <em className="italic text-wine">the studio.</em>
            </h2>
            <p className="mt-4 max-w-lg text-muted">Bridal, bridal-glam and party looks by Vani. Tap any photo to see it larger.</p>
          </div>
          <a href={business.instagram.url} target="_blank" rel="noopener" className="btn btn-ghost">
            <InstagramIcon width={18} height={18} /> More on @{business.instagram.handle}
          </a>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {galleryPhotos.map((ph, i) => (
            <li key={ph.src}>
              <button type="button" onClick={() => open(i)} className="group relative block w-full overflow-hidden rounded-xl bg-linen">
                <img
                  src={ph.src}
                  srcSet={ph.srcSet}
                  sizes="(min-width: 1024px) 290px, 45vw"
                  width={ph.width}
                  height={ph.height}
                  alt={ph.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent p-3 pt-10 text-ivory opacity-90 transition-opacity sm:p-4 sm:opacity-0 sm:group-hover:opacity-100">
                  <span className="font-display text-lg italic sm:text-xl">{ph.caption}</span>
                  <span className="text-[0.65rem] uppercase tracking-eyebrow">View</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted">
          Photos from{' '}
          <a href={business.instagram.url} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-wine">
            @{business.instagram.handle}
          </a>
          .
        </p>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto max-h-none max-w-none bg-transparent p-0 outline-none backdrop:bg-[#140a0d]/95"
      >
        {current && index !== null && (
          <figure className="relative flex flex-col items-center">
            <img
              key={current.src}
              src={current.large}
              width={1080}
              height={1440}
              alt={current.alt}
              className="h-auto max-h-[82dvh] w-auto max-w-[92vw] rounded-lg object-contain"
            />
            <figcaption className="mt-4 flex w-full max-w-[92vw] items-center justify-between gap-4 text-sm text-ivory/80">
              <span>
                <span className="font-display text-lg italic text-ivory">{current.caption}</span> · {index + 1} / {total}
              </span>
              {current.post && (
                <a href={current.post} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-gold-light hover:underline">
                  View post <ExternalIcon width={14} height={14} />
                </a>
              )}
            </figcaption>
            <button type="button" onClick={close} aria-label="Close" className="fixed right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20">
              <CloseIcon />
            </button>
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="fixed left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20">
              <ArrowIcon className="rotate-180" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="fixed right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20">
              <ArrowIcon />
            </button>
          </figure>
        )}
      </dialog>
    </section>
  );
}
