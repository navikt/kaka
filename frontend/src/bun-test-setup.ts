import { mock } from 'bun:test';

enum AppTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

mock.module('@app/app-theme', () => ({
  AppTheme,
  useAppTheme: () => AppTheme.LIGHT,
}));
