import {Config} from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleDirectories: ['node_modules'],
};

export default config;
