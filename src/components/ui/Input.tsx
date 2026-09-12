import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, LabelHTMLAttributes, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, fullWidth = true, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const [isFocused, setIsFocused] = useState(false);
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 mb-2 group">
            {label}
            {props.required && <span className="text-primary-600 ml-1" aria-hidden="true">*</span>}
            {hint && !error && (
              <span className="ml-2 text-xs text-neutral-400 group-hover:text-neutral-500 transition-colors">
                ({hint})
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-3 text-base bg-white border rounded-lg 
              placeholder:text-neutral-400 
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
              transition-all duration-200
              ${error ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-neutral-300'}
              ${isFocused && !error ? 'border-primary-500 ring-2 ring-primary-500/20' : ''}
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" aria-hidden="true">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600 flex items-center gap-1 animate-fade-in" role="alert">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-neutral-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, fullWidth = true, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const [isFocused, setIsFocused] = useState(false);
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 mb-2 group">
            {label}
            {props.required && <span className="text-primary-600 ml-1" aria-hidden="true">*</span>}
            {hint && !error && (
              <span className="ml-2 text-xs text-neutral-400 group-hover:text-neutral-500 transition-colors">
                ({hint})
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-3 text-base bg-white border rounded-lg 
              placeholder:text-neutral-400 
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
              transition-all duration-200 resize-y min-h-[120px]
              ${error ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-neutral-300'}
              ${isFocused && !error ? 'border-primary-500 ring-2 ring-primary-500/20' : ''}
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {error && (
            <div className="absolute right-3 top-3 text-red-500" aria-hidden="true">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600 flex items-center gap-1 animate-fade-in" role="alert">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-neutral-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className = '', ...props }, ref) => (
    <label
      ref={ref}
      className={`block text-sm font-medium text-neutral-700 mb-2 ${className}`}
      {...props}
    >
      {children}
    </label>
  )
);
Label.displayName = 'Label';