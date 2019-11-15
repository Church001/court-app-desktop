import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { connect } from 'react-redux';

import {
  createNewThread
} from '../../redux/actions/supportActions';

class Create extends Component {
  state = {
    channel: '',
    subject: ''
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { channel, subject } = this.state;
    const { createNewThread } = this.props;

    const data = {
      channel,
      subject
    };

    createNewThread(data, this.props.history);
  }

  render() {
    const { channel, subject } = this.state;

    return (
      <div className="row">
        <div class="col-xl-12">
        <div class="space-120"></div>
          <div class="row">
            <div class="col-lg-10 support-col">
              <div class="panel-group" id="accordion">
                <div class="panel panel-default">
                  <div class="panel-heading" data-parent="#accordion" href="#collapse1">
                    <h4 class="panel-title">
                      Create Ticket
                    </h4>
                  </div>
                  <div id="collapse1" class="panel-collapse in exclude">
                    <div class="panel-body">
                      <div class="card">                    
                        <div class="card-body support-body">
                          <Link to="/dashboard/support" className="btn secondary-btn">&larr; Go Back</Link>
                          <br /><br />
                          <div class="space-40"></div>
                          <div class="d-flex alig n-items-center row">  
                            <div class="col-12">
                              <form onSubmit={this.handleFormSubmit}>
                                <div class="row">
                                  <div class="col-sm-12">
                                    <div class="form-group">
                                      <label for="subject">Subject</label>
                                      <input type="text" required class="form-control" name="subject" id="subject" value={subject} onChange={(subject) => this.setState({subject: subject.target.value})} />
                                    </div>
                                  </div>
                                  <div class="col-sm-12">
                                    <div class="form-group">
                                      <label for="channel">Channel</label>
                                      <select name="channel" id="channel" required class="form-control" value={channel} onChange={(channel) => this.setState({channel: channel.target.value})}>
                                        <option value="">--Select a channel--</option>
                                        <option value="payments">Payments</option>
                                        <option value="reports">Reports</option>
                                        <option value="subscriptions">Subscriptions</option>
                                        <option value="suggestions">Suggestions</option>
                                        <option value="others">Others</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="col-sm-12">
                                    <div class="form-group">
                                      <label for="body">Message</label>
                                      <textarea name="body" id="body" class="form-control" rows="5"></textarea>
                                    </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-6">
                                    <div class="form-group">
                                      <button type="submit" class="btn secondary-btn">Submit</button>    
                                    </div>    
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {
    createNewThread
  }
)(Create);