interface GooglePlayButtonProps {
  href: string;
  /** Accessible name for the badge link. */
  label: string;
  size?: 'sm' | 'md';
  className?: string;
}

const sizeStyles = {
  sm: 'h-10',
  md: 'h-12',
};

/**
 * A small Google Play badge used as a download button on listing surfaces.
 * The official badge art keeps Google Play visually primary; callers pair it
 * with secondary options that are styled to stay quieter.
 */
export function GooglePlayButton({ href, label, size = 'sm', className = '' }: GooglePlayButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex rounded-xl transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${className}`}
    >
      <img
        src="/assets/google-play-badge-en.svg"
        alt={label}
        width="239"
        height="71"
        loading="lazy"
        className={`${sizeStyles[size]} w-auto rounded-xl shadow-md ring-1 ring-black/10`}
      />
    </a>
  );
}
