import type { FC, ReactNode } from 'react';
import { motion } from 'motion/react';
import { snapSpring } from './springs';

export interface ScaleInProps {
  children: ReactNode;
  /** Initial scale factor. Default 0.88. */
  initialScale?: number;
  delay?: number;
  className?: string;
}

export const ScaleIn: FC<ScaleInProps> = ({
  children,
  initialScale = 0.88,
  delay = 0,
  className,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: initialScale }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ ...snapSpring, delay }}
  >
    {children}
  </motion.div>
);
