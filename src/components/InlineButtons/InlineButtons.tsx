import type { FC, MouseEventHandler, PropsWithChildren, ReactNode } from 'react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export interface InlineButtonsItemProps {
  /** Small label rendered below the icon. */
  text?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Icon element placed in the center of the button. */
  children?: ReactNode;
  className?: string;
}

/** Single action button inside an `InlineButtons` group. */
const InlineButtonsItem: FC<InlineButtonsItemProps> = ({
  children,
  text,
  disabled,
  onClick,
  className,
}) => (
  <button
    className={cn('ui-inline-buttons__item', className)}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    <span className="ui-inline-buttons__icon">{children}</span>
    {text !== undefined && <span className="ui-inline-buttons__text">{text}</span>}
    <Ripple />
  </button>
);

export interface InlineButtonsProps {
  /**
   * `'scroll'` — overflows horizontally when items don't fit (use for 4+ actions).
   * Default: wraps to a new line.
   */
  mode?: 'scroll' | 'wrap';
  className?: string;
}

/**
 * Horizontal row of equal-width icon+label action buttons.
 * Attach individual actions as `<InlineButtons.Item>` children.
 *
 * ```tsx
 * <InlineButtons>
 *   <InlineButtons.Item text="Запустить" onClick={start}><Play /></InlineButtons.Item>
 *   <InlineButtons.Item text="Стоп"      onClick={stop}><Stop /></InlineButtons.Item>
 *   <InlineButtons.Item text="Рестарт"   onClick={restart}><ArrowRotateRight /></InlineButtons.Item>
 * </InlineButtons>
 * ```
 */
export const InlineButtons = Object.assign(
  (({ children, mode, className }: PropsWithChildren<InlineButtonsProps>) => (
    <div
      className={cn('ui-inline-buttons', mode === 'scroll' && 'ui-inline-buttons--scroll', className)}
      role="group"
    >
      {children}
    </div>
  )) as FC<PropsWithChildren<InlineButtonsProps>>,
  { Item: InlineButtonsItem },
);
