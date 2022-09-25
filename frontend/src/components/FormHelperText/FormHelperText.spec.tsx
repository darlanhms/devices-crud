import { render, screen } from '@testing-library/react';
import FormHelperText from './index';

describe('Form helper text', () => {
  it('renders a paragraph', () => {
    const text = '"Something" is a mandatory field';

    render(<FormHelperText>{text}</FormHelperText>);

    const helperTextElement = screen.getByText(text);

    expect(helperTextElement).toBeInTheDocument();
    expect(helperTextElement).toHaveClass('helperText');
  });

  it('applies error class when error prop is true', () => {
    const text = '"Something" is a mandatory field';

    render(<FormHelperText error>{text}</FormHelperText>);

    const helperTextElement = screen.getByText(text);

    expect(helperTextElement).toHaveClass('error');
  });
});
