import React, { Component} from "react";
import Link from "next/link";

export default class SpareCarBlock extends Component {
	constructor(props) {
		super(props);

		let tasks = [];
		let spares = [];
		this.props.appData.tasks.map((task, index) => {
			if (task.carId == this.props.carId) {
				tasks.push(task.id);
			}
		});
		Object.keys(this.props.appData.spares).map((id, index) => {
			let spare = this.props.appData.spares[id];
			if (tasks.indexOf(spare.taskId) !== -1) {
				spares.push(spare);
			}
		});

		this.state = {
			car: this.props.appData.cars[this.props.carId],
			spares: spares
		};
	}

	showList = () => {
		this.props.openCarBlock(this.props.openedCar != this.props.carId ? this.props.carId : null);
	};

	clickHandler = (spare, event) => {
		event.preventDefault();
		this.props.setActiveSpare(spare);
	};

	delHandler = (spare, event) => {
		event.preventDefault();
		if (!confirm("Вы уверены, что хотите удалить запчасть?")) {
			return;
		}
		this.props.delSpare({id: spare.id}, res => {
			if (res.error) {
				alert('Ошибка удаления запчасти!');
				return;
			}
			alert('Запчасть удалена!');
			this.props.setActiveSpare();
		});
	};

  	render() {
  		return (
	  		<div className="spare-car-block">
	  			<div className={'car'+(this.props.openedCar == this.props.carId ? ' active' : '')}>
	  				<div className="model">
						{this.state.car.brand+' '+this.state.car.model}
					</div>
					<div className="number">
						<div className="code">{this.state.car.num.slice(0, 6)}</div>
						<div className="region">{this.state.car.num.slice(6)}</div>
					</div>
					<div className="owner">
						{this.state.car.owner}
					</div>
					<div className="phone">
						{this.state.car.phone}
					</div>
					<div className={'arrow'+(!this.state.spares.length ? ' hidden' : '')+(this.props.openedCar == this.props.carId ? ' down' : '')} onClick={this.showList}><img src="/static/img/icons/arrow.png" alt="" /></div>
	  			</div>
	  			{ this.props.openedCar == this.props.carId && this.state.spares.length ? 
		  			<div className="spares">
		  				{ this.state.spares.map((spare, index) => (
		  					<Link key={spare.id} href={'/spares#'+spare.id}>
			  					<a className={'item'+(this.props.activeItem && this.props.activeItem.id == spare.id ? ' active' : '')} onClick={(event) => this.clickHandler(spare, event)}>
			  						<div className="title">{spare.title}</div>
									<div className="catNum">{spare.catNum}</div>
									<div className="price">{spare.price}Р</div>
									<div className="buy_date">{spare.buy_date}</div>
									{ spare.install_date ? 
										<div className="install_date">{spare.install_date}</div>
									 : null }
									<div className="del" onClick={(event) => this.delHandler(spare, event)}></div>
			  					</a>
		  					</Link>
	  					)) }
		  			</div>
	  			: null }
	  		</div>
	  	);
	}
}