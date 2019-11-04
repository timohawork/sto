import React, { Component} from "react";
import Link from "next/link";

import SpareCarBlock from './../../blocks/spare_car_block.js';

class SparesList extends Component {
	render() {
		return (
			<div className="spares-list">
				<h2>Запчасти</h2>
				{this.props.appData.cars && this.props.appData.spares ? Object.keys(this.props.appData.cars).map((id, index) => (
					<SpareCarBlock 
						key={index} 
						carId={id} 
						appData={this.props.appData} 
						activeItem={this.props.activeItem}
						setActiveSpare={this.props.setActiveSpare} 
						openedCar={this.props.openedCar}
						openCarBlock={this.props.openCarBlock}
						delSpare={this.props.delSpare}
					/>
				)) : <div>Loading...</div>}
			</div>
		);
	}
}

export default SparesList;