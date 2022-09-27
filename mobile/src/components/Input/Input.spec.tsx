import { render, screen } from '@testing-library/react-native';
import theme from '../../styles/theme';
import Input from './index';

describe('Input', () => {
  it('renders an input', () => {
    render(<Input />);

    const inputEl = screen.getByTestId('input');

    expect(inputEl).toBeTruthy();
    expect(inputEl.type).toBe('TextInput');
  });

  it('adds error styles when error prop is true', () => {
    render(<Input error />);

    const input = screen.getByTestId('input');

    expect(input.props.style[2]).toMatchObject({ borderColor: theme.colors.error });
  });
});
