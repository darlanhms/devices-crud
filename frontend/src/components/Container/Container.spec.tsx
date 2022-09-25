import { render, screen } from '@testing-library/react';
import Container from './index';

describe('Container', () => {
  it('renders a div', () => {
    render(<Container />);

    const containerElement = screen.getByTestId('container');

    expect(containerElement).toBeInTheDocument();
    expect(containerElement).toHaveClass('container');
  });
});
