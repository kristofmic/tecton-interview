import React from 'react';

if (process.env.BROWSER) {
  require('./DatasetListPage.scss');
}

function DatasetListPage() {
  return (
    <div className="container-flex px-3 py-4" id="dataset-list-page">
      <div className="row mb-4 mb-lg-0">
        <div className="col-12 col-lg-7">Dataset List Page</div>
      </div>
    </div>
  );
}

export default DatasetListPage;
