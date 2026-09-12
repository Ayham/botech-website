import { HTMLAttributes, forwardRef, useRef, useEffect, useState } from 'react';

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
}

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  ({ children, delay = 0, className = '', direction = 'up', ...props }, _ref) => {
    const revealRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const element = revealRef.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(element);
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      observer.observe(element);
      return () => observer.disconnect();
    }, []);

    const directionStyles = {
      up: 'translate-y-8',
      down: '-translate-y-8',
      left: 'translate-x-8',
      right: '-translate-x-8',
      scale: 'scale-95',
      none: '',
    };

    const transformClass = isVisible ? '' : directionStyles[direction];

    return (
      <div
        ref={revealRef}
        className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0'} ${transformClass} ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Reveal.displayName = 'Reveal';

export const RevealStagger = ({ 
  children, 
  className = '', 
  delayStep = 100,
  direction = 'up',
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string;
  delayStep?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
} & HTMLAttributes<HTMLDivElement>) => {
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div
      className={className}
      {...props}
    >
      {childArray.map((child, index) => (
        <Reveal 
          key={index} 
          delay={index * delayStep} 
          direction={direction}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
};

RevealStagger.displayName = 'RevealStagger';