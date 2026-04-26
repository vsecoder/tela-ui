import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from '../components/CodeBlock';
import {
  TypographyOverline,
  TypographyDisplay,
  TypographyTitle,
  TypographyBody,
  TypographyLabel,
} from '../components/Typography';

const meta: Meta = {
  title: 'Introduction/Overview',
  parameters: { layout: 'fullscreen', docs: { page: null } },
};
export default meta;
type Story = StoryObj;

const COMPONENTS: { group: string; items: string[] }[] = [
  {
    group: 'Навигация',
    items: ['AppRoot', 'Navigation', 'Navbar', 'Breadcrumbs', 'Tabs', 'Toggle'],
  },
  {
    group: 'Списки и данные',
    items: ['List', 'Section', 'Cell', 'ButtonCell', 'CopyCell', 'Grid', 'Flex', 'Timeline', 'Stepper'],
  },
  {
    group: 'Ввод',
    items: ['Input', 'Textarea', 'Select', 'MultiSelect', 'Combobox', 'Checkbox', 'RadioGroup', 'Switch', 'PinInput', 'SearchInput', 'FileUpload', 'MarkdownEditor'],
  },
  {
    group: 'Форма',
    items: ['Form (Form.Field, Form.Submit, useFormValues)'],
  },
  {
    group: 'Действия',
    items: ['Button', 'ButtonGroup', 'InlineButtons', 'ActionMenu', 'Chip / ChipGroup'],
  },
  {
    group: 'Фидбэк',
    items: ['Snackbar', 'Alert', 'Modal', 'Placeholder', 'InfoScreen', 'ProgressBar', 'Skeleton', 'StatusIndicator'],
  },
  {
    group: 'Отображение',
    items: ['Badge', 'Tag', 'Counter', 'Avatar', 'Image', 'Accordion', 'Carousel', 'Divider', 'Inset', 'Tooltip'],
  },
  {
    group: 'Медиа и контент',
    items: ['Chart', 'CodeBlock', 'Markdown', 'LogViewer'],
  },
  {
    group: 'Утилиты',
    items: ['Ripple', 'Motion (FadeIn, ScaleIn, Collapse, Stagger, Presence, NumberPop, Confetti)', 'Typography'],
  },
  {
    group: 'Темизация',
    items: ['createTheme()', 'defaultTheme', 'CSS-токены (--ui-*)'],
  },
];

function Overview() {
  return (
    <div style={{ padding: '32px 24px', maxWidth: 760, margin: '0 auto', fontFamily: 'var(--ui-font, sans-serif)', color: 'var(--ui-text)' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <TypographyOverline mb={8}>@vsecoder/tela-ui · Component Library</TypographyOverline>
        <TypographyDisplay size={36} mb={12}>Tela UI</TypographyDisplay>
        <TypographyBody size={16} color="secondary" maxWidth={560}>
          Библиотека компонентов для Telegram Mini Apps. Построена на Telegram-токенах,
          адаптирована под мобильный UX и готова к работе в dark/light темах.
        </TypographyBody>
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
        {[
          ['React 18+', '#3b82f6'],
          ['TypeScript', '#6366f1'],
          ['Telegram Mini Apps', '#0ea5e9'],
          ['CSS токены', '#8b5cf6'],
          ['Motion / Framer', '#ec4899'],
        ].map(([label, color]) => (
          <span
            key={label}
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '4px 10px', borderRadius: 20,
              background: `${color}18`, border: `1px solid ${color}40`,
              fontSize: 12, fontWeight: 500, color,
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Quick start */}
      <section style={{ marginBottom: 40 }}>
        <TypographyTitle mb={16}>Быстрый старт</TypographyTitle>
        <CodeBlock lang="bash" code={`npm install @vsecoder/tela-ui\n\n# или при локальной разработке\nnpm link @vsecoder/tela-ui`} />
        <div style={{ marginTop: 12 }}>
          <CodeBlock lang="tsx" code={`import '@vsecoder/tela-ui/dist/ui.css';\nimport { AppRoot, List, Section, Cell } from '@vsecoder/tela-ui';\n\nexport function App() {\n  return (\n    <AppRoot>\n      <List>\n        <Section header="Хосты">\n          <Cell subtitle="eu-west-1">prod-01</Cell>\n        </Section>\n      </List>\n    </AppRoot>\n  );\n}`} />
        </div>
      </section>

      {/* Telegram theme wiring */}
      <section style={{ marginBottom: 40 }}>
        <TypographyTitle mb={12}>Telegram-тема</TypographyTitle>
        <TypographyBody size={14} color="secondary" mb={16}>
          Все цвета берутся из{' '}
          <code style={{ background: 'var(--ui-border)', padding: '1px 5px', borderRadius: 4, fontSize: 13 }}>--tg-theme-*</code>{' '}
          CSS-переменных. При запуске в TMA вызовите <code style={{ background: 'var(--ui-border)', padding: '1px 5px', borderRadius: 4, fontSize: 13 }}>bindCssVars()</code> один раз в <code style={{ background: 'var(--ui-border)', padding: '1px 5px', borderRadius: 4, fontSize: 13 }}>init.ts</code>:
        </TypographyBody>
        <CodeBlock lang="ts" code={`import { themeParams, retrieveLaunchParams } from '@tma.js/sdk';\nimport { createTheme } from '@vsecoder/tela-ui';\n\n// Bind Telegram theme vars -- --tg-theme-* CSS vars\nconst { tgWebAppThemeParams } = retrieveLaunchParams();\nthemeParams.bindCssVars();\n\n// Optional: override accent or radius\nconst theme = createTheme({ colors: { accent: '#7c3aed' } });\ndocument.head.insertAdjacentHTML('beforeend', \`<style>\${theme.lightCss}</style>\`);`} />
      </section>

      {/* Component list */}
      <section style={{ marginBottom: 40 }}>
        <TypographyTitle mb={20}>
          Компоненты <span style={{ fontWeight: 400, color: 'var(--ui-text-hint)', fontSize: 16 }}>({COMPONENTS.flatMap(g => g.items).length} штук)</span>
        </TypographyTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {COMPONENTS.map((group) => (
            <div key={group.group}>
              <TypographyOverline mb={8}>{group.group}</TypographyOverline>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {group.items.map((name) => (
                  <span
                    key={name}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 8,
                      background: 'var(--ui-surface)',
                      border: '1px solid var(--ui-border)',
                      fontSize: 13,
                      color: 'var(--ui-text)',
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Design tokens */}
      <section style={{ marginBottom: 40 }}>
        <TypographyTitle mb={16}>Дизайн-токены</TypographyTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
          {[
            ['--ui-bg', 'Фон страницы'],
            ['--ui-surface', 'Фон секции / карточки'],
            ['--ui-border', 'Разделители'],
            ['--ui-text', 'Основной текст'],
            ['--ui-text-sub', 'Вторичный текст'],
            ['--ui-text-hint', 'Подсказки / плейсхолдеры'],
            ['--ui-accent', 'Акцент (кнопки, ссылки)'],
            ['--ui-accent-fg', 'Текст на акцентном фоне'],
            ['--ui-danger', 'Деструктивные действия'],
            ['--ui-radius', 'Скругление (12px по умолч.)'],
            ['--ui-radius-sm', 'Малое скругление (10px)'],
            ['--ui-font', 'Шрифт (Inter Variable)'],
          ].map(([token, desc]) => (
            <div
              key={token}
              style={{
                padding: '10px 12px',
                borderRadius: 10,
                background: 'var(--ui-surface)',
                border: '1px solid var(--ui-border)',
              }}
            >
              <code style={{ fontSize: 11, color: 'var(--ui-accent)', display: 'block', marginBottom: 2 }}>{token}</code>
              <TypographyLabel>{desc}</TypographyLabel>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section>
        <TypographyTitle mb={16}>Принципы</TypographyTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            ['Telegram-first', 'Все цвета приходят из themeParams TMA. Без hardcode.'],
            ['Mobile-only UX', 'Touch targets ≥44px, scroll-snap, нижние шторки вместо дропдаунов.'],
            ['BEM + CSS-токены', 'Классы вида ui-component__element--modifier, токены --ui-*.'],
            ['Portal-based overlays', 'Modal, ActionMenu, Select и Snackbar рендерятся в .app-root через portal.'],
            ['Анимации через Motion', 'Используй FadeIn, ScaleIn, Collapse и spring-переходы из пакета motion.'],
            ['Без внешних зависимостей UI', 'Нет MUI, Radix, Headless UI — только React + CSS + @gravity-ui/icons.'],
          ].map(([title, desc]) => (
            <div
              key={title}
              style={{
                display: 'flex', gap: 12, padding: '12px 14px',
                borderRadius: 10, background: 'var(--ui-surface)',
                border: '1px solid var(--ui-border)', alignItems: 'flex-start',
              }}
            >
              <TypographyLabel size={13} weight={600} color="accent" style={{ flexShrink: 0, paddingTop: 1 }}>{title}</TypographyLabel>
              <TypographyLabel size={13} color="secondary">{desc}</TypographyLabel>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export const Default: Story = {
  name: 'Overview',
  render: () => <Overview />,
};
