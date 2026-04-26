import type { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { gentleSpring } from './springs';

export interface NumberPopProps {
  /** Change this value to trigger the bounce animation. */
  animKey: string | number;
  children: ReactNode;
  className?: string;
}

/**
 * Plays a quick scale-bounce whenever `animKey` changes.
 * Useful for live counters, scores, and stats that update in place.
 *
 * ```tsx
 * <NumberPop animKey={count}>{count}</NumberPop>
 * ```
 */
export const NumberPop: FC<NumberPopProps> = ({ animKey, children, className }) => (
  <AnimatePresence mode="popLayout">
    <motion.span
      key={animKey}
      className={className}
      initial={{ scale: 1.5, opacity: 0 }}
      animate={{ scale: 1,   opacity: 1 }}
      exit={{    scale: 0.5, opacity: 0 }}
      transition={gentleSpring}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.span>
  </AnimatePresence>
);
