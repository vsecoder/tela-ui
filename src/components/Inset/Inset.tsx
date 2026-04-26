import type { CSSProperties, FC, ReactNode } from 'react';
import { cn } from '../cn';

export interface InsetProps {
  /** Increase vertical padding from 12px to 20px (for between-section use). */
  vertical?: boolean;
  /** Override top padding in px (default 12, or 20 when `vertical` is set). */
  top?: number;
  /** Override bottom padding in px (default 12, or 20 when `vertical` is set). */
  bottom?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Padding wrapper for standalone components (Toggle, Breadcrumbs, Markdown, Chart, etc.)
 * that live outside List/Section and should not bleed to the screen edges.
 *
 * Default: `padding: 12px 16px`. With `vertical`: `padding: 20px 16px`.
 * Use `top` / `bottom` to override only the vertical sides while keeping the
 * standard 16px horizontal inset.
 *
 * ```tsx
 * <Inset top={20} bottom={0}>…</Inset>
 * <Inset top={12} bottom={24} style={{ display: 'flex', gap: 10 }}>…</Inset>
 * ```
 */
export const Inset: FC<InsetProps> = ({ vertical, top, bottom, children, className, style }) => {
  const override: CSSProperties = {};
  if (top    !== undefined) override.paddingTop    = top;
  if (bottom !== undefined) override.paddingBottom = bottom;
  const merged = (Object.keys(override).length || style)
    ? { ...style, ...override }
    : undefined;
  return (
    <div
      className={cn('ui-inset', vertical && 'ui-inset--vertical', className)}
      style={merged}
    >
      {children}
    </div>
  );
};
