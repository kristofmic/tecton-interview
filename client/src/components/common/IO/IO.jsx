import React from 'react';
import PropTypes from 'prop-types';

import lowerFirst from 'lodash/lowerFirst';
import reduce from 'lodash/reduce';

import useIO from '../../../hooks/useIO';

function IO(props) {
  const { children, namespace, room, socketRef, ...rest } = props;

  const events = React.useMemo(() => {
    return reduce(
      rest,
      (acc, val, prop) => {
        if (prop.startsWith('on')) {
          const event = lowerFirst(prop.slice(2));
          acc.push([event, val]);
        }

        return acc;
      },
      []
    );
  }, Object.values(rest));

  const socket = useIO(namespace, room, events);

  React.useMemo(() => {
    if (typeof socketRef === 'function') {
      socketRef(socket);
    } else if (socketRef) {
      socketRef.current = socket;
    }
  }, [socket, socketRef]);

  return <>{children({ socket })}</>;
}

IO.propTypes = {
  children: PropTypes.func.isRequired,
  namespace: PropTypes.string,
  room: PropTypes.string,
  socketRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default IO;
