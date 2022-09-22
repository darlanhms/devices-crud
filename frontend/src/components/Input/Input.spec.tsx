import { render, screen } from '@testing-library/react';
import Input from './index';

describe('Input', () => {
  it('renders input correctly', () => {
    render(<Input />);

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });

  it('renders a label when it is informed', () => {
    const labelText = 'Name:';

    render(<Input label={labelText} />);

    const inputElement = screen.getByRole('textbox');
    const labelElement = screen.getByText(labelText);

    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });

  it('renders a helper text when it is informed', () => {
    const helperText = 'Name is a mandatory field';

    render(<Input helperText={helperText} />);

    const inputElement = screen.getByRole('textbox');
    const helperTextElement = screen.getByText(helperText);

    expect(inputElement).toBeInTheDocument();
    expect(helperTextElement).toBeInTheDocument();
  });

  it('applies error styling when it is set to true', () => {
    const helperText = 'Name is a mandatory field';

    render(<Input error helperText={helperText} />);

    const inputElement = screen.getByRole('textbox');
    const helperTextElement = screen.getByText(helperText);

    expect(inputElement).toHaveStyle('border-color: var(--error-color)');
    expect(helperTextElement).toHaveStyle('color: var(--error-color)');
  });
});
