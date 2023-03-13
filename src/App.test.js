import { render, screen } from '@testing-library/react';
import App from './App';

test('renders WORDL text', () => {
  render(<App />);
  const textElement = screen.getByText(/WORDL/i);
  expect(textElement).toBeInTheDocument();
});
