import React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter, Redirect, Route, StaticRouter, Switch } from 'react-router-dom';

import ErrorPageContainer from '../containers/ErrorPageContainer';
import AppPageContainer from '../containers/AppPageContainer';

const Router = process.env.BROWSER ? BrowserRouter : StaticRouter;

function MainRouter(props) {
  // Only required for server rendering
  const { context, location } = props;

  return (
    <Router context={context} location={location}>
      <Switch>
        <Route path={['/tables']} component={AppPageContainer} />

        <Route path={['/notfound']} component={ErrorPageContainer} exact />

        <Redirect from="/" to="/tables" exact />
        <Redirect from="*" to="/notfound" />
      </Switch>
    </Router>
  );
}

MainRouter.propTypes = {
  context: PropTypes.object,
  location: PropTypes.string,
};

export default MainRouter;
