import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Bell, Cup, Star, StarFill, Heart, HeartFill,
  MapPin, Person, QrCode, ShoppingCart, ChevronRight,
} from '@gravity-ui/icons';
import { SearchInput }  from '../../components/SearchInput/SearchInput';
import { Carousel }     from '../../components/Carousel/Carousel';
import { Card }         from '../../components/Card/Card';
import { Chip, ChipGroup } from '../../components/Chip/Chip';
import { Badge }        from '../../components/Badge/Badge';
import { Button }       from '../../components/Button/Button';
import { Modal }        from '../../components/Modal/Modal';
import { Inset }        from '../../components/Inset/Inset';
import { Skeleton }     from '../../components/Skeleton/Skeleton';
import { ProgressBar }  from '../../components/ProgressBar/ProgressBar';
import { Avatar }       from '../../components/Avatar/Avatar';
import { Navbar }       from '../../components/Navbar/Navbar';
import { FadeIn }       from '../../components/motion/FadeIn';
import { Stagger }      from '../../components/motion/Stagger';

// ---- Data ------------------------------------------------------------------

const PROMOS = [
  {
    id: 1, seed: 10,
    title: 'Капучино + круассан',
    desc: 'Завтрак дня — всё утро до 12:00',
    badge: '-30%', badgeVariant: 'danger' as const,
    tag: 'Завтрак', price: '290 ₽', originalPrice: '415 ₽',
  },
  {
    id: 2, seed: 20,
    title: 'Двойной эспрессо',
    desc: 'Заряд бодрости с утра до вечера',
    badge: 'Хит', badgeVariant: 'accent' as const,
    tag: 'Кофе', price: '180 ₽', originalPrice: undefined,
  },
  {
    id: 3, seed: 30,
    title: 'Matcha Latte',
    desc: 'Новинка — японский матча на овсяном молоке',
    badge: 'Новинка', badgeVariant: 'success' as const,
    tag: 'Напитки', price: '340 ₽', originalPrice: undefined,
  },
];

const CATEGORIES = ['Все', 'Кофе', 'Чай', 'Напитки', 'Еда', 'Десерты'];

const MENU_ITEMS = [
  { id: 1, seed: 41, name: 'Латте',        category: 'Кофе',    price: '240 ₽', rating: 4.9, calories: '180 ккал' },
  { id: 2, seed: 42, name: 'Раф',          category: 'Кофе',    price: '260 ₽', rating: 4.8, calories: '220 ккал' },
  { id: 3, seed: 43, name: 'Чай масала',   category: 'Чай',     price: '200 ₽', rating: 4.7, calories: '90 ккал'  },
  { id: 4, seed: 44, name: 'Тирамису',     category: 'Десерты', price: '320 ₽', rating: 4.9, calories: '380 ккал' },
  { id: 5, seed: 45, name: 'Авокадо-тост', category: 'Еда',     price: '380 ₽', rating: 4.6, calories: '340 ккал' },
  { id: 6, seed: 46, name: 'Матча латте',  category: 'Напитки', price: '340 ₽', rating: 4.8, calories: '160 ккал' },
];

const BONUS_CURRENT = 340;
const BONUS_NEXT    = 500;

const img = (seed: number, w = 400, h = 300) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ---- Skeleton pieces -------------------------------------------------------

function PromoSkeleton() {
  return (
    <div style={{ padding: '0 16px' }}>
      <Skeleton visible>
        <div style={{ borderRadius: 14, overflow: 'hidden', background: 'var(--ui-surface)', display: 'flex', height: 120 }}>
          <div style={{ width: 120, flexShrink: 0, background: 'var(--ui-border)' }} />
          <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ height: 16, width: '40%', borderRadius: 6, background: 'var(--ui-border)' }} />
            <div style={{ height: 14, width: '80%', borderRadius: 6, background: 'var(--ui-border)' }} />
            <div style={{ height: 12, width: '60%', borderRadius: 6, background: 'var(--ui-border)' }} />
            <div style={{ height: 16, width: '30%', borderRadius: 6, background: 'var(--ui-border)', marginTop: 'auto' }} />
          </div>
        </div>
      </Skeleton>
    </div>
  );
}

function MenuCardSkeleton() {
  return (
    <Skeleton visible>
      <div style={{ borderRadius: 14, overflow: 'hidden', background: 'var(--ui-surface)' }}>
        <div style={{ aspectRatio: '4/3', background: 'var(--ui-border)' }} />
        <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ height: 14, width: '70%', borderRadius: 5, background: 'var(--ui-border)' }} />
          <div style={{ height: 11, width: '50%', borderRadius: 5, background: 'var(--ui-border)' }} />
          <div style={{ height: 14, width: '35%', borderRadius: 5, background: 'var(--ui-border)' }} />
          <div style={{ height: 30, borderRadius: 8, background: 'var(--ui-border)', marginTop: 2 }} />
        </div>
      </div>
    </Skeleton>
  );
}

// ---- QR Modal --------------------------------------------------------------

function QrModal() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Inset vertical>
        <div style={{ fontSize: 14, color: 'var(--ui-text-sub)', lineHeight: 1.6 }}>
          Покажите этот код кассиру, чтобы списать или накопить бонусы.
        </div>
      </Inset>

      <Inset top={0} bottom={8}>
        <div style={{
          width: 200, height: 200, margin: '0 auto',
          borderRadius: 16, background: 'var(--ui-bg)',
          border: '2px solid var(--ui-border)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 8, color: 'var(--ui-text-hint)',
        }}>
          <QrCode width={80} height={80} />
          <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: 2 }}>
            CAFE-7842-XK
          </div>
        </div>
      </Inset>

      <Inset top={0} bottom={4}>
        <div style={{ fontSize: 13, color: 'var(--ui-text-hint)', marginBottom: 6 }}>
          Бонусный баланс
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--ui-accent)', marginBottom: 12 }}>
          {BONUS_CURRENT} <span style={{ fontSize: 16, fontWeight: 500 }}>баллов</span>
        </div>
        <ProgressBar
          value={BONUS_CURRENT}
          max={BONUS_NEXT}
          color="accent"
          label={`До скидки 10% ещё ${BONUS_NEXT - BONUS_CURRENT} баллов`}
          size="s"
        />
      </Inset>

    </div>
  );
}

// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Examples/Cafe',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const CafeHome: Story = {
  name: 'Cafe Home',
  render: () => {
    const [loading,    setLoading]    = useState(true);
    const [nav,        setNav]        = useState('home');
    const [search,     setSearch]     = useState('');
    const [category,   setCategory]   = useState('Все');
    const [qrOpen,     setQrOpen]     = useState(false);
    const [liked,      setLiked]      = useState<Set<number>>(new Set());
    const [cartCount,  setCartCount]  = useState(0);

    useEffect(() => {
      const t = setTimeout(() => setLoading(false), 1800);
      return () => clearTimeout(t);
    }, []);

    const toggleLike = (id: number) =>
      setLiked((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

    const filtered = MENU_ITEMS.filter((item) => {
      const matchCat = category === 'Все' || item.category === category;
      const matchQ   = !search || item.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchQ;
    });

    return (
      <div style={{
        maxWidth: 390, margin: '0 auto',
        background: 'var(--ui-bg)', minHeight: '100dvh',
        fontFamily: 'var(--ui-font)',
        display: 'flex', flexDirection: 'column',
        paddingBottom: 64,
      }}>

        {/* ── Top bar ── */}
        <Inset top={16} bottom={12} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Skeleton visible={loading}>
            <Avatar size={36} />
          </Skeleton>
          <div style={{ flex: 1 }}>
            <Skeleton visible={loading}>
              <div style={{ fontSize: 12, color: 'var(--ui-text-hint)' }}>Доброе утро,</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ui-text)' }}>Алексей 👋</div>
            </Skeleton>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Skeleton visible={loading}>
              <button
                type="button"
                onClick={() => setQrOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  background: 'var(--ui-surface)', border: '1px solid var(--ui-border)',
                  borderRadius: 20, padding: '5px 10px',
                  cursor: 'pointer', fontFamily: 'var(--ui-font)',
                }}
              >
                <Star width={14} height={14} style={{ color: '#f59e0b' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ui-text)' }}>
                  {BONUS_CURRENT}
                </span>
              </button>
            </Skeleton>
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ui-text)', display: 'flex', padding: 4 }}
              >
                <Bell width={22} height={22} />
              </button>
              <span style={{
                position: 'absolute', top: 2, right: 2,
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--ui-danger)',
                border: '1.5px solid var(--ui-bg)',
              }} />
            </div>
          </div>
        </Inset>

        {/* ── Location ── */}
        <Inset top={0} bottom={12}>
          <Skeleton visible={loading}>
            <button
              type="button"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--ui-font)', padding: 0,
                color: 'var(--ui-text-sub)', fontSize: 13,
              }}
            >
              <MapPin width={14} height={14} />
              Садовая, 12 · Открыто до 22:00
              <ChevronRight width={12} height={12} />
            </button>
          </Skeleton>
        </Inset>

        {/* ── Search ── */}
        <Inset top={0} bottom={16}>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Найти в меню…"
            size="m"
          />
        </Inset>

        {/* ── Promo carousel ── */}
        {!search && (
          <div style={{ marginBottom: 4 }}>
            {loading ? (
              <PromoSkeleton />
            ) : (
              <FadeIn from="none">
                <Carousel dots>
                  {PROMOS.map((promo) => (
                    <div key={promo.id} style={{ padding: '0 16px' }}>
                      <Card horizontal onClick={() => {}}>
                        <Card.Media src={img(promo.seed, 140, 140)} aspect="1/1">
                          <Card.Badge placement="top-left">
                            <Badge variant={promo.badgeVariant} size="m">{promo.badge}</Badge>
                          </Card.Badge>
                        </Card.Media>
                        <Card.Body gap={4}>
                          <Card.Tags>
                            <Badge variant="neutral" size="s">{promo.tag}</Badge>
                          </Card.Tags>
                          <Card.Title lines={2}>{promo.title}</Card.Title>
                          <Card.Description lines={2}>{promo.desc}</Card.Description>
                          <Card.Price current={promo.price} original={promo.originalPrice} />
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </Carousel>
              </FadeIn>
            )}
          </div>
        )}

        {/* ── Bonus / QR bar ── */}
        {!search && (
          <Inset top={8} bottom={16}>
            <Skeleton visible={loading}>
              <button
                type="button"
                onClick={() => setQrOpen(true)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  background: 'var(--ui-surface)', border: '1px solid var(--ui-border)',
                  borderRadius: 14, padding: '12px 16px',
                  cursor: 'pointer', fontFamily: 'var(--ui-font)',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--ui-accent)', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <QrCode width={20} height={20} style={{ color: '#fff' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ui-text)' }}>
                      {BONUS_CURRENT} баллов
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--ui-text-hint)' }}>
                      ещё {BONUS_NEXT - BONUS_CURRENT} до скидки
                    </span>
                  </div>
                  <ProgressBar value={BONUS_CURRENT} max={BONUS_NEXT} size="s" />
                </div>
              </button>
            </Skeleton>
          </Inset>
        )}

        {/* ── Category chips ── */}
        <div style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
          <Inset top={0} bottom={12}>
            <ChipGroup>
              {CATEGORIES.map((cat) => (
                <Chip key={cat} selected={category === cat} onClick={() => setCategory(cat)}>
                  {cat}
                </Chip>
              ))}
            </ChipGroup>
          </Inset>
        </div>

        {/* ── Menu grid ── */}
        <Inset top={0} bottom={8}>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {Array.from({ length: 6 }, (_, i) => <MenuCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ui-text-hint)', fontSize: 14 }}>
              Ничего не найдено
            </div>
          ) : (
            <Stagger stagger={0.06} from="up">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {filtered.map((item) => (
                  <Card key={item.id} onClick={() => {}}>
                    <Card.Media src={img(item.seed, 175, 130)} aspect="4/3">
                      <Card.Badge placement="top-right">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                          style={{
                            background: 'rgba(0,0,0,0.3)', border: 'none',
                            borderRadius: '50%', padding: 5, cursor: 'pointer',
                            display: 'flex', color: liked.has(item.id) ? '#ef4444' : '#fff',
                          }}
                        >
                          {liked.has(item.id)
                            ? <HeartFill width={14} height={14} />
                            : <Heart width={14} height={14} />}
                        </button>
                      </Card.Badge>
                    </Card.Media>
                    <Card.Body gap={4}>
                      <Card.Title lines={1}>{item.name}</Card.Title>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--ui-text-hint)', fontSize: 11 }}>
                        <StarFill width={11} height={11} style={{ color: '#f59e0b' }} />
                        {item.rating} · {item.calories}
                      </div>
                      <Card.Price current={item.price} />
                    </Card.Body>
                    <Card.Actions>
                      <Button size="s" stretched onClick={() => setCartCount((n) => n + 1)}>
                        <Cup width={13} height={13} /> В корзину
                      </Button>
                    </Card.Actions>
                  </Card>
                ))}
              </div>
            </Stagger>
          )}
        </Inset>

        {/* ── QR Modal ── */}
        <Modal open={qrOpen} onClose={() => setQrOpen(false)} title="Мои бонусы">
          <QrModal />
        </Modal>

        {/* ── Navbar ── */}
        <Navbar
          activeId={nav}
          onChange={setNav}
          items={[
            { id: 'home',    label: 'Главная', icon: <Cup width={22} height={22} /> },
            { id: 'menu',    label: 'Меню',    icon: <Star width={22} height={22} /> },
            { id: 'orders',  label: 'Заказы',  icon: <ShoppingCart width={22} height={22} />,
              badge: cartCount > 0 ? String(cartCount) : undefined },
            { id: 'profile', label: 'Профиль', icon: <Person width={22} height={22} /> },
          ]}
        />
      </div>
    );
  },
};
