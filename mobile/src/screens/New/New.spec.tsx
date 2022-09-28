import { faker } from '@faker-js/faker';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import NewDeviceScreen from '.';
import { SubmitDeviceData } from '../../types/device';
import fetchHelper from '../../utils/fetch';
import { createNavigationTestProps } from '../../utils/tests';

describe('New device', () => {
  it('renders form', () => {
    render(<NewDeviceScreen {...createNavigationTestProps()} />);

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

    render(<NewDeviceScreen {...createNavigationTestProps()} />);

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
