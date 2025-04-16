import { render, screen } from '@testing-library/react';
import App from './App';

test('renders food app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/FoodieHub/i);
  expect(headerElement).toBeInTheDocument();
});
