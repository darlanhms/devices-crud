import { render, screen } from '@testing-library/react';
import PageTitle from './index';

describe('Form label', () => {
  it('renders a paragraph', () => {
    const title = 'Create devices';

    render(<PageTitle>{title}</PageTitle>);

    const titleElement = screen.getByText(title);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('title');
  });
});
