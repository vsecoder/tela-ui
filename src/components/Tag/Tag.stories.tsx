import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Globe, Server, Database } from '@gravity-ui/icons';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'UI/Tag',
  component: Tag,
  parameters: { layout: 'padded' },
  argTypes: {
    variant:  { control: 'select', options: ['neutral', 'accent', 'success', 'danger', 'warning'] },
    size:     { control: 'select', options: ['s', 'm'] },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Tag>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    children: 'eu-west-1',
    variant: 'accent',
  },
};

// ─── Все варианты ─────────────────────────────────────────────────────────────

export const Variants: Story = {
  name: 'Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag variant="neutral">neutral</Tag>
      <Tag variant="accent">accent</Tag>
      <Tag variant="success">success</Tag>
      <Tag variant="danger">danger</Tag>
      <Tag variant="warning">warning</Tag>
    </div>
  ),
};

// ─── С иконками и remove ─────────────────────────────────────────────────────

export const WithIconsAndRemove: Story = {
  name: 'With Icons + Remove',
  render: () => {
    const initial = ['eu-west-1', 'us-east-1', 'ap-south-1'];
    const [tags, setTags] = useState(initial);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tags.map((t) => (
            <Tag key={t} variant="accent" before={<Globe width={12} height={12} />} onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>
              {t}
            </Tag>
          ))}
        </div>
        {tags.length < initial.length && (
          <button type="button" style={{ fontSize: 13, color: 'var(--ui-accent)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            onClick={() => setTags(initial)}>
            Сбросить
          </button>
        )}
      </div>
    );
  },
};

// ─── Фильтры ─────────────────────────────────────────────────────────────────

export const FilterChips: Story = {
  name: 'Filters',
  render: () => {
    const [active, setActive] = useState<string[]>(['vps']);
    const options = [
      { value: 'vps',       label: 'VPS',        icon: <Server   width={12} height={12} /> },
      { value: 'dedicated', label: 'Dedicated',   icon: <Server   width={12} height={12} /> },
      { value: 'database',  label: 'Database',    icon: <Database width={12} height={12} /> },
    ];
    const toggle = (v: string) =>
      setActive((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);

    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {options.map((o) => (
          <Tag
            key={o.value}
            variant={active.includes(o.value) ? 'accent' : 'neutral'}
            before={o.icon}
            onClick={() => toggle(o.value)}
          >
            {o.label}
          </Tag>
        ))}
      </div>
    );
  },
};

// ─── Размеры ─────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tag size="s" variant="accent">Small</Tag>
      <Tag size="m" variant="accent">Medium</Tag>
    </div>
  ),
};

// Note: Tag — интерактивный чип (фильтр, удаление). Для пассивных меток используй Badge.
// onRemove добавляет кнопку ×. onClick делает тег кликабельным (role="button").
