import type { FC, ReactNode } from 'react';
import { cn } from '../cn';

export interface DividerProps {
  label?: ReactNode;
  className?: string;
}

export const Divider: FC<DividerProps> = ({ label, className }) => (
  <div
    className={cn('ui-divider', label ? 'ui-divider--labeled' : '', className)}
    role="separator"
    aria-orientation="horizontal"
  >
    {label && <span className="ui-divider__label">{label}</span>}
  </div>
);
