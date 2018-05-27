import React from 'react'
import './FilterView.scss'
import PropTypes from 'prop-types'
import {Col,Radio,FormGroup,ControlLabel,FormControl,HelpBlock,Button} from 'react-bootstrap'


export class Filter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      value: '',
      category:'',
      isMounted: false
    };
  }

  componentDidMount() {
      this.setState({isMounted: true})
  }
  componentWillUnmount(){
      this.setState({isMounted: false})
  }

  reset(){
    let searchObj = {'type':'','keyword':''};
    this.setState({ value:'',category:'' });
    this.props.callbackFromParent(searchObj);
  }

  handleChange(e){
    let searchObj ={};
  if (this.state.isMounted) {
    this.setState({ value: e.target.value });
    if(this.state && this.state.category==''){
      searchObj = {'type':e.target.value,'keyword':e.target.value};
    }
    else{
      searchObj = {'type':this.state.category,'keyword':e.target.value};
    }
    this.props.callbackFromParent(searchObj);

    }


  }

  selectCategory(e){
    let searchObj ={};
    if (this.state.isMounted) {
      this.setState({ category: e.target.value });
      if(this.state && this.state.value==''){
        searchObj = {'type':e.target.value,'keyword':e.target.value};
      }
      else{
        searchObj = {'type':e.target.value,'keyword':this.state.value};
      }

      this.props.callbackFromParent(searchObj);

      }
  }


  render() {
    return (
      <div className="filterContainer">
      <div>
        <div className="categories">
          <div className="labelContainer">
          <div className="label">Categories</div>
          <div className="reset" onClick={this.reset}>Reset</div>
          </div>
          <FormGroup>
            <Radio name="radioGroup" value="" className="hideRadio">
            </Radio>
              <Radio name="radioGroup" value="atm" onClick={this.selectCategory}>
                <span>Atm</span>
              </Radio>
              <Radio name="radioGroup" value="banks" onClick={this.selectCategory} >
                <span>Banks</span>
              </Radio>
              <Radio name="radioGroup" value="pharmacy" onClick={this.selectCategory} >
                <span>Pharmacy</span>
              </Radio>
              <Radio name="radioGroup" value="hospital" onClick={this.selectCategory}>
                <span>Hospital</span>
              </Radio>
              <Radio name="radioGroup" value="airport" onClick={this.selectCategory} >
                <span>Airport</span>
              </Radio>
              <Radio name="radioGroup" value="local_government_office" onClick={this.selectCategory}>
              <span>Government office</span>
              </Radio>
              <Radio name="radioGroup" value="train station" onClick={this.selectCategory}>
                <span>Train stations</span>
              </Radio>
              <Radio name="radioGroup" value="bus_station" onClick={this.selectCategory}>
                <span>Bus stops</span>
              </Radio>
              <Radio name="radioGroup" value="restaurant" onClick={this.selectCategory} >
                <span>Restaurant</span>
              </Radio>
          </FormGroup>
        </div>
        <div className="location">
        <div className="label">Location</div>
        <form>
          <FormGroup
            controlId="formBasicText"
          >
            <FormControl ref="myRef"
              type="text"
              value={this.state.value}
              placeholder="Search for a location "
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
        </div>

      </div>
      </div>
    );
  }
}
