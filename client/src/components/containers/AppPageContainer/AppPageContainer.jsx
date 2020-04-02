import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import TablesPage from '../../pages/TablesPage';
import TableDataPage from '../../pages/TableDataPage';

if (process.env.BROWSER) {
  require('./AppPageContainer.scss');
}

function AppPageContainer() {
  return (
    <div id="app-container">
      <div className="app-body">
        <Switch>
          <Route path="/tables" component={TablesPage} exact />
          <Route path="/tables/data/:name" component={TableDataPage} exact />

          <Redirect from="*" to="/notfound" />
        </Switch>
      </div>
    </div>
  );
}

AppPageContainer.propTypes = {};

export default AppPageContainer;
