import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../cn';
import { CodeBlock } from '../CodeBlock';

export interface MarkdownProps {
  children: string;
  className?: string;
}

export const Markdown: FC<MarkdownProps> = ({ children, className }) => (
  <div className={cn('ui-markdown', className)}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // In react-markdown v10 `inline` prop is removed.
        // Block code always has a `language-*` class from remark; inline never does.
        code({ className: cls, children: code }) {
          const match = /language-(\w+)/.exec(cls ?? '');
          if (match) {
            return (
              <CodeBlock
                code={String(code).replace(/\n$/, '')}
                lang={match[1]}
                showHeader
              />
            );
          }
          return <code className="ui-markdown__inline-code">{code}</code>;
        },
        // Unwrap <pre> so CodeBlock handles its own container
        pre({ children: preChildren }) {
          return <>{preChildren}</>;
        },
      }}
    >
      {children}
    </ReactMarkdown>
  </div>
);
