import React from 'react';
import PropTypes from 'prop-types';

import useDataSync from '../../../hooks/useDataSync';

function DataSync(props) {
  const { action, children, data, options } = props;

  useDataSync(action, data, options);

  return <>{children}</>;
}

DataSync.propTypes = {
  action: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  data: PropTypes.any,
  options: PropTypes.shape({
    comparator: PropTypes.func,
    delay: PropTypes.number,
    method: PropTypes.string,
    methodOperations: PropTypes.object,
  }),
};

export default DataSync;
