import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import makeDeviceStub from '../../mocks/device';
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

    let resolveFindById: (value: string) => void;
    fetchMock.mockResponseOnce(
      () =>
        new Promise(_resolve => {
          resolveFindById = _resolve;
        }),
    );

    act(() => {
      render(<UpdateDevicePage />, { wrapper: BrowserRouter });
    });

    await act(async () => {
      resolveFindById(JSON.stringify(deviceData));
    });

    expect(screen.getByText(/editar dispositivo/i)).toBeInTheDocument();
    expect(screen.getByTestId('device-form')).toBeInTheDocument();
  });

  it('submits a update device request when form is correct', async () => {
    let resolveFindById: (value: string) => void;
    fetchMock.mockResponseOnce(
      () =>
        new Promise(_resolve => {
          resolveFindById = _resolve;
        }),
    );

    const user = userEvent.setup();

    act(() => {
      render(<UpdateDevicePage />, { wrapper: BrowserRouter });
    });

    await act(async () => {
      resolveFindById(JSON.stringify(makeDeviceStub()));
    });

    let resolveUpdate: (value: string) => void;
    fetchMock.mockResponseOnce(
      () =>
        new Promise(_resolve => {
          resolveUpdate = _resolve;
        }),
    );

    await user.type(screen.getByLabelText('Nome'), faker.name.fullName());
    await user.type(screen.getByLabelText('Mac Address'), faker.internet.mac());

    await user.click(screen.getByText(/confirmar/i));

    await act(async () => {
      resolveUpdate(JSON.stringify({ body: 'ok' }));
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });
});
