import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { Cell } from '../Cell/Cell';
import { Section } from '../Section/Section';
import { List } from '../List/List';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  argTypes: {
    page:     { control: { type: 'number', min: 1 } },
    total:    { control: { type: 'number', min: 1 } },
    onChange: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Playground: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} total={10} onChange={setPage} />;
  },
};

export const FirstPage: Story = {
  args: { page: 1, total: 8, onChange: () => {} },
};

export const MiddlePage: Story = {
  args: { page: 4, total: 8, onChange: () => {} },
};

export const LastPage: Story = {
  args: { page: 8, total: 8, onChange: () => {} },
};

export const SinglePage: Story = {
  args: { page: 1, total: 1, onChange: () => {} },
};

const servers = [
  { name: 'prod-01',     region: 'eu-west-1',  status: 'online'  },
  { name: 'prod-02',     region: 'us-east-1',  status: 'online'  },
  { name: 'staging-01',  region: 'ap-south-1', status: 'offline' },
  { name: 'staging-02',  region: 'eu-west-2',  status: 'online'  },
  { name: 'dev-01',      region: 'us-west-1',  status: 'online'  },
  { name: 'dev-02',      region: 'eu-north-1', status: 'offline' },
  { name: 'backup-01',   region: 'us-east-2',  status: 'online'  },
  { name: 'backup-02',   region: 'sa-east-1',  status: 'online'  },
];

const PAGE_SIZE = 3;

export const Usage: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(servers.length / PAGE_SIZE);
    const visible    = servers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
      <List>
        <Section header="Серверы">
          {visible.map((s) => (
            <Cell key={s.name} subtitle={s.region} hint={s.status === 'online' ? '●' : '○'}>
              {s.name}
            </Cell>
          ))}
        </Section>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 16px 16px' }}>
          <Pagination page={page} total={totalPages} onChange={setPage} />
        </div>
      </List>
    );
  },
};

// Note: Pagination — controlled, всегда page + total + onChange.
// Страницы 1-based. Кнопки отключаются автоматически на первой/последней странице.
// Размещай под списком, по центру, с padding 8px сверху.
