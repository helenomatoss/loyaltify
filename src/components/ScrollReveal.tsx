import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

const animationVariants = {
  'fade-up': {
    hidden: 'opacity-0 translate-y-8',
    visible: 'opacity-100 translate-y-0',
  },
  'fade-down': {
    hidden: 'opacity-0 -translate-y-8',
    visible: 'opacity-100 translate-y-0',
  },
  'fade-left': {
    hidden: 'opacity-0 translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
  'fade-right': {
    hidden: 'opacity-0 -translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
  'scale': {
    hidden: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100',
  },
  'fade': {
    hidden: 'opacity-0',
    visible: 'opacity-100',
  },
};

const ScrollReveal = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({
    threshold,
    triggerOnce,
  });

  const variant = animationVariants[animation];
  const transitionDelay = delay ? `${delay}ms` : '0ms';
  const transitionDuration = `${duration}ms`;

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${
        isVisible ? variant.visible : variant.hidden
      } ${className}`}
      style={{
        transitionDelay,
        transitionDuration,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
