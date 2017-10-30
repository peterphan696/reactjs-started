import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base.js'
class Inventory extends React.Component {
	constructor(){
		super();
		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.logout = this.logout.bind(this);
		this.state = {
			uid : null,
			owner : null,
		}
	}

	componentDidMount(){
		base.onAuth((user) => {
			if(user){
				this.authHandler(null, {user});
			}
		});
	}

	handleChange(e,key){
		const fish = this.props.fishes[key];
		const updateFish = {
			...fish ,
			[e.target.name]: e.target.value
		};
		this.props.editFish(key,updateFish);
		console.log(e);
	}

	renderLogin(){
		return (
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to manager your store's inventory</p>
				<button className="facebook" onClick={() => this.authenticate('facebook')}>
					Login with Facebook
				</button>
			</nav>
		);
	}

	authenticate(provider){
		console.log({provider});
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	logout(){
		base.unauth();
		this.setState({uid:null});
	}

	authHandler(err, authData){
		console.log(authData);
		if(err){
			console.error(err);
			return ;
		}

		const storeRef = base.database().ref(this.props.storeId);
		storeRef.once('value', (snapshot) => {
			const data = snapshot.val() || {};

			if(!data.owner){
				storeRef.set({
					owner : authData.user.uid
				});
			}
			this.setState({
				uid : authData.user.uid,
				owner : data.owner || authData.user.uid
			});
		});
	}

	renderInventory = (key)=>{
		const fish = this.props.fishes[key];

		return(
			<div className="fish-edit" key={key}>
				<input name="name" type="text" placeholder="Fish Name" value={fish.name} onChange={(e) => this.handleChange(e,key)}/>
				<input name="price" type="text" placeholder="Fish Price" value={fish.price} onChange={(e) => this.handleChange(e,key)}/>
				<select type="text" name="status" value={fish.status} onChange={(e) => this.handleChange(e,key)}>
					<option value="availabel">Fresh!</option>
					<option value="unavailabel">Sold Out!</option>
				</select>
				<textarea name="desc" placeholder="Fish Desc" onChange={(e) => this.handleChange(e,key)}>{fish.desc}</textarea>
				<input name="image" type="text" placeholder="Fish Image" value={fish.image} onChange={(e) => this.handleChange(e,key)}/>
				<button onClick={() => this.props.deleteFish(key)}>Remove Fish</button>
			</div>
		);
	}
	render(){
		const logout = <button onClick={this.logout}>Logout!</button>
		if(!this.state.uid){
			return <div>{this.renderLogin()}</div>
		}

		if(this.state.uid !== this.state.owner){
			return (
				<div>
					<p>Sorry you aren't the owner of this store!</p>
					{logout}
				</div>
			);
		}

		return (
			<div>
				<h2>{this.props.name}</h2>
				{logout }
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadData}>Load Sample Data</button>
			</div>

			)
	}
}

Inventory.propTypes = {
	addFish : React.PropTypes.func.isRequired,
	name : React.PropTypes.string.isRequired,
	loadData : React.PropTypes.func.isRequired,
	fishes : React.PropTypes.object.isRequired,
	editFish : React.PropTypes.func.isRequired,
	deleteFish : React.PropTypes.func.isRequired,
	storeId : React.PropTypes.string.isRequired
}

export default Inventory;
