import { render, screen } from '@testing-library/react';
import FormLabel from './index';

describe('Form label', () => {
  it('renders a paragraph', () => {
    const labelText = 'Some field';

    render(<FormLabel>{labelText}</FormLabel>);

    const labelElement = screen.getByText(labelText);

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('label');
  });
});
