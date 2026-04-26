import type { FC, MouseEventHandler, ReactNode } from 'react';
import { Xmark } from '@gravity-ui/icons';
import { cn } from '../cn';

export type TagVariant = 'neutral' | 'accent' | 'success' | 'danger' | 'warning';
export type TagSize    = 's' | 'm';

export interface TagProps {
  children: ReactNode;
  /** Icon or element placed to the left. */
  before?: ReactNode;
  /** Called when the × button is clicked. Adds the remove button when provided. */
  onRemove?: () => void;
  variant?: TagVariant;
  size?: TagSize;
  /** Make the tag clickable (filter chip). */
  onClick?: MouseEventHandler<HTMLSpanElement>;
  disabled?: boolean;
  className?: string;
}

/**
 * Inline label/chip with optional icon and remove button.
 * For passive read-only badges use Badge instead.
 *
 * ```tsx
 * <Tag variant="accent" before={<Globe />} onRemove={() => remove('eu')}>
 *   eu-west-1
 * </Tag>
 *
 * <Tag variant="success" onClick={() => toggleFilter('ubuntu')}>
 *   Ubuntu 24.04
 * </Tag>
 * ```
 */
export const Tag: FC<TagProps> = ({
  children,
  before,
  onRemove,
  variant = 'neutral',
  size = 'm',
  onClick,
  disabled,
  className,
}) => (
  <span
    className={cn(
      'ui-tag',
      `ui-tag--${variant}`,
      `ui-tag--${size}`,
      onClick && 'ui-tag--interactive',
      disabled && 'ui-tag--disabled',
      className,
    )}
    onClick={disabled ? undefined : onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick && !disabled ? 0 : undefined}
  >
    {before && <span className="ui-tag__before" aria-hidden>{before}</span>}
    <span className="ui-tag__label">{children}</span>
    {onRemove && (
      <button
        type="button"
        className="ui-tag__remove"
        onClick={(e) => { e.stopPropagation(); if (!disabled) onRemove(); }}
        disabled={disabled}
        aria-label="Удалить"
      >
        <Xmark width={10} height={10} />
      </button>
    )}
  </span>
);
