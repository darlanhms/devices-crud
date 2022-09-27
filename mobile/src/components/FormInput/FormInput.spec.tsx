import { render, screen } from '@testing-library/react-native';
import theme from '../../styles/theme';
import FormInput from './index';

describe('Form Input', () => {
  it('renders form input', () => {
    const labelText = 'Input label';
    const helperText = 'Input helper text';

    render(<FormInput label={labelText} helperText={helperText} />);

    expect(screen.getByTestId('input')).toBeTruthy();
    expect(screen.getByText(labelText)).toBeTruthy();
    expect(screen.getByText(helperText)).toBeTruthy();
  });

  it('renders form input', () => {
    const labelText = 'Input label';
    const helperText = 'Input helper text';

    render(<FormInput label={labelText} helperText={helperText} error />);

    const inputElement = screen.getByTestId('input');
    const helperTextElement = screen.getByText(helperText);

    expect(inputElement.props.style[2]).toMatchObject({ borderColor: theme.colors.error });
    expect(helperTextElement.props.style[2]).toMatchObject({ color: theme.colors.error });
  });
});
