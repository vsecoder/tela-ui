import { useState, useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LogViewer } from './LogViewer';
import type { LogLine } from './LogViewer';
import { Button } from '../Button/Button';

const meta: Meta<typeof LogViewer> = {
  title: 'UI/LogViewer',
  component: LogViewer,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof LogViewer>;

const SAMPLE_LINES: LogLine[] = [
  { id: 1,  time: '10:01:20', level: 'info',  text: 'Starting server process...' },
  { id: 2,  time: '10:01:21', level: 'info',  text: 'Listening on 0.0.0.0:8080' },
  { id: 3,  time: '10:01:22', level: 'debug', text: 'Config loaded from /etc/app/config.yaml' },
  { id: 4,  time: '10:01:25', level: 'info',  text: 'Database connection established' },
  { id: 5,  time: '10:01:26', level: 'warn',  text: 'Disk usage at 82%, consider cleanup' },
  { id: 6,  time: '10:01:30', level: 'info',  text: 'Health check OK' },
  { id: 7,  time: '10:02:01', level: 'error', text: 'Failed to reach upstream: connection refused' },
  { id: 8,  time: '10:02:02', level: 'info',  text: 'Retrying in 5s...' },
  { id: 9,  time: '10:02:07', level: 'info',  text: 'Upstream reconnected' },
  { id: 10, time: '10:03:00', level: 'plain', text: '--- checkpoint ---' },
];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    lines: SAMPLE_LINES,
    maxHeight: 300,
    showTime: true,
    follow: true,
  },
};

// ─── Live стриминг ────────────────────────────────────────────────────────────

export const LiveStream: Story = {
  name: 'Live Streaming',
  render: () => {
    const [lines, setLines] = useState<LogLine[]>(SAMPLE_LINES.slice(0, 3));
    const [running, setRunning] = useState(false);
    const idRef = useRef(11);

    useEffect(() => {
      if (!running) return;
      const templates: Array<{ level: LogLine['level']; text: string }> = [
        { level: 'info',  text: 'Request GET /api/health 200 OK (2ms)' },
        { level: 'info',  text: 'Request POST /api/deploy 202 Accepted (45ms)' },
        { level: 'debug', text: 'Cache miss for key user:42' },
        { level: 'warn',  text: 'Slow query detected: 1240ms' },
        { level: 'error', text: 'Unhandled exception in worker thread' },
        { level: 'info',  text: 'Worker restarted successfully' },
      ];

      const interval = setInterval(() => {
        const tmpl = templates[Math.floor(Math.random() * templates.length)];
        const now = new Date().toTimeString().slice(0, 8);
        setLines((prev) => [...prev, { id: idRef.current++, time: now, ...tmpl }]);
      }, 800);

      return () => clearInterval(interval);
    }, [running]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={() => setRunning((v) => !v)}>
            {running ? 'Остановить' : 'Запустить'}
          </Button>
          <Button mode="outline" onClick={() => { setLines([]); idRef.current = 1; }}>
            Очистить
          </Button>
        </div>
        <LogViewer lines={lines} maxHeight={320} />
      </div>
    );
  },
};

// ─── Без временных меток ─────────────────────────────────────────────────────

export const NoTimestamps: Story = {
  name: 'No Timestamps',
  args: {
    lines: SAMPLE_LINES,
    showTime: false,
    maxHeight: 300,
  },
};

// Note: LogViewer авто-скроллит к последней строке.
// Если пользователь прокрутил вверх — авто-скролл приостанавливается.
// Для огромных логов рассмотри виртуализацию (react-window).
