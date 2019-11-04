import React, { Component} from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";

import List from './../components/emps/list.js';
import Info from './../components/emps/info.js';
import TasksList from './../components/emps/tasks_list.js';

class Emps extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: null,
			activeEmp: null,
			activeInfo: null,
			editMode: false,
			tasks: []
		};
	}

	loadFromHash = () => {
		if (!this.state.activeEmp && this.state._id && this.props.appData.tasks.length) {
			let emp = this.props.appData.emps[this.state._id];
			if (emp) {
				this.setActiveEmp(emp);
			}
			else {
				console.log('Wrong employee ID!');
			}
		}
	};

	componentDidMount() {
		this.setState({_id: window.location.hash.substring(1)});
	}

	setActiveEmp = value => {
		if (!value) {
			this.setState({
				_id: null,
				activeEmp: null,
				activeInfo: null,
				editMode: false,
				tasks: []
			});
			window.location.hash = '';
			return;
		}

		let tasks = [];
		let info = {
			sumTotal: 0
		};
		this.props.appData.tasks.map(task => {
			if (task.empId == value.login) {
				tasks.push(task);

				info.sumTotal += task.sum*1;
			}
		});

		this.setState({
			_id: value.login,
			activeEmp: value,
			activeInfo: info,
			tasks: tasks
		});
		window.location.hash = '#'+value.login;
		this.state.editMode && this.setState({editMode: false});
	};

	newEmp = (value, cb) => {
		this.props.addToList('emps', value, res => {
			if (res.res) {
				this.setActiveEmp(value);
			}
			cb(res);
		});
	};
	editEmp = (value, cb) => {
		this.props.editItem('emps', value, res => {
			if (res.res) {
				this.setActiveEmp(value);
				this.setState({editMode: false});
			}
			cb(res);
		});
	};
	delEmp = (value, cb) => {
		this.props.delItem('emps', value, cb);
	};

	setEditMode = val => {
		this.setState({editMode: val});
	};

	render() {
		this.loadFromHash();

		return (
			<>
				<Head>
					<title>{process.env.TITLE+' - Сотрудники'}</title>
					<link href="/static/css/emps.css" rel="stylesheet" />
				</Head>
				<div className="container">
					<List 
						appData={this.props.appData} 
						activeItem={this.state.activeEmp}
						setActiveEmp={this.setActiveEmp} 
						newEmp={this.newEmp} 
						delEmp={this.delEmp}
					/>
					<div className="middle-block">
						<div className="emp-info">
							<Link href="/"><a id="home_link"></a></Link>
							{ this.state.activeEmp && this.state.activeInfo ?
								<Info 
									positions={this.props.appData.positions}
									data={this.state.activeEmp} 
									info={this.state.activeInfo} 
									editEmp={this.editEmp}
									editMode={this.state.editMode}
									setEditMode={this.setEditMode}
								/>
							: null}
						</div>
					</div>
					<TasksList appData={this.props.appData} data={this.state.tasks} />
				</div>
			</>
		);
	}
}

export default Emps;