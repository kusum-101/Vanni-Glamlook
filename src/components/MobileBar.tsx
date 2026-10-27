import { business, links } from '../content/business';
import { PhoneIcon, PinIcon, WhatsAppIcon } from './Icons';

/** Thumb-reach action bar on small screens. */
export default function MobileBar() {
  const wa = links.whatsapp('Hi Vani, I would like to enquire about makeup.');
  const item = 'flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[0.7rem] font-medium uppercase tracking-[0.12em]';
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-30 flex border-t border-ink/10 bg-ivory pb-[env(safe-area-inset-bottom)] md:hidden">
      <a href={links.tel(business.phones[0].e164)} className={`${item} text-ink`}>
        <PhoneIcon width={19} height={19} /> Call
      </a>
      {wa && (
        <a href={wa} target="_blank" rel="noopener" className={`${item} text-ink`}>
          <WhatsAppIcon width={19} height={19} /> WhatsApp
        </a>
      )}
      <a href={links.directions} target="_blank" rel="noopener" className={`${item} text-ink`}>
        <PinIcon width={19} height={19} /> Directions
      </a>
      <a href="#contact" className={`${item} bg-wine text-ivory`}>
        <span aria-hidden="true" className="font-display text-lg normal-case leading-none tracking-normal">✦</span> Book
      </a>
    </nav>
  );
}
