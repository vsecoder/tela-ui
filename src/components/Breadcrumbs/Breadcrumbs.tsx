import type { FC, ReactNode } from 'react';
import { cn } from '../cn';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

const DefaultSeparator = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M4.5 2.5L7.5 6l-3 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  items,
  separator = <DefaultSeparator />,
  className,
}) => (
  <nav aria-label="breadcrumb" className={cn('ui-breadcrumbs', className)}>
    <ol className="ui-breadcrumbs__list">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={i} className="ui-breadcrumbs__item">
            {i > 0 && (
              <span className="ui-breadcrumbs__sep" aria-hidden>{separator}</span>
            )}
            {isLast || (!item.href && !item.onClick) ? (
              <span
                className={cn('ui-breadcrumbs__label', isLast && 'ui-breadcrumbs__label--current')}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            ) : (
              <a
                className="ui-breadcrumbs__link"
                href={item.href}
                onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick!(); } : undefined}
              >
                {item.label}
              </a>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
