import * as api from '../controllers/api';
import * as error from '../controllers/error';
import * as health from '../controllers/health';
import * as main from '../controllers/main';

export default function routes(server) {
  /**
   * Healthcheck
   */
  server.get('/healthcheck', health.healthcheck);

  /**
   * API Routes
   */
  server.get('/api/ping', api.ping);

  /**
   * Main Routes
   */
  server.use('/', main.mainView);

  /**
   * Error handlers
   * These must be last
   */
  server.use(error.handleNotFoundError);
  server.use(error.handleServerError);
}
