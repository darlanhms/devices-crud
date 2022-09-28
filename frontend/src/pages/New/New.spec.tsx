import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import fetchHelper from '../../utils/fetch';
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
    let resolveCreate: (value: string) => void;
    jest.spyOn(fetchHelper, 'post').mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveCreate = resolve;
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
      resolveCreate('ok');
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });
});
