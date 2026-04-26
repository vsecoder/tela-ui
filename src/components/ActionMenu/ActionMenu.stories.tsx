import type { Meta, StoryObj } from '@storybook/react';
import { PaperPlane, CircleDollar, Diamond, TrashBin, Pencil } from '@gravity-ui/icons';
import { ActionMenu } from './ActionMenu';
import { Button } from '../Button';
import { AppRoot } from '../AppRoot';

const meta: Meta<typeof ActionMenu> = {
  title: 'UI/ActionMenu',
  component: ActionMenu,
  parameters: { layout: 'fullscreen', docs: { source: { type: 'code' } } },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title:     { control: 'text' },
    trigger:   { control: false, table: { disable: true } },
    items:     { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    title: '',
  },
};

export default meta;
type Story = StoryObj<typeof ActionMenu>;

export const Playground: Story = {
  render: (args) => (
    <ActionMenu
      title={args.title}
      trigger={<Button>Открыть меню</Button>}
      items={[
        { id: 'edit',   icon: <Pencil width={22} height={22} />,     label: 'Редактировать', description: 'Изменить данные' },
        { id: 'share',  icon: <PaperPlane width={22} height={22} />, label: 'Поделиться' },
        { id: 'delete', icon: <TrashBin width={22} height={22} />,   label: 'Удалить', danger: true },
      ]}
    />
  ),
};

export const CryptoActions: Story = {
  render: () => (
    <ActionMenu
      trigger={<Button>Открыть меню</Button>}
      items={[
        { id: 'transfer', icon: <PaperPlane width={22} height={22} />,  label: 'Перевести контакту' },
        { id: 'receive',  icon: <CircleDollar width={22} height={22} />, label: 'Получить Доллары (USDT)' },
        { id: 'ton',      icon: <Diamond width={22} height={22} />,      label: 'Перевести в TON Кошелёк' },
      ]}
    />
  ),
};

export const WithTitle: Story = {
  render: () => (
    <ActionMenu
      title="Выберите действие"
      trigger={<Button>Действия</Button>}
      items={[
        { id: 'edit',   icon: <Pencil width={22} height={22} />,   label: 'Редактировать', description: 'Изменить данные' },
        { id: 'delete', icon: <TrashBin width={22} height={22} />, label: 'Удалить', danger: true },
      ]}
    />
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <ActionMenu
      trigger={<Button>Меню с ограничениями</Button>}
      items={[
        { id: 'transfer', icon: <PaperPlane width={22} height={22} />,  label: 'Перевести контакту' },
        { id: 'receive',  icon: <CircleDollar width={22} height={22} />, label: 'Получить (недоступно)', disabled: true },
        { id: 'delete',   icon: <TrashBin width={22} height={22} />,     label: 'Удалить', danger: true },
      ]}
    />
  ),
};

export const Usage: Story = {
  render: () => (
    <ActionMenu
      title="prod-01"
      trigger={
        <div style={{
          width: 36, height: 36, borderRadius: 8, cursor: 'pointer',
          background: 'color-mix(in srgb, var(--ui-border) 80%, transparent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--ui-text)',
          fontWeight: 700, fontSize: 18, letterSpacing: 1,
        }}>⋯</div>
      }
      items={[
        { id: 'edit',    icon: <Pencil width={22} height={22} />,      label: 'Редактировать', description: 'Изменить конфиг хоста' },
        { id: 'restart', icon: <PaperPlane width={22} height={22} />,  label: 'Перезапустить' },
        { id: 'share',   icon: <CircleDollar width={22} height={22} />, label: 'Поделиться ссылкой' },
        { id: 'delete',  icon: <TrashBin width={22} height={22} />,     label: 'Удалить хост', danger: true },
      ]}
    />
  ),
};

// Note: ActionMenu — контекстное меню по кнопке (⋯, ⚙, аватар, etc.).
// trigger — любой ReactNode; ActionMenu оборачивает его в span[role=button].
// title — необязательный заголовок шторки (имя объекта).
// danger=true для деструктивных действий — красный цвет.
// disabled=true для недоступных — показывается серым, не скрывается.
// description — пояснение под label для неочевидных действий.
