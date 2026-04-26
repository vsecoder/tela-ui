import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "../../components/CodeBlock";
import {
  TypographyOverline,
  TypographyDisplay,
  TypographyTitle,
  TypographyHeadline,
  TypographyBody,
  TypographyLabel,
} from "../../components/Typography";

const meta: Meta = {
  title: "Examples/Debugging Guide",
  parameters: { layout: "fullscreen", docs: { page: null } },
};
export default meta;
type Story = StoryObj;

const CODE_ENV = `# .env (webapp root)
VITE_API_URL=https://api.example.com          # базовый URL вашего бэкенда
VITE_DEV_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx        # dev-токен для авторизации
VITE_BOT_USERNAME=your_bot_username`;

const CODE_MOCK_ENV = `// src/mockEnv.ts
import { mockTelegramEnv, parseUniqueOrigin } from '@tma.js/sdk-react';

mockTelegramEnv({
  themeParams: {
    accentTextColor: '#6ab2f2',
    bgColor: '#17212b',
    buttonColor: '#5288c1',
    buttonTextColor: '#ffffff',
    destructiveTextColor: '#ec3942',
    headerBgColor: '#17212b',
    hintColor: '#708499',
    linkColor: '#6ab3f3',
    secondaryBgColor: '#232e3c',
    sectionBgColor: '#17212b',
    sectionHeaderTextColor: '#6ab3f3',
    subtitleTextColor: '#708499',
    textColor: '#f5f5f5',
  },
  // Обработчик событий Telegram WebApp
  onEvent(eventType, eventData) {
    if (eventType === 'web_app_request_viewport') {
      this.emitEvent('viewport_changed', {
        height: window.innerHeight,
        width: window.innerWidth,
        is_expanded: true,
        is_state_stable: true,
      });
    }
    if (eventType === 'web_app_request_safe_area') {
      this.emitEvent('safe_area_changed', {
        left: 0, right: 0, top: 0, bottom: 0,
      });
    }
    if (eventType === 'web_app_request_content_safe_area') {
      this.emitEvent('content_safe_area_changed', {
        left: 0, right: 0, top: 0, bottom: 0,
      });
    }
  },
  launchParams: [
    'tgWebAppVersion=8.0',
    'tgWebAppPlatform=web',
    \`tgWebAppData=\${new URLSearchParams({
      user: JSON.stringify({
        id: 1,
        first_name: 'Test',
        last_name: 'User',
        username: 'testuser',
        language_code: 'ru',
      }),
      hash: 'abc123',
      auth_date: '1714000000',
    })}\`,
  ].join('&'),
});`;

const CODE_MOCK_PROVIDER = `// src/stories/MockTelegramProvider.tsx
import { createContext, useContext } from 'react';
import { WebAppClient } from '@/api/client';

const mockClient = new WebAppClient({ baseUrl: import.meta.env.VITE_API_URL });

const mockUser = {
  id: 1,
  first_name: 'Test',
  last_name: 'User',
  username: 'testuser',
  language_code: 'ru' as const,
};

const TelegramContext = createContext({ client: mockClient, user: mockUser });

export function MockTelegramProvider({ children }: { children: React.ReactNode }) {
  return (
    <TelegramContext.Provider value={{ client: mockClient, user: mockUser }}>
      {children}
    </TelegramContext.Provider>
  );
}

export const useTelegram = () => useContext(TelegramContext);`;

const CODE_MOCKS = `// src/stories/__mocks__/tma-sdk-react.ts
// Заглушка TMA SDK для Storybook — реальный SDK недоступен вне Telegram

export const backButton = {
  show: () => {},
  hide: () => {},
  onClick: (_handler: () => void) => () => {},
  offClick: () => {},
  isVisible: false,
};

export const mainButton = {
  show: () => {},
  hide: () => {},
  setText: (_text: string) => {},
  onClick: (_handler: () => void) => () => {},
  offClick: () => {},
  isVisible: false,
  isLoaderVisible: false,
  setParams: (_params: object) => {},
};

export const popup = {
  open: (_params: object) => Promise.resolve(null),
};

export const openLink = (_url: string) => {};

export const miniApp = {
  close: () => {},
  ready: () => {},
};

export const themeParams = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  accentTextColor: '#007aff',
};

export const retrieveLaunchParams = () => ({
  tgWebAppData: {
    user: { id: 1, first_name: 'Test', username: 'testuser' },
    hash: 'mock',
    auth_date: 0,
  },
});`;

const CODE_DECORATOR = `// src/stories/pageDecorator.tsx
import { MemoryRouter } from 'react-router-dom';
import { MockTelegramProvider } from './MockTelegramProvider';
import type { Decorator } from '@storybook/react';

export function makePageDecorator(contextOverride?: object): Decorator {
  return (Story) => (
    <MemoryRouter>
      <MockTelegramProvider {...contextOverride}>
        <Story />
      </MockTelegramProvider>
    </MemoryRouter>
  );
}

// Использование в story-файле:
// export default {
//   title: 'Pages/HostPage',
//   decorators: [makePageDecorator()],
// } satisfies Meta;`;

const CODE_VITE = `// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    mkcert(),   // HTTPS — обязателен для Telegram Mini App
  ],
  server: {
    host: true, // 0.0.0.0 — доступно по локальной сети (для ngrok/tunnels)
    port: 5173,
  },
});`;

const CODE_MAIN = `// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// Эмуляция TMA-среды в dev-режиме
if (import.meta.env.DEV) {
  const { mockTelegramEnv } = await import('./mockEnv');
  // mockTelegramEnv() вызывается внутри файла
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);`;

const CODE_STORYBOOK_MAIN = `// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react-vite',
  viteFinal(config) {
    // Алиас для мок-файлов вместо реальных SDK
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tma.js/sdk-react': new URL(
        '../src/stories/__mocks__/tma-sdk-react.ts',
        import.meta.url,
      ).pathname,
    };
    return config;
  },
};
export default config;`;

function DocSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 40 }}>
      <TypographyTitle mb={desc ? 6 : 16}>{title}</TypographyTitle>
      {desc && (
        <TypographyBody size={14} color="secondary" mb={16}>
          {desc}
        </TypographyBody>
      )}
      {children}
    </section>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        margin: "12px 0",
        padding: "10px 14px",
        borderRadius: 10,
        background: "var(--ui-surface)",
        border: "1px solid var(--ui-border)",
      }}
    >
      <TypographyBody size={13} color="secondary">
        {children}
      </TypographyBody>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: 32 }}>
      <div
        style={{
          flexShrink: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "var(--ui-accent)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          marginTop: 2,
        }}
      >
        <TypographyLabel size={13} color="primary" weight={700}>
          {n}
        </TypographyLabel>
      </div>
      <div style={{ flex: 1 }}>
        <TypographyHeadline size={15} mb={10}>
          {title}
        </TypographyHeadline>
        {children}
      </div>
    </div>
  );
}

function DebuggingGuide() {
  return (
    <div
      style={{
        padding: "32px 24px",
        maxWidth: 760,
        margin: "0 auto",
        fontFamily: "var(--ui-font, sans-serif)",
        color: "var(--ui-text)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <TypographyOverline mb={8}>Hikkahost Webapp</TypographyOverline>
        <TypographyDisplay size={32} mb={12}>
          Локальная разработка с мок-данными
        </TypographyDisplay>
        <TypographyBody color="secondary" maxWidth={580}>
          Telegram Mini App требует специального окружения. Здесь описан способ
          запустить webapp локально без реального Telegram — с эмуляцией SDK и
          мок-пользователем.
        </TypographyBody>
      </div>

      <DocSection title="Шаги запуска">
        <Step n={1} title="Создайте .env в корне webapp">
          <CodeBlock lang="bash" code={CODE_ENV} />
          <Note>
            <strong>VITE_DEV_TOKEN</strong> — токен из вашего
            dev/staging-окружения. Без него все API-запросы вернут 401.
          </Note>
        </Step>

        <Step n={2} title="mockEnv.ts — эмуляция Telegram окружения">
          <CodeBlock lang="ts" code={CODE_MOCK_ENV} />
          <Note>
            Файл вызывает{" "}
            <code
              style={{
                background: "var(--ui-border)",
                padding: "1px 4px",
                borderRadius: 4,
              }}
            >
              mockTelegramEnv()
            </code>{" "}
            из{" "}
            <code
              style={{
                background: "var(--ui-border)",
                padding: "1px 4px",
                borderRadius: 4,
              }}
            >
              @tma.js/sdk-react
            </code>
            , который инициирует фейковый WebApp в браузере. Важно подписаться
            на{" "}
            <code
              style={{
                background: "var(--ui-border)",
                padding: "1px 4px",
                borderRadius: 4,
              }}
            >
              web_app_request_viewport
            </code>{" "}
            и другие события, иначе SDK зависнет в ожидании.
          </Note>
        </Step>

        <Step n={3} title="Подключите mockEnv.ts в main.tsx">
          <CodeBlock lang="tsx" code={CODE_MAIN} />
          <Note>
            Импорт через{" "}
            <code
              style={{
                background: "var(--ui-border)",
                padding: "1px 4px",
                borderRadius: 4,
              }}
            >
              import.meta.env.DEV
            </code>{" "}
            гарантирует, что мок не попадёт в production-бандл.
          </Note>
        </Step>

        <Step n={4} title="vite.config.ts — HTTPS через mkcert">
          <CodeBlock lang="ts" code={CODE_VITE} />
          <Note>
            Telegram Mini App принимает только HTTPS-хосты.
            <strong> vite-plugin-mkcert</strong> автоматически создаёт локальный
            сертификат. Установите:{" "}
            <code
              style={{
                background: "var(--ui-border)",
                padding: "1px 4px",
                borderRadius: 4,
              }}
            >
              npm i -D vite-plugin-mkcert
            </code>
          </Note>
        </Step>
      </DocSection>

      <DocSection title="Storybook — мок SDK и декоратор страниц">
        <TypographyHeadline size={15} mb={10}>
          __mocks__/tma-sdk-react.ts
        </TypographyHeadline>
        <TypographyBody size={14} color="secondary" mb={12}>
          Storybook запускается вне браузерного Telegram, поэтому настоящий SDK
          падает. Создайте файл-заглушку и направьте на него алиас в{" "}
          <code
            style={{
              background: "var(--ui-border)",
              padding: "1px 4px",
              borderRadius: 4,
            }}
          >
            viteFinal
          </code>
          :
        </TypographyBody>
        <CodeBlock lang="ts" code={CODE_MOCKS} />

        <div style={{ marginTop: 20 }}>
          <TypographyHeadline size={15} mb={10}>
            .storybook/main.ts — алиас мока
          </TypographyHeadline>
          <CodeBlock lang="ts" code={CODE_STORYBOOK_MAIN} />
        </div>

        <div style={{ marginTop: 20 }}>
          <TypographyHeadline size={15} mb={10}>
            MockTelegramProvider
          </TypographyHeadline>
          <TypographyBody size={14} color="secondary" mb={12}>
            Обёртка для подмены контекста приложения (клиент, пользователь) в
            story-файлах:
          </TypographyBody>
          <CodeBlock lang="tsx" code={CODE_MOCK_PROVIDER} />
        </div>

        <div style={{ marginTop: 20 }}>
          <TypographyHeadline size={15} mb={10}>
            makePageDecorator
          </TypographyHeadline>
          <TypographyBody size={14} color="secondary" mb={12}>
            Обёртка страниц в{" "}
            <code
              style={{
                background: "var(--ui-border)",
                padding: "1px 4px",
                borderRadius: 4,
              }}
            >
              MemoryRouter
            </code>{" "}
            +{" "}
            <code
              style={{
                background: "var(--ui-border)",
                padding: "1px 4px",
                borderRadius: 4,
              }}
            >
              MockTelegramProvider
            </code>{" "}
            одной функцией:
          </TypographyBody>
          <CodeBlock lang="tsx" code={CODE_DECORATOR} />
        </div>
      </DocSection>

      <DocSection title="Архитектура мок-слоя">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            [
              "main.tsx (DEV)",
              "mockTelegramEnv() — инициализирует фейковый WebApp в браузере",
            ],
            [
              ".env",
              "VITE_DEV_TOKEN — используется ApiClient для авторизации запросов",
            ],
            [
              "__mocks__/tma-sdk-react.ts",
              "Заглушка SDK для Storybook, алиас через viteFinal",
            ],
            [
              "MockTelegramProvider",
              "React context с mockClient и mockUser для page-stories",
            ],
            [
              "makePageDecorator",
              "MemoryRouter + MockTelegramProvider одной строкой",
            ],
            [
              "vite-plugin-mkcert",
              "HTTPS — без него Telegram отклонит хост как Mini App",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              style={{
                display: "flex",
                gap: 12,
                padding: "10px 14px",
                borderRadius: 10,
                background: "var(--ui-surface)",
                border: "1px solid var(--ui-border)",
                alignItems: "flex-start",
              }}
            >
              <code
                style={{
                  fontSize: 12,
                  color: "var(--ui-accent)",
                  flexShrink: 0,
                  paddingTop: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {title}
              </code>
              <TypographyLabel size={13} color="secondary">
                {desc}
              </TypographyLabel>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Частые проблемы">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            [
              "SDK зависает при инициализации",
              "Не подписались на web_app_request_viewport в onEvent. SDK ждёт ответа viewport_changed.",
            ],
            [
              "API отвечает 401",
              "Отсутствует или просрочен VITE_DEV_TOKEN. Получите актуальный токен из staging.",
            ],
            [
              "Telegram не принимает хост",
              "Запущен по HTTP, а не HTTPS. Добавьте vite-plugin-mkcert и установите mkcert CA в системе.",
            ],
            [
              "Storybook: TypeError от SDK",
              "Алиас мока не настроен в viteFinal. Проверьте путь к __mocks__/tma-sdk-react.ts.",
            ],
            [
              "useNavigate вне Router",
              "Page story не обёрнута в makePageDecorator — добавьте декоратор в meta.decorators.",
            ],
          ].map(([problem, solution]) => (
            <div
              key={problem}
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                background: "var(--ui-surface)",
                border: "1px solid var(--ui-border)",
              }}
            >
              <TypographyLabel size={13} weight={600} color="danger" mb={4}>
                {problem}
              </TypographyLabel>
              <TypographyLabel size={13} color="secondary">
                {solution}
              </TypographyLabel>
            </div>
          ))}
        </div>
      </DocSection>
    </div>
  );
}

export const Guide: Story = {
  name: "Debugging Guide",
  render: () => <DebuggingGuide />,
};
