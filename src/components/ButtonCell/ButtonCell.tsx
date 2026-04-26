import type { FC, MouseEventHandler, ReactNode } from 'react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export interface ButtonCellProps {
  /** Icon placed to the left of the label. */
  before?: ReactNode;
  /** Element placed to the right of the label. */
  after?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
}

/**
 * Full-width tappable row that renders as a `<button>` — use inside `Section`.
 * For navigation rows rendered as `<div>` use `Cell` with an `onClick` prop.
 *
 * ```tsx
 * <Section>
 *   <ButtonCell before={<ArrowRotateRight />} onClick={handleRestart}>
 *     Перезапустить
 *   </ButtonCell>
 *   <ButtonCell before={<TrashBin />} onClick={handleDelete}>
 *     Удалить хост
 *   </ButtonCell>
 * </Section>
 * ```
 */
export const ButtonCell: FC<ButtonCellProps> = ({
  children,
  before,
  after,
  disabled,
  onClick,
  className,
}) => (
  <button
    className={cn('ui-button-cell', className)}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    {before && <span className="ui-button-cell__before">{before}</span>}
    <span className="ui-button-cell__content">{children}</span>
    {after && <span className="ui-button-cell__after">{after}</span>}
    <Ripple />
  </button>
);
