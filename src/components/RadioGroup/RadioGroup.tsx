import type { ReactNode } from 'react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export interface RadioOption<T extends string = string> {
  label: ReactNode;
  value: T;
  description?: ReactNode;
  /** Icon or image placed to the left. */
  before?: ReactNode;
  /** Badge or price placed to the right. */
  after?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps<T extends string = string> {
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** `list` — vertical list (default); `grid` — 2-column card grid. */
  layout?: 'list' | 'grid';
  className?: string;
}

/**
 * Single-select radio group styled as a list or a 2-col card grid.
 * Use for tariff plans, region pickers, OS selection, etc.
 *
 * ```tsx
 * <RadioGroup
 *   layout="grid"
 *   options={[
 *     { value: 'starter', label: 'Starter', description: '1 vCPU / 1 GB',  after: '€3/мес' },
 *     { value: 'pro',     label: 'Pro',     description: '4 vCPU / 8 GB',  after: '€12/мес' },
 *     { value: 'ultra',   label: 'Ultra',   description: '16 vCPU / 32 GB', after: '€48/мес' },
 *   ]}
 *   value={plan}
 *   onChange={setPlan}
 * />
 * ```
 */
export const RadioGroup = <T extends string>({
  options,
  value,
  onChange,
  layout = 'list',
  className,
}: RadioGroupProps<T>) => (
  <div
    className={cn('ui-radio-group', `ui-radio-group--${layout}`, className)}
    role="radiogroup"
  >
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        role="radio"
        aria-checked={opt.value === value}
        disabled={opt.disabled}
        className={cn(
          'ui-radio-option',
          opt.value === value && 'ui-radio-option--checked',
        )}
        onClick={() => onChange(opt.value)}
      >
        {opt.before && <span className="ui-radio-option__before">{opt.before}</span>}
        <span className="ui-radio-option__body">
          <span className="ui-radio-option__label">{opt.label}</span>
          {opt.description && (
            <span className="ui-radio-option__desc">{opt.description}</span>
          )}
        </span>
        {opt.after && <span className="ui-radio-option__after">{opt.after}</span>}
        <span className="ui-radio-option__indicator" aria-hidden />
        <Ripple />
      </button>
    ))}
  </div>
);

RadioGroup.displayName = 'RadioGroup';
