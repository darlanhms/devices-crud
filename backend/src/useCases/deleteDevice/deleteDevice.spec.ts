import { faker } from '@faker-js/faker';
import request from 'supertest';
import Device from '../../entities/Device';
import { deviceRepo } from '../../repositories';
import CreateDevice from '../createDevice/createDevice';
import app from '../../infra/http/app';

function createDeviceStub(): Device {
  const createDevice = new CreateDevice(deviceRepo);

  return createDevice.execute({
    name: faker.name.fullName(),
    macAddress: faker.internet.mac(),
    serial: faker.datatype.uuid(),
    type: 'camera',
  });
}

describe('Delete device', () => {
  beforeEach(() => {
    deviceRepo.items = [];
  });

  it('deletes a device', async () => {
    const device = createDeviceStub();

    const response = await request(app).delete(`/api/devices/${device.id}`).send();

    expect(response.status).toBe(200);
    expect(response.body.deleted).toBeTruthy();
  });
});
