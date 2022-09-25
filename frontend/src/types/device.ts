export type DeviceType = 'camera' | 'sensor' | 'remoteControl';

export default interface Device {
  name: string;
  serial: string;
  macAddress: string;
  type: DeviceType;
}
