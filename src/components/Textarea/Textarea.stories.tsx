import type { Meta, StoryObj } from '@storybook/react';
import { Comment, Text } from '@gravity-ui/icons';
import { Textarea } from './Textarea';
import { Section } from '../Section';
import { List } from '../List';

const iconProps = { width: 16, height: 16 };

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  decorators: [(Story) => <List><Section><Story /></Section></List>],
  argTypes: {
    header:      { control: 'text' },
    placeholder: { control: 'text' },
    rows:        { control: { type: 'number', min: 1, max: 20 } },
    disabled:    { control: 'boolean' },
    readOnly:    { control: 'boolean' },
    before:      { control: false },
  },
  args: {
    header: 'Описание',
    placeholder: 'Введите описание…',
    rows: 4,
    disabled: false,
    readOnly: false,
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Playground: Story = {};

export const Default: Story = {
  args: { header: 'Описание', placeholder: 'Введите описание…', rows: 4 },
};

export const WithIcon: Story = {
  args: {
    header: 'Описание',
    placeholder: 'Введите описание…',
    rows: 4,
    before: <Text {...iconProps} />,
  },
};

export const Comment_: Story = {
  name: 'Comment',
  args: {
    header: 'Комментарий',
    placeholder: 'Напишите комментарий…',
    rows: 3,
    before: <Comment {...iconProps} />,
  },
};

export const Tall: Story = {
  args: { header: 'Длинный текст', placeholder: 'Много строк…', rows: 10 },
};

export const Disabled: Story = {
  args: { header: 'Только чтение', placeholder: 'Нельзя редактировать', disabled: true },
};

export const Usage: Story = {
  render: () => (
    <>
      <Textarea
        header="Публичный SSH-ключ"
        placeholder="ssh-rsa AAAA... user@machine"
        rows={5}
        before={<Text {...iconProps} />}
      />
      <Textarea
        header="Комментарий к ключу"
        placeholder="Напишите для чего этот ключ…"
        rows={3}
        before={<Comment {...iconProps} />}
      />
    </>
  ),
};

// Note: Textarea всегда внутри Section > List.
// rows=3–5 по умолчанию; rows=8–10 для длинного контента (описания, ключи).
// Не используй Textarea для кода — используй MarkdownEditor.
// before= для иконки типа контента (Key, Text, Comment).
// Textarea авторастягивается, если rows не задан явно.
