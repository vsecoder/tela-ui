import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Server } from '@gravity-ui/icons';
import { Badge, BadgeAnchor } from './Badge';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { Cell } from '../Cell/Cell';
import { Section } from '../Section/Section';
import { List } from '../List/List';

const iconProps = { width: 20, height: 20 };

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    variant:  { control: 'radio', options: ['neutral', 'accent', 'success', 'danger', 'warning'] },
    size:     { control: 'radio', options: ['s', 'm'] },
    dot:      { control: 'boolean' },
    count:    { control: 'number' },
    children: { control: 'text' },
  },
  args: { variant: 'neutral', size: 'm', children: 'Статус' },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="danger"  dot>Offline</Badge>
      <Badge variant="warning" dot>Degraded</Badge>
      <Badge variant="neutral" dot>Unknown</Badge>
    </div>
  ),
};

export const Counts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge variant="danger" count={3} />
      <Badge variant="danger" count={12} />
      <Badge variant="danger" count={99} />
      <Badge variant="danger" count={142} />
      <Badge variant="accent" count={5} />
      <Badge variant="warning" count={1} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge variant="success" dot size="s">Online</Badge>
      <Badge variant="success" dot size="m">Online</Badge>
      <Badge variant="danger" size="s" count={4} />
      <Badge variant="danger" size="m" count={4} />
    </div>
  ),
};

// ─── BadgeAnchor ─────────────────────────────────────────────────────────────

export const OnButton: Story = {
  name: 'Anchor / Button',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <BadgeAnchor badge={<Badge variant="danger" count={3} size="s" />}>
        <Button before={<Bell {...iconProps} />}>Уведомления</Button>
      </BadgeAnchor>

      <BadgeAnchor badge={<Badge variant="warning" count={1} size="s" />}>
        <Button mode="outline" before={<Server {...iconProps} />}>Алерты</Button>
      </BadgeAnchor>
    </div>
  ),
};

export const OnIcon: Story = {
  name: 'Anchor / Icon',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <BadgeAnchor badge={<Badge variant="danger" count={5} size="s" />}>
        <Bell {...iconProps} style={{ color: 'var(--ui-text)' }} />
      </BadgeAnchor>

      <BadgeAnchor badge={<Badge variant="success" dot size="s" />} placement="bottom-right">
        <Server {...iconProps} style={{ color: 'var(--ui-text)' }} />
      </BadgeAnchor>
    </div>
  ),
};

export const OnAvatar: Story = {
  name: 'Anchor / Avatar',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {/* Online status via Avatar badge prop */}
      <Avatar size={48} badge={<Badge variant="success" dot size="s" />} />

      {/* Offline */}
      <Avatar size={48} badge={<Badge variant="danger" dot size="s" />} />

      {/* Notification count via BadgeAnchor */}
      <BadgeAnchor badge={<Badge variant="danger" count={2} size="s" />}>
        <Avatar size={48} />
      </BadgeAnchor>

      {/* Large avatar */}
      <Avatar size={64} badge={<Badge variant="warning" dot size="s" />} />
    </div>
  ),
};

export const Placements: Story = {
  name: 'Anchor / Placements',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const).map((p) => (
        <div key={p} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <BadgeAnchor badge={<Badge variant="danger" count={1} size="s" />} placement={p}>
            <Avatar size={48} />
          </BadgeAnchor>
          <span style={{ fontSize: 11, color: 'var(--ui-text-hint)' }}>{p}</span>
        </div>
      ))}
    </div>
  ),
};

export const Usage: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <List>
      <Section header="Серверы">
        <Cell
          before={<Avatar size={36} badge={<Badge variant="success" dot size="s" />} />}
          after={<Badge variant="success" dot size="s">Online</Badge>}
          subtitle="eu-west-1"
        >
          prod-01
        </Cell>
        <Cell
          before={<Avatar size={36} badge={<Badge variant="danger" dot size="s" />} />}
          after={<Badge variant="danger" dot size="s">Offline</Badge>}
          subtitle="us-east-1"
        >
          prod-02
        </Cell>
        <Cell
          before={<Avatar size={36} badge={<Badge variant="warning" dot size="s" />} />}
          after={<Badge variant="warning" dot size="s">Degraded</Badge>}
          subtitle="ap-south-1"
        >
          staging-01
        </Cell>
      </Section>
      <Section header="Уведомления">
        <Cell after={<Badge variant="danger" count={3} />} subtitle="Требуют внимания">Алерты</Cell>
        <Cell after={<Badge variant="accent" count={12} />} subtitle="Новые события">Логи</Cell>
        <Cell after={<Badge variant="neutral">draft</Badge>} subtitle="22 апр 2026">Обновление платформы</Cell>
      </Section>
    </List>
  ),
};

// Note: Badge — read-only статус или счётчик, не интерактивен.
// BadgeAnchor — оборачивает любой элемент и размещает Badge в углу.
// Avatar принимает badge= напрямую (всегда bottom-right).
// Для иконок и кнопок используй <BadgeAnchor badge={...}>.
// dot=true для индикаторов состояния; count= для уведомлений.
// size="s" внутри Cell и на аватарах; size="m" отдельно.
