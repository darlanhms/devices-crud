import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { act } from 'react-test-renderer';
import Router from '../../components/Router';
import makeDeviceStub from '../../mocks/device';
import Device from '../../types/device';
import fetchHelper from '../../utils/fetch';

let resolveListDevices: (items: Array<Device>) => void;

describe('Home', () => {
  beforeEach(() => {
    jest.spyOn(fetchHelper, 'get').mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveListDevices = resolve;
        }),
    );
  });

  it('renders a flat list with devices', async () => {
    render(
      <NavigationContainer>
        <Router initialRouteName="Home" />
      </NavigationContainer>,
    );

    await act(async () => {
      resolveListDevices([makeDeviceStub(), makeDeviceStub()]);
    });

    expect(screen.getByTestId('devices-list')).toBeTruthy();
    expect(screen.getAllByTestId('device-item')).toHaveLength(2);
  });

  it('shows device actions modal when a device item is pressed', async () => {
    render(
      <NavigationContainer>
        <Router initialRouteName="Home" />
      </NavigationContainer>,
    );

    await act(async () => {
      resolveListDevices([makeDeviceStub()]);
    });

    fireEvent.press(screen.getByTestId('device-item'));

    expect(screen.getByTestId('device-actions-modal')).toBeTruthy();
  });

  it('calls alert fn when delete confirmation is pressed', async () => {
    const alertFn = jest.spyOn(Alert, 'alert');

    render(
      <NavigationContainer>
        <Router initialRouteName="Home" />
      </NavigationContainer>,
    );

    await act(async () => {
      resolveListDevices([makeDeviceStub()]);
    });

    fireEvent.press(screen.getByTestId('device-item'));
    fireEvent.press(screen.getByText(/excluir/i));

    expect(alertFn).toHaveBeenCalledTimes(1);
  });
});
