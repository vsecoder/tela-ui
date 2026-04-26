import { createContext, useContext, useId, useLayoutEffect, useRef, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

/* ---- Context (single-open mode) ------------------------------------------ */

interface AccordionCtx {
  openId: string | null;
  toggle: (id: string) => void;
  /** Opens this id only if nothing is open yet — used by defaultOpen in single mode. */
  openIfEmpty: (id: string) => void;
}

const AccordionContext = createContext<AccordionCtx | null>(null);

/* ---- AccordionItem -------------------------------------------------------- */

export interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  /** Icon placed before the title */
  before?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const AccordionItem: FC<AccordionItemProps> = ({
  title,
  children,
  before,
  defaultOpen = false,
  className,
}) => {
  const itemId  = useId();
  const bodyId  = useId();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [localOpen, setLocalOpen] = useState(defaultOpen);

  const ctx  = useContext(AccordionContext);
  const open = ctx ? ctx.openId === itemId : localOpen;

  useLayoutEffect(() => {
    if (ctx && defaultOpen) ctx.openIfEmpty(itemId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = () => {
    if (ctx) ctx.toggle(itemId);
    else setLocalOpen((v) => !v);
  };

  return (
    <div className={cn('ui-accordion-item', open && 'ui-accordion-item--open', className)}>
      <button
        type="button"
        className="ui-accordion-item__trigger"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={handleToggle}
      >
        {before && <span className="ui-accordion-item__before">{before}</span>}
        <span className="ui-accordion-item__title">{title}</span>
        <span className="ui-accordion-item__chevron" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <Ripple />
      </button>
      <div
        id={bodyId}
        ref={bodyRef}
        className="ui-accordion-item__body"
        style={open
          ? { maxHeight: bodyRef.current?.scrollHeight ?? 9999 }
          : { maxHeight: 0 }
        }
      >
        <div className="ui-accordion-item__content">{children}</div>
      </div>
    </div>
  );
};

/* ---- Accordion (group wrapper) ------------------------------------------- */

export interface AccordionProps {
  children: ReactNode;
  /** Only one item may be open at a time — opening a new item collapses the previous one. */
  single?: boolean;
  className?: string;
}

/**
 * Expandable list of items. Each `AccordionItem` manages its own open state independently
 * unless `single` is set, in which case only one item may be open at a time.
 *
 * ```tsx
 * <Accordion single>
 *   <AccordionItem title="Что входит в тариф Pro?">
 *     4 vCPU, 8 GB RAM, 100 GB SSD — без ограничений по трафику.
 *   </AccordionItem>
 *   <AccordionItem title="Как отменить подписку?">
 *     В разделе «Подписка» нажмите «Отменить».
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion: FC<AccordionProps> = ({ children, single = false, className }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const ctx: AccordionCtx | null = single
    ? {
        openId,
        toggle:      (id) => setOpenId((prev) => (prev === id ? null : id)),
        openIfEmpty: (id) => setOpenId((prev) => (prev === null ? id : prev)),
      }
    : null;

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={cn('ui-accordion', className)}>{children}</div>
    </AccordionContext.Provider>
  );
};
