import React, { Component} from "react";

import InputBlock from './../../blocks/input_block.js';

class TaskAddForm extends Component {
	constructor() {
		super();
		this.state = {
			data: {
				title: '',
				comment: '',
				type: '',
				sum: 0,
				carId: '',
				empId: ''
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
		this.props.newTask(this.state.data, res => {
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
			  			<InputBlock name="comment" title="Комменатрий" error={this.state.errors.comment}>
			  				<textarea name="comment" onChange={this.handleChange}></textarea>
			  			</InputBlock>
			  			<InputBlock name="type" title="Тип" error={this.state.errors.type}>
			  				<select name="type" onChange={this.handleChange}>
			  					<option value="">Выберите тип</option>
			  					{Object.keys(this.props.appData.types).map((id, index) => (
			  						<option key={index} value={id}>{this.props.appData.types[id]}</option>
		  						))}
			  				</select>
			  			</InputBlock>
						<InputBlock name="sum" title="Сумма" error={this.state.errors.sum}>
			  				<input type="number" name="sum" step="100" onChange={this.handleChange} />
			  			</InputBlock>
			  			<InputBlock name="carId" title="Автомобиль" error={this.state.errors.carId}>
			  				<select name="carId" onChange={this.handleChange}>
			  					<option value="">Выберите автомобиль</option>
			  					{this.props.appData.cars ? Object.keys(this.props.appData.cars).map((id, index) => (
		  							<option key={id} value={this.props.appData.cars[id].vin}>{this.props.appData.cars[id].brand+' '+this.props.appData.cars[id].model+'('+this.props.appData.cars[id].num+')'}</option>
		  						)) : null}
			  				</select>
			  			</InputBlock>
			  			<InputBlock name="empId" title="Сотрудник" error={this.state.errors.empId}>
			  				<select name="empId" onChange={this.handleChange}>
			  					<option value="">Выберите сотрудника</option>
			  					{this.props.appData.emps ? Object.keys(this.props.appData.emps).map((id, index) => (
		  							<option key={id} value={this.props.appData.emps[id].login}>{this.props.appData.emps[id].name}</option>
		  						)) : null}
			  				</select>
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

export default TaskAddForm;