import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

export default {
  ...createCjsPreset(),
  displayName: 'admin',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  coverageDirectory: '../../coverage/apps/admin',
  coverageThreshold: {
    global: {
      lines: 70,
    },
  },
} satisfies Config;
