import type { Meta, StoryObj } from '@storybook/react';
import { AppRoot } from './AppRoot';

const meta: Meta = {
  title: 'Foundation/Radius',
  parameters: { layout: 'padded' },
};
export default meta;

const mono = (style: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: 'ui-monospace, monospace',
  fontSize: 12,
  color: 'var(--ui-text-hint)',
  ...style,
});

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: 'var(--ui-text-hint)',
    marginBottom: 16,
  }}>
    {children}
  </div>
);

const Divider = () => (
  <div style={{ height: 1, background: 'var(--ui-border)', margin: '28px 0' }} />
);

const TOKENS = [
  {
    token: '--ui-radius',
    value: '12px',
    usage: 'Карточки, модалки, инпуты, кнопки, секции',
    components: ['Button', 'Input', 'Select', 'Textarea', 'Modal', 'Snackbar', 'ActionMenu', 'Accordion'],
  },
  {
    token: '--ui-radius-sm',
    value: '10px',
    usage: 'Вложенные элементы, чипы, теги внутри карточек',
    components: ['Toggle (active tab)', 'Counter', 'Badge'],
  },
  {
    token: '50%',
    value: '50%',
    usage: 'Аватары, круглые иконки, индикаторы',
    components: ['Avatar', 'Modal close button', 'Ripple'],
  },
] as const;

export const Scale: StoryObj = {
  name: 'Tokens',
  render: () => (
    <AppRoot>
      <div style={{ maxWidth: 520 }}>
        <SectionTitle>Значения</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TOKENS.map(({ token, value, usage, components }) => (
            <div
              key={token}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 16,
                alignItems: 'center',
                background: 'var(--ui-surface)',
                border: '1px solid var(--ui-border)',
                borderRadius: 10,
                padding: '14px 16px',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  flexShrink: 0,
                  background: 'color-mix(in srgb, var(--ui-accent) 15%, transparent)',
                  border: '2px solid color-mix(in srgb, var(--ui-accent) 40%, transparent)',
                  borderRadius: value === '50%' ? '50%' : `var(${token})`,
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={mono({ color: 'var(--ui-accent)', fontSize: 13 })}>{token}</span>
                  <span style={mono()}>{value}</span>
                </div>
                <span style={{ fontSize: 13, color: 'var(--ui-text)' }}>{usage}</span>
                <span style={{ fontSize: 11, color: 'var(--ui-text-hint)' }}>
                  {components.join(' · ')}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        <SectionTitle>Составные радиусы</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            {
              label: 'Нижний sheet (Modal)',
              radius: 'var(--ui-radius) var(--ui-radius) 0 0',
              desc: 'Верхние углы скруглены, нижние — нет. Прижат к краю экрана.',
            },
            {
              label: 'Первый элемент списка',
              radius: 'var(--ui-radius) var(--ui-radius) 0 0',
              desc: 'Section скругляет верх и низ блока, Cell-ы внутри углов не имеют.',
            },
            {
              label: 'Правый конец Breadcrumb',
              radius: '0 var(--ui-radius-sm) var(--ui-radius-sm) 0',
              desc: 'Левый край острый (прилегает к предыдущему), правый скруглён.',
            },
          ].map(({ label, radius, desc }) => (
            <div
              key={label}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: 14,
                alignItems: 'center',
                padding: '10px 14px',
                background: 'var(--ui-surface)',
                border: '1px solid var(--ui-border)',
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  height: 40,
                  background: 'color-mix(in srgb, var(--ui-accent) 15%, transparent)',
                  border: '2px solid color-mix(in srgb, var(--ui-accent) 40%, transparent)',
                  borderRadius: radius,
                }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ui-text)', marginBottom: 2 }}>{label}</div>
                <div style={mono({ color: 'var(--ui-text-sub)', marginBottom: 2 })}>{radius}</div>
                <div style={{ fontSize: 12, color: 'var(--ui-text-hint)' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        <SectionTitle>Правила</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            'Всегда используй --ui-radius или --ui-radius-sm — не хардкоди числа',
            'Не скругляй элементы внутри Section — скругление делает сама Section',
            'Интерактивные overlay-элементы (модалки, меню) — --ui-radius',
            'Аватары и круглые иконки — border-radius: 50%, не токен',
            'Инлайн-элементы (badge, chip) — --ui-radius-sm для компактности',
            'Если элемент прижат к краю экрана — скругляй только свободные углы',
          ].map((rule) => (
            <div key={rule} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: 'var(--ui-text)' }}>
              <span style={{ color: 'var(--ui-accent)', flexShrink: 0, marginTop: 1 }}>-</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </AppRoot>
  ),
};
