/** Original artwork based on the studio's "VG" monogram. Pure SVG, so it costs no image requests. */

export function MonogramMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 3c9 6 22 10 22 25v33H10V28C10 13 23 9 32 3z" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="32" y="47" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="26" fontWeight="600" fill="currentColor" letterSpacing="-1">
        VG
      </text>
    </svg>
  );
}

/** Large jharokha-style arch used in the hero. */
export function ArchArt({ className = '' }: { className?: string }) {
  const gold = '#D9BE8C';
  return (
    <svg viewBox="0 0 400 520" className={className} role="img" aria-label="Vaani's Glamlook monogram inside a gold arch: Beauty, Style, Confidence">
      <defs>
        <linearGradient id="archFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6B1D38" />
          <stop offset="1" stopColor="#3A0F1F" />
        </linearGradient>
        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="0.9" fill={gold} opacity="0.22" />
        </pattern>
      </defs>
      <path d="M200 6c46 30 186 52 186 196v312H14V202C14 58 154 36 200 6z" fill="url(#archFill)" />
      <path d="M200 6c46 30 186 52 186 196v312H14V202C14 58 154 36 200 6z" fill="url(#dots)" />
      <path d="M200 30c40 26 162 48 162 176v290H38V206C38 78 160 56 200 30z" fill="none" stroke={gold} strokeWidth="1.2" opacity="0.8" />
      <path d="M200 46c36 24 146 44 146 164v270H54V210C54 90 164 70 200 46z" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.5" />

      {/* finial */}
      <g fill="none" stroke={gold} strokeWidth="1.2">
        <path d="M200 64c-10 10-10 22 0 30 10-8 10-20 0-30z" />
        <path d="M184 98c8 0 12 4 16 10 4-6 8-10 16-10" />
      </g>

      {/* lotus line art */}
      <g fill="none" stroke={gold} strokeWidth="1.1" opacity="0.9">
        <path d="M200 402c-14-16-14-34 0-50 14 16 14 34 0 50z" />
        <path d="M200 402c-24-6-38-22-40-42 22 2 36 18 40 42z" />
        <path d="M200 402c24-6 38-22 40-42-22 2-36 18-40 42z" />
        <path d="M150 410h100" />
      </g>

      <text x="200" y="285" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="132" fontWeight="500" fill="#FBF7F2" letterSpacing="-6">
        VG
      </text>
      <text x="200" y="326" textAnchor="middle" fontFamily="'Jost Variable', system-ui, sans-serif" fontSize="11.5" fill={gold} letterSpacing="4.6">
        VAANI'S GLAMLOOK
      </text>
      <text x="200" y="458" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fontSize="21" fill="#F3EAE1">
        Beauty · Style · Confidence
      </text>
    </svg>
  );
}
