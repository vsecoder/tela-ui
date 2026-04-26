import type { Meta, StoryObj } from '@storybook/react';
import { Copy, CircleInfo, TrashBin } from '@gravity-ui/icons';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

// ─── Плейсменты ───────────────────────────────────────────────────────────────

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 40 }}>
      <Tooltip content="Сверху" placement="top">
        <Button mode="outline">top</Button>
      </Tooltip>
      <Tooltip content="Снизу" placement="bottom">
        <Button mode="outline">bottom</Button>
      </Tooltip>
      <Tooltip content="Слева" placement="left">
        <Button mode="outline">left</Button>
      </Tooltip>
      <Tooltip content="Справа" placement="right">
        <Button mode="outline">right</Button>
      </Tooltip>
    </div>
  ),
};

// ─── На иконках ───────────────────────────────────────────────────────────────

export const OnIcons: Story = {
  name: 'On Icons',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tooltip content="Скопировать IP-адрес">
        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ui-text-sub)', display: 'flex' }}>
          <Copy width={20} height={20} />
        </button>
      </Tooltip>
      <Tooltip content="Удалить сервер">
        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ui-danger)', display: 'flex' }}>
          <TrashBin width={20} height={20} />
        </button>
      </Tooltip>
      <Tooltip content="Метрики обновляются каждые 30 секунд">
        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ui-text-sub)', display: 'flex' }}>
          <CircleInfo width={20} height={20} />
        </button>
      </Tooltip>
    </div>
  ),
};

// ─── Rich-контент ─────────────────────────────────────────────────────────────

export const RichContent: Story = {
  name: 'Rich Content',
  render: () => (
    <Tooltip
      content={
        <span>
          Статус: <Badge variant="success" size="s">online</Badge>
          <br />
          Uptime: 99.9%
        </span>
      }
    >
      <Button>Наведи на меня</Button>
    </Tooltip>
  ),
};

// Note: Tooltip появляется при hover на десктопе и при tap на мобиле.
// Повторный tap скрывает. Для постоянно видимых подсказок используй description в Cell.
