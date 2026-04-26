import type { CSSProperties, FC, PropsWithChildren } from 'react';
import { cn } from '../cn';

export interface AppRootProps {
  /** Color scheme applied via `data-appearance` attribute. */
  appearance?: 'light' | 'dark';
  /** Platform hint (ios / base / android …). Kept for API compatibility. */
  platform?: string;
  className?: string;
  style?: CSSProperties;
}

/** Root wrapper that sets the color-scheme context for the entire app. */
export const AppRoot: FC<PropsWithChildren<AppRootProps>> = ({
  children,
  appearance = 'light',
  className,
  style,
}) => (
  <div data-appearance={appearance} className={cn('app-root', className)} style={style}>
    {children}
  </div>
);
