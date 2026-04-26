import type { Meta, StoryObj } from '@storybook/react';
import { CircleCheck, CircleXmark, TriangleExclamation, Server, ArrowsRotateRight } from '@gravity-ui/icons';
import { Timeline } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'UI/Timeline',
  component: Timeline,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Timeline>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    events: [
      { id: 1, title: 'Сервер создан',      time: '10:00', variant: 'success' },
      { id: 2, title: 'Nginx запущен',       time: '10:01', variant: 'success' },
      { id: 3, title: 'Перезагрузка',        time: '10:14' },
      { id: 4, title: 'Критическая ошибка',  time: '11:02', variant: 'danger',
               description: 'Disk I/O error on /dev/sda1' },
    ],
  },
};

// ─── История сервера ─────────────────────────────────────────────────────────

export const ServerHistory: Story = {
  name: 'Server History',
  render: () => (
    <Timeline
      events={[
        {
          id: 1,
          title: 'Сервер создан',
          time: '24 апр, 10:00',
          variant: 'success',
          icon: <CircleCheck width={14} height={14} />,
          description: 'eu-west-1 · 4 vCPU / 8 GB · Ubuntu 24.04',
        },
        {
          id: 2,
          title: 'Nginx установлен',
          time: '24 апр, 10:03',
          variant: 'success',
          icon: <CircleCheck width={14} height={14} />,
        },
        {
          id: 3,
          title: 'Перезапуск',
          time: '24 апр, 14:22',
          icon: <ArrowsRotateRight width={12} height={12} />,
          description: 'Плановое обслуживание',
        },
        {
          id: 4,
          title: 'Высокая нагрузка CPU',
          time: '25 апр, 09:14',
          variant: 'warning',
          icon: <TriangleExclamation width={13} height={13} />,
          description: 'CPU > 95% в течение 10 минут',
        },
        {
          id: 5,
          title: 'Нагрузка нормализована',
          time: '25 апр, 09:28',
          variant: 'success',
          icon: <CircleCheck width={14} height={14} />,
        },
        {
          id: 6,
          title: 'Ошибка диска',
          time: '26 апр, 03:47',
          variant: 'danger',
          icon: <CircleXmark width={14} height={14} />,
          description: 'Disk I/O error on /dev/sda1 — сервер недоступен',
        },
      ]}
    />
  ),
};

// ─── Деплой ──────────────────────────────────────────────────────────────────

export const DeployFlow: Story = {
  name: 'Deploy Process',
  render: () => (
    <Timeline
      events={[
        { id: 1, title: 'Получен запрос на деплой',  time: '12:00:01', variant: 'accent', icon: <Server width={12} height={12} /> },
        { id: 2, title: 'Сборка образа',             time: '12:00:03', variant: 'success', icon: <CircleCheck width={14} height={14} /> },
        { id: 3, title: 'Загрузка в registry',       time: '12:00:45', variant: 'success', icon: <CircleCheck width={14} height={14} /> },
        { id: 4, title: 'Rolling update',            time: '12:01:00', description: '3/3 подов обновлено', variant: 'success', icon: <CircleCheck width={14} height={14} /> },
        { id: 5, title: 'Health check пройден',      time: '12:01:30', variant: 'success', icon: <CircleCheck width={14} height={14} /> },
      ]}
    />
  ),
};

// Note: variant окрашивает точку и заголовок события.
// icon — любой ReactNode внутри точки (оптимально 12-14px).
// Последнее событие отображается без линии вниз.
