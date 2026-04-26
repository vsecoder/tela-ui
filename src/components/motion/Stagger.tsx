import type { FC, ReactNode } from 'react';
import { Children, isValidElement } from 'react';
import { FadeIn } from './FadeIn';
import type { FadeInDirection } from './FadeIn';

export interface StaggerProps {
  children: ReactNode;
  /** Delay before the first child. Default 0. */
  delay?: number;
  /** Per-child stagger delay in seconds. Default 0.07. */
  stagger?: number;
  from?: FadeInDirection;
  className?: string;
}

/**
 * Wraps each direct child in a `FadeIn` with an increasing delay,
 * producing a staggered entrance effect.
 */
export const Stagger: FC<StaggerProps> = ({
  children,
  delay = 0,
  stagger = 0.07,
  from = 'up',
  className,
}) => (
  <div className={className}>
    {Children.map(children, (child, i) =>
      isValidElement(child) ? (
        <FadeIn key={i} from={from} delay={delay + i * stagger}>
          {child}
        </FadeIn>
      ) : child,
    )}
  </div>
);
