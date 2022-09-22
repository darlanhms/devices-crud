import Device from '../../entities/Device';
import IDeviceRepository from '../../repositories/IDeviceRepository';

export type CreateDeviceRequest = Pick<Device, 'name' | 'serial' | 'macAddress' | 'type'>;

export default class CreateDevice {
  constructor(private deviceRepo: IDeviceRepository) {}

  execute(request: CreateDeviceRequest): Device {
    const device = new Device({
      name: request.name,
      serial: request.serial,
      macAddress: request.macAddress,
      type: request.type,
    });

    return this.deviceRepo.save(device);
  }
}
