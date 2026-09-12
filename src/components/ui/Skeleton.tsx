import { forwardRef, HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', width, height, lines = 3, className = '', ...props }, ref) => {
    const baseStyles = 'animate-pulse-soft bg-neutral-200 rounded';

    const variantStyles = {
      text: 'h-4 w-full',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
      card: 'rounded-xl',
    };

    if (variant === 'text') {
      return (
        <div ref={ref} className={`${baseStyles} ${variantStyles[variant]} ${className}`} style={{ width, height }} {...props} aria-hidden="true">
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className={`${baseStyles} ${variantStyles[variant]} mb-2`} style={{ 
              width: i === lines - 1 ? '60%' : '100%',
              height: '1rem'
            }} />
          ))}
        </div>
      );
    }

    return (
      <div 
        ref={ref} 
        className={`${baseStyles} ${variantStyles[variant]} ${className}`} 
        style={{ width, height }} 
        {...props} 
        aria-hidden="true"
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export const CardSkeleton = () => (
  <div className="card-padded animate-pulse-soft" aria-hidden="true">
    <Skeleton variant="rectangular" width="60px" height="60px" className="mb-4 rounded-xl" />
    <Skeleton variant="text" width="80%" lines={1} className="mb-2" />
    <Skeleton variant="text" width="100%" lines={1} className="mb-2" />
    <Skeleton variant="text" width="60%" lines={1} />
  </div>
);

export const HeroSkeleton = () => (
  <div className="max-w-4xl mx-auto text-center space-y-6 animate-pulse-soft" aria-hidden="true">
    <Skeleton variant="text" width="40%" className="mx-auto" />
    <Skeleton variant="text" width="80%" lines={2} className="mx-auto" />
    <div className="flex justify-center gap-4">
      <Skeleton variant="rectangular" width="180px" height="48px" className="rounded-lg" />
      <Skeleton variant="rectangular" width="180px" height="48px" className="rounded-lg" />
    </div>
  </div>
);

export const SectionSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse-soft" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);