import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Gear, Person, Server } from '@gravity-ui/icons';
import { Navigation } from './Navigation';
import { Cell } from '../Cell';
import { Section } from '../Section';
import { List } from '../List';

const meta: Meta<typeof Navigation> = {
  title: 'UI/Navigation',
  component: Navigation,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Navigation>;

export const Default: Story = {};

export const InCell: Story = {
  decorators: [(Story) => (
    <List>
      <Section header="Servers">
        <Cell subtitle="us-east-1" before={<Server width={20} height={20} />} after={<Story />}>
          prod-01
        </Cell>
      </Section>
    </List>
  )],
};

export const Usage: Story = {
  decorators: [() => (
    <List>
      <Section header="Настройки аккаунта">
        <Cell subtitle="Имя, фото, описание" before={<Person width={20} height={20} />} after={<Navigation />} onClick={() => {}}>Профиль</Cell>
        <Cell subtitle="Telegram, email" before={<Bell width={20} height={20} />} after={<Navigation />} onClick={() => {}}>Уведомления</Cell>
        <Cell subtitle="Тема, язык" before={<Gear width={20} height={20} />} after={<Navigation />} onClick={() => {}}>Интерфейс</Cell>
      </Section>
    </List>
  )],
};

// Note: Navigation — только шеврон-индикатор для Cell с onClick.
// Всегда передавайте Navigation в after= пропс Cell, не рендерьте отдельно.
// Если ячейка открывает sheet/modal — Navigation всё равно уместен.
// Не используйте Navigation для ячеек без onClick (они не кликабельны).
