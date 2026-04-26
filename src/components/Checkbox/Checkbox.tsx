import type { ChangeEventHandler, FC, ReactNode } from 'react';
import { cn } from '../cn';

export interface CheckboxProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  /** Primary label text. */
  label?: ReactNode;
  /** Secondary description below the label. */
  description?: ReactNode;
  disabled?: boolean;
  /** Shows a dash instead of a checkmark — for "select all" with partial selection. */
  indeterminate?: boolean;
  className?: string;
}

/**
 * Accessible checkbox with optional label and description.
 * For binary on/off settings use Switch instead.
 *
 * ```tsx
 * <Checkbox
 *   checked={agreed}
 *   onChange={(e) => setAgreed(e.target.checked)}
 *   label="Принять условия"
 *   description="Продолжая, вы соглашаетесь с условиями использования"
 * />
 * ```
 */
export const Checkbox: FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled,
  indeterminate,
  className,
}) => (
  <label className={cn('ui-checkbox', disabled && 'ui-checkbox--disabled', className)}>
    <span className="ui-checkbox__control">
      <input
        type="checkbox"
        className="ui-checkbox__input"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        ref={(el) => { if (el) el.indeterminate = !!indeterminate; }}
      />
      <span className="ui-checkbox__box" aria-hidden />
    </span>
    {(label || description) && (
      <span className="ui-checkbox__text">
        {label && <span className="ui-checkbox__label">{label}</span>}
        {description && <span className="ui-checkbox__desc">{description}</span>}
      </span>
    )}
  </label>
);
