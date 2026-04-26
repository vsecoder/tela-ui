import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Counter } from './Counter';
import { Cell } from '../Cell';
import { Section } from '../Section';
import { List } from '../List';
import { Button } from '../Button';
import { AppRoot } from '../AppRoot';

const meta: Meta<typeof Counter> = {
  title: 'UI/Counter',
  component: Counter,
  parameters: { layout: 'centered' },
  argTypes: {
    min:      { control: { type: 'number' } },
    max:      { control: { type: 'number' } },
    step:     { control: { type: 'number', min: 1 } },
    disabled: { control: 'boolean' },
    value:    { control: false },
    onChange: { control: false },
  },
  args: { min: 0, max: 10, step: 1, disabled: false },
};
export default meta;

type Story = StoryObj<typeof Counter>;

const Controlled = (args: Partial<React.ComponentProps<typeof Counter>>) => {
  const [v, setV] = useState(args.value ?? 1);
  return <Counter {...args} value={v} onChange={setV} />;
};

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
};

export const WithLimits: Story = {
  render: () => <Controlled value={3} min={1} max={5} />,
};

export const AtMin: Story = {
  render: () => <Controlled value={0} min={0} max={10} />,
};

export const AtMax: Story = {
  render: () => <Controlled value={10} min={0} max={10} />,
};

export const Disabled: Story = {
  render: () => <Counter value={3} onChange={() => {}} disabled />,
};

export const Usage: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [vcpu, setVcpu] = useState(2);
    const [ram, setRam] = useState(4);
    const [disk, setDisk] = useState(20);
    const price = vcpu * 150 + ram * 80 + disk * 5;
    return (
      <AppRoot>
        <List>
          <Section header="Конфигурация хоста" footer={`Стоимость: ~${price} ₽/мес`}>
            <Cell subtitle="Виртуальных процессоров" after={<Counter value={vcpu} onChange={setVcpu} min={1} max={8} />}>vCPU</Cell>
            <Cell subtitle="Гигабайт оперативной памяти" after={<Counter value={ram} onChange={setRam} min={1} max={32} step={2} />}>RAM (ГБ)</Cell>
            <Cell subtitle="Гигабайт дискового пространства" after={<Counter value={disk} onChange={setDisk} min={10} max={200} step={10} />}>Диск (ГБ)</Cell>
          </Section>
        </List>
        <div style={{ padding: '8px 16px 24px' }}>
          <Button size="l">Применить конфигурацию</Button>
        </div>
      </AppRoot>
    );
  },
};

// Note: Counter передаётся в after= у Cell для выбора числовых значений.
// Всегда controlled: value + onChange обязательны.
// min/max ограничивают диапазон; кнопки автоматически блокируются на границах.
// step=1 по умолчанию; для дискретных значений (RAM по 2 ГБ) используй step=2/4.
// Не используй Counter для выбора из списка значений — для этого Select.
