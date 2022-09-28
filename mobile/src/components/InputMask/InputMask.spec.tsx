import { fireEvent, render, screen } from '@testing-library/react-native';
import InputMask from './index';

describe('Input mask', () => {
  it('renders input mask', () => {
    render(<InputMask format="(##) ####-####" />);

    const inputElement = screen.getByTestId('input-mask');

    expect(inputElement).toBeTruthy();
  });

  it('shows correct display value based on mask', () => {
    render(<InputMask format="(##) ####-####" />);

    const inputElement = screen.getByTestId('input-mask');

    fireEvent.changeText(inputElement, '4899570');

    expect(screen.getByDisplayValue('(48) 9957-0'));
  });
});
