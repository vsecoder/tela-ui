import type { FC, ReactNode } from 'react';
import { cn } from '../cn';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  variant?: AlertVariant;
  /** Bold heading line. */
  title?: ReactNode;
  /** Supporting body text rendered below the title. */
  children?: ReactNode;
  /** Icon placed to the left. */
  icon?: ReactNode;
  /** When provided, renders a close (×) button and calls this handler. */
  onClose?: () => void;
  className?: string;
}

/**
 * Inline status banner for errors, warnings, and informational messages.
 * For ephemeral toasts use `Snackbar` instead.
 *
 * ```tsx
 * <Alert variant="warning" icon={<TriangleExclamation />} title="Высокая нагрузка">
 *   CPU использован на 92%. Рассмотрите масштабирование.
 * </Alert>
 * ```
 */
export const Alert: FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  icon,
  onClose,
  className,
}) => (
  <div className={cn('ui-alert', `ui-alert--${variant}`, className)} role="alert">
    {icon && <span className="ui-alert__icon">{icon}</span>}
    <div className="ui-alert__body">
      {title && <span className="ui-alert__title">{title}</span>}
      {children && <span className="ui-alert__desc">{children}</span>}
    </div>
    {onClose && (
      <button type="button" className="ui-alert__close" onClick={onClose} aria-label="Закрыть">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>
    )}
  </div>
);
