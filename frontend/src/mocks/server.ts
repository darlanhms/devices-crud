import { faker } from '@faker-js/faker';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Device from '../types/device';

const makeDeviceStub = (): Device => ({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  macAddress: faker.internet.mac('-'),
  serial: faker.datatype.uuid(),
  type: 'camera',
});

const server = setupServer(
  rest.get('/api/devices', (req, res, ctx) => {
    return res(ctx.json([makeDeviceStub(), makeDeviceStub(), makeDeviceStub()]));
  }),
  rest.get('/api/devices/:id', (req, res, ctx) => {
    return res(ctx.json(makeDeviceStub()));
  }),
  rest.post('/api/devices', (req, res, ctx) => {
    return res(ctx.json(makeDeviceStub()));
  }),
  rest.delete('/api/devices/:id', (req, res, ctx) => {
    return res(ctx.json({ deleted: true }));
  }),
  rest.put('/api/devices/:id', (req, res, ctx) => {
    return res(ctx.json(makeDeviceStub()));
  }),
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

export default server;
