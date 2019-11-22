import React, { Component} from "react";

class CarEmpList extends Component {
	render() {
		return (
			<div className="emp-list">
				<h2>Сотрудники</h2>
				{this.props.data && Object.keys(this.props.data).length ? 
					<ul>
						{Object.keys(this.props.data).map((emp, index) => (
							<li key={index}>
								<i className="fas fa-user-cog"></i>
								<div className="name">{this.props.appData.emps[emp].name}</div>
								<div className="total">{this.props.data[emp].total+'Р'}</div>
							</li>
						))}
					</ul>
				: <div>
					<p className="empty-block">К данному автомобилю не привязаны сотрудники</p>
				</div>}
			</div>
		);
	}
}

export default CarEmpList;