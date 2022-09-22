import Device from '../../entities/Device';
import IDeviceRepository from '../../repositories/IDeviceRepository';

export default class FindDeviceById {
  constructor(private deviceRepo: IDeviceRepository) {}

  execute(id: string): Device | null {
    return this.deviceRepo.findById(id);
  }
}
