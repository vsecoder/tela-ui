import type { FC } from 'react';
import { motion } from 'motion/react';
import { cn } from '../cn';
import { gentleSpring } from '../motion';

export type ProgressBarColor = 'accent' | 'success' | 'danger' | 'warning';
export type ProgressBarSize  = 's' | 'm' | 'l';

export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: ProgressBarColor;
  size?: ProgressBarSize;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'accent',
  size = 'm',
  label,
  showValue = false,
  className,
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('ui-progress', `ui-progress--${color}`, `ui-progress--${size}`, className)}>
      {(label || showValue) && (
        <div className="ui-progress__header">
          {label && <span className="ui-progress__label">{label}</span>}
          {showValue && (
            <span className="ui-progress__value">{Math.round(pct)}&thinsp;%</span>
          )}
        </div>
      )}
      <div
        className="ui-progress__track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <motion.div
          className="ui-progress__fill"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={gentleSpring}
        />
      </div>
    </div>
  );
};
