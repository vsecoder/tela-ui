/**
 * Color tokens for Tela UI.
 *
 * Each entry maps a --ui-* CSS custom property to its default value.
 * In a Telegram Mini App the --tg-theme-* vars are set automatically by the
 * SDK (themeParams.bindCssVars()), so the fallbacks here are only used in
 * plain browser / Storybook environments.
 *
 * Override these by calling createTheme({ colors: { ... } }).
 */

export interface ColorTokens {
  /** Page / list background */
  bg: string;
  /** Section / card background */
  surface: string;
  /** Separators and input underlines */
  border: string;
  /** Primary text */
  text: string;
  /** Secondary / subtitle text */
  textSub: string;
  /** Hint / placeholder text */
  textHint: string;
  /** Section header label text */
  hdr: string;
  /** Interactive accent — buttons, links, focus rings */
  accent: string;
  /** Text on accent-colored backgrounds (button labels) */
  accentFg: string;
  /** Link color */
  link: string;
  /** Destructive actions text */
  danger: string;
  /** Ripple overlay color */
  ripple: string;
  /** Switch thumb — always white knob */
  switchThumb: string;
}

export const lightColors: ColorTokens = {
  bg:          'var(--tg-theme-secondary-bg-color,  #f4f4f5)',
  surface:     'var(--tg-theme-section-bg-color,    var(--tg-theme-bg-color, #ffffff))',
  border:      'var(--tg-theme-section-separator-color, rgba(0, 0, 0, 0.08))',
  text:        'var(--tg-theme-text-color,          #09090b)',
  textSub:     'var(--tg-theme-subtitle-text-color, var(--tg-theme-hint-color, #71717a))',
  textHint:    'var(--tg-theme-hint-color,          #71717a)',
  hdr:         'var(--tg-theme-section-header-text-color, var(--tg-theme-hint-color, #6b7280))',
  accent:      'var(--tg-theme-button-color,        #3b82f6)',
  accentFg:    'var(--tg-theme-button-text-color,   #ffffff)',
  link:        'var(--tg-theme-link-color,          var(--tg-theme-accent-text-color, #2563eb))',
  danger:      'var(--tg-theme-destructive-text-color, #ef4444)',
  ripple:      'rgba(0, 0, 0, 0.10)',
  switchThumb: '#ffffff',
};

/** Standard dark theme (for data-appearance="dark" override). */
export const darkColors: ColorTokens = {
  bg:          '#000000',
  surface:     '#1c1c1e',
  border:      'rgba(255, 255, 255, 0.08)',
  text:        '#ffffff',
  textSub:     '#8e8e93',
  textHint:    '#8e8e93',
  hdr:         '#8e8e93',
  accent:      '#2979ff',
  accentFg:    '#ffffff',
  link:        '#4fc3f7',
  danger:      '#ff453a',
  ripple:      'rgba(255, 255, 255, 0.12)',
  switchThumb: '#ffffff',
};

/** Convert a ColorTokens object into a CSS custom-property block string. */
export function colorsToCss(c: ColorTokens): string {
  return `
  --ui-bg:          ${c.bg};
  --ui-surface:     ${c.surface};
  --ui-border:      ${c.border};
  --ui-text:        ${c.text};
  --ui-text-sub:    ${c.textSub};
  --ui-text-hint:   ${c.textHint};
  --ui-hdr:         ${c.hdr};
  --ui-accent:      ${c.accent};
  --ui-accent-fg:   ${c.accentFg};
  --ui-link:        ${c.link};
  --ui-danger:      ${c.danger};
  --ui-ripple:      ${c.ripple};
  --ui-switch-thumb:${c.switchThumb};
`.trim();
}
