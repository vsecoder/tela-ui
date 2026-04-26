import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Globe } from '@gravity-ui/icons';
import { MultiSelect } from './MultiSelect';
import { List } from '../List';
import { Section } from '../Section';

const regionOptions = [
  { value: 'eu-west-1', label: 'EU West (Нидерланды)' },
  { value: 'us-east-1', label: 'US East (Вирджиния)' },
  { value: 'ap-south-1', label: 'Asia Pacific (Индия)' },
  { value: 'sa-east-1', label: 'SA East (Бразилия)' },
  { value: 'ap-northeast-1', label: 'Asia Pacific (Токио)' },
];

const langOptions = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
  { value: 'uk', label: 'Украинский' },
  { value: 'de', label: 'Deutsch' },
  { value: 'fr', label: 'Francais' },
  { value: 'es', label: 'Espanol' },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'UI/MultiSelect',
  component: MultiSelect,
  parameters: {},
  argTypes: {
    header:      { control: 'text' },
    placeholder: { control: 'text' },
    searchable:  { control: 'boolean' },
    disabled:    { control: 'boolean' },
    before:      { control: false, table: { disable: true } },
    options:     { control: false, table: { disable: true } },
    onChange:    { control: false, table: { disable: true } },
    value:       { control: false, table: { disable: true } },
  },
  args: { header: 'Выбор', disabled: false, searchable: false },
  decorators: [(Story) => <List><Section><Story /></Section></List>],
};
export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Playground: Story = {
  render: (args) => {
    const [v, setV] = useState<string[]>([]);
    return (
      <MultiSelect
        {...args}
        options={regionOptions}
        value={v}
        onChange={setV}
        placeholder="Выберите регионы"
      />
    );
  },
};

export const WithSearch: Story = {
  name: 'Searchable',
  render: () => {
    const [v, setV] = useState<string[]>(['ru']);
    return (
      <MultiSelect
        header="Языки уведомлений"
        before={<Globe width={16} height={16} />}
        options={langOptions}
        value={v}
        onChange={setV}
        searchable
        placeholder="Выберите языки"
      />
    );
  },
};

export const Preselected: Story = {
  name: 'Pre-selected',
  render: () => {
    const [v, setV] = useState<string[]>(['eu-west-1', 'us-east-1']);
    return (
      <MultiSelect
        header="Регионы мониторинга"
        options={regionOptions}
        value={v}
        onChange={setV}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <MultiSelect
      header="Регионы (недоступно)"
      options={regionOptions}
      value={['eu-west-1']}
      disabled
    />
  ),
};
