import type { FC, ReactNode } from 'react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export interface NavbarItem {
  id: string;
  label: string;
  icon: ReactNode;
  /** Icon shown when this tab is active (falls back to icon) */
  activeIcon?: ReactNode;
  badge?: number | string;
}

export interface NavbarProps {
  items: NavbarItem[];
  /** `id` of the currently active tab. */
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

/**
 * Fixed bottom navigation bar for app-level tab switching.
 *
 * ```tsx
 * <Navbar
 *   activeId={tab}
 *   onChange={setTab}
 *   items={[
 *     { id: 'hosts',    label: 'Хосты',    icon: <Server /> },
 *     { id: 'settings', label: 'Настройки', icon: <Gear />   },
 *   ]}
 * />
 * ```
 */
export const Navbar: FC<NavbarProps> = ({ items, activeId, onChange, className }) => (
  <nav className={cn('ui-navbar', className)} role="tablist">
    {items.map((item) => {
      const active = item.id === activeId;
      return (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={active}
          className={cn('ui-navbar__item', active && 'ui-navbar__item--active')}
          onClick={() => onChange(item.id)}
        >
          <span className="ui-navbar__icon">
            {active && item.activeIcon ? item.activeIcon : item.icon}
            {item.badge !== undefined && (
              <span className="ui-navbar__badge">{item.badge}</span>
            )}
          </span>
          <span className="ui-navbar__label">{item.label}</span>
          <Ripple />
        </button>
      );
    })}
  </nav>
);
