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
								<img src="/static/img/icons/employee.png" alt={this.props.appData.emps[emp].name} />
								<div className="name">{this.props.appData.emps[emp].name}</div>
								<div className="total">{this.props.data[emp].total+'Р'}</div>
							</li>
						))}
					</ul>
				: <div>
					<h3>К данному автомобилю не привязаны сотрудники</h3>
				</div>}
			</div>
		);
	}
}

export default CarEmpList;