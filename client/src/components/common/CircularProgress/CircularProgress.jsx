import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

if (process.env.BROWSER) {
  require('./CircularProgress.scss');
}

const VARIANT = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
  PRIMARY: 'PRIMARY',
};

function CircularProgress(props) {
  const { className, variant = VARIANT.PRIMARY, ...other } = props;

  return (
    <div className={cx(className, 'loading', `loading-${variant.toLowerCase()}`)} {...other}>
      <div className="loading-icon" />
    </div>
  );
}

CircularProgress.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(VARIANT)),
};

const CircularProgressMemo = React.memo(CircularProgress);

CircularProgressMemo.VARIANT = VARIANT;

export default CircularProgressMemo;
