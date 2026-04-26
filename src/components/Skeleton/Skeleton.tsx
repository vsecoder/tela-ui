import type { FC, PropsWithChildren } from 'react';
import { cn } from '../cn';

interface SkeletonProps {
  /** When true the skeleton shimmer overlay is shown. */
  visible?: boolean;
  className?: string;
}

/** Wraps content with a loading shimmer overlay while `visible` is true. */
export const Skeleton: FC<PropsWithChildren<SkeletonProps>> = ({
  children,
  visible,
  className,
}) => (
  <div
    className={cn('ui-skeleton', visible && 'ui-skeleton--visible', className)}
    aria-busy={visible}
  >
    {children}
  </div>
);
