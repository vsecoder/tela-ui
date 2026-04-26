import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Gear, Person, Server, Shield } from '@gravity-ui/icons';
import { Badge } from '../Badge';
import { Switch } from '../Switch';
import { ButtonCell } from '../ButtonCell';
import { Navigation } from '../Navigation';
import { Section } from './Section';
import { Cell } from '../Cell';
import { List } from '../List';

const iconProps = { width: 20, height: 20 };

const meta: Meta<typeof Section> = {
  title: 'UI/Section',
  component: Section,
  decorators: [(Story) => <List><Story /></List>],
  argTypes: {
    header:   { control: 'text' },
    footer:   { control: 'text' },
    children: { control: false },
  },
  args: {
    header: 'Заголовок',
    footer: '',
  },
};
export default meta;

type Story = StoryObj<typeof Section>;

export const Playground: Story = {
  args: {
    children: (
      <>
        <Cell subtitle="Подзаголовок">Строка 1</Cell>
        <Cell subtitle="Подзаголовок">Строка 2</Cell>
      </>
    ),
  },
};

export const Basic: Story = {
  args: {
    header: undefined,
    footer: undefined,
    children: <Cell>Простая строка</Cell>,
  },
};

export const WithHeader: Story = {
  args: {
    header: 'Серверы',
    children: (
      <>
        <Cell subtitle="us-east-1" before={<Server {...iconProps} />}>prod-01</Cell>
        <Cell subtitle="eu-west-1" before={<Server {...iconProps} />}>prod-02</Cell>
      </>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: 'Участники',
    footer: 'Всего: 2',
    children: (
      <>
        <Cell before={<Person {...iconProps} />}>Алиса</Cell>
        <Cell before={<Person {...iconProps} />}>Боб</Cell>
      </>
    ),
  },
};

// Decorator wraps content in <List> automatically
export const Usage: Story = {
  render: () => (
    <>
      <Section header="Серверы">
        <Cell subtitle="eu-west-1 · online" before={<Server {...iconProps} />} after={<Navigation />} onClick={() => {}}>prod-01</Cell>
        <Cell subtitle="us-east-1 · online" before={<Server {...iconProps} />} after={<Navigation />} onClick={() => {}}>prod-02</Cell>
        <ButtonCell before={<Server {...iconProps} />} onClick={() => {}}>Добавить сервер</ButtonCell>
      </Section>
      <Section header="Уведомления" footer="Push-уведомления приходят только при активных хостах">
        <Cell subtitle="Новые события" before={<Bell {...iconProps} />} after={<Switch checked={true} onChange={() => {}} />}>Уведомления</Cell>
        <Cell subtitle="Ошибки хостов" before={<Shield {...iconProps} />} after={<Switch checked={false} onChange={() => {}} />}>Алерты безопасности</Cell>
      </Section>
      <Section header="Аккаунт">
        <Cell subtitle="Имя пользователя" before={<Person {...iconProps} />} after={<Navigation />} onClick={() => {}}>Профиль</Cell>
        <Cell subtitle="Тема, язык" before={<Gear {...iconProps} />} after={<Navigation />} onClick={() => {}}>Настройки</Cell>
      </Section>
    </>
  ),
};

export const WithNodeHeader: Story = {
  name: 'ReactNode header',
  render: () => (
    <>
      <Section header={<>Активы <Badge variant="accent" size="s">4,52 ₽</Badge></>}>
        <Cell subtitle="NOT · 0,0309 ₽" before={<Server {...iconProps} />}>Notcoin</Cell>
      </Section>
      <Section header={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', textTransform: 'none', letterSpacing: 0 }}>
          <span>Серверы</span>
          <button type="button" style={{ border: 'none', background: 'none', color: 'var(--ui-accent)', fontSize: 13, cursor: 'pointer', fontWeight: 500, padding: 0 }}>Все</button>
        </div>
      }>
        <Cell subtitle="eu-west-1" before={<Server {...iconProps} />} onClick={() => {}}>prod-01</Cell>
      </Section>
    </>
  ),
};

// Note: Section всегда внутри List.
// header принимает ReactNode — можно вставить Badge, счётчик или flex-заголовок с кнопкой «Все».
// footer — пояснение под блоком (не для счётчиков — для этого есть hint в Cell).
// Группируй логически связанные Cell в одну Section.
// Не вкладывай Section в Section.
