import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Loader from 'react-loader-spinner';

import { connect } from 'react-redux';
import moment from 'moment';
import { getUserSupportThreads } from '../../redux/actions/supportActions';

class List extends Component {
  componentDidMount() {
    this.props.getUserSupportThreads(this.props.profile.id);
  }

  render() {
    const { threads, loading } = this.props;

    return (
      <div className="row">
        <div className="col-xl-12">
          <div className="page-header-content header-elements-md-inline">
            <div className="page-title d-flex">
              <h4>
                <p>Have an issue? Create a Ticket to talk to support.</p>
                <p>
                  <Link to={`${this.props.match.path}/create`} className="btn secondary-btn">Create Ticket</Link>
                </p>
              </h4>
            </div>
          </div>
          {
            loading && (
              <div className="absolute-loader">
                <Loader
                  type="Oval"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              </div>
            )
          }
          
          <div className="row">
            <div className="col-lg-10 table-col">
              {
                threads.length < 0 && (
                  <div className="page-header-content header-elements-md-inline">
                    <div className="page-title d-flex">
                        <h4>
                            <p>Have an issue? Create a Ticket to talk to support.</p>
                            <p>
                                <a href="create-support.php" className="btn secondary-btn">Create Ticket</a>
                            </p>
                        </h4>
                    </div>
                </div>
                )
              }
              {
                threads.length > 0 && (
                  <div className="table-responsive">
                    <table className="table table-detached">
                      <div>
                        <thead className="break">
                          <tr>
                            <th>Tickets</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th></th>
                          </tr>
                        </thead>
                      </div>
                      <div style={{marginTop: '50px'}}>
                        <tbody className="break-body">
                          {
                            threads.map(thread => {
                              let status = 'Closed';
                              let classname = 'secondary';

                              if (thread.status === 'unattended') {
                                status = 'Unattended';
                                classname = 'danger';
                              } else if (status === 'in-progress') {
                                status = 'In Progress';
                                classname = 'primary';
                              }

                              return (
                                <tr>
                                  <th scope="row">
                                    <Link to={`${this.props.match.path}/view/${thread.id}`}>
                                      <h3 className="title1">[{thread.channel}] {thread.subject}</h3>
                                    </Link>
                                    <p className="date">{ moment(thread.created_at).format('d-m-Y') }</p>
                                  </th>
                                  <td>
                                    <span className={classname}></span> {status}
                                  </td>
                                  <td>
                                    <Link to={`${this.props.match.path}/view/${thread.id}`}>
                                      Open
                                    </Link>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </div>
                    </table>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ support, profile, auth }) => ({
  threads: support.threads,
  profile: profile.profile,
  loading: auth.loading
});

export default connect(
  mapStateToProps,
  {
    getUserSupportThreads
  }
)(List);