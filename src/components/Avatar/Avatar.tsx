import type { FC, ReactNode } from 'react';
import { cn } from '../cn';

export interface AvatarProps {
  /** Image URL. When absent a grey circle fallback is rendered. */
  src?: string;
  /** Diameter in pixels (default 40). */
  size?: number;
  /** Badge to display in the bottom-right corner (e.g. online status dot). */
  badge?: ReactNode;
  className?: string;
}

/** Circular user avatar with optional corner badge. */
export const Avatar: FC<AvatarProps> = ({ src, size = 40, badge, className }) => {
  const image = src ? (
    <img
      src={src}
      width={size}
      height={size}
      className="ui-avatar"
      alt=""
    />
  ) : (
    <div
      className="ui-avatar ui-avatar--fallback"
      style={{ width: size, height: size }}
      aria-hidden
    />
  );

  if (!badge) {
    return <span className={cn('ui-avatar-wrap', className)}>{image}</span>;
  }

  return (
    <span className={cn('ui-avatar-wrap ui-badge-anchor ui-badge-anchor--bottom-right', className)}>
      {image}
      <span className="ui-badge-anchor__badge">{badge}</span>
    </span>
  );
};
