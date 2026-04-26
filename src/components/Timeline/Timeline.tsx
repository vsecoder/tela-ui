import type { FC, ReactNode } from 'react';
import { cn } from '../cn';

export type TimelineVariant = 'default' | 'success' | 'danger' | 'warning' | 'accent';

export interface TimelineEvent {
  id: string | number;
  title: ReactNode;
  description?: ReactNode;
  /** Timestamp label shown on the right. */
  time?: ReactNode;
  /** Custom icon inside the dot. */
  icon?: ReactNode;
  variant?: TimelineVariant;
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

/**
 * Vertical timeline for server event history (created, restarted, error, etc.).
 *
 * ```tsx
 * <Timeline events={[
 *   { id: 1, title: 'Сервер создан',      time: '10:00', variant: 'success' },
 *   { id: 2, title: 'Перезапущен',        time: '10:14' },
 *   { id: 3, title: 'Критическая ошибка', time: '11:02', variant: 'danger',
 *            description: 'Disk I/O error on /dev/sda1' },
 * ]} />
 * ```
 */
export const Timeline: FC<TimelineProps> = ({ events, className }) => (
  <div className={cn('ui-timeline', className)}>
    {events.map((ev, i) => (
      <div
        key={ev.id}
        className={cn(
          'ui-timeline__item',
          `ui-timeline__item--${ev.variant ?? 'default'}`,
        )}
      >
        <div className="ui-timeline__track">
          <span className="ui-timeline__dot">{ev.icon ?? null}</span>
          {i < events.length - 1 && <span className="ui-timeline__line" />}
        </div>
        <div className="ui-timeline__content">
          <div className="ui-timeline__header">
            <span className="ui-timeline__title">{ev.title}</span>
            {ev.time && <span className="ui-timeline__time">{ev.time}</span>}
          </div>
          {ev.description && (
            <div className="ui-timeline__desc">{ev.description}</div>
          )}
        </div>
      </div>
    ))}
  </div>
);
