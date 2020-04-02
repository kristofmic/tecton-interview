import React from 'react';
import ReactDOMServer from 'react-dom/server';

function reactServer(Component, props) {
  return ReactDOMServer.renderToString(React.createElement(Component, props));
}

export default reactServer;
