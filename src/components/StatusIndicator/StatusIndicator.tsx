import type { FC, ReactNode } from 'react';
import { cn } from '../cn';

export type StatusState = 'online' | 'offline' | 'pending' | 'warning' | 'error';
export type StatusSize  = 's' | 'm' | 'l';

export interface StatusIndicatorProps {
  state: StatusState;
  /** Custom label. Falls back to the Russian state name. */
  label?: ReactNode;
  size?: StatusSize;
  /** Pulsing animation. Auto-enabled for `online` and `pending`. */
  pulse?: boolean;
  className?: string;
}

const DEFAULT_LABELS: Record<StatusState, string> = {
  online:  'Онлайн',
  offline: 'Офлайн',
  pending: 'Запуск',
  warning: 'Предупреждение',
  error:   'Ошибка',
};

/**
 * Colored dot for server / service status.
 * Pulses automatically for `online` and `pending`; static for the rest.
 *
 * ```tsx
 * <StatusIndicator state="online" />
 * <StatusIndicator state="pending" label="Provisioning…" />
 * <StatusIndicator state="offline" label={server.name} size="s" />
 * ```
 */
export const StatusIndicator: FC<StatusIndicatorProps> = ({
  state,
  label,
  size = 'm',
  pulse,
  className,
}) => {
  const autoPulse = pulse ?? (state === 'online' || state === 'pending');
  return (
    <span
      className={cn('ui-status', `ui-status--${state}`, `ui-status--${size}`, className)}
    >
      <span
        className={cn('ui-status__dot', autoPulse && 'ui-status__dot--pulse')}
        aria-hidden
      />
      <span className="ui-status__label">
        {label !== undefined ? label : DEFAULT_LABELS[state]}
      </span>
    </span>
  );
};
