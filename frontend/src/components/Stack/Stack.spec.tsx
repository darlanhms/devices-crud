import { render, screen } from '@testing-library/react';
import Stack from '.';

describe('Stack', () => {
  it('renders correctly with row props as default', () => {
    render(
      <Stack>
        <div />
        <div />
        <div />
      </Stack>,
    );

    const stackElement = screen.getByTestId('stack');

    expect(stackElement).toBeInTheDocument();
    expect(stackElement.childNodes).toHaveLength(3);
    expect(stackElement).toHaveClass('row');
  });

  it('adds column classes when prop is specified', () => {
    render(
      <Stack direction="column">
        <div />
        <div />
        <div />
      </Stack>,
    );

    const stackElement = screen.getByTestId('stack');

    expect(stackElement).toBeInTheDocument();
    expect(stackElement.childNodes).toHaveLength(3);
    expect(stackElement).toHaveClass('column');
  });
});
