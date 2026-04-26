import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from './TimePicker';
import { List } from '../List/List';
import { Section } from '../Section/Section';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  render: () => {
    const [time, setTime] = useState<string | undefined>(undefined);
    return (
      <List>
        <Section header="Время самовывоза">
          <TimePicker header="" value={time} onChange={setTime} />
        </Section>
      </List>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [time, setTime] = useState('13:30');
    return (
      <List>
        <Section header="Напомнить в">
          <TimePicker header="" value={time} onChange={setTime} step={15} />
        </Section>
      </List>
    );
  },
};
