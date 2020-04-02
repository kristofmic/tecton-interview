import React from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import Breadcrumbs from '../../common/Breadcrumbs';
import Fetch from '../../common/Fetch';

import { dataActions } from '../../../actions';

if (process.env.BROWSER) {
  require('./TablesPage.scss');
}

function TablesPage() {
  const { error, data: tables, status = '' } = useSelector(state => state.data.tables) || {};
  const getTables = dataActions.useGetTables();

  return (
    <div className="container px-3 py-4" id="tables-page">
      <div className="row mb-4">
        <div className="col-12">
          <Breadcrumbs crumbs={[{ path: '/tables', text: 'Tables' }]} />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <Fetch
            errorMessage={error?.message}
            onFetch={getTables}
            onRetry={getTables}
            status={status}>
            {() => (
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Name</th>
                      <th>Rows</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tables.map(table => (
                      <tr key={table.name}>
                        <td>
                          <Link to={`/tables/data/${table.name}`}>{table.name}</Link>
                        </td>
                        <td>{table.row_count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Fetch>
        </div>
      </div>
    </div>
  );
}

export default TablesPage;
