import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import Button from '../Button';

function ErrorMessage(props) {
  const { children, className, onRetry } = props;

  return (
    <div className={cx('error-message d-flex flex-column align-items-center p-3', className)}>
      {typeof children === 'string' ? (
        <p className="text-danger text-center text-wrap">
          <small>
            <strong>{children}</strong>
          </small>
        </p>
      ) : (
        <>{children}</>
      )}
      {onRetry && (
        <Button className="btn btn-secondary btn-sm" onClick={onRetry}>
          <i className="icon icon-restore mr-2" />
          Retry
        </Button>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ErrorMessage;
