import { forwardRef, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'padded' | 'bordered';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', hover = false, className = '', ...props }, ref) => {
    const variantStyles = {
      default: 'bg-white rounded-xl border border-neutral-200 overflow-hidden',
      padded: 'bg-white rounded-xl border border-neutral-200 overflow-hidden p-6 sm:p-8',
      bordered: 'bg-white rounded-xl border-2 border-neutral-200 overflow-hidden',
    };

    const hoverStyles = hover ? 'transition-shadow duration-200 hover:shadow-lg' : '';

    return (
      <div
        ref={ref}
        className={`${variantStyles[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`px-6 py-4 sm:px-8 sm:py-6 border-b border-neutral-200 ${className}`} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`p-6 sm:p-8 ${className}`} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`px-6 py-4 sm:px-8 sm:py-6 border-t border-neutral-200 bg-neutral-50 ${className}`} {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';