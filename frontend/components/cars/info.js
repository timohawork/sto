import React, { Component} from "react";

import InputBlock from './../../blocks/input_block.js';

class CarInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {
				id: '',
				num: '',
				owner: '',
				year: '',
				vin: '',
				phone: '',
				brand: '',
				model: ''
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
		this.props.editCar(this.state.data, res => {
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
						<div className="left">
							<h1 className="model">{this.props.data.brand+' '+this.props.data.model}</h1>
							<div className="number">
								<div className="code">{this.props.data.num.slice(0, 6)}</div>
								<div className="region">{this.props.data.num.slice(6)}</div>
							</div>
							<div className="year">{this.props.data.year}г.</div>
							<div className="vin"><b>VIN:</b> {this.props.data.vin}</div>
							<div className="owner">{this.props.data.owner}</div>
							<div className="phone">{this.props.data.phone}</div>
						</div>
						<div className="right">
							<div>
								Всего заработано: <b>{this.props.info.sumTotal}Р</b>
							</div>
							<div>
								Всего на запчасти: <b>{this.props.info.sparesTotal}Р</b>
							</div>
						</div>
						<a href="#" className="editMode" onClick={this.toggleEditMode}>
							<i className="fas fa-pen-square"></i>
						</a>
					</>
				 : 
					<form className="editForm" onSubmit={this.submitFormHandler}>
						<InputBlock name="num" title="Номер" error={this.state.errors.num}>
			  				<input type="text" name="num" value={this.state.data.num} onChange={this.handleChange} />
			  			</InputBlock>
			  			<InputBlock name="owner" title="Владелец" error={this.state.errors.owner}>
			  				<input type="text" name="owner" value={this.state.data.owner} onChange={this.handleChange} />
			  			</InputBlock>
			  			<InputBlock name="year" title="Год" error={this.state.errors.year}>
			  				<input type="text" name="year" value={this.state.data.year} onChange={this.handleChange} />
			  			</InputBlock>
						<InputBlock name="phone" title="Телефон" error={this.state.errors.phone}>
			  				<input type="text" name="phone" value={this.state.data.phone} onChange={this.handleChange} />
			  			</InputBlock>
						<InputBlock name="brand" title="Бренд" error={this.state.errors.brand}>
			  				<input type="text" name="brand" value={this.state.data.brand} onChange={this.handleChange} />
			  			</InputBlock>
						<InputBlock name="model" title="Модель" error={this.state.errors.model}>
			  				<input type="text" name="model" value={this.state.data.model} onChange={this.handleChange} />
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

export default CarInfo;