import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import Icon from '../Icon';

function InformationText(props) {
  const { children, className } = props;

  return (
    <div className={cx('d-flex text-muted mb-2', className)}>
      <Icon className="mr-2" icon="icon-info-outlined" />
      <small>{children}</small>
    </div>
  );
}

InformationText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default InformationText;
