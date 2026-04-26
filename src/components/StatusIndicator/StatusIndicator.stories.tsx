import type { Meta, StoryObj } from '@storybook/react';
import { StatusIndicator } from './StatusIndicator';
import { List } from '../List/List';
import { Section } from '../Section/Section';
import { Cell } from '../Cell/Cell';

const meta: Meta<typeof StatusIndicator> = {
  title: 'UI/StatusIndicator',
  component: StatusIndicator,
  parameters: { layout: 'padded' },
  argTypes: {
    state:     { control: 'select', options: ['online', 'offline', 'pending', 'warning', 'error'] },
    size:      { control: 'select', options: ['s', 'm', 'l'] },
    pulse:     { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof StatusIndicator>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { state: 'online', size: 'm' },
};

// ─── Все состояния ────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 8 }}>
      <StatusIndicator state="online" />
      <StatusIndicator state="pending" />
      <StatusIndicator state="warning" />
      <StatusIndicator state="error" />
      <StatusIndicator state="offline" />
    </div>
  ),
};

// ─── Размеры ─────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 8 }}>
      <StatusIndicator state="online" size="s" />
      <StatusIndicator state="online" size="m" />
      <StatusIndicator state="online" size="l" />
    </div>
  ),
};

// ─── В списке серверов ────────────────────────────────────────────────────────

export const InServerList: Story = {
  name: 'In Server List',
  render: () => (
    <List>
      <Section header="Серверы">
        <Cell subtitle="eu-west-1" after={<StatusIndicator state="online"  size="s" />}>prod-01</Cell>
        <Cell subtitle="us-east-1" after={<StatusIndicator state="pending" size="s" />}>prod-02</Cell>
        <Cell subtitle="ap-south-1" after={<StatusIndicator state="error"  size="s" />}>staging-01</Cell>
        <Cell subtitle="eu-west-2" after={<StatusIndicator state="offline" size="s" />}>dev-01</Cell>
      </Section>
    </List>
  ),
};

// Note: online и pending пульсируют автоматически.
// Для отображения рядом с текстом без лейбла — передай label={null} или пустую строку.
// Для угловых бейджей (на аватарке) используй BadgeAnchor + Badge вместо StatusIndicator.
