import config from 'nconf';

const NODE_ENV = config.get('NODE_ENV');

let assets = {
  css: ['main.css'],
  js: ['runtime~main.js', 'vendors.js', 'main.js'],
};

if (NODE_ENV === 'production') {
  const manifest = require('../public/manifest.json'); // eslint-disable-line
  assets = {
    css: assets.css.map(asset => manifest[asset]),
    js: assets.js.map(asset => manifest[asset]),
  };
}

export default function getAssets() {
  return assets;
}
