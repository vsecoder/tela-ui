import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';
import { Cell } from '../Cell/Cell';
import { Section } from '../Section/Section';
import { List } from '../List/List';
import { Button } from '../Button/Button';

const meta: Meta<typeof ProgressBar> = {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  argTypes: {
    value:     { control: { type: 'range', min: 0, max: 100 } },
    max:       { control: { type: 'number' } },
    color:     { control: 'radio', options: ['accent', 'success', 'danger', 'warning'] },
    size:      { control: 'radio', options: ['s', 'm', 'l'] },
    label:     { control: 'text' },
    showValue: { control: 'boolean' },
  },
  args: { value: 65, color: 'accent', size: 'm' },
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Playground: Story = {};

export const WithLabel: Story = {
  args: { value: 72, label: 'Использование диска', showValue: true },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ProgressBar value={60} size="s" label="Small (4px)"  showValue />
      <ProgressBar value={60} size="m" label="Medium (6px)" showValue />
      <ProgressBar value={60} size="l" label="Large (10px)" showValue />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ProgressBar value={80} color="accent"  label="Accent"  showValue />
      <ProgressBar value={65} color="success" label="Success" showValue />
      <ProgressBar value={45} color="warning" label="Warning" showValue />
      <ProgressBar value={92} color="danger"  label="Danger"  showValue />
    </div>
  ),
};

export const Animated: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const t = setTimeout(() => setValue(73), 300);
      return () => clearTimeout(t);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ProgressBar value={value} label="Анимированный прогресс" showValue />
        <Button size="s" mode="outline" onClick={() => setValue(Math.floor(Math.random() * 100))}>
          Случайное значение
        </Button>
      </div>
    );
  },
};

export const Usage: Story = {
  parameters: {},
  render: () => {
    const resources = [
      { label: 'CPU',    value: 34,  max: 100, color: 'accent'  as const },
      { label: 'RAM',    value: 78,  max: 100, color: 'warning' as const },
      { label: 'Диск',   value: 91,  max: 100, color: 'danger'  as const },
      { label: 'Сеть ↑', value: 420, max: 1000, color: 'success' as const },
    ];

    return (
      <List>
        <Section header="Ресурсы — prod-01">
          {resources.map((r) => (
            <Cell key={r.label} subtitle={`${r.value} / ${r.max}${r.label === 'Сеть ↑' ? ' Мбит/с' : '%'}`}>
              <div style={{ width: '100%' }}>
                <span style={{ fontSize: 15 }}>{r.label}</span>
                <div style={{ marginTop: 6 }}>
                  <ProgressBar value={r.value} max={r.max} color={r.color} size="s" />
                </div>
              </div>
            </Cell>
          ))}
        </Section>
      </List>
    );
  },
};

// Note: ProgressBar всегда controlled — value + (опционально) max.
// size="s" внутри Cell; size="m" как самостоятельный элемент; size="l" для hero-статистики.
// color автоматически: accent - warning - danger по порогам нагрузки.
// Анимация ширины срабатывает при любом изменении value.
