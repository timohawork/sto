import React, { Component} from "react";

import InputBlock from './../../blocks/input_block.js';

class SpareAddForm extends Component {
	constructor() {
		super();
		this.state = {
			data: {
				title: '',
				catNum: '',
				price: '',
				taskId: ''
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
		this.state.taskId = this.props.activeItem.id;
		this.props.newSpare(this.state.data, res => {
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
			  			<InputBlock name="title" title="Название" error={this.state.errors.title}>
			  				<input type="text" name="title" onChange={this.handleChange} />
			  			</InputBlock>
			  			<InputBlock name="catNum" title="Каталожный номер" error={this.state.errors.catNum}>
			  				<input type="text" name="catNum" onChange={this.handleChange} />
			  			</InputBlock>
			  			<InputBlock name="price" title="Цена" error={this.state.errors.price}>
			  				<input type="number" name="price" step="10" onChange={this.handleChange} />
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

export default SpareAddForm;