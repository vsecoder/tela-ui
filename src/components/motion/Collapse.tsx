import type { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { collapseSpring } from './springs';

export interface CollapseProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Animates height between 0 and auto when `open` toggles.
 */
export const Collapse: FC<CollapseProps> = ({ open, children, className }) => (
  <AnimatePresence initial={false}>
    {open && (
      <motion.div
        className={className}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={collapseSpring}
        style={{ overflow: 'hidden' }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
