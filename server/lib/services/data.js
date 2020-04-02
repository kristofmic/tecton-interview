import axios from 'axios';

import csvToJs from '../utils/csvToJs';

export async function getTables() {
  const res = await axios.get(
    'https://s3-us-west-2.amazonaws.com/tecton.ai.public/coding_exercise_1/tables.json'
  );

  return res.data;
}

export async function getCsvData(url = '') {
  const res = await axios.get(url);
  const parsed = csvToJs(res.data);

  return parsed;
}
