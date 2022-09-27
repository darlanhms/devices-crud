import { act, render, screen } from '@testing-library/react-native';
import App from './App';
import makeDeviceStub from './mocks/device';
import Device from './types/device';

let resolveListDevices: (items: Array<Device>) => void;

jest.mock('./lib/listDevices', () => {
  return {
    __esModule: true,
    default: () =>
      new Promise(resolve => {
        resolveListDevices = resolve;
      }),
  };
});

describe('App', () => {
  it('renders correctly', async () => {
    render(<App />);

    await act(async () => {
      resolveListDevices([]);
    });
  });

  it('renders home page by default', async () => {
    render(<App />);
    const device = makeDeviceStub();

    await act(async () => {
      resolveListDevices([device]);
    });

    expect(screen.getByText(device.name)).toBeTruthy();
  });
});
