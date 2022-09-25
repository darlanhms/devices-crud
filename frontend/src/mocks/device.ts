import { faker } from '@faker-js/faker';
import Device from '../types/device';

const makeDeviceStub = (): Device => ({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  macAddress: faker.internet.mac('-'),
  serial: faker.datatype.uuid(),
  type: 'camera',
});

export default makeDeviceStub;
