import type { Meta, StoryObj } from '@storybook/react';
import { Inset } from './Inset';
import { List } from '../List';
import { Section } from '../Section';
import { Cell } from '../Cell';
import { Toggle } from '../Toggle';
import { Chart } from '../Chart';
import { Breadcrumbs } from '../Breadcrumbs';
import { TypographyHeadline, TypographyLabel } from '../Typography';
import { AppRoot } from '../AppRoot';
import { useState } from 'react';

const meta: Meta<typeof Inset> = {
  title: 'UI/Inset',
  component: Inset,
  parameters: { layout: 'padded' },
  argTypes: {
    vertical: { control: 'boolean' },
  },
  args: { vertical: false },
};
export default meta;

type Story = StoryObj<typeof Inset>;

export const Playground: Story = {
  render: (args) => (
    <AppRoot style={{ background: 'var(--ui-bg)' }}>
      <Inset {...args}>
        <div style={{ background: 'color-mix(in srgb, var(--ui-accent) 15%, transparent)', border: '1px dashed var(--ui-accent)', borderRadius: 10, padding: 16, fontSize: 14, color: 'var(--ui-text)' }}>
          Содержимое с отступом 16px по горизонтали
        </div>
      </Inset>
    </AppRoot>
  ),
};

export const WithVertical: Story = {
  args: { vertical: true },
  render: (args) => (
    <AppRoot style={{ background: 'var(--ui-bg)' }}>
      <Inset {...args}>
        <div style={{ background: 'color-mix(in srgb, var(--ui-accent) 15%, transparent)', border: '1px dashed var(--ui-accent)', borderRadius: 10, padding: 16, fontSize: 14, color: 'var(--ui-text)' }}>
          Содержимое с отступом 20px сверху/снизу и 16px по горизонтали
        </div>
      </Inset>
    </AppRoot>
  ),
};

export const Usage: Story = {
  render: () => {
    const [tab, setTab] = useState<'traffic' | 'cpu'>('traffic');
    return (
      <AppRoot>
        <List>
          <Inset vertical>
            <Breadcrumbs items={[{ label: 'Хосты', onClick: () => {} }, { label: 'prod-01' }]} />
          </Inset>
          <Inset vertical>
            <TypographyHeadline style={{ marginBottom: 4 }}>prod-01</TypographyHeadline>
            <TypographyLabel>eu-west-1 · 2 vCPU · 4 ГБ RAM</TypographyLabel>
          </Inset>
          <Inset vertical>
            <Toggle
              options={[{ label: 'Трафик', value: 'traffic' }, { label: 'CPU', value: 'cpu' }]}
              value={tab}
              onChange={(v) => setTab(v as typeof tab)}
            />
          </Inset>
          <Section header={tab === 'traffic' ? 'Трафик (МБ/ч)' : 'Загрузка CPU (%)'}>
            <Inset vertical>
              <Chart
                type="line"
                data={{
                  labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
                  datasets: [{
                    label: tab === 'traffic' ? 'МБ/ч' : '%',
                    data: tab === 'traffic' ? [12, 8, 45, 62, 30] : [18, 12, 55, 72, 40],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59,130,246,0.1)',
                    fill: true,
                    tension: 0.4,
                  }],
                }}
              />
            </Inset>
          </Section>
          <Section header="Подключение">
            <Cell subtitle="185.12.34.56" hint="IPv4">IP-адрес</Cell>
            <Cell subtitle="22" hint="TCP">SSH-порт</Cell>
          </Section>
        </List>
      </AppRoot>
    );
  },
};

// Note: Inset добавляет padding 12px 16px по умолчанию — используй вне List/Section.
// <Inset vertical> увеличивает вертикальный отступ до 20px — для заголовков, Toggle, Breadcrumbs.
// Внутри Section добавляй <Inset vertical> вокруг нетекстовых компонентов (Chart, Toggle и т.д.).
// Не используй Inset для оборачивания Cell/Input/Select — они уже имеют padding.
