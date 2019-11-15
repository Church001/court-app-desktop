import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getFavorites, removeFavoriteReport } from '../../redux/actions/reportsActions';
import { Link } from 'react-router-dom';

class FavoriteReports extends Component {
  componentDidMount() {
    this.props.getFavorites();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div class="col-sm-12 search">
            <form action="" method="get">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text purple lighten-8" id="basic-text1">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </span>
                </div>
                <input class="form-control my-0 py-1" type="text" placeholder="Search anything" aria-label="Search" name="query" />
              </div>
            </form>
          </div>
        </div>
        <div className="row others-report">
          <div className="col-sm-12">
            <Link className="col-xs-2 col-sm-2 col-md-2 col-lg-2" to={`${this.props.match.path}`}>
              <img src="/assets/images/icons/report-icon.svg" alt="" /> All Reports
            </Link>
            <Link className="col-xs-2 col-sm-2 col-md-2 col-lg-2" to={`${this.props.match.path}favorites`}>
              <img src="/assets/images/icons/favourite-report.svg" alt="" />Favourites
            </Link>
            <Link className="col-xs-2 col-sm-2 col-md-2 col-lg-2" to={`${this.props.match.path}readlater`}>
              <img src="/assets/images/icons/read-later-list.svg" alt="" />Read Later
            </Link>
        
          </div>
        </div>
        {
          this.props.favorites.map(report => (
            <div class="card">
              <div class="card-body">
                <h3><a href="{{ route('dashboard.report.read', $report->slug) }}">{ report.title }</a></h3>
                <p class="citation">citation: { report.citation }</p>
                <p>{ report.excerpt }</p>
                <button  class="btn btn-danger" onClick={() => this.props.removeFavoriteReport(report.id)}><i class="fas fa-trash"></i> Remove from list</button>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = ({ reports }) => ({
  favorites: reports.favorites
});

export default connect(
  mapStateToProps,
  {
    getFavorites,
    removeFavoriteReport
  }
)(FavoriteReports);