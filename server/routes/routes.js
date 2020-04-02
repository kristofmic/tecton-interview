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
  server.get('/api/tables', api.getTables);
  server.get('/api/tables/:name', api.getTableData);

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
