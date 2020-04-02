import axios from 'axios';
import set from 'lodash/set';
import update from 'lodash/update';

const TOTAL_RETRIES = 2;

const api = axios.create({
  timeout: 5000,
});

api.interceptors.response.use(undefined, error => {
  const retries = error?.config?.headers?.['x-retries'] ?? 0;

  if (error?.code === 'ECONNRESET' && retries < TOTAL_RETRIES) {
    set(error, 'config.headers.x-retries', retries + 1);

    return api(error.config);
  }

  update(
    error,
    'response.data.error.message',
    message => message || 'Oops! Something went wrong. Please wait a moment and try again.'
  );
  update(error, 'response.status', status => status || 500);

  throw error;
});

export default api;
