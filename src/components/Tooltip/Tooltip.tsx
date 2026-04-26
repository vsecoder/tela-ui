import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../cn';
import { snapSpring } from '../motion';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  children: ReactNode;
  className?: string;
}

/**
 * Lightweight tooltip that appears on hover (desktop) or tap (mobile).
 * Wraps any element — no extra markup required in the child.
 *
 * ```tsx
 * <Tooltip content="Скопировать IP-адрес">
 *   <button><Copy /></button>
 * </Tooltip>
 * ```
 */
export const Tooltip: FC<TooltipProps> = ({
  content,
  placement = 'top',
  children,
  className,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <span
      className={cn('ui-tooltip-wrap', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            className={cn('ui-tooltip', `ui-tooltip--${placement}`)}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={snapSpring}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
