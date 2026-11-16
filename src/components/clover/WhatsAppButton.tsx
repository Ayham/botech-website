import type { ReactNode } from 'react';
import { CloverIcon } from './CloverIcon';

interface WhatsAppButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'light' | 'outline';
  size?: 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 active:bg-primary-800',
  light:
    'bg-white text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-500 active:bg-primary-100 shadow-lg hover:shadow-xl',
  outline:
    'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500 active:bg-primary-100',
};

const sizeStyles = {
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
};

export function WhatsAppButton({
  href,
  children,
  variant = 'light',
  size = 'lg',
  className = '',
}: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      <CloverIcon name="whatsapp" className="h-5 w-5" />
      <span className="inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
    </a>
  );
}
