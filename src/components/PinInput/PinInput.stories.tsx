import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PinInput } from './PinInput';
import { List } from '../List';
import { Section } from '../Section';
import { Button } from '../Button';
import { Inset } from '../Inset';

const meta: Meta<typeof PinInput> = {
  title: 'UI/PinInput',
  component: PinInput,
  parameters: {},
  argTypes: {
    length:     { control: 'number' },
    mask:       { control: 'boolean' },
    disabled:   { control: 'boolean' },
    value:      { control: false, table: { disable: true } },
    onChange:   { control: false, table: { disable: true } },
    onComplete: { control: false, table: { disable: true } },
  },
  args: { length: 4, mask: false, disabled: false },
};
export default meta;
type Story = StoryObj<typeof PinInput>;

export const Playground: Story = {
  render: (args) => {
    const [v, setV] = useState('');
    return <PinInput {...args} value={v} onChange={setV} />;
  },
};

export const FourDigit: Story = {
  name: '4 Digits',
  render: () => {
    const [v, setV] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: 24 }}>
        <PinInput length={4} value={v} onChange={setV} />
        <div style={{ fontSize: 13, color: 'var(--ui-text-hint)' }}>
          Введено: «{v}» ({v.length}/4)
        </div>
      </div>
    );
  },
};

export const SixDigit: Story = {
  name: '6 Digits (OTP)',
  render: () => {
    const [v, setV] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: 24 }}>
        <PinInput length={6} value={v} onChange={setV} />
        <div style={{ fontSize: 13, color: 'var(--ui-text-hint)' }}>
          Код из SMS: {v || '—'}
        </div>
      </div>
    );
  },
};

export const Masked: Story = {
  name: 'Masked (PIN)',
  render: () => {
    const [v, setV] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: 24 }}>
        <PinInput length={4} mask value={v} onChange={setV} />
        <div style={{ fontSize: 13, color: 'var(--ui-text-hint)' }}>
          Символы скрыты
        </div>
      </div>
    );
  },
};

export const WithCompletion: Story = {
  name: 'With Completion',
  render: () => {
    const [v, setV] = useState('');
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);

    const handleComplete = (pin: string) => {
      if (pin === '1234') { setDone(true); setError(false); }
      else { setError(true); setV(''); }
    };

    return (
      <List>
        <Section header={done ? 'Доступ разрешён' : error ? 'Неверный PIN' : 'Введите PIN'}>
          <Inset vertical>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <PinInput
                length={4}
                mask
                value={v}
                onChange={val => { setV(val); setError(false); setDone(false); }}
                onComplete={handleComplete}
              />
              {done  && <div style={{ color: '#16a34a', fontSize: 14, fontWeight: 500 }}>Верно!</div>}
              {error && <div style={{ color: 'var(--ui-danger)', fontSize: 14 }}>Неверный PIN. Попробуйте ещё раз.</div>}
              <div style={{ fontSize: 12, color: 'var(--ui-text-hint)' }}>Правильный PIN: 1234</div>
            </div>
          </Inset>
        </Section>
      </List>
    );
  },
};

export const Disabled: Story = {
  render: () => <PinInput length={4} value="12" disabled />,
};

// Note: value — строка из 0..length цифр (заполняется слева направо).
// onComplete вызывается когда length === value.length.
// mask=true показывает точки — для PIN-кодов.
// Поддерживает вставку через Ctrl+V / долгое нажатие.
// Стрелки ←/→ и Backspace работают корректно.
