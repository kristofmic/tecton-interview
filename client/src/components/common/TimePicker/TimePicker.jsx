import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import moment from 'moment-timezone';
import orderBy from 'lodash/orderBy';

import ClickAwayListener from '../ClickAwayListener';
import IconButton from '../IconButton';
import Popover from '../Popover';

import TimeItem from './TimeItem';

import { isHardBreakHotkey } from '../Editor/keybindings';

if (process.env.BROWSER) {
  require('./TimePicker.scss');
}

function formatTime(value) {
  const _value = String(value);

  if (_value.length === 1) {
    return `0${_value}`;
  }

  return _value;
}

function roundTime(m = moment()) {
  if (m.minutes() >= 30) {
    return m.hour(m.hour() + 1).minutes(0);
  }

  return m.minutes(30);
}

const GUESSED_TZ = moment.tz.guess();
moment.tz.setDefault(GUESSED_TZ);

const DISPLAY_FORMAT = 'h:mm a z';
const DISPLAY_FORMAT_Z = 'h:mm a';
const INPUT_FORMATS = [
  'h:mm a z',
  'h:mma z',
  'hmm a z',
  'hmma z',
  'h a z',
  'ha z',
  'h:mm z',
  'hmm z',
  'h z',
  'h:mm a',
  'h:mma',
  'hmm a',
  'hmma',
  'h a',
  'ha',
  'h:mm',
  'hmm',
  'h',
];
const DEFAULT_TIMES = new Array(48).fill(0).map((_, i) => {
  const hour = Math.floor(i / 2) % 12 || 12;
  const minute = i % 2 ? '30' : '00';
  const amPM = i >= 24 ? 'pm' : 'am';

  return {
    label: `${hour}:${minute} ${amPM}`,
    value: moment(`${hour}:${minute} ${amPM}`, DISPLAY_FORMAT),
  };
});
const TIMEZONES = moment.tz.names().reduce((acc, z) => {
  const zone = moment.tz.zone(z);
  const utc = zone.utcOffset(Date.now());

  if ((!acc[utc] || acc[utc].population < zone.population) && zone.population > 1000) {
    acc[utc] = {
      ...zone,
      label: `UTC${utc <= 0 ? '+' : '-'}${formatTime(
        Math.floor(Math.abs(utc / 60))
      )}:${formatTime(Math.abs(utc % 60))} ${zone.name.replace('/', ' - ').replace('_', ' ')}`,
      utcOffset: utc * -1,
    };
  }
  return acc;
}, {});
const DEFAULT_ZONES = orderBy(Object.values(TIMEZONES), 'utcOffset');

class TimePicker extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onTimeChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    time: PropTypes.object,
  };

  static defaultProps = {
    time: undefined,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.time !== state.timeProp) {
      return {
        timeProp: props.time,
        timeValue: props.time ? props.time.format(DISPLAY_FORMAT) : '',
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      containerRef: null,
      isPopoverVisible: false,
      timeProp: props.time,
      timeValue: props.time ? props.time.format(DISPLAY_FORMAT) : '',
    };

    this.inputRef = React.createRef();
    this.timeListRef = React.createRef();
    this.zoneListRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const { time } = this.props;

    if (!prevState.isPopoverVisible && this.state.isPopoverVisible) {
      if (this.timeListRef.current) {
        const _time = roundTime(time);
        const tIndex = DEFAULT_TIMES.findIndex(
          t => t.value.format(DISPLAY_FORMAT_Z) === _time.format(DISPLAY_FORMAT_Z)
        );

        if (tIndex > -1) {
          this.timeListRef.current.scrollTo(0, Math.max(0, tIndex - 2) * 41);
        }
      }

      if (this.zoneListRef.current) {
        const zIndex = DEFAULT_ZONES.findIndex(z =>
          time ? z.utcOffset === time.utcOffset() : z.name === GUESSED_TZ
        );

        if (zIndex > -1) {
          this.zoneListRef.current.scrollTo(0, Math.max(0, zIndex - 2) * 41);
        }
      }
    }
  }

  componentWillUnmount() {
    moment.tz.setDefault(GUESSED_TZ);
  }

  setContainerRef = el => {
    this.setState({
      containerRef: el,
    });
  };

  handleClickAway = () => {
    const { isPopoverVisible } = this.state;

    if (isPopoverVisible) {
      this.hidePopover();
      this.inferTimeSelect();
    }
  };

  handleInputBlur = e => {
    const { containerRef } = this.state;

    if (!containerRef || !containerRef.contains(e.relatedTarget)) {
      this.hidePopover();
      this.inferTimeSelect();
    }
  };

  handleInputChange = e => {
    this.setState({
      timeValue: e.target.value,
    });
  };

  handleInputKeyPress = e => {
    if (isHardBreakHotkey(e)) {
      this.inputRef.current.blur();
    }
  };

  handleTimeSelect = time => {
    const { onTimeChange } = this.props;

    this.hidePopover();
    onTimeChange(time);
  };

  handleZoneSelect = zone => {
    const { onTimeChange, time } = this.props;

    let _time = time;
    if (!_time) {
      const h = moment().minutes() > 30 ? moment().hour() + 1 : moment().hour();
      const m = moment().minutes() > 30 ? 0 : 30;
      const a = h >= 12 ? 'pm' : 'am';
      _time = moment(`${h}${m} ${a}`, DISPLAY_FORMAT);
    }

    moment.tz.setDefault(zone.name);
    _time = moment(_time.format('h:mm a'), DISPLAY_FORMAT).tz(zone.name);
    this.hidePopover();
    onTimeChange(_time);
  };

  hidePopover = () => {
    this.setState({
      isPopoverVisible: false,
    });
  };

  showPopover = () => {
    this.setState({
      isPopoverVisible: true,
    });
  };

  inferTimeSelect() {
    const { onTimeChange, time } = this.props;
    const { timeValue } = this.state;

    let parsedValue;
    INPUT_FORMATS.some(format => {
      const m = moment(timeValue, format);
      if (m.isValid()) {
        parsedValue = m;
        return true;
      }

      return false;
    });

    if (parsedValue) {
      onTimeChange(parsedValue);
    } else {
      this.setState({
        timeProp: time,
        timeValue: time,
      });
    }
  }

  render() {
    const { id, placeholder = 'Select time', time } = this.props;
    const { containerRef, isPopoverVisible, timeValue = '' } = this.state;

    return (
      <span
        className={cx('TimePicker-container', {
          'TimePicker-container--noTime': !timeValue,
        })}
        ref={this.setContainerRef}>
        <IconButton
          className="TimePicker-icon"
          icon="icon-time"
          onClick={this.showPopover}
          tooltipDisabled
        />
        <input
          autoComplete="off"
          className="TimePicker-input"
          id={id}
          name={id}
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onFocus={this.showPopover}
          onKeyPress={this.handleInputKeyPress}
          placeholder={placeholder}
          ref={this.inputRef}
          type="text"
          value={timeValue}
        />
        <ClickAwayListener containerEl={containerRef} onClickAway={this.handleClickAway}>
          <Popover
            anchorEl={containerRef}
            className="TimePicker-popover"
            containerEl={containerRef}
            isVisible={isPopoverVisible}
            offset={21}
            placement={Popover.PLACEMENT.BOTTOM}
            transitionDuration={16}>
            <div className="TimePicker-listContainer">
              <ul className="list-unstyled m-0 TimePicker-timeList" ref={this.timeListRef}>
                {DEFAULT_TIMES.map(t => (
                  <li key={t.label} className="TimePicker-timeListItem">
                    <TimeItem
                      active={
                        time &&
                        t.value.format(DISPLAY_FORMAT_Z) === time.format(DISPLAY_FORMAT_Z)
                      }
                      onSelect={this.handleTimeSelect}
                      label={t.label}
                      value={t.value}
                    />
                  </li>
                ))}
              </ul>
              <ul className="list-unstyled m-0 TimePicker-zoneList" ref={this.zoneListRef}>
                {DEFAULT_ZONES.map(z => (
                  <li key={z.name} className="TimePicker-zoneListItem">
                    <TimeItem
                      active={time ? z.utcOffset === time.utcOffset() : z.name === GUESSED_TZ}
                      onSelect={this.handleZoneSelect}
                      label={z.label}
                      value={z}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Popover>
        </ClickAwayListener>
      </span>
    );
  }
}

export default TimePicker;
