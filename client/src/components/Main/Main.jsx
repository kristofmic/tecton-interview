import React from 'react';
import PropTypes from 'prop-types';

import { Provider as ReduxProvider } from 'react-redux';

import Router from '../Router';

function Main(props) {
  const { context, location, store } = props;

  return (
    <ReduxProvider store={store}>
      <Router context={context} location={location} />
    </ReduxProvider>
  );
}

Main.propTypes = {
  context: Router.propTypes.context,
  location: Router.propTypes.location,
  store: PropTypes.object.isRequired,
};

export default Main;
