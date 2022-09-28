import { faker } from '@faker-js/faker';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import { SubmitDeviceData } from '../../types/device';
import DeviceForm from './index';

describe('Device Form', () => {
  it('renders all form inputs', () => {
    const onSubmit = jest.fn();

    render(<DeviceForm onSubmit={onSubmit} />);

    expect(screen.getByLabelText('Nome')).toBeTruthy();
    expect(screen.getByLabelText('Serial')).toBeTruthy();
    expect(screen.getByLabelText('Mac address')).toBeTruthy();
    expect(screen.getByTestId('type-picker')).toBeTruthy();
    expect(screen.getByText(/confirmar/i)).toBeTruthy();
  });

  it('shows errors if submit is pressed and mandatory fields were not supplied', async () => {
    const onSubmit = jest.fn();

    render(<DeviceForm onSubmit={onSubmit} />);

    const submitButton = screen.getByText(/confirmar/i);

    fireEvent.press(submitButton);

    expect(await screen.findByText(/nome é obrigatório/i)).toBeTruthy();
    expect(screen.getByText(/serial é obrigatório/i)).toBeTruthy();
    expect(screen.getByText(/mac address é obrigatório/i)).toBeTruthy();
  });

  it('calls submit function when everything was informed', async () => {
    const onSubmit = jest.fn();

    const submitData: SubmitDeviceData = {
      name: faker.name.fullName(),
      serial: faker.datatype.uuid(),
      macAddress: faker.internet.mac('-'),
      type: 'camera',
    };

    render(<DeviceForm onSubmit={onSubmit} />);

    const submitButton = screen.getByText(/confirmar/i);

    fireEvent.changeText(screen.getByLabelText('Nome'), submitData.name);
    fireEvent.changeText(screen.getByLabelText('Serial'), submitData.serial);

    fireEvent.changeText(screen.getByLabelText('Mac address'), submitData.macAddress);

    await act(() => {
      fireEvent.press(submitButton);
    });

    expect(onSubmit).toHaveBeenCalledWith(submitData, undefined);
  });
});
