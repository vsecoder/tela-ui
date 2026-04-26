import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Bookmark, BookmarkFill, ShoppingCart, ArrowUpFromSquare, ArrowRight } from '@gravity-ui/icons';
import { Card } from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Tag } from '../Tag';
import { AppRoot } from '../AppRoot';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Card>;

// Placeholder image via picsum (deterministic seed)
const img = (seed: number, w = 400, h = 300) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ---- Playground ------------------------------------------------------------

export const Playground: Story = {
  render: () => (
    <AppRoot style={{ maxWidth: 320 }}>
      <Card>
        <Card.Media src={img(10)} aspect="16/9">
          <Card.Badge><Badge variant="danger" size="m">Хит</Badge></Card.Badge>
        </Card.Media>
        <Card.Body>
          <Card.Tags>
            <Tag variant="accent" size="s">Cloud</Tag>
            <Tag variant="neutral" size="s">EU West</Tag>
          </Card.Tags>
          <Card.Title>Hikka Pro · 4 vCPU / 8 GB</Card.Title>
          <Card.Description lines={3}>
            Мощный сервер для высоконагруженных userbot-проектов с неограниченным трафиком.
          </Card.Description>
          <Card.Price current="299 ₽/мес" original="599 ₽" discount="-50%" />
        </Card.Body>
        <Card.Actions>
          <Button size="m" stretched><ShoppingCart width={16} height={16} /> Купить</Button>
          <Button size="m" mode="outline"><Bookmark width={16} height={16} /></Button>
        </Card.Actions>
      </Card>
    </AppRoot>
  ),
};

// ---- Variants --------------------------------------------------------------

export const Minimal: Story = {
  name: 'Minimal',
  render: () => (
    <AppRoot style={{ maxWidth: 320 }}>
      <Card>
        <Card.Body>
          <Card.Title>Базовый тариф</Card.Title>
          <Card.Description>1 vCPU / 1 GB RAM — идеально для старта.</Card.Description>
          <Card.Price current="99 ₽/мес" />
        </Card.Body>
        <Card.Actions>
          <Button size="m" stretched>Подключить</Button>
        </Card.Actions>
      </Card>
    </AppRoot>
  ),
};

export const WithMediaAndBadge: Story = {
  name: 'Media + Badge overlay',
  render: () => (
    <AppRoot style={{ maxWidth: 320 }}>
      <Card>
        <Card.Media src={img(42)} aspect="4/3">
          <Card.Badge placement="top-left">
            <Badge variant="success" size="m">Новинка</Badge>
          </Card.Badge>
          <Card.Badge placement="top-right">
            <Badge variant="danger" size="m">-40%</Badge>
          </Card.Badge>
        </Card.Media>
        <Card.Body>
          <Card.Title lines={1}>Hikka Ultra — максимальная производительность</Card.Title>
          <Card.Price current="799 ₽/мес" original="1 299 ₽" discount="-38%" />
        </Card.Body>
        <Card.Actions>
          <Button size="m" stretched>Выбрать</Button>
        </Card.Actions>
      </Card>
    </AppRoot>
  ),
};

export const Horizontal: Story = {
  name: 'Horizontal layout',
  render: () => (
    <AppRoot style={{ maxWidth: 390 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
        {[
          { seed: 11, title: 'Starter · 1 vCPU', desc: 'EU West · Ubuntu 24.04', price: '99 ₽/мес', variant: 'neutral' as const },
          { seed: 22, title: 'Pro · 4 vCPU',     desc: 'US East · Debian 12',    price: '299 ₽/мес', variant: 'accent' as const },
          { seed: 33, title: 'Ultra · 16 vCPU',  desc: 'Asia · AlmaLinux 9',     price: '799 ₽/мес', variant: 'success' as const },
        ].map((item) => (
          <Card key={item.seed} horizontal onClick={() => {}}>
            <Card.Media src={img(item.seed, 120, 120)} aspect="1/1" />
            <Card.Body gap={4}>
              <Card.Title lines={1}>{item.title}</Card.Title>
              <Card.Description>{item.desc}</Card.Description>
              <Card.Price current={item.price} />
            </Card.Body>
          </Card>
        ))}
      </div>
    </AppRoot>
  ),
};

export const Grid: Story = {
  name: 'Grid (2 columns)',
  render: () => (
    <AppRoot>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 16 }}>
        {[10, 20, 30, 40].map((seed) => (
          <Card key={seed} onClick={() => {}}>
            <Card.Media src={img(seed, 200, 150)} aspect="4/3" />
            <Card.Body gap={6}>
              <Card.Title lines={2}>Тариф {seed / 10}</Card.Title>
              <Card.Price current={`${seed * 3} ₽`} />
            </Card.Body>
            <Card.Actions>
              <Button size="s" stretched>Купить</Button>
            </Card.Actions>
          </Card>
        ))}
      </div>
    </AppRoot>
  ),
};

export const ProductCard: Story = {
  name: 'Product — e-commerce style',
  render: () => {
    const [saved, setSaved] = useState(false);
    return (
      <AppRoot style={{ maxWidth: 340 }}>
        <Card>
          <Card.Media src={img(77)} aspect="3/4">
            <Card.Badge placement="top-left">
              <Badge variant="danger">−30%</Badge>
            </Card.Badge>
            <Card.Badge placement="top-right">
              <button
                type="button"
                onClick={() => setSaved((v) => !v)}
                style={{ background: 'rgba(0,0,0,0.35)', border: 'none', borderRadius: '50%', padding: 6, cursor: 'pointer', display: 'flex', color: '#fff' }}
              >
                {saved
                  ? <BookmarkFill width={18} height={18} />
                  : <Bookmark width={18} height={18} />
                }
              </button>
            </Card.Badge>
          </Card.Media>
          <Card.Body>
            <Card.Tags>
              <Tag variant="neutral" size="s">Хостинг</Tag>
              <Tag variant="accent" size="s">Популярное</Tag>
            </Card.Tags>
            <Card.Title>Hikka Pro Max — безлимитный трафик</Card.Title>
            <Card.Description lines={2}>
              16 vCPU · 32 GB RAM · NVMe 500 GB — для самых требовательных проектов.
            </Card.Description>
            <Card.Price current="1 299 ₽/мес" original="1 849 ₽" discount="-30%" />
          </Card.Body>
          <Card.Actions>
            <Button size="l" stretched before={<ShoppingCart width={16} height={16} />}>
              В корзину
            </Button>
            <Button size="l" mode="outline" before={<ArrowUpFromSquare width={16} height={16} />} />
          </Card.Actions>
        </Card>
      </AppRoot>
    );
  },
};

export const InfoCard: Story = {
  name: 'Info card (no image)',
  render: () => (
    <AppRoot style={{ maxWidth: 390, padding: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { title: 'Активных хостов',  value: '12',    accent: '#3b82f6' },
          { title: 'Трафик за месяц',  value: '4.8 ТБ', accent: '#8b5cf6' },
          { title: 'Баланс',           value: '2 400 ₽', accent: '#16a34a' },
        ].map(({ title, value, accent }) => (
          <Card key={title} horizontal onClick={() => {}}>
            <Card.Body gap={2}>
              <Card.Description>{title}</Card.Description>
              <Card.Title>
                <span style={{ color: accent, fontSize: 22 }}>{value}</span>
              </Card.Title>
            </Card.Body>
            <Card.Actions>
              <Button size="s" mode="plain" after={<ArrowRight width={14} height={14} />}>
                Подробнее
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </div>
    </AppRoot>
  ),
};

export const Clickable: Story = {
  name: 'Clickable (whole card)',
  render: () => (
    <AppRoot style={{ maxWidth: 320 }}>
      <Card onClick={() => alert('Карточка нажата')}>
        <Card.Media src={img(55)} aspect="16/9" />
        <Card.Body>
          <Card.Title>Нажми на карточку</Card.Title>
          <Card.Description>Весь компонент тапабельный — добавляет ripple-эффект.</Card.Description>
        </Card.Body>
      </Card>
    </AppRoot>
  ),
};
