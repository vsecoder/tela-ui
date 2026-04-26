import type { CSSProperties, FC, PropsWithChildren } from 'react';
import { cn } from '../cn';

interface GridProps {
  cols?: number;
  rows?: number;
  gap?: string | number;
  gapX?: string | number;
  gapY?: string | number;
  display?: 'grid' | 'inline-grid';
  align?: 'center' | 'baseline' | 'stretch' | 'start' | 'end';
  justify?: 'center' | 'start' | 'end' | 'between';
  className?: string;
}

const toCss = (v: string | number): string =>
  typeof v === 'number' ? `${v}px` : v;

const justifyMap: Record<string, string> = {
  center: 'center',
  start: 'start',
  end: 'end',
  between: 'space-between',
};

export const Grid: FC<PropsWithChildren<GridProps>> = ({
  children,
  cols,
  rows,
  gap,
  gapX,
  gapY,
  display = 'grid',
  align,
  justify,
  className,
}) => {
  const style: CSSProperties = { display };
  if (cols !== undefined) style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  if (rows !== undefined) style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  if (gap !== undefined) style.gap = toCss(gap);
  if (gapX !== undefined) style.columnGap = toCss(gapX);
  if (gapY !== undefined) style.rowGap = toCss(gapY);
  if (align !== undefined) style.alignItems = align;
  if (justify !== undefined) style.justifyContent = justifyMap[justify];

  return (
    <div className={cn('ui-grid', className)} style={style}>
      {children}
    </div>
  );
};
