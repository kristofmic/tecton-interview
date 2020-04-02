import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { Transition } from 'react-transition-group';

import IconButton from '../IconButton';

import { isEscapeHotkey } from '../Editor/keybindings';

if (process.env.BROWSER) {
  require('./Modal.scss');
}

const TRANSITION_KEYS = {
  ENTERING: 'entering',
  ENTERED: 'entered',
  EXITING: 'exiting',
  EXITED: 'exited',
};

function Modal(props) {
  const {
    actions,
    children,
    id,
    label,
    onClose,
    parentNode,
    show,
    title,
    transitionDuration = 300,
  } = props;

  const modalEl = React.useRef(null);
  const handleClick = React.useCallback(
    event => {
      if (event.target === modalEl.current) {
        onClose(event);
      }
    },
    [modalEl.current, onClose]
  );

  const handleKeyUp = React.useCallback(
    event => {
      if (isEscapeHotkey(event)) {
        onClose(event);
      }
    },
    [onClose]
  );
  React.useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyUp]);

  React.useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [show]);

  const modal = (
    <Transition in={show} timeout={transitionDuration}>
      {state => {
        const entering = state === TRANSITION_KEYS.ENTERING;
        const entered = state === TRANSITION_KEYS.ENTERED;
        const exiting = state === TRANSITION_KEYS.EXITING;

        return (
          <>
            <div
              aria-labelledby={label}
              aria-hidden="true"
              className={cx('modal fade', {
                'd-block': entering || entered || exiting,
                show: entered,
              })}
              id={id}
              onClick={handleClick}
              ref={modalEl}
              role="dialog"
              tabIndex="-1">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    {typeof title === 'string' && (
                      <h5 className="modal-title" id={label}>
                        {title}
                      </h5>
                    )}
                    {title && typeof title !== 'string' && <>{title}</>}
                    <IconButton
                      className="modal-close"
                      icon="icon-clear"
                      onClick={onClose}
                      tooltipDisabled
                    />
                  </div>
                  <div className="modal-body">
                    {typeof children === 'string' ? <p>{children}</p> : <>{children}</>}
                  </div>
                  {actions && actions.length && (
                    <div className="modal-footer">{actions.map(action => action)}</div>
                  )}
                </div>
              </div>
            </div>
            {(entering || entered || exiting) && (
              <div
                className={cx('modal-backdrop fade', {
                  show: entered,
                })}
              />
            )}
          </>
        );
      }}
    </Transition>
  );

  if (parentNode) {
    return ReactDOM.createPortal(modal, parentNode);
  }

  return modal;
}

Modal.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  parentNode: PropTypes.object,
  show: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  transitionDuration: PropTypes.number,
};

export default Modal;
