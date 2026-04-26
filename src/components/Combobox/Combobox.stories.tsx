import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Globe, Server } from '@gravity-ui/icons';
import { Combobox } from './Combobox';
import { List } from '../List';
import { Section } from '../Section';

const countryOptions = [
  { value: 'ru', label: 'Россия' },
  { value: 'de', label: 'Германия' },
  { value: 'fr', label: 'Франция' },
  { value: 'us', label: 'США' },
  { value: 'gb', label: 'Великобритания' },
  { value: 'nl', label: 'Нидерланды' },
  { value: 'fi', label: 'Финляндия' },
  { value: 'pl', label: 'Польша' },
];

const serverOptions = [
  { value: 'prod-01', label: 'prod-01 (eu-west-1)' },
  { value: 'prod-02', label: 'prod-02 (us-east-1)' },
  { value: 'staging-01', label: 'staging-01 (ap-south-1)' },
  { value: 'backup-01', label: 'backup-01 (eu-west-1)' },
];

const meta: Meta<typeof Combobox> = {
  title: 'UI/Combobox',
  component: Combobox,
  parameters: {},
  argTypes: {
    header:    { control: 'text' },
    placeholder: { control: 'text' },
    freeInput: { control: 'boolean' },
    disabled:  { control: 'boolean' },
    before:    { control: false, table: { disable: true } },
    options:   { control: false, table: { disable: true } },
    onChange:  { control: false, table: { disable: true } },
    value:     { control: false, table: { disable: true } },
  },
  args: { header: 'Выбор', disabled: false, freeInput: false },
  decorators: [(Story) => <List><Section><Story /></Section></List>],
};
export default meta;
type Story = StoryObj<typeof Combobox>;

export const Playground: Story = {
  render: (args) => {
    const [v, setV] = useState('');
    return (
      <Combobox
        {...args}
        options={countryOptions}
        value={v}
        onChange={setV}
        placeholder="Начните вводить страну..."
      />
    );
  },
};

export const Servers: Story = {
  name: 'Server Select',
  render: () => {
    const [v, setV] = useState('');
    return (
      <Combobox
        header="Сервер"
        before={<Server width={16} height={16} />}
        options={serverOptions}
        value={v}
        onChange={setV}
        placeholder="Поиск сервера..."
      />
    );
  },
};

export const FreeInput: Story = {
  name: 'Free Input',
  render: () => {
    const [v, setV] = useState('');
    return (
      <Combobox
        header="Страна"
        before={<Globe width={16} height={16} />}
        options={countryOptions}
        value={v}
        onChange={setV}
        placeholder="Введите или выберите..."
        freeInput
      />
    );
  },
};
