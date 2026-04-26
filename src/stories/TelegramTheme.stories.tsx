import type { Meta, StoryObj } from '@storybook/react';
import { AppRoot } from '../components/AppRoot';
import { List } from '../components/List';
import { Section } from '../components/Section';
import { Cell } from '../components/Cell';
import { Button } from '../components/Button';
import { Inset } from '../components/Inset';
import { TG_PALETTES } from '../../.storybook/preview';

/**
 * How the Telegram theme system works
 * ------------------------------------
 * In a Telegram Mini App the SDK sets --tg-theme-* CSS variables automatically:
 *
 *   import { themeParams } from '@tma.js/sdk-react';
 *   themeParams.bindCssVars(); // - injects --tg-theme-* on :root
 *
 * Our --ui-* tokens are defined to fall back to those variables:
 *
 *   --ui-accent: var(--tg-theme-button-color, #3b82f6);
 *
 * So your components automatically follow the user's Telegram color scheme
 * without any extra work. In plain browser / Storybook environments the
 * fallback values kick in instead.
 *
 * You can also simulate any Telegram theme in tests or Storybook by manually
 * setting --tg-theme-* on document.documentElement, which is exactly what the
 * theme toolbar in this Storybook does.
 */

// ---------------------------------------------------------------------------
// Variable table component
// ---------------------------------------------------------------------------

const VARIABLE_MAP: { tg: string; ui: string; role: string }[] = [
  { tg: '--tg-theme-secondary-bg-color',        ui: '--ui-bg',         role: 'Page / list background' },
  { tg: '--tg-theme-section-bg-color',           ui: '--ui-surface',    role: 'Section / card surface' },
  { tg: '--tg-theme-section-separator-color',    ui: '--ui-border',     role: 'Separators, input underlines' },
  { tg: '--tg-theme-text-color',                 ui: '--ui-text',       role: 'Primary text' },
  { tg: '--tg-theme-subtitle-text-color',        ui: '--ui-text-sub',   role: 'Secondary / subtitle text' },
  { tg: '--tg-theme-hint-color',                 ui: '--ui-text-hint',  role: 'Hints, placeholders' },
  { tg: '--tg-theme-section-header-text-color',  ui: '--ui-hdr',        role: 'Section header labels' },
  { tg: '--tg-theme-button-color',               ui: '--ui-accent',     role: 'Buttons, links, focus rings' },
  { tg: '--tg-theme-button-text-color',          ui: '--ui-accent-fg',  role: 'Text on accent backgrounds' },
  { tg: '--tg-theme-link-color',                 ui: '--ui-link',       role: 'Hyperlinks' },
  { tg: '--tg-theme-destructive-text-color',     ui: '--ui-danger',     role: 'Destructive action text' },
];

function VariableTable({ palette }: { palette: Record<string, string> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 'var(--ui-radius)', overflow: 'hidden', border: '1px solid var(--ui-border)' }}>
      {VARIABLE_MAP.map(({ tg, ui, role }) => {
        const value = palette[tg] ?? '(not set)';
        return (
          <div
            key={tg}
            style={{
              display: 'grid',
              gridTemplateColumns: '16px 1fr 1fr',
              gap: 12,
              alignItems: 'center',
              padding: '10px 12px',
              background: 'var(--ui-surface)',
              borderBottom: '1px solid var(--ui-border)',
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: value.startsWith('rgba') || value.startsWith('#') || value.startsWith('rgb') ? value : 'var(--ui-border)',
                border: '1px solid var(--ui-border)',
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--ui-accent)', marginBottom: 2 }}>{tg}</div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--ui-text-sub)' }}>{ui}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--ui-text)', marginBottom: 2 }}>{role}</div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--ui-text-hint)' }}>{value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Foundation/Telegram Theme',
  parameters: { layout: 'padded' },
};
export default meta;

export const VariableMappingLight: StoryObj = {
  name: 'Variable mapping — Light',
  render: () => (
    <AppRoot style={{ maxWidth: 680 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ui-text)', marginBottom: 6 }}>
          How --tg-theme-* maps to --ui-*
        </div>
        <div style={{ fontSize: 13, color: 'var(--ui-text-hint)', marginBottom: 16 }}>
          Each --ui-* token falls back to the corresponding Telegram theme variable.
          When running inside Telegram Mini App, colors follow the user's Telegram theme automatically.
        </div>
      </div>
      <VariableTable palette={TG_PALETTES.light} />
    </AppRoot>
  ),
};

export const VariableMappingDark: StoryObj = {
  name: 'Variable mapping — Dark',
  render: () => (
    <AppRoot appearance="dark" style={{ maxWidth: 680, minHeight: '100vh' }}>
      <Inset>
        <div style={{ marginBottom: 16, paddingTop: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ui-text)', marginBottom: 6 }}>
            How --tg-theme-* maps to --ui-* (dark palette)
          </div>
        </div>
        <VariableTable palette={TG_PALETTES.dark} />
      </Inset>
    </AppRoot>
  ),
};

export const Integration: StoryObj = {
  name: 'Integration guide',
  render: () => (
    <AppRoot style={{ maxWidth: 600 }}>
      <List>
        <Section header="Step 1 — import CSS">
          <Cell>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--ui-text)', background: 'var(--ui-bg)', padding: '12px 14px', borderRadius: 'var(--ui-radius-sm)', margin: '4px 0' }}>
              {`import '@tela/ui/ui.css';`}
            </div>
          </Cell>
        </Section>

        <Section header="Step 2 — bind Telegram theme vars (TMA only)">
          <Cell>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--ui-text)', background: 'var(--ui-bg)', padding: '12px 14px', borderRadius: 'var(--ui-radius-sm)', margin: '4px 0', whiteSpace: 'pre' }}>
              {`import { themeParams } from '@tma.js/sdk-react';\nthemeParams.bindCssVars();\n// - sets --tg-theme-* on :root\n// - --ui-* tokens resolve automatically`}
            </div>
          </Cell>
        </Section>

        <Section header="Step 3 — wrap your app">
          <Cell>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--ui-text)', background: 'var(--ui-bg)', padding: '12px 14px', borderRadius: 'var(--ui-radius-sm)', margin: '4px 0', whiteSpace: 'pre' }}>
              {`import { AppRoot } from '@tela/ui';\n\n<AppRoot appearance={colorScheme}>\n  {/* your app */}\n</AppRoot>`}
            </div>
          </Cell>
        </Section>

        <Section header="Step 4 (optional) — custom theme">
          <Cell>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--ui-text)', background: 'var(--ui-bg)', padding: '12px 14px', borderRadius: 'var(--ui-radius-sm)', margin: '4px 0', whiteSpace: 'pre' }}>
              {`import { createTheme } from '@tela/ui/tokens';\n\nconst theme = createTheme({\n  colors: { accent: '#7c3aed' },\n  radii:  { radius: '16px' },\n});\n\ndocument.head.insertAdjacentHTML(\n  'beforeend',\n  \`<style>\${theme.styleContent}</style>\`,\n);`}
            </div>
          </Cell>
        </Section>
      </List>

      <div style={{ padding: '0 16px 24px' }}>
        <Button size="l">Всё готово!</Button>
      </div>
    </AppRoot>
  ),
};
