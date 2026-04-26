import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Server, Globe } from '@gravity-ui/icons';
import { RadioGroup } from './RadioGroup';
import { List } from '../List/List';
import { Section } from '../Section/Section';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta: Meta = {
  title: 'UI/RadioGroup',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

// ─── Список ───────────────────────────────────────────────────────────────────

export const ListLayout: Story = {
  name: 'List layout',
  render: () => {
    const [region, setRegion] = useState('eu-west-1');
    return (
      <List>
        <Section header="Регион">
          <div style={{ padding: '4px 0' }}>
            <RadioGroup
              options={[
                { value: 'eu-west-1',  label: 'EU West (Paris)',    description: 'eu-west-1',  before: <Globe width={18} height={18} /> },
                { value: 'us-east-1',  label: 'US East (Virginia)', description: 'us-east-1',  before: <Globe width={18} height={18} /> },
                { value: 'ap-south-1', label: 'AP South (Mumbai)',  description: 'ap-south-1', before: <Globe width={18} height={18} />, disabled: true },
              ]}
              value={region}
              onChange={setRegion}
            />
          </div>
        </Section>
      </List>
    );
  },
};

// ─── Тарифные планы (grid) ────────────────────────────────────────────────────

export const GridPlans: Story = {
  name: 'Pricing Plans (Grid)',
  render: () => {
    const [plan, setPlan] = useState('starter');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <RadioGroup
          layout="grid"
          options={[
            {
              value: 'starter',
              label: 'Starter',
              description: '1 vCPU / 1 GB',
              after: <Badge variant="neutral" size="s">€3/мес</Badge>,
            },
            {
              value: 'basic',
              label: 'Basic',
              description: '2 vCPU / 4 GB',
              after: <Badge variant="accent" size="s">€8/мес</Badge>,
            },
            {
              value: 'pro',
              label: 'Pro',
              description: '4 vCPU / 8 GB',
              after: <Badge variant="accent" size="s">€16/мес</Badge>,
            },
            {
              value: 'ultra',
              label: 'Ultra',
              description: '16 vCPU / 32 GB',
              after: <Badge variant="accent" size="s">€64/мес</Badge>,
            },
          ]}
          value={plan}
          onChange={setPlan}
        />
        <Button>Выбрать план: {plan}</Button>
      </div>
    );
  },
};

// ─── Тип сервера ─────────────────────────────────────────────────────────────

export const ServerType: Story = {
  name: 'Server Type',
  render: () => {
    const [type, setType] = useState('vps');
    return (
      <RadioGroup
        options={[
          { value: 'vps',       label: 'VPS',        description: 'Виртуальный сервер',   before: <Server width={18} height={18} /> },
          { value: 'dedicated', label: 'Dedicated',   description: 'Выделенный сервер',    before: <Server width={18} height={18} /> },
          { value: 'shared',    label: 'Shared',      description: 'Общий хостинг',       before: <Server width={18} height={18} />, disabled: true },
        ]}
        value={type}
        onChange={setType}
      />
    );
  },
};

// Note: RadioGroup — для одного выбора из нескольких визуально богатых вариантов.
// Для компактного выбора без описаний используй Toggle или Select.
// layout="grid" рекомендуется для 4+ карточек-тарифов.
