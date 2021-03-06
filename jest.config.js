module.exports = {
  setupFiles: [],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  testRegex: '.*\\.test\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
  moduleDirectories: ['src', 'node_modules'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    window: {},
  },
};
