import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import makeDeviceStub from '../../mocks/device';
import Device from '../../types/device';
import fetchHelper from '../../utils/fetch';
import UpdateDevicePage from './index';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => ({ deviceId: '1234' }),
}));

describe('Update device page', () => {
  it('renders a title and device form', async () => {
    const deviceData = makeDeviceStub();

    let resolveFindById: (value: Device) => void;
    jest.spyOn(fetchHelper, 'get').mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveFindById = resolve;
        }),
    );

    act(() => {
      render(<UpdateDevicePage />, { wrapper: BrowserRouter });
    });

    await act(async () => {
      resolveFindById(deviceData);
    });

    expect(screen.getByText(/editar dispositivo/i)).toBeInTheDocument();
    expect(screen.getByTestId('device-form')).toBeInTheDocument();
  });

  it('submits a update device request when form is correct', async () => {
    let resolveFindById: (value: Device) => void;
    jest.spyOn(fetchHelper, 'get').mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveFindById = resolve;
        }),
    );

    let resolveUpdate: (value: string) => void;
    jest.spyOn(fetchHelper, 'put').mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveUpdate = resolve;
        }),
    );

    const user = userEvent.setup();

    act(() => {
      render(<UpdateDevicePage />, { wrapper: BrowserRouter });
    });

    await act(async () => {
      resolveFindById(makeDeviceStub());
    });

    await user.type(screen.getByLabelText('Nome'), faker.name.fullName());
    await user.type(screen.getByLabelText('Mac Address'), faker.internet.mac());

    await user.click(screen.getByText(/confirmar/i));

    await act(async () => {
      resolveUpdate('ok');
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });
});
