import type { FC, PropsWithChildren } from 'react';
import { cn } from '../cn';

export interface ListProps {
  className?: string;
}

/**
 * Vertical stack container for `Section` blocks.
 * Provides the background surface and spacing between sections.
 *
 * ```tsx
 * <List>
 *   <Section header="Аккаунт">
 *     <Cell>Личные данные</Cell>
 *   </Section>
 *   <Section header="Уведомления">
 *     <Cell after={<Switch checked onChange={toggle} />}>Push</Cell>
 *   </Section>
 * </List>
 * ```
 */
export const List: FC<PropsWithChildren<ListProps>> = ({ children, className }) => (
  <div className={cn('ui-list', className)}>{children}</div>
);
