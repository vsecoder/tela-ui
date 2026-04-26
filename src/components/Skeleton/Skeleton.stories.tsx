import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from 'boneyard-js/react';
import { Button } from '../Button';
import { Server } from '@gravity-ui/icons';
import { Cell } from '../Cell/Cell';
import { Section } from '../Section/Section';
import { List } from '../List/List';

const iconProps = { width: 20, height: 20 };

const fixture = [0, 1, 2].map((i) => (
  <Cell key={i} subtitle="Загрузка…" before={<Server {...iconProps} />}>
    Загрузка данных
  </Cell>
));

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  decorators: [(Story) => <List><Section><Story /></Section></List>],
  argTypes: {
    loading: { control: 'boolean' },
    animate: { control: 'radio', options: ['shimmer', 'pulse', 'wave', 'none'] },
    name:    { control: 'text' },
    fixture: { control: false },
  },
  args: {
    name: 'demo',
    loading: true,
    animate: 'shimmer',
    fixture,
  },
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  args: {
    children: (
      <Cell subtitle="us-east-1" before={<Server {...iconProps} />}>prod-01</Cell>
    ),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: (
      <Cell subtitle="us-east-1" before={<Server {...iconProps} />}>prod-01</Cell>
    ),
  },
};

export const Loaded: Story = {
  args: {
    loading: false,
    children: (
      <Cell subtitle="us-east-1" before={<Server {...iconProps} />}>prod-01</Cell>
    ),
  },
};

export const Usage: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);
    const servers = [
      { name: 'prod-01', region: 'eu-west-1' },
      { name: 'prod-02', region: 'us-east-1' },
      { name: 'staging-01', region: 'ap-south-1' },
    ];
    return (
      <>
        <Skeleton
          name="servers"
          loading={loading}
          fixture={servers.map((_s, i) => (
            <Cell key={i} subtitle="Загрузка…" before={<Server {...iconProps} />}>…</Cell>
          ))}
        >
          {servers.map((s) => (
            <Cell key={s.name} subtitle={s.region} before={<Server {...iconProps} />}>{s.name}</Cell>
          ))}
        </Skeleton>
        <div style={{ padding: '8px 16px' }}>
          <Button size="s" mode="outline" onClick={() => setLoading((v) => !v)}>
            {loading ? 'Симулировать загрузку данных' : 'Сбросить в загрузку'}
          </Button>
        </div>
      </>
    );
  },
};

// Note: Skeleton оборачивает реальный контент как children.
// fixture — placeholder-контент той же структуры, показывается пока loading=true.
// name — обязателен для правильной анимации между состояниями.
// Количество fixture-элементов должно совпадать с ожидаемым кол-вом реальных.
// animate="shimmer" по умолчанию — подходит для большинства случаев.
