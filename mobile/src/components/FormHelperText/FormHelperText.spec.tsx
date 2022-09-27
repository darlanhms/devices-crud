import { render, screen } from '@testing-library/react-native';
import theme from '../../styles/theme';
import FormHelperText from './index';

describe('Form helper text', () => {
  it('renders a text', () => {
    render(<FormHelperText>Help me!</FormHelperText>);

    const helperTextElement = screen.getByText('Help me!');

    expect(helperTextElement).toBeTruthy();
  });

  it('add error style when error prop is true', () => {
    render(<FormHelperText error>Help me!</FormHelperText>);

    const helperTextElement = screen.getByText('Help me!');

    expect(helperTextElement.props.style[2]).toMatchObject({ color: theme.colors.error });
  });
});
