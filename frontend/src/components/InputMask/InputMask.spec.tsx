import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputMask from '.';
import { replaceFormatChars } from '../../utils/mask';

const format = '(##) ####-####';

// Next 2 variables are just to avoid possible default chars changes in the future
const formatChar = '#';
const maskChar = '_';

const finalMask = replaceFormatChars(format, formatChar, maskChar);

describe('Input mask', () => {
  it('applies mask when input is focused and value is empty', async () => {
    const user = userEvent.setup();

    render(<InputMask format={format} formatChar={formatChar} maskChar={maskChar} />);

    const inputElement = screen.getByRole('textbox');

    await user.click(inputElement);

    expect(await screen.findByDisplayValue(finalMask)).toBeInTheDocument();
  });

  it('applies mask to valid format slots when the user types', async () => {
    const user = userEvent.setup();

    render(<InputMask format={format} formatChar={formatChar} maskChar={maskChar} />);

    const inputElement = screen.getByRole('textbox');

    await user.type(inputElement, '489954');

    const finalFormattedValue = '(48) 9954-____';

    expect(await screen.findByDisplayValue(finalFormattedValue)).toBeInTheDocument();
  });

  it('removes mask value on blur if nothing was typed on input', async () => {
    const user = userEvent.setup();

    render(<InputMask format={format} formatChar={formatChar} maskChar={maskChar} />);

    const inputElement = screen.getByRole('textbox');

    // focus
    await user.click(inputElement);
    // remove focus
    await user.click(inputElement.parentElement as HTMLElement);

    const clearInput = await screen.findByDisplayValue('');

    expect(clearInput).toBeInTheDocument();
    expect(clearInput.tagName).toBe('INPUT');
  });

  it('replaces only mask slots when user hits backspace', async () => {
    const user = userEvent.setup();

    render(<InputMask format={format} formatChar={formatChar} maskChar={maskChar} />);

    const inputElement = screen.getByRole('textbox');

    await user.type(inputElement, '4899548');
    await user.keyboard('[Backspace][Backspace]');

    // it will remove 8 and 4 from above string
    const finalFormattedValue = '(48) 995_-____';

    expect(await screen.findByDisplayValue(finalFormattedValue)).toBeInTheDocument();
  });
});
