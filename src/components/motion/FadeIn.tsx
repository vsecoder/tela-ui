import type { FC, ReactNode } from 'react';
import { motion } from 'motion/react';
import { tapSpring } from './springs';

export type FadeInDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface FadeInProps {
  children: ReactNode;
  /** Direction to slide in from. Default: 'up'. */
  from?: FadeInDirection;
  delay?: number;
  /** Fixed duration (seconds). Omit to use the default spring. */
  duration?: number;
  className?: string;
}

const OFFSET = 12;

function makeVariants(from: FadeInDirection) {
  const isX  = from === 'left' || from === 'right';
  const sign = from === 'down' || from === 'right' ? -1 : 1;
  const val  = from === 'none' ? 0 : OFFSET * sign;
  const axis = isX ? 'x' : 'y';
  return {
    hidden:  { opacity: 0, [axis]: val },
    visible: { opacity: 1, [axis]: 0  },
  };
}

export const FadeIn: FC<FadeInProps> = ({
  children,
  from = 'up',
  delay = 0,
  duration,
  className,
}) => (
  <motion.div
    className={className}
    variants={makeVariants(from)}
    initial="hidden"
    animate="visible"
    transition={duration ? { duration, delay } : { ...tapSpring, delay }}
  >
    {children}
  </motion.div>
);
