import type { ChangeEventHandler, FC } from 'react';
import { cn } from '../cn';

export interface SwitchProps {
  checked?: boolean;
  /**
   * Standard input change handler — read the new value via `e.target.checked`.
   *
   * ```tsx
   * <Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
   * ```
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

/**
 * Toggle switch rendered as a `role="switch"` checkbox.
 * Use inside a `Cell` `after` slot for settings rows.
 *
 * ```tsx
 * <Cell after={<Switch checked={push} onChange={(e) => setPush(e.target.checked)} />}>
 *   Push-уведомления
 * </Cell>
 * ```
 */
export const Switch: FC<SwitchProps> = ({ checked, onChange, className }) => (
  <input
    type="checkbox"
    role="switch"
    className={cn('ui-switch', className)}
    checked={checked}
    onChange={onChange}
  />
);
