import type { ElementType, FC, MouseEventHandler, ReactNode } from 'react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export interface CellProps {
  /** Icon or avatar placed to the left of the content. */
  before?: ReactNode;
  /** Element placed to the right of the content (e.g. a badge or amount). */
  after?: ReactNode;
  /** Second line below `after` — useful for stacking a value and its delta (e.g. price + change %). */
  afterSub?: ReactNode;
  /** Secondary line below the title. */
  subtitle?: ReactNode;
  /** Third line with additional detail. */
  description?: ReactNode;
  /** Inline label between content and `after` (e.g. "selected"). */
  hint?: ReactNode;
  /** When true the title may wrap to multiple lines. */
  multiline?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
  /** Render the root element as a custom component (e.g. react-router `Link`). */
  Component?: ElementType;
  [key: string]: unknown;
}

/** General-purpose list row with slots for icon, title, subtitle, hint, and trailing element. */
export const Cell: FC<CellProps> = (props) => {
  const {
    children,
    before,
    after,
    afterSub,
    subtitle,
    description,
    hint,
    multiline: _m,
    className,
    onClick,
    Component: Root = 'div',
    ...rest
  } = props;
  const rootProps = rest as Record<string, unknown>;
  const interactive = Boolean(onClick) || Root !== 'div';

  return (
    <Root
      className={cn('ui-cell', interactive && 'ui-cell--interactive', className)}
      onClick={onClick}
      {...rootProps}
    >
      {before && <div className="ui-cell__before">{before}</div>}
      <div className="ui-cell__content">
        <div className="ui-cell__title">{children}</div>
        {subtitle && <div className="ui-cell__subtitle">{subtitle}</div>}
        {description && <div className="ui-cell__description">{description}</div>}
      </div>
      {hint && <div className="ui-cell__hint">{hint}</div>}
      {(after || afterSub) && (
        <div className="ui-cell__after">
          {after    && <span className="ui-cell__after-main">{after}</span>}
          {afterSub && <span className="ui-cell__after-sub">{afterSub}</span>}
        </div>
      )}
      {interactive && <Ripple />}
    </Root>
  );
};
