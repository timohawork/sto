import React, { Component} from "react";
import { connect } from 'react-redux';
import Head from "next/head";
import Link from "next/link";

import List from './../components/tasks/list.js';
import Info from './../components/tasks/info.js';
/*import TaskBaloon from './../blocks/task_baloon.js';*/
import SparesList from './../components/tasks/spares_list.js';

import './../styles/tasks.scss';

class Tasks extends Component {
	constructor() {
		super();
		this.state = {
			_id: null,
			activeTask: null,
			editMode: false
		};
	}

	loadFromHash = () => {
		if (!this.state.activeTask && this.state._id && this.props.appData.tasks.length) {
			let task = null;
			this.props.appData.tasks.map((_task, index) => {
				if (_task.id == this.state._id) {
					task = _task;
				}
			});
			if (task) {
				this.setActiveTask(task);
			}
			else {
				console.log('Wrong task ID!');
			}
		}
	};

	componentDidMount() {
		this.setState({_id: window.location.hash.substring(1)});
	}

	setActiveTask = task => {
		if (!task) {
			this.setState({
				_id: null,
				activeTask: null,
				editMode: false
			});
			window.location.hash = '';
			return;
		}

		this.setState({
			_id: task.id,
			activeTask: task
		});
		window.location.hash = '#'+task.id;
		this.state.editMode && this.setState({editMode: false});
	};

	newTask = (value, cb) => {
		this.props.addToList('tasks', value, res => {
			if (res.res && res.data) {
				this.setActiveTask(res.data);
			}
			cb(res);
		});
	};
	editTask = (value, cb) => {
		this.props.editItem('tasks', value, res => {
			if (res.res) {
				this.setActiveTask(value);
				this.setState({editMode: false});
			}
			cb(res);
		});
	};
	delTask = (value, cb) => {
		this.props.delItem('tasks', value, cb);
	};

	newSpare = (value, cb) => {
		this.props.addToList('spares', value, cb);
	};

	setEditMode = val => {
		this.setState({editMode: val});
	};

	render() {
		this.loadFromHash();
		
		return (
			<>
				<Head>
					<title>{process.env.TITLE+' - Задачи'}</title>
				</Head>
				<div className="container">
					<List 
						appData={this.props.appData}
						appParams={this.props.appParams} 
						activeItem={this.state.activeTask}
						setActiveTask={this.setActiveTask}
						newTask={this.newTask}
						delTask={this.delTask}
					/>
					{/*<div id="tasks_diagram">
						<Link href="/"><a id="home_link"></a></Link>
						{this.props.appData.tasks.length ? this.props.appData.tasks.map((task, index) => (
							<TaskBaloon key={task.id} data={task} setActiveTask={this.setActiveTask} />
						)) : <div>Loading...</div>}
					</div>*/}
					<div className="middle-block">
						<div className="task-info">
							{ this.state.activeTask ?
								<Info 
									appData={this.props.appData}
									appParams={this.props.appParams} 
									data={this.state.activeTask} 
									editTask={this.editTask}
									editMode={this.state.editMode}
									setEditMode={this.setEditMode}
								/>
							: null}
						</div>
					</div>
					<SparesList 
						appData={this.props.appData} 
						activeItem={this.state.activeTask}
						newSpare={this.newSpare}
					/>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {appData: state};
};

export default connect(mapStateToProps)(Tasks);