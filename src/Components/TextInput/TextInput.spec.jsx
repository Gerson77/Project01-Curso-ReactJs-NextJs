import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'Testando'} />);

    expect(screen.getByPlaceholderText(/type your search/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type your search/i).value).toBe('Testando');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="valor qualquer" />);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'O valor';

    userEvent.type(input, value);

    expect(input.value).toBe('valor qualquer');
    expect(fn).toHaveBeenCalledTimes(value.length);
  });
  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} searchValue="" />);
    expect(container).toMatchSnapshot();
  });
});
