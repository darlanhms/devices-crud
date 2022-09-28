import { faker } from '@faker-js/faker';
import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import UpdateDeviceScreen from '.';
import makeDeviceStub from '../../mocks/device';
import { SubmitDeviceData } from '../../types/device';
import fetchHelper from '../../utils/fetch';
import { createNavigationTestProps } from '../../utils/tests';

describe('Update device', () => {
  it('renders form', () => {
    render(
      <UpdateDeviceScreen
        {...createNavigationTestProps({
          route: {
            params: {
              device: makeDeviceStub(),
            },
          },
        })}
      />,
    );

    expect(screen.getByTestId('device-form')).toBeTruthy();
  });

  it('calls device creation when form is submitted', async () => {
    const createFn = jest.spyOn(fetchHelper, 'put');
    const goBackFn = jest.fn();
    let resolveUpdate: (value: string) => void;

    createFn.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveUpdate = resolve;
        }),
    );

    const submitData: SubmitDeviceData = {
      name: faker.name.fullName(),
      serial: faker.datatype.uuid(),
      macAddress: faker.internet.mac('-'),
      type: 'camera',
    };

    render(
      <UpdateDeviceScreen
        {...createNavigationTestProps({
          navigation: {
            goBack: goBackFn,
          },
          route: {
            params: {
              device: makeDeviceStub(),
            },
          },
        })}
      />,
    );

    const submitButton = screen.getByText(/confirmar/i);

    fireEvent.changeText(screen.getByLabelText('Nome'), submitData.name);
    fireEvent.changeText(screen.getByLabelText('Serial'), submitData.serial);
    fireEvent.changeText(screen.getByLabelText('Mac address'), submitData.macAddress);

    await act(() => {
      fireEvent.press(submitButton);
    });

    await act(async () => {
      resolveUpdate('ok');
    });

    expect(createFn).toBeCalledTimes(1);
    expect(goBackFn).toBeCalledTimes(1);
  });
});
