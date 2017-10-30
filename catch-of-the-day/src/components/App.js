import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFish from '../sample-fishes.js';
import Fish from './Fish';
import  base from '../base';


class App extends React.Component {
	constructor(){
		super();
		this.AddFish = this.AddFish.bind(this);
		this.loadSample = this.loadSample.bind(this);
		this.EditFish = this.EditFish.bind(this);
		this.DeleteFish = this.DeleteFish.bind(this);
		this.DeleteFormOrder = this.DeleteFormOrder.bind(this);
		this.state = {
			fishes : {},
			order : {}
		};
	}

	componentWillMount(){
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`,{
			context : this,
			state : 'fishes'
		});

		const localRef = localStorage.getItem(`order-${this.props.params.storeId}`);
		if(localRef){
			this.setState({
				order : JSON.parse(localRef)
			});
		}
	}

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState){
		localStorage.setItem(`order-${this.props.params.storeId}`,
			JSON.stringify(nextState.order));
	}

	AddFish = (fish) => {
		const fishes = {...this.state.fishes};
		const time = Date.now();

		fishes[`fish-${time}`] = fish;

		this.setState({fishes});
	}

	loadSample = () => {
		this.setState({
			fishes: sampleFish
		});
	}

	AddtoOrder = (key)=>{
		const order = {...this.state.order};
		order[key] = order[key] + 1 || 1;
		this.setState({order});
		//console.log(order);
	}

	DeleteFormOrder = (key)=>{
		const order = {...this.state.order};
		delete order[key];
		this.setState({order});
	}

	EditFish(key,data){
		const fishes = {...this.state.fishes};
		//console.log(this.state);
		fishes[key] = data;
		this.setState({fishes});
	}

	DeleteFish(key){
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({fishes});
	}

	render(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{
							Object
								.keys(this.state.fishes)
								.map(key => <Fish key={key} id={key} details={this.state.fishes[key]} addOrder={this.AddtoOrder}/>)
						}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					params={this.props.params}
					delete={this.DeleteFormOrder}
				/>
				<Inventory
					addFish={this.AddFish}
					name="Inventory"
					loadData={this.loadSample}
					fishes={this.state.fishes}
					editFish={this.EditFish}
					deleteFish={this.DeleteFish}
					storeId={this.props.params.storeId}
				/>
			</div>
			)
	}
}
export default App;
