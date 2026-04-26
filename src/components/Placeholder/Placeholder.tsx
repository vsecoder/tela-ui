import type { FC, ReactNode } from 'react';
import { cn } from '../cn';

export interface PlaceholderProps {
  /** Bold heading text. */
  header?: ReactNode;
  /** Supporting detail below the header. */
  description?: ReactNode;
  /** Optional illustration or action element. */
  children?: ReactNode;
  className?: string;
}

/** Empty-state or error-state display with a heading and optional illustration. */
export const Placeholder: FC<PlaceholderProps> = ({
  header,
  description,
  children,
  className,
}) => (
  <div className={cn('ui-placeholder', className)} role="status">
    {header && <div className="ui-placeholder__header">{header}</div>}
    {description && <div className="ui-placeholder__description">{description}</div>}
    {children}
  </div>
);
