import { render, screen } from '@testing-library/react-native';
import makeDeviceStub from '../../mocks/device';
import DeviceCard, { getTypeLabel } from './index';

describe('Device card', () => {
  it('renders a device card', () => {
    const device = makeDeviceStub();

    render(<DeviceCard device={device} />);

    expect(screen.getByText(device.name)).toBeTruthy();
    expect(screen.getByText(device.macAddress)).toBeTruthy();
    expect(screen.getByText(device.serial)).toBeTruthy();
    expect(screen.getByText(getTypeLabel(device.type))).toBeTruthy();
  });
});
