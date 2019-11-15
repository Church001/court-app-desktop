import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
export default class readOffline extends Component {

  constructor(props){
    super(props)   
    this.state={
      currentPath: 'fullreport',
      data: [],
    }
  }

  handleLinkClicked(currentPath) {
    this.setState({
      currentPath
    });
  }
  componentWillMount(){
    if( this.props.location.data === undefined) {
      this.props.history.goBack()
      // console.log(this.props.history)
    }
  }
  componentDidMount(){
    console.log({widnow: window})
    console.log('offlinedata done show ...', this.props.location.data);
    this.setState({
      data: this.props.location.data,
    });

  }

  createMarkup = () => {
    return {__html: this.state.data.content};
  }
  render() {
    const { currentPath, data } = this.state;

    return (
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12 search">
            <form action="" method="get">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text purple lighten-8" id="basic-text1">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </span>
                </div>
                <input class="form-control my-0 py-1" type="text" placeholder="Search anything" aria-label="Search" name="query" />
              </div>
            </form>
          </div>
        </div>
        <div className="card">
           {/* <div className="card">
              <div className="card-body">
                <ul class="nav nav-tabs">
                  <li className="nav-item">
                    <Link onClick={() => this.handleLinkClicked('fullreport')} to={`${this.props.match.path}`}
                      className={currentPath === 'fullreport' ? 'active' : ''}>
                      Full Report
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={() => this.handleLinkClicked('ratios')} className={currentPath === 'ratios' ? 'active' : ''} to={`${this.props.match.path}ratios`}>
                      Ratios
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={() => this.handleLinkClicked('citedauthorities')} className={currentPath === 'citedauthorities' ? 'active' : ''} to={`${this.props.match.path}citedauthorities`}>
                      Cited Authorities
                    </Link>
                  </li>
                </ul>
              </div>
            </div> */}
      
          <div class="card-body">
            <h3 className="card-title">{data.title}</h3>
            <p className="citation">citation: { data.citation }</p>
              <div id="container" dangerouslySetInnerHTML={this.createMarkup()}></div>
          </div> 
        </div>
      </div>
    );
  }
}
