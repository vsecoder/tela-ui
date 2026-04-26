import { Fragment } from 'react';
import type { FC, ReactNode } from 'react';
import { Check } from '@gravity-ui/icons';
import { cn } from '../cn';

export type StepStatus = 'pending' | 'active' | 'completed' | 'error';

export interface StepperStep {
  label: ReactNode;
  description?: ReactNode;
  /** Override auto-computed status. */
  status?: StepStatus;
}

export interface StepperProps {
  steps: StepperStep[];
  /** Index of the currently active step (0-based). */
  current: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

function resolveStatus(index: number, current: number, override?: StepStatus): StepStatus {
  if (override) return override;
  if (index < current)  return 'completed';
  if (index === current) return 'active';
  return 'pending';
}

/**
 * Step-by-step progress indicator for multi-step flows (e.g., server creation wizard).
 * Status is auto-computed from `current`; override per-step with `status`.
 *
 * ```tsx
 * <Stepper
 *   steps={[
 *     { label: 'Конфигурация' },
 *     { label: 'Оплата' },
 *     { label: 'Запуск' },
 *   ]}
 *   current={1}
 * />
 * ```
 */
export const Stepper: FC<StepperProps> = ({
  steps,
  current,
  orientation = 'horizontal',
  className,
}) => (
  <div
    className={cn('ui-stepper', `ui-stepper--${orientation}`, className)}
    aria-label="Шаги"
  >
    {steps.map((step, i) => {
      const status = resolveStatus(i, current, step.status);
      const isLast = i === steps.length - 1;
      return (
        <Fragment key={i}>
          <div className={cn('ui-stepper__step', `ui-stepper__step--${status}`)}>
            <span className="ui-stepper__circle" aria-label={`Шаг ${i + 1}: ${status}`}>
              {status === 'completed' ? (
                <Check width={14} height={14} />
              ) : (
                <span className="ui-stepper__num">{i + 1}</span>
              )}
            </span>
            <div className="ui-stepper__label-wrap">
              <span className="ui-stepper__label">{step.label}</span>
              {step.description && (
                <span className="ui-stepper__desc">{step.description}</span>
              )}
            </div>
          </div>
          {!isLast && (
            <span className={cn(
              'ui-stepper__connector',
              status === 'completed' && 'ui-stepper__connector--done',
            )} />
          )}
        </Fragment>
      );
    })}
  </div>
);
