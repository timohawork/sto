import React, { Component} from "react";

import InputBlock from './../../blocks/input_block.js';

class SpareInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {
				id: '',
				title: '',
				catNum: '',	
				price: '',
				taskId: ''
			},
			errors: {}
		};
	}

	toggleEditMode = evt => {
		evt.preventDefault();
		if (!this.props.editMode) {
			this.setState({data: this.props.data});
		}
		this.props.setEditMode(!this.props.editMode);
	};

	handleChange = evt => {
		let data = this.state.data;
		data[evt.target.name] = evt.target.value;
		this.setState({data: data});
	};

	submitFormHandler = event => {
		event.preventDefault();
		this.props.editSpare(this.state.data, res => {
			if (res.errors) {
				this.setState({errors: res.errors});
				return;
			}
			alert('Данные успешно обновлены!');
			this.props.setEditMode(false);
		});
	};

	render() {
		return (
			<>
				{!this.props.editMode ? 
					<>
						<h1 className="title">{this.props.data.title}</h1>
						<div className="catNum">{this.props.data.catNum}</div>
						<div className="price">{this.props.data.price}Р</div>
						<a href="#" className="editMode" onClick={this.toggleEditMode}>Редактировать</a>
					</>
				 : 
					<form className="editForm" onSubmit={this.submitFormHandler}>
						<InputBlock name="title" title="Название" error={this.state.errors.title}>
			  				<input type="text" name="title" value={this.state.data.title} onChange={this.handleChange} />
			  			</InputBlock>
			  			<InputBlock name="catNum" title="Каталожный номер" error={this.state.errors.catNum}>
			  				<input type="text" name="catNum" value={this.state.data.catNum} onChange={this.handleChange} />
			  			</InputBlock>
			  			<InputBlock name="price" title="Цена" error={this.state.errors.price}>
			  				<input type="number" name="price" step="10" value={this.state.data.price} onChange={this.handleChange} />
			  			</InputBlock>
			  			<div>
							<input type="submit" value="Сохранить" />
						</div>
			  			<a href="#" className="editMode" onClick={this.toggleEditMode}>Отменить</a>
					</form>
				}
			</>
		);
	}
}

export default SpareInfo;