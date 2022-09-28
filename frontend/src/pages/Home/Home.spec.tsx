import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import makeDeviceStub from '../../mocks/device';
import Device from '../../types/device';
import fetchHelper from '../../utils/fetch';
import Home from './index';

const devicesStub = [makeDeviceStub(), makeDeviceStub(), makeDeviceStub()];

describe('Home', () => {
  beforeEach(async () => {
    let resolveListDevices: (value: Array<Device>) => void;
    jest.spyOn(fetchHelper, 'get').mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveListDevices = resolve;
        }),
    );

    act(() => {
      render(<Home />, { wrapper: BrowserRouter });
    });

    await act(async () => {
      resolveListDevices(devicesStub);
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
    let resolveDelete: (value: string) => void;
    jest.spyOn(fetchHelper, 'delete').mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveDelete = resolve;
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
      resolveDelete('ok');
    });

    expect(screen.queryByTestId('modal')).toBeFalsy();
  });
});
