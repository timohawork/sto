import React, { Component} from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";

import List from './../components/spares/list.js';
import Info from './../components/spares/info.js';

class Spares extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: null,
			activeSpare: null,
			openedCar: null,
			editMode: false
		};
	}

	loadFromHash = () => {
		if (!this.state.activeSpare && this.state._id && Object.keys(this.props.appData.spares).length) {
			let spare = this.props.appData.spares[this.state._id];
			if (spare) {
				this.setActiveSpare(spare);
			}
			else {
				console.log('Wrong spare ID!');
			}
		}
	};

	componentDidMount() {
		this.setState({_id: window.location.hash.substring(1)});
	}

	setActiveSpare = value => {
		if (!value) {
			this.setState({
				_id: null,
				activeSpare: null,
				openedCar: null,
				editMode: false
			});
			window.location.hash = '';
			return;
		}

		let carId = null;
		this.props.appData.tasks.map((task, index) => {
			if (task.id == value.taskId) {
				carId = task.carId;
			}
		});

		this.setState({
			_id: value.id,
			activeSpare: value,
			openedCar: carId
		});
		window.location.hash = '#'+value.id;
		this.state.editMode && this.setState({editMode: false});
	};

	editSpare = (value, cb) => {
		this.props.editItem('spares', value, res => {
			if (res.res) {
				this.setActiveSpare(value);
				this.setState({editMode: false});
			}
			cb(res);
		});
	};
	delSpare = (value, cb) => {
		this.props.delItem('spares', value, cb);
	};

	setEditMode = val => {
		this.setState({editMode: val});
	};

	openCarBlock = carId => {
		this.setState({openedCar: carId});
	};

	render() {
		this.loadFromHash();

		return (
			<>
				<Head>
					<title>{process.env.TITLE+' - Запчасти'}</title>
					<link href="/static/css/spares.css" rel="stylesheet" />
				</Head>
				<div className="container">
					<List 
						appData={this.props.appData} 
						activeItem={this.state.activeSpare}
						setActiveSpare={this.setActiveSpare} 
						openedCar={this.state.openedCar}
						openCarBlock={this.openCarBlock}
						delSpare={this.delSpare}
					/>
					<div className="middle-block">
						<div className="spare-info">
							<Link href="/"><a id="home_link"></a></Link>
							{ this.state.activeSpare ?
								<Info 
									data={this.state.activeSpare} 
									editSpare={this.editSpare}
									editMode={this.state.editMode}
									setEditMode={this.setEditMode}
								/>
							: null }
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Spares;