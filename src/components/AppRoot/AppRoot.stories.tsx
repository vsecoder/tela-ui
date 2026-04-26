import type { Meta, StoryObj } from '@storybook/react';
import { AppRoot } from './AppRoot';

const meta: Meta<typeof AppRoot> = {
  title: 'UI/AppRoot',
  component: AppRoot,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    appearance: { control: 'radio', options: ['light', 'dark'] },
  },
};
export default meta;

type Story = StoryObj<typeof AppRoot>;

export const Light: Story = {
  args: { appearance: 'light', children: 'App content goes here' },
};

export const Dark: Story = {
  args: { appearance: 'dark', children: 'App content goes here' },
};
