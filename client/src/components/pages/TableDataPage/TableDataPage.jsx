import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import { useSelector } from 'react-redux';

import { FixedSizeList as List } from 'react-window';

import Breadcrumbs from '../../common/Breadcrumbs';
import Fetch from '../../common/Fetch';
import Icon from '../../common/Icon';

import { dataActions } from '../../../actions';
import useWindowResize from '../../../hooks/useWindowResize';

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

  const listHeight = useWindowResize(() =>
    typeof window === 'undefined' ? 450 : window.innerHeight - 182
  );

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
      <div className="row">
        <div className="col-12">
          <Fetch
            errorMessage={error?.message}
            fetchKey={name}
            onFetch={getTableData}
            onRetry={getTableData}
            status={status}>
            {() => {
              const { headers, meta, rows } = data;
              const sum = Object.values(meta.longest).reduce(
                (acc, len) => acc + Math.max(len, 10),
                0
              );

              return (
                <div className="table-responsive">
                  <div className="table-flex" style={{ width: `${sum + headers.length}rem` }}>
                    <div className="table-flex-header">
                      {headers.map((h, i) => (
                        <div
                          className="table-flex-cell"
                          key={h}
                          style={{ width: `${Math.max(meta.longest[h], 10) + 1}rem` }}>
                          {h}
                          <Icon
                            className="sort"
                            icon={cx({
                              sort: i !== sort.column,
                              'sort-amount-asc': i === sort.column && sort.direction === 'asc',
                              'sort-amount-desc':
                                i === sort.column && sort.direction === 'desc',
                            })}
                            onClick={() =>
                              sortData(
                                name,
                                i,
                                sort.column === i && sort.direction === 'asc' ? 'desc' : 'asc'
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="table-flex-row meta">
                      {headers.map(h => (
                        <div
                          className="table-flex-cell"
                          key={h}
                          style={{ width: `${Math.max(meta.longest[h], 10) + 1}rem` }}>
                          <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Null
                              <span className="badge badge-info badge-pill text-light">
                                {meta.null[h] ?? 0}
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Min
                              <span className="badge badge-info badge-pill text-light">
                                {meta.min[h] ?? 'N/A'}
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Max
                              <span className="badge badge-info badge-pill text-light">
                                {meta.max[h] ?? 'N/A'}
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Mean
                              <span className="badge badge-info badge-pill text-light">
                                {meta.mean[h] ?? 'N/A'}
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              StdDev
                              <span className="badge badge-info badge-pill text-light">
                                {meta.standardDeviation[h] ?? 'N/A'}
                              </span>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                    <List
                      height={listHeight}
                      itemCount={rows.length}
                      itemSize={58}
                      width="100%">
                      {({ index, style }) => {
                        const row = rows[index];

                        return (
                          <div className="table-flex-row" key={row[0]} style={style}>
                            {headers.map((h, i) => (
                              <div
                                className="table-flex-cell"
                                key={h}
                                style={{ width: `${Math.max(meta.longest[h], 10) + 1}rem` }}>
                                {row[i]}
                              </div>
                            ))}
                          </div>
                        );
                      }}
                    </List>
                  </div>
                </div>
              );
            }}
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
