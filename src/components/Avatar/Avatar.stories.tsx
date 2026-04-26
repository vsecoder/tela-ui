import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { Cell } from '../Cell';
import { Section } from '../Section';
import { List } from '../List';
import { Navigation } from '../Navigation';
import { TypographyLabel } from '../Typography';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: { type: 'number', min: 20, max: 120, step: 4 } },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/80',
    size: 40,
  },
};

export const Fallback: Story = {
  args: { size: 40 },
};

export const Large: Story = {
  args: { src: 'https://i.pravatar.cc/120', size: 80 },
};

export const Usage: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <List>
      <Section header="Участники" footer="3 участника · 1 администратор">
        <Cell subtitle="Администратор" before={<Avatar src="https://i.pravatar.cc/40?img=1" size={36} />} after={<Navigation />} onClick={() => {}}>Алиса Петрова</Cell>
        <Cell subtitle="Участник" before={<Avatar src="https://i.pravatar.cc/40?img=2" size={36} />} after={<Navigation />} onClick={() => {}}>Боб Иванов</Cell>
        <Cell subtitle="Участник — не в сети" before={<Avatar size={36} />} after={<Navigation />} onClick={() => {}}>
          <span>Сергей К. <TypographyLabel style={{ marginLeft: 4 }}>offline</TypographyLabel></span>
        </Cell>
      </Section>
    </List>
  ),
};

// Note: size=36–40 для строк списка, size=64–80 для шапки профиля.
// Без src — автоматически рендерится fallback (серый круг).
// Оборачивайте Avatar в before= у Cell для членов команды.
// Не задавайте border-radius вручную — Avatar уже круглый.
