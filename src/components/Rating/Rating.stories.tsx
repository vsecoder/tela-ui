import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';
import { List } from '../List/List';
import { Section } from '../Section/Section';
import { Cell } from '../Cell/Cell';
import { Inset } from '../Inset/Inset';
import { TypographyLabel } from '../Typography/Typography';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
};
export default meta;
type Story = StoryObj<typeof Rating>;

export const Interactive: Story = {
  render: () => {
    const [val, setVal] = useState(3);
    return (
      <List>
        <Section header="Оцените кофе">
          <Inset vertical style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Rating value={val} onChange={setVal} />
            <TypographyLabel color="secondary">{val} из 5</TypographyLabel>
          </Inset>
        </Section>
      </List>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <List>
      <Section header="Размеры">
        <Cell subtitle="size=&quot;s&quot;">
          <Rating value={4} size="s" readonly />
        </Cell>
        <Cell subtitle="size=&quot;m&quot; (default)">
          <Rating value={4} size="m" readonly />
        </Cell>
        <Cell subtitle="size=&quot;l&quot;">
          <Rating value={4} size="l" readonly />
        </Cell>
      </Section>
    </List>
  ),
};

export const States: Story = {
  render: () => (
    <List>
      <Section>
        <Cell subtitle="Обычный">
          <Rating value={3} readonly />
        </Cell>
        <Cell subtitle="Disabled">
          <Rating value={3} disabled />
        </Cell>
        <Cell subtitle="Readonly">
          <Rating value={4.5} readonly />
        </Cell>
      </Section>
    </List>
  ),
};
