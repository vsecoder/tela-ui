import type { Meta, StoryObj } from '@storybook/react';
import { Markdown } from './Markdown';
import { Inset } from '../Inset';
import { Breadcrumbs } from '../Breadcrumbs';
import { TypographyHeadline, TypographyLabel } from '../Typography';

const blogPost = `# Hikka v2.0 — что нового

Мы рады представить **Hikka 2.0** — крупнейшее обновление платформы за последний год.

## Ключевые изменения

- Переработан движок хостинга: старт хоста теперь занимает **менее 3 секунд**
- Новый дашборд с графиками потребления ресурсов
- Поддержка **TON Connect** для оплаты подписки

## Пример конфига

\`\`\`json
{
  "version": "2.0",
  "userbot": "hikka-stable",
  "region": "eu-west",
  "resources": { "cpu": 1, "ram": 512 }
}
\`\`\`

## Важное примечание

> Если вы используете версию 1.x — обновление **автоматическое**.
> Ручных действий не требуется.

---

Полный список изменений доступен в [CHANGELOG](https://example.com).

| Параметр | v1.x | v2.0 |
|----------|------|------|
| Старт хоста | ~15s | ~3s |
| Регионов | 2 | 5 |
| Userbots | 1 | 4 |
`;

const meta: Meta<typeof Markdown> = {
  title: 'UI/Markdown',
  component: Markdown,
  argTypes: {
    children: { control: 'text' },
  },
  args: {
    children: '**Привет!** Это _Markdown_ с `инлайн-кодом` и [ссылкой](https://example.com).',
  },
};

export default meta;
type Story = StoryObj<typeof Markdown>;

export const Playground: Story = {};

export const BlogPost: Story = {
  args: { children: blogPost },
};

export const Short: Story = {
  args: {
    children: '**Важно:** аккаунт будет заморожен через 3 дня. Пополните баланс или свяжитесь с поддержкой.',
  },
};

export const WithTable: Story = {
  args: {
    children: `## Тарифы\n\n| Тариф | Цена | Хостов |\n|-------|------|--------|\n| Free | 0 ₽ | 1 |\n| Basic | 299 ₽ | 5 |\n| Pro | 999 ₽ | 20 |`,
  },
};

export const Usage: Story = {
  render: () => (
    <>
      <Inset vertical>
        <Breadcrumbs items={[{ label: 'Главная', onClick: () => {} }, { label: 'Блог', onClick: () => {} }, { label: 'Hikka v2.0' }]} />
      </Inset>
      <Inset vertical>
        <TypographyHeadline style={{ marginBottom: 4 }}>Hikka v2.0 — что нового</TypographyHeadline>
        <TypographyLabel>22 апреля 2026 · Команда Tela</TypographyLabel>
      </Inset>
      <Inset>
        <Markdown>{`Мы рады представить **Hikka 2.0** — крупнейшее обновление платформы.

## Ключевые изменения

- Старт хоста теперь занимает **менее 3 секунд**
- Новый дашборд с графиками ресурсов
- Поддержка **TON Connect** для оплаты

\`\`\`bash
curl -s install.hikka.host | bash
\`\`\`

> Старые конфиги совместимы — миграция автоматическая.`}</Markdown>
      </Inset>
    </>
  ),
};

// Note: Markdown — только для отображения, не для ввода (используй MarkdownEditor).
// Оборачивай в <Inset> вне List/Section для правильных отступов.
// GFM поддерживается: таблицы, чеклисты, code fences с подсветкой.
// Не передавай пользовательский контент без санитизации.
