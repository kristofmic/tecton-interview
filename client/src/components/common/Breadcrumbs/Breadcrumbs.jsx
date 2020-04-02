import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

if (process.env.BROWSER) {
  require('./Breadcrumbs.scss');
}

function Breadcrumbs(props) {
  const { crumbs } = props;

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {crumbs.map(crumb => (
          <li className="breadcrumb-item" key={crumb.path}>
            <Link to={crumb.path}>{crumb.text}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

Breadcrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Breadcrumbs;
