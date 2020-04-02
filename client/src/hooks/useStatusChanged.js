import React from 'react';

export default function useStatusChanged(status, { from, to }) {
  const statusRef = React.useRef(status);
  let changed = false;

  if (statusRef.current === from && status === to) {
    changed = true;
  }

  statusRef.current = status;

  return changed;
}
