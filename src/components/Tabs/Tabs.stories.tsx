import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { List } from '../List/List';
import { Section } from '../Section/Section';
import { Cell } from '../Cell/Cell';
import { StatusIndicator } from '../StatusIndicator/StatusIndicator';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  argTypes: {
    value:    { control: false },
    onChange: { control: false },
    items:    { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [tab, setTab] = useState('overview');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Tabs
          items={[
            { label: 'Обзор', value: 'overview' },
            { label: 'Логи',  value: 'logs' },
            { label: 'Настройки', value: 'settings' },
          ]}
          value={tab}
          onChange={setTab}
        />
        <div style={{ padding: '4px 16px', fontSize: 14, color: 'var(--ui-text-sub)' }}>
          Активная вкладка: <strong>{tab}</strong>
        </div>
      </div>
    );
  },
};

// ─── Вкладки сервера ─────────────────────────────────────────────────────────

export const ServerTabs: Story = {
  name: 'Server Tabs',
  render: () => {
    const [tab, setTab] = useState<'overview' | 'logs' | 'settings'>('overview');
    return (
      <List>
        <div style={{ borderBottom: '1px solid var(--ui-border)' }}>
          <Tabs
            items={[
              { label: 'Обзор',     value: 'overview' },
              { label: 'Логи',      value: 'logs' },
              { label: 'Настройки', value: 'settings' },
            ]}
            value={tab}
            onChange={(v) => setTab(v as typeof tab)}
          />
        </div>
        {tab === 'overview' && (
          <Section header="Состояние">
            <Cell subtitle="eu-west-1" after={<StatusIndicator state="online" size="s" />}>prod-01</Cell>
            <Cell subtitle="8 vCPU / 16 GB RAM">Конфигурация</Cell>
            <Cell subtitle="99.9%">Uptime</Cell>
          </Section>
        )}
        {tab === 'logs' && (
          <Section header="Последние события">
            <Cell subtitle="10:01:22">Server started</Cell>
            <Cell subtitle="10:01:23">Listening on :8080</Cell>
            <Cell subtitle="10:02:10">Health check OK</Cell>
          </Section>
        )}
        {tab === 'settings' && (
          <Section header="Конфигурация">
            <Cell subtitle="prod-01">Имя сервера</Cell>
            <Cell subtitle="eu-west-1">Регион</Cell>
            <Cell subtitle="Ubuntu 24.04">ОС</Cell>
          </Section>
        )}
      </List>
    );
  },
};

// ─── Заблокированная вкладка ─────────────────────────────────────────────────

export const WithDisabled: Story = {
  name: 'Disabled Tab',
  render: () => {
    const [tab, setTab] = useState('active');
    return (
      <Tabs
        items={[
          { label: 'Активные',  value: 'active' },
          { label: 'Архив',     value: 'archived' },
          { label: 'Beta',      value: 'beta', disabled: true },
        ]}
        value={tab}
        onChange={setTab}
      />
    );
  },
};

// Note: Tabs — для навигации по страницам/разделам (underline indicator).
// Toggle — для выбора из вариантов в пределах одной страницы (pill indicator).
// Tabs не ограничены числом пунктов, но при > 5 переходи к Select или Navbar.
