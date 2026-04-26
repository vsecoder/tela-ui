import type { Meta, StoryObj } from '@storybook/react';
import { CircleCheck, Gear, Person, Server, TriangleExclamation } from '@gravity-ui/icons';
import { Avatar } from '../Avatar';
import { Switch } from '../Switch';
import { Cell } from './Cell';
import { Navigation } from '../Navigation';
import { Section } from '../Section';
import { List } from '../List';

const iconProps = { width: 20, height: 20 };

const meta: Meta<typeof Cell> = {
  title: 'UI/Cell',
  component: Cell,
  decorators: [
    (Story) => (
      <List>
        <Section>
          <Story />
        </Section>
      </List>
    ),
  ],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof Cell>;

export const Basic: Story = {
  args: { children: 'Simple cell' },
};

export const WithSubtitle: Story = {
  args: { children: 'Main label', subtitle: 'Secondary line' },
};

export const WithDescription: Story = {
  args: {
    children: 'Main label',
    subtitle: 'Subtitle',
    description: 'Extra description text',
  },
};

export const WithHint: Story = {
  args: { children: 'Settings', hint: 'selected' },
};

export const WithBeforeAndAfter: Story = {
  args: {
    children: 'Server row',
    subtitle: 'us-east-1',
    before: <Server {...iconProps} />,
    after: <Navigation />,
  },
};

export const WithAfterSub: Story = {
  args: {
    children: 'Notcoin',
    subtitle: 'NOT · 0,0309 ₽',
    after: <span style={{ fontSize: 14, fontWeight: 600 }}>3,84 ₽</span>,
    afterSub: <span style={{ color: 'var(--ui-success)' }}>+0,22 ₽</span>,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'John Doe',
    subtitle: 'member',
    before: <Person {...iconProps} />,
    after: <Navigation />,
  },
};

export const Clickable: Story = {
  args: {
    children: 'Open settings',
    subtitle: 'onClick handler attached',
    before: <Gear {...iconProps} />,
    onClick: () => undefined,
  },
};

// Decorator wraps content in <List><Section> automatically
export const Usage: Story = {
  render: () => (
    <>
      <Cell subtitle="eu-west-1 · online" before={<Server {...iconProps} />} after={<Navigation />} hint="2 ч" onClick={() => {}}>prod-01</Cell>
      <Cell subtitle="us-east-1 · provisioning" before={<Server {...iconProps} />} after={<TriangleExclamation width={18} height={18} style={{ color: 'var(--ui-danger)' }} />} onClick={() => {}}>staging-01</Cell>
      <Cell subtitle="eu-west-2 · offline" before={<Server {...iconProps} />} after={<CircleCheck width={18} height={18} style={{ color: 'var(--ui-text-hint)' }} />} onClick={() => {}}>backup-01</Cell>
      <Cell subtitle="Администратор" before={<Avatar src="https://i.pravatar.cc/40?img=1" size={36} />} after={<Navigation />} onClick={() => {}}>Алиса Петрова</Cell>
      <Cell subtitle="Участник" before={<Avatar size={36} />} after={<Switch checked={true} onChange={() => {}} />}>Боб Иванов</Cell>
    </>
  ),
};

// Note: Cell всегда внутри Section > List.
// before — иконка, Avatar или Server icon.
// after — Navigation для навигации, Switch для настроек, статусная иконка.
// afterSub — вторая строка справа под after (например, сдача/процент под суммой).
// hint — вторичное значение справа (дата, счётчик).
// onClick превращает ячейку в кнопку с ripple.
