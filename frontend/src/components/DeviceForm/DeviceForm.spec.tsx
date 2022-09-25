import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { SubmitDeviceData } from '../../types/device';
import DeviceForm from './index';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Device form', () => {
  it('renders all inputs', () => {
    const onSubmit = jest.fn();

    render(<DeviceForm onSubmit={onSubmit} />, { wrapper: BrowserRouter });

    const nameInput = screen.getByLabelText('Nome');
    const serialInput = screen.getByLabelText('Serial');
    const macAddressInput = screen.getByLabelText('Mac Address');
    const typeRadios = screen.getAllByRole('radio');

    expect(nameInput).toBeInTheDocument();
    expect(serialInput).toBeInTheDocument();
    expect(macAddressInput).toBeInTheDocument();
    expect(typeRadios).toHaveLength(3);
  });

  it('calls submit form if fields were correctly supplied', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<DeviceForm onSubmit={onSubmit} />, { wrapper: BrowserRouter });

    const submitData: SubmitDeviceData = {
      name: faker.name.firstName(),
      macAddress: faker.internet.mac('-'),
      serial: faker.datatype.uuid(),
      type: 'camera',
    };

    const nameInput = screen.getByLabelText('Nome');
    const serialInput = screen.getByLabelText('Serial');
    const macAddressInput = screen.getByLabelText('Mac Address');
    const cameraTypeRadio = screen.getByLabelText('Câmera');

    const submitButton = screen.getByText(/confirmar/i);

    await user.type(nameInput, submitData.name);
    await user.type(serialInput, submitData.serial);
    await user.type(macAddressInput, submitData.macAddress);
    await user.click(cameraTypeRadio);

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining(submitData), expect.anything());
  });

  it('displays error messages if mandatory fields were not informed', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<DeviceForm onSubmit={onSubmit} />, { wrapper: BrowserRouter });

    const submitButton = screen.getByText(/confirmar/i);

    await user.click(submitButton);

    await waitFor(() => screen.getByText(/Nome é obrigatório/i));

    expect(screen.getByText(/Nome é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/Serial é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/Mac address é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/Tipo é obrigatório/i)).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('set input values when initial data is supplied', () => {
    const onSubmit = jest.fn();

    const initialData: SubmitDeviceData = {
      name: faker.name.firstName(),
      macAddress: faker.internet.mac('-'),
      serial: faker.datatype.uuid(),
      type: 'camera',
    };

    render(<DeviceForm onSubmit={onSubmit} initialData={initialData} />, { wrapper: BrowserRouter });

    expect(screen.getByDisplayValue(initialData.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(initialData.macAddress)).toBeInTheDocument();
    expect(screen.getByDisplayValue(initialData.serial)).toBeInTheDocument();

    const cameraRadio = screen.getByRole('radio', { checked: true });

    expect(cameraRadio).toBeInTheDocument();
    expect(cameraRadio.closest('label')).toHaveTextContent('Câmera');
  });

  it('returns to home page when clicks on cancel button', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<DeviceForm onSubmit={onSubmit} />, { wrapper: BrowserRouter });

    const cancelButton = screen.getByText(/cancelar/i);

    await user.click(cancelButton);

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });
});
