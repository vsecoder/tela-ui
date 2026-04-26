import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CircleCheck, CircleXmark, TriangleExclamationFill, CircleInfo } from '@gravity-ui/icons';
import { Snackbar } from './Snackbar';
import { Button } from '../Button';
import { AppRoot } from '../AppRoot';
import { List } from '../List';
import { Section } from '../Section';

const iconProps = { width: 18, height: 18 };

const meta: Meta<typeof Snackbar> = {
  title: 'UI/Snackbar',
  component: Snackbar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant:     { control: 'radio', options: ['default', 'success', 'danger', 'warning', 'info'] },
    duration:    { control: 'number' },
    children:    { control: 'text' },
    description: { control: 'text' },
    before:      { control: false, table: { disable: true } },
    onClose:     { control: false, table: { disable: true } },
  },
  args: {
    variant:  'default',
    children: 'Операция выполнена',
    duration: 0,
  },
  decorators: [
    (Story) => (
      <AppRoot style={{ minHeight: '100vh', position: 'relative' }}>
        <div style={{ position: 'fixed', bottom: 16, left: 0, right: 0, zIndex: 9999 }}>
          <Story />
        </div>
      </AppRoot>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Playground: Story = {};

export const Default: Story = {
  args: { children: 'Настройки сохранены', duration: 0 },
};

export const Success: Story = {
  args: {
    variant: 'success',
    before: <CircleCheck {...iconProps} />,
    children: 'Хост успешно запущен',
    duration: 0,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    before: <CircleXmark {...iconProps} />,
    children: 'Ошибка подключения',
    description: 'Проверьте параметры сервера',
    duration: 0,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    before: <TriangleExclamationFill {...iconProps} />,
    children: 'Высокая нагрузка CPU',
    description: 'Использование выше 90%',
    duration: 0,
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    before: <CircleInfo {...iconProps} />,
    children: 'Доступно обновление',
    description: 'Версия 2.5.0 — перезапустите хост',
    duration: 0,
  },
};

export const AllVariants: Story = {
  render: () => (
    <AppRoot style={{ minHeight: '100vh' }}>
      <div style={{ position: 'fixed', bottom: 16, left: 0, right: 0, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 9999 }}>
        <Snackbar duration={0}>Настройки сохранены</Snackbar>
        <Snackbar variant="success" before={<CircleCheck {...iconProps} />} duration={0}>Хост успешно запущен</Snackbar>
        <Snackbar variant="danger"  before={<CircleXmark {...iconProps} />} description="Проверьте параметры" duration={0}>Ошибка подключения</Snackbar>
        <Snackbar variant="warning" before={<TriangleExclamationFill {...iconProps} />} duration={0}>Высокая нагрузка CPU</Snackbar>
        <Snackbar variant="info"    before={<CircleInfo {...iconProps} />} duration={0}>Доступно обновление</Snackbar>
      </div>
    </AppRoot>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [queue, setQueue] = useState<{ id: number; variant: string; msg: string }[]>([]);
    let nextId = 0;
    const show = (variant: string, msg: string) =>
      setQueue(q => [...q, { id: nextId++, variant, msg }]);
    return (
      <AppRoot style={{ minHeight: '100vh' }}>
        <List>
          <Section header="Показать снэкбар">
            {([
              ['default', 'Настройки сохранены'],
              ['success', 'Хост запущен'],
              ['danger',  'Ошибка подключения'],
              ['warning', 'Нагрузка CPU 92%'],
              ['info',    'Обновление доступно'],
            ] as [string, string][]).map(([v, msg]) => (
              <Button key={v} mode="outline" onClick={() => show(v, msg)}>
                {v}
              </Button>
            ))}
          </Section>
        </List>
        <div style={{ position: 'fixed', bottom: 16, left: 0, right: 0, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 9999 }}>
          {queue.map(({ id, variant, msg }) => (
            <Snackbar
              key={id}
              variant={variant as never}
              duration={3000}
              onClose={() => setQueue(q => q.filter(x => x.id !== id))}
            >
              {msg}
            </Snackbar>
          ))}
        </div>
      </AppRoot>
    );
  },
};
