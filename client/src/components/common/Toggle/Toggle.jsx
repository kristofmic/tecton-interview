import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { isHardBreakHotkey } from '../Editor/keybindings';

if (process.env.BROWSER) {
  require('./Toggle.scss');
}

const Toggle = React.forwardRef((props, ref) => {
  const { className, label, name, onChange, value } = props;

  const handleChange = React.useCallback(() => {
    onChange(!value, name);
  }, [name, onChange, value]);

  const handleKeyPress = React.useCallback(
    e => {
      if (isHardBreakHotkey(e)) {
        handleChange();
      }
    },
    [handleChange]
  );

  return (
    <div className={cx('toggle-container', className)} ref={ref}>
      {!!label && (
        <label className="m-0" htmlFor={name}>
          {label}
        </label>
      )}
      <div
        aria-checked={value}
        className="toggle-input"
        onClick={handleChange}
        onKeyPress={handleKeyPress}
        role="checkbox"
        tabIndex="0">
        <div className="toggle-input-bg" />
        <div
          className={cx('toggle-input-handle', {
            'toggle-input-handle--enabled': value,
          })}
        />
      </div>
      <input
        checked={value}
        className="sr-only"
        id={name}
        onChange={handleChange}
        type="checkbox"
      />
    </div>
  );
});

Toggle.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export default Toggle;
