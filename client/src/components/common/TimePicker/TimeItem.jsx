import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import Button from '../Button';

function TimeItem(props) {
  const { active, onSelect, label, value } = props;

  const handleClick = React.useCallback(() => {
    onSelect(value, label);
  }, [label, value, onSelect]);

  return (
    <Button
      className={cx('TimePicker-time btn btn-link btn-sm', {
        active,
      })}
      onClick={handleClick}>
      {label || value}
    </Button>
  );
}

TimeItem.propTypes = {
  active: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.any.isRequired,
};

export default TimeItem;
