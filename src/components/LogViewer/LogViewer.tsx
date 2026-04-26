import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { cn } from '../cn';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'plain';

export interface LogLine {
  id: string | number;
  text: string;
  level?: LogLevel;
  /** Timestamp string shown in the left column. */
  time?: string;
}

export interface LogViewerProps {
  lines: LogLine[];
  /** Visible height before scrolling. Default 400. */
  maxHeight?: number;
  /** Scroll to bottom as new lines arrive. Default true. Resets when user scrolls up. */
  follow?: boolean;
  /** Show the timestamp column. Default true. */
  showTime?: boolean;
  className?: string;
}

/**
 * Monospace scrollable log viewer for server output and event streams.
 * Auto-scrolls to the latest line; pauses when the user scrolls up.
 *
 * ```tsx
 * <LogViewer lines={[
 *   { id: 1, time: '10:01:22', level: 'info',  text: 'Server started' },
 *   { id: 2, time: '10:01:23', level: 'error', text: 'Disk full' },
 * ]} />
 * ```
 */
export const LogViewer: FC<LogViewerProps> = ({
  lines,
  maxHeight = 400,
  follow = true,
  showTime = true,
  className,
}) => {
  const bottomRef    = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const userScrolled = useRef(false);

  useEffect(() => {
    if (!follow || userScrolled.current) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, follow]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    userScrolled.current = el.scrollHeight - el.scrollTop - el.clientHeight > 32;
  };

  return (
    <div
      ref={containerRef}
      className={cn('ui-log-viewer', className)}
      style={{ maxHeight }}
      onScroll={handleScroll}
    >
      {lines.map((line) => (
        <div
          key={line.id}
          className={cn('ui-log-line', line.level && `ui-log-line--${line.level}`)}
        >
          {showTime && line.time && (
            <span className="ui-log-line__time">{line.time}</span>
          )}
          <span className="ui-log-line__text">{line.text}</span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
