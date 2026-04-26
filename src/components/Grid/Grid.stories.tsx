import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { List } from '../List';
import { Section } from '../Section';
import { Inset } from '../Inset';
import { TypographyDisplay, TypographyLabel } from '../Typography';

const meta: Meta<typeof Grid> = {
  title: 'UI/Grid',
  component: Grid,
  parameters: { layout: 'padded' },
  argTypes: {
    cols:    { control: { type: 'number', min: 1, max: 6 } },
    rows:    { control: { type: 'number', min: 1, max: 6 } },
    gap:     { control: { type: 'number', min: 0, max: 48 } },
    gapX:    { control: { type: 'number', min: 0, max: 48 } },
    gapY:    { control: { type: 'number', min: 0, max: 48 } },
    display: { control: 'radio', options: ['grid', 'inline-grid'] },
    align:   { control: 'select', options: ['center', 'baseline', 'stretch', 'start', 'end'] },
    justify: { control: 'select', options: ['center', 'start', 'end', 'between'] },
    children: { control: false },
  },
  args: {
    cols: 2,
    gap: 12,
    display: 'grid',
  },
};
export default meta;

type Story = StoryObj<typeof Grid>;

const Box = ({ children }: { children?: React.ReactNode }) => (
  <div style={{
    background: 'color-mix(in srgb, var(--ui-accent) 15%, transparent)',
    border: '1px solid color-mix(in srgb, var(--ui-accent) 40%, transparent)',
    borderRadius: 10,
    padding: '16px 12px',
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--ui-text)',
    textAlign: 'center',
    minHeight: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    {children}
  </div>
);

export const Playground: Story = {
  render: (args) => (
    <Grid {...args}>
      <Box>Баланс</Box>
      <Box>Трафик</Box>
      <Box>CPU</Box>
      <Box>RAM</Box>
      <Box>Хосты</Box>
      <Box>Пользователи</Box>
    </Grid>
  ),
};

export const TwoColumns: Story = {
  args: { cols: 2, gap: 12 },
  render: (args) => (
    <Grid {...args}>
      <Box>Баланс</Box>
      <Box>Трафик</Box>
      <Box>CPU</Box>
      <Box>RAM</Box>
    </Grid>
  ),
};

export const ThreeColumns: Story = {
  args: { cols: 3, gap: 10 },
  render: (args) => (
    <Grid {...args}>
      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => (
        <Box key={m}>{m}</Box>
      ))}
    </Grid>
  ),
};

export const MixedGaps: Story = {
  args: { cols: 2, gapX: 8, gapY: 24, gap: undefined },
  render: (args) => (
    <Grid {...args}>
      <Box>Сервер A</Box>
      <Box>Сервер B</Box>
      <Box>Сервер C</Box>
      <Box>Сервер D</Box>
    </Grid>
  ),
};

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div style={{ background: 'var(--ui-surface)', borderRadius: 10, padding: '12px 14px' }}>
    <TypographyDisplay style={{ fontSize: 26 }}>{value}</TypographyDisplay>
    <TypographyLabel style={{ display: 'block', marginTop: 2 }}>{label}</TypographyLabel>
  </div>
);

export const Usage: Story = {
  render: () => (
    <List>
      <Section header="Ресурсы хоста">
        <Inset vertical>
          <Grid cols={2} gap={8}>
            <StatCard value="42 %" label="CPU" />
            <StatCard value="2.1 ГБ" label="RAM" />
            <StatCard value="18 ГБ" label="Диск" />
            <StatCard value="1.4 МБ/с" label="Трафик" />
          </Grid>
        </Inset>
      </Section>
    </List>
  ),
};

// Note: Grid — только для равномерной сетки однотипных блоков.
// Всегда оборачивай в <Inset vertical> внутри Section.
// cols=2 для метрик, cols=3 для иконок/тегов.
// gap=8–12 для компактных карточек, gap=16 для просторных.
// Не используй Grid для страничного лейаута — только для карточек внутри блока.
