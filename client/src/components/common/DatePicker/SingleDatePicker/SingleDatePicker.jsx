import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

import Icon from '../../Icon';

if (process.env.BROWSER) {
  require('./SingleDatePicker.scss');
}

const DISPLAY_FORMAT = 'MMM D, Y';

function SingleDatePickerWrapper(props) {
  const { autoFocus, date, id, onDateChange, placeholder = 'Select date', ...rest } = props;

  const [focused, setFocused] = React.useState(autoFocus);
  const onFocusChange = React.useCallback(
    ({ focused: nextFocused }) => {
      setFocused(nextFocused);
    },
    [setFocused]
  );

  return (
    <span
      className={cx('SingleDatePicker-container', {
        'SingleDatePicker-container--noDate': !date,
      })}>
      <SingleDatePicker
        id={id}
        customInputIcon={<Icon icon="icon-date-range" />}
        date={date}
        daySize={36}
        displayFormat={DISPLAY_FORMAT}
        focused={focused}
        hideKeyboardShortcutsPanel
        navNext={<Icon icon="icon-arrow-right-circle-outlined" />}
        navPrev={<Icon icon="icon-arrow-left-circle-outlined" />}
        noBorder
        numberOfMonths={1}
        onDateChange={onDateChange}
        onFocusChange={onFocusChange}
        placeholder={placeholder}
        small
        transitionDuration={150}
        {...rest}
      />
    </span>
  );
}

SingleDatePickerWrapper.propTypes = {
  autoFocus: PropTypes.bool,
  date: PropTypes.object,
  id: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  // additional props defined here: https://github.com/airbnb/react-dates#singledatepicker
};

SingleDatePickerWrapper.defaultProps = {
  autoFocus: false,
  date: null,
};

export default SingleDatePickerWrapper;
