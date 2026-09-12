import { HTMLAttributes, forwardRef } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'neutral' | 'primary' | 'transparent' | 'gradient';
  noPadding?: boolean;
  className?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, size = 'lg', background = 'white', noPadding = false, className = '', ...props }, ref) => {
    const sizeStyles = {
      sm: 'py-12 sm:py-16',
      md: 'py-16 sm:py-20 lg:py-24',
      lg: 'py-16 sm:py-24 lg:py-32',
      xl: 'py-20 sm:py-28 lg:py-40',
    };

    const backgroundStyles = {
      white: 'bg-white',
      neutral: 'bg-neutral-50',
      primary: 'bg-primary-900 text-white',
      transparent: 'bg-transparent',
      gradient: 'bg-gradient-to-b from-neutral-50 to-white',
    };

    const paddingStyles = noPadding ? '' : sizeStyles[size];

    return (
      <section
        ref={ref}
        className={`${backgroundStyles[background]} ${paddingStyles} ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export const SectionHeader = ({ 
  badge, 
  title, 
  subtitle, 
  align = 'center',
  className = '',
  divider = false,
}: { 
  badge?: string; 
  title: string; 
  subtitle?: string; 
  align?: 'left' | 'center' | 'right';
  className?: string;
  divider?: boolean;
}) => {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const marginStyles = {
    left: 'mx-0',
    center: 'mx-auto',
    right: 'mx-auto mr-0',
  };

  return (
    <div className={`max-w-3xl ${alignStyles[align]} ${marginStyles[align]} ${className}`}>
      {badge && (
        <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-700 rounded-full mb-4 animate-fade-in delay-1">
          {badge}
        </span>
      )}
      <h2 className="heading-2 text-neutral-900 mb-4 animate-fade-in delay-2">{title}</h2>
      {subtitle && (
        <p className="body-lg text-neutral-600 animate-fade-in delay-3">{subtitle}</p>
      )}
      {divider && (
        <div className="section-divider mt-6 animate-scale-in delay-4" aria-hidden="true" />
      )}
    </div>
  );
};