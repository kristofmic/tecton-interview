import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import { useSelector } from 'react-redux';

import Breadcrumbs from '../../common/Breadcrumbs';
import Fetch from '../../common/Fetch';
import Icon from '../../common/Icon';

import { dataActions } from '../../../actions';

if (process.env.BROWSER) {
  require('./TableDataPage.scss');
}

function TableDataPage(props) {
  const { match } = props;
  const { name } = match.params;

  const { error, data, status = '', sort = {} } =
    useSelector(state => state.data.tableData[name]) ?? {};

  const getTableData = dataActions.useGetTableData();
  const sortData = dataActions.useSortTableData();

  return (
    <div className="container px-3 py-4" id="table-data-page">
      <div className="row mb-4">
        <div className="col-12">
          <Breadcrumbs
            crumbs={[
              { path: '/tables', text: 'Tables' },
              { path: `/tables/data/${name}`, text: name },
            ]}
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <Fetch
            errorMessage={error?.message}
            fetchKey={name}
            onFetch={getTableData}
            onRetry={getTableData}
            status={status}>
            {() => (
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      {data.headers.map(h => (
                        <th key={h}>
                          {h}
                          <Icon
                            className="sort"
                            icon={cx({
                              sort: h !== sort.column,
                              'sort-amount-asc': h === sort.column && sort.direction === 'asc',
                              'sort-amount-desc':
                                h === sort.column && sort.direction === 'desc',
                            })}
                            onClick={() =>
                              sortData(
                                name,
                                h,
                                sort.column === h && sort.direction === 'asc' ? 'desc' : 'asc'
                              )
                            }
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map(row => (
                      <tr key={row[data.headers[0]]}>
                        {data.headers.map(h => (
                          <td key={h}>{row[h]}</td>
                        ))}
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

TableDataPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default TableDataPage;
