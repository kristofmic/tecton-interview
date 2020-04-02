import React from 'react';
import PropTypes from 'prop-types';

function Markup(props) {
  const { children, component: Tag, ...rest } = props;

  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: children }} />;
}

Markup.propTypes = {
  children: PropTypes.string.isRequired,
  component: PropTypes.string,
};

Markup.defaultProps = {
  component: 'span',
};

export default React.memo(Markup);
