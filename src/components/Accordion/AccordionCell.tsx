import { useId, useRef, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export interface AccordionCellProps {
  /** Cell title (question for FAQ) */
  title: ReactNode;
  /** Expandable content (answer for FAQ) */
  children: ReactNode;
  /** Icon placed to the left */
  before?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const AccordionCell: FC<AccordionCellProps> = ({
  title,
  children,
  before,
  defaultOpen = false,
  className,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn('ui-accordion-cell', open && 'ui-accordion-cell--open', className)}>
      <button
        type="button"
        className="ui-accordion-cell__trigger"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((v) => !v)}
      >
        {before && <span className="ui-accordion-cell__before">{before}</span>}
        <span className="ui-accordion-cell__title">{title}</span>
        <span className="ui-accordion-cell__chevron" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <Ripple />
      </button>
      <div
        id={bodyId}
        ref={bodyRef}
        className="ui-accordion-cell__body"
        style={open
          ? { maxHeight: bodyRef.current?.scrollHeight ?? 9999 }
          : { maxHeight: 0 }
        }
      >
        <div className="ui-accordion-cell__content">{children}</div>
      </div>
    </div>
  );
};
