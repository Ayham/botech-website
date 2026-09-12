import { useState, forwardRef, ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ priority = false, placeholder = 'empty', blurDataURL, className = '', ...props }, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    if (hasError) {
      return (
        <div
          ref={ref}
          className={`${className} bg-neutral-100 flex items-center justify-center`}
          aria-hidden="true"
        >
          <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      );
    }

    return (
      <img
        ref={ref}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoading(false)}
        onError={() => { setHasError(true); setIsLoading(false); }}
        className={`
          transition-opacity duration-300
          ${isLoading && placeholder === 'blur' ? 'opacity-0' : 'opacity-100'}
          ${isLoading && placeholder === 'blur' && blurDataURL ? 'blur-sm' : ''}
          ${className}
        `}
        {...props}
      />
    );
  }
);

Image.displayName = 'Image';
