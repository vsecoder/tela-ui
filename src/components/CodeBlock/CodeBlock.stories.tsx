import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';
import { List } from '../List';
import { Section } from '../Section';
import { Inset } from '../Inset';
import { Cell } from '../Cell';

const meta: Meta<typeof CodeBlock> = {
  title: 'UI/CodeBlock',
  component: CodeBlock,
  argTypes: {
    lang:       { control: 'select', options: ['json', 'typescript', 'javascript', 'python', 'bash', 'yaml', 'html', 'css', 'sql', 'go'] },
    showHeader: { control: 'boolean' },
    maxLines:   { control: { type: 'number', min: 0, max: 50 } },
    code:       { control: 'text' },
  },
  args: {
    lang: 'json',
    showHeader: true,
    maxLines: 0,
    code: '{\n  "key": "value"\n}',
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Playground: Story = {};

const jsonExample = `{
  "address": "UQBvI0aFLnw2QbZgjMPCLRdtRHxhUyinQudg6sdiohIwg5jL",
  "network": "-239",
  "proof": {
    "timestamp": 1234567890,
    "domain": { "lengthBytes": 22, "value": "ton-connect.github.io" },
    "signature": "28tqe...",
    "payload": "3bdc...e1b3"
  }
}`;

const tsExample = `import { TonConnectUI } from '@tonconnect/ui-react';

const connector = new TonConnectUI({
  manifestUrl: 'https://example.com/tonconnect-manifest.json',
});

await connector.connectWallet();
const account = connector.account;
console.log(account?.address);`;

export const JSON_: Story = {
  name: 'JSON',
  args: { code: jsonExample, lang: 'json', showHeader: true },
};

export const TypeScript: Story = {
  args: { code: tsExample, lang: 'typescript', showHeader: true },
};

export const Collapsed: Story = {
  args: { code: jsonExample, lang: 'json', maxLines: 4, showHeader: true },
};

export const NoHeader: Story = {
  args: { code: '{"key": "value"}', lang: 'json', showHeader: false },
};

export const Usage: Story = {
  render: () => (
    <>
      <List>
        <Section header="Подключение к prod-01">
          <Cell subtitle="185.12.34.56">IP-адрес</Cell>
          <Cell subtitle="22">SSH-порт</Cell>
          <Cell subtitle="root">Пользователь</Cell>
        </Section>
        <Section header="SSH-команда">
          <Inset vertical>
            <CodeBlock
              lang="bash"
              code="ssh root@185.12.34.56 -p 22 -i ~/.ssh/id_rsa"
              showHeader
            />
          </Inset>
        </Section>
        <Section header="Конфиг ~/.ssh/config" footer="Добавьте блок в конец файла на вашей машине">
          <Inset vertical>
            <CodeBlock
              lang="bash"
              code={`Host prod-01\n  HostName 185.12.34.56\n  User root\n  Port 22\n  IdentityFile ~/.ssh/id_rsa`}
              showHeader
            />
          </Inset>
        </Section>
      </List>
    </>
  ),
};

// Note: CodeBlock всегда в <Inset vertical> внутри Section.
// showHeader=true показывает панель с именем языка и кнопкой копирования.
// maxLines для ограничения высоты длинных выводов (логи, конфиги).
// lang — строчный идентификатор языка (bash, json, python, yaml).
// Не используй CodeBlock для одной короткой строки — используй <code> в Typography.
