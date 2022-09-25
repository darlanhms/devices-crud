import Device, { SubmitDeviceData } from '../types/device';
import fetchHelper from '../utils/fetch';

export default function createDevice(request: SubmitDeviceData): Promise<Device> {
  return fetchHelper.post('api/devices', request);
}
