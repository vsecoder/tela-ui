import { type FC, type ReactNode, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../cn';
import { snackbarSpring } from '../motion';

export type SnackbarVariant = 'default' | 'success' | 'danger' | 'warning' | 'info';

export interface SnackbarProps {
  variant?: SnackbarVariant;
  /** Icon placed to the left of the message. */
  before?: ReactNode;
  /** Secondary line below the main message. */
  description?: ReactNode;
  /** Auto-dismiss delay in ms. Default 4000. Pass `0` to disable auto-dismiss. */
  duration?: number;
  /** Called after the exit animation completes. */
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
}

const SWIPE_DISMISS = 64;

const enterExit = {
  initial:    { y: 24, opacity: 0, scale: 0.94 },
  animate:    { y: 0,  opacity: 1, scale: 1    },
  exit:       { y: 24, opacity: 0, scale: 0.94 },
  transition: snackbarSpring,
} as const;

/**
 * Temporary notification that auto-dismisses and can be swiped away horizontally.
 * Renders at the position of its parent — wrap in a fixed container for toast-style placement.
 *
 * ```tsx
 * {toast && (
 *   <div style={{ position: 'fixed', bottom: 16, left: 0, right: 0, zIndex: 9999 }}>
 *     <Snackbar variant="success" before={<CircleCheck />} onClose={() => setToast(null)}>
 *       Хост запущен
 *     </Snackbar>
 *   </div>
 * )}
 * ```
 */
export const Snackbar: FC<SnackbarProps> = ({
  variant = 'default',
  children,
  description,
  before,
  duration = 4000,
  onClose,
  className,
}) => {
  const [visible, setVisible] = useState(true);
  const dismiss = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (!duration) return;
    const t = setTimeout(dismiss, duration);
    return () => clearTimeout(t);
  }, [duration, dismiss]);

  return (
    <AnimatePresence onExitComplete={onClose}>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          className={cn(
            'ui-snackbar',
            variant !== 'default' && `ui-snackbar--${variant}`,
            className,
          )}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={{ left: 0.35, right: 0.35 }}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > SWIPE_DISMISS) dismiss();
          }}
          {...enterExit}
        >
          {before && <span className="ui-snackbar__before">{before}</span>}
          <div className="ui-snackbar__body">
            <span className="ui-snackbar__message">{children}</span>
            {description && <span className="ui-snackbar__description">{description}</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
