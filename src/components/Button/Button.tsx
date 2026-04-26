import type { MouseEventHandler, ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';
import { buttonSpring, pressSoft } from '../motion';

export interface ButtonProps {
  /** Visual height preset. Default: `'l'` (48px). */
  size?: 's' | 'm' | 'l';
  /**
   * Color/style variant.
   * - `'default'` — filled accent (primary action)
   * - `'outline'` — accent border, transparent fill (secondary action)
   * - `'plain'`   — no background, link-colored text (ghost)
   * - `'link'`    — bare text, no padding or background (inline use)
   * - `'danger'`  — red fill (destructive action)
   * - `'success'` — green fill (confirmation)
   */
  mode?: 'default' | 'outline' | 'plain' | 'link' | 'danger' | 'success';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
  /** Icon or element placed before the label. */
  before?: ReactNode;
  /** Icon or element placed after the label. */
  after?: ReactNode;
  /** Expand to full container width. */
  stretched?: boolean;
}

/**
 * Primary action button with ripple feedback and spring press animation.
 * Place it directly inside `<List>`, not inside `<Section>`.
 *
 * ```tsx
 * <Button size="l" stretched onClick={handleSubmit}>
 *   Создать хост
 * </Button>
 *
 * <Button size="m" mode="outline" before={<Plus />}>
 *   Добавить
 * </Button>
 * ```
 */
export const Button = ({
  children,
  before,
  after,
  disabled,
  onClick,
  mode = 'default',
  type = 'button',
  size,
  stretched,
  className,
}: ButtonProps) => (
  <motion.button
    className={cn(
      'ui-button',
      size && `ui-button--${size}`,
      stretched && 'ui-button--stretched',
      mode === 'outline' && 'ui-button--outline',
      mode === 'plain'   && 'ui-button--plain',
      mode === 'link'    && 'ui-button--link',
      mode === 'danger'  && 'ui-button--danger',
      mode === 'success' && 'ui-button--success',
      className,
    )}
    disabled={disabled}
    onClick={onClick}
    type={type}
    initial="rest"
    whileTap={disabled ? undefined : 'tap'}
    variants={pressSoft}
    transition={buttonSpring}
  >
    {before && <span className="ui-button__before">{before}</span>}
    {children && <span className="ui-button__content">{children}</span>}
    {after && <span className="ui-button__after">{after}</span>}
    <Ripple />
  </motion.button>
);
