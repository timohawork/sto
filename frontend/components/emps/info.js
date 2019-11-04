import React, { Component} from "react";

import InputBlock from './../../blocks/input_block.js';

class EmpInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {
				login: '',
				name: '',
				password: '',
				pos: 0
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
		this.props.editEmp(this.state.data, res => {
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
						<h1 className="name">{this.props.data.name}</h1>
						<div className="left">
							<div className="pos">{this.props.positions[this.props.data.pos]}</div>
						</div>
						<div className="right">
							<div>
								Всего заработано: <b>{this.props.info.sumTotal}Р</b>
							</div>
						</div>
						<a href="#" className="editMode" onClick={this.toggleEditMode}>Редактировать</a>
					</>
				 : 
					<form className="editForm" onSubmit={this.submitFormHandler}>
						<InputBlock name="name" title="Имя" error={this.state.errors.name}>
			  				<input type="text" name="name" value={this.state.data.name} onChange={this.handleChange} />
			  			</InputBlock>
			  			<InputBlock name="pos" title="Должность" error={this.state.errors.pos}>
			  				<select name="pos" onChange={this.handleChange} defaultValue={this.state.data.pos}>
			  					{Object.keys(this.props.positions).map((pos, index) => (
			  						<option key={pos} value={pos}>{this.props.positions[pos]}</option>
			  					))}
			  				</select>
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

export default EmpInfo;