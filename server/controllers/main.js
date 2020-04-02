import _ from 'lodash';
import conf from 'nconf';

import Main from '../../client/src/components/Main';
import { createStore } from '../../client/src/store';

import reactServer from '../lib/utils/reactServer';

import getAssets from '../../views/assets';

import HTTP_STATUS_CODES from '../constants/httpStatusCodes';

const SERVER_RENDER = conf.get('serverRender');
const NODE_ENV = conf.get('NODE_ENV');
const CLIENT_ASSETS = getAssets();

export async function mainView(req, res) {
  const localData = _.merge({}, _.get(req, ['locals', 'localData'], {}), {
    config: {},
  });

  const locals = {
    ...req.locals,
    body: null,
    localData,
    ...CLIENT_ASSETS,
    env: NODE_ENV,
  };

  if (SERVER_RENDER) {
    const context = {};
    locals.body = reactServer(Main, {
      context,
      location: req.originalUrl,
      store: createStore(localData),
    });

    if (context.url) {
      return res.redirect(HTTP_STATUS_CODES.FOUND, context.url);
    }
  }

  return res.status(HTTP_STATUS_CODES.OK).render('main.ejs', locals);
}

export async function errorView(req, res, next) {
  const localData = _.merge({}, _.get(req, ['locals', 'localData'], {}), {
    config: {
      public: true,
    },
  });
  _.set(req, ['locals', 'localData'], localData);

  return mainView(req, res, next);
}
