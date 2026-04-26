import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from './Chart';
import { List } from '../List';
import { Section } from '../Section';
import { Inset } from '../Inset';

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const meta: Meta<typeof Chart> = {
  title: 'UI/Chart',
  component: Chart,
  argTypes: {
    type:    { control: 'select', options: ['line', 'bar', 'doughnut', 'pie', 'radar'] },
    data:    { control: false },
    options: { control: false },
  },
  args: {
    type: 'line',
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const Playground: Story = {
  args: {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Хосты',
          data: [120, 200, 150, 300, 280, 410, 390],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.12)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
        },
      ],
    },
  },
};

export const Line: Story = {
  args: {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Хосты',
          data: [120, 200, 150, 300, 280, 410, 390],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.12)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
        },
        {
          label: 'Пользователи',
          data: [80, 130, 90, 210, 170, 260, 300],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,0.10)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
        },
      ],
    },
  },
};

export const Bar: Story = {
  args: {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Новые хосты',
          data: [5, 8, 3, 12, 7, 15, 9],
          backgroundColor: 'rgba(245,158,11,0.8)',
          borderRadius: 6,
        },
      ],
    },
  },
};

export const StackedBar: Story = {
  args: {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'EU', data: [40, 60, 55, 80, 70, 90, 85], backgroundColor: 'rgba(59,130,246,0.85)', borderRadius: 4 },
        { label: 'RU', data: [20, 30, 25, 40, 35, 50, 45], backgroundColor: 'rgba(16,185,129,0.85)', borderRadius: 4 },
        { label: 'AS', data: [10, 15, 12, 20, 18, 25, 22], backgroundColor: 'rgba(245,158,11,0.85)', borderRadius: 4 },
      ],
    },
    options: { scales: { x: { stacked: true }, y: { stacked: true } } },
  },
};

export const Doughnut: Story = {
  args: {
    type: 'doughnut',
    data: {
      labels: ['EU', 'RU', 'AS', 'US'],
      datasets: [
        {
          data: [42, 28, 18, 12],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
          borderWidth: 2,
        },
      ],
    },
  },
};

export const Usage: Story = {
  render: () => (
    <List>
      <Section header="Входящий трафик (МБ/ч)">
        <Inset vertical>
          <Chart
            type="line"
            data={{
              labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
              datasets: [
                {
                  label: 'Входящий',
                  data: [12, 8, 25, 48, 62, 41, 30],
                  borderColor: '#3b82f6',
                  backgroundColor: 'rgba(59,130,246,0.1)',
                  fill: true,
                  tension: 0.4,
                },
                {
                  label: 'Исходящий',
                  data: [5, 4, 18, 35, 44, 30, 22],
                  borderColor: '#10b981',
                  backgroundColor: 'rgba(16,185,129,0.1)',
                  fill: true,
                  tension: 0.4,
                },
              ],
            }}
          />
        </Inset>
      </Section>
    </List>
  ),
};

// Note: Chart всегда в <Inset vertical> внутри Section.
// type="line" для временны́х рядов (трафик, нагрузка).
// type="bar" для сравнения по периодам.
// type="doughnut" для распределения (регионы, ресурсы).
// datasets[].data должны быть одной длины с labels.
// Не задавай height — Chart занимает 100% ширины контейнера.
