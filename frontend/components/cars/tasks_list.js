import React, { Component} from "react";
import Link from "next/link";

class CarTasksList extends Component {
	render() {
		return (
			<div className="tasks-list">
				<h2>Задачи</h2>
				{this.props.data.length ? this.props.data.map((task, index) => (
					<Link key={task.id} href={`/tasks#${task.id}`}>
						<a className="item">
							<div className="icon"></div>
							<div className="title">{task.title}</div>
							<div className="sum">{task.sum}Р</div>
						</a>
					</Link>
				))
				: <div>
					<h3>Нет задач, связанных с данным автомобилем</h3>
				</div>}
			</div>
		);
	}
}

export default CarTasksList;