import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';
import { Cell } from '../Cell/Cell';
import { List } from '../List/List';

const meta: Meta<typeof SearchInput> = {
  title: 'UI/SearchInput',
  component: SearchInput,
  decorators: [(Story) => <List><Story /></List>],
  argTypes: {
    size: { control: 'radio', options: ['m', 'l'] },
    disabled: { control: 'boolean' },
  },
  args: { placeholder: 'Search', size: 'l' },
};
export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Empty: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <SearchInput {...args} value={value} onChange={setValue} />;
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('Telegram');
    return <SearchInput {...args} value={value} onChange={setValue} />;
  },
};

export const SizeCompact: Story = {
  args: { size: 'm' },
  render: (args) => {
    const [value, setValue] = useState('');
    return <SearchInput {...args} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <SearchInput {...args} value="" />,
};

export const Usage: Story = {
  render: () => {
    const [q, setQ] = useState('');
    const servers = ['prod-01', 'prod-02', 'staging-01', 'dev-01', 'backup-eu'];
    const filtered = servers.filter((s) => s.includes(q.toLowerCase()));
    return (
      <List>
        <SearchInput value={q} onChange={setQ} placeholder="Найти сервер…" />
        {filtered.length > 0
          ? filtered.map((s) => <Cell key={s} subtitle="online">{s}</Cell>)
          : <Cell subtitle="Попробуйте другой запрос">Ничего не найдено</Cell>
        }
      </List>
    );
  },
};

// Note: SearchInput размещается внутри List, но НЕ внутри Section.
// Всегда controlled: value + onChange обязательны.
// Фильтрация происходит снаружи — SearchInput только хранит строку запроса.
// size="l" (дефолт) для поиска на полный экран; size="m" для компактных блоков.
