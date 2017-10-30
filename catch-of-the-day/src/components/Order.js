import React from 'react';
import {formatPrice} from '../helpers.js';
import CSSTansitionGroup from 'react-addons-css-transition-group';
class Order extends React.Component {
	constructor(){
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }
	renderOrder = (key)=>{
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
		const button = <button onClick={() => this.props.delete(key)}>&times;</button>
    if(!fish || fish.status === 'unavailable'){
      return <li key={key} >
        Sorry, {fish ? fish.name : 'fish'} is no longer available
				{button}
				</li>
    }

    return (
      <li key={key}>
        <span>
					<CSSTansitionGroup
							component="span"
							className="count"
							transitionName="count"
							transitionEnterTimeout={250}
							transitionLeaveTimeout={250}
						>
						<span key={count}>{count}</span>
					</CSSTansitionGroup>
					lbs {fish.name} {button}
				</span>
        <span className="price">
          {formatPrice(count * fish.price)}
        </span>
      </li>
    );
  }
	render(){
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((prevTotal, key)=>{
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailabe = fish && fish.status ==='available';
			if(isAvailabe){
				return prevTotal + (count * fish.price || 0);
			}
			return prevTotal;
		}, 0);
		console.log(orderIds);
		return (
			<div className="order-wrap">
					<h2>Your Orders</h2>
					<CSSTansitionGroup
						className="order"
						component="ul"
						transitionName="order"
						transitionEnterTimeout={1000}
						transitionLeaveTimeout={1000}
						>
						{orderIds.map(this.renderOrder)}
						<li className="total">
							<strong>Total:</strong>
							{formatPrice(total)}
						</li>
					</CSSTansitionGroup>
			</div>
			)
	}
}

Order.propTypes = {
	fishes : React.PropTypes.object.isRequired,
	order : React.PropTypes.object.isRequired,
	params : React.PropTypes.object.isRequired,
	delete : React.PropTypes.func.isRequired
}

export default Order;
