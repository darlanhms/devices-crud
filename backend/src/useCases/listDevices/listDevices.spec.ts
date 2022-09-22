import { faker } from '@faker-js/faker';
import request from 'supertest';
import app from '../../infra/http/app';
import { deviceRepo } from '../../repositories';
import CreateDevice from '../createDevice/createDevice';

function createDeviceStub() {
  const createDevice = new CreateDevice(deviceRepo);

  createDevice.execute({
    name: faker.name.fullName(),
    macAddress: faker.internet.mac(),
    serial: faker.datatype.uuid(),
    type: 'camera',
  });
}

describe('List devices', () => {
  beforeEach(() => {
    deviceRepo.items = [];
  });

  it('lists devices', async () => {
    createDeviceStub();
    createDeviceStub();
    createDeviceStub();

    const response = await request(app).get('/api/devices').send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body).toEqual(deviceRepo.items);
  });
});
