import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

export default {
  ...createCjsPreset(),
  displayName: 'portfolio-public',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  coverageDirectory: '../../coverage/apps/portfolio-public',
  coverageThreshold: {
    global: {
      lines: 70,
    },
  },
} satisfies Config;
