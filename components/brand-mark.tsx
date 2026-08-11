type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <svg
      className={`brand-fin-symbol ${className}`.trim()}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8.5 34.5c6.4-3.1 11.3-8.7 14.1-16.2l2.2-6 3.6 5.4c2.7 4.1 6.2 7.4 11.1 10.6-7.3-.6-12.9-2.6-17.2-6-2.2 5.5-6.7 9.7-13.8 12.2Z" />
      <path d="M13.1 39.2c6.1-1.8 11-5.5 14.8-11.1 3.6 2.2 7.5 3.6 12 4.3-6.8 2.4-12.7 2.4-17.7.2-2.7 3-5.7 5.2-9.1 6.6Z" />
      <path d="M18.7 43c4.4-1.1 8.2-3.2 11.5-6.4 2.8 1 5.7 1.5 8.9 1.5-5.2 2.5-10.2 3.1-15 1.9-1.7 1.4-3.5 2.4-5.4 3Z" />
    </svg>
  );
}
