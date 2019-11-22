import React, { Component} from "react";
import Link from "next/link";

class CarTasksList extends Component {
	render() {
		return (
			<div className="tasks-list">
				<p className="subtitle">Задачи</p>
				{this.props.data.length ? this.props.data.map((task, index) => (
					<Link key={task.id} href={`/tasks#${task.id}`}>
						<a className="item">
							<i className="fas fa-check"></i>
							<div className="title">{task.title}</div>
							<div className="sum">{task.sum}Р</div>
						</a>
					</Link>
				))
				: <div>
					<p className="empty-block">Нет задач, связанных с данным автомобилем</p>
				</div>}
			</div>
		);
	}
}

export default CarTasksList;