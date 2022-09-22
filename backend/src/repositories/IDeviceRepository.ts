import Device from '../entities/Device';

export default interface IDeviceRepository {
  save(device: Device): Device;
  list(): Array<Device>;
  findById(id: string): Device | null;
  delete(id: string): boolean;
}
