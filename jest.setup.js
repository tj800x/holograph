import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import { act } from 'react-dom/test-utils';
global.act = act;

const originalError = console.error;
console.error = (...args) => {
  if (
    args[0].includes('Warning: `ReactDOMTestUtils.act` is deprecated in favor of `React.act`')
  ) {
    return;
  }
  originalError.call(console, ...args);
};
