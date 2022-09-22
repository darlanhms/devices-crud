import { render, screen } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Simple button</Button>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeInTheDocument();
  });

  it('applies error variant classes', () => {
    render(<Button variant="error">Simple button</Button>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveClass('error');
  });

  it('applies success variant classes', () => {
    render(<Button variant="success">Simple button</Button>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveClass('success');
  });
});
