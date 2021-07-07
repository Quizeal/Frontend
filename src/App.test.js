import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Quizeal (Dummy Test)', () => {
  render(<App />);
  const linkElement = screen.getByText(/Quizeal/i);
  expect(linkElement).toBeInTheDocument();
});
