import type { Meta, StoryObj } from '@storybook/react';
import { Copy, ArrowRotateRight, TrashBin } from '@gravity-ui/icons';
import { ButtonGroup } from './ButtonGroup';
import { Cell } from '../Cell/Cell';
import { Section } from '../Section/Section';
import { List } from '../List/List';

const iconProps = { width: 16, height: 16 };

const meta: Meta<typeof ButtonGroup> = {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    items: { control: false, table: { disable: true } },
  },
};
export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Playground: Story = {
  render: () => (
    <ButtonGroup items={[
      { label: 'Copy',    icon: <Copy {...iconProps} />,             onClick: () => {} },
      { label: 'Restart', icon: <ArrowRotateRight {...iconProps} />, onClick: () => {} },
      { label: 'Delete',  icon: <TrashBin {...iconProps} />,         onClick: () => {}, danger: true },
    ]} />
  ),
};

export const IconOnly: Story = {
  render: () => (
    <ButtonGroup items={[
      { icon: <Copy {...iconProps} />,             onClick: () => {} },
      { icon: <ArrowRotateRight {...iconProps} />, onClick: () => {} },
      { icon: <TrashBin {...iconProps} />,         onClick: () => {}, danger: true },
    ]} />
  ),
};

export const LabelOnly: Story = {
  args: {
    items: [
      { label: 'Start',   onClick: () => {} },
      { label: 'Stop',    onClick: () => {} },
      { label: 'Rebuild', onClick: () => {} },
    ],
  },
};

export const WithDisabled: Story = {
  render: () => (
    <ButtonGroup items={[
      { label: 'Copy IP',  icon: <Copy {...iconProps} />,             onClick: () => {} },
      { label: 'Restart',  icon: <ArrowRotateRight {...iconProps} />, onClick: () => {}, disabled: true },
      { label: 'Delete',   icon: <TrashBin {...iconProps} />,         onClick: () => {}, danger: true },
    ]} />
  ),
};

export const Usage: Story = {
  render: () => (
    <List>
      <Section header="prod-01 — eu-west-1">
        <Cell subtitle="Действия с сервером" after={
          <ButtonGroup items={[
            { icon: <Copy {...iconProps} />,             onClick: () => alert('Скопирован IP'),   label: 'IP' },
            { icon: <ArrowRotateRight {...iconProps} />, onClick: () => alert('Перезапуск'),      label: 'Restart' },
            { icon: <TrashBin {...iconProps} />,         onClick: () => alert('Удалить?'),        danger: true },
          ]} />
        }>
          Управление
        </Cell>
        <Cell subtitle="prod-02 — us-east-1" after={
          <ButtonGroup items={[
            { icon: <Copy {...iconProps} />,             onClick: () => {} },
            { icon: <ArrowRotateRight {...iconProps} />, onClick: () => {}, disabled: true },
            { icon: <TrashBin {...iconProps} />,         onClick: () => {}, danger: true },
          ]} />
        }>
          prod-02
        </Cell>
      </Section>
    </List>
  ),
};

// Note: ButtonGroup — капсула из связанных действий, визуально идентична Counter.
// Используй icon + label для основных действий, icon-only для компактных строк.
// Деструктивное действие (удалить, остановить) — danger: true, всегда последнее.
// Не более 3–4 элементов; для большего числа используй ActionMenu.
// Отлично подходит как after= в Cell.
