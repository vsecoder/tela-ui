# Tela UI

A component library for Telegram Mini Apps built with React, Motion, and CSS custom properties. Follows Telegram's visual language — adaptive to the user's theme (light/dark) via `--tg-theme-*` variables.

## Components

| Category | Components |
|---|---|
| **Layout** | `List`, `Section`, `Cell`, `Inset`, `Divider` |
| **Navigation** | `Navbar`, `Toggle`, `ChipGroup` / `Chip`, `Carousel` |
| **Forms** | `Input`, `Textarea`, `Select`, `Switch`, `Counter` |
| **Actions** | `Button`, `ButtonCell`, `InlineButtons` |
| **Feedback** | `Modal`, `Snackbar`, `ActionMenu`, `Badge`, `ProgressBar`, `Skeleton` |
| **Display** | `Card`, `Avatar`, `Timeline`, `CodeBlock` |
| **Typography** | `TypographyTitle`, `TypographyHeadline`, `TypographyBody`, `TypographyLabel`, `TypographyOverline` |
| **Motion** | `FadeIn`, `Stagger` |

## Design tokens

All colors map to CSS custom properties. Drop the library into any Telegram Mini App and it picks up the user's theme automatically:

```css
--tg-theme-bg-color
--tg-theme-text-color
--tg-theme-button-color
--tg-theme-accent-text-color
/* … and the rest of the Telegram palette */
```

Internal `--ui-*` aliases are derived from these tokens, so you can also override them independently for non-Telegram contexts.

## Quick start

```bash
npm install @tela/ui
```

```tsx
import { Button, Cell, List, Section } from '@tela/ui';
import '@tela/ui/ui.css';

export function App() {
  return (
    <List>
      <Section header="Settings">
        <Cell subtitle="Manage your account">Profile</Cell>
      </Section>
      <Button size="l" stretched>Continue</Button>
    </List>
  );
}
```

## Storybook

Live demo: [tela-ui.vercel.app](https://tela-ui.vercel.app)

Run locally:

```bash
npm install
npm run storybook
```

Build static Storybook:

```bash
npm run build-storybook
# outputs to storybook-static/
```

## Deploy to Vercel

1. Push the repo to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Set the build settings:

| Setting | Value |
|---|---|
| **Framework Preset** | Other |
| **Build Command** | `npm run build-storybook` |
| **Output Directory** | `storybook-static` |
| **Install Command** | `npm install` |

No environment variables required.

## License

[MIT](./LICENSE)
