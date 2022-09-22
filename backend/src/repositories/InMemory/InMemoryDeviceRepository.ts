import Device from '../../entities/Device';
import IDeviceRepository from '../IDeviceRepository';
import BaseInMemoryRepository from './InMemoryRepository';

export default class InMemoryDeviceRepository
  extends BaseInMemoryRepository<Device>
  implements IDeviceRepository
{
  compare(a: Device, b: Device): boolean {
    return a.id === b.id;
  }

  save(entity: Device): Device {
    super.save(entity);

    return entity;
  }

  list(): Device[] {
    return this.items;
  }

  findById(id: string): Device | null {
    const device = this.items.find(item => item.id === id);

    return device || null;
  }

  delete(id: string): boolean {
    const oldItems = this.items;

    this.items = this.items.filter(item => item.id !== id);

    return oldItems.length !== this.items.length;
  }
}
