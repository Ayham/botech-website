import { forwardRef, AnchorHTMLAttributes } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'muted' | 'primary';
  underline?: 'always' | 'hover' | 'never';
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, variant = 'default', underline = 'hover', className = '', ...props }, ref) => {
    const variantStyles = {
      default: 'text-neutral-600 hover:text-neutral-900',
      muted: 'text-neutral-500 hover:text-neutral-700',
      primary: 'text-primary-600 hover:text-primary-700',
    };

    const underlineStyles = {
      always: 'underline',
      hover: 'underline-offset-2 hover:underline',
      never: 'no-underline',
    };

    return (
      <a
        ref={ref}
        className={`${variantStyles[variant]} ${underlineStyles[underline]} transition-colors duration-150 ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';