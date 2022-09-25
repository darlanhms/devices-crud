import fetchHelper from '../utils/fetch';

export default async function deleteDevice(id: string): Promise<void> {
  await fetchHelper.delete(`/api/devices/${id}`);
}
