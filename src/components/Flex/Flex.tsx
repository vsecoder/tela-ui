import type { CSSProperties, ElementType, FC, PropsWithChildren } from 'react';
import { cn } from '../cn';

export interface FlexProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: boolean | 'reverse';
  gap?: string | number;
  gapX?: string | number;
  gapY?: string | number;
  inline?: boolean;
  grow?: boolean;
  shrink?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

const toCss = (v: string | number): string =>
  typeof v === 'number' ? `${v}px` : v;

export const Flex: FC<PropsWithChildren<FlexProps>> = ({
  children,
  direction,
  align,
  justify,
  wrap,
  gap,
  gapX,
  gapY,
  inline = false,
  grow = false,
  shrink,
  as: Tag = 'div',
  className,
  style,
}) => {
  const css: CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
  };

  if (direction !== undefined) css.flexDirection = direction;
  if (align !== undefined) css.alignItems = align;
  if (justify !== undefined) css.justifyContent = justify;
  if (wrap === true) css.flexWrap = 'wrap';
  else if (wrap === 'reverse') css.flexWrap = 'wrap-reverse';
  if (gap !== undefined) css.gap = toCss(gap);
  if (gapX !== undefined) css.columnGap = toCss(gapX);
  if (gapY !== undefined) css.rowGap = toCss(gapY);
  if (grow) css.flexGrow = 1;
  if (shrink === false) css.flexShrink = 0;

  return (
    <Tag className={cn('ui-flex', className)} style={{ ...css, ...style }}>
      {children}
    </Tag>
  );
};
