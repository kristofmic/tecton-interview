import React from 'react';
import PropTypes from 'prop-types';

function PageCol(props) {
  const { children, className = '', ...rest } = props;

  return (
    <div className={`col-md-8 ${className}`} {...rest}>
      {children}
    </div>
  );
}

PageCol.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PageCol;
