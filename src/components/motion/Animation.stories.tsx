import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Server, CircleCheck, Bell, ChevronDown } from '@gravity-ui/icons';
import { motion } from 'motion/react';
import { FadeIn } from './FadeIn';
import { ScaleIn } from './ScaleIn';
import { Collapse } from './Collapse';
import { Stagger } from './Stagger';
import { Presence } from './Presence';
import { NumberPop } from './NumberPop';
import { Button } from '../Button/Button';
import { Cell } from '../Cell/Cell';
import { Section } from '../Section/Section';
import { List } from '../List/List';
import { Badge } from '../Badge/Badge';

const meta: Meta = {
  title: 'Motion/Animation',
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

const Box = ({ children, style }: { children?: ReactNode; style?: CSSProperties }) => (
  <div style={{
    padding: '12px 16px', borderRadius: 12, background: 'var(--ui-surface)',
    border: '1px solid var(--ui-border)', fontSize: 14, ...style,
  }}>
    {children}
  </div>
);

// ─── FadeIn ──────────────────────────────────────────────────────────────────

export const FadeInDemo: Story = {
  name: 'FadeIn',
  render: () => {
    const [key, setKey] = useState(0);
    const dirs = ['up', 'down', 'left', 'right', 'none'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Button onClick={() => setKey((k) => k + 1)}>Переиграть</Button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {dirs.map((from, i) => (
            <FadeIn key={`${key}-${from}`} from={from} delay={i * 0.08}>
              <Box>from="{from}"</Box>
            </FadeIn>
          ))}
        </div>
      </div>
    );
  },
};

// ─── ScaleIn ─────────────────────────────────────────────────────────────────

export const ScaleInDemo: Story = {
  name: 'ScaleIn',
  render: () => {
    const [key, setKey] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Button onClick={() => setKey((k) => k + 1)}>Переиграть</Button>
        <ScaleIn key={key}>
          <Box style={{ textAlign: 'center', padding: 32 }}>Карточка появляется с масштабом</Box>
        </ScaleIn>
      </div>
    );
  },
};

// ─── Collapse ────────────────────────────────────────────────────────────────

export const CollapseDemo: Story = {
  name: 'Collapse',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <List>
        <Section>
          <Cell
            onClick={() => setOpen((v) => !v)}
            after={
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                style={{ display: 'flex', color: 'var(--ui-hint)' }}
              >
                <ChevronDown width={18} height={18} />
              </motion.span>
            }
          >
            Детали сервера
          </Cell>
          <Collapse open={open}>
            <Cell subtitle="eu-west-1">prod-01</Cell>
            <Cell subtitle="8 vCPU / 16 GB RAM">Конфигурация</Cell>
            <Cell subtitle="Online — 99.9% uptime">Статус</Cell>
          </Collapse>
        </Section>
      </List>
    );
  },
};

// ─── Stagger ─────────────────────────────────────────────────────────────────

export const StaggerDemo: Story = {
  name: 'Stagger',
  render: () => {
    const [key, setKey] = useState(0);
    const items = ['prod-01', 'prod-02', 'staging-01', 'staging-02', 'dev-01'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Button onClick={() => setKey((k) => k + 1)}>Переиграть</Button>
        <List key={key}>
          <Section header="Серверы">
            <Stagger stagger={0.07} delay={0.05}>
              {items.map((name) => (
                <Cell key={name} before={<Server width={20} height={20} />} subtitle="online">
                  {name}
                </Cell>
              ))}
            </Stagger>
          </Section>
        </List>
      </div>
    );
  },
};

// ─── Presence ────────────────────────────────────────────────────────────────

export const PresenceDemo: Story = {
  name: 'Presence',
  render: () => {
    const [show, setShow] = useState(false);
    const [variant, setVariant] = useState<'fadeUp' | 'fadeDown' | 'scaleIn' | 'fade'>('fadeUp');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['fadeUp', 'fadeDown', 'scaleIn', 'fade'] as const).map((v) => (
            <Button key={v} mode={variant === v ? 'default' : 'outline'} onClick={() => setVariant(v)}>
              {v}
            </Button>
          ))}
        </div>
        <Button onClick={() => setShow((v) => !v)}>
          {show ? 'Скрыть' : 'Показать'}
        </Button>
        <Presence show={show} variant={variant}>
          <Box style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <CircleCheck width={20} height={20} style={{ color: '#22c55e' }} />
            Сервер успешно создан
          </Box>
        </Presence>
      </div>
    );
  },
};

// ─── NumberPop ───────────────────────────────────────────────────────────────

export const NumberPopDemo: Story = {
  name: 'NumberPop',
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={() => setCount((n) => n + 1)}>+1 уведомление</Button>
          <Button mode="outline" onClick={() => setCount(0)}>Сбросить</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Bell width={24} height={24} />
          <span style={{ fontSize: 20, fontWeight: 700 }}>
            <NumberPop animKey={count}>{count}</NumberPop>
          </span>
          <Badge variant="danger" count={count} />
        </div>
      </div>
    );
  },
};

// Note: FadeIn / ScaleIn / Stagger — entrance animations; replay by changing key.
// Collapse — animated height toggle; uses AnimatePresence internally.
// Presence — generic show/hide with variant; wrap any transient UI element.
// NumberPop — bounce-animation when animKey changes (counters, scores, badges).
