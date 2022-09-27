import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import ActionButton from './index';

describe('Action button', () => {
  it('renders a button', () => {
    render(
      <ActionButton>
        <Text>Button text</Text>
      </ActionButton>,
    );

    const buttonEl = screen.getByTestId('action-button');

    expect(buttonEl).toBeTruthy();
  });
});
