import React from 'react';
class AddFishForm extends React.Component {
	AddItem = (e) => {
		e.preventDefault();
		console.log('Add Item Fish 🐠');
		const fish = {
			name : this.refs.name.value,
			price : this.refs.price.value,
			status : this.refs.status.value,
			desc : this.refs.desc.value,
			image : this.refs.image.value
		}
		this.props.addFish(fish);
		this.refs.fishForm.reset();
		console.log(fish);
		return false;
	}
	render(){
		return (
			<form ref="fishForm" className="fish-edit" onSubmit={this.AddItem.bind(this)} >
				<input ref="name" type="text" placeholder="Fish Name" />
				<input ref="price" type="text" placeholder="Fish Price" />
				<select ref="status">
					<option value="availabel">Fresh!</option>
					<option value="unavailabel">Sold Out!</option>
				</select>
				<input ref="desc" type="text" placeholder="Fish Desc" />
				<input ref="image" type="text" placeholder="Fish Image" />
				<button type="submit">+ Add Item</button>
			</form>
			)
	}
}

AddFishForm.propTypes = {
	addFish : React.PropTypes.func.isRequired
}

export default AddFishForm;
