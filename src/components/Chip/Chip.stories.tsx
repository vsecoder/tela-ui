import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Server, Persons, Globe } from '@gravity-ui/icons';
import { Chip, ChipGroup } from './Chip';
import { List } from '../List';
import { Section } from '../Section';
import { Inset } from '../Inset';

const meta: Meta<typeof Chip> = {
  title: 'UI/Chip',
  component: Chip,
  parameters: {},
  argTypes: {
    selected:  { control: 'boolean' },
    disabled:  { control: 'boolean' },
    children:  { control: 'text' },
    before:    { control: false, table: { disable: true } },
    onClick:   { control: false, table: { disable: true } },
  },
  args: {
    children: 'Активные',
    selected: false,
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Playground: Story = {};

export const States: Story = {
  name: 'States',
  render: () => (
    <ChipGroup>
      <Chip>Обычный</Chip>
      <Chip selected>Выбранный</Chip>
      <Chip disabled>Недоступный</Chip>
    </ChipGroup>
  ),
};

export const SingleSelect: Story = {
  name: 'Single Selected',
  render: () => {
    const options = ['Все', 'Активные', 'Остановленные', 'С ошибкой'];
    const [active, setActive] = useState('Все');
    return (
      <ChipGroup>
        {options.map(o => (
          <Chip key={o} selected={active === o} onClick={() => setActive(o)}>{o}</Chip>
        ))}
      </ChipGroup>
    );
  },
};

export const MultiSelect: Story = {
  name: 'Multiple Selected',
  render: () => {
    const options = ['EU West', 'US East', 'Asia Pacific', 'SA East'];
    const [sel, setSel] = useState<Set<string>>(new Set(['EU West']));
    const toggle = (o: string) =>
      setSel(s => { const n = new Set(s); n.has(o) ? n.delete(o) : n.add(o); return n; });
    return (
      <ChipGroup>
        {options.map(o => (
          <Chip key={o} selected={sel.has(o)} onClick={() => toggle(o)}>{o}</Chip>
        ))}
      </ChipGroup>
    );
  },
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => {
    const [sel, setSel] = useState('hosts');
    return (
      <ChipGroup>
        <Chip before={<Server width={14} height={14} />} selected={sel === 'hosts'} onClick={() => setSel('hosts')}>Хосты</Chip>
        <Chip before={<Persons width={14} height={14} />} selected={sel === 'groups'} onClick={() => setSel('groups')}>Группы</Chip>
        <Chip before={<Globe width={14} height={14} />} selected={sel === 'servers'} onClick={() => setSel('servers')}>Серверы</Chip>
      </ChipGroup>
    );
  },
};

export const InContext: Story = {
  name: 'In Page Context',
  render: () => {
    const filters = ['Все', 'Запущены', 'Остановлены', 'Ошибка'];
    const regions = ['EU West', 'US East', 'Asia'];
    const [status, setStatus] = useState('Все');
    const [region, setRegion] = useState<string | null>(null);
    return (
      <List>
        <Section header="Статус">
          <Inset vertical>
            <ChipGroup>
              {filters.map(f => (
                <Chip key={f} selected={status === f} onClick={() => setStatus(f)}>{f}</Chip>
              ))}
            </ChipGroup>
          </Inset>
        </Section>
        <Section header="Регион">
          <Inset vertical>
            <ChipGroup>
              {regions.map(r => (
                <Chip key={r} selected={region === r} onClick={() => setRegion(p => p === r ? null : r)}>{r}</Chip>
              ))}
            </ChipGroup>
          </Inset>
        </Section>
      </List>
    );
  },
};

// Note: Chip — переключаемый фильтр-чип, не форм-элемент.
// Состояние хранит родитель: selected + onClick.
// ChipGroup — только layout-враппер (flex-wrap gap).
// Для одиночного выбора — useState со строкой; для множественного — Set.
