/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.spec.ts'],
  collectCoverage: true,
  moduleNameMapper: {
    '^@challenge/(.*)$': ['<rootDir>/src/$1'],
  },
};
