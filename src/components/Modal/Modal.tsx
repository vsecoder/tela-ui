import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { FC, ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../cn';
import { snapSpring } from '../motion';

export interface ModalProps {
  /** Whether the modal is visible. */
  open: boolean;
  /** Called when the user dismisses the modal (overlay tap, drag-down, Escape key). */
  onClose: () => void;
  /** Text or element rendered in the modal header. */
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const VELOCITY_THRESHOLD = 0.4;
const DISTANCE_THRESHOLD = 0.25;

function dampen(y: number): number {
  if (y >= 0) return Math.pow(y, 0.8);
  return -Math.pow(-y, 0.4) * 0.4;
}

/**
 * Bottom-sheet modal with swipe-to-dismiss, backdrop tap, and Escape-key support.
 * Renders into the nearest `.app-root` via a portal.
 *
 * ```tsx
 * <Modal open={open} onClose={() => setOpen(false)} title="Удалить хост">
 *   <Inset vertical>
 *     <p>Это действие необратимо.</p>
 *     <Button mode="danger" stretched onClick={handleDelete}>Удалить</Button>
 *   </Inset>
 * </Modal>
 * ```
 */
export const Modal: FC<ModalProps> = ({ open, onClose, title, children, className }) => {
  const sheetRef   = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dragging   = useRef(false);
  const startY     = useRef(0);
  const startTime  = useRef(0);
  const closing    = useRef(false);

  useEffect(() => {
    if (!open) {
      closing.current = false;
      if (sheetRef.current)  { sheetRef.current.style.transform = ''; sheetRef.current.style.transition = ''; }
      if (overlayRef.current) { overlayRef.current.style.opacity = ''; overlayRef.current.style.transition = ''; }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const height = sheetRef.current?.offsetHeight ?? window.innerHeight;
    if (sheetRef.current) {
      sheetRef.current.style.transition = 'transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)';
      sheetRef.current.style.transform  = `translateY(${height + 40}px)`;
    }
    if (overlayRef.current) {
      overlayRef.current.style.transition = 'opacity 0.24s ease';
      overlayRef.current.style.opacity    = '0';
    }
    setTimeout(onClose, 280);
  }, [onClose]);

  const startDrag = useCallback((e: React.PointerEvent) => {
    if (closing.current) return;
    dragging.current  = true;
    startY.current    = e.clientY;
    startTime.current = Date.now();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (sheetRef.current)  sheetRef.current.style.transition  = 'none';
    if (overlayRef.current) overlayRef.current.style.transition = 'none';
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dampened = dampen(e.clientY - startY.current);
    if (sheetRef.current) sheetRef.current.style.transform = `translateY(${dampened}px)`;
    if (overlayRef.current && sheetRef.current) {
      const pct = Math.min(1, Math.max(0, dampened / sheetRef.current.offsetHeight));
      overlayRef.current.style.opacity = String(1 - pct);
    }
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    const delta   = e.clientY - startY.current;
    const elapsed = Date.now() - startTime.current;
    const vel     = elapsed > 0 ? Math.abs(delta) / elapsed : 0;
    const height  = sheetRef.current?.offsetHeight ?? 1;

    if (delta > 0 && (vel > VELOCITY_THRESHOLD || delta / height > DISTANCE_THRESHOLD)) {
      closing.current = true;
      if (sheetRef.current) {
        sheetRef.current.style.transition = 'transform 0.32s cubic-bezier(0.32, 0.72, 0, 1)';
        sheetRef.current.style.transform  = `translateY(${height + 40}px)`;
      }
      if (overlayRef.current) {
        overlayRef.current.style.transition = 'opacity 0.32s cubic-bezier(0.32, 0.72, 0, 1)';
        overlayRef.current.style.opacity    = '0';
      }
      setTimeout(() => onClose(), 320);
    } else {
      if (sheetRef.current) {
        sheetRef.current.style.transition = 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)';
        sheetRef.current.style.transform  = 'translateY(0)';
      }
      if (overlayRef.current) {
        overlayRef.current.style.transition = 'opacity 0.4s cubic-bezier(0.32, 0.72, 0, 1)';
        overlayRef.current.style.opacity    = '1';
      }
    }
  }, [onClose]);

  if (!open) return null;

  const container = document.querySelector<HTMLElement>('.app-root') ?? document.body;

  return createPortal(
    <motion.div
      ref={overlayRef}
      className="ui-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onPointerDown={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog"
      aria-modal
    >
      <motion.div
        ref={sheetRef}
        className={cn('ui-modal', className)}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={snapSpring}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ui-modal__handle-area" onPointerDown={startDrag}>
          <div className="ui-modal__handle" />
        </div>
        <div className="ui-modal__header">
          <span className="ui-modal__title">{title}</span>
          <button
            type="button"
            className="ui-modal__close"
            aria-label="Закрыть"
            onClick={handleClose}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="ui-modal__body">{children}</div>
      </motion.div>
    </motion.div>,
    container,
  );
};
