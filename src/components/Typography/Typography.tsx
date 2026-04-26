import type { CSSProperties, ElementType, FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../cn';

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'hint'
  | 'accent'
  | 'danger'
  | 'link';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Override the rendered HTML element. */
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  /** Semantic color token. */
  color?: TypographyColor;
  /** Override `font-size`. Accepts a number (px) or any CSS value. */
  size?: number | string;
  /** Override `font-weight`. */
  weight?: number | string;
  /** Constrain `max-width`. Accepts a number (px) or any CSS value. */
  maxWidth?: number | string;
  /** `margin-bottom` shorthand. Accepts a number (px) or any CSS value. */
  mb?: number | string;
  /** `margin-top` shorthand. Accepts a number (px) or any CSS value. */
  mt?: number | string;
  /** `text-align`. */
  align?: 'left' | 'center' | 'right';
}

const colorClass: Record<TypographyColor, string> = {
  primary:   'ui-text--primary',
  secondary: 'ui-text--secondary',
  hint:      'ui-text--hint',
  accent:    'ui-text--accent',
  danger:    'ui-text--danger',
  link:      'ui-text--link',
};

function px(v: number | string): string {
  return typeof v === 'number' ? `${v}px` : v;
}

function make(variant: string, tag: ElementType): FC<TypographyProps> {
  const Component: FC<TypographyProps> = ({
    as: Root = tag,
    children,
    className,
    color,
    size,
    weight,
    maxWidth,
    mb,
    mt,
    align,
    style,
    ...rest
  }) => {
    const Tag = Root as ElementType;
    const override: CSSProperties = {
      ...(size     !== undefined && { fontSize:     px(size)     }),
      ...(weight   !== undefined && { fontWeight:   weight       }),
      ...(maxWidth !== undefined && { maxWidth:      px(maxWidth) }),
      ...(mb       !== undefined && { marginBottom:  px(mb)       }),
      ...(mt       !== undefined && { marginTop:     px(mt)       }),
      ...(align    !== undefined && { textAlign:     align        }),
      ...style,
    };

    return (
      <Tag
        className={cn(
          `ui-typography ui-typography--${variant}`,
          color && colorClass[color],
          className,
        )}
        style={Object.keys(override).length ? override : undefined}
        {...rest}
      >
        {children}
      </Tag>
    );
  };
  Component.displayName = `Typography${variant[0].toUpperCase()}${variant.slice(1)}`;
  return Component;
}

/**
 * Large hero title — 34px bold. Use at the top of full-page screens.
 *
 * ```tsx
 * <TypographyDisplay>Мои хосты</TypographyDisplay>
 * <TypographyDisplay size={28}>Заголовок поменьше</TypographyDisplay>
 * ```
 */
export const TypographyDisplay  = make('display',  'h1');

/**
 * Section-level heading — 20px semibold.
 *
 * ```tsx
 * <TypographyTitle mb={12}>Ресурсы</TypographyTitle>
 * ```
 */
export const TypographyTitle    = make('title',    'h2');

/**
 * Subsection heading — 17px semibold.
 *
 * ```tsx
 * <TypographyHeadline>prod-01</TypographyHeadline>
 * ```
 */
export const TypographyHeadline = make('headline', 'h3');

/**
 * Body copy — 15px regular. Use `color="secondary"` for supporting text.
 *
 * ```tsx
 * <TypographyBody color="secondary" maxWidth={560}>
 *   Библиотека компонентов для Telegram Mini Apps.
 * </TypographyBody>
 * ```
 */
export const TypographyBody     = make('body',     'p');

/**
 * Caption / meta label — 12px medium, hint-colored by default.
 *
 * ```tsx
 * <TypographyLabel>eu-west-1</TypographyLabel>
 * ```
 */
export const TypographyLabel    = make('label',    'span');

/**
 * Call-to-action text — 15px medium.
 *
 * ```tsx
 * <TypographyAction>Подробнее</TypographyAction>
 * ```
 */
export const TypographyAction   = make('action',   'span');

/**
 * Eyebrow / overline — 11px semibold uppercase with letter-spacing.
 * Used above page titles as a category label or brand marker.
 *
 * ```tsx
 * <TypographyOverline mb={8}>@tela/ui · Component Library</TypographyOverline>
 * <TypographyDisplay>Tela UI</TypographyDisplay>
 * ```
 */
export const TypographyOverline = make('overline', 'div');
