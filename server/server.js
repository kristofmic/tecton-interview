import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import conf from 'nconf';

import { uncaughtExceptionError } from './lib/errors';
import { requestLogger, serverLogger as logger } from './lib/logger';
import webpackServer from './lib/utils/webpackServer';
import routes from './routes';

// Create Express server
const server = express();
server.set('trust proxy', true);

// Setup security
server.use(helmet());

// Setup compression
server.use(compression());

// Setup logging
server.use(requestLogger);

// Setup dev middleware
if (!conf.get('SKIP_WP') && conf.get('NODE_ENV') !== 'production') {
  webpackServer(server);
} else {
  logger.info(`NODE_ENV is ${conf.get('NODE_ENV')}, skipping Webpack middleware.`);
}

// Public assets
server.use('/public', express.static(path.join(__dirname, '..', 'public')));

// View setup
server.set('views', path.join(__dirname, '..', 'views'));
server.set('view engine', 'ejs');

// Setup routes and route handlers
routes(server);

process.on('uncaughtException', uncaughtExceptionError);

export default server;
