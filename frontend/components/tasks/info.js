import React, { Component} from "react";
import Link from "next/link";

import InputBlock from './../../blocks/input_block.js';

class TaskInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {
				id: '',
				title: '',
				comment: '',
				type: '',
				sum: 0,
				carId: '',
				empId: '',
				status: 0
			},
			errors: {}
		};
	}

	toggleEditMode = event => {
		event.preventDefault();
		if (!this.props.editMode) {
			this.setState({data: this.props.data});
		}
		this.props.setEditMode(!this.props.editMode);
	};

	handleChange = event => {
		let data = this.state.data;
		data[event.target.name] = event.target.value;
		this.setState({data: data});
	};

	statusUpdate = event => {
		let props = this.props.data;
		props.status = event.target.value;
		this.setState({data: props});
		this.submitFormHandler();
	};

	submitFormHandler = event => {
		event && event.preventDefault();
		this.props.editTask(this.state.data, res => {
			if (res.errors) {
				this.setState({errors: res.errors});
				return;
			}
			alert('Данные успешно обновлены!');
			this.props.setEditMode(false);
		});
	};

	render() {
		let car = this.props.appData.cars[this.props.data.carId];
		let emp = this.props.appData.emps[this.props.data.empId];

		return (
			<>
				{!this.props.editMode ? 
					<>
						<h1 className="title">{'Задача: '+this.props.data.title}</h1>
						<div>
							<div className="type">{this.props.appData.types[this.props.data.type]}</div>
							<div className="sum">{this.props.data.sum}Р</div>
							<Link href={'/cars#'+car.vin}>
								<a className="car">
									<img src="/static/img/icons/car.png" alt="" />
									{car.brand+' '+car.model+'('+car.num+')'}
								</a>
							</Link>
							<Link href={'/emps#'+emp.login}>
								<a className="emp">
									<img src="/static/img/icons/employee.png" alt="" />
									{emp.name}
								</a>
							</Link>
							<div className="comment">{this.props.data.comment}</div>
							<div className="start-date">{'Начало: '+this.props.data.start_date}</div>
							{this.props.data.end_date ? 
								<div className="end-date">{'Начало: '+this.props.data.end_date}</div>
							: null}
							<div className="status">
								<select name="status" defaultValue={this.props.data.status} onChange={this.statusUpdate}>
									{Object.keys(this.props.appData.statuses).map((status, index) => (
										<option key={status} value={status}>{this.props.appData.statuses[status]}</option>
									))}
								</select>
							</div>
						</div>
						<a href="#" className="editMode" onClick={this.toggleEditMode}>Редактировать</a>
					</>
				 : 
					<form className="editForm" onSubmit={this.submitFormHandler}>
						<InputBlock name="title" title="Название" error={this.state.errors.title}>
			  				<input type="text" name="title" value={this.state.data.title} onChange={this.handleChange} />
			  			</InputBlock>
			  			<InputBlock name="type" title="Тип" error={this.state.errors.type}>
			  				<select name="type" onChange={this.handleChange} defaultValue={this.state.data.type}>
			  					{Object.keys(this.props.appData.types).map((id, index) => (
			  						<option key={index} value={id}>{this.props.appData.types[id]}</option>
		  						))}
			  				</select>
			  			</InputBlock>
						<InputBlock name="sum" title="Сумма" error={this.state.errors.sum}>
			  				<input type="number" name="sum" step="100" value={this.state.data.sum} onChange={this.handleChange} />
			  			</InputBlock>
			  			<InputBlock name="carId" title="Автомобиль" error={this.state.errors.carId}>
			  				<select name="carId" onChange={this.handleChange} defaultValue={this.state.data.carId}>
			  					<option value="">Выберите автомобиль</option>
			  					{this.props.appData.cars ? Object.keys(this.props.appData.cars).map((id, index) => (
		  							<option key={id} value={this.props.appData.cars[id].vin}>{this.props.appData.cars[id].brand+' '+this.props.appData.cars[id].model+'('+this.props.appData.cars[id].num+')'}</option>
		  						)) : null}
			  				</select>
			  			</InputBlock>
			  			<InputBlock name="empId" title="Сотрудник" error={this.state.errors.empId}>
			  				<select name="empId" onChange={this.handleChange} defaultValue={this.state.data.empId}>
			  					<option value="">Выберите сотрудника</option>
			  					{this.props.appData.emps ? Object.keys(this.props.appData.emps).map((id, index) => (
		  							<option key={id} value={this.props.appData.emps[id].login}>{this.props.appData.emps[id].name}</option>
		  						)) : null}
			  				</select>
			  			</InputBlock>
			  			<InputBlock name="comment" title="Комменатрий" error={this.state.errors.comment}>
			  				<textarea name="comment" defaultValue={this.state.data.comment} onChange={this.handleChange}></textarea>
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

export default TaskInfo;