import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { House, Gear, Person, Bell, Star } from '@gravity-ui/icons';
import { Navbar } from './Navbar';
import { List } from '../List/List';
import { Section } from '../Section/Section';
import { Cell } from '../Cell/Cell';
import { Placeholder } from '../Placeholder/Placeholder';

const meta: Meta<typeof Navbar> = {
  title: 'UI/Navbar',
  component: Navbar,
  argTypes: {
    activeId:  { control: false },
    onChange:  { control: false },
    items:     { control: false },
    className: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Navbar>;

// ─── 3 вкладки ───────────────────────────────────────────────────────────────
export const ThreeTabs: Story = {
  render: () => {
    const [tab, setTab] = useState('home');
    const items = [
      { id: 'home',     label: 'Главная',   icon: <House  width={22} height={22} /> },
      { id: 'profile',  label: 'Профиль',   icon: <Person width={22} height={22} /> },
      { id: 'settings', label: 'Настройки', icon: <Gear   width={22} height={22} /> },
    ];
    return (
      <div style={{ paddingBottom: 64 }}>
        <List>
          {tab === 'home'     && <Section header="Главная"><Cell subtitle="Добро пожаловать">Hikkahost</Cell></Section>}
          {tab === 'profile'  && <Placeholder header="Профиль"   description="Информация об аккаунте" />}
          {tab === 'settings' && <Placeholder header="Настройки" description="Управление приложением" />}
        </List>
        <Navbar items={items} activeId={tab} onChange={setTab} />
      </div>
    );
  },
};

// ─── Использование ───────────────────────────────────────────────────────────
export const Usage: Story = {
  render: () => {
    const [tab, setTab] = useState('hosts');
    const items = [
      { id: 'hosts',    label: 'Хосты',      icon: <House  width={22} height={22} /> },
      { id: 'blog',     label: 'Блог',        icon: <Bell   width={22} height={22} />, badge: 2 },
      { id: 'profile',  label: 'Профиль',     icon: <Person width={22} height={22} /> },
      { id: 'settings', label: 'Настройки',   icon: <Gear   width={22} height={22} /> },
    ];
    return (
      <div style={{ height: 400, position: 'relative', overflow: 'hidden', background: 'var(--ui-bg)' }}>
        <div style={{ paddingBottom: 64, height: '100%', overflowY: 'auto' }}>
          <List>
            {tab === 'hosts' && (
              <Section header="Мои хосты">
                <Cell subtitle="eu-west-1 · online">prod-01</Cell>
                <Cell subtitle="us-east-1 · online">prod-02</Cell>
              </Section>
            )}
            {tab === 'blog' && (
              <Section header="Блог">
                <Cell subtitle="24 апр 2026">Обновление платформы v2.4</Cell>
                <Cell subtitle="20 апр 2026">Новые регионы доступны</Cell>
              </Section>
            )}
            {tab === 'profile' && <Placeholder header="Профиль" description="Информация об аккаунте" />}
            {tab === 'settings' && <Placeholder header="Настройки" description="Управление приложением" />}
          </List>
        </div>
        <Navbar items={items} activeId={tab} onChange={setTab} />
      </div>
    );
  },
};

// Note: Navbar — фиксированный низ приложения; оберни контент в paddingBottom=64px.
// 3–5 вкладок; при 5 иконки сжимаются — проверяй на узких экранах.
// badge принимает number или string ("99+").
// Не используй Navbar внутри модалок или страниц-детали — только на корневых экранах.

// ─── 5 вкладок с бейджами ────────────────────────────────────────────────────
export const FiveTabsWithBadges: Story = {
  render: () => {
    const [tab, setTab] = useState('home');
    const items = [
      { id: 'home',          label: 'Главная',      icon: <House  width={22} height={22} /> },
      { id: 'notifications', label: 'Уведомления',  icon: <Bell   width={22} height={22} />, badge: 3 },
      { id: 'favorites',     label: 'Избранное',    icon: <Star   width={22} height={22} />, badge: '99+' },
      { id: 'profile',       label: 'Профиль',      icon: <Person width={22} height={22} /> },
      { id: 'settings',      label: 'Настройки',    icon: <Gear   width={22} height={22} /> },
    ];
    return (
      <div style={{ paddingBottom: 64 }}>
        <List>
          <Section header={`Вкладка: ${items.find((i) => i.id === tab)?.label}`}>
            <Cell subtitle="Активный раздел">{tab}</Cell>
          </Section>
        </List>
        <Navbar items={items} activeId={tab} onChange={setTab} />
      </div>
    );
  },
};
