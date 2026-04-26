import type { FC, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label rendered above the field. */
  header?: ReactNode;
  /** Icon placed to the left of the input. */
  before?: ReactNode;
  /** Icon or element placed to the right of the input. */
  after?: ReactNode;
  /** Validation error message shown below the field; also highlights the border in danger color. */
  error?: string;
}

/** Labeled text input with optional left/right icon slots. */
export const Input: FC<InputProps> = ({ header, before, after, error, className, ...props }) => (
  <label className={cn('ui-input', error && 'ui-input--error', className)}>
    {header && <span className="ui-input__header">{header}</span>}
    <div className="ui-input__field">
      {before && <span className="ui-input__before">{before}</span>}
      <input {...props} />
      {after && <span className="ui-input__after">{after}</span>}
    </div>
    {error && <span className="ui-input__error">{error}</span>}
  </label>
);
