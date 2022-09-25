import { render, screen } from '@testing-library/react';
import FormInput from './index';

describe('Form input', () => {
  it('renders a input', () => {
    render(<FormInput />);

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });

  it('renders a label when informed', () => {
    const labelText = 'Some field';

    render(<FormInput label={labelText} />);

    const inputElement = screen.getByRole('textbox');
    const labelElement = screen.getByText(labelText);

    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });

  it('renders a helper text when informed', () => {
    const helperText = '"Some field" is mandatory';

    render(<FormInput helperText={helperText} />);

    const inputElement = screen.getByRole('textbox');
    const helperTextElement = screen.getByText(helperText);

    expect(inputElement).toBeInTheDocument();
    expect(helperTextElement).toBeInTheDocument();
  });

  it('applies error classes when error prop is true', () => {
    const helperText = '"Some field" is mandatory';

    render(<FormInput helperText={helperText} error />);

    const inputElement = screen.getByRole('textbox');
    const helperTextElement = screen.getByText(helperText);

    expect(inputElement).toBeInTheDocument();
    expect(helperTextElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('error');
    expect(helperTextElement).toHaveClass('error');
  });
});
