import type { FC, PropsWithChildren, ReactNode } from 'react';
import { cn } from '../cn';

export interface SectionProps {
  /** Text or element rendered above the section body. */
  header?: ReactNode;
  /** Text or element rendered below the section body. */
  footer?: ReactNode;
  className?: string;
}

/** Groups related `Cell` / `ButtonCell` rows with an optional header and footer. */
export const Section: FC<PropsWithChildren<SectionProps>> = ({
  children,
  header,
  footer,
  className,
}) => (
  <section className={cn('ui-section', className)}>
    {header && <div className="ui-section__header">{header}</div>}
    {children}
    {footer && <div className="ui-section__footer">{footer}</div>}
  </section>
);
