import React, { Component} from "react";

import SpareBlock from './../../blocks/spare_block.js';

class CarSparesList extends Component {
	render() {
		let spares = [];
		if (this.props.activeItem && Object.keys(this.props.appData.spares).length) {
			let _tasks = [];
			this.props.appData.tasks.map((task, index) => {
				if (task.carId == this.props.activeItem.vin && _tasks.indexOf(task.carId) == -1) {
					_tasks.push(task.id);
				}
			});
			Object.keys(this.props.appData.spares).map((id, index) => {
				let spare = this.props.appData.spares[id];
				if (_tasks.indexOf(spare.taskId) != -1) {
					spares.push(spare);
				}
			});
		}

		return (
			<div className="car-spares-list">
				<h2>Запчасти</h2>
				{spares.length ? spares.map((spare, index) => (
					<SpareBlock 
						key={spare.id} 
						data={spare}
					/>
				)) : 
					<div>
						<h3>Список запчастей пока пуст</h3>
					</div>
				}
			</div>
		);
	}
}

export default CarSparesList;