import { business, links } from '../content/business';
import { ArrowIcon, PhoneIcon } from './Icons';

const steps = [
  { title: 'Ask about the next batch', text: 'Call or send an enquiry to hear about current courses, timings and fees.' },
  { title: 'Learn in a working studio', text: 'Training happens at the same Chhapraula studio where client looks are created.' },
  { title: 'Build your own kit & style', text: 'Practise the looks clients ask for most: bridal, engagement and party makeup.' },
];

export default function Academy({ onEnquire }: { onEnquire: (occasion: string) => void }) {
  return (
    <section id="academy" aria-labelledby="academy-title" className="on-dark relative overflow-hidden bg-wine-deep py-20 text-ivory md:py-28">
      <svg aria-hidden="true" viewBox="0 0 400 520" className="pointer-events-none absolute -right-24 -top-10 h-[130%] opacity-[0.07]">
        <path d="M200 6c46 30 186 52 186 196v312H14V202C14 58 154 36 200 6z" fill="none" stroke="#D9BE8C" strokeWidth="2" />
        <path d="M200 46c36 24 146 44 146 164v270H54V210C54 90 164 70 200 46z" fill="none" stroke="#D9BE8C" strokeWidth="1" />
      </svg>
      <div className="page relative">
        <p className="eyebrow text-gold-light">The Glamlook Academy</p>
        <div className="mt-4 grid gap-10 lg:grid-cols-2 lg:items-end">
          <h2 id="academy-title" className="text-4xl sm:text-5xl lg:text-6xl">
            Learn the craft behind <em className="italic text-gold-light">the glow.</em>
          </h2>
          <p className="max-w-lg text-ivory/75">
            Vaani&rsquo;s Glamlook is a makeup studio <em>and</em> an academy. If you want to do makeup professionally, or simply do your own
            better, ask about training with {business.artist.split(' ')[0]}.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-ivory/10 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-wine-deep p-7 sm:p-8">
              <span className="font-display text-lg italic text-gold-light" aria-hidden="true">Step {i + 1}</span>
              <h3 className="mt-3 text-2xl">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] text-ivory/70">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={() => onEnquire('academy')} className="btn btn-light">
            Enquire about courses <ArrowIcon width={18} height={18} />
          </button>
          <a href={links.tel(business.phones[0].e164)} className="btn btn-outline-light">
            <PhoneIcon width={18} height={18} /> {business.phones[0].display}
          </a>
        </div>
      </div>
    </section>
  );
}
