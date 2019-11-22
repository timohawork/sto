import React, { Component} from "react";
import Link from "next/link";

import SpareCarBlock from './../../blocks/spare_car_block.js';

class SparesList extends Component {
	render() {
		return (
			<div className="spares-list">
				<p className="subtitle">Запчасти</p>
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
				)) : <p className="empty-block">Список запчастей пуст</p>}
			</div>
		);
	}
}

export default SparesList;