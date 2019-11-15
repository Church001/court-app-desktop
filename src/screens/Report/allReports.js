import React, { Component } from 'react';
import '../styles.css';
import { axiosWrapper as axios } from '../../store';
import { getAllReport, AddFavoriteEndPoint, AddReadLaterEndPoint } from "../../utils/utils";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserProfile } from "../../redux/actions/profileAction";
import { getCategory, getDivision} from "../../redux/actions/reportsActions";
// Data import and connection NeDB
import Loader from 'react-loader-spinner';

var Datastore = require('nedb');
var db = new Datastore({ filename: '../../utils/offlinedb.db', autoload: true });
db.ensureIndex({ fieldName: 'id', unique: true });

class AllReports extends Component {
  constructor(props){
    super(props);
    this.state ={
      data:[],
      filterData:[],
      secondFilter: [],
      nextDataLink:'',
      prevDataLink: '',
      nextBtnStatus: true,
      prevBtnStatus:true,
      isActive: false,
      last_page:0,
      current_page:0,
      search: '',
      profile: {},
      errors:{},
      divisions: {},
      categories: {},
      visibility: false,
      alphabetVisible: false,
      divisionVisible: false,
      categoryVisible: false,
      paginationVisible: true,
    }
  }
  async componentDidMount() {
    await this.handleGetAllReport();

  }

  handleGetProfile =async()=>{
    await this.props.getUserProfile();
    await this.props.getCategory();
    return await this.props.getDivision();
  }

  toggleVisibility = () => {
    this.setState ({
      visibility: !this.state.visibility,
      alphabetVisible: false,
      divisionVisible: false,
      categoryVisible: false,
    })
  }
  toggleAlphabet = () => {
    this.setState ({
      alphabetVisible: !this.state.alphabetVisible,
      visibility: false,
      divisionVisible: false,
      categoryVisible: false,
    })
  }
  toggleDivision = () => {
    this.setState({
      divisionVisible: !this.state.divisionVisible,
      visibility: false,
      alphabetVisible: false,
      categoryVisible: false,
      paginationVisible: (this.state.divisionVisible === true ) ? true :false,
    });
  }
  toggleCategory = () => {
    this.setState({
      categoryVisible: !this.state.categoryVisible,
      visibility: false,
      alphabetVisible: false,
      divisionVisible: false,
      paginationVisible: (this.state.categoryVisible === true ) ? true :false,
    });
  }

  componentWillReceiveProps(nextProps){

    console.log({newxPropppppp: nextProps});
    if(nextProps.profile) {
      this.setState({
        profile: nextProps.profile,
        
      })
    }
    if(nextProps.categories){
      this.setState({
        categories: nextProps.categories,
      })
    }
    if(nextProps.divisions){
      console.log({nextptop: nextProps.divisions})
      this.setState({
        divisions: nextProps.divisions
      });
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      })
    }

  }

  // trying to use update as insert afer checking for docs
  handleDbUpdate = () => {
    const {data} = this.state;
    // console.log('i am doing update here');
    // db.update({ _id: 'id6' }, { $addToSet: data }, {}, function () {
    // });
    db.find({}, function (err, docs) {
      console.log('i am doing update here', docs);

    })

  }
  handleFindReport = () => {
    const {data} = this.state;

    // Find all documents in the collection
    db.find({}, function (err, docs) {
      if(docs.length === 0 || docs === null || docs === undefined ){
        console.log('working2222');
        db.insert( data, function (err, newDoc) {  
          // newDoc is the newly inserted document
          console.log('offline reprot db', newDoc);

        });
      }
      else{
        db.insert( data, function (err, newDoc) {  
          // newDoc is the newly inserted document
          console.log('offline reprot db22222', newDoc);
        });
        // return this.handleDbgfUpdate();
      }
    });
  }

   // search filter 
   searchFilterFunction = (e) => {
    e.preventDefault();     
    const {filterData, } = this.state;
    const newData = filterData.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.citation.toUpperCase()}${item.content.toUpperCase()}`;
      const textData =  e.target.value.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    return this.setState({
      data: newData,
    });
  }

  handleGetAllReport = async() => {
    try {
      return await this.allReport()
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());
    }
  }

  allReport = async()  => {
    const token = localStorage.getItem("jwtToken");
    let status = 'expired'
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    await axios
      .get(getAllReport, {
        "headers": headers,
      })
      .then(res => {
        // console.log('daatata:', res.data.links.prev );
        if (typeof res.message !== 'undefined') {
          return toast(res.message.toString())
        }
        else {
          this.setState({
            data: res.data.data,
            filterData: res.data.data,
            prevBtnStatus: res.data.links.prev ? false : true,
            nextBtnStatus: res.data.links.next ? false : true,
            current_page: res.data.meta.current_page,
            last_page: res.data.meta.last_page,
            nextDataLink: res.data.links.next,
            prevDataLink: res.data.links.prev,
          });
          this.handleFindReport();
          this.handleGetProfile();
          if(this.state.profile.subscription !== null || this.state.profile.subscription !== undefined){
            status = this.state.profile.subscription.status;     
          }
          this.setState({
            isActive : status === 'active' ? true : false,
          });
        }
      })
      .catch(err => {
        console.log('error', err.toString());
      });
  };
  
  loadNextData = async(url) => {
    const token = localStorage.getItem("jwtToken")
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    await axios
      .get(url, {
        "headers": headers,
      })
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return console.log('error', res.message);
        }   
        else {    
          this.setState({
            data: res.data.data,
            filterData: res.data.data,
            prevBtnStatus: res.data.links.prev ? false : true,
            nextBtnStatus: res.data.links.next ? false : true,
            current_page: res.data.meta.current_page,
            last_page: res.data.meta.last_page,
            nextDataLink: res.data.links.next,
            prevDataLink: res.data.links.prev,
            // isFetching: false, 
          });
          this.handleFindReport();
        }
      }
    ).catch(error=>alert('error', error.toString()));
  };

  loadPrevData = async(url) => {
    // this.handleDbUpdate();
    const token = localStorage.getItem("jwtToken")
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    await axios
      .get(url, {
        "headers": headers,
      })
      .then((res) => {
        console.log('helloPrev', res)

        if (typeof res.message !== 'undefined') {  
          return this.showNotification('error', 'Message', res.message);
        }   
        else {  
          this.setState({
            data: res.data.data,
            filterData: res.data.data,
            prevBtnStatus: res.data.links.prev ? false : true,
            nextBtnStatus: res.data.links.next ? false : true,
            current_page: res.data.meta.current_page,
            last_page: res.data.meta.last_page,
            nextDataLink: res.data.links.next,
            prevDataLink: res.data.links.prev,
            // isFetching: false, 
          });
        }
      }
    ).catch(error=>alert('error', error.toString()));
  };

  handleAddFavorite = async(id) => {
    console.log('Clicked report favorite ');
    const token = localStorage.getItem("jwtToken")
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    let endpoint = `${AddFavoriteEndPoint}${id}/favorite`;
    await axios.post(endpoint, {
      'headers': headers,
    })
    .then((res)=>{
      if (res.status >= 200 && res.status < 300) {    
        toast('Report successfully added to Favorites.');
      }
      else {
        return toast('Failed To Add Report')
      }
    })
    .catch((error) =>{
      if (error.response) {
        const { message } = error.response.data;
  
        toast(message);
      } else {
        toast('An error occured. Please try again.');
      }
    })
  }
  
  handleAddReadLater = async(id) => {
    const token = localStorage.getItem("jwtToken")
    console.log('Clicked report read later');
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    let endpoint = `${AddReadLaterEndPoint}${id}/future`;

    await axios.post(endpoint, {
      'headers': headers,
    })
    .then((res)=>{
      if (res.status >= 200 && res.status < 300) {    
        toast('Report successfully added to Read Later.');
      }
      else {
        console.log('hello')
        toast('Failed To Add Report')
      }
    })
    .catch ((error) => {
      if (error.response) {
        const { message } = error.response.data;
  
        toast(message.toString());
      } else {
        toast('An error occured. Please try again.');
      }
    }) 
      
  }

  handleFullReport = async(report) => {
    console.log("TESTING123", this.props)
    if(this.state.isActive === true) {
      this.props.history.push({
        pathname: '/dashboard/fullreport',
        data: report
      })
    }
    else {
      await toast('Please Subscribe to have Full Access');
      return await setTimeout(() => {
        this.props.history.push({
          pathname: 'dashboard/subscriptions'
        })
      }, 3000)
    }
  
  }

  handlePagination=e=>{
    e.preventDefault()
    this.props.nextReportPage()
  }

   //filter citation numberts
  handleCitationPress = (citation) => {

    const {filterData} = this.state;
    // const newData = filterData.filter(item => {const itemData = item.citation.split('-')[3].substring(0);
    const newData = filterData.filter(item => {const itemData = item.citation.split('-')[3].substring(0, 1) == citation;
    // const textData = citation
      // return itemData.indexOf(textData) > -1;

      return itemData;
    });
    return this.setState({
      data: newData,
      secondFilter: newData,
    });
  }
    // Filter by citation alphabets
  // Filter by citation alphabets
  handleCitationAlph = (citationAlph) => {                              
    console.log({nummmmmmm: citationAlph})
    const {filterData, secondFilter} = this.state;
    if(secondFilter.length > 0 ){
      const newData = secondFilter.filter(item => { 
        const itemData = item.title.substring(0, 1).toUpperCase() === citationAlph.toUpperCase();
        return itemData;
      });
      return this.setState({
        data: newData,
      });  
    }
    
    const newData = filterData.filter(item => { 
      const itemData = item.title.substring(0, 1).toUpperCase() === citationAlph.toUpperCase();
      return itemData;
    });
    return this.setState({
      data: newData,
    });
  }
    

  render() {
    const {data, current_page, last_page, nextDataLink, prevDataLink, divisions } = this.state
    console.log('diviviviviv: ', divisions);
    console.log('categoryyyyyy: ', this.state.categories);

    const { loading } = this.props;

    return (
      <div className="row">
        <div className="col-sm-8 main-dash">
          <div className="row">
            <div class="col-sm-12 search">
              <form onSubmit={e => { e.preventDefault(); }}>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text purple lighten-8" id="basic-text1">
                      <i class="fas fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input 
                    class="form-control my-0 py-1" 
                    type="text" 
                    name="search"
                    placeholder="Search anything" 
                    onChange={ this.searchFilterFunction}
                    aria-label="Search" 
                   />
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
          {
            data.map(report => (
              <div className="card card-cont">
              {/* {console.log('data in return', report.id)} */}
                <div className="card-body">
                  <h4>
                    <p className="tag" 
                        onClick={() => this.handleFullReport(report)}>
                      { report.title }
                    </p>
                  </h4>
                  <p className="citation">citation: { report.citation }</p>
                  <p className="textTruncate">{report.excerpt}</p>
                  <button className="btn btn-primary" onClick={() => this.handleAddFavorite(report.id)} ><i className="fas fa-heart"></i> Add to Favourite</button>
                  <button className="btn btn-danger buttonStyle" onClick={() => this.handleAddReadLater(report.id)}><i className="fas fa-history"></i> Read later</button>
                </div>
              </div>
            ))
          }
          {(this.state.paginationVisible) ?
            <div className="cardColor">
              <div className="row btn-view">
                <button id="prev-btn-color" onClick={() => this.loadPrevData(prevDataLink)} className="btn btn-dark">Prev</button>
                <div className="page-container row">
                  <p className="paginationTxt">{`Page ${current_page} of ${last_page}`}</p>
                </div>
                <button id="next-btn-color" onClick={() => this.loadNextData(nextDataLink)} className="btn btn-dark side-right">Next</button>
              </div>
            </div> :
            null
          }
        </div>

        <div className="col-sm-4">
          <div className="row">
            <div class="col-lg-12">
              <div class="card dashboard-tip">
                <div class="card-body">
                  <h3>Toggle Filters</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-12 side-left to">
                <div className="panel-group" id="accordion">
                  {/* citation */}
                  <div className="toggle-view" onClick={this.toggleVisibility}>
                    <div className="row">
                      <div className="col-2 flex">
                          <i className="fas fa-caret-down"></i>
                      </div>
                      <div className="col-10">
                        <h5>Citation 0 - 9</h5>
                        <p className="subheader-txt">Filter Reports by Citation.</p>
                      </div>
                    </div>
                    </div>
                    {(this.state.visibility) ? 
                      <div className ="card">
                        <div className="card-body">
                          <ul className="nav">
                            {
                              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => 
                              <li>
                                <p className="linkTxt" key = {index} onClick = {()=> this.handleCitationPress(num)}>
                                  
                                  {num}
                                </p>
                              </li>)
                            }
                          </ul>
                        </div>
                      </div> : 
                        null
                    }
                    {/* end of citation */}

                    {/* Alphabet */}
                    <div className="toggle-view" onClick={this.toggleAlphabet}>
                      <div className="row">
                        <div className="col-2 flex">
                            <i className="fas fa-caret-down"></i>
                        </div>
                        <div className="col-10">
                          <h5>Alphabet A - Z</h5>
                          <p className="subheader-txt">Filter reports Aphabetically.</p>
                        </div>
                      </div>
                    </div>
                    {(this.state.alphabetVisible) ? 
                      <div className ="card">
                        <div className="card-body">
                          <ul className="nav">
                            {
                              'abcdefghijklmnopqrstuvwxyz'.split('').map((letter, index) => 
                                <li>
                                  <p className="linkTxt" key={index} onClick ={()=>this.handleCitationAlph(letter)}>
                                    {String(letter).toUpperCase()}
                                  </p>
                                </li>)
                            }
                          </ul>
                        </div>
                      </div> : 
                        null
                    }
                    {/* end of alphabet */}

                    {/* Division */}
                    <div className="toggle-view" onClick={this.toggleDivision}>
                      <div className="row">
                        <div className="col-2 flex">
                            <i className="fas fa-caret-down"></i>
                        </div>
                        <div className="col-10">
                          <h5>Division 1 - 16</h5>
                          <p className="subheader-txt">
                            Filter Reports from the 16 Divisions of the Court of Appeal.
                          </p>
                        </div>
                      </div>
                    </div>
                    {(this.state.divisionVisible) ? 
                      <div className ="card">
                        <div className="card-body">
                          <ul className="nav">
                            {
                              this.state.divisions.name.map(division => 
                              <li>
                                <a className="linkTxt" href="#">
                                  { division }
                                </a>
                              </li>)
                            }
                          </ul>
                        </div>
                      </div> : 
                        null
                    }
                    {/* end of division */}
                   
                    {/* Categories
                     */}
                    <div className="toggle-view" onClick={this.toggleCategory}>
                      <div className="row">
                        <div className="col-2 flex">
                            <i className="fas fa-caret-down"></i>
                        </div>
                        <div className="col-10">
                          <h5>Categories</h5>
                          <p className="subheader-txt">
                            Filter Reports by Categories.                          
                          </p>
                        </div>
                      </div>
                    </div>
                    {(this.state.categoryVisible) ? 
                      <div className ="card">
                        <div className="card-body">
                          <ul className="nav">
                            {
                              this.state.categories.name.map(categories=> 
                                <li>
                                  <a className="linkTxt" href="#">
                                    { categories }
                                  </a>
                                </li>)
                            }
                          </ul>
                        </div>
                      </div> : null
                    }
                    {/* end of division */}
                </div>         
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AllReports.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  divisions: PropTypes.object.isRequired,
  getCategory: PropTypes.func.isRequired,
  getDivision: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  report: state.reports,
  // divisions: state.divisions,
  // categories: state.categories,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { 
    getUserProfile,
    getDivision,
    getCategory
  }
)(withRouter(AllReports));
