import { v4 as uuid } from 'uuid';

export type DeviceType = 'camera' | 'sensor' | 'remoteControl';

export default class Device {
  readonly id: string;

  name: string;

  serial: string;

  macAddress: string;

  type: DeviceType;

  constructor(props: Pick<Device, 'name' | 'serial' | 'macAddress' | 'type'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
