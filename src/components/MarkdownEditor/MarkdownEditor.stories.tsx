import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { AppRoot } from '../AppRoot';
import { MarkdownEditor } from './MarkdownEditor';

const meta: Meta<typeof MarkdownEditor> = {
  title: 'UI/MarkdownEditor',
  component: MarkdownEditor,
  parameters: {},
  decorators: [
    (Story) => (
      <AppRoot appearance="light">
        <Story />
      </AppRoot>
    ),
  ],
  argTypes: {
    height: { control: { type: 'range', min: 200, max: 800, step: 50 } },
    colorMode: { control: 'radio', options: ['light', 'dark'] },
  },
};
export default meta;

type Story = StoryObj<typeof MarkdownEditor>;

const SAMPLE = `# Пример документа

Это **жирный** текст и _курсив_.

## Список возможностей

- Поддержка GFM
- Подсветка синтаксиса
- Встроенный предпросмотр

## Таблица

| Поле | Тип | Описание |
|------|-----|----------|
| id | number | Идентификатор |
| title | string | Заголовок |
| content | string | Содержимое |

## Код

\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`

> Цитата: используйте Markdown для форматирования.
`;

const Controlled = (args: Partial<ComponentProps<typeof MarkdownEditor>>) => {
  const [value, setValue] = useState(args.value ?? '');
  return <MarkdownEditor {...args} value={value} onChange={setValue} />;
};

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    value: SAMPLE,
    header: 'Содержимое (Markdown)',
    height: 400,
    colorMode: 'light',
    placeholder: 'Напишите содержимое...',
  },
};

export const Dark: Story = {
  render: (args) => <Controlled {...args} />,
  decorators: [
    (Story) => (
      <AppRoot appearance="dark">
        <div style={{ background: 'var(--ui-bg)', minHeight: '100vh', padding: 16 }}>
          <Story />
        </div>
      </AppRoot>
    ),
  ],
  args: {
    value: SAMPLE,
    header: 'Редактор (тёмная тема)',
    height: 400,
    colorMode: 'dark',
  },
};

export const Empty: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    value: '',
    header: 'Новый пост',
    placeholder: 'Начните вводить текст в формате Markdown...',
    height: 300,
  },
};

export const Compact: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    value: '## Краткое описание\n\nКороткий текст для компактного редактора.',
    height: 200,
  },
};

export const Usage: Story = {
  render: () => {
    const [title, setTitle] = useState('Обновление платформы v2.4');
    const [content, setContent] = useState(`## Что нового

- Ускорен старт хостов в **3 раза**
- Новый дашборд ресурсов
- Поддержка TON Connect

## Инструкция обновления

\`\`\`bash
curl -s update.hikka.host | bash
\`\`\`

> Все существующие хосты обновляются автоматически.`);
    return (
      <AppRoot appearance="light" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок поста"
          style={{
            width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--ui-border)',
            fontSize: 17, fontWeight: 600, color: 'var(--ui-text)', background: 'var(--ui-surface)',
            outline: 'none', boxSizing: 'border-box',
          }}
        />
        <MarkdownEditor value={content} onChange={setContent} header="Содержимое" height={360} colorMode="light" />
        <div style={{ fontSize: 12, color: 'var(--ui-text-hint)' }}>
          Предпросмотр доступен по вкладке Preview в редакторе
        </div>
      </AppRoot>
    );
  },
};

// Note: MarkdownEditor — только для ввода; для отображения используй Markdown.
// Всегда controlled: value + onChange обязательны.
// header — метка над редактором (как у Input).
// height задавай явно в px; без него редактор схлопывается.
// colorMode должен совпадать с темой приложения (light/dark).
