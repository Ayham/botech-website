import { forwardRef, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', loading = false, fullWidth = false, disabled, className = '', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
    
    const variantStyles = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 active:bg-primary-800',
      secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:ring-neutral-500 border border-neutral-300 active:bg-neutral-300',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500 active:bg-primary-100',
      ghost: 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus-visible:ring-neutral-500 active:bg-neutral-200',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-7 py-3.5 text-lg',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    // Ripple effect
    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'absolute bg-white/30 rounded-full pointer-events-none';
      ripple.style.cssText = `
        width: 100px;
        height: 100px;
        left: ${e.nativeEvent.clientX - rect.left - 50}px;
        top: ${e.nativeEvent.clientY - rect.top - 50}px;
        transform: scale(0);
        animation: ripple 600ms ease-out forwards;
      `;
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
        disabled={disabled || loading}
        onMouseDown={handleMouseDown}
        onKeyDown={(e) => {
          if (e.key === ' ') e.preventDefault();
        }}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';