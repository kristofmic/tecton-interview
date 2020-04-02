import React from 'react';

export default function useBodyClassToggle(className) {
  const addClass = React.useCallback(() => {
    document.body.classList.add(className);
  }, [className]);

  const removeClass = React.useCallback(() => {
    document.body.classList.remove(className);
  }, [className]);

  return [addClass, removeClass];
}
