import React from 'react'
import './CardView.scss'
import PropTypes from 'prop-types'
import {Grid,Row,Col} from 'react-bootstrap'

export class Card extends React.Component {

constructor(props, context) {
  super(props, context);
  this.getImageUrl = this.getImageUrl.bind(this);
}

getImageUrl(photos){
  console.log(photos)
  if(!photos){
    return ''
  }
  let photo = photos[0]
  let maxheight = '250';
  //
  let photoreference = photo.photo_reference|| '';
  let src = "https://maps.googleapis.com/maps/api/place/photo?maxheight="+maxheight+"&photoreference="+photoreference+"&key=AIzaSyDcBeUlr4uNQaP9QUAsYK-oEyHgPlKtMCA";
  return src
}
  render(){
    return(
    <div className="card">
      <div className="card__inner">
      <div className="card__image">
      <img alt='Img' className='img' src={this.getImageUrl(this.props.result.photos) || this.props.result.icon} />
      </div>
      <div className="card__description">
        <h3 className="h6 card__title margin-bottom-xs txt-truncate line-height-sm">
          {this.props.result.name}
        </h3>
        <div className="card__location">
        <h3 className="card__location font-m txt-secondary line-height-default">{this.props.result.vicinity}</h3>

        </div>
      </div>
      </div>
    </div>
  )
  }

}




export default Card
