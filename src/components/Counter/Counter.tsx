import { useRef, useState } from 'react';
import type { FC } from 'react';
import NumberFlow from '@number-flow/react';
import { motion } from 'motion/react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';
import { tapSpring, pressIcon } from '../motion';

export interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Visual size. `'m'` (default) — 44 px tall; `'s'` — 32 px tall. */
  size?: 'm' | 's';
  disabled?: boolean;
  className?: string;
}

export const Counter: FC<CounterProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  size = 'm',
  disabled,
  className,
}) => {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const canDec = !disabled && (min === undefined || value - step >= min);
  const canInc = !disabled && (max === undefined || value + step <= max);

  const iconSize = size === 's' ? 12 : 16;

  const startEdit = () => {
    if (disabled) return;
    setDraft(String(value));
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const commitEdit = () => {
    const parsed = parseInt(draft, 10);
    if (!Number.isNaN(parsed)) {
      const clamped = Math.min(
        max ?? Infinity,
        Math.max(min ?? -Infinity, parsed),
      );
      onChange(clamped);
    }
    setEditing(false);
  };

  return (
    <div className={cn('ui-counter', size === 's' && 'ui-counter--s', disabled && 'ui-counter--disabled', className)}>
      <motion.button
        type="button"
        className="ui-counter__btn"
        initial="rest"
        whileTap={canDec ? 'tap' : undefined}
        transition={tapSpring}
        onClick={() => canDec && onChange(value - step)}
        disabled={!canDec}
        aria-label="Уменьшить"
      >
        <motion.span variants={pressIcon} transition={tapSpring}>
          <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </motion.span>
        <Ripple />
      </motion.button>

      <span
        className="ui-counter__value"
        aria-live="polite"
        title="Нажмите для ввода"
      >
        {editing ? (
          <input
            ref={inputRef}
            className="ui-counter__input"
            type="number"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitEdit();
              if (e.key === 'Escape') setEditing(false);
            }}
          />
        ) : (
          <span
            onClick={startEdit}
            style={{ cursor: disabled ? 'default' : 'text', userSelect: 'none' }}
          >
            <NumberFlow value={value} />
          </span>
        )}
      </span>

      <motion.button
        type="button"
        className="ui-counter__btn"
        initial="rest"
        whileTap={canInc ? 'tap' : undefined}
        transition={tapSpring}
        onClick={() => canInc && onChange(value + step)}
        disabled={!canInc}
        aria-label="Увеличить"
      >
        <motion.span variants={pressIcon} transition={tapSpring}>
          <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </motion.span>
        <Ripple />
      </motion.button>
    </div>
  );
};
