import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Globe, Server } from '@gravity-ui/icons';
import { Select } from './Select';
import { List } from '../List';
import { Section } from '../Section';

const iconProps = { width: 16, height: 16 };

const serverOptions = [
  { value: '', label: '— Выберите сервер —' },
  { value: '1', label: 'prod-01 (eu-west-1)' },
  { value: '2', label: 'prod-02 (us-east-1)' },
  { value: '3', label: 'staging-01 (ap-south-1)' },
];

const langOptions = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
  { value: 'uk', label: 'Українська' },
  { value: 'de', label: 'Deutsch' },
  { value: 'fr', label: 'Francais' },
];

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {},
  argTypes: {
    header:      { control: 'text' },
    placeholder: { control: 'text' },
    searchable:  { control: 'boolean' },
    disabled:    { control: 'boolean' },
    before:      { control: false, table: { disable: true } },
    options:     { control: false, table: { disable: true } },
    onChange:    { control: false, table: { disable: true } },
    children:    { control: false, table: { disable: true } },
  },
  args: { header: 'Выбор', disabled: false, searchable: false },
  decorators: [(Story) => <List><Section><Story /></Section></List>],
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  render: (args) => {
    const [v, setV] = useState('');
    return (
      <Select
        {...args}
        options={langOptions}
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="Выберите язык"
      />
    );
  },
};

export const Default: Story = {
  render: () => {
    const [v, setV] = useState('ru');
    return (
      <Select
        header="Язык интерфейса"
        before={<Globe {...iconProps} />}
        options={langOptions}
        value={v}
        onChange={(e) => setV(e.target.value)}
      />
    );
  },
};

export const WithSearch: Story = {
  name: 'Searchable',
  render: () => {
    const [v, setV] = useState('');
    return (
      <Select
        header="Сервер"
        before={<Server {...iconProps} />}
        options={serverOptions}
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="Выберите сервер"
        searchable
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Select
      header="Сервер (недоступно)"
      before={<Server {...iconProps} />}
      options={serverOptions}
      value="1"
      disabled
    />
  ),
};

export const LegacyChildren: Story = {
  name: 'Legacy (children)',
  render: () => {
    const [v, setV] = useState('');
    return (
      <Select
        header="Сервер (children API)"
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="Выберите..."
      >
        <option value="">Выберите...</option>
        <option value="1">prod-01</option>
        <option value="2">prod-02</option>
      </Select>
    );
  },
};
