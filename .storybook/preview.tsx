import { useState } from 'react';
import type { Preview, Decorator } from '@storybook/react';
import '@fontsource-variable/inter';
import '../src/components/ui.css';
import { CodeBlock } from '../src/components/CodeBlock';

// ---- Telegram-compatible color palettes ------------------------------------

export const TG_PALETTES = {
  light: {
    '--tg-theme-bg-color':                  '#ffffff',
    '--tg-theme-secondary-bg-color':        '#f4f4f5',
    '--tg-theme-section-bg-color':          '#ffffff',
    '--tg-theme-section-separator-color':   'rgba(0,0,0,0.08)',
    '--tg-theme-section-header-text-color': '#6b7280',
    '--tg-theme-text-color':                '#000000',
    '--tg-theme-hint-color':                '#71717a',
    '--tg-theme-subtitle-text-color':       '#6b7280',
    '--tg-theme-button-color':              '#2481cc',
    '--tg-theme-button-text-color':         '#ffffff',
    '--tg-theme-link-color':                '#2481cc',
    '--tg-theme-accent-text-color':         '#2481cc',
    '--tg-theme-destructive-text-color':    '#ef4444',
  },
  dark: {
    '--tg-theme-bg-color':                  '#1c1c1e',
    '--tg-theme-secondary-bg-color':        '#000000',
    '--tg-theme-section-bg-color':          '#1c1c1e',
    '--tg-theme-section-separator-color':   'rgba(255,255,255,0.08)',
    '--tg-theme-section-header-text-color': '#8e8e93',
    '--tg-theme-text-color':                '#ffffff',
    '--tg-theme-hint-color':                '#8e8e93',
    '--tg-theme-subtitle-text-color':       '#8e8e93',
    '--tg-theme-button-color':              '#2979ff',
    '--tg-theme-button-text-color':         '#ffffff',
    '--tg-theme-link-color':                '#4fc3f7',
    '--tg-theme-accent-text-color':         '#4fc3f7',
    '--tg-theme-destructive-text-color':    '#ff453a',
  },
} as const;

// ---- Theme decorator -------------------------------------------------------

const withTelegramTheme: Decorator = (Story, ctx) => {
  const theme = (ctx.globals?.theme as 'light' | 'dark' | undefined) ?? 'light';
  const palette = TG_PALETTES[theme];

  const root = document.documentElement;
  root.setAttribute('data-appearance', theme);

  const allKeys = new Set([
    ...Object.keys(TG_PALETTES.light),
    ...Object.keys(TG_PALETTES.dark),
  ]);
  allKeys.forEach((k) => root.style.removeProperty(k));
  Object.entries(palette).forEach(([k, v]) => root.style.setProperty(k, v));

  return <Story />;
};

// ---- Shell decorator -------------------------------------------------------
// Wraps every story in a consistent phone-width frame (max 480 px, centered).
// Stories that need real fullscreen (Snackbar, ActionMenu, Modal …) declare
// parameters: { layout: 'fullscreen' } and the shell expands to fill the
// viewport instead of constraining to 480 px.

const withShell: Decorator = (Story) => (
  <div className="app-root sb-app-root" style={{ background: 'var(--ui-bg)' }}>
    <Story />
  </div>
);

// ---- Source panel decorator -------------------------------------------------
// When a story supplies `parameters.source` (a TSX code string), renders a
// floating "</>" button in the bottom-right corner. Tapping it slides up a
// drawer with a syntax-highlighted CodeBlock.

const withSourcePanel: Decorator = (Story, ctx) => {
  const source: string | undefined = ctx.parameters?.source;
  const [open, setOpen] = useState(false);

  if (!source) return <Story />;

  return (
    <>
      <Story />

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9999,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'var(--ui-accent)',
          color: 'var(--ui-accent-fg)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 700,
          fontFamily: 'monospace',
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          opacity: open ? 0.7 : 1,
          transition: 'opacity 0.15s',
        }}
        title={open ? 'Скрыть код' : 'Показать код'}
      >
        {'</>'}
      </button>

      {/* Bottom drawer */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9998,
            maxHeight: '55vh',
            overflowY: 'auto',
            borderTop: '1px solid var(--ui-border)',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
            background: 'var(--ui-surface)',
          }}
        >
          <CodeBlock code={source} lang="tsx" />
        </div>
      )}
    </>
  );
};

// ---- Shell CSS (injected once) ---------------------------------------------
const shellStyle = document.createElement('style');
shellStyle.textContent = `
  body { margin: 0; }
  .sb-app-root { font-family: var(--ui-font, 'Inter Variable', sans-serif); min-height: 100vh; }
`;
document.head.appendChild(shellStyle);

// ---- Preview config --------------------------------------------------------

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark',  title: 'Dark',  icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  globals: {
    theme: 'light',
  },
  decorators: [withSourcePanel, withShell, withTelegramTheme],
  parameters: {
    backgrounds: { disable: true },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: 'fullscreen',
  },
};

export default preview;
