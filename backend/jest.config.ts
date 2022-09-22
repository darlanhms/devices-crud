// eslint-disable-next-line import/no-extraneous-dependencies
import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: { '^.+.(ts|tsx)$': 'ts-jest' },
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['/node_modules/'],
  testRegex: '.(spec|test).(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
