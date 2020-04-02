import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

if (process.env.BROWSER) {
  require('./Icon.scss');
}

function Icon(props) {
  const { className, icon, ...rest } = props;

  return <i className={cx('icon fa', `fa-${icon}`, className)} {...rest} />;
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
};

export default Icon;
