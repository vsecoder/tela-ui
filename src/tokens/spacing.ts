/**
 * Spacing tokens — 4px base grid.
 *
 * Numeric entries are raw step values (in px).
 * Semantic aliases map to numeric steps.
 * Override via createTheme({ spacing: { ... } }).
 */

export interface SpacingScale {
  1:  number;
  2:  number;
  3:  number;
  4:  number;
  5:  number;
  6:  number;
  8:  number;
  10: number;
  12: number;
  16: number;
}

export interface SemanticSpacing {
  /** Horizontal content inset inside sections/cells */
  inset: string;
  /** Vertical inset inside sections */
  insetV: string;
  /** Icon–label, tight rows */
  gapXs: string;
  /** Between related items */
  gapSm: string;
  /** Default component gap */
  gap: string;
  /** Generous gap, card grids */
  gapLg: string;
  /** Vertical gap between List sections */
  sectionGap: string;
}

export const defaultScale: SpacingScale = {
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  8:  32,
  10: 40,
  12: 48,
  16: 64,
};

export const defaultSemantic: SemanticSpacing = {
  inset:      'var(--ui-space-4)',
  insetV:     'var(--ui-space-3)',
  gapXs:      'var(--ui-space-1)',
  gapSm:      'var(--ui-space-2)',
  gap:        'var(--ui-space-3)',
  gapLg:      'var(--ui-space-4)',
  sectionGap: 'var(--ui-space-2)',
};

export function spacingToCss(scale: SpacingScale, semantic: SemanticSpacing): string {
  return `
  --ui-space-1:  ${scale[1]}px;
  --ui-space-2:  ${scale[2]}px;
  --ui-space-3:  ${scale[3]}px;
  --ui-space-4:  ${scale[4]}px;
  --ui-space-5:  ${scale[5]}px;
  --ui-space-6:  ${scale[6]}px;
  --ui-space-8:  ${scale[8]}px;
  --ui-space-10: ${scale[10]}px;
  --ui-space-12: ${scale[12]}px;
  --ui-space-16: ${scale[16]}px;
  --ui-inset:        ${semantic.inset};
  --ui-inset-v:      ${semantic.insetV};
  --ui-gap-xs:       ${semantic.gapXs};
  --ui-gap-sm:       ${semantic.gapSm};
  --ui-gap:          ${semantic.gap};
  --ui-gap-lg:       ${semantic.gapLg};
  --ui-section-gap:  ${semantic.sectionGap};
`.trim();
}
