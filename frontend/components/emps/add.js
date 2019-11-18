import React, { Component} from "react";

import InputBlock from './../../blocks/input_block.js';

class EmpAddForm extends Component {
	constructor() {
		super();
		this.state = {
			data: {
				id: '',
				login: '',
				name: '',
				password: '',
				pos: ''
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
		this.props.newEmp(this.state.data, res => {
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
			  			<InputBlock name="login" title="Логин" error={this.state.errors.login}>
			  				<input type="text" name="login" onChange={this.handleChange} />
			  			</InputBlock>
			  			<InputBlock name="name" title="Имя" error={this.state.errors.name}>
			  				<input type="text" name="name" onChange={this.handleChange} />
			  			</InputBlock>
			  			{/*<InputBlock name="password" title="Пароль" error={this.state.errors.password}>
			  				<input type="text" name="password" onChange={this.handleChange} />
			  			</InputBlock>*/}
						<InputBlock name="pos" title="Должность" error={this.state.errors.pos}>
			  				<select name="pos" onChange={this.handleChange}>
			  					<option value="">Выберите должность</option>
			  					{Object.keys(this.props.positions).map((pos, index) => (
			  						<option key={pos} value={pos}>{this.props.positions[pos]}</option>
			  					))}
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

export default EmpAddForm;