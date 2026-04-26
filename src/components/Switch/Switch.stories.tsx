import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { Cell } from '../Cell';
import { Section } from '../Section';
import { List } from '../List';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  argTypes: { onChange: { action: 'changed' } },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Off: Story = {
  args: { checked: false },
};

export const On: Story = {
  args: { checked: true },
};

export const Usage: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [push, setPush] = useState(true);
    const [alerts, setAlerts] = useState(false);
    const [news, setNews] = useState(true);
    return (
      <List>
        <Section header="Уведомления" footer="Push-уведомления доступны только в мобильном приложении">
          <Cell subtitle="Новые события хостов" after={<Switch checked={push} onChange={(e) => setPush(e.target.checked)} />}>Push-уведомления</Cell>
          <Cell subtitle="Проблемы с подключением" after={<Switch checked={alerts} onChange={(e) => setAlerts(e.target.checked)} />}>Алерты безопасности</Cell>
          <Cell subtitle="Обновления платформы" after={<Switch checked={news} onChange={(e) => setNews(e.target.checked)} />}>Новости платформы</Cell>
        </Section>
      </List>
    );
  },
};

// Note: Switch используется только как after= внутри Cell.
// Никогда не рендерьте Switch отдельно от Cell.
// Состояние (checked) и обработчик (onChange) управляются снаружи.
// Не используйте Switch для выбора между >2 вариантами — для этого Toggle.
