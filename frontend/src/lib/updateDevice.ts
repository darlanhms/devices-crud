import { SubmitDeviceData } from '../types/device';
import fetchHelper from '../utils/fetch';

interface UpdateDeviceRequest extends SubmitDeviceData {
  id: string;
}

export default async function updateDevice({ id, ...data }: UpdateDeviceRequest): Promise<void> {
  await fetchHelper.put(`api/devices/${id}`, data);
}
