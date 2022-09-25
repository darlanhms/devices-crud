import { render, screen } from '@testing-library/react';
import FormControl from './index';

describe('Form control', () => {
  it('renders a div', () => {
    render(<FormControl />);

    const formControlElement = screen.getByTestId('formControl');

    expect(formControlElement).toBeInTheDocument();
    expect(formControlElement).toHaveClass('formControl');
  });
});
