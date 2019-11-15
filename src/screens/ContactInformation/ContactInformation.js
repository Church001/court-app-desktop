import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import classnames from "classnames"
import { axiosWrapper as axios } from '../../store';
import { getUserProfile } from "../../redux/actions/profileAction";
import {getAllReport} from "../../utils/utils";
class ContactInformation extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      profile: {},
      token: "",
      data: []
    };
  }

  async componentDidMount (){
    const token = localStorage.getItem("jwtToken");
    await this.handleGetProfile();
    await this.setState({
      token: token
    });
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.profile) {

      this.setState({
        profile: nextProps.profile,
      })
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      })
    }

  }
  handleGetProfile =()=>{
    this.props.getUserProfile()
  }
  handleGetAllReport = async() => {
    try {
      return await this.allReport()
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());
    }
  }
  // Call all reports

  allReport = async() =>{
    const {token} = this.state;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    await axios(getAllReport, token, {
      "headers" : headers
    })
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return this.showNotification('error', 'Message', res.message);
        }   
        else {    
          this.setState({
            data: res.data,
            // filterData: res.data,
            // prevBtnStatus: res.links.prev ? false : true,
            // nextBtnStatus: res.links.next ? false : true,
            // current_page_no: res.meta.current_page,
            // last_page_no: res.meta.last_page,
            // nextDataLink: res.links.next,
            // prevDataLink: res.links.prev,
            // isFetching: false, 
          });
          return this.hideLoadingDialogue();
        }
      }
    )
    .catch(error=>
      this.showNotification('error', 'Message', error.toString()));
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { profile, errors } = this.state;
    console.log("PROFILE_SUCCESS", profile);
    return (
      <div className="register">
        <div class="card ">
          <div class="card-body">
            <ul class="nav account-head">
                <li><a id="navLnik" className=" navbar-brand" href="/account_setting">Personal Details</a></li>
                <li><a id="navLnik" className="active navbar-brand" href="/contact_information">Contact Information</a></li>
                <li><a id="navLnik" className="navbar-brand" href="/security">Security</a></li>
            </ul>
          </div>
        </div>
        {/* <NavCard/> */}
        <div id="card_style" className="card" >
          <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstname">Address *</label>
                  <input
                    type="text"
                    id="firstname"
                    className='form-control'
                    placeholder="Enter Address"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                  {
                    this.state.errors.name !== "" && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div class="form-group row">

                 <div class="col-xs-12 col-sm-6">
                   <label for="nationality">Country <span class="sup">*</span></label> 
                   <select name="country" id="country" class="form-control">
                     <option value="-1">Select Country</option><option value="Afghanistan">Afghanistan</option><option value="Albania">Albania</option><option value="Algeria">Algeria</option><option value="American Samoa">American Samoa</option><option value="Angola">Angola</option><option value="Anguilla">Anguilla</option><option value="Antartica">Antartica</option><option value="Antigua and Barbuda">Antigua and Barbuda</option><option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Aruba">Aruba</option><option value="Ashmore and Cartier Island">Ashmore and Cartier Island</option><option value="Australia">Australia</option><option value="Austria">Austria</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahamas">Bahamas</option><option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option><option value="Barbados">Barbados</option><option value="Belarus">Belarus</option><option value="Belgium">Belgium</option><option value="Belize">Belize</option><option value="Benin">Benin</option><option value="Bermuda">Bermuda</option><option value="Bhutan">Bhutan</option><option value="Bolivia">Bolivia</option><option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option><option value="Botswana">Botswana</option><option value="Brazil">Brazil</option><option value="British Virgin Islands">British Virgin Islands</option><option value="Brunei">Brunei</option><option value="Bulgaria">Bulgaria</option><option value="Burkina Faso">Burkina Faso</option><option value="Burma">Burma</option><option value="Burundi">Burundi</option><option value="Cambodia">Cambodia</option><option value="Cameroon">Cameroon</option><option value="Canada">Canada</option><option value="Cape Verde">Cape Verde</option><option value="Cayman Islands">Cayman Islands</option><option value="Central African Republic">Central African Republic</option><option value="Chad">Chad</option><option value="Chile">Chile</option><option value="China">China</option><option value="Christmas Island">Christmas Island</option><option value="Clipperton Island">Clipperton Island</option><option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option><option value="Colombia">Colombia</option><option value="Comoros">Comoros</option><option value="Congo, Democratic Republic of the">Congo, Democratic Republic of the</option><option value="Congo, Republic of the">Congo, Republic of the</option><option value="Cook Islands">Cook Islands</option><option value="Costa Rica">Costa Rica</option><option value="Cote d'Ivoire">Cote d'Ivoire</option><option value="Croatia">Croatia</option><option value="Cuba">Cuba</option><option value="Cyprus">Cyprus</option><option value="Czeck Republic">Czeck Republic</option><option value="Denmark">Denmark</option><option value="Djibouti">Djibouti</option><option value="Dominica">Dominica</option><option value="Dominican Republic">Dominican Republic</option><option value="Ecuador">Ecuador</option><option value="Egypt">Egypt</option><option value="El Salvador">El Salvador</option><option value="Equatorial Guinea">Equatorial Guinea</option><option value="Eritrea">Eritrea</option><option value="Estonia">Estonia</option><option value="Ethiopia">Ethiopia</option><option value="Europa Island">Europa Island</option><option value="Falkland Islands (Islas Malvinas)">Falkland Islands (Islas Malvinas)</option><option value="Faroe Islands">Faroe Islands</option><option value="Fiji">Fiji</option><option value="Finland">Finland</option><option value="France">France</option><option value="French Guiana">French Guiana</option><option value="French Polynesia">French Polynesia</option><option value="French Southern and Antarctic Lands">French Southern and Antarctic Lands</option><option value="Gabon">Gabon</option><option value="Gambia, The">Gambia, The</option><option value="Gaza Strip">Gaza Strip</option><option value="Georgia">Georgia</option><option value="Germany">Germany</option><option value="Ghana">Ghana</option><option value="Gibraltar">Gibraltar</option><option value="Glorioso Islands">Glorioso Islands</option><option value="Greece">Greece</option><option value="Greenland">Greenland</option><option value="Grenada">Grenada</option><option value="Guadeloupe">Guadeloupe</option><option value="Guam">Guam</option><option value="Guatemala">Guatemala</option><option value="Guernsey">Guernsey</option><option value="Guinea">Guinea</option><option value="Guinea-Bissau">Guinea-Bissau</option><option value="Guyana">Guyana</option><option value="Haiti">Haiti</option><option value="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option><option value="Holy See (Vatican City)">Holy See (Vatican City)</option><option value="Honduras">Honduras</option><option value="Hong Kong">Hong Kong</option><option value="Howland Island">Howland Island</option><option value="Hungary">Hungary</option><option value="Iceland">Iceland</option><option value="India">India</option><option value="Indonesia">Indonesia</option><option value="Iran">Iran</option><option value="Iraq">Iraq</option><option value="Ireland">Ireland</option><option value="Ireland, Northern">Ireland, Northern</option><option value="Israel">Israel</option><option value="Italy">Italy</option><option value="Jamaica">Jamaica</option><option value="Jan Mayen">Jan Mayen</option><option value="Japan">Japan</option><option value="Jarvis Island">Jarvis Island</option><option value="Jersey">Jersey</option><option value="Johnston Atoll">Johnston Atoll</option><option value="Jordan">Jordan</option><option value="Juan de Nova Island">Juan de Nova Island</option><option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option><option value="Kiribati">Kiribati</option><option value="Korea, North">Korea, North</option><option value="Korea, South">Korea, South</option><option value="Kuwait">Kuwait</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Laos">Laos</option><option value="Latvia">Latvia</option><option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option><option value="Liberia">Liberia</option><option value="Libya">Libya</option><option value="Liechtenstein">Liechtenstein</option><option value="Lithuania">Lithuania</option><option value="Luxembourg">Luxembourg</option><option value="Macau">Macau</option><option value="Macedonia, Former Yugoslav Republic of">Macedonia, Former Yugoslav Republic of</option><option value="Madagascar">Madagascar</option><option value="Malawi">Malawi</option><option value="Malaysia">Malaysia</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option><option value="Malta">Malta</option><option value="Man, Isle of">Man, Isle of</option><option value="Marshall Islands">Marshall Islands</option><option value="Martinique">Martinique</option><option value="Mauritania">Mauritania</option><option value="Mauritius">Mauritius</option><option value="Mayotte">Mayotte</option><option value="Mexico">Mexico</option><option value="Micronesia, Federated States of">Micronesia, Federated States of</option><option value="Midway Islands">Midway Islands</option><option value="Moldova">Moldova</option><option value="Monaco">Monaco</option><option value="Mongolia">Mongolia</option><option value="Montserrat">Montserrat</option><option value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option><option value="Namibia">Namibia</option><option value="Nauru">Nauru</option><option value="Nepal">Nepal</option><option value="Netherlands">Netherlands</option><option value="Netherlands Antilles">Netherlands Antilles</option><option value="New Caledonia">New Caledonia</option><option value="New Zealand">New Zealand</option><option value="Nicaragua">Nicaragua</option><option value="Niger">Niger</option><option value="Nigeria">Nigeria</option><option value="Niue">Niue</option><option value="Norfolk Island">Norfolk Island</option><option value="Northern Mariana Islands">Northern Mariana Islands</option><option value="Norway">Norway</option><option value="Oman">Oman</option><option value="Pakistan">Pakistan</option><option value="Palau">Palau</option><option value="Panama">Panama</option><option value="Papua New Guinea">Papua New Guinea</option><option value="Paraguay">Paraguay</option><option value="Peru">Peru</option><option value="Philippines">Philippines</option><option value="Pitcaim Islands">Pitcaim Islands</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option><option value="Puerto Rico">Puerto Rico</option><option value="Qatar">Qatar</option><option value="Reunion">Reunion</option><option value="Romainia">Romainia</option><option value="Russia">Russia</option><option value="Rwanda">Rwanda</option><option value="Saint Helena">Saint Helena</option><option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option><option value="Saint Lucia">Saint Lucia</option><option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option><option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option><option value="Samoa">Samoa</option><option value="San Marino">San Marino</option><option value="Sao Tome and Principe">Sao Tome and Principe</option><option value="Saudi Arabia">Saudi Arabia</option><option value="Scotland">Scotland</option><option value="Senegal">Senegal</option><option value="Seychelles">Seychelles</option><option value="Sierra Leone">Sierra Leone</option><option value="Singapore">Singapore</option><option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="Solomon Islands">Solomon Islands</option><option value="Somalia">Somalia</option><option value="South Africa">South Africa</option><option value="South Georgia and South Sandwich Islands">South Georgia and South Sandwich Islands</option><option value="Spain">Spain</option><option value="Spratly Islands">Spratly Islands</option><option value="Sri Lanka">Sri Lanka</option><option value="Sudan">Sudan</option><option value="Suriname">Suriname</option><option value="Svalbard">Svalbard</option><option value="Swaziland">Swaziland</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option><option value="Syria">Syria</option><option value="Taiwan">Taiwan</option><option value="Tajikistan">Tajikistan</option><option value="Tanzania">Tanzania</option><option value="Thailand">Thailand</option><option value="Tobago">Tobago</option><option value="Toga">Toga</option><option value="Tokelau">Tokelau</option><option value="Tonga">Tonga</option><option value="Trinidad">Trinidad</option><option value="Tunisia">Tunisia</option><option value="Turkey">Turkey</option><option value="Turkmenistan">Turkmenistan</option><option value="Tuvalu">Tuvalu</option><option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="United Arab Emirates">United Arab Emirates</option><option value="United Kingdom">United Kingdom</option><option value="Uruguay">Uruguay</option><option value="USA">USA</option><option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="Venezuela">Venezuela</option><option value="Vietnam">Vietnam</option><option value="Virgin Islands">Virgin Islands</option><option value="Wales">Wales</option><option value="Wallis and Futuna">Wallis and Futuna</option><option value="West Bank">West Bank</option><option value="Western Sahara">Western Sahara</option><option value="Yemen">Yemen</option><option value="Yugoslavia">Yugoslavia</option><option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option></select>
                 </div>

                  <div class="col-xs-12 col-sm-6">
                      <label for="state">State <span class="sup">*</span></label>
                      <select name="state" id="state" class="form-control">
                          <option value="Lagos" selected>Lagos</option>
                      </select>
                  </div>
                </div>
                {/* Email and phone Container */}
                <div className="col-xs-12 col-sm-6">
                  <label htmlFor="state">City <span className="sup">*</span></label>
                  <select name="state" id="state" className="form-control">
                      <option value="jos" selected>jos</option>
                  </select>
                </div>

                <div id="btnView" className='form-group'>
                  <button 
                    className="btn btn-dark btn-block" 
                    id="btn-color"
                    onClick={this.onSubmit}>
                    Update
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
ContactInformation.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(withRouter(ContactInformation));
