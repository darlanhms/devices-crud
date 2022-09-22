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

describe('Update device', () => {
  beforeEach(() => {
    deviceRepo.items = [];
  });

  it('updates a device', async () => {
    const device = createDeviceStub();

    const newDevicePropsPayload = {
      name: faker.name.fullName(),
      macAddress: faker.internet.mac(),
      serial: faker.datatype.uuid(),
      type: 'sensor',
    };

    const response = await request(app).put(`/api/devices/${device.id}`).send(newDevicePropsPayload);

    const updatedDevice = deviceRepo.findById(device.id);

    expect(response.status).toBe(200);
    expect(updatedDevice).toEqual(expect.objectContaining(newDevicePropsPayload));
  });

  it('returns a not found error if device was not found', async () => {
    const newDevicePropsPayload = {
      name: faker.name.fullName(),
      macAddress: faker.internet.mac(),
      serial: faker.datatype.uuid(),
      type: 'sensor',
    };

    const response = await request(app)
      .put(`/api/devices/${faker.datatype.uuid()}`)
      .send(newDevicePropsPayload);

    expect(response.status).toBe(404);
    expect(response.body.error).toMatch(/device not found/i);
  });

  it('returns an error when a mandatory field is not sent', async () => {
    const device = createDeviceStub();

    const devicePayloadWithoutName = {
      macAddress: faker.internet.mac(),
      serial: faker.datatype.uuid(),
      type: 'camera',
    };

    const response = await request(app).put(`/api/devices/${device.id}`).send(devicePayloadWithoutName);

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/"name" is required/i);
  });

  it('returns an error if device type is incorrect', async () => {
    const device = createDeviceStub();

    const devicePayloadWithInvalidType = {
      name: faker.name.fullName(),
      macAddress: faker.internet.mac(),
      serial: faker.datatype.uuid(),
      type: 'any invalid device type',
    };

    const response = await request(app).put(`/api/devices/${device.id}`).send(devicePayloadWithInvalidType);

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/"type" must be one of/i);
  });
});
