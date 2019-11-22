import React, { Component} from "react";
import Link from "next/link";

import TaskBlock from './../../blocks/task_block.js';
import TaskAddFrom from "./add.js";

class TasksList extends Component {
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
			<div className="tasks-list">
				<p className="subtitle">Задачи</p>
				{this.props.appData.tasks.map((task, index) => (
					<TaskBlock 
						key={task.id} 
						data={task} 
						appData={this.props.appData}
						appParams={this.props.appParams} 
						isActive={this.props.activeItem &&this.props.activeItem.id == task.id}
						setActiveTask={this.props.setActiveTask} 
						delTask={this.props.delTask}
					/>
				))}
				<a href="#" className="add-button" onClick={this.showForm}>
					<i className="fas fa-plus-circle"></i>
				</a>
				{this.state.formIsShown ? 
					<TaskAddFrom 
						appData={this.props.appData} 
						appParams={this.props.appParams} 
						hideForm={this.hideForm} 
						newTask={this.props.newTask} 
					/>
				 : null}
			</div>
		);
	}
}

export default TasksList;