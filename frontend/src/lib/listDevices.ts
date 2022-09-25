import Device from '../types/device';
import fetchHelper from '../utils/fetch';

export default function listDevices(): Promise<Array<Device>> {
  return fetchHelper.get<Array<Device>>('api/devices');
}
