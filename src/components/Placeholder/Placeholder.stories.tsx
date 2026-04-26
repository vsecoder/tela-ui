import type { Meta, StoryObj } from '@storybook/react';
import { Lock, Server, TriangleExclamation } from '@gravity-ui/icons';
import { Button } from '../Button';
import { Placeholder } from './Placeholder';
import { Section } from '../Section';
import { List } from '../List';

const meta: Meta<typeof Placeholder> = {
  title: 'UI/Placeholder',
  component: Placeholder,
  decorators: [(Story) => <List><Section><Story /></Section></List>],
  argTypes: {
    header:      { control: 'text' },
    description: { control: 'text' },
    children:    { control: false },
  },
  args: {
    header: 'Ничего не найдено',
    description: 'Элементы ещё не были созданы.',
  },
};
export default meta;

type Story = StoryObj<typeof Placeholder>;

export const Playground: Story = {};

export const Empty: Story = {
  args: {
    header: 'Нет серверов',
    description: 'Добавьте сервер, чтобы начать.',
    children: <Server width={48} height={48} />,
  },
};

export const NoAccess: Story = {
  args: {
    header: 'Нет доступа',
    description: 'У вас нет прав для просмотра этой страницы.',
    children: <Lock width={48} height={48} />,
  },
};

export const ErrorState: Story = {
  args: {
    header: 'Что-то пошло не так',
    description: 'Не удалось загрузить данные сервера.',
    children: <TriangleExclamation width={48} height={48} />,
  },
};

export const Usage: Story = {
  render: () => (
    <Placeholder
      header="Нет хостов"
      description="Создайте первый хост, чтобы начать работу с платформой."
    >
      <Server width={48} height={48} />
      <Button size="l">Создать хост</Button>
    </Placeholder>
  ),
};

// Note: Placeholder всегда внутри Section > List.
// children — иконка (48×48) и опциональная кнопка-CTA.
// header — одна короткая фраза без точки в конце.
// description — одно-два предложения с объяснением/инструкцией.
// Не используй Placeholder для состояния загрузки — для этого Skeleton.
