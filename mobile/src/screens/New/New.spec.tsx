import { faker } from '@faker-js/faker';
import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import Router from '../../components/Router';
import { SubmitDeviceData } from '../../types/device';
import fetchHelper from '../../utils/fetch';

describe('New device', () => {
  it('renders form', () => {
    render(
      <NavigationContainer>
        <Router initialRouteName="NewDevice" />
      </NavigationContainer>,
    );

    expect(screen.getByTestId('device-form')).toBeTruthy();
  });

  it('calls device creation when form is submitted', async () => {
    const createFn = jest.spyOn(fetchHelper, 'post');
    let resolveCreate: (value: string) => void;

    createFn.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveCreate = resolve;
        }),
    );

    const submitData: SubmitDeviceData = {
      name: faker.name.fullName(),
      serial: faker.datatype.uuid(),
      macAddress: faker.internet.mac('-'),
      type: 'camera',
    };

    render(
      <NavigationContainer>
        <Router initialRouteName="NewDevice" />
      </NavigationContainer>,
    );

    const submitButton = screen.getByText(/confirmar/i);

    fireEvent.changeText(screen.getByLabelText('Nome'), submitData.name);
    fireEvent.changeText(screen.getByLabelText('Serial'), submitData.serial);
    fireEvent.changeText(screen.getByLabelText('Mac address'), submitData.macAddress);

    await act(() => {
      fireEvent.press(submitButton);
    });

    expect(createFn).toBeCalledTimes(1);

    await act(async () => {
      resolveCreate('ok');
    });
  });
});
