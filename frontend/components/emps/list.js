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
				<h2>Сотрудники</h2>
				{this.props.appData.emps ? Object.keys(this.props.appData.emps).map((id, index) => (
					<EmpBlock 
						key={id} 
						data={this.props.appData.emps[id]} 
						isActive={this.props.activeItem &&this.props.activeItem.id == this.props.appData.emps[id].id} 
						setActiveEmp={this.props.setActiveEmp} 
						positions={this.props.appData.positions} 
						delEmp={this.props.delEmp}
					/>
				)) : <div>Loading...</div>}
				<a href="#" className="add-button" onClick={this.showForm}>
					<img src="/static/img/icons/plus.png" alt="" />
				</a>
				{ this.state.formIsShown ? 
					<EmpAddForm 
						positions={this.props.appData.positions} 
						hideForm={this.hideForm} 
						newEmp={this.props.newEmp} 
					/>
				 : null }
			</div>
		);
	}
}

export default EmpsList;