import IDeviceRepository from '../../repositories/IDeviceRepository';

export default class DeleteDevice {
  constructor(private deviceRepo: IDeviceRepository) {}

  execute(id: string): boolean {
    return this.deviceRepo.delete(id);
  }
}
