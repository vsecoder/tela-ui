import type { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { snapSpring, tapSpring } from './springs';
import { fade, fadeDown, fadeUp, scaleIn } from './variants';

export type PresenceVariant = 'fade' | 'fadeUp' | 'fadeDown' | 'scaleIn';

export interface PresenceProps {
  /** Controls mount/unmount. */
  show: boolean;
  variant?: PresenceVariant;
  children: ReactNode;
  className?: string;
}

const variantMap = { fade, fadeUp, fadeDown, scaleIn } as const;

const transitionMap: Record<PresenceVariant, object> = {
  fade:     { duration: 0.2 },
  fadeUp:   tapSpring,
  fadeDown: tapSpring,
  scaleIn:  snapSpring,
};

/**
 * AnimatePresence wrapper for transient UI elements.
 *
 * ```tsx
 * <Presence show={isOpen} variant="scaleIn">
 *   <Tooltip />
 * </Presence>
 * ```
 */
export const Presence: FC<PresenceProps> = ({
  show,
  variant = 'fadeUp',
  children,
  className,
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className={className}
        variants={variantMap[variant]}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={transitionMap[variant]}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
