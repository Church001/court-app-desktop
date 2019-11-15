import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import moment from 'moment';
import { connect } from 'react-redux';
import { getThreadMessages, createNewMessageInThread } from '../../redux/actions/supportActions';

class Single extends Component {
  state = {
    thread: {},
    message: ''
  }

  componentDidMount() {
    const { threadId } = this.props.match.params;

    this.props.getThreadMessages(threadId);
    const thread = this.props.threads.find(thread => thread.id == threadId);

    this.setState({
      thread
    });
  }

  handleSendMessage = () => {
    const { message, thread: { id } } = this.state;

    const data = {
      thread_id: id,
      body: message
    };

    this.props.createNewMessageInThread(data);
  }

  render() {
    const { thread, message } = this.state;
    const { messages, profile } = this.props;

    return (
      <div class="row">
        <div class="col-xl-12">
          <div class="space-120"></div>
          <div class="row">
            <div class="col-lg-10 support-col">
              <div class="panel-group" id="accordion">
                <div class="panel panel-default">
                  <div class="panel-heading" data-parent="#accordion" href="#collapse1">
                    <h4 class="panel-title">
                      { thread && (<span>[{ thread.channel }] { thread.subject }</span>) }
                    </h4>
                  </div>
                  <div id="collapse1" class="panel-collapse in exclude">
                    <div class="panel-body">
                      <div class="card">                    
                        <div class="card-body support-body">
                          <Link to="/dashboard/support" className="btn secondary-btn">&larr; Go Back</Link>
                          <br /><br />
                          {
                            messages && (
                              <ul class="media-list media-chat media-chat-scrollable mb-3">
                              {
                                messages.map(message => (message.user_id == profile.id) ? 
                                (
                                  <li class="media media-chat-item-reverse">
                                    <div class="media-body">
                                      <div class="media-chat-item media-chat-item-right">{ message.body }</div>
                                      <div class="font-size-sm white mt-2">{ moment(message.created_at).format('d-m-Y') }</div>
                                    </div>
                                  </li>
                                ) : (
                                  <li class="media">
                                    <div class="media-body">
                                      <div class="media-chat-item media-chat-item-left">
                                        { message.body }<br />
                                        From { message.user.name }
                                      </div>
                                      <div class="font-size-sm text-muted mt-2">{ moment(message.created_at).format('d-m-Y') }</div>
                                    </div>
                                  </li>
                                ))
                              }                                   
                              </ul>
                            )
                          }
                          
                          <div class="d-flex alig n-items-center row">  
                            <div class="col-12">
                              <form autocomplete="off"> 
                                <div class="row">
                                  <div class="col-10 light-green">
                                    <input type="text" class="form-control" name="body" placeholder="Type your message here..." onChange={(event) => this.setState({ message: event.target.value })} id="body" value={message} />
                                  </div>
                                  <div class="green-div col-2 send-ticket-wrapper" onClick={this.handleSendMessage}>
                                    <a href="javascript:void(0);" >
                                      <img src="/assets/images/icons/send.svg" alt="" />
                                    </a>
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

const mapStateToProps = ({ support, profile }) => ({
  threads: support.threads,
  messages: support.messages,
  profile: profile.profile
});

export default connect(
  mapStateToProps,
  {
    getThreadMessages,
    createNewMessageInThread
  }
)(Single);