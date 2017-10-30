import React from 'react';
import {formatPrice} from '../helpers.js';
class Fish extends React.Component {

  render(){
    const { details } = this.props;
    const isAvailabe = details.status === 'available';
    const btnOrder = (isAvailabe)? 'Add to Order' : 'Sold Out!';
    return(
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name" >
            {details.name}
            <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailabe} onClick={()=>this.props.addOrder(this.props.id)}>{btnOrder}</button>
      </li>
    );
  }
}

Fish.propTypes = {
  addOrder : React.PropTypes.func.isRequired,
  details : React.PropTypes.object.isRequired
}

export default Fish;
