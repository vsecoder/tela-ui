import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'UI/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    items: { control: 'object' },
  },
  args: {
    items: [
      { label: 'Главная', onClick: () => {} },
      { label: 'Группы', onClick: () => {} },
      { label: 'Production Team' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Playground: Story = {};

export const Default: Story = {
  args: {
    items: [
      { label: 'Главная', onClick: () => {} },
      { label: 'Группы', onClick: () => {} },
      { label: 'Production Team' },
    ],
  },
};

export const DeepNav: Story = {
  args: {
    items: [
      { label: 'Главная', onClick: () => {} },
      { label: 'Группы', onClick: () => {} },
      { label: 'Production', onClick: () => {} },
      { label: 'Хосты', onClick: () => {} },
      { label: 'hikka-main-01' },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Настройки' }],
  },
};

export const Usage: Story = {
  render: () => (
    <>
      <div style={{ padding: '12px 16px 0' }}>
        <Breadcrumbs
          items={[
            { label: 'Главная', onClick: () => {} },
            { label: 'Блог', onClick: () => {} },
            { label: 'Обновление платформы v2.4' },
          ]}
        />
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--ui-text)', marginBottom: 4 }}>
          Обновление платформы v2.4
        </div>
        <div style={{ fontSize: 12, color: 'var(--ui-text-hint)' }}>24 апреля 2026 · 3 мин чтения</div>
      </div>
    </>
  ),
};

// Note: Breadcrumbs — вне List/Section, в Inset в начале страницы.
// Последний элемент — текущая страница, без onClick.
// Все предыдущие элементы должны иметь onClick для навигации.
// При длинных путях Breadcrumbs скроллится горизонтально (скролл скрыт).
// Не добавляй Breadcrumbs если глубина навигации ≤ 1 уровня.
