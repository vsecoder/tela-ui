import type { Meta, StoryObj } from '@storybook/react';
import { AppRoot } from './AppRoot';

// ---------------------------------------------------------------------------
// This file is documentation-only — no component is exported.
// It lives under Foundation/ in Storybook.
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Foundation/Spacing',
  parameters: { layout: 'padded' },
};
export default meta;

// ---- helpers ---------------------------------------------------------------

const token = (style: React.CSSProperties): React.CSSProperties => ({
  fontFamily: 'ui-monospace, monospace',
  fontSize: 12,
  color: 'var(--ui-text-hint)',
  ...style,
});

const label = (style: React.CSSProperties = {}): React.CSSProperties => ({
  fontSize: 13,
  fontWeight: 500,
  color: 'var(--ui-text)',
  ...style,
});

const hint = (style: React.CSSProperties = {}): React.CSSProperties => ({
  fontSize: 12,
  color: 'var(--ui-text-hint)',
  ...style,
});

const Bar = ({ size, px }: { size: string; px: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' }}>
    <div style={{ width: 40, textAlign: 'right', ...token({}) }}>{size}</div>
    <div
      style={{
        height: 20,
        width: px,
        background: 'color-mix(in srgb, var(--ui-accent) 70%, transparent)',
        borderRadius: 4,
        flexShrink: 0,
      }}
    />
    <div style={token({})}>{px}px</div>
  </div>
);

const Divider = () => (
  <div style={{ height: 1, background: 'var(--ui-border)', margin: '20px 0' }} />
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ui-text-hint)', marginBottom: 12 }}>
    {children}
  </div>
);

// ---- Scale story -----------------------------------------------------------

export const Scale: StoryObj = {
  name: 'Scale',
  render: () => (
    <AppRoot>
      <div style={{ maxWidth: 480, padding: '8px 0' }}>
        <SectionTitle>Базовая шкала — шаг 4px</SectionTitle>
        {[
          { token: '--ui-space-1',  px: 4  },
          { token: '--ui-space-2',  px: 8  },
          { token: '--ui-space-3',  px: 12 },
          { token: '--ui-space-4',  px: 16 },
          { token: '--ui-space-5',  px: 20 },
          { token: '--ui-space-6',  px: 24 },
          { token: '--ui-space-8',  px: 32 },
          { token: '--ui-space-10', px: 40 },
          { token: '--ui-space-12', px: 48 },
          { token: '--ui-space-16', px: 64 },
        ].map(({ token: t, px }) => (
          <Bar key={t} size={t} px={px} />
        ))}

        <Divider />

        <SectionTitle>Семантические алиасы</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { name: '--ui-inset',       value: '--ui-space-4 (16px)', desc: 'Горизонтальный отступ контента' },
            { name: '--ui-inset-v',     value: '--ui-space-3 (12px)', desc: 'Вертикальный отступ внутри секций' },
            { name: '--ui-gap-xs',      value: '--ui-space-1 (4px)',  desc: 'Иконка–текст, плотные строки' },
            { name: '--ui-gap-sm',      value: '--ui-space-2 (8px)',  desc: 'Между связанными элементами' },
            { name: '--ui-gap',         value: '--ui-space-3 (12px)', desc: 'Зазор по умолчанию' },
            { name: '--ui-gap-lg',      value: '--ui-space-4 (16px)', desc: 'Щедрый зазор, гриды карточек' },
            { name: '--ui-section-gap', value: '--ui-space-2 (8px)',  desc: 'Зазор между секциями в List' },
          ].map(({ name, value, desc }) => (
            <div
              key={name}
              style={{
                background: 'var(--ui-surface)',
                border: '1px solid var(--ui-border)',
                borderRadius: 10,
                padding: '10px 12px',
              }}
            >
              <div style={token({ display: 'block', marginBottom: 2 })}>{name}</div>
              <div style={label({ fontSize: 12, marginBottom: 2 })}>{value}</div>
              <div style={hint()}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AppRoot>
  ),
};

// ---- Usage story -----------------------------------------------------------

export const Usage: StoryObj = {
  render: () => (
    <AppRoot>
      <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 24, padding: '8px 0' }}>

        <div>
          <SectionTitle>Контентный отступ — ui-inset (16px)</SectionTitle>
          <div style={{ background: 'var(--ui-bg)', borderRadius: 12, padding: 0, overflow: 'hidden' }}>
            <div
              style={{
                background: 'color-mix(in srgb, var(--ui-accent) 10%, transparent)',
                borderLeft: '3px solid var(--ui-accent)',
                padding: 'var(--ui-inset-v) var(--ui-inset)',
                fontSize: 13,
                color: 'var(--ui-text)',
              }}
            >
              Компонент внутри {'<Inset>'} — горизонтальный отступ 16px слева и справа
            </div>
          </div>
          <div style={hint({ marginTop: 6 })}>
            Применяется в <code style={token({})}>{'<Inset>'}</code>, горизонтальные padding у Cell, Section header
          </div>
        </div>

        <div>
          <SectionTitle>Зазор между элементами</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { g: '--ui-gap-xs (4px)',  desc: 'иконка - текст внутри кнопки, badge - лейбл' },
              { g: '--ui-gap-sm (8px)',  desc: 'строки в списке, элементы тулбара' },
              { g: '--ui-gap (12px)',    desc: 'вертикальный ритм секций, колонки грида' },
              { g: '--ui-gap-lg (16px)', desc: 'карточки, крупные блоки на странице' },
            ].map(({ g, desc }) => (
              <div
                key={g}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'var(--ui-surface)',
                  border: '1px solid var(--ui-border)',
                  borderRadius: 8,
                  padding: '8px 12px',
                }}
              >
                <div style={{ width: 160, flexShrink: 0, ...token({}) }}>{g}</div>
                <div style={hint()}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>Правила использования</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Всегда используй токены — не хардкоди px напрямую в CSS',
              'Числовая шкала для точного позиционирования (padding, margin)',
              'Семантические алиасы для смысловых зазоров (gap, inset)',
              'Отступы кратны 4px — не используй 6px, 10px, 14px без причины',
              'Используй <Inset> для горизонтального отступа вне List/Section',
              'Используй <Inset vertical> если нужен дополнительный вертикальный padding',
            ].map((rule) => (
              <div
                key={rule}
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'flex-start',
                  fontSize: 13,
                  color: 'var(--ui-text)',
                }}
              >
                <span style={{ color: 'var(--ui-accent)', flexShrink: 0, marginTop: 1 }}>-</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppRoot>
  ),
};
