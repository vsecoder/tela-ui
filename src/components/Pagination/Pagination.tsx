import type { FC } from 'react';
import { motion } from 'motion/react';
import NumberFlow from '@number-flow/react';
import { cn } from '../cn';
import { Ripple } from '../Ripple';
import { tapSpring, pressIcon } from '../motion';

export interface PaginationProps {
  /** Current page, 1-based. */
  page: number;
  /** Total number of pages. */
  total: number;
  onChange: (page: number) => void;
  className?: string;
}

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Pagination: FC<PaginationProps> = ({ page, total, onChange, className }) => {
  const canPrev = page > 1;
  const canNext = page < total;

  return (
    <div className={cn('ui-pagination', className)} role="navigation" aria-label="Пагинация">
      <motion.button
        type="button"
        className="ui-pagination__btn"
        disabled={!canPrev}
        aria-label="Предыдущая страница"
        initial="rest"
        whileTap={canPrev ? 'tap' : undefined}
        transition={tapSpring}
        onClick={() => canPrev && onChange(page - 1)}
      >
        <motion.span className="ui-pagination__btn-inner" variants={pressIcon} transition={tapSpring}>
          <ArrowLeft />
        </motion.span>
        <Ripple />
      </motion.button>

      <span className="ui-pagination__info" aria-live="polite">
        <NumberFlow value={page} /> <span className="ui-pagination__sep">/</span> <NumberFlow value={total} />
      </span>

      <motion.button
        type="button"
        className="ui-pagination__btn"
        disabled={!canNext}
        aria-label="Следующая страница"
        initial="rest"
        whileTap={canNext ? 'tap' : undefined}
        transition={tapSpring}
        onClick={() => canNext && onChange(page + 1)}
      >
        <motion.span className="ui-pagination__btn-inner" variants={pressIcon} transition={tapSpring}>
          <ArrowRight />
        </motion.span>
        <Ripple />
      </motion.button>
    </div>
  );
};
