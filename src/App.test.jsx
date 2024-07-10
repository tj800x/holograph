import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('tldraw', () => {
  const React = require('react');
  return {
    Tldraw: ({ onMount }) => {
      React.useEffect(() => {
        const mockEditor = {
          store: {
            allRecords: jest.fn(() => []),
            listen: jest.fn(() => jest.fn()), // Mock the cleanup function as well
          },
          createAssets: jest.fn(),
          createShapes: jest.fn(),
        };
        onMount(mockEditor);
      }, [onMount]);
      return <div data-testid="tldraw-component">Tldraw Component</div>;
    },
  };
});

jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => <div data-testid="analytics-component">Analytics Component</div>
}));

beforeEach(() => {
  fetchMock.resetMocks();
});

test('renders the Tldraw and Analytics components', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ assets: [], shapes: [] }));

  await act(async () => {
    render(<App />);
  });

  expect(screen.getByTestId('tldraw-component')).toBeInTheDocument();
  expect(screen.getByTestId('analytics-component')).toBeInTheDocument();
});
