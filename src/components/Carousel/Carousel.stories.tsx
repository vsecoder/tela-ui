import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {},
  argTypes: {
    arrows: { control: 'boolean' },
    dots:   { control: 'boolean' },
  },
  args: { arrows: false, dots: true },
};
export default meta;
type Story = StoryObj<typeof Carousel>;

const slide = (text: string, color: string) => (
  <div
    style={{
      height: 180,
      background: color,
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
      fontWeight: 600,
      color: '#fff',
    }}
  >
    {text}
  </div>
);

export const Playground: Story = {
  render: (args) => (
    <Carousel {...args}>
      {slide('Слайд 1', '#3b82f6')}
      {slide('Слайд 2', '#8b5cf6')}
      {slide('Слайд 3', '#06b6d4')}
    </Carousel>
  ),
};

export const Default: Story = {
  name: 'Three Slides',
  render: () => (
    <Carousel>
      {slide('prod-01 активен', '#16a34a')}
      {slide('prod-02 активен', '#2563eb')}
      {slide('staging-01 остановлен', '#dc2626')}
    </Carousel>
  ),
};

export const WithArrows: Story = {
  name: 'With Arrows',
  render: () => (
    <Carousel arrows dots>
      {slide('EU West', '#0ea5e9')}
      {slide('US East', '#8b5cf6')}
      {slide('Asia Pacific', '#f59e0b')}
      {slide('SA East', '#ec4899')}
    </Carousel>
  ),
};

export const DotsOnly: Story = {
  name: 'Dots Only',
  render: () => (
    <Carousel dots>
      {slide('Шаг 1: Создание', '#3b82f6')}
      {slide('Шаг 2: Настройка', '#8b5cf6')}
      {slide('Шаг 3: Запуск', '#16a34a')}
    </Carousel>
  ),
};

export const NoDots: Story = {
  name: 'No Indicators',
  render: () => (
    <Carousel dots={false}>
      {slide('Фото 1', '#0ea5e9')}
      {slide('Фото 2', '#ec4899')}
      {slide('Фото 3', '#f59e0b')}
    </Carousel>
  ),
};
