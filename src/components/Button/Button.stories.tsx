import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRotateRight, CirclePlus, TrashBin } from '@gravity-ui/icons';
import { List } from '../List';
import { Section } from '../Section';
import { Input } from '../Input';
import { Select } from '../Select';
import { AppRoot } from '../AppRoot';
import { Button } from './Button';

const iconProps = { width: 16, height: 16 };

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'padded' },
  argTypes: {
    mode:     { control: 'radio', options: ['default', 'outline', 'plain', 'danger', 'success'] },
    size:     { control: 'radio', options: ['s', 'm', 'l'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    onClick:  { action: 'clicked' },
    before:   { control: false },
    after:    { control: false },
  },
  args: {
    children: 'Нажать',
    mode: 'default',
    size: 'm',
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Default: Story = {
  args: { children: 'Продолжить', size: 'l' },
};

export const Outline: Story = {
  args: { children: 'Отмена', mode: 'outline', size: 'l' },
};

export const Plain: Story = {
  args: { children: 'Подробнее', mode: 'plain', size: 'l' },
};

export const WithLeftIcon: Story = {
  args: { children: 'Добавить сервер', before: <CirclePlus {...iconProps} />, size: 'l' },
};

export const WithRightIcon: Story = {
  args: { children: 'Обновить', after: <ArrowRotateRight {...iconProps} />, size: 'l' },
};

export const Danger: Story = {
  args: { children: 'Удалить', before: <TrashBin {...iconProps} />, mode: 'danger', size: 'l' },
};

export const DangerOutline: Story = {
  args: { children: 'Удалить', before: <TrashBin {...iconProps} />, mode: 'outline', size: 'l' },
};

export const Success: Story = {
  args: { children: 'Запустить хост', before: <ArrowRotateRight {...iconProps} />, mode: 'success', size: 'l' },
};

export const Disabled: Story = {
  args: { children: 'Недоступно', disabled: true, size: 'l' },
};

export const Usage: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [region, setRegion] = useState('');
    return (
      <AppRoot style={{ maxWidth: 480 }}>
        <List>
          <Section header="Новый хост" footer="Хост запустится в выбранном регионе автоматически">
            <Input header="Имя хоста" placeholder="hikka-main" value={name} onChange={(e) => setName(e.target.value)} />
            <Select header="Регион" value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">— выберите регион —</option>
              <option value="eu-west-1">EU West (Нидерланды)</option>
              <option value="us-east-1">US East (Вирджиния)</option>
              <option value="ap-south-1">Asia Pacific (Сингапур)</option>
            </Select>
          </Section>
        </List>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '8px 16px 24px' }}>
          <Button size="l" disabled={!name || !region}>Создать хост</Button>
          <Button size="l" mode="outline">Отмена</Button>
        </div>
        <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            'size="l" — для CTA внизу страницы или формы',
            'size="m" — внутри модалок и блоков',
            'size="s" — встроенные inline-действия',
            'mode="outline" — вторичное действие рядом с основным',
            'mode="plain" — третичные/информационные действия',
            'Кнопка "Удалить" — всегда mode="outline" + before=<TrashBin>',
          ].map((r) => (
            <div key={r} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--ui-text-hint)' }}>
              <span style={{ color: 'var(--ui-accent)', flexShrink: 0 }}>-</span>{r}
            </div>
          ))}
        </div>
      </AppRoot>
    );
  },
};
