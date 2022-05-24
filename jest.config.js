module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts',
  ],
  coverageDirectory: 'tests/coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1',
  },
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests',
  ],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  clearMocks: true,
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig'],
  // setupFiles: ['dotenv/config', './jest.ioredis.mock.js']
};
