import React, { Component} from "react";

import InputBlock from './../../blocks/input_block.js';

class CarAddForm extends Component {
	constructor() {
		super();
		this.state = {
			data: {
				id: '',
				num: '',
				owner: '',
				year: 0,
				vin: '',
				phone: '',
				brand: '',
				model: ''
			},
			errors: {}
		};
	}

	handleChange = evt => {
		let data = this.state.data;
		data[evt.target.name] = evt.target.value;
		this.setState({data: data});
	};
	
	submitFormHandler = event => {
		event.preventDefault();
		this.props.newCar(this.state.data, res => {
			if (res.errors) {
				this.setState({errors: res.errors});
				return;
			}
			alert('Данные успешно сохранены!');
			this.props.hideForm();
		});
	};

  	render() {
  		return (
  			<>
  				<div className="overlay"></div>
	  			<div className="modal-form">
	  				<div className="close_modal" onClick={this.props.hideForm}>x</div>
			  		<form onSubmit={this.submitFormHandler}>
			  			<InputBlock name="num" title="Номер" error={this.state.errors.num}>
			  				<input type="text" name="num" onChange={this.handleChange} />
			  			</InputBlock>
			  			<InputBlock name="owner" title="Владелец" error={this.state.errors.owner}>
			  				<input type="text" name="owner" onChange={this.handleChange} />
			  			</InputBlock>
			  			<InputBlock name="year" title="Год" error={this.state.errors.year}>
			  				<input type="text" name="year" onChange={this.handleChange} />
			  			</InputBlock>
						<InputBlock name="vin" title="VIN" error={this.state.errors.vin}>
			  				<input type="text" name="vin" onChange={this.handleChange} />
			  			</InputBlock>
						<InputBlock name="phone" title="Телефон" error={this.state.errors.phone}>
			  				<input type="text" name="phone" onChange={this.handleChange} />
			  			</InputBlock>
						<InputBlock name="brand" title="Бренд" error={this.state.errors.brand}>
			  				<input type="text" name="brand" onChange={this.handleChange} />
			  			</InputBlock>
						<InputBlock name="model" title="Модель" error={this.state.errors.model}>
			  				<input type="text" name="model" onChange={this.handleChange} />
			  			</InputBlock>
						<div>
							<input type="submit" value="Добавить" />
						</div>
			  		</form>
		  		</div>
	  		</>
	  	);
  	}
}

export default CarAddForm;