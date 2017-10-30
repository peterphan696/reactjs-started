import React from 'react';
import { getFunName } from '../helpers.js'
class StorePicker extends React.Component {
	// constructor(){
	// 	super(props);
	// 	//this.gotoStore = this.gotoStore.bind(this);
	// }

	gotoStore = (e) => {
		e.preventDefault();
		console.log('You change store URL');
		console.log(this.refs.store.value);
		const storeId = this.refs.store.value;
		this.context.router.transitionTo(`/store/${storeId}`);
		return false;
	}

	render(){
		return (
			<form className="store-selector" onSubmit={this.gotoStore.bind(this)}>
				<h2>Please Enter A Store </h2>
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref="store" />
			   <button type="submit">Visit Store -></button>
			</form>
			)
	}
}

StorePicker.contextTypes = {
	router: React.PropTypes.Object
}
export default StorePicker;
