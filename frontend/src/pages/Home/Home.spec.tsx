import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import makeDeviceStub from '../../mocks/device';
import Home from './index';

const devicesStub = [makeDeviceStub(), makeDeviceStub(), makeDeviceStub()];

describe('Home', () => {
  beforeEach(async () => {
    let resolve: (value: string) => void;
    fetchMock.mockResponseOnce(
      () =>
        new Promise(_resolve => {
          resolve = _resolve;
        }),
    );

    act(() => {
      render(<Home />, { wrapper: BrowserRouter });
    });

    await act(async () => {
      resolve(JSON.stringify(devicesStub));
    });
  });

  it('displays a table with all devices', async () => {
    const tableRowsElements = await screen.findAllByTestId('table-row');

    // 1 for table head and 3 for table body rows
    expect(tableRowsElements).toHaveLength(4);
  });

  it('selects a device when clicked', async () => {
    const user = userEvent.setup();

    const tableCell = await screen.findByText(devicesStub[0].name);
    const tableRow = tableCell.closest('tr');

    expect(tableCell).toBeTruthy();
    expect(tableRow).toBeTruthy();

    await user.click(tableRow as HTMLTableRowElement);

    expect(tableRow).toHaveClass('selected');
  });

  it('unselects a device when already selected', async () => {
    const user = userEvent.setup();

    const tableCell = await screen.findByText(devicesStub[0].name);
    const tableRow = tableCell.closest('tr');

    expect(tableCell).toBeTruthy();
    expect(tableRow).toBeTruthy();

    await user.click(tableRow as HTMLTableRowElement);
    await user.click(tableRow as HTMLTableRowElement);

    expect(tableRow).not.toHaveClass('selected');
  });

  it('displays a delete modal when delete button is clicked and a device is selected', async () => {
    const user = userEvent.setup();

    const tableCell = await screen.findByText(devicesStub[0].name);
    const tableRow = tableCell.closest('tr');
    const deleteButton = screen.getByText(/excluir/i);

    await user.click(tableRow as HTMLTableRowElement);
    await user.click(deleteButton);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('hides delete modal when user clicks on cancel button', async () => {
    const user = userEvent.setup();

    const tableCell = await screen.findByText(devicesStub[0].name);
    const tableRow = tableCell.closest('tr');
    const deleteButton = screen.getByText(/excluir/i);

    await user.click(tableRow as HTMLTableRowElement);
    await user.click(deleteButton);

    const cancelButton = screen.getByText(/cancelar/i);

    await user.click(cancelButton);

    expect(screen.queryByTestId('modal')).toBeFalsy();
  });

  it('hides delete modal when user confirms action and request is processed', async () => {
    let resolve: (value: string) => void;
    fetchMock.mockResponseOnce(
      () =>
        new Promise(_resolve => {
          resolve = _resolve;
        }),
    );

    const user = userEvent.setup();

    const tableCell = await screen.findByText(devicesStub[0].name);
    const tableRow = tableCell.closest('tr');
    const deleteButton = screen.getByText(/excluir/i);

    await user.click(tableRow as HTMLTableRowElement);
    await user.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirmar/i });

    await user.click(confirmButton);

    await act(async () => {
      resolve(JSON.stringify({ body: 'ok' }));
    });

    expect(screen.queryByTestId('modal')).toBeFalsy();
  });
});
