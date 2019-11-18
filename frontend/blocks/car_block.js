import React, { Component} from "react";
import Link from "next/link";

export default class CarBlock extends Component {
	clickHandler = event => {
		event.preventDefault();
		this.props.setActiveCar(this.props.data);
	};

	delHandler = event => {
		event.preventDefault();
		if (!confirm("Вы уверены, что хотите удалить автомобиль?")) {
			return;
		}
		this.props.delCar({id: this.props.data.id}, res => {
			if (res.error) {
				alert('Ошибка удаления автомобиля!');
				return;
			}
			alert('Автомобиль удалён!');
			this.props.setActiveCar();
		});
	};

  	render() {
  		let code = this.props.data.num.slice(0, 6);
  		let region = this.props.data.num.slice(6);
  		let className = "item"+(this.props.isActive ? " active" : "");

  		return (
	  		<Link href={'/cars#'+this.props.data.id}>
				<a className={className} onClick={this.clickHandler}>
					<div className="model">
						{this.props.data.brand+' '+this.props.data.model}
					</div>
					<div className="number">
						<div className="code">{code}</div>
						<div className="region">{region}</div>
					</div>
					<div className="owner">
						{this.props.data.owner}
					</div>
					<div className="phone">
						{this.props.data.phone}
					</div>
					<div className="del" onClick={this.delHandler}></div>
				</a>
			</Link>
	  	);
	}
}