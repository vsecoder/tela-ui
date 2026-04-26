import type { Meta, StoryObj } from '@storybook/react';
import { AppRoot } from './AppRoot';
import {
  TypographyDisplay,
  TypographyTitle,
  TypographyHeadline,
  TypographyBody,
  TypographyLabel,
  TypographyAction,
} from './Typography';

const meta: Meta = {
  title: 'Foundation/Typography',
  parameters: { layout: 'padded' },
};
export default meta;

// ---- helpers ---------------------------------------------------------------

const mono = (style: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: 'ui-monospace, monospace',
  fontSize: 11,
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

const VARIANTS = [
  {
    name: 'Display',
    Component: TypographyDisplay,
    token: 'TypographyDisplay',
    tag: 'h1',
    size: '34px',
    weight: '700',
    lineHeight: '1.1',
    tracking: '-0.5px',
    usage: 'Баланс, главные цифры, hero-экраны',
    example: '₽ 4 200',
  },
  {
    name: 'Title',
    Component: TypographyTitle,
    token: 'TypographyTitle',
    tag: 'h2',
    size: '20px',
    weight: '600',
    lineHeight: '1.25',
    tracking: '—',
    usage: 'Заголовки страниц, имена серверов',
    example: 'Мои хосты',
  },
  {
    name: 'Headline',
    Component: TypographyHeadline,
    token: 'TypographyHeadline',
    tag: 'h3',
    size: '17px',
    weight: '600',
    lineHeight: '1.3',
    tracking: '—',
    usage: 'Заголовок поста, подзаголовок раздела',
    example: 'Заголовок статьи',
  },
  {
    name: 'Body',
    Component: TypographyBody,
    token: 'TypographyBody',
    tag: 'p',
    size: '15px',
    weight: '400',
    lineHeight: '1.5',
    tracking: '—',
    usage: 'Основной текст, описания, контент постов',
    example: 'Хост успешно создан и готов к работе. Подключитесь через SSH.',
  },
  {
    name: 'Label',
    Component: TypographyLabel,
    token: 'TypographyLabel',
    tag: 'span',
    size: '12px',
    weight: '500',
    lineHeight: '1.33',
    tracking: '—',
    usage: 'Мета, дата, подписи, вспомогательный текст',
    example: '24 апреля 2026 · 3 мин',
  },
  {
    name: 'Action',
    Component: TypographyAction,
    token: 'TypographyAction',
    tag: 'span',
    size: '15px',
    weight: '500',
    lineHeight: '1.4',
    tracking: '—',
    usage: 'Ссылки, кликабельный текст, кнопки-ссылки',
    example: 'Подробнее -',
  },
] as const;

// ---- Scale story -----------------------------------------------------------

export const Scale: StoryObj = {
  name: 'Scale',
  render: () => (
    <AppRoot>
      <div style={{ maxWidth: 560 }}>
        <SectionTitle>Варианты</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {VARIANTS.map(({ name, Component, token: tok, tag, size, weight, lineHeight, tracking, example }) => (
            <div
              key={name}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                gap: 16,
                padding: '14px 0',
                borderBottom: '1px solid var(--ui-border)',
              }}
            >
              <div>
                <Component>{example}</Component>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'right' }}>
                <span style={mono()}>{tok}</span>
                <span style={mono({ color: 'var(--ui-text-sub)' })}>
                  {size} / {weight} / lh {lineHeight}
                  {tracking !== '—' ? ` / ls ${tracking}` : ''}
                </span>
                <span style={mono()}>{'<'}{tag}{'>'}</span>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        <SectionTitle>Цвета</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { color: undefined,     label: '(default)',  desc: 'Основной текст страницы'              },
            { color: 'secondary',   label: 'secondary',  desc: 'Подзаголовок, второстепенный контент' },
            { color: 'hint',        label: 'hint',       desc: 'Мета, плейсхолдер, вспомогательное'  },
            { color: 'accent',      label: 'accent',     desc: 'Выделение, акцентный цвет темы'       },
            { color: 'danger',      label: 'danger',     desc: 'Ошибки, деструктивные действия'       },
            { color: 'link',        label: 'link',       desc: 'Ссылки, кликабельный текст'           },
          ].map(({ color, label: lbl, desc }) => (
            <div
              key={lbl}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                alignItems: 'center',
                gap: 12,
                padding: '8px 12px',
                background: 'var(--ui-surface)',
                border: '1px solid var(--ui-border)',
                borderRadius: 8,
              }}
            >
              <TypographyBody color={color as any}>Пример текста</TypographyBody>
              <div>
                <span style={mono({ marginRight: 8 })}>color="{lbl}"</span>
                <span style={{ fontSize: 12, color: 'var(--ui-text-hint)' }}>{desc}</span>
              </div>
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
      <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 24 }}>

        <div>
          <SectionTitle>Когда что использовать</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {VARIANTS.map(({ name, token: tok, usage }) => (
              <div
                key={name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: 8,
                  padding: '8px 12px',
                  background: 'var(--ui-surface)',
                  border: '1px solid var(--ui-border)',
                  borderRadius: 8,
                  alignItems: 'center',
                }}
              >
                <span style={mono({ color: 'var(--ui-accent)' })}>{tok}</span>
                <span style={{ fontSize: 13, color: 'var(--ui-text)' }}>{usage}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>Правила</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Никогда не задавай font-size вручную — используй Typography-компоненты',
              'Для цвета текста используй color prop, не инлайн-стили',
              'Display — только для одиночных крупных цифр/заголовков, не для блоков текста',
              'Label — всегда для мета-информации (дата, автор, теги)',
              'Body — для любого читаемого контента длиннее одной строки',
              'Action — для интерактивных ссылок внутри текста, не для кнопок',
              'Не оборачивай Typography в Typography — выбирай один вариант',
            ].map((rule) => (
              <div key={rule} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: 'var(--ui-text)' }}>
                <span style={{ color: 'var(--ui-accent)', flexShrink: 0, marginTop: 1 }}>-</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>Живой пример — карточка поста</SectionTitle>
          <div style={{ background: 'var(--ui-surface)', borderRadius: 12, padding: '16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <TypographyHeadline>Обновление платформы 2.4</TypographyHeadline>
            <TypographyLabel>24 апреля 2026 · Команда Hikka</TypographyLabel>
            <TypographyBody style={{ marginTop: 4 }}>
              Мы выпустили новую версию панели управления с улучшенным мониторингом и поддержкой IPv6 на всех тарифах.
            </TypographyBody>
            <TypographyAction style={{ marginTop: 4 }}>Читать далее -</TypographyAction>
          </div>
        </div>

      </div>
    </AppRoot>
  ),
};
