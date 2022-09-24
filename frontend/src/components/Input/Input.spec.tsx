import { render, screen } from '@testing-library/react';
import Input from './index';

describe('Input', () => {
  it('renders input correctly', () => {
    render(<Input />);

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });

  it('applies error styling when it is set to true', () => {
    render(<Input error />);

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveClass('error');
  });
});
