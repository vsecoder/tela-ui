import type { FC } from 'react';
import { ChevronRight } from '@gravity-ui/icons';
import { cn } from '../cn';

interface NavigationProps {
  className?: string;
}

/** Chevron arrow used as a trailing disclosure indicator on list rows. */
export const Navigation: FC<NavigationProps> = ({ className }) => (
  <span className={cn('ui-navigation', className)} aria-hidden>
    <ChevronRight width={16} height={16} />
  </span>
);
