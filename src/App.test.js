import { render, screen } from '@testing-library/react';
import App from './App';

// Dummy test - More test will be added later
test('renders Quizeal without crashing App', () => {
  render(<App />);
  const linkElement = screen.getByText(
    /The ultimate Quiz taking platform for the present times/i
  );
  expect(linkElement).toBeInTheDocument();
});
