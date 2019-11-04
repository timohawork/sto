import React, { Component} from "react";

import TaskBlock from './../../blocks/task_block.js';

class EmpTasksList extends Component {
	render() {
		return (
			<div className="emp-tasks-list">
				<h2>Задачи</h2>
				{this.props.data.length ? this.props.data.map((task, index) => (
					<TaskBlock 
						key={task.id} 
						data={task}
						appData={this.props.appData}
					/>
				)) : 
					<div>
						<h3>Список задач пока пуст</h3>
					</div>
				}
			</div>
		);
	}
}

export default EmpTasksList;