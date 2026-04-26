import path from 'path';
import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: [
    '../src/stories/**/*.stories.@(ts|tsx)',
    '../src/components/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal(cfg) {
    cfg.plugins = cfg.plugins ?? [];
    cfg.plugins.push(tsconfigPaths());
    return cfg;
  },
};

export default config;
