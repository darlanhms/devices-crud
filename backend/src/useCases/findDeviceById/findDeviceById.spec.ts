import { faker } from '@faker-js/faker';
import request from 'supertest';
import Device from '../../entities/Device';
import app from '../../infra/http/app';
import { deviceRepo } from '../../repositories';
import CreateDevice from '../createDevice/createDevice';

function createDeviceStub(): Device {
  const createDevice = new CreateDevice(deviceRepo);

  return createDevice.execute({
    name: faker.name.fullName(),
    macAddress: faker.internet.mac(),
    serial: faker.datatype.uuid(),
    type: 'camera',
  });
}

describe('Find device by id', () => {
  beforeEach(() => {
    deviceRepo.items = [];
  });

  it('finds device by id', async () => {
    const device = createDeviceStub();

    const response = await request(app).get(`/api/devices/${device.id}`).send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(device);
  });

  it('returns a not found error if device was not found', async () => {
    const response = await request(app).get(`/api/devices/${faker.datatype.uuid()}`).send();

    expect(response.status).toBe(404);
  });
});
