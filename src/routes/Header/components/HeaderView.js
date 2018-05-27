import React from 'react'
import './HeaderView.scss'
import Logo from '../assets/hdfclogo.png'
import PropTypes from 'prop-types'
import {Col,FormGroup,ControlLabel,FormControl,HelpBlock,Button} from 'react-bootstrap'

export class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
      isMounted: false
    };


  }

  componentDidMount() {
      this.setState({isMounted: true})
  }
  componentWillUnmount(){
      this.setState({isMounted: false})
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e){
  if (this.state.isMounted) {

    this.setState({ value: e.target.value });

  }
  this.props.callbackFromParent({'type':e.target.value,'keyword':e.target.value});
  }
  render() {
    return (
      <div className="headerContainer">
        <div className="logoContainer">
          <img alt='logo' className='logo' src={Logo} />
          <div className="name"> Nearby</div>
        </div>

        <div className="search">
        <div className="searchContainer">
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <FormControl ref="myRef"
              type="text"
              value={this.state.value}
              placeholder="Search restaurants, hotels, atms "
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
        </div>
        <button className='btn btn-secondary' onClick={() => search({type:'bus stops',keyword:'bus stops'})} >
          Search
        </button>
        </div>

      </div>
    );
  }
}


// export default Header
