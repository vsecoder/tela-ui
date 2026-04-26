import { defineConfig } from 'tsup';

export default defineConfig({
  entry:  ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts:    true,           // emit .d.ts declaration files
  clean:  true,
  external: [
    'react',
    'react-dom',
    'motion',
    'motion/react',
  ],
  // CSS is bundled separately — consumers must import 'dist/ui.css'
  esbuildOptions(opts) {
    opts.banner = { js: '"use client";' };
  },
});
