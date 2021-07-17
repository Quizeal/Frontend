import { render, screen } from '@testing-library/react';
import GoogleAccount from './components/layout/GoogleAccount';

// Dummy test - More test will be added later
test('rendering googleAccount component', () => {
  render(<GoogleAccount />);
  screen.findByText(/login with google/i);
});
