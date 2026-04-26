import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
import { Button } from '../Button/Button';

const meta: Meta<typeof Stepper> = {
  title: 'UI/Stepper',
  component: Stepper,
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

const STEPS = [
  { label: 'Конфигурация',  description: 'Выбор тарифа и региона' },
  { label: 'Оплата',        description: 'Способ оплаты' },
  { label: 'Запуск',        description: 'Создание сервера' },
];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { steps: STEPS, current: 1 },
};

// ─── Интерактивный wizard ─────────────────────────────────────────────────────

export const WizardFlow: Story = {
  name: 'Wizard (Interactive)',
  render: () => {
    const [step, setStep] = useState(0);
    const panels = [
      'Выберите тариф и регион сервера',
      'Введите данные карты для оплаты',
      'Сервер создаётся, подождите…',
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Stepper steps={STEPS} current={step} />
        <div style={{
          padding: '20px 16px',
          background: 'var(--ui-surface)',
          borderRadius: 12,
          border: '1px solid var(--ui-border)',
          fontSize: 14,
          color: 'var(--ui-text-sub)',
        }}>
          {panels[step]}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {step > 0 && (
            <Button mode="outline" onClick={() => setStep((s) => s - 1)}>Назад</Button>
          )}
          {step < STEPS.length - 1 && (
            <Button onClick={() => setStep((s) => s + 1)}>Далее</Button>
          )}
          {step === STEPS.length - 1 && (
            <Button onClick={() => setStep(0)}>Сначала</Button>
          )}
        </div>
      </div>
    );
  },
};

// ─── Вертикальный ─────────────────────────────────────────────────────────────

export const Vertical: Story = {
  name: 'Vertical',
  render: () => (
    <Stepper
      steps={[
        { label: 'Конфигурация', description: 'Тариф выбран: Pro' },
        { label: 'Оплата',       description: 'Обрабатывается…' },
        { label: 'Запуск' },
      ]}
      current={1}
      orientation="vertical"
    />
  ),
};

// ─── С ошибкой ───────────────────────────────────────────────────────────────

export const WithError: Story = {
  name: 'With Error',
  render: () => (
    <Stepper
      steps={[
        { label: 'Конфигурация' },
        { label: 'Оплата', status: 'error', description: 'Платёж отклонён' },
        { label: 'Запуск' },
      ]}
      current={1}
    />
  ),
};

// Note: Stepper авто-вычисляет статус из current: < current = completed, = active, > pending.
// Переопредели step.status для ошибок или нестандартных состояний.
