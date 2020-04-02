import axios from 'axios';
import get from 'lodash/get';

const TOTAL_RETRIES = 2;

const api = axios.create({
  timeout: 5000,
});

api.interceptors.response.use(undefined, error => {
  const errorResponseStatus = get(error, 'response.status');
  const errorCode = get(error, 'code');
  const retries = get(error, 'config.headers.x-retries', 0);

  if (errorCode === 'ECONNRESET' && retries < TOTAL_RETRIES) {
    return api({
      ...error.config,
      headers: {
        ...error.config.headers,
        'x-retries': retries + 1,
      },
    });
  }

  // eslint-disable-next-line no-param-reassign
  error.response = {
    ...error.response,
    data: {
      ...get(error, 'response.data'),
      error: {
        ...get(error, 'response.data.error'),
        message:
          get(error, 'response.data.error.message') ||
          'Oops! Something went wrong. Please wait a moment and try again.',
      },
    },
    status: errorResponseStatus || 500,
  };

  throw error;
});

export default api;
