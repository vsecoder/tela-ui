import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CircleCheck } from '@gravity-ui/icons';
import { Confetti } from './Confetti';
import { Button } from '../Button/Button';
import { Cell } from '../Cell/Cell';
import { Section } from '../Section/Section';
import { List } from '../List/List';
import { Snackbar } from '../Snackbar/Snackbar';

const meta: Meta<typeof Confetti> = {
  title: 'Motion/Confetti',
  component: Confetti,
  parameters: { layout: 'padded' },
  argTypes: {
    count:      { control: { type: 'range', min: 10, max: 120, step: 5 } },
    onComplete: { control: false },
    origin:     { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Confetti>;

// ─── Rain (default) ───────────────────────────────────────────────────────────

export const Rain: Story = {
  render: () => {
    const [active, setActive] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <Button
          mode="success"
          onClick={() => setActive(true)}
          disabled={active}
        >
          🎉  Запустить конфетти
        </Button>
        {active && (
          <Confetti count={60} onComplete={() => setActive(false)} />
        )}
      </div>
    );
  },
};

// ─── Burst from point ────────────────────────────────────────────────────────

export const BurstFromButton: Story = {
  name: 'Burst (from button)',
  render: () => {
    const [active, setActive] = useState(false);
    const btnRef = useRef<HTMLDivElement>(null);

    const launch = () => {
      if (active) return;
      setActive(true);
    };

    const getOrigin = () => {
      if (!btnRef.current) return undefined;
      const r = btnRef.current.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <div ref={btnRef}>
          <Button mode="success" onClick={launch} disabled={active}>
            Купить подписку
          </Button>
        </div>
        {active && (
          <Confetti
            count={50}
            origin={getOrigin()}
            onComplete={() => setActive(false)}
          />
        )}
      </div>
    );
  },
};

// ─── Usage — purchase flow ────────────────────────────────────────────────────

export const Usage: Story = {
  render: () => {
    const [step, setStep]       = useState<'idle' | 'loading' | 'success'>('idle');
    const [snack, setSnack]     = useState(false);
    const [confetti, setConfetti] = useState(false);

    const purchase = () => {
      setStep('loading');
      setTimeout(() => {
        setStep('success');
        setConfetti(true);
        setSnack(true);
      }, 1200);
    };

    return (
      <div style={{ maxWidth: 390 }}>
        <List>
          <Section header="Тариф Pro" footer="Оплата списывается раз в месяц">
            <Cell subtitle="До 10 хостов · 20 GB диска">Pro — $9.99 / мес</Cell>
            <Cell subtitle="SLA 99.9% · Приоритетная поддержка">Включено</Cell>
          </Section>
        </List>

        <div style={{ padding: '12px 16px 24px' }}>
          {step === 'success' ? (
            <Button mode="success" disabled>
              <CircleCheck width={16} height={16} /> Оплачено
            </Button>
          ) : (
            <Button
              mode="default"
              disabled={step === 'loading'}
              onClick={purchase}
            >
              {step === 'loading' ? 'Обработка…' : 'Оплатить $9.99'}
            </Button>
          )}
        </div>

        {confetti && (
          <Confetti count={65} onComplete={() => setConfetti(false)} />
        )}

        {snack && (
          <div style={{ position: 'fixed', bottom: 24, left: 0, right: 0, zIndex: 10000 }}>
            <Snackbar
              before={<CircleCheck width={20} height={20} />}
              duration={4000}
              onClose={() => setSnack(false)}
            >
              Подписка Pro активирована!
            </Snackbar>
          </div>
        )}
      </div>
    );
  },
};

// Note: Confetti — только для успешных, радостных событий (покупка, достижение, запуск).
// Не используй для ошибок или нейтральных действий.
// count=60 для дождя сверху; count=40-50 для бёрста из точки.
// onComplete убирает компонент из DOM после анимации.
// origin= для бёрста с кнопки — передай центр кнопки из getBoundingClientRect.
