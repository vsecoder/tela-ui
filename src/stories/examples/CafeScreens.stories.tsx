import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  TrashBin, ShoppingCart, CreditCard,
  CircleCheckFill, Clock, Tag, Bell,
  ChevronRight, MapPin, Person, Star, StarFill,
  Box, Percent, CircleCheck, ShoppingBag, ClockArrowRotateLeft,
} from '@gravity-ui/icons';
import { List }         from '../../components/List/List';
import { Section }      from '../../components/Section/Section';
import { Cell }         from '../../components/Cell/Cell';
import { ButtonCell }   from '../../components/ButtonCell/ButtonCell';
import { Button }       from '../../components/Button/Button';
import { Counter }      from '../../components/Counter/Counter';
import { Badge }        from '../../components/Badge/Badge';
import { Toggle }       from '../../components/Toggle/Toggle';
import { Select }       from '../../components/Select/Select';
import { Switch }       from '../../components/Switch/Switch';
import { Input }        from '../../components/Input/Input';
import { Textarea }     from '../../components/Textarea/Textarea';
import { Inset }        from '../../components/Inset/Inset';
import { Avatar }       from '../../components/Avatar/Avatar';
import { Navbar }       from '../../components/Navbar/Navbar';
import { ProgressBar }  from '../../components/ProgressBar/ProgressBar';
import { Timeline }     from '../../components/Timeline/Timeline';
import { Divider }      from '../../components/Divider/Divider';
import { Modal }        from '../../components/Modal/Modal';
import { Rating }       from '../../components/Rating/Rating';
import { Map }          from '../../components/Map/Map';
import { TimePicker }   from '../../components/TimePicker/TimePicker';
import { FadeIn }       from '../../components/motion/FadeIn';
import { Stagger }      from '../../components/motion/Stagger';
import {
  TypographyTitle, TypographyHeadline, TypographyBody, TypographyLabel, TypographyOverline,
} from '../../components/Typography/Typography';

// ---- Shared data -----------------------------------------------------------

const img = (seed: number, w = 400, h = 300) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const CART_ITEMS_INITIAL = [
  { id: 1, seed: 41, name: 'Латте',        size: 'M',  price: 240, qty: 2 },
  { id: 2, seed: 44, name: 'Тирамису',     size: '—',  price: 320, qty: 1 },
  { id: 3, seed: 43, name: 'Чай масала',   size: 'L',  price: 220, qty: 1 },
];

const BONUS_CURRENT = 340;
const BONUS_NEXT    = 500;

// ---- Shared shell ----------------------------------------------------------

function Shell({ children, nav, onNav }: {
  children: React.ReactNode;
  nav: string;
  onNav: (id: string) => void;
}) {
  return (
    <div style={{
      maxWidth: 390, margin: '0 auto',
      background: 'var(--ui-bg)', minHeight: '100dvh',
      fontFamily: 'var(--ui-font)',
      display: 'flex', flexDirection: 'column',
      paddingBottom: 64,
    }}>
      {children}
      <Navbar
        activeId={nav}
        onChange={onNav}
        items={[
          { id: 'home',    label: 'Главная',  icon: <ShoppingBag width={22} height={22} /> },
          { id: 'orders',  label: 'Заказы',   icon: <Box width={22} height={22} /> },
          { id: 'cart',    label: 'Корзина',  icon: <ShoppingCart width={22} height={22} /> },
          { id: 'profile', label: 'Профиль',  icon: <Person width={22} height={22} /> },
        ]}
      />
    </div>
  );
}

// ===========================================================================
// CART
// ===========================================================================

const meta: Meta = {
  title: 'Examples/Cafe',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const CafeCart: Story = {
  name: 'Cart',
  render: () => {
    const [nav, setNav] = useState('cart');
    const [items, setItems] = useState(CART_ITEMS_INITIAL);
    const [promo, setPromo] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);

    const setQty = (id: number, qty: number) =>
      setItems((prev) => qty === 0
        ? prev.filter((it) => it.id !== id)
        : prev.map((it) => it.id === id ? { ...it, qty } : it),
      );

    const subtotal  = items.reduce((s, it) => s + it.price * it.qty, 0);
    const discount  = promoApplied ? Math.round(subtotal * 0.1) : 0;
    const total     = subtotal - discount;

    return (
      <Shell nav={nav} onNav={setNav}>
        <Inset top={20} bottom={4}>
          <TypographyTitle>Корзина</TypographyTitle>
        </Inset>

        {items.length === 0 ? (
          <Inset vertical style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <ShoppingCart width={48} height={48} style={{ color: 'var(--ui-text-hint)' }} />
            <TypographyBody color="secondary">Корзина пуста</TypographyBody>
          </Inset>
        ) : (
          <>
            <List>
              <Section>
                {items.map((item) => (
                  <Cell
                    key={item.id}
                    before={
                      <img
                        src={img(item.seed, 56, 56)}
                        alt={item.name}
                        style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover' }}
                      />
                    }
                    subtitle={`${item.size !== '—' ? item.size + ' · ' : ''}${item.price} ₽`}
                    after={<Counter size="s" value={item.qty} min={0} onChange={(v) => setQty(item.id, v)} />}
                  >
                    {item.name}
                  </Cell>
                ))}
              </Section>

              {/* Promo */}
              <Section header="Промокод">
                <Input
                  placeholder="Введите промокод"
                  value={promo}
                  onChange={(e) => { setPromo(e.target.value); setPromoApplied(false); }}
                  before={<Tag width={16} height={16} />}
                  after={
                    promo.length > 0 && (
                      <Button size="s" mode="plain" onClick={() => setPromoApplied(true)}>
                        Применить
                      </Button>
                    )
                  }
                  error={promoApplied && promo.toUpperCase() !== 'CAFE10' ? 'Промокод не найден' : undefined}
                />
              </Section>

              {/* Summary */}
              <Section header="Итого">
                <Cell after={<span style={{ color: 'var(--ui-text)', fontSize: 15 }}>{subtotal} ₽</span>}>
                  Сумма
                </Cell>
                {discount > 0 && (
                  <Cell after={<span style={{ color: 'var(--ui-danger)', fontSize: 15 }}>−{discount} ₽</span>}>
                    Скидка (промокод)
                  </Cell>
                )}
                <Cell after={<span style={{ color: 'var(--ui-accent)', fontSize: 17, fontWeight: 700 }}>{total} ₽</span>}>
                  К оплате
                </Cell>
              </Section>
            </List>

            <Inset vertical>
              <Button size="l" stretched>
                <ShoppingBag width={16} height={16} /> Оформить заказ
              </Button>
            </Inset>
          </>
        )}
      </Shell>
    );
  },
};

// ===========================================================================
// ITEM DETAIL
// ===========================================================================

export const CafeItemDetail: Story = {
  name: 'Item Detail',
  render: () => {
    const [nav,      setNav]      = useState('home');
    const [size,     setSize]     = useState<'S' | 'M' | 'L'>('M');
    const [milk,     setMilk]     = useState('whole');
    const [qty,      setQty]      = useState(1);
    const [liked,    setLiked]    = useState(false);

    const PRICES: Record<string, number> = { S: 200, M: 240, L: 280 };
    const price = PRICES[size] * qty;

    return (
      <Shell nav={nav} onNav={setNav}>
        {/* Photo */}
        <div style={{ position: 'relative' }}>
          <img
            src={img(41, 390, 280)}
            alt="Латте"
            style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', top: 16, right: 16 }}>
            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              style={{
                background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%',
                padding: 8, cursor: 'pointer', display: 'flex',
                color: liked ? '#ef4444' : '#fff',
              }}
            >
              {liked ? <StarFill width={18} height={18} /> : <Star width={18} height={18} />}
            </button>
          </div>
        </div>

        <Inset top={16} bottom={4}>
          <TypographyTitle mb={4}>Латте</TypographyTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Rating value={4.9} readonly size="s" />
            <TypographyLabel color="secondary">4.9 · 280 отзывов</TypographyLabel>
            <Badge variant="neutral" size="s">180 ккал</Badge>
          </div>
        </Inset>

        <Inset top={0} bottom={8}>
          <TypographyBody color="secondary">
            Нежный латте на основе двойного эспрессо и горячего молока с бархатистой пенкой. Идеально для медленного утра.
          </TypographyBody>
        </Inset>

        <List>
          <Section header="Размер">
            <Select
              header=""
              value={size}
              onChange={(e) => setSize(e.target.value as 'S' | 'M' | 'L')}
              options={[
                { value: 'S', label: 'S · 200 ₽' },
                { value: 'M', label: 'M · 240 ₽' },
                { value: 'L', label: 'L · 280 ₽' },
              ]}
            />
          </Section>

          <Section header="Молоко">
            <Select
              header=""
              value={milk}
              onChange={(e) => setMilk(e.target.value)}
              options={[
                { value: 'whole',  label: 'Цельное' },
                { value: 'oat',    label: 'Овсяное (+30 ₽)' },
                { value: 'almond', label: 'Миндальное (+40 ₽)' },
                { value: 'no',     label: 'Без молока' },
              ]}
            />
          </Section>
        </List>

        {/* Qty + Add */}
        <Inset vertical style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flexShrink: 0 }}>
            <Counter value={qty} min={1} max={10} onChange={setQty} />
          </div>
          <Button size="l" stretched>
            <ShoppingCart width={16} height={16} /> В корзину · {price} ₽
          </Button>
        </Inset>
      </Shell>
    );
  },
};

// ===========================================================================
// CHECKOUT
// ===========================================================================

export const CafeCheckout: Story = {
  name: 'Checkout',
  render: () => {
    const [nav,           setNav]           = useState('cart');
    const [mode,          setMode]          = useState<'pickup' | 'delivery'>('pickup');
    const [address,       setAddress]       = useState('');
    const [scheduleTime,  setScheduleTime]  = useState(false);
    const [scheduledTime, setScheduledTime] = useState<string | undefined>(undefined);
    const [payment,       setPayment]       = useState('card');
    const [comment,  setComment]  = useState('');
    const [done,     setDone]     = useState(false);

    if (done) {
      return (
        <Shell nav={nav} onNav={setNav}>
          <FadeIn from="up" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
            <CircleCheckFill width={64} height={64} style={{ color: 'var(--ui-accent)', marginBottom: 20 }} />
            <TypographyTitle align="center" mb={8}>Заказ принят!</TypographyTitle>
            <TypographyBody color="secondary" align="center" mb={32}>
              Ваш кофе готовится. Ожидаемое время — 12 минут.
            </TypographyBody>
            <Button size="l" stretched onClick={() => setDone(false)}>
              На главную
            </Button>
          </FadeIn>
        </Shell>
      );
    }

    return (
      <Shell nav={nav} onNav={setNav}>
        <Inset top={20} bottom={4}>
          <TypographyTitle>Оформление</TypographyTitle>
        </Inset>

        <Inset top={8} bottom={12}>
          <Toggle
            options={[
              { label: 'Самовывоз', value: 'pickup' },
              { label: 'Доставка', value: 'delivery' },
            ]}
            value={mode}
            onChange={(v) => setMode(v as 'pickup' | 'delivery')}
          />
        </Inset>

        <List>
          {/* Address */}
          <Section header={mode === 'pickup' ? 'Точка самовывоза' : 'Адрес доставки'}>
            {mode === 'pickup' ? (
              <>
                <Cell before={<MapPin width={18} height={18} />} after={<ChevronRight width={16} height={16} />} onClick={() => {}}>
                  Садовая, 12
                </Cell>
                <Inset top={0} bottom={0}>
                  <Map lat={55.7412} lon={37.6156} zoom={15} height={180} popup="Кофейня «Садовая, 12»" static />
                </Inset>
              </>
            ) : (
              <Input
                header=""
                placeholder="Введите адрес доставки"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                before={<MapPin width={16} height={16} />}
              />
            )}
          </Section>

          {/* Time */}
          <Section header="Время">
            <Cell
              after={
                <Switch
                  checked={scheduleTime}
                  onChange={(e) => { setScheduleTime(e.target.checked); if (!e.target.checked) setScheduledTime(undefined); }}
                />
              }
            >
              Запланировать время
            </Cell>
            {scheduleTime && (
              <TimePicker
                header=""
                value={scheduledTime}
                onChange={setScheduledTime}
                step={15}
                placeholder="Выберите время"
              />
            )}
          </Section>

          {/* Payment */}
          <Section header="Оплата">
            <Select
              header=""
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              options={[
                { value: 'card',  label: 'Карта' },
                { value: 'cash',  label: 'Наличные' },
                { value: 'bonus', label: `Бонусы (${BONUS_CURRENT} баллов)` },
              ]}
            />
          </Section>

          {/* Comment */}
          <Section header="Комментарий">
            <Textarea
              placeholder="Пожелания к заказу…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </Section>

          {/* Summary */}
          <Section header="Ваш заказ">
            <Cell subtitle="2 шт." after={<span style={{ color: 'var(--ui-text)' }}>480 ₽</span>}>Латте M</Cell>
            <Cell subtitle="1 шт." after={<span style={{ color: 'var(--ui-text)' }}>320 ₽</span>}>Тирамису</Cell>
            <Cell subtitle="1 шт." after={<span style={{ color: 'var(--ui-text)' }}>220 ₽</span>}>Чай масала L</Cell>
            <Divider />
            <Cell after={<span style={{ color: 'var(--ui-accent)', fontWeight: 700, fontSize: 17 }}>1 020 ₽</span>}>
              Итого
            </Cell>
          </Section>
        </List>

        <Inset vertical>
          <Button size="l" stretched onClick={() => setDone(true)}>
            Подтвердить заказ
          </Button>
        </Inset>
      </Shell>
    );
  },
};

// ===========================================================================
// ORDERS
// ===========================================================================

type OrderLine = { name: string; qty: number; price: number };
type Order = {
  id: string;
  date: string;
  items: string;
  lines: OrderLine[];
  subtotal: number;
  discount: number;
  total: number;
  bonus: number;
  payment: string;
  status: 'ready' | 'done' | 'active';
};

const ORDERS: Order[] = [
  {
    id: '#1042',
    date: 'Сегодня, 11:34',
    items: 'Латте M × 2, Тирамису',
    lines: [
      { name: 'Латте M', qty: 2, price: 240 },
      { name: 'Тирамису', qty: 1, price: 320 },
    ],
    subtotal: 800, discount: 0, total: 800, bonus: 16,
    payment: 'Карта', status: 'ready',
  },
  {
    id: '#1038',
    date: 'Вчера, 14:12',
    items: 'Раф L, Авокадо-тост',
    lines: [
      { name: 'Раф L', qty: 1, price: 310 },
      { name: 'Авокадо-тост', qty: 1, price: 330 },
    ],
    subtotal: 640, discount: 0, total: 640, bonus: 13,
    payment: 'Бонусы', status: 'done',
  },
  {
    id: '#1031',
    date: '23 апр., 09:50',
    items: 'Матча латте M × 3',
    lines: [
      { name: 'Матча латте M', qty: 3, price: 340 },
    ],
    subtotal: 1020, discount: 102, total: 918, bonus: 18,
    payment: 'Карта', status: 'done',
  },
  {
    id: '#1024',
    date: '20 апр., 16:05',
    items: 'Капучино S, Тирамису × 2',
    lines: [
      { name: 'Капучино S', qty: 1, price: 200 },
      { name: 'Тирамису', qty: 2, price: 320 },
    ],
    subtotal: 840, discount: 0, total: 840, bonus: 17,
    payment: 'Наличные', status: 'done',
  },
];

const STATUS_LABEL = { ready: 'Готов', done: 'Выдан', active: 'Готовится' };
const STATUS_VARIANT = { ready: 'success', done: 'neutral', active: 'accent' } as const;

export const CafeOrders: Story = {
  name: 'Orders',
  render: () => {
    const [nav,       setNav]       = useState('orders');
    const [tab,       setTab]       = useState<'active' | 'history'>('active');
    const [openOrder, setOpenOrder] = useState<Order | null>(null);
    const [ratings,   setRatings]   = useState<Record<string, number>>({});

    return (
      <Shell nav={nav} onNav={setNav}>
        <Inset top={20} bottom={12}>
          <TypographyTitle mb={12}>Заказы</TypographyTitle>
          <Toggle
            options={[
              { label: 'Активные', value: 'active' },
              { label: 'История',  value: 'history' },
            ]}
            value={tab}
            onChange={(v) => setTab(v as 'active' | 'history')}
          />
        </Inset>

        {tab === 'active' ? (
          <FadeIn from="up">
            <List>
              <Section header="В процессе">
                <Cell
                  before={<Clock width={18} height={18} />}
                  subtitle="Латте M × 2, Тирамису · 800 ₽"
                  after={<Badge variant="accent" size="s">Готовится</Badge>}
                  onClick={() => {}}
                >
                  Заказ #1043
                </Cell>
              </Section>
            </List>

            <Inset top={8} bottom={4}>
              <TypographyOverline>Статус</TypographyOverline>
            </Inset>

            <Inset top={0} bottom={16}>
              <Timeline
                events={[
                  { id: 1, title: 'Заказ принят',    time: '11:40', variant: 'success', icon: <CircleCheck width={14} height={14} /> },
                  { id: 2, title: 'Готовится',        time: '11:41', variant: 'accent'  },
                  { id: 3, title: 'Готов к выдаче',   variant: 'default' },
                  { id: 4, title: 'Выдан',             variant: 'default' },
                ]}
              />
            </Inset>
          </FadeIn>
        ) : (
          <FadeIn from="up">
            <List>
              <Section>
                <Stagger stagger={0.05} from="up">
                  {ORDERS.map((order) => (
                    <Cell
                      key={order.id}
                      subtitle={order.items}
                      after={
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ui-text)' }}>{order.total} ₽</span>
                          <Badge variant={STATUS_VARIANT[order.status]} size="s">{STATUS_LABEL[order.status]}</Badge>
                        </div>
                      }
                      onClick={() => setOpenOrder(order)}
                    >
                      {order.id} · {order.date}
                    </Cell>
                  ))}
                </Stagger>
              </Section>
            </List>
          </FadeIn>
        )}

        <Modal open={openOrder !== null} onClose={() => setOpenOrder(null)} title={`Заказ ${openOrder?.id ?? ''}`}>
          {openOrder && (
            <Inset top={0} bottom={24}>
              {/* Items table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {openOrder.lines.map((line) => (
                  <div key={line.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <TypographyBody>{line.name}</TypographyBody>
                      {line.qty > 1 && (
                        <TypographyLabel color="secondary"> × {line.qty}</TypographyLabel>
                      )}
                    </div>
                    <TypographyBody>{line.price * line.qty} ₽</TypographyBody>
                  </div>
                ))}
              </div>

              <Divider />

              {/* Summary rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TypographyLabel color="secondary">Сумма</TypographyLabel>
                  <TypographyLabel>{openOrder.subtotal} ₽</TypographyLabel>
                </div>
                {openOrder.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TypographyLabel color="secondary">Скидка</TypographyLabel>
                    <TypographyLabel style={{ color: 'var(--ui-danger)' }}>−{openOrder.discount} ₽</TypographyLabel>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TypographyLabel color="secondary">Способ оплаты</TypographyLabel>
                  <TypographyLabel>{openOrder.payment}</TypographyLabel>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TypographyLabel color="secondary">Дата</TypographyLabel>
                  <TypographyLabel>{openOrder.date}</TypographyLabel>
                </div>
              </div>

              <Divider />

              {/* Total + bonus */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <TypographyHeadline>Итого</TypographyHeadline>
                <TypographyHeadline style={{ color: 'var(--ui-accent)' }}>{openOrder.total} ₽</TypographyHeadline>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <TypographyLabel color="secondary">Начислено бонусов</TypographyLabel>
                <Badge variant="accent" size="s">+{openOrder.bonus} баллов</Badge>
              </div>

              {openOrder.status === 'done' && (
                <>
                  <Divider />
                  <div style={{ marginTop: 12 }}>
                    <TypographyLabel color="secondary" mb={8} style={{ display: 'block' }}>Оцените заказ</TypographyLabel>
                    <Rating
                      value={ratings[openOrder.id] ?? 0}
                      onChange={(v) => setRatings((prev) => ({ ...prev, [openOrder.id]: v }))}
                    />
                  </div>
                </>
              )}
            </Inset>
          )}
        </Modal>
      </Shell>
    );
  },
};

// ===========================================================================
// NOTIFICATIONS
// ===========================================================================

const NOTIFICATIONS = [
  {
    id: 1,
    icon: <CircleCheckFill width={20} height={20} style={{ color: 'var(--ui-accent)' }} />,
    title: 'Заказ #1043 готов',
    desc: 'Ваш латте ждёт на стойке. Заберите в течение 10 минут.',
    time: '2 мин назад',
    unread: true,
  },
  {
    id: 2,
    icon: <Star width={20} height={20} style={{ color: '#f59e0b' }} />,
    title: '+20 бонусных баллов',
    desc: 'Начислено за заказ #1042.',
    time: '1 ч назад',
    unread: true,
  },
  {
    id: 3,
    icon: <Percent width={20} height={20} style={{ color: 'var(--ui-danger)' }} />,
    title: 'Скидка 30% на завтрак',
    desc: 'Только сегодня до 12:00 — капучино + круассан за 290 ₽.',
    time: '3 ч назад',
    unread: false,
  },
  {
    id: 4,
    icon: <CircleCheckFill width={20} height={20} style={{ color: 'var(--ui-accent)' }} />,
    title: 'Заказ #1038 выдан',
    desc: 'Спасибо! Оцените заказ.',
    time: 'Вчера',
    unread: false,
  },
  {
    id: 5,
    icon: <Tag width={20} height={20} style={{ color: 'var(--ui-accent)' }} />,
    title: 'Новое меню уже в приложении',
    desc: 'Попробуйте матча-латте и авокадо-тост — добавлены в раздел «Новинки».',
    time: '2 дня назад',
    unread: false,
  },
];

type NotifItem = typeof NOTIFICATIONS[number];

export const CafeNotifications: Story = {
  name: 'Notifications',
  render: () => {
    const [nav,        setNav]        = useState('home');
    const [items,      setItems]      = useState(NOTIFICATIONS);
    const [openNotif,  setOpenNotif]  = useState<NotifItem | null>(null);

    const unreadCount = items.filter((n) => n.unread).length;
    const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

    const openItem = (notif: NotifItem) => {
      setItems((prev) => prev.map((n) => n.id === notif.id ? { ...n, unread: false } : n));
      setOpenNotif(notif);
    };

    return (
      <Shell nav={nav} onNav={setNav}>
        <Inset top={20} bottom={4} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
            <TypographyTitle>Уведомления</TypographyTitle>
            {unreadCount > 0 && <Badge variant="accent" size="s">{unreadCount}</Badge>}
          </div>
          {unreadCount > 0 && (
            <Button mode="link" onClick={markAllRead}>
              Прочитать все
            </Button>
          )}
        </Inset>

        <List>
          <Section>
            <Stagger stagger={0.05} from="up">
              {items.map((notif) => (
                <Cell
                  key={notif.id}
                  before={
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: 'var(--ui-bg)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {notif.icon}
                      </div>
                      {notif.unread && (
                        <span style={{
                          position: 'absolute', top: 0, right: 0,
                          width: 10, height: 10, borderRadius: '50%',
                          background: 'var(--ui-accent)',
                          border: '2px solid var(--ui-surface)',
                        }} />
                      )}
                    </div>
                  }
                  subtitle={
                    <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {notif.desc}
                    </span>
                  }
                  after={<TypographyLabel color="hint">{notif.time}</TypographyLabel>}
                  onClick={() => openItem(notif)}
                >
                  {notif.title}
                </Cell>
              ))}
            </Stagger>
          </Section>
        </List>

        <Modal open={openNotif !== null} onClose={() => setOpenNotif(null)} title={openNotif?.title ?? ''}>
          {openNotif && (
            <Inset top={0} bottom={20}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--ui-secondary-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {openNotif.icon}
                </div>
                <TypographyLabel color="hint">{openNotif.time}</TypographyLabel>
              </div>
              <TypographyBody>{openNotif.desc}</TypographyBody>
            </Inset>
          )}
        </Modal>
      </Shell>
    );
  },
};

// ===========================================================================
// PROFILE
// ===========================================================================

export const CafeProfile: Story = {
  name: 'Profile',
  render: () => {
    const [nav,         setNav]         = useState('profile');
    const [pushEnabled, setPushEnabled] = useState(true);

    return (
      <Shell nav={nav} onNav={setNav}>
        {/* Profile card */}
        <Inset top={28} bottom={16} style={{ textAlign: 'center' }}>
          <Avatar size={72} style={{ margin: '0 auto 12px' }} />
          <TypographyTitle align="center" mb={4}>Алексей Петров</TypographyTitle>
          <TypographyBody color="secondary" align="center" mb={12}>+7 999 123-45-67</TypographyBody>
          <Badge variant="accent" size="m">Pro · с апреля 2025</Badge>
        </Inset>

        {/* Loyalty */}
        <List>
          <Section header="Бонусная программа">
            <Inset vertical>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <TypographyLabel weight={600}>{BONUS_CURRENT} баллов</TypographyLabel>
                <TypographyLabel color="secondary">до скидки 10% — {BONUS_NEXT - BONUS_CURRENT} баллов</TypographyLabel>
              </div>
              <ProgressBar value={BONUS_CURRENT} max={BONUS_NEXT} color="accent" size="m" />
            </Inset>
            <Cell
              before={<Star width={18} height={18} />}
              subtitle="Ваш уровень лояльности"
              after={<Badge variant="accent" size="s">Gold</Badge>}
            >
              Статус
            </Cell>
          </Section>

          {/* Stats */}
          <Section header="Статистика">
            <Cell after={<TypographyLabel weight={600}>24</TypographyLabel>}>
              Всего заказов
            </Cell>
            <Cell after={<TypographyLabel weight={600}>6 840 ₽</TypographyLabel>}>
              Потрачено всего
            </Cell>
            <Cell after={<TypographyLabel weight={600}>Латте M</TypographyLabel>}>
              Любимый напиток
            </Cell>
          </Section>

          {/* Account */}
          <Section header="Аккаунт">
            <ButtonCell before={<Person width={18} height={18} />} after={<ChevronRight width={16} height={16} />} onClick={() => {}}>
              Личные данные
            </ButtonCell>
            <ButtonCell before={<MapPin width={18} height={18} />} after={<ChevronRight width={16} height={16} />} onClick={() => {}}>
              Адреса доставки
            </ButtonCell>
            <ButtonCell before={<CreditCard width={18} height={18} />} after={<ChevronRight width={16} height={16} />} onClick={() => {}}>
              Способы оплаты
            </ButtonCell>
          </Section>

          {/* Settings */}
          <Section header="Настройки">
            <Cell
              before={<Bell width={18} height={18} />}
              after={<Switch checked={pushEnabled} onChange={(e) => setPushEnabled(e.target.checked)} />}
            >
              Push-уведомления
            </Cell>
            <ButtonCell before={<ClockArrowRotateLeft width={18} height={18} />} after={<ChevronRight width={16} height={16} />} onClick={() => {}}>
              История заказов
            </ButtonCell>
          </Section>

          <Section>
            <ButtonCell before={<TrashBin width={18} height={18} style={{ color: 'var(--ui-danger)' }} />} onClick={() => {}}>
              <span style={{ color: 'var(--ui-danger)' }}>Выйти из аккаунта</span>
            </ButtonCell>
          </Section>
        </List>
      </Shell>
    );
  },
};
