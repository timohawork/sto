import React, { Component} from "react";
import Link from "next/link";

export default class EmpBlock extends Component {
	clickHandler = event => {
		event.preventDefault();
		this.props.setActiveEmp(this.props.data);
	};

	delHandler = event => {
		event.preventDefault();
		if (!confirm("Вы уверены, что хотите удалить сотрудника?")) {
			return;
		}
		this.props.delEmp({login: this.props.data.login}, res => {
			if (res.error) {
				alert('Ошибка удаления сотрудника!');
				return;
			}
			alert('Сотрудник удалён!');
			this.props.setActiveEmp();
		});
	};

  	render() {
  		let className = "item"+(this.props.isActive ? " active" : "");

  		return (
	  		<Link href={'#'+this.props.data.login}>
				<a className={className} onClick={this.clickHandler}>
					<div className="name">
						{this.props.data.name}
					</div>
					<div className="pos">
						{this.props.positions[this.props.data.pos]}
					</div>
					<div className="del" onClick={this.delHandler}></div>
				</a>
			</Link>
	  	);
	}
}