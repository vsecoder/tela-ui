import type { Meta, StoryObj } from '@storybook/react';
import { Map } from './Map';
import { List } from '../List/List';
import { Section } from '../Section/Section';
import { Inset } from '../Inset/Inset';

const meta: Meta<typeof Map> = {
  title: 'UI/Map',
  component: Map,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Map>;

// Москва, Красная площадь
const LAT = 55.7539;
const LON = 37.6208;

export const Default: Story = {
  render: () => (
    <List>
      <Section header="Точка самовывоза">
        <Inset top={0} bottom={0}>
          <Map lat={LAT} lon={LON} popup="Кофейня на Красной площади" height={260} />
        </Inset>
      </Section>
    </List>
  ),
};

export const Static: Story = {
  render: () => (
    <List>
      <Section header="Адрес доставки">
        <Inset top={0} bottom={0}>
          <Map lat={LAT} lon={LON} zoom={14} height={200} static popup="Москва, Садовая, 12" />
        </Inset>
      </Section>
    </List>
  ),
};

export const MultipleMarkers: Story = {
  render: () => (
    <Inset top={16} bottom={16}>
      <Map
        lat={55.751}
        lon={37.618}
        zoom={13}
        height={320}
        popup="Главная точка"
        markers={[
          { lat: 55.760, lon: 37.620, popup: 'Метро Охотный ряд' },
          { lat: 55.742, lon: 37.630, popup: 'Метро Третьяковская' },
        ]}
      />
    </Inset>
  ),
};
