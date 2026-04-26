import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { Copy, CopyCheck } from '@gravity-ui/icons';
import { codeToHtml } from 'shiki';
import { cn } from '../cn';

export interface CodeBlockProps {
  code: string;
  lang?: string;
  /** Show language label + copy button */
  showHeader?: boolean;
  /** Max lines before collapse (0 = never collapse) */
  maxLines?: number;
  className?: string;
}

export const CodeBlock: FC<CodeBlockProps> = ({
  code,
  lang = 'json',
  showHeader = true,
  maxLines = 0,
  className,
}) => {
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const lineCount = code.split('\n').length;
  const collapsible = maxLines > 0 && lineCount > maxLines;
  const isCollapsed = collapsible && !expanded;

  useEffect(() => {
    let cancelled = false;
    const isDark = document.documentElement.dataset.appearance === 'dark'
      || document.body.dataset.appearance === 'dark'
      || window.matchMedia('(prefers-color-scheme: dark)').matches;

    codeToHtml(code, {
      lang,
      theme: isDark ? 'github-dark' : 'github-light',
    }).then((result) => {
      if (!cancelled) setHtml(result);
    }).catch(() => {
      if (!cancelled) setHtml(`<pre><code>${code}</code></pre>`);
    });

    return () => { cancelled = true; };
  }, [code, lang]);

  const handleCopy = () => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={cn('ui-code-block', className)}>
      {showHeader && (
        <div className="ui-code-block__header">
          <span className="ui-code-block__lang">{lang}</span>
          <button type="button" className="ui-code-block__copy" onClick={handleCopy} aria-label={copied ? 'Скопировано' : 'Копировать'}>
            {copied ? <CopyCheck width={15} height={15} /> : <Copy width={15} height={15} />}
          </button>
        </div>
      )}
      {html ? (
        /* eslint-disable-next-line react/no-danger */
        <div
          ref={ref}
          className={cn('ui-code-block__body', isCollapsed && 'ui-code-block__body--collapsed')}
          style={isCollapsed ? { '--code-max-lines': maxLines } as React.CSSProperties : undefined}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <div
          ref={ref}
          className={cn('ui-code-block__body', isCollapsed && 'ui-code-block__body--collapsed')}
          style={isCollapsed ? { '--code-max-lines': maxLines } as React.CSSProperties : undefined}
        >
          <pre className="ui-code-block__fallback"><code>{code}</code></pre>
        </div>
      )}
      {collapsible && (
        <button
          type="button"
          className="ui-code-block__expand"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Свернуть' : `Показать все ${lineCount} строк`}
        </button>
      )}
    </div>
  );
};
