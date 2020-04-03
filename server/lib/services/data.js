import axios from 'axios';
import _ from 'lodash';

export async function getTables() {
  const res = await axios.get(
    'https://s3-us-west-2.amazonaws.com/tecton.ai.public/coding_exercise_1/tables.json'
  );

  return res.data;
}

export async function getCsvData(url = '') {
  const res = await axios.get(url);
  return processCsvData(res.data);
}

function processCsvData(csv, delimiter = ',') {
  const lines = csv.split('\n');
  const headers = lines[0].split(delimiter);
  const meta = {
    longest: {},
    null: {},
    min: {},
    max: {},
    sum: {},
    mean: {},
    standardDeviation: {},
  };

  const parsed = lines.reduce((result, line, i) => {
    if (!line) {
      return result;
    }

    const _line = line.split(delimiter);

    const lineItem = headers.reduce((item, header, j) => {
      const raw = _line[j];
      const num = parseFloat(raw);
      const datum = num || raw;

      item.push(datum);

      meta.longest[header] = Math.max(raw.length, meta.longest[header] ?? -Infinity);

      if (!datum) {
        meta.null[header] = (meta.null[header] ?? 0) + 1;
      }

      if (num) {
        meta.min[header] = Math.min(num, meta.min[header] ?? Infinity);
        meta.max[header] = Math.max(num, meta.max[header] ?? -Infinity);
        meta.sum[header] = (meta.sum[header] ?? 0) + num;
      }

      return item;
    }, []);

    if (i !== 0) {
      result.push(lineItem);
    }

    return result;
  }, []);

  headers.forEach(header => {
    if (meta.sum[header] == null) {
      return;
    }

    meta.mean[header] = _.round(meta.sum[header] / parsed.length, 6);
  });

  parsed.forEach(row => {
    row.forEach((datum, i) => {
      const header = headers[i];
      const mean = meta.mean[header];

      if (mean == null) {
        return;
      }

      const square = (datum - mean) ** 2;
      meta.standardDeviation[header] = (meta.standardDeviation[header] ?? 0) + square;
    });
  });

  headers.forEach(header => {
    if (meta.standardDeviation[header] == null) {
      return;
    }

    meta.standardDeviation[header] = _.round(
      Math.sqrt(meta.standardDeviation[header] / parsed.length),
      6
    );
  });

  return {
    headers,
    meta,
    rows: parsed,
  };
}
