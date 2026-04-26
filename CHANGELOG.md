# Changelog

All notable changes to `@tela/ui` will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [1.1.0] — 2026-04-26

### Added
- **`Rating`** — interactive star rating with hover, half-star display, and spring animations. Sizes: `s` / `m` / `l`. Supports `readonly` and `disabled` states.
- **`DatePicker`** — bottom-sheet calendar picker. Month navigation, `min`/`max` constraints, today highlight, selected date highlight. No external dependencies.
- **`TimePicker`** — iOS-style drum scroll picker for hours and minutes. CSS scroll-snap, configurable `step`. Confirm button commits the value.
- **`Map`** — interactive Leaflet map with dynamic import (no bundle bloat). `static` prop disables all interactions. Supports multiple markers with popups.
- **`Button mode="link"`** — bare text button with no padding or background for inline use in headers and rows.

### Changed
- **`package.json`**: removed `"private": true`; moved `react`, `react-dom`, `motion` to `peerDependencies`; added `"files"` field to limit publish output to `dist/`, `README.md`, `LICENSE`.
- **`Counter`**: clicking the value opens an inline `<input>` for direct numeric entry. Browser spinner arrows hidden via CSS.
- **`Counter`**: added `size` prop — `'m'` (44 px, default) and `'s'` (32 px).
- **`Button`**: added `mode="link"` — zero-padding text button for inline/header use.
- **`Input`**: added `error` prop — shows a red message below the field.
- **`Inset`**: added `top` and `bottom` props to override vertical padding with exact pixel values via inline style.

### Fixed
- `Counter` value slot now uses `width` instead of `min-width` — prevents resize jump when switching to edit mode.
- `Counter` edit input strips default browser padding and hides number spinners (`-webkit-appearance: none`).

---

## [1.0.0] — 2026-04-26

### Added
Initial public release. Includes:

**Layout** — `List`, `Section`, `Cell`, `ButtonCell`, `Inset`, `Divider`  
**Navigation** — `Navbar`, `Toggle`, `Chip` / `ChipGroup`, `Carousel`, `Tabs`, `Breadcrumbs`, `Pagination`  
**Forms** — `Input`, `Textarea`, `Select`, `MultiSelect`, `Combobox`, `Switch`, `Checkbox`, `RadioGroup`, `Counter`, `PinInput`, `FileUpload`, `SearchInput`  
**Actions** — `Button`, `ButtonGroup`, `InlineButtons`, `ActionMenu`  
**Feedback** — `Modal`, `Snackbar`, `Alert`, `Tooltip`, `Badge`, `ProgressBar`, `Skeleton`, `StatusIndicator`  
**Display** — `Card`, `Avatar`, `Timeline`, `Stepper`, `MarkdownEditor`, `Markdown`, `CodeBlock`, `Chart`, `LogViewer`  
**Motion** — `FadeIn`, `ScaleIn`, `Stagger`, `Collapse`, `Presence`, `NumberPop`, `Confetti`  
**Typography** — `TypographyDisplay`, `TypographyTitle`, `TypographyHeadline`, `TypographyBody`, `TypographyLabel`, `TypographyAction`, `TypographyOverline`  
**Utility** — `AppRoot`, `Grid`, `Flex`, `Form`, `Image`, `Placeholder`, `InfoScreen`, `Tag`, `CopyCell`

Storybook with light/dark theme switcher and inline source panel (`</>` button).  
CSS custom properties mapped to `--tg-theme-*` Telegram tokens for automatic theming.
