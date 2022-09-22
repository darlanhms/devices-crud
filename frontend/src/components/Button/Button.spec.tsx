import { render, screen } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Simple button</Button>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeInTheDocument();
  });

  it('applies default styling when a variant is not supplied', () => {
    render(<Button>Simple button</Button>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveStyle('background: var(--primary-color)');
  });

  it('applies error variant styles', () => {
    render(<Button variant="error">Simple button</Button>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveStyle('background: var(--error-color)');
  });

  it('applies success variant styles', () => {
    render(<Button variant="success">Simple button</Button>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveStyle('background: var(--success-color)');
  });
});
