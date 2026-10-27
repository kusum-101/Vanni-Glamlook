import { useEffect, useRef, useState, type FormEvent } from 'react';
import { business, links, services } from '../content/business';
import { ArrowIcon, ClockIcon, ExternalIcon, InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './Icons';

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

const occasions = [...services.map((s) => ({ id: s.id, name: s.name })), { id: 'academy', name: 'Academy / makeup course' }, { id: 'other', name: 'Something else' }];

type Fields = { name: string; phone: string; occasion: string; date: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'demo';

const PHONE_RE = /^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!PHONE_RE.test(f.phone.trim())) e.phone = 'Please enter a valid 10-digit Indian mobile number.';
  if (!f.occasion) e.occasion = 'Please choose an occasion.';
  if (f.message.length > 1000) e.message = 'Please keep the message under 1000 characters.';
  return e;
}

export default function Contact({ occasion, focusKey }: { occasion: string; focusKey: number }) {
  const [fields, setFields] = useState<Fields>({ name: '', phone: '', occasion: '', date: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [minDate, setMinDate] = useState<string>();
  const [mapOn, setMapOn] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMinDate(new Date().toISOString().slice(0, 10)), []);

  // "Enquire" buttons elsewhere preselect the occasion and move focus here.
  useEffect(() => {
    if (!focusKey) return;
    setFields((f) => ({ ...f, occasion }));
    formRef.current?.querySelector<HTMLInputElement>('#f-name')?.focus({ preventScroll: true });
  }, [occasion, focusKey]);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#f-${first}`)?.focus();
      return;
    }
    if (!FORM_ENDPOINT) {
      setStatus('demo');
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }
    setStatus('submitting');
    try {
      const occasionName = occasions.find((o) => o.id === fields.occasion)?.name ?? fields.occasion;
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, occasion: occasionName, _subject: `New enquiry: ${occasionName}` }),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
      setFields({ name: '', phone: '', occasion: '', date: '', message: '' });
    } catch {
      setStatus('error');
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`f-${k}-err`} className="mt-1.5 text-sm text-red-800">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Fields) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `f-${k}-err` : undefined });

  const waText = `Hi Vani, I'd like to enquire about ${occasions.find((o) => o.id === fields.occasion)?.name ?? 'makeup'}${fields.date ? ` on ${fields.date}` : ''}.`;
  const wa = links.whatsapp(waText);
  const [primary, secondary] = business.phones;

  return (
    <section id="visit" aria-labelledby="visit-title" className="border-t border-ink/10 py-20 md:py-28">
      <div className="page">
        <p className="eyebrow">Book & visit</p>
        <h2 id="visit-title" className="mt-4 max-w-2xl text-4xl sm:text-5xl">
          Tell us your date. <em className="italic text-wine">We&rsquo;ll take it from there.</em>
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Enquiry form */}
          <div id="contact" className="rounded-2xl bg-white/70 p-6 ring-1 ring-ink/10 sm:p-9">
            <h3 className="text-3xl">Send an enquiry</h3>
            <p className="mt-2 text-sm text-muted">Fields marked * are required. Vani will get back to you on the number you share.</p>

            <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="f-name" className="mb-1.5 block text-sm font-medium">Your name *</label>
                <input id="f-name" name="name" autoComplete="name" className="field" value={fields.name} onChange={set('name')} {...aria('name')} />
                {err('name')}
              </div>
              <div>
                <label htmlFor="f-phone" className="mb-1.5 block text-sm font-medium">Mobile number *</label>
                <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98xxx xxxxx" className="field" value={fields.phone} onChange={set('phone')} {...aria('phone')} />
                {err('phone')}
              </div>
              <div>
                <label htmlFor="f-occasion" className="mb-1.5 block text-sm font-medium">Occasion *</label>
                <select id="f-occasion" name="occasion" className="field" value={fields.occasion} onChange={set('occasion')} {...aria('occasion')}>
                  <option value="">Choose…</option>
                  {occasions.map((o) => (
                    <option key={o.id} value={o.id}>{o.name}</option>
                  ))}
                </select>
                {err('occasion')}
              </div>
              <div>
                <label htmlFor="f-date" className="mb-1.5 block text-sm font-medium">Event date</label>
                <input id="f-date" name="date" type="date" min={minDate} className="field" value={fields.date} onChange={set('date')} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-message" className="mb-1.5 block text-sm font-medium">Anything else?</label>
                <textarea id="f-message" name="message" rows={4} className="field resize-y" placeholder="Venue, number of people, look you have in mind…" value={fields.message} onChange={set('message')} {...aria('message')} />
                {err('message')}
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button type="submit" className="btn btn-primary disabled:opacity-60" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    <>
                      Send enquiry <ArrowIcon width={18} height={18} />
                    </>
                  )}
                </button>
                {wa && (
                  <a href={wa} target="_blank" rel="noopener" className="btn btn-ghost">
                    <WhatsAppIcon width={18} height={18} /> Send on WhatsApp
                  </a>
                )}
              </div>
            </form>

            <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
              {status === 'success' && (
                <p className="mt-6 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900 ring-1 ring-emerald-200">
                  Thank you — your enquiry has been sent. Vani will get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-900 ring-1 ring-red-200">
                  Sorry, your enquiry couldn&rsquo;t be sent. Please try again, or call{' '}
                  <a className="font-medium underline" href={links.tel(primary.e164)}>{primary.display}</a>.
                </p>
              )}
              {status === 'demo' && (
                <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-950 ring-1 ring-amber-200">
                  <strong>Preview mode:</strong> this enquiry was <strong>not</strong> sent, because the form isn&rsquo;t connected to an
                  inbox yet. To book now, call <a className="font-medium underline" href={links.tel(primary.e164)}>{primary.display}</a> or
                  message <a className="font-medium underline" href={business.instagram.url} target="_blank" rel="noopener">@{business.instagram.handle}</a>.
                </p>
              )}
            </div>
          </div>

          {/* Visit details */}
          <div className="flex flex-col gap-8">
            <dl className="grid gap-6">
              <div className="flex gap-4">
                <dt><PinIcon className="mt-1 text-wine" /><span className="sr-only">Address</span></dt>
                <dd>
                  <address className="not-italic">
                    <span className="block font-medium text-ink">{business.legalName.replace(' – Noida', '')}</span>
                    {business.address.lines.map((l) => <span key={l} className="block text-muted">{l}</span>)}
                    <span className="block text-muted">{business.address.locality}, {business.address.region} {business.address.postalCode}</span>
                  </address>
                  <span className="mt-1 block text-xs text-muted">Plus code: {business.address.plusCode}</span>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt><ClockIcon className="mt-1 text-wine" /><span className="sr-only">Hours</span></dt>
                <dd>
                  <span className="block font-medium text-ink">{business.hours.summary}</span>
                  <span className="block text-sm text-muted">{business.hours.note}</span>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt><PhoneIcon className="mt-1 text-wine" /><span className="sr-only">Phone</span></dt>
                <dd className="flex flex-col">
                  <a href={links.tel(primary.e164)} className="link-underline self-start text-lg font-medium text-ink hover:text-wine">{primary.display}</a>
                  {secondary && (
                    <a href={links.tel(secondary.e164)} className="link-underline self-start text-muted hover:text-wine">
                      {secondary.display} <span className="text-xs">({secondary.label.toLowerCase()})</span>
                    </a>
                  )}
                </dd>
              </div>
              <div className="flex gap-4">
                <dt><InstagramIcon className="mt-1 text-wine" /><span className="sr-only">Instagram</span></dt>
                <dd>
                  <a href={business.instagram.url} target="_blank" rel="noopener" className="link-underline text-ink hover:text-wine">@{business.instagram.handle}</a>
                </dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-3">
              <a href={links.directions} target="_blank" rel="noopener" className="btn btn-primary">
                Get directions <ExternalIcon width={16} height={16} />
              </a>
              <a href={links.maps} target="_blank" rel="noopener" className="btn btn-ghost">View on Google Maps</a>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-blush/50 ring-1 ring-ink/10">
              {mapOn ? (
                <iframe
                  src={links.mapEmbed}
                  title={`Map showing ${business.name}, ${business.address.lines[1]}, Noida`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                  <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-wine/10" preserveAspectRatio="none" viewBox="0 0 400 300">
                    <path d="M0 210 C90 190 120 120 210 130 S330 60 400 70" stroke="currentColor" strokeWidth="14" fill="none" />
                    <path d="M120 0 L160 300 M300 0 L250 300 M0 90 L400 150" stroke="currentColor" strokeWidth="5" fill="none" />
                  </svg>
                  <PinIcon width={36} height={36} className="relative text-wine" />
                  <p className="relative max-w-xs text-sm text-ink/80">Dwarka City, Chhapraula, Noida · {business.address.postalCode}</p>
                  <button type="button" onClick={() => setMapOn(true)} className="btn btn-light relative ring-1 ring-ink/10">
                    Load interactive map
                  </button>
                  <p className="relative text-xs text-muted">Loads Google Maps</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
