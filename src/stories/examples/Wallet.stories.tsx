import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  PaperPlane, CirclePlus, ArrowUpFromSquare, ArrowRightArrowLeft,
  ChevronRight, Gift, ChartBar, ArrowDownToLine, CircleDollar,
  ArrowUp, ArrowDown,
} from '@gravity-ui/icons';
import { Toggle }        from '../../components/Toggle/Toggle';
import { Avatar }        from '../../components/Avatar/Avatar';
import { Badge }         from '../../components/Badge/Badge';
import { List }          from '../../components/List/List';
import { Section }       from '../../components/Section/Section';
import { Cell }          from '../../components/Cell/Cell';
import { InlineButtons } from '../../components/InlineButtons/InlineButtons';
import { NumberPop }     from '../../components/motion/NumberPop';
import { Navbar }        from '../../components/Navbar/Navbar';
import { Inset }         from '../../components/Inset/Inset';
import { Ripple }        from '../../components/Ripple';

type Currency = 'crypto' | 'ton';
type Period   = '1д' | '7д' | '30д' | '1г';

const PERIODS: Period[] = ['1д', '7д', '30д', '1г'];

const PERIOD_DATA: Record<Period, { change: string; pct: string; up: boolean }> = {
  '1д':  { change: '+0,24',  pct: '5,69',  up: true  },
  '7д':  { change: '+1,12',  pct: '24,8',  up: true  },
  '30д': { change: '-0,83',  pct: '15,2',  up: false },
  '1г':  { change: '+18,50', pct: '409',   up: true  },
};

const Sparkline: FC<{ points: number[]; up: boolean }> = ({ points, up }) => {
  const W = 64; const H = 28;
  const min = Math.min(...points); const max = Math.max(...points);
  const range = max - min || 1;
  const xs = points.map((_, i) => (i / (points.length - 1)) * W);
  const ys = points.map((p) => H - ((p - min) / range) * H * 0.8 - H * 0.1);
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      <path d={d} stroke={up ? '#22c55e' : '#ef4444'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const CryptoIcon: FC<{ bg: string; children: ReactNode; size?: number }> = ({ bg, children, size = 36 }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: size, height: size, borderRadius: '50%',
    background: bg, color: '#fff', fontWeight: 700, fontSize: size * 0.38,
    flexShrink: 0, lineHeight: 1,
  }}>
    {children}
  </span>
);

const TREND_ITEMS = [
  { id: 'evaa', label: 'EVAA',  price: '46,66 ₽',     pct: '-5,05', up: false, bg: '#7c3aed', letter: 'E', pts: [30,28,22,18,24,20,15,12,10,13] },
  { id: 'amzn', label: 'AMZNx', price: '19 301,51 ₽', pct: '+1,95', up: true,  bg: '#f97316', letter: 'A', pts: [20,18,22,25,28,24,30,28,32,34] },
  { id: 'nvda', label: 'NVDAx', price: '15 063,75 ₽', pct: '+3,12', up: true,  bg: '#16a34a', letter: 'N', pts: [18,20,19,24,26,22,28,30,29,33] },
  { id: 'aapl', label: 'AAPLx', price: '8 071,50 ₽',  pct: '-1,40', up: false, bg: '#64748b', letter: 'A', pts: [32,30,28,26,24,22,20,21,19,18] },
];

type TrendItem = typeof TREND_ITEMS[0];

const TrendCard: FC<TrendItem> = ({ label, price, pct, up, bg, letter, pts }) => (
  <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 6, padding: '10px 12px', cursor: 'pointer' }}>
    <Ripple />
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <CryptoIcon bg={bg} size={30}>{letter}</CryptoIcon>
      <Sparkline points={pts} up={up} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ui-text)' }}>{label}</span>
      <Badge variant={up ? 'success' : 'danger'} size="s">{pct}%</Badge>
    </div>
    <div style={{ fontSize: 11, color: 'var(--ui-text-sub)', marginTop: -2 }}>{price}</div>
  </div>
);

const meta: Meta = {
  title: 'Examples/Wallet',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const WalletScreen: Story = {
  name: 'Wallet',
  render: () => {
    const [currency, setCurrency] = useState<Currency>('crypto');
    const [nav,      setNav]      = useState('wallet');
    const [period,   setPeriod]   = useState<Period>('1д');

    const data = PERIOD_DATA[period];
    const nextPeriod = () => setPeriod((p) => {
      const i = PERIODS.indexOf(p);
      return PERIODS[(i + 1) % PERIODS.length];
    });

    return (
      <div style={{
        maxWidth: 390, margin: '0 auto',
        background: 'var(--ui-bg)', minHeight: '100dvh',
        display: 'flex', flexDirection: 'column',
        fontFamily: 'var(--ui-font)',
      }}>
        <Inset top={12} bottom={8} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar size={36} />
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Toggle
              options={[{ label: 'Крипто', value: 'crypto' }, { label: 'TON', value: 'ton' }]}
              value={currency}
              onChange={(v) => setCurrency(v as Currency)}
            />
          </div>
          <div style={{ width: 36 }} />
        </Inset>

        <Inset top={12} bottom={4} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: 'var(--ui-text-sub)', marginBottom: 4 }}>Баланс</div>
          <div style={{ fontSize: 40, fontWeight: 700, color: 'var(--ui-text)', lineHeight: 1.1 }}>
            <NumberPop animKey={period}>4,52 ₽</NumberPop>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 6, fontSize: 13 }}>
            <span style={{ color: data.up ? '#16a34a' : '#ef4444' }}>{data.change} ₽</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 2, color: data.up ? '#16a34a' : '#ef4444', fontWeight: 600 }}>
              {data.up ? <ArrowUp width={11} height={11} /> : <ArrowDown width={11} height={11} />}
              <NumberPop animKey={`${period}-pct`}>{data.pct}%</NumberPop>
            </span>
            <button
              type="button"
              onClick={nextPeriod}
              style={{
                border: 'none', borderRadius: 6,
                background: 'var(--ui-border)', color: 'var(--ui-text-sub)',
                fontSize: 12, fontWeight: 600, padding: '2px 7px',
                cursor: 'pointer', fontFamily: 'var(--ui-font)',
              }}
            >
              {period}
            </button>
          </div>
        </Inset>

        <div style={{ flex: 1, overflow: 'auto' }}>
          <List>
            <InlineButtons>
              <InlineButtons.Item text="Перевести"  onClick={() => {}}><PaperPlane /></InlineButtons.Item>
              <InlineButtons.Item text="Пополнить"  onClick={() => {}}><CirclePlus /></InlineButtons.Item>
              <InlineButtons.Item text="Вывести"    onClick={() => {}}><ArrowUpFromSquare /></InlineButtons.Item>
              <InlineButtons.Item text="Обменять"   onClick={() => {}}><ArrowRightArrowLeft /></InlineButtons.Item>
            </InlineButtons>

            <Section>
              <Cell
                before={<CryptoIcon bg="#16a34a"><CircleDollar width={18} height={18} /></CryptoIcon>}
                subtitle="USDT · 75,51 ₽"
                after={<span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ui-text)' }}>0,00 ₽</span>}
                onClick={() => {}}
              >
                Доллары
              </Cell>
              <Cell
                before={<CryptoIcon bg="#6366f1">∞</CryptoIcon>}
                subtitle="Торгуйте с плечом до 50×"
                after={<ChevronRight width={16} height={16} />}
                onClick={() => {}}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  Фьючерсы
                  <Badge variant="accent" size="s">НОВОЕ</Badge>
                </span>
              </Cell>
            </Section>

            <Section header={<>Крипто <Badge variant="accent" size="s">4,52 ₽</Badge></>}>
              <Cell
                before={<CryptoIcon bg="#1a1a2e">N</CryptoIcon>}
                subtitle="NOT · 0,0309 ₽"
                after={<span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ui-text)' }}>3,84 ₽</span>}
                afterSub={<span style={{ color: '#16a34a' }}>+0,22 ₽</span>}
                onClick={() => {}}
              >
                Notcoin
              </Cell>
              <Cell
                before={<CryptoIcon bg="#f97316">🐹</CryptoIcon>}
                subtitle="HMSTR · 0,01181 ₽"
                after={<span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ui-text)' }}>0,68 ₽</span>}
                afterSub={<span style={{ color: '#16a34a' }}>+0,02 ₽</span>}
                onClick={() => {}}
              >
                Hamster Kombat
              </Cell>
            </Section>

            <Section>
              <Cell
                before={<CryptoIcon bg="#0ea5e9"><ChartBar width={18} height={18} /></CryptoIcon>}
                after={<ChevronRight width={16} height={16} />}
                onClick={() => {}}
              >
                Акции и фонды
              </Cell>
            </Section>

            <Section header={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textTransform: 'none', letterSpacing: 0, width: '100%' }}>
                <span>В тренде</span>
                <button type="button" style={{ border: 'none', background: 'none', color: 'var(--ui-accent)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--ui-font)', fontWeight: 500, padding: 0 }}>
                  Все
                </button>
              </div>
            }>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                {TREND_ITEMS.map((item, i) => (
                  <div
                    key={item.id}
                    style={{
                      borderRight:  i % 2 === 0 ? '1px solid var(--ui-border)' : 'none',
                      borderBottom: i < 2       ? '1px solid var(--ui-border)' : 'none',
                    }}
                  >
                    <TrendCard {...item} />
                  </div>
                ))}
              </div>
            </Section>
          </List>
        </div>

        <Navbar
          activeId={nav}
          onChange={setNav}
          items={[
            { id: 'wallet',  label: 'Кошелёк', icon: <CircleDollar    width={22} height={22} /> },
            { id: 'trading', label: 'Торговля', icon: <ChartBar        width={22} height={22} /> },
            { id: 'income',  label: 'Доход',    icon: <ArrowDownToLine width={22} height={22} /> },
            { id: 'bonuses', label: 'Бонусы',   icon: <Gift            width={22} height={22} /> },
          ]}
        />
      </div>
    );
  },
};
