import { fireEvent, render, screen } from '@testing-library/react-native';
import DeviceActionsModal from '.';

describe('Device actions modal', () => {
  it('renders actions modal', () => {
    const mockFn = jest.fn();

    render(<DeviceActionsModal onClose={mockFn} onDelete={mockFn} onEdit={mockFn} open={true} />);

    expect(screen.getByTestId('edit-button')).toBeTruthy();
    expect(screen.getByTestId('delete-button')).toBeTruthy();
    expect(screen.getByTestId('overlay-touchable')).toBeTruthy();
  });

  it('dispatch onClose function when modal overlay is pressed', () => {
    const mockFn = jest.fn();
    const onCLose = jest.fn();

    render(<DeviceActionsModal onClose={onCLose} onDelete={mockFn} onEdit={mockFn} open={true} />);

    const overlayTouchable = screen.getByTestId('overlay-touchable');

    fireEvent(overlayTouchable, 'press');

    expect(onCLose).toHaveBeenCalledTimes(1);
  });

  it('dispatch onEdit function when edit button is pressed', () => {
    const mockFn = jest.fn();
    const onEdit = jest.fn();

    render(<DeviceActionsModal onEdit={onEdit} onDelete={mockFn} onClose={mockFn} open={true} />);

    const editButton = screen.getByTestId('edit-button');

    fireEvent(editButton, 'press');

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('dispatch onDelete function when edit button is pressed', () => {
    const mockFn = jest.fn();
    const onDelete = jest.fn();

    render(<DeviceActionsModal onDelete={onDelete} onEdit={mockFn} onClose={mockFn} open={true} />);

    const deleteButton = screen.getByTestId('delete-button');

    fireEvent(deleteButton, 'press');

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
