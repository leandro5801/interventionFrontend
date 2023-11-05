import React from 'react';
import { render } from '@testing-library/react';
import App from './_app';

test('renders without crashing', () => {
  const { unmount } = render(<App />);
  unmount();
});
