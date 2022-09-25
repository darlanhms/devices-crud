import Device from '../types/device';
import fetchHelper from '../utils/fetch';

export default function findDeviceById(id: string): Promise<Device | undefined> {
  return fetchHelper.get<Device | undefined>(`api/devices/${id}`);
}
