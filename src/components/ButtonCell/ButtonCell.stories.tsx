import type { Meta, StoryObj } from '@storybook/react';
import { CirclePlus, Gear, Lock } from '@gravity-ui/icons';
import { ButtonCell } from './ButtonCell';
import { Navigation } from '../Navigation';
import { Section } from '../Section';
import { List } from '../List';

const iconProps = { width: 20, height: 20 };

const meta: Meta<typeof ButtonCell> = {
  title: 'UI/ButtonCell',
  component: ButtonCell,
  decorators: [(Story) => <List><Section><Story /></Section></List>],
  argTypes: { onClick: { action: 'clicked' } },
};
export default meta;

type Story = StoryObj<typeof ButtonCell>;

export const Default: Story = {
  args: { children: 'Add item', before: <CirclePlus {...iconProps} /> },
};

export const Disabled: Story = {
  args: { children: 'Not available', disabled: true, before: <Lock {...iconProps} /> },
};

export const WithAfter: Story = {
  args: { children: 'Open settings', before: <Gear {...iconProps} />, after: <Navigation /> },
};

export const Usage: Story = {
  render: () => (
    <>
      <ButtonCell before={<CirclePlus {...iconProps} />} after={<Navigation />} onClick={() => {}}>Создать хост</ButtonCell>
      <ButtonCell before={<CirclePlus {...iconProps} />} onClick={() => {}}>Пригласить участника</ButtonCell>
      <ButtonCell before={<Lock {...iconProps} />} disabled>Изменить тариф (недоступно)</ButtonCell>
    </>
  ),
};

// Note: ButtonCell — кнопка-действие внутри Section (не Cell).
// Используй для "Создать", "Добавить", "Пригласить" — первичных действий в списке.
// after=<Navigation /> если кнопка открывает новый экран/страницу.
// Деструктивные действия (Удалить) — лучше через ActionMenu, не ButtonCell.
