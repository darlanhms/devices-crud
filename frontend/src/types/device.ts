export type DeviceType = 'camera' | 'sensor' | 'remoteControl';

export default interface Device {
  id: string;
  name: string;
  serial: string;
  macAddress: string;
  type: DeviceType;
}

export interface SubmitDeviceData {
  name: string;
  serial: string;
  macAddress: string;
  type: DeviceType;
}
