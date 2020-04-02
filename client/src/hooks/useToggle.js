import React from 'react';

export default function useToggle(defaultState = false) {
  const [state, setState] = React.useState(defaultState);
  const toggleOn = React.useCallback(() => {
    setState(true);
  }, []);
  const toggleOff = React.useCallback(() => {
    setState(false);
  }, []);
  const toggle = React.useCallback(() => {
    setState(prevState => !prevState);
  }, []);

  return [state, toggle, toggleOn, toggleOff];
}
