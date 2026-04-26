import type { Meta, StoryObj } from '@storybook/react';
import { AppRoot } from '../components/AppRoot';
import { lightColors, darkColors, defaultScale, defaultSemantic, defaultRadii } from '../tokens';

const meta: Meta = {
  title: 'Foundation/Tokens',
  parameters: { layout: 'padded' },
};
export default meta;

const mono = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: 'ui-monospace, monospace',
  fontSize: 12,
  color: 'var(--ui-text-hint)',
  ...extra,
});

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ui-text-hint)', marginBottom: 12, marginTop: 24 }}>
    {children}
  </div>
);

const Divider = () => (
  <div style={{ height: 1, background: 'var(--ui-border)', margin: '8px 0' }} />
);

// ---- Colors ----------------------------------------------------------------

export const Colors: StoryObj = {
  name: 'Color tokens',
  render: () => {
    const rows: { token: string; cssVar: string; desc: string }[] = [
      { token: '--ui-bg',         cssVar: '--ui-bg',         desc: 'Page / list background' },
      { token: '--ui-surface',    cssVar: '--ui-surface',    desc: 'Section / card background' },
      { token: '--ui-border',     cssVar: '--ui-border',     desc: 'Separators, input underlines' },
      { token: '--ui-text',       cssVar: '--ui-text',       desc: 'Primary text' },
      { token: '--ui-text-sub',   cssVar: '--ui-text-sub',   desc: 'Secondary / subtitle text' },
      { token: '--ui-text-hint',  cssVar: '--ui-text-hint',  desc: 'Hints, placeholders' },
      { token: '--ui-hdr',        cssVar: '--ui-hdr',        desc: 'Section header labels' },
      { token: '--ui-accent',     cssVar: '--ui-accent',     desc: 'Buttons, links, focus rings' },
      { token: '--ui-accent-fg',  cssVar: '--ui-accent-fg',  desc: 'Text on accent backgrounds' },
      { token: '--ui-link',       cssVar: '--ui-link',       desc: 'Hyperlinks' },
      { token: '--ui-danger',     cssVar: '--ui-danger',     desc: 'Destructive actions' },
      { token: '--ui-ripple',     cssVar: '--ui-ripple',     desc: 'Press ripple overlay' },
    ];

    return (
      <AppRoot style={{ maxWidth: 560 }}>
        <SectionTitle>Color tokens (current theme)</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 'var(--ui-radius)', overflow: 'hidden', border: '1px solid var(--ui-border)' }}>
          {rows.map(({ token, cssVar, desc }) => (
            <div
              key={token}
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr auto',
                gap: 12,
                alignItems: 'center',
                padding: '10px 12px',
                background: 'var(--ui-surface)',
                borderBottom: '1px solid var(--ui-border)',
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: `var(${cssVar})`,
                  border: '1px solid var(--ui-border)',
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={mono({ color: 'var(--ui-accent)', fontSize: 13 })}>{token}</div>
                <div style={{ fontSize: 12, color: 'var(--ui-text-hint)' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <SectionTitle>Light defaults (from tokens/colors.ts)</SectionTitle>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--ui-text)', background: 'var(--ui-bg)', padding: '14px 16px', borderRadius: 'var(--ui-radius)', border: '1px solid var(--ui-border)', whiteSpace: 'pre-wrap' }}>
          {Object.entries(lightColors).map(([k, v]) => `${k}: "${v}"`).join('\n')}
        </div>

        <SectionTitle>Dark defaults (from tokens/colors.ts)</SectionTitle>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--ui-text)', background: 'var(--ui-bg)', padding: '14px 16px', borderRadius: 'var(--ui-radius)', border: '1px solid var(--ui-border)', whiteSpace: 'pre-wrap' }}>
          {Object.entries(darkColors).map(([k, v]) => `${k}: "${v}"`).join('\n')}
        </div>
      </AppRoot>
    );
  },
};

// ---- Spacing ---------------------------------------------------------------

export const Spacing: StoryObj = {
  name: 'Spacing tokens',
  render: () => (
    <AppRoot style={{ maxWidth: 480 }}>
      <SectionTitle>Base scale — 4px grid</SectionTitle>
      {(Object.entries(defaultScale) as [string, number][]).map(([step, px]) => (
        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
          <div style={{ width: 52, textAlign: 'right', ...mono({}) }}>--ui-space-{step}</div>
          <div
            style={{
              height: 18,
              width: px,
              background: 'color-mix(in srgb, var(--ui-accent) 70%, transparent)',
              borderRadius: 4,
              flexShrink: 0,
            }}
          />
          <div style={mono({})}>{px}px</div>
        </div>
      ))}

      <Divider />

      <SectionTitle>Semantic aliases</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {(Object.entries(defaultSemantic) as [string, string][]).map(([key, val]) => (
          <div
            key={key}
            style={{
              background: 'var(--ui-surface)',
              border: '1px solid var(--ui-border)',
              borderRadius: 10,
              padding: '10px 12px',
            }}
          >
            <div style={mono({ display: 'block', color: 'var(--ui-accent)', marginBottom: 2 })}>--ui-{key.replace(/([A-Z])/g, '-$1').toLowerCase()}</div>
            <div style={mono({ color: 'var(--ui-text-sub)' })}>{val}</div>
          </div>
        ))}
      </div>
    </AppRoot>
  ),
};

// ---- Radii -----------------------------------------------------------------

export const Radii: StoryObj = {
  name: 'Radius tokens',
  render: () => (
    <AppRoot style={{ maxWidth: 480 }}>
      <SectionTitle>Border radius tokens</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { token: '--ui-radius',    value: defaultRadii.radius,   usage: 'Cards, modals, inputs, buttons, sections' },
          { token: '--ui-radius-sm', value: defaultRadii.radiusSm, usage: 'Tags, chips, toggle active tab' },
          { token: '50%',            value: '50%',                  usage: 'Avatars, round icons, indicators' },
        ].map(({ token, value, usage }) => (
          <div
            key={token}
            style={{
              display: 'grid',
              gridTemplateColumns: '64px 1fr',
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
                background: 'color-mix(in srgb, var(--ui-accent) 15%, transparent)',
                border: '2px solid color-mix(in srgb, var(--ui-accent) 40%, transparent)',
                borderRadius: value === '50%' ? '50%' : `var(${token})`,
                flexShrink: 0,
              }}
            />
            <div>
              <div style={mono({ color: 'var(--ui-accent)', fontSize: 13, display: 'block', marginBottom: 2 })}>{token}</div>
              <div style={mono({ marginBottom: 4 })}>{value}</div>
              <div style={{ fontSize: 12, color: 'var(--ui-text-hint)' }}>{usage}</div>
            </div>
          </div>
        ))}
      </div>
    </AppRoot>
  ),
};
