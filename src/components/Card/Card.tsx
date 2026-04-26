import type { FC, MouseEventHandler, PropsWithChildren, ReactNode } from 'react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

// ---- CardMedia -------------------------------------------------------------

export type CardAspect = '1/1' | '4/3' | '16/9' | '3/4' | '3/2';

export interface CardMediaProps {
  /** Image URL. */
  src?: string;
  /** Alt text for the image. Default: empty (decorative). */
  alt?: string;
  /** Custom content instead of an `<img>` (e.g. a map, video, icon). */
  children?: ReactNode;
  /** Aspect ratio of the media area. Default: `'16/9'`. */
  aspect?: CardAspect;
  className?: string;
}

/** Image / media area at the top (or left in horizontal layout) of a card. */
const CardMedia: FC<CardMediaProps> = ({
  src,
  alt = '',
  children,
  aspect = '16/9',
  className,
}) => (
  <div
    className={cn('ui-card__media', `ui-card__media--${aspect.replace('/', '-')}`, className)}
  >
    {src ? <img src={src} alt={alt} className="ui-card__media-img" /> : children}
  </div>
);

// ---- CardBadge -------------------------------------------------------------

export interface CardBadgeProps {
  /** Corner of the media area. Default: `'top-left'`. */
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  children: ReactNode;
  className?: string;
}

/** Overlay badge positioned in a corner of `Card.Media`. */
const CardBadge: FC<CardBadgeProps> = ({
  placement = 'top-left',
  children,
  className,
}) => (
  <div className={cn('ui-card__badge', `ui-card__badge--${placement}`, className)}>
    {children}
  </div>
);

// ---- CardBody --------------------------------------------------------------

export interface CardBodyProps {
  /** Vertical gap between body children. Default: `8`. */
  gap?: number;
  className?: string;
  children: ReactNode;
}

/** Padded content area for title, description, tags, price. */
const CardBody: FC<CardBodyProps> = ({ gap = 8, children, className }) => (
  <div className={cn('ui-card__body', className)} style={gap !== 8 ? { gap } : undefined}>
    {children}
  </div>
);

// ---- CardTitle -------------------------------------------------------------

export interface CardTitleProps {
  /** Number of lines before truncation. Default: no clamp. */
  lines?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
}

/** Primary heading line of a card. */
const CardTitle: FC<CardTitleProps> = ({ lines, children, className }) => (
  <div
    className={cn('ui-card__title', lines && `ui-card__title--clamp-${lines}`, className)}
  >
    {children}
  </div>
);

// ---- CardDescription -------------------------------------------------------

export interface CardDescriptionProps {
  lines?: 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}

/** Secondary body text below the title. */
const CardDescription: FC<CardDescriptionProps> = ({ lines, children, className }) => (
  <div
    className={cn('ui-card__desc', lines && `ui-card__desc--clamp-${lines}`, className)}
  >
    {children}
  </div>
);

// ---- CardTags --------------------------------------------------------------

/** Wrapping row of `Tag` or `Badge` elements. */
const CardTags: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={cn('ui-card__tags', className)}>{children}</div>
);

// ---- CardPrice -------------------------------------------------------------

export interface CardPriceProps {
  /** Main price string, e.g. `"299 ₽"`. */
  current: ReactNode;
  /** Crossed-out original price, e.g. `"599 ₽"`. */
  original?: ReactNode;
  /** Discount label shown in green, e.g. `"-50%"`. */
  discount?: ReactNode;
  className?: string;
}

/**
 * Price row with optional strikethrough original and discount badge.
 *
 * ```tsx
 * <Card.Price current="299 ₽" original="599 ₽" discount="-50%" />
 * ```
 */
const CardPrice: FC<CardPriceProps> = ({
  current,
  original,
  discount,
  className,
}) => (
  <div className={cn('ui-card__price', className)}>
    <span className="ui-card__price-current">{current}</span>
    {original && <span className="ui-card__price-original">{original}</span>}
    {discount && <span className="ui-card__price-discount">{discount}</span>}
  </div>
);

// ---- CardActions -----------------------------------------------------------

export interface CardActionsProps {
  /** Horizontal gap between buttons. Default: `8`. */
  gap?: number;
  children: ReactNode;
  className?: string;
}

/** Padded button row at the bottom of a card. */
const CardActions: FC<CardActionsProps> = ({ gap = 8, children, className }) => (
  <div className={cn('ui-card__actions', className)} style={gap !== 8 ? { gap } : undefined}>
    {children}
  </div>
);

// ---- Card (root) -----------------------------------------------------------

export interface CardProps {
  /**
   * Horizontal layout — image occupies the left column, content the right.
   * Recommended for list-style cards (search results, catalogues).
   */
  horizontal?: boolean;
  /** Makes the entire card tappable. Adds a ripple and pointer cursor. */
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
  children: ReactNode;
}

/**
 * Surface container for structured content like products, articles, or server plans.
 * Compose with sub-components for full control:
 *
 * ```tsx
 * <Card>
 *   <Card.Media src={imgUrl} aspect="4/3">
 *     <Card.Badge placement="top-left">
 *       <Badge variant="danger">Хит</Badge>
 *     </Card.Badge>
 *   </Card.Media>
 *
 *   <Card.Body>
 *     <Card.Tags>
 *       <Tag variant="accent">Cloud</Tag>
 *       <Tag variant="neutral">EU West</Tag>
 *     </Card.Tags>
 *     <Card.Title lines={2}>Hikka Pro · 4 vCPU / 8 GB</Card.Title>
 *     <Card.Description lines={3}>
 *       Мощный сервер для высоконагруженных userbot-проектов.
 *     </Card.Description>
 *     <Card.Price current="299 ₽/мес" original="599 ₽" discount="-50%" />
 *   </Card.Body>
 *
 *   <Card.Actions>
 *     <Button size="m" stretched>Купить</Button>
 *     <Button size="m" mode="outline"><Bookmark /></Button>
 *   </Card.Actions>
 * </Card>
 * ```
 */
const CardRoot: FC<CardProps> = ({ horizontal, onClick, className, children }) => {
  const interactive = Boolean(onClick);
  return (
    <div
      className={cn(
        'ui-card',
        horizontal  && 'ui-card--horizontal',
        interactive && 'ui-card--interactive',
        className,
      )}
      onClick={onClick}
    >
      {children}
      {interactive && <Ripple />}
    </div>
  );
};

export const Card = Object.assign(CardRoot, {
  Media:       CardMedia,
  Badge:       CardBadge,
  Body:        CardBody,
  Title:       CardTitle,
  Description: CardDescription,
  Tags:        CardTags,
  Price:       CardPrice,
  Actions:     CardActions,
});
