import React, { Component} from "react";
import Link from "next/link";

class EmpTasksList extends Component {
	render() {
		return (
			<div className="emp-tasks-list">
				<p className="subtitle">Задачи</p>
				{this.props.data.length ? this.props.data.map((task, index) => (
					<Link key={task.id} href={`/tasks#${task.id}`}>
						<a className="item">
							<div className="icon"></div>
							<div className="title">{task.title}</div>
							<div className="sum">{task.sum}Р</div>
						</a>
					</Link>
				)) : 
					<div>
						<p className="empty-block">Список задач пока пуст</p>
					</div>
				}
			</div>
		);
	}
}

export default EmpTasksList;