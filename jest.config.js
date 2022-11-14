module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(uuid)/)'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '^core(.*)$': '<rootDir>/src/core$1',
    '^utils(.*)$': '<rootDir>/src/core/utils$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^services(.*)$': '<rootDir>/src/services$1',
  },
};
