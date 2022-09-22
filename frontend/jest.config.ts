import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transform: { '^.+.(ts|tsx)$': 'ts-jest' },
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['/node_modules/'],
  testRegex: '.(spec|test).(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
export default config;
