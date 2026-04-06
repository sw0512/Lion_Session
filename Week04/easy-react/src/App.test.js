import { render, screen } from '@testing-library/react';
import App from './App';

test('renders profile card title', () => {
  render(<App />);
  const titleElement = screen.getByText('이름');
  expect(titleElement).toBeInTheDocument();
});
