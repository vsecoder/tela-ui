import type { Meta, StoryObj } from '@storybook/react';
import { AppRoot } from '../components/AppRoot';
import { List } from '../components/List';
import { Section } from '../components/Section';
import { Cell } from '../components/Cell';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Switch } from '../components/Switch';
import { Tag } from '../components/Tag';
import { StatusIndicator } from '../components/StatusIndicator';
import { createTheme } from '../tokens';

// ---------------------------------------------------------------------------
// ThemeDemo — a representative slice of the UI in one component
// ---------------------------------------------------------------------------

function ThemeDemo({ appearance }: { appearance: 'light' | 'dark' }) {
  return (
    <AppRoot appearance={appearance} style={{ minHeight: '100vh' }}>
      <List>
        <Section header="Пример использования компонентов" footer="Все цвета берутся из --ui-* токенов">
          <Cell
            before={<StatusIndicator state="online" />}
            after={<Badge variant="accent">Pro</Badge>}
            subtitle="hikka-main · EU West"
          >
            hikka-my-server
          </Cell>
          <Cell
            before={<StatusIndicator state="offline" />}
            after={<Badge variant="neutral">Free</Badge>}
            subtitle="hikka-backup · US East"
          >
            hikka-backup
          </Cell>
        </Section>

        <Section header="Ресурсы">
          <Cell subtitle="CPU">
            <ProgressBar value={42} color="accent" />
          </Cell>
          <Cell subtitle="RAM">
            <ProgressBar value={78} color="warning" />
          </Cell>
          <Cell subtitle="Диск">
            <ProgressBar value={91} color="danger" />
          </Cell>
        </Section>

        <Section header="Настройки">
          <Cell after={<Switch checked onChange={() => {}} />}>Автообновление</Cell>
          <Cell after={<Switch />}>Уведомления</Cell>
          <Input header="Название хоста" placeholder="hikka-main" />
        </Section>

        <Section header="Теги">
          <Cell>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '4px 0' }}>
              <Tag variant="accent">running</Tag>
              <Tag variant="success">healthy</Tag>
              <Tag variant="warning">high load</Tag>
              <Tag variant="danger">critical</Tag>
              <Tag variant="neutral">idle</Tag>
            </div>
          </Cell>
        </Section>
      </List>

      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button size="l">Создать хост</Button>
        <Button size="l" mode="outline">Отмена</Button>
        <Button size="l" mode="danger">Удалить хост</Button>
      </div>
    </AppRoot>
  );
}

// ---------------------------------------------------------------------------
// Custom theme demo — violet accent
// ---------------------------------------------------------------------------

const violetTheme = createTheme({
  colors: {
    accent:   '#7c3aed',
    accentFg: '#ffffff',
    link:     '#7c3aed',
  },
  radii: {
    radius:   '16px',
    radiusSm: '12px',
  },
});

function InjectTheme({ theme }: { theme: ReturnType<typeof createTheme> }) {
  return <style>{theme.styleContent}</style>;
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Foundation/Themes',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Light: StoryObj = {
  name: 'Light Theme',
  render: () => <ThemeDemo appearance="light" />,
};

export const Dark: StoryObj = {
  name: 'Dark Theme',
  render: () => <ThemeDemo appearance="dark" />,
};

export const CustomViolet: StoryObj = {
  name: 'Custom Theme — Violet',
  render: () => (
    <>
      <InjectTheme theme={violetTheme} />
      <ThemeDemo appearance="light" />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: `Пример кастомной темы с фиолетовым акцентом и увеличенными радиусами:
\`\`\`ts
import { createTheme } from '@tela/ui/tokens';

const theme = createTheme({
  colors: { accent: '#7c3aed', accentFg: '#ffffff', link: '#7c3aed' },
  radii:  { radius: '16px', radiusSm: '12px' },
});

// Inject into your app:
document.head.insertAdjacentHTML('beforeend', \`<style>\${theme.styleContent}</style>\`);
\`\`\``,
      },
    },
  },
};

export const CustomDarkViolet: StoryObj = {
  name: 'Custom Theme — Dark Violet',
  render: () => (
    <>
      <InjectTheme theme={violetTheme} />
      <ThemeDemo appearance="dark" />
    </>
  ),
};
