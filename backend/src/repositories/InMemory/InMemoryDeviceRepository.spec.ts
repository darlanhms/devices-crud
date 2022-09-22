import { faker } from '@faker-js/faker';
import Device from '../../entities/Device';
import InMemoryDeviceRepository from './InMemoryDeviceRepository';

describe('In memory device repository', () => {
  it('saves new devices', () => {
    const deviceRepo = new InMemoryDeviceRepository();

    const device = new Device({
      name: 'Camera - 01',
      serial: faker.datatype.uuid(),
      macAddress: faker.internet.mac(),
      type: 'camera',
    });

    deviceRepo.save(device);

    expect(deviceRepo.items).toHaveLength(1);
  });

  it('updates device if already exists', () => {
    const deviceRepo = new InMemoryDeviceRepository();

    const device = new Device({
      name: 'Camera - 01',
      serial: faker.datatype.uuid(),
      macAddress: faker.internet.mac(),
      type: 'camera',
    });

    deviceRepo.save(device);

    // create a new device to avoid same reference
    const updatedDevice = new Device(
      {
        ...device,
        name: 'Camera - 02',
      },
      device.id,
    );

    deviceRepo.save(updatedDevice);

    expect(deviceRepo.items).toHaveLength(1);
    expect(deviceRepo.items[0]).toEqual(updatedDevice);
  });

  it('lists devices', () => {
    const deviceRepo = new InMemoryDeviceRepository();

    const camera = new Device({
      name: 'Camera',
      serial: faker.datatype.uuid(),
      macAddress: faker.internet.mac(),
      type: 'camera',
    });

    const sensor = new Device({
      name: 'Sensor',
      serial: faker.datatype.uuid(),
      macAddress: faker.internet.mac(),
      type: 'sensor',
    });

    const remoteControl = new Device({
      name: 'Remote Control',
      serial: faker.datatype.uuid(),
      macAddress: faker.internet.mac(),
      type: 'remoteControl',
    });

    deviceRepo.save(camera);
    deviceRepo.save(sensor);
    deviceRepo.save(remoteControl);

    const devices = deviceRepo.list();

    expect(devices).toHaveLength(3);
    expect(devices).toEqual([camera, sensor, remoteControl]);
  });

  it('finds device by id', () => {
    const deviceRepo = new InMemoryDeviceRepository();

    const device = new Device({
      name: 'Camera - 01',
      serial: faker.datatype.uuid(),
      macAddress: faker.internet.mac(),
      type: 'camera',
    });

    deviceRepo.save(device);

    const foundDevice = deviceRepo.findById(device.id);

    expect(foundDevice).toBeTruthy();
    expect(foundDevice).toEqual(device);
  });

  it('deletes a device', () => {
    const deviceRepo = new InMemoryDeviceRepository();

    const device = new Device({
      name: 'Camera - 01',
      serial: faker.datatype.uuid(),
      macAddress: faker.internet.mac(),
      type: 'camera',
    });

    deviceRepo.save(device);

    const deleted = deviceRepo.delete(device.id);

    expect(deviceRepo.items).toHaveLength(0);
    expect(deleted).toBeTruthy();
  });
});
