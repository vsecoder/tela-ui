import MDEditor from '@uiw/react-md-editor';
import type { FC, ReactNode } from 'react';
import { cn } from '../cn';

export interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  /** Label shown above the editor */
  header?: ReactNode;
  height?: number;
  placeholder?: string;
  /** 'light' | 'dark' — defaults to system preference */
  colorMode?: 'light' | 'dark';
  className?: string;
}

export const MarkdownEditor: FC<MarkdownEditorProps> = ({
  value,
  onChange,
  header,
  height = 320,
  placeholder,
  colorMode,
  className,
}) => {
  const mode = colorMode ?? (
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  );

  return (
    <div className={cn('ui-md-editor', className)} data-color-mode={mode}>
      {header && <span className="ui-textarea__header">{header}</span>}
      <MDEditor
        value={value}
        onChange={(v) => onChange(v ?? '')}
        height={height}
        preview="live"
        visibleDragbar={false}
        textareaProps={{ placeholder }}
        style={{ borderRadius: 0, boxShadow: 'none' }}
      />
    </div>
  );
};
