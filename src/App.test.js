import { render, screen } from '@testing-library/react';
import App from './App';

// Dummy test - More test will be added later
test('renders Quizeal (Dummy Test)', () => {
  render(<App />);
  const linkElement = screen.getByText(/uizeal/i);
  expect(linkElement).toBeInTheDocument();
});
