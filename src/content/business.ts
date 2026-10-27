/**
 * Single source of truth for business facts.
 * Every value here was verified on 27 Oct 2026 (see BUSINESS_RESEARCH.md).
 * Leave a field as `null` until the owner confirms it — the UI hides or
 * softens anything that is null instead of guessing.
 */

export const business = {
  name: "Vaani's Glamlook",
  legalName: "Vaani's Glamlook Makeup Studio & Academy – Noida",
  nameHindi: 'वाणी\'स ग्लैमलूक मेकअप स्टूडियो & एकेडमी',
  artist: 'Vani Bhardwaj',
  category: 'Make-up artist',
  tagline: 'Beauty · Style · Confidence',

  address: {
    lines: ['Flat no. GF-1, Ground floor, Om Niwas-1', 'Dwarka City, Chhapraula'],
    street: 'Flat no-GF-1, Ground floor, Om Niwas-1, Dwarka City, Chhapraula',
    locality: 'Noida',
    region: 'Uttar Pradesh',
    postalCode: '201009',
    country: 'IN',
    plusCode: 'JCW7+6G Noida, Uttar Pradesh',
  },
  geo: { lat: 28.6455051, lng: 77.4138506 },

  phones: [
    { display: '080763 12605', e164: '+918076312605', label: 'Studio (Google listing)' },
    // Appears on the studio's Instagram "Bridal bookings open" poster; not on Google.
    { display: '98702 07231', e164: '+919870207231', label: 'Bookings' },
  ],
  /** Set to an E.164 number (no +) once the owner confirms which number uses WhatsApp, e.g. '918076312605'. */
  whatsapp: null as string | null,

  hours: {
    /** As listed on Google. Owner should confirm whether this means "by appointment". */
    summary: 'Open daily · by appointment',
    note: 'Listed on Google as open 24 hours — please call ahead to book a slot.',
    schema: ['Mo-Su 00:00-23:59'],
  },

  instagram: {
    handle: 'vaani_s_glam_look',
    url: 'https://www.instagram.com/vaani_s_glam_look/',
  },

  google: {
    rating: 4.9 as number | null,
    /** Not publicly verifiable without the Places API — fill in from the Google listing. */
    reviewCount: null as number | null,
    verifiedOn: '2026-10-27',
    cid: '17819397378923153432',
    /** ChIJ… Place ID — enables the direct "Write a review" link. */
    placeId: null as string | null,
  },
} as const;

export const links = {
  maps: `https://maps.google.com/?cid=${business.google.cid}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${business.geo.lat},${business.geo.lng}`,
  writeReview: business.google.placeId
    ? `https://search.google.com/local/writereview?placeid=${business.google.placeId}`
    : `https://maps.google.com/?cid=${business.google.cid}`,
  mapEmbed: `https://maps.google.com/maps?q=${business.geo.lat},${business.geo.lng}&z=16&output=embed`,
  tel: (e164: string) => `tel:${e164}`,
  whatsapp: (text: string) =>
    business.whatsapp ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}` : null,
};

export type Service = { id: string; name: string; hindi?: string; blurb: string };

/** Services as listed in the studio's Instagram bio. Descriptions avoid unverified specifics (prices, products, techniques). */
export const services: Service[] = [
  {
    id: 'bridal',
    name: 'Bridal Makeup',
    blurb:
      'Your wedding-day look, planned together around your outfit, jewellery, skin and the rituals of the day — so it photographs beautifully and still feels like you.',
  },
  {
    id: 'pre-bridal',
    name: 'Pre-Bridal Makeup',
    blurb:
      'For the haldi, mehendi and sangeet — looks that build towards the big day while staying comfortable through long functions.',
  },
  {
    id: 'engagement',
    name: 'Engagement Makeup',
    blurb: 'A polished, luminous look for the ring ceremony and the photographs you will keep for years.',
  },
  {
    id: 'day-party',
    name: 'Day Party Makeup',
    blurb: 'Soft, fresh and light-reflecting — made for daylight, brunches, pujas and outdoor celebrations.',
  },
  {
    id: 'night-party',
    name: 'Night Party Makeup',
    blurb: 'More definition and drama for receptions, cocktails and evening events under artificial light.',
  },
];

export type InstaPost = { code: string; kind: 'p' | 'reel'; date: string; label: string };

/** Public posts by @vaani_s_glam_look, shown via the official Instagram embed on click. */
export const instagramPosts: InstaPost[] = [
  { code: 'DSPwjNBEgWI', kind: 'p', date: '2025-12-14', label: 'Bridal look' },
  { code: 'Dc9vhq7Euue', kind: 'p', date: '2026-09-06', label: 'Bridal glam' },
  { code: 'DdguI1fypqz', kind: 'reel', date: '2026-09-20', label: 'Bridal bookings open' },
  { code: 'DdNocdaEscT', kind: 'p', date: '2026-09-12', label: 'Retro party look' },
  { code: 'DOtvfG1EuYw', kind: 'p', date: '2025-09-17', label: 'Studio post' },
  { code: 'DdD4vboyscq', kind: 'reel', date: '2026-09-09', label: 'Eyes & liner' },
  { code: 'DdcHxPFiC2t', kind: 'p', date: '2026-09-18', label: 'Little one’s festive look' },
  { code: 'DdJUJI2yvI6', kind: 'reel', date: '2026-09-11', label: 'Studio reel' },
  { code: 'DdFDkOuydVp', kind: 'reel', date: '2026-09-09', label: 'In the mirror' },
];

/**
 * Owner-supplied photos. Drop optimised files into /public/photos and list them here.
 * Empty = the site uses its original artwork and the Instagram embeds instead.
 * Example: { src: '/photos/bride-01-800.webp', srcSet: '/photos/bride-01-480.webp 480w, /photos/bride-01-800.webp 800w', width: 800, height: 1000, alt: 'Bride in a red lehenga with soft gold eye makeup' }
 */
export type Photo = { src: string; srcSet?: string; width: number; height: number; alt: string; caption?: string; post?: string; large?: string };

/*
 * PITCH-DEMO PHOTOS: downloaded on 27 Oct 2026 from public posts on @vaani_s_glam_look.
 * Copyright belongs to the studio, and some show clients. Get the owner's written permission
 * (and confirm client consent) before publishing the site.
 */
const photo = (name: string, alt: string, caption: string, post: string): Photo => ({
  src: `/photos/${name}-800.webp`,
  srcSet: `/photos/${name}-400.webp 400w, /photos/${name}-800.webp 800w, /photos/${name}-1080.webp 1080w`,
  large: `/photos/${name}-1080.webp`,
  width: 800,
  height: 1067,
  alt,
  caption,
  post: `https://www.instagram.com/p/${post}/`,
});

export const heroPhoto: Photo | null = {
  src: '/photos/hero-bride-900.webp',
  srcSet: '/photos/hero-bride-400.webp 400w, /photos/hero-bride-600.webp 600w,/photos/hero-bride-900.webp 900w, /photos/hero-bride-1200.webp 1200w',
  width: 900,
  height: 1200,
  alt: 'Bride in a red embroidered lehenga and dupatta with kundan jewellery, makeup by Vaani’s Glamlook',
};

export const galleryPhotos: Photo[] = [
  photo('bridal-red-01', 'Full-length bride in a red lehenga before a floral mandap backdrop', 'Bridal', 'DSPwjNBEgWI'),
  photo('bridal-floral-01', 'Close-up of a bridal look with pink eyeshadow, nath and pearl matha patti', 'Bridal glam', 'Dc9vhq7Euue'),
  photo('party-teal-01', 'Soft glam with teal shimmer eyes and loose curls, in a sequinned teal gown', 'Party', 'DOtvfG1EuYw'),
  photo('bridal-red-02', 'Bride with green-stone kundan jewellery and a red dupatta, looking to the side', 'Bridal', 'DSPwjNBEgWI'),
  photo('bridal-floral-02', 'Eyes-closed bridal portrait showing pink and gold eye makeup with fresh roses in the hair', 'Bridal glam', 'Dc9vhq7Euue'),
  photo('party-teal-02', 'Party look holding a bouquet of lilies, teal gown and statement necklace', 'Party', 'DOtvfG1EuYw'),
  photo('bridal-floral-03', 'Bridal makeup with alta-painted hands framing the face', 'Bridal glam', 'Dc9vhq7Euue'),
  photo('party-teal-03', 'Seated portrait in a teal ruffled gown with soft glam makeup', 'Party', 'DOtvfG1EuYw'),
];
