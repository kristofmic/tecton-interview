import React from 'react';

import debounce from 'lodash/debounce';

export default function useWindowResize(calculateStateFunc) {
  const [state, setState] = React.useState(calculateStateFunc());
  const onResize = React.useMemo(
    () =>
      debounce(() => {
        setState(calculateStateFunc());
      }, 250),
    [calculateStateFunc, setState]
  );

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return state;
}
