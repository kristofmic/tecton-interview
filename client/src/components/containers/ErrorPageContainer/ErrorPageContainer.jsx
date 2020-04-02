import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { NotFoundPage } from '../../pages/ErrorPages';

if (process.env.BROWSER) {
  require('./ErrorPageContainer.scss');
}

function ErrorPageContainer() {
  return (
    <div id="error-container">
      <div className="container error-body">
        <Switch>
          <Route path="/notfound" component={NotFoundPage} exact />
        </Switch>
      </div>
    </div>
  );
}

ErrorPageContainer.propTypes = {};

export default ErrorPageContainer;
