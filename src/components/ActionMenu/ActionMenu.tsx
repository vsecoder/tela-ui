import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { FC, ReactNode } from 'react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export interface ActionMenuItem {
  id: string;
  icon?: ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  trigger: ReactNode;
  title?: string;
  className?: string;
}

export const ActionMenu: FC<ActionMenuProps> = ({ items, trigger, title, className }) => {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleOverlayPointerDown = (e: React.PointerEvent) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  const handleItemClick = (e: React.MouseEvent, item: ActionMenuItem) => {
    // Stop propagation so the click does not bubble from the portal
    // through the React tree back to the trigger's onClick.
    e.stopPropagation();
    setOpen(false);
    item.onClick?.();
  };

  const portalTarget = document.querySelector('.app-root') ?? document.body;

  const overlay = open ? createPortal(
    <div
      className="ui-action-menu-overlay"
      onPointerDown={handleOverlayPointerDown}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={sheetRef}
        className="ui-action-menu"
        onPointerDown={(e) => e.stopPropagation()}
        role="menu"
      >
        {title && <div className="ui-action-menu__title">{title}</div>}
        <ul className="ui-action-menu__list">
          {items.map((item, i) => (
            <li key={item.id} className="ui-action-menu__item-li">
              {i > 0 && <div className="ui-action-menu__divider" />}
              <button
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={cn(
                  'ui-action-menu__item',
                  item.danger && 'ui-action-menu__item--danger',
                )}
                onClick={(e) => handleItemClick(e, item)}
              >
                {item.icon && (
                  <span className="ui-action-menu__item-icon">{item.icon}</span>
                )}
                <span className="ui-action-menu__item-text">
                  <span className="ui-action-menu__item-label">{item.label}</span>
                  {item.description && (
                    <span className="ui-action-menu__item-desc">{item.description}</span>
                  )}
                </span>
                <Ripple />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    portalTarget,
  ) : null;

  return (
    <>
      <span
        className={cn('ui-action-menu__trigger', className)}
        onClick={handleTriggerClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); setOpen(true); } }}
      >
        {trigger}
      </span>
      {overlay}
    </>
  );
};
