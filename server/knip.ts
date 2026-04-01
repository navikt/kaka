import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  project: ['src/**'],
  bun: {
    entry: ['**/*.test.{ts,tsx}'],
  },
};

export default config;
