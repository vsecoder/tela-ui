import type { FC, ReactNode, TextareaHTMLAttributes } from 'react';
import { cn } from '../cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label rendered above the field. */
  header?: ReactNode;
  /** Icon placed to the left of the textarea. */
  before?: ReactNode;
  /** Icon or element placed to the right of the textarea. */
  after?: ReactNode;
}

/** Labeled multi-line text input with optional left/right icon slots. */
export const Textarea: FC<TextareaProps> = ({ header, before, after, className, ...props }) => (
  <label className={cn('ui-textarea', className)}>
    {header && <span className="ui-textarea__header">{header}</span>}
    <div className="ui-textarea__field">
      {before && <span className="ui-textarea__before">{before}</span>}
      <textarea {...props} />
      {after && <span className="ui-textarea__after">{after}</span>}
    </div>
  </label>
);
