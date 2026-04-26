import type { Meta, StoryObj } from '@storybook/react';
import { Copy, PaperPlane, TrashBin, Pencil, ArrowRotateRight, Globe } from '@gravity-ui/icons';
import { List } from '../List';
import { Section } from '../Section';
import { Cell } from '../Cell';
import { InlineButtons } from './InlineButtons';

const iconProps = { width: 20, height: 20 };

const meta: Meta<typeof InlineButtons> = {
  title: 'UI/InlineButtons',
  component: InlineButtons,
  parameters: { layout: 'padded' },
  argTypes: {
    mode: { control: 'radio', options: ['default', 'scroll'] },
  },
  args: {
    mode: 'default',
  },
};
export default meta;

type Story = StoryObj<typeof InlineButtons>;

export const Playground: Story = {
  render: (args) => (
    <InlineButtons {...args}>
      <InlineButtons.Item text="Отправить" onClick={() => {}}><PaperPlane {...iconProps} /></InlineButtons.Item>
      <InlineButtons.Item text="Копировать" onClick={() => {}}><Copy {...iconProps} /></InlineButtons.Item>
      <InlineButtons.Item text="Изменить" onClick={() => {}}><Pencil {...iconProps} /></InlineButtons.Item>
      <InlineButtons.Item text="Удалить" disabled><TrashBin {...iconProps} /></InlineButtons.Item>
    </InlineButtons>
  ),
};

export const Default: Story = {
  render: (args) => (
    <InlineButtons {...args}>
      <InlineButtons.Item text="Поделиться"><PaperPlane {...iconProps} /></InlineButtons.Item>
      <InlineButtons.Item text="Копировать"><Copy {...iconProps} /></InlineButtons.Item>
      <InlineButtons.Item text="Удалить" disabled><TrashBin {...iconProps} /></InlineButtons.Item>
    </InlineButtons>
  ),
};

export const NoLabels: Story = {
  render: (args) => (
    <InlineButtons {...args}>
      <InlineButtons.Item><PaperPlane {...iconProps} /></InlineButtons.Item>
      <InlineButtons.Item><Copy {...iconProps} /></InlineButtons.Item>
      <InlineButtons.Item><ArrowRotateRight {...iconProps} /></InlineButtons.Item>
      <InlineButtons.Item disabled><TrashBin {...iconProps} /></InlineButtons.Item>
    </InlineButtons>
  ),
};

export const Scrollable: Story = {
  args: { mode: 'scroll' },
  render: (args) => (
    <InlineButtons {...args}>
      {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'].map((name) => (
        <InlineButtons.Item key={name} text={name}>
          <PaperPlane {...iconProps} />
        </InlineButtons.Item>
      ))}
    </InlineButtons>
  ),
};

export const Usage: Story = {
  render: () => (
    <List>
      <Section header="prod-01">
        <Cell subtitle="eu-west-1 · 2 vCPU · 4 GB RAM">Активен</Cell>
      </Section>
      <InlineButtons>
        <InlineButtons.Item text="Перезапуск" onClick={() => {}}><ArrowRotateRight {...iconProps} /></InlineButtons.Item>
        <InlineButtons.Item text="Копировать IP" onClick={() => {}}><Copy {...iconProps} /></InlineButtons.Item>
        <InlineButtons.Item text="Открыть" onClick={() => {}}><Globe {...iconProps} /></InlineButtons.Item>
        <InlineButtons.Item text="Удалить" onClick={() => {}}><TrashBin {...iconProps} /></InlineButtons.Item>
      </InlineButtons>
    </List>
  ),
};

// Note: InlineButtons — горизонтальный ряд действий; размещается сразу после Section в List.
// Не вкладывай InlineButtons в Section — он идёт между секциями.
// mode="scroll" для >4 кнопок чтобы не сжимались.
// text можно убрать если кнопок много и они узнаваемы по иконке.
// disabled для недоступных действий (не скрывай — показывай причину в tooltip/description).
