import type { Meta, StoryObj } from '@storybook/react';
import { CircleCheck, TriangleExclamation } from '@gravity-ui/icons';
import { Flex } from './Flex';
import { TypographyBody, TypographyLabel } from '../Typography';

const meta: Meta<typeof Flex> = {
  title: 'UI/Flex',
  component: Flex,
  parameters: { layout: 'padded' },
  argTypes: {
    direction: { control: 'select', options: ['row', 'column', 'row-reverse', 'column-reverse'] },
    align:     { control: 'select', options: ['center', 'flex-start', 'flex-end', 'stretch', 'baseline'] },
    justify:   { control: 'select', options: ['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly'] },
    wrap:      { control: 'boolean' },
    inline:    { control: 'boolean' },
    grow:      { control: 'boolean' },
    gap:       { control: { type: 'number', min: 0, max: 48 } },
    gapX:      { control: { type: 'number', min: 0, max: 48 } },
    gapY:      { control: { type: 'number', min: 0, max: 48 } },
    as:        { control: false },
    children:  { control: false },
  },
  args: {
    direction: 'row',
    align:     'center',
    justify:   'flex-start',
    wrap:      false,
    inline:    false,
    grow:      false,
    gap:       12,
  },
};
export default meta;

type Story = StoryObj<typeof Flex>;

const Box = ({ children }: { children?: React.ReactNode }) => (
  <div style={{
    background: 'color-mix(in srgb, var(--ui-accent) 15%, transparent)',
    border: '1px solid color-mix(in srgb, var(--ui-accent) 35%, transparent)',
    borderRadius: 10,
    padding: '12px 16px',
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--ui-text)',
    whiteSpace: 'nowrap',
  }}>
    {children}
  </div>
);

export const Playground: Story = {
  render: (args) => (
    <Flex {...args}>
      <Box>Элемент A</Box>
      <Box>Элемент B</Box>
      <Box>Элемент C</Box>
    </Flex>
  ),
};

export const Row: Story = {
  args: { direction: 'row', gap: 12 },
  render: (args) => (
    <Flex {...args}>
      <Box>Иконка</Box>
      <Box>Заголовок</Box>
      <Box>Действие</Box>
    </Flex>
  ),
};

export const Column: Story = {
  args: { direction: 'column', align: 'flex-start', gap: 8 },
  render: (args) => (
    <Flex {...args}>
      <Box>Строка 1</Box>
      <Box>Строка 2 — длиннее</Box>
      <Box>Строка 3</Box>
    </Flex>
  ),
};

export const SpaceBetween: Story = {
  args: { justify: 'space-between', align: 'center', gap: 0 },
  render: (args) => (
    <Flex {...args}>
      <Box>Заголовок</Box>
      <Box>Кнопка</Box>
    </Flex>
  ),
};

export const Wrap_: Story = {
  name: 'Wrap',
  args: { wrap: true, gap: 8 },
  render: (args) => (
    <Flex {...args}>
      {['React', 'TypeScript', 'Vite', 'Storybook', 'Chart.js', 'Shiki', 'Tailwind', 'ESLint'].map((tag) => (
        <Box key={tag}>{tag}</Box>
      ))}
    </Flex>
  ),
};

const Tag = ({ children, ok }: { children: React.ReactNode; ok?: boolean }) => (
  <Flex gap={4} align="center" inline style={{
    background: ok ? 'color-mix(in srgb, var(--ui-accent) 12%, transparent)' : 'color-mix(in srgb, var(--ui-danger) 12%, transparent)',
    borderRadius: 6,
    padding: '3px 8px',
    fontSize: 12,
    color: ok ? 'var(--ui-accent)' : 'var(--ui-danger)',
    fontWeight: 500,
  }}>
    {ok ? <CircleCheck width={12} height={12} /> : <TriangleExclamation width={12} height={12} />}
    {children}
  </Flex>
);

export const Usage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 4 }}>
      <div>
        <TypographyLabel style={{ display: 'block', marginBottom: 6 }}>Строка статуса хоста</TypographyLabel>
        <Flex gap={8} align="center">
          <Tag ok>online</Tag>
          <Tag ok>SSL активен</Tag>
          <Tag>Бэкап просрочен</Tag>
        </Flex>
      </div>
      <div>
        <TypographyLabel style={{ display: 'block', marginBottom: 6 }}>Заголовок с действием</TypographyLabel>
        <Flex justify="space-between" align="center">
          <TypographyBody>Хосты группы</TypographyBody>
          <TypographyLabel color="accent" style={{ cursor: 'pointer' }}>Все -</TypographyLabel>
        </Flex>
      </div>
      <div>
        <TypographyLabel style={{ display: 'block', marginBottom: 6 }}>Теги с переносом</TypographyLabel>
        <Flex wrap gap={6}>
          {['hikka', 'userbot', 'eu-west', 'python', 'production', 'v2'].map((t) => (
            <Box key={t}>{t}</Box>
          ))}
        </Flex>
      </div>
    </div>
  ),
};

// Note: Flex — для inline-выравнивания, не страничного лейаута.
// gap всегда из токенов (4, 8, 12, 16).
// justify="space-between" + align="center" для заголовка с кнопкой справа.
// wrap=true для облака тегов.
// Не используй Flex для вертикального стека страниц — для этого просто column-flex или block.
