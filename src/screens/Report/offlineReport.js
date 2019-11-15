import React, { Component } from 'react';
var Datastore = require('nedb');
var db = new Datastore({ filename: '../../utils/offlinedb.db', autoload: true });
db.ensureIndex({ fieldName: 'id', unique: true });

export default class OfflineReport extends Component {
  constructor(props){
    super(props);
    this.state ={
      data:[],
      cur: [],
      filterData:[],
    }
  }

  componentDidMount(){
   this.findReport();
  }
    // Find all documents in the collection
  findReport = () => {
    let that = this;
    db.find({}, function (err, docs) {
      if(docs.length === 0 || docs === null || docs === undefined ){
      console.log('No Records');
      var data = false
      }
      else {
        that.setState({
          cur:docs,
          filterData: docs,
        })
        // console.log({offlinnee: docs})
        return docs;
      }
      //return data
    });    
  }

  // search filter 
  searchFilterFunction = (e) => {
    e.preventDefault();     
    const {filterData, } = this.state;
    const newData = filterData.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.citation.toUpperCase()}${item.content.toUpperCase()}`;
      const textData =  e.target.value.toUpperCase();
      console.log('itemssss', itemData.indexOf(textData) > -1);
      return itemData.indexOf(textData) > -1;
    });
    return this.setState({
      cur: newData,
    });
  }

  handleFullReport = (report) => {
    console.log("TESTING", this.props.history)
    this.props.history.push({
      pathname: '/dashboard/readoffline',
      data: report
    })
  }

  render() {
    const { cur} = this.state;

    return (
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
        {
          cur.map(report => (
            <div className="card card-cont">
            {/* {console.log('data in return', report.id)} */}
              <div className="card-body">
                <h4>
                  <p className="tag" 
                      onClick={() => this.handleFullReport(report)}>
                    { report.title }
                  </p >
                </h4>
                <p className="citation">citation: { report.citation }</p>
                <p className="textTruncate">{report.excerpt}</p>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}
