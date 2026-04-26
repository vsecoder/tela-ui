import type { FC, ReactNode } from 'react';
import { cn } from '../cn';

export type BadgePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface BadgeAnchorProps {
  badge: ReactNode;
  placement?: BadgePlacement;
  children: ReactNode;
  className?: string;
}

/** Wraps any element and positions a badge in its corner. */
export const BadgeAnchor: FC<BadgeAnchorProps> = ({
  badge,
  placement = 'top-right',
  children,
  className,
}) => (
  <span className={cn('ui-badge-anchor', `ui-badge-anchor--${placement}`, className)}>
    {children}
    <span className="ui-badge-anchor__badge">{badge}</span>
  </span>
);

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'danger' | 'warning';
export type BadgeSize    = 's' | 'm';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Render a colored dot before the label. */
  dot?: boolean;
  /**
   * Notification counter. When provided with no `children`,
   * renders a compact count pill (capped at 99+).
   */
  count?: number;
  children?: ReactNode;
  className?: string;
}

export const Badge: FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'm',
  dot = false,
  count,
  children,
  className,
}) => {
  const isCountOnly = count !== undefined && !children;
  const label = isCountOnly
    ? count > 99 ? '99+' : String(count)
    : children;

  return (
    <span
      className={cn(
        'ui-badge',
        `ui-badge--${variant}`,
        `ui-badge--${size}`,
        isCountOnly && 'ui-badge--count',
        className,
      )}
    >
      {dot && !isCountOnly && <span className="ui-badge__dot" aria-hidden />}
      {label}
    </span>
  );
};
