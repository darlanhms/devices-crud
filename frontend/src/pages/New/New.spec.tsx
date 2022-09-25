import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import NewDevicePage from './index';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('New device page', () => {
  it('renders a title and device form', () => {
    render(<NewDevicePage />, { wrapper: BrowserRouter });

    expect(screen.getByText(/novo dispositivo/i)).toBeInTheDocument();
    expect(screen.getByTestId('device-form')).toBeInTheDocument();
  });

  it('submits a new device request when form is correct', async () => {
    let resolve: (value: string) => void;
    fetchMock.mockResponseOnce(
      () =>
        new Promise(_resolve => {
          resolve = _resolve;
        }),
    );

    const user = userEvent.setup();

    render(<NewDevicePage />, { wrapper: BrowserRouter });

    await user.type(screen.getByLabelText('Nome'), faker.name.fullName());
    await user.type(screen.getByLabelText('Serial'), faker.datatype.uuid());
    await user.type(screen.getByLabelText('Mac Address'), faker.internet.mac());
    await user.click(screen.getByLabelText('Câmera'));

    await user.click(screen.getByText(/confirmar/i));

    await act(async () => {
      resolve(JSON.stringify({ body: 'ok' }));
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });
});
