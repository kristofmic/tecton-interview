import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import DatasetListPage from '../../pages/DatasetListPage';

if (process.env.BROWSER) {
  require('./AppPageContainer.scss');
}

function AppPageContainer() {
  return (
    <div id="app-container">
      <div className="app-body">
        <Switch>
          <Route path="/datasets" component={DatasetListPage} exact />

          <Redirect from="*" to="/notfound" />
        </Switch>
      </div>
    </div>
  );
}

AppPageContainer.propTypes = {};

export default AppPageContainer;
