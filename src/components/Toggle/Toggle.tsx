import { useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export interface ToggleOption<T extends string = string> {
  label: ReactNode;
  value: T;
  disabled?: boolean;
}

interface ToggleProps<T extends string = string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

/**
 * Segmented pill-switcher with a sliding indicator that moves to the selected item.
 *
 * ```tsx
 * const [tab, setTab] = useState('ton');
 * <Toggle
 *   options={[{ label: 'Крипто', value: 'crypto' }, { label: 'TON', value: 'ton' }]}
 *   value={tab}
 *   onChange={setTab}
 * />
 * ```
 */
export const Toggle = <T extends string>({
  options,
  value,
  onChange,
  className,
}: ToggleProps<T>) => {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const idx = options.findIndex((o) => o.value === value);
    const el = itemRefs.current[idx];
    if (!el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [value, options]);

  return (
    <div className={cn('ui-toggle', className)} role="tablist">
      {pill && (
        <span
          className="ui-toggle__pill"
          style={{ left: pill.left, width: pill.width }}
        />
      )}
      {options.map((opt, i) => (
        <button
          key={opt.value}
          ref={(el) => { itemRefs.current[i] = el; }}
          type="button"
          role="tab"
          aria-selected={opt.value === value}
          disabled={opt.disabled}
          className={cn(
            'ui-toggle__item',
            opt.value === value && 'ui-toggle__item--active',
          )}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
          <Ripple />
        </button>
      ))}
    </div>
  );
};

Toggle.displayName = 'Toggle';
