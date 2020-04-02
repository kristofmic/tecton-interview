import React from 'react';
import PropTypes from 'prop-types';

function PageRow(props) {
  const { children, className = '', ...rest } = props;

  return (
    <div className={`row justify-content-center ${className}`} {...rest}>
      {children}
    </div>
  );
}

PageRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PageRow;
