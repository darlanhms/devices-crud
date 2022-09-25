import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '.';

describe('Modal', () => {
  it('renders modal components', () => {
    const open = true;
    const onClose = jest.fn();

    render(
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body</Modal.Body>
        <Modal.Footer>Modal footer</Modal.Footer>
      </Modal>,
    );

    const modalElement = screen.getByTestId('modal');
    const modalOverlayElement = screen.getByTestId('modal-overlay');
    const modalHeaderElement = screen.getByTestId('modal-header');
    const modalCloseButtonElement = screen.getByTestId('modal-close-button');
    const modalBodyElement = screen.getByText(/modal body/i);
    const modalTitleElement = screen.getByText(/modal title/i);
    const modalFooterElement = screen.getByText(/modal footer/i);

    expect(modalElement).toBeInTheDocument();
    expect(modalOverlayElement).toBeInTheDocument();
    expect(modalHeaderElement).toBeInTheDocument();
    expect(modalCloseButtonElement).toBeInTheDocument();
    expect(modalBodyElement).toBeInTheDocument();
    expect(modalTitleElement).toBeInTheDocument();
    expect(modalFooterElement).toBeInTheDocument();
  });

  it('calls on close fn when close button is clicked', async () => {
    const user = userEvent.setup();
    const open = true;
    const onClose = jest.fn();

    render(
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body</Modal.Body>
        <Modal.Footer>Modal footer</Modal.Footer>
      </Modal>,
    );

    const modalCloseButtonElement = screen.getByTestId('modal-close-button');

    await user.click(modalCloseButtonElement);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when open is false', () => {
    const open = false;
    const onClose = jest.fn();

    render(
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body</Modal.Body>
        <Modal.Footer>Modal footer</Modal.Footer>
      </Modal>,
    );

    const modalElement = screen.queryByTestId('modal');

    expect(modalElement).toBeFalsy();
  });
});
