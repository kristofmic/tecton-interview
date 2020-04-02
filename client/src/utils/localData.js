let _localData = {};

if (process.env.BROWSER) {
  const { __tecton = {} } = window;
  _localData = JSON.parse(__tecton.localData || '{}');
}

export default function localData() {
  return _localData;
}
