import api from './apiConfig';
/**
 * Data APIs
 */
export function getTables() {
  return api.get(`/api/tables/`);
}

export function getTableData(tableName) {
  return api.get(`/api/tables/${tableName}`);
}
