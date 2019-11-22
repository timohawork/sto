import React, { Component} from "react";
import Link from "next/link";

import CarBlock from './../../blocks/car_block.js';
import CarAddFrom from "./add.js";

class CarsList extends Component {
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
			<div id="pwebkitscroller" className="cars-list">
				<p className="subtitle">Автомобили</p>
				{this.props.list ? Object.keys(this.props.list).map((id, index) => (
					<CarBlock 
						key={this.props.list[id].id} 
						data={this.props.list[id]} 
						isActive={this.props.activeItem &&this.props.activeItem.id == this.props.list[id].id} 
						setActiveCar={this.props.setActiveCar} 
						delCar={this.props.delCar}
					/>
				)) : <div>Loading...</div>}
				<div className="btn-box">
					<a href="#" className="add-button" onClick={this.showForm}>
						<i className="fas fa-plus-circle"></i>
					</a>
				</div>
				{ this.state.formIsShown ? <CarAddFrom hideForm={this.hideForm} newCar={this.props.newCar} /> : null }
			</div>
		);
	}
}

export default CarsList;