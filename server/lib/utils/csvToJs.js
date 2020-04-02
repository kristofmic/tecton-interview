export default function csvToJs(csv = '', delimiter = ',') {
  const lines = csv.split('\n');
  const headers = lines[0].split(delimiter);

  const parsed = lines.reduce((result, line, i) => {
    if (i === 0 || !line) {
      return result;
    }

    const _line = line.split(delimiter);

    const lineItem = headers.reduce((item, header, j) => {
      const datum = _line[j];
      const p = parseFloat(datum);

      item[header] = p || datum; // eslint-disable-line no-param-reassign
      return item;
    }, {});

    result.push(lineItem);

    return result;
  }, []);

  return {
    headers,
    rows: parsed,
  };
}
