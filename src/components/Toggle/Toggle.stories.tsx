import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { Cell } from '../Cell/Cell';
import { Section } from '../Section/Section';
import { List } from '../List/List';
import { Placeholder } from '../Placeholder/Placeholder';
import { TypographyBody, TypographyHeadline } from '../Typography/Typography';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  argTypes: {
    value:    { control: false },
    onChange: { control: false },
    options:  { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

// ─── Playground ───────────────────────────────────────────────────────────────
export const Playground: Story = {
  render: () => {
    const [tab, setTab] = useState('a');
    return (
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
        <Toggle
          options={[
            { label: 'Вариант A', value: 'a' },
            { label: 'Вариант B', value: 'b' },
            { label: 'Вариант C', value: 'c' },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>
    );
  },
};

// ─── 2-вкладки ───────────────────────────────────────────────────────────────
export const TwoOptions: Story = {
  render: () => {
    const [tab, setTab] = useState<'crypto' | 'ton'>('crypto');
    return (
      <List>
        <div style={{ padding: '12px 16px 0', display: 'flex', justifyContent: 'center' }}>
          <Toggle
            options={[
              { label: 'Крипто', value: 'crypto' },
              { label: 'TON',    value: 'ton' },
            ]}
            value={tab}
            onChange={setTab}
          />
        </div>
        {tab === 'crypto' && (
          <Section header="Крипто">
            <Cell subtitle="BTC / USD">Bitcoin — $67 420</Cell>
            <Cell subtitle="ETH / USD">Ethereum — $3 510</Cell>
            <Cell subtitle="SOL / USD">Solana — $172</Cell>
          </Section>
        )}
        {tab === 'ton' && (
          <Section header="TON">
            <Cell subtitle="TON / USD">Toncoin — $6.42</Cell>
            <Cell subtitle="USDT">Tether — $1.00</Cell>
            <Cell subtitle="NOT / USD">Notcoin — $0.018</Cell>
          </Section>
        )}
      </List>
    );
  },
};

// ─── 3-вкладки (период) ───────────────────────────────────────────────────────
const chartData: Record<string, string> = {
  day:   '📈  +2.4 %  за 24 ч',
  week:  '📊  +11.7 %  за неделю',
  month: '📉  −3.2 %  за месяц',
};

export const ThreeOptions: Story = {
  render: () => {
    const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
    return (
      <List>
        <div style={{ padding: '12px 16px 0', display: 'flex', justifyContent: 'center' }}>
          <Toggle
            options={[
              { label: 'День',   value: 'day' },
              { label: 'Неделя', value: 'week' },
              { label: 'Месяц',  value: 'month' },
            ]}
            value={period}
            onChange={setPeriod}
          />
        </div>
        <Section>
          <div style={{ padding: '24px 16px', textAlign: 'center' }}>
            <TypographyHeadline>{chartData[period]}</TypographyHeadline>
            <TypographyBody color="secondary" style={{ marginTop: 6 }}>
              График за выбранный период
            </TypographyBody>
          </div>
        </Section>
      </List>
    );
  },
};

// ─── Разделы по вкладкам ─────────────────────────────────────────────────────
export const TabSections: Story = {
  render: () => {
    const [tab, setTab] = useState<'active' | 'archived' | 'pending'>('active');
    return (
      <List>
        <div style={{ padding: '12px 16px 0', display: 'flex', justifyContent: 'center' }}>
          <Toggle
            options={[
              { label: 'Активные', value: 'active' },
              { label: 'Архив',    value: 'archived' },
              { label: 'Ожидание', value: 'pending' },
            ]}
            value={tab}
            onChange={setTab}
          />
        </div>
        {tab === 'active' && (
          <Section header="Активные серверы">
            <Cell subtitle="us-east-1 — online">prod-01</Cell>
            <Cell subtitle="eu-west-2 — online">prod-02</Cell>
          </Section>
        )}
        {tab === 'archived' && (
          <Section header="Архив">
            <Placeholder header="Архив пуст" description="Сюда попадают остановленные серверы" />
          </Section>
        )}
        {tab === 'pending' && (
          <Section header="Ожидают запуска">
            <Cell subtitle="ap-south-1 — provisioning">staging-01</Cell>
          </Section>
        )}
      </List>
    );
  },
};

// ─── Использование ───────────────────────────────────────────────────────────
export const Usage: Story = {
  render: () => {
    const [filter, setFilter] = useState<'all' | 'news' | 'updates'>('all');
    const posts = [
      { id: 1, type: 'news',    title: 'Новые регионы доступны',      date: '24 апр 2026' },
      { id: 2, type: 'updates', title: 'Обновление платформы v2.4',   date: '22 апр 2026' },
      { id: 3, type: 'news',    title: 'Партнёрство с CloudFlare',    date: '20 апр 2026' },
      { id: 4, type: 'updates', title: 'Исправления производительности', date: '18 апр 2026' },
    ];
    const visible = posts.filter((p) => filter === 'all' || p.type === filter);
    return (
      <List>
        <div style={{ padding: '12px 16px 0', display: 'flex', justifyContent: 'center' }}>
          <Toggle
            options={[
              { label: 'Все', value: 'all' },
              { label: 'Новости', value: 'news' },
              { label: 'Обновления', value: 'updates' },
            ]}
            value={filter}
            onChange={(v) => setFilter(v as typeof filter)}
          />
        </div>
        <Section header="Публикации">
          {visible.map((p) => (
            <Cell key={p.id} subtitle={p.date} hint={p.type === 'news' ? 'новость' : 'обновление'} onClick={() => {}}>
              {p.title}
            </Cell>
          ))}
        </Section>
      </List>
    );
  },
};

// Note: Toggle — вне Section, в Inset или прямо в List с padding.
// Только controlled: value + onChange обязательны.
// 2–3 опции максимум; для 4+ используй Select или отдельные фильтры.
// Не используй Toggle для включения/выключения — для этого Switch.

// ─── Заблокированная вкладка ─────────────────────────────────────────────────
export const WithDisabledOption: Story = {
  render: () => {
    const [tab, setTab] = useState<'usd' | 'eur' | 'rub'>('usd');
    return (
      <List>
        <div style={{ padding: '12px 16px 0', display: 'flex', justifyContent: 'center' }}>
          <Toggle
            options={[
              { label: 'USD', value: 'usd' },
              { label: 'EUR', value: 'eur' },
              { label: 'RUB', value: 'rub', disabled: true },
            ]}
            value={tab}
            onChange={setTab}
          />
        </div>
        <Section>
          <Cell subtitle="Валюта">{tab === 'usd' ? 'Доллар США' : 'Евро'}</Cell>
        </Section>
      </List>
    );
  },
};
