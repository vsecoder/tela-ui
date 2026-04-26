import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { At, Magnifier, Person, Eye, EyeSlash, Lock, Server, Globe } from '@gravity-ui/icons';
import { Input } from './Input';
import { Section } from '../Section';
import { List } from '../List';

const iconProps = { width: 16, height: 16 };

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  decorators: [(Story) => <List><Section><Story /></Section></List>],
  argTypes: {
    header:      { control: 'text' },
    placeholder: { control: 'text' },
    type:        { control: 'select', options: ['text', 'password', 'email', 'number', 'tel', 'url', 'datetime-local'] },
    readOnly:    { control: 'boolean' },
    disabled:    { control: 'boolean' },
    before:      { control: false },
    after:       { control: false },
  },
  args: {
    header: 'Поле',
    placeholder: 'Введите значение…',
    type: 'text',
    readOnly: false,
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Playground: Story = {};

export const Default: Story = {
  args: { header: 'Имя', placeholder: 'Введите имя' },
};

export const WithLeftIcon: Story = {
  args: { header: 'Логин', placeholder: 'username', before: <At {...iconProps} /> },
};

export const WithRightIcon: Story = {
  args: { header: 'Поиск', placeholder: 'Поиск…', after: <Magnifier {...iconProps} /> },
};

export const Password: Story = {
  args: {
    header: 'Пароль',
    type: 'password',
    placeholder: '••••••••',
    before: <Lock {...iconProps} />,
    after: <EyeSlash {...iconProps} />,
  },
};

export const ReadOnly: Story = {
  args: {
    header: 'Пользователь',
    value: 'alice',
    readOnly: true,
    before: <Person {...iconProps} />,
  },
};

export const Disabled: Story = {
  args: {
    header: 'Недоступно',
    placeholder: 'Нельзя редактировать',
    disabled: true,
    after: <Eye {...iconProps} />,
  },
};

export const DatetimeLocal: Story = {
  args: { header: 'Дата и время', type: 'datetime-local' },
};

// Decorator wraps content in <List><Section> automatically
export const Usage: Story = {
  render: () => {
    const [host, setHost] = useState('');
    const [port, setPort] = useState('22');
    const [user, setUser] = useState('root');
    return (
      <>
        <Input header="Адрес сервера" placeholder="185.12.34.56" value={host} onChange={(e) => setHost(e.target.value)} before={<Server {...iconProps} />} />
        <Input header="SSH порт" placeholder="22" type="number" value={port} onChange={(e) => setPort(e.target.value)} before={<Globe {...iconProps} />} />
        <Input header="Пользователь" placeholder="root" value={user} onChange={(e) => setUser(e.target.value)} before={<Person {...iconProps} />} />
        <Input header="Пароль" type="password" placeholder="••••••••" before={<Lock {...iconProps} />} after={<EyeSlash {...iconProps} />} />
      </>
    );
  },
};

// Note: Input всегда внутри Section > List.
// header — обязателен, показывается над полем.
// before — иконка типа поля (Server, Lock, At).
// after — действие (Eye для пароля, Magnifier для поиска).
// type="number" для числовых значений (порт, кол-во).
// readOnly для значений только для просмотра (IP адрес, ID).
