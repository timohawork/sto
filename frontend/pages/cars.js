import React, { Component} from "react";
import Head from "next/head";
import Link from "next/link";

import List from './../components/cars/list.js';
import Info from './../components/cars/info.js';
import EmpList from './../components/cars/emp_list.js';
import TasksList from './../components/cars/tasks_list.js';
import SparesList from './../components/cars/spares_list.js';

class Cars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: null,
			activeCar: null,
			activeInfo: null,
			editMode: false,
			tasks: [],
			emps: null
		};
	}

	loadFromHash = () => {
		if (!this.state.activeCar && this.state._id && Object.keys(this.props.appData.cars).length) {
			let car = this.props.appData.cars[this.state._id];
			if (car) {
				this.setActiveCar(car);
			}
			else {
				console.log('Wrong car ID!');
			}
		}
	};

	componentDidMount() {
		this.setState({_id: window.location.hash.substring(1)});
	}

	setActiveCar = value => {
		if (!value) {
			this.setState({
				_id: null,
				activeCar: null,
				activeInfo: null,
				editMode: false,
				tasks: [],
				emps: null
			});
			window.location.hash = '';
			return;
		}

		let tasks = [];
		let emps = {};
		let info = {
			sumTotal: 0,
			sparesTotal: 0
		};
		this.props.appData.tasks.map(task => {
			if (task.carId == value.vin) {
				tasks.push(task);

				if (!emps[task.empId]) {
					emps[task.empId] = {
						total: task.sum*1
					};
				}
				else {
					emps[task.empId].total += task.sum*1;
				}
				info.sumTotal += task.sum*1;

				Object.keys(this.props.appData.spares).map((id, index) => {
					let spare = this.props.appData.spares[id];
					if (spare.taskId == task.id) {
						info.sparesTotal += spare.price*1;
					}
				});
			}
		});

		this.setState({
			_id: value.vin,
			activeCar: value,
			activeInfo: info,
			tasks: tasks,
			emps: emps
		});
		window.location.hash = '#'+value.vin;
		this.state.editMode && this.setState({editMode: false});
	};

	newCar = (value, cb) => {
		this.props.addToList('cars', value, res => {
			if (res.res) {
				this.setActiveCar(value);
			}
			cb(res);
		});
	};
	editCar = (value, cb) => {
		this.props.editItem('cars', value, res => {
			if (res.res) {
				this.setActiveCar(value);
				this.setState({editMode: false});
			}
			cb(res);
		});
	};
	delCar = (value, cb) => {
		this.props.delItem('cars', value, cb);
	};

	setEditMode = val => {
		this.setState({editMode: val});
	};

	render() {
		this.loadFromHash();

		return (
			<>
				<Head>
					<title>{process.env.TITLE+' - Автомобили'}</title>
					<link href="/static/css/cars.css" rel="stylesheet" />
				</Head>
				<div className="container">
					<List 
						list={this.props.appData.cars} 
						activeItem={this.state.activeCar}
						setActiveCar={this.setActiveCar} 
						newCar={this.newCar}
						delCar={this.delCar}
					/>
					<div className="middle-block">
						<div className="car-info">
							<Link href="/"><a id="home_link"></a></Link>
							{ this.state.activeCar && this.state.activeInfo ?
								<Info 
									data={this.state.activeCar} 
									info={this.state.activeInfo} 
									editCar={this.editCar}
									editMode={this.state.editMode}
									setEditMode={this.setEditMode}
								/>
							: null}
						</div>
						<div className="horizontal">
							<EmpList 
								appData={this.props.appData} 
								data={this.state.emps} 
							/>
							<TasksList data={this.state.tasks} />
						</div>
					</div>
					<SparesList 
						appData={this.props.appData} 
						activeItem={this.state.activeCar} 
					/>
				</div>
			</>
		);
	}
}

export default Cars;