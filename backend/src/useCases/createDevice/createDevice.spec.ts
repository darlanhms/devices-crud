import request from 'supertest';
import { faker } from '@faker-js/faker';
import { deviceRepo } from '../../repositories';
import app from '../../infra/http/app';

describe('Create device', () => {
  beforeEach(() => {
    deviceRepo.items = [];
  });

  it('creates a new device', async () => {
    const devicePayload = {
      name: 'Camera Device',
      macAddress: faker.internet.mac(),
      serial: faker.datatype.uuid(),
      type: 'camera',
    };

    const response = await request(app).post('/api/devices').send(devicePayload);

    expect(response.status).toBe(200);
    expect(deviceRepo.items).toHaveLength(1);
    expect(deviceRepo.items[0]).toEqual(expect.objectContaining(devicePayload));
  });

  it('returns an error when a mandatory field is not sent', async () => {
    const devicePayloadWithoutName = {
      macAddress: faker.internet.mac(),
      serial: faker.datatype.uuid(),
      type: 'camera',
    };

    const response = await request(app).post('/api/devices').send(devicePayloadWithoutName);

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/"name" is required/i);
  });

  it('returns an error if device type is incorrect', async () => {
    const devicePayloadWithInvalidType = {
      name: 'Camera Device',
      macAddress: faker.internet.mac(),
      serial: faker.datatype.uuid(),
      type: 'any invalid device type',
    };

    const response = await request(app).post('/api/devices').send(devicePayloadWithInvalidType);

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/"type" must be one of/i);
  });
});
