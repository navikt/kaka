import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['index.css'],
  project: ['src/**'],
  bun: {
    entry: ['**/*.test.{ts,tsx}'],
  },
};

export default config;
