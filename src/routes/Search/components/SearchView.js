import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './SearchView.scss'
import PropTypes from 'prop-types'
import {Row,Col,OverlayTrigger} from 'react-bootstrap'
import {Card} from '../../Card/components/CardView'
import {Header} from '../../Header/components/HeaderView'
import {Filter} from '../../../components/Filter/FilterView'
import {ShowFilterModal,CloseModal} from '../../../components/FilterModal/modules/modal'
import filtercontainer from '../../../components/FilterModal/containers/filtercontainer'
import InfiniteScroll from 'react-infinite-scroller';
import { ToastContainer, toast } from 'react-toastify';


var FontAwesome = require('react-fontawesome');

export default class SearchView extends React.Component {

constructor(props, context) {
  super(props, context);
  this.showLocalFilterModal = this.showLocalFilterModal.bind(this)
  this.showModal = this.showModal.bind(this);
  this.hideModal = this.hideModal.bind(this);
  this.loadFunc = this.loadFunc.bind(this);
  this.searchPlaces = this.searchPlaces.bind(this);
  this.searchPlacesFromModal = this.searchPlacesFromModal.bind(this);
  this.getUserLocation = this.getUserLocation.bind(this);
  this.state = {
      show: false,
      type:'',
      keyword:'',
      category:'',
      latitude:19.0022,
      longitude:72.8416
    };
}

componentDidMount() {
  this.getUserLocation()
}


getUserLocation(){
  const location = window.navigator && window.navigator.geolocation

    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        this.props.search(this.state);
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }
}

showLocalFilterModal(){
  console.log("HelpBlock");
  ShowFilterModal();
}

showModal = () => {
   this.setState({ show: true });
 }

 hideModal = () => {
   this.setState({ show: false });
 }

 searchPlaces(data){
   this.setState({ type: data.type,category:data.category});
   const {latitude,longitude} = this.state;
   data['latitude'] = latitude;
   data['longitude'] = longitude;
   this.props.search(data);
 }

 loadFunc(){
  console.log('loadFunc');
 }
 searchPlacesFromModal(data){
   this.searchPlaces(data)
 }



render() {
  return (

  <div>
  <Header  callbackFromParent={this.searchPlaces} className="header"></Header>
    <Row className="searchLayout">
    <Col  xs={6} md={3} className="filter"><Filter callbackFromParent={this.searchPlaces} ></Filter></Col>
    <Col xs={12} md={9} className="list">
    <InfiniteScroll
    pageStart={0}
    loadMore={this.loadFunc}
    hasMore={true || false}
    loader={this.props.isLoading==true&&<div className="loadingState" key={0}>
      <div className="loader"></div>
    </div>}>
    <div className="results">
    {this.props.list.results && this.props.list.results.length>0&&
        this.props.list.results.map((item, i) =>
          <Card result={item} key={i}></Card>
        )

    }

    </div>
    </InfiniteScroll>
    {
      this.props.list.status=='ZERO_RESULTS' &&
      <div className="emptyState">
        <img src="https://res4.nbstatic.in/static/images/no-result.svg" />
        <div> Sorry !! No search results found</div>
      </div>

    }
    {
      this.props.list.status=='OVER_QUERY_LIMIT' &&
      <div className="emptyState">
        <img src="https://res4.nbstatic.in/static/images/no-result.svg" />
        <div> Generate New API Key </div>
      </div>

    }
    </Col>


    </Row>

    <div className="float" onClick={this.showModal} >
      <img src="https://png.icons8.com/ios/50/000000/filter.png" className='my-float' />

      </div>
      <Modal show={this.state.show} handleClose={this.hideModal}  search={this.searchPlacesFromModal}>
          <p>Modal</p>
          <p>Data</p>
        </Modal>
  </div>

)
}
}


const Modal = ({ handleClose, show, children,search }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        <Filter callbackFromParent={search} ></Filter>
        <button className="modal-close-btn"
          onClick={handleClose}
        >
          Close
        </button>
      </section>
    </div>
  );
};
