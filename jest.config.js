module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  // testEnvironment: 'node', // puedes comentarlo o poner 'jsdom'
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx|js)'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|react-clone-referenced-element' +
      '|@react-navigation' +
      ')/)',
  ],
  moduleNameMapper: {
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@theme$': '<rootDir>/src/theme',
    '^@env$': '<rootDir>/src/shared/types/env',
    '^@stores/(.*)$': '<rootDir>/src/stores/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
};
