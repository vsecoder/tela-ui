import type { FC, ReactNode } from 'react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export interface ChipProps {
  children: ReactNode;
  before?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Chip: FC<ChipProps> = ({
  children,
  before,
  selected = false,
  disabled = false,
  onClick,
  className,
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    aria-pressed={selected}
    className={cn('ui-chip', selected && 'ui-chip--selected', className)}
  >
    {before && <span className="ui-chip__before">{before}</span>}
    <span className="ui-chip__label">{children}</span>
    <Ripple />
  </button>
);

export interface ChipGroupProps {
  children: ReactNode;
  className?: string;
}

export const ChipGroup: FC<ChipGroupProps> = ({ children, className }) => (
  <div className={cn('ui-chip-group', className)} role="group">
    {children}
  </div>
);
