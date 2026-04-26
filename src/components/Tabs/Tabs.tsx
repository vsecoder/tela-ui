import type { ReactNode } from 'react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export interface TabItem<T extends string = string> {
  label: ReactNode;
  value: T;
  disabled?: boolean;
}

export interface TabsProps<T extends string = string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

/**
 * Underline tab bar for page-level navigation.
 * Differs from Toggle (pill-switcher) — uses an animated bottom border indicator.
 *
 * ```tsx
 * <Tabs
 *   items={[
 *     { label: 'Обзор',    value: 'overview' },
 *     { label: 'Логи',     value: 'logs' },
 *     { label: 'Настройки', value: 'settings' },
 *   ]}
 *   value={tab}
 *   onChange={setTab}
 * />
 * ```
 */
export const Tabs = <T extends string>({
  items,
  value,
  onChange,
  className,
}: TabsProps<T>) => (
  <div className={cn('ui-tabs', className)} role="tablist">
    {items.map((item) => (
      <button
        key={item.value}
        type="button"
        role="tab"
        aria-selected={item.value === value}
        disabled={item.disabled}
        className={cn('ui-tabs__item', item.value === value && 'ui-tabs__item--active')}
        onClick={() => onChange(item.value)}
      >
        {item.label}
        <Ripple />
      </button>
    ))}
  </div>
);

Tabs.displayName = 'Tabs';
