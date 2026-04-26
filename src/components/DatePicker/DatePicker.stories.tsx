import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { List } from '../List/List';
import { Section } from '../Section/Section';

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <List>
        <Section header="Дата рождения">
          <DatePicker
            header=""
            value={date}
            onChange={setDate}
            placeholder="Выберите дату"
            max={new Date()}
          />
        </Section>
      </List>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(2025, 3, 26));
    return (
      <List>
        <Section header="Дата заказа">
          <DatePicker
            header=""
            value={date}
            onChange={setDate}
            min={new Date()}
          />
        </Section>
      </List>
    );
  },
};
