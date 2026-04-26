import type { FC, ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';
import { tapSpring, pressContent } from '../motion';

export interface ButtonGroupItem {
  label?: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}

export interface ButtonGroupProps {
  items: ButtonGroupItem[];
  className?: string;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ items, className }) => (
  <div className={cn('ui-btn-group', className)}>
    {items.map((item, i) => (
      <motion.button
        key={i}
        type="button"
        className={cn('ui-btn-group__item', item.danger && 'ui-btn-group__item--danger')}
        onClick={item.onClick}
        disabled={item.disabled}
        initial="rest"
        whileTap={item.disabled ? undefined : 'tap'}
        transition={tapSpring}
      >
        <motion.span className="ui-btn-group__inner" variants={pressContent} transition={tapSpring}>
          {item.icon && <span className="ui-btn-group__icon">{item.icon}</span>}
          {item.label && <span className="ui-btn-group__label">{item.label}</span>}
        </motion.span>
        <Ripple />
      </motion.button>
    ))}
  </div>
);
