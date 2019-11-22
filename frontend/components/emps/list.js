import React, { Component} from "react";
import Link from "next/link";

import EmpBlock from './../../blocks/emp_block.js';
import EmpAddForm from "./add.js";

class EmpsList extends Component {
	constructor() {
		super();
		this.state = {
			formIsShown: false
		};
	}

	showForm = event => {
		event.preventDefault();
		this.setState({formIsShown: true});
	};
	hideForm = event => {
		event ? event.preventDefault() : null;
		this.setState({formIsShown: false});
	};

	render() {
		return (
			<div className="emps-list">
				<p className="subtitle">Сотрудники</p>
				{this.props.appData.emps ? Object.keys(this.props.appData.emps).map((id, index) => (
					<EmpBlock 
						key={id} 
						data={this.props.appData.emps[id]} 
						isActive={this.props.activeItem && this.props.activeItem.id == id} 
						setActiveEmp={this.props.setActiveEmp} 
						positions={this.props.appParams.positions} 
						delEmp={this.props.delEmp}
					/>
				)) : <p className="empty-block">Список сотрудников пуст</p>}
				<a href="#" className="add-button" onClick={this.showForm}>
					<i className="fas fa-plus-circle"></i>
				</a>
				{ this.state.formIsShown ? 
					<EmpAddForm 
						positions={this.props.appParams.positions} 
						hideForm={this.hideForm} 
						newEmp={this.props.newEmp} 
					/>
				 : null }
			</div>
		);
	}
}

export default EmpsList;