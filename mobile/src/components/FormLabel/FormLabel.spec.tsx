import { render, screen } from '@testing-library/react-native';
import FormLabel from './index';

describe('Form label', () => {
  it('renders a text as label', () => {
    render(<FormLabel>Label text</FormLabel>);

    const labelElement = screen.getByText(/label text/i);

    expect(labelElement).toBeTruthy();
  });
});
