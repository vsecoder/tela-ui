import { useState } from 'react';
import type { FC } from 'react';
import { Check, Copy } from '@gravity-ui/icons';
import { AnimatePresence, motion } from 'motion/react';
import { Cell } from '../Cell/Cell';
import { snapSpring } from '../motion';
import { cn } from '../cn';

export interface CopyCellProps {
  /** Row title — describes what is being copied (e.g. "SSH команда", "IP-адрес"). */
  label: string;
  /** The string that gets copied to clipboard. Shown as monospace subtitle. */
  value: string;
  /** Replace displayed value with dots — for tokens and passwords. */
  obscure?: boolean;
  className?: string;
}

/**
 * A Cell row that copies `value` to the clipboard on tap.
 * Label is the primary title; value appears as a monospace subtitle.
 * The trailing icon animates between Copy and Check for 2 s after copying.
 *
 * ```tsx
 * <List>
 *   <Section header="Подключение">
 *     <CopyCell label="IP-адрес"    value="192.168.100.1" />
 *     <CopyCell label="SSH команда" value="ssh root@192.168.100.1" />
 *     <CopyCell label="API токен"   value="hk_live_abc123" obscure />
 *   </Section>
 * </List>
 * ```
 */
export const CopyCell: FC<CopyCellProps> = ({ label, value, obscure, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copied) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayed = obscure ? '•'.repeat(Math.min(value.length, 24)) : value;

  return (
    <Cell
      className={cn('ui-copy-cell', copied && 'ui-copy-cell--copied', className)}
      onClick={handleCopy}
      subtitle={<span className="ui-copy-cell__value">{displayed}</span>}
      after={
        <motion.span
          className={cn('ui-copy-cell__icon', copied && 'ui-copy-cell__icon--done')}
          whileTap={{ scale: 0.78 }}
          transition={snapSpring}
          aria-label={copied ? 'Скопировано' : 'Скопировать'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={snapSpring}
                style={{ display: 'flex' }}
              >
                <Check width={18} height={18} />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={snapSpring}
                style={{ display: 'flex' }}
              >
                <Copy width={18} height={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      }
    >
      {label}
    </Cell>
  );
};
