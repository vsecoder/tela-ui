import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { List } from '../List/List';
import { Section } from '../Section/Section';
import { Button } from '../Button/Button';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {},
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label="Включить уведомления"
        description="Получать письма о статусе сервера"
      />
    );
  },
};

// ─── Группа ───────────────────────────────────────────────────────────────────

export const Group: Story = {
  name: 'Option Group',
  render: () => {
    const [items, setItems] = useState({
      email:   true,
      sms:     false,
      telegram: true,
    });
    const toggle = (key: keyof typeof items) =>
      setItems((prev) => ({ ...prev, [key]: !prev[key] }));
    const allChecked  = Object.values(items).every(Boolean);
    const someChecked = Object.values(items).some(Boolean);

    return (
      <List>
        <Section header="Уведомления">
          <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox
              checked={allChecked}
              indeterminate={!allChecked && someChecked}
              onChange={() => {
                const next = !allChecked;
                setItems({ email: next, sms: next, telegram: next });
              }}
              label="Выбрать все"
            />
            <div style={{ paddingLeft: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Checkbox checked={items.email}    onChange={() => toggle('email')}    label="Email" />
              <Checkbox checked={items.sms}      onChange={() => toggle('sms')}      label="SMS" />
              <Checkbox checked={items.telegram} onChange={() => toggle('telegram')} label="Telegram" />
            </div>
          </div>
        </Section>
      </List>
    );
  },
};

// ─── Принятие условий ────────────────────────────────────────────────────────

export const Agreement: Story = {
  name: 'Terms Acceptance',
  render: () => {
    const [agreed, setAgreed] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Checkbox
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          label="Принять условия использования"
          description="Нажимая «Продолжить», вы соглашаетесь с условиями сервиса и политикой конфиденциальности"
        />
        <Button disabled={!agreed}>Продолжить</Button>
      </div>
    );
  },
};

// ─── Заблокированный ─────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Checkbox checked={true}  onChange={() => {}} label="Включён (disabled)"  disabled />
      <Checkbox checked={false} onChange={() => {}} label="Выключен (disabled)" disabled />
    </div>
  ),
};

// Note: Checkbox — для множественного выбора и подтверждений.
// Для бинарных on/off настроек используй Switch.
// indeterminate работает только при partially selected группе.
