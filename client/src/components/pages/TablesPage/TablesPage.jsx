import React from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';

import Breadcrumbs from '../../common/Breadcrumbs';
import Fetch from '../../common/Fetch';

import { dataActions } from '../../../actions';
import useWindowResize from '../../../hooks/useWindowResize';

if (process.env.BROWSER) {
  require('./TablesPage.scss');
}

function TablesPage() {
  const { error, data: tables, status = '' } = useSelector(state => state.data.tables) || {};
  const getTables = dataActions.useGetTables();

  const listHeight = useWindowResize(() =>
    typeof window === 'undefined' ? 450 : window.innerHeight - 182
  );

  return (
    <div className="container px-3 py-4" id="tables-page">
      <div className="row mb-4">
        <div className="col-12">
          <Breadcrumbs crumbs={[{ path: '/tables', text: 'Tables' }]} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Fetch
            errorMessage={error?.message}
            onFetch={getTables}
            onRetry={getTables}
            status={status}>
            {() => (
              <div className="table-flex">
                <div className="table-flex-header">
                  <div className="table-flex-cell">Name</div>
                  <div className="table-flex-cell">Rows</div>
                </div>

                <List height={listHeight} itemCount={tables.length} itemSize={58} width="100%">
                  {({ index, style }) => {
                    const table = tables[index];

                    return (
                      <div className="table-flex-row" key={table.name} style={style}>
                        <div className="table-flex-cell">
                          <Link to={`/tables/data/${table.name}`}>{table.name}</Link>
                        </div>
                        <div className="table-flex-cell">{table.row_count}</div>
                      </div>
                    );
                  }}
                </List>
              </div>
            )}
          </Fetch>
        </div>
      </div>
    </div>
  );
}

export default TablesPage;
