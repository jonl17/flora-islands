import { render, screen } from '@testing-library/react';
import <%= h.changeCase.pascal(name) %> from './<%= h.changeCase.pascal(name) %>';

describe('<%= h.changeCase.pascal(name) %>', () => {
  it('renders without crashing', () => {
    render(<<%= h.changeCase.pascal(name) %> />);
    expect(screen.getByText('<%= h.changeCase.pascal(name) %>')).toBeInTheDocument();
  });
});