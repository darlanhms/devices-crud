import Device from '../../entities/Device';
import IDeviceRepository from '../../repositories/IDeviceRepository';

export default class ListDevices {
  constructor(private deviceRepo: IDeviceRepository) {}

  execute(): Array<Device> {
    return this.deviceRepo.list();
  }
}
