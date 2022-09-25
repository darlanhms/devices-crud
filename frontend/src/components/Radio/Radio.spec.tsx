import { render, screen } from '@testing-library/react';
import Radio from './index';

describe('Radio', () => {
  it('renders a radio input', () => {
    render(<Radio />);

    const radioElement = screen.getByRole('radio');

    expect(radioElement).toBeInTheDocument();
  });

  it('renders a label when informed', () => {
    const labelText = 'Camera';

    render(<Radio label={labelText} />);

    const radioElement = screen.getByRole('radio');
    const labelElement = screen.getByText(labelText);

    expect(radioElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });
});
