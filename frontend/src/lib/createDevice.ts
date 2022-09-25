import Device from '../types/device';
import fetchHelper from '../utils/fetch';

export type CreateDeviceRequest = Pick<Device, 'name' | 'serial' | 'type' | 'macAddress'>;

export default function createDevice(request: CreateDeviceRequest): Promise<Device> {
  return fetchHelper.post('api/devices', request);
}
