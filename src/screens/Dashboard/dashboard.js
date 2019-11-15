import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

class DashboardIndex extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          dashboard index here
        </div>
      </div>
    );
  }
}

export default withRouter(DashboardIndex);