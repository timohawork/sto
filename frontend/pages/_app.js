//TODO: решить проблему со ссылками (переход по страницам без перезагрузки)

import React from 'react';
import App from 'next/app';
import Head from "next/head";
import { withRouter } from "next/router";

import Auth from './../components/auth.js';

const auth = new Auth();

class MyApp extends App {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			cars: {},
			emps: {},
			tasks: [],
			spares: {},

			types: {
				1: 'Диагностика',
				2: 'Плановое ТО',
				3: 'Замена масла',
				4: 'Шиномонтаж',
				5: 'Ремонт электрики'
			},
			statuses: {
				1: 'Новая',
				2: 'В работе',
				3: 'Ожидает оплаты',
				4: 'Выполнена',
				5: 'Отклонена'
			},
			positions: {
				1: 'Работник',
				2: 'Механик',
				3: 'Электрик',
				4: 'Мастер'
			}
		};
	}

	componentDidMount = () => {
		let path = this.props.router.pathname.substr(1);
		if (auth.isLoggedIn()) {
			if (path == 'login') {
				this.props.router.push('/');
				return;
			}
			auth.userInfo(data => {
				if (data.error && data.error == 'tokenError') {
					auth.logout();
					this.setState({loggedIn: false});
					this.props.router.push('/login');
					return;
				}
				this.setState({loggedIn: true});
				this.init();
			});
		}
		if (path !== 'login' && !auth.isLoggedIn()) {
			this.props.router.push('/login');
		}
	};

	init = cb => {
		fetch(process.env.BACKEND_HOST+':'+process.env.BACKEND_PORT+'/data/init', {
			method: 'POST',
			headers: {
				Authorization: auth._getToken(),
				Accept: 'application/json',
				'Content-Type': 'application/json'
	        }
		})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				console.log('ERROR:', data.error)
				return;
			}
			let cars = {};
			let emps = {};
			let spares = {};

			data.cars.map((car, index) => {
				cars[car.id] = car;
			});
			data.emps.map((emp, index) => {
				emps[emp.id] = emp;
			});
			data.spares.map((spare, index) => {
				spares[spare.id] = spare;
			});
			this.setState({
				cars: cars,
				emps: emps,
				tasks: data.tasks,
				spares: spares
			});
			cb && cb();
		})
		.catch(error => console.log(error));
	};

	addToList = (type, value, cb) => {
		fetch(process.env.BACKEND_HOST+':'+process.env.BACKEND_PORT+'/'+type+'/add', {
			method: 'POST',
			headers: {
				Authorization: auth._getToken(),
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify(value)
		})
		.then(response => response.json())
		.then(data => {
			if (data.errors) {
				cb({errors: data.errors});
				return;
			}
			let list = this.state[type];
			let _data = data.data ? data.data : value;
			if (type == 'tasks') {
				list.push(_data);
			}
			else {
				list[_data.id] = _data;
			}
			this.setState({[type]: list});
			cb({res: true, data: _data});
		})
		.catch(error => console.log(error));
	};

	editItem = (type, value, cb) => {
		fetch(process.env.BACKEND_HOST+':'+process.env.BACKEND_PORT+'/'+type+'/edit', {
			method: 'POST',
			headers: {
				Authorization: auth._getToken(),
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify(value)
		})
		.then(response => response.json())
		.then(data => {
			if (data.errors) {
				cb({errors: data.errors});
				return;
			}
			let list = this.state[type];
			let _data = data.data ? data.data : value;
			if (type == 'tasks') {
				list.map((task, index) => {
					if (task.id == _data.id) {
						list[index] = _data;
					}
				});
			}
			else {
				list[_data.id] = _data;
			}
			this.setState({[type]: list});
			cb({res: true, data: _data});
		})
		.catch(error => console.log(error));
	};

	delItem = (type, value, cb) => {
		fetch(process.env.BACKEND_HOST+':'+process.env.BACKEND_PORT+'/'+type+'/del', {
			method: 'POST',
			headers: {
				Authorization: auth._getToken(),
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify(value)
		})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				cb({error: data.error});
				return;
			}
			let list = this.state[type];
			if (type == 'tasks') {
				list.map((task, index) => {
					if (task.id == value.id) {
						list = list.splice(index, 1);
					}
				});
			}
			else {
				delete list[value.id];
			}
			this.setState({[type]: list});
			cb({res: true});
		})
		.catch(error => console.log(error));
	};

	logoutHandler = () => {
		auth.logout();
		this.setState({loggedIn: false});
		this.props.router.push('/login');
	};

	render() {
		const { Component, pageProps } = this.props;

		return (
			<>
				<Head>
					<link rel="shortcut icon" href="/static/favicon.ico" />
					<link href="/static/css/main.css" rel="stylesheet" />
				</Head>
				<Component {...pageProps} 
					appInit={this.init} 
					appData={this.state} 
					addToList={this.addToList} 
					editItem={this.editItem} 
					delItem={this.delItem}
				/>
				{ this.state.loggedIn ? 
					<div id="logout" onClick={this.logoutHandler}></div>
				: null }
			</>
		);
	}
}

export default withRouter(MyApp);