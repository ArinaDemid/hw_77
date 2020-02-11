import React, {Component} from "react";
import Moment from 'react-moment';
import './GetMessages.css';
import ProductThumbnail from '../../components/ProductThumbnail/ProductThumbnail';

class GetMessage extends Component {

  render() {
    return (
      <div className='GetMessage'>
        <div>
          <Moment format="DD-MM-YYYY hh:mm:ss" className='GetMessage_date'>{this.props.date}</Moment>
          <p className='GetMessage_author'>Author: {this.props.author}</p>
          <p className='GetMessage_message'>Message: {this.props.message}</p>
        </div>
        <ProductThumbnail image={this.props.image} />
      </div>
    )
  }
};

export default GetMessage;