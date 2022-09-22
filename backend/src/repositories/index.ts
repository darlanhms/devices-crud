/* eslint-disable import/prefer-default-export */
import InMemoryDeviceRepository from './InMemory/InMemoryDeviceRepository';

/**
 * Usually a new instance is generated for each use case
 * but as we are saving data in memory, this instance will keep it stored among the application
 */
export const deviceRepo = new InMemoryDeviceRepository();
