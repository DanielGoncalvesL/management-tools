/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  $schema: './node_modules/@stryker-mutator/core/schema/stryker-schema.json',
  packageManager: 'yarn',
  mutate: [
    'src/**/*.ts',
    '!src/main/**',
  ],
  reporters: [
    'html',
    'clear-text',
    'progress',
    'dashboard',
  ],
  htmlReporter: { baseDir: 'tests/reports/stryker.html' },
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  commandRunner: { command: 'yarn test' },
  checkers: ['typescript'],
  tsconfigFile: 'tsconfig.json',
  dashboard: {
    project: 'github.com/DanielGoncalvesL/management-tools',
    version: process.env.BRANCH,
  },
};
