import type { Meta, StoryObj } from '@storybook/react';
import { CopyCell } from './CopyCell';
import { List } from '../List/List';
import { Section } from '../Section/Section';
import { Cell } from '../Cell/Cell';
import { StatusIndicator } from '../StatusIndicator/StatusIndicator';

const meta: Meta<typeof CopyCell> = {
  title: 'UI/CopyCell',
  component: CopyCell,
  parameters: {},
};
export default meta;
type Story = StoryObj<typeof CopyCell>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'SSH команда',
    value: 'ssh root@192.168.100.1 -p 22',
  },
};

// ─── В панели сервера ─────────────────────────────────────────────────────────

export const ServerPanel: Story = {
  name: 'Server Panel',
  render: () => (
    <List>
      <Section header="Состояние">
        <Cell subtitle="eu-west-1" after={<StatusIndicator state="online" size="s" />}>
          prod-01
        </Cell>
      </Section>
      <Section header="Подключение">
        <CopyCell label="IP-адрес"    value="192.168.100.1" />
        <CopyCell label="SSH команда" value="ssh root@192.168.100.1 -p 22" />
        <CopyCell label="Пароль root" value="s3cr3tP@ssw0rd" obscure />
      </Section>
      <Section header="API">
        <CopyCell label="API токен" value="hk_live_aBcDeFgHiJkLmNoPqRsTuVwXyZ" obscure />
        <CopyCell label="Webhook URL" value="https://api.example.com/hooks/abc123" />
      </Section>
    </List>
  ),
};

// ─── Скрытые данные ───────────────────────────────────────────────────────────

export const Obscured: Story = {
  name: 'Hidden Data',
  args: {
    label: 'API токен',
    value: 'hk_live_aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890',
    obscure: true,
  },
};

// Note: CopyCell — строка списка. Используй внутри List > Section.
// Клик по всей строке копирует значение. Иконка меняется на ✓ на 2 секунды.
// obscure скрывает отображение, но копирует оригинальную строку.
