import { useState } from 'react';
import type { FC } from 'react';
import { motion } from 'motion/react';
import { cn } from '../cn';

export interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  /** Visual size. Default: `'m'` */
  size?: 's' | 'm' | 'l';
  readonly?: boolean;
  disabled?: boolean;
  className?: string;
}

const SIZES = { s: 16, m: 24, l: 32 };

export const Rating: FC<RatingProps> = ({
  value = 0,
  onChange,
  max = 5,
  size = 'm',
  readonly = false,
  disabled = false,
  className,
}) => {
  const [hovered, setHovered] = useState(0);
  const interactive = !readonly && !disabled;
  const display = interactive && hovered > 0 ? hovered : value;
  const px = SIZES[size];

  return (
    <div
      className={cn('ui-rating', `ui-rating--${size}`, disabled && 'ui-rating--disabled', readonly && 'ui-rating--readonly', className)}
      onMouseLeave={() => setHovered(0)}
    >
      {Array.from({ length: max }, (_, i) => {
        const star = i + 1;
        const filled = display >= star;
        const half = !filled && display >= star - 0.5;

        return (
          <motion.button
            key={star}
            type="button"
            className={cn('ui-rating__star', filled && 'ui-rating__star--filled', half && 'ui-rating__star--half')}
            disabled={!interactive}
            onClick={() => interactive && onChange?.(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            whileTap={interactive ? { scale: 0.82 } : undefined}
            whileHover={interactive ? { scale: 1.15 } : undefined}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            aria-label={`${star} из ${max}`}
          >
            <svg width={px} height={px} viewBox="0 0 24 24" fill="none" aria-hidden>
              {half ? (
                <>
                  <defs>
                    <linearGradient id={`half-${star}`} x1="0" x2="1" y1="0" y2="0">
                      <stop offset="50%" stopColor="currentColor" />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
                    fill={`url(#half-${star})`}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </>
              ) : (
                <path
                  d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
                  fill={filled ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </motion.button>
        );
      })}
    </div>
  );
};
