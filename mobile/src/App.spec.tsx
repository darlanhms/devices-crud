import { act, render, screen } from '@testing-library/react-native';
import App from './App';
import makeDeviceStub from './mocks/device';
import Device from './types/device';
import fetchHelper from './utils/fetch';

let resolveListDevices: (items: Array<Device>) => void;

describe('App', () => {
  beforeEach(() => {
    jest.spyOn(fetchHelper, 'get').mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveListDevices = resolve;
        }),
    );
  });

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
