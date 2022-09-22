import Device from '../../entities/Device';
import NotFoundError from '../../errors/NotFoundError';
import IDeviceRepository from '../../repositories/IDeviceRepository';

export type UpdateDeviceRequest = Pick<Device, 'id' | 'name' | 'serial' | 'macAddress' | 'type'>;

export default class UpdateDevice {
  constructor(private deviceRepo: IDeviceRepository) {}

  execute(request: UpdateDeviceRequest): Device {
    const alreadyRegisteredDevice = this.deviceRepo.findById(request.id);

    if (!alreadyRegisteredDevice) {
      throw new NotFoundError('Device not found');
    }

    const updatedDevice = new Device(
      {
        ...alreadyRegisteredDevice,
        ...request,
      },
      alreadyRegisteredDevice.id,
    );

    this.deviceRepo.save(updatedDevice);

    return updatedDevice;
  }
}
