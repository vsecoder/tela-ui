import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { List } from '../List';
import { Section } from '../Section';
import { Cell } from '../Cell';
import { Button } from '../Button';

const meta: Meta<typeof Divider> = {
  title: 'UI/Divider',
  component: Divider,
  parameters: {},
  argTypes: {
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Plain: Story = {
  name: 'Plain',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      <Button size="l">Продолжить</Button>
      <Divider />
      <Button size="l" mode="outline">Отмена</Button>
    </div>
  ),
};

export const WithLabel: Story = {
  name: 'With Label',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      <Button size="l">Войти через Telegram</Button>
      <Divider label="или" />
      <Button size="l" mode="outline">Войти по паролю</Button>
    </div>
  ),
};

export const InList: Story = {
  name: 'In List',
  render: () => (
    <>
      <List>
        <Section header="Активные">
          <Cell subtitle="eu-west-1">prod-01</Cell>
          <Cell subtitle="us-east-1">prod-02</Cell>
        </Section>
      </List>
      <div style={{ padding: '4px 16px' }}>
        <Divider label="остановленные" />
      </div>
      <List>
        <Section>
          <Cell subtitle="ap-south-1">staging-01</Cell>
          <Cell subtitle="eu-west-1">backup-01</Cell>
        </Section>
      </List>
    </>
  ),
};

// Note: Divider — чистый разделитель без встроенных отступов.
// Добавляй padding через родительский контейнер или <Inset>.
// label — необязательная подпись по центру (line — text — line).
