import React, { Component} from "react";
import Link from "next/link";

export default class TaskBlock extends Component {
	clickHandler = event => {
		if (this.props.setActiveTask) {
			event.preventDefault();
			this.props.setActiveTask(this.props.data);
		}
	};

	delHandler = event => {
		event.preventDefault();
		if (!confirm("Вы уверены, что хотите удалить задачу?")) {
			return;
		}
		this.props.delTask({id: this.props.data.id}, res => {
			if (res.error) {
				alert('Ошибка удаления задачи!');
				return;
			}
			alert('Задача удалена!');
			this.props.setActiveTask();
		});
	};

  	render() {
  		let className = "item"+(this.props.isActive ? " active" : "");

  		return (
	  		<Link href={'/tasks#'+this.props.data.id}>
				<a className={className} onClick={this.clickHandler}>
					<div className="title">
						{this.props.data.title}
					</div>
					<div className="status">
						{this.props.appData.statuses[this.props.data.status]}
					</div>
					<div className="type">
						{this.props.appData.types[this.props.data.type]}
					</div>
					<div className="start_date">
						{this.props.data.start_date}
					</div>
					<div className="sum">
						{this.props.data.sum}Р
					</div>
					<div className="del" onClick={this.delHandler}></div>
				</a>
			</Link>
	  	);
	}
}