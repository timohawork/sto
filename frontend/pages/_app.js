//TODO: решить проблему со ссылками (переход по страницам без перезагрузки)

const params = {
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

import React from 'react';
import App from 'next/app';
import Head from "next/head";
import { withRouter } from "next/router";

import Auth from './../components/auth.js';
const auth = new Auth();

import { createStore } from "redux";
import { Provider } from 'react-redux';
import reducer from "./../redux/reducer.js";
const Store = createStore(reducer, {
	cars: {},
	emps: {},
	tasks: [],
	spares: {}
});

class MyApp extends App {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false
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
			Store.dispatch({
				type: 'INIT_CARS',
				data: cars
			});
			Store.dispatch({
				type: 'INIT_EMPS',
				data: emps
			});
			Store.dispatch({
				type: 'INIT_TASKS',
				data: data.tasks
			});
			Store.dispatch({
				type: 'INIT_SPARES',
				data: spares
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
			let _data = data.data ? data.data : value;
			let action = '';
			switch (type) {
				case 'cars':
					action = 'ADD_CAR';
				break;
				case 'emps':
					action = 'ADD_EMP';
				break;
				case 'tasks':
					action = 'ADD_TASK';
				break;
				case 'spares':
					action = 'ADD_SPARE';
			}
			Store.dispatch({
				type: action,
				data: _data
			});
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
			let _data = data.data ? data.data : value;
			let action = '';
			switch (type) {
				case 'cars':
					action = 'EDIT_CAR';
				break;
				case 'emps':
					action = 'EDIT_EMP';
				break;
				case 'tasks':
					action = 'EDIT_TASK';
				break;
				case 'spares':
					action = 'EDIT_SPARE';
			}
			Store.dispatch({
				type: action,
				data: _data
			});
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
			let action = '';
			switch (type) {
				case 'cars':
					action = 'DEL_CAR';
				break;
				case 'emps':
					action = 'DEL_EMP';
				break;
				case 'tasks':
					action = 'DEL_TASK';
				break;
				case 'spares':
					action = 'DEL_SPARE';
			}
			Store.dispatch({
				type: action,
				id: value.id
			});
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
			<Provider store={Store}>
				<Head>
					<link rel="shortcut icon" href="/static/favicon.ico" />
					<link href="/static/css/main.css" rel="stylesheet" />
				</Head>
				<Component {...pageProps} 
					appInit={this.init} 
					appParams={params} 
					addToList={this.addToList} 
					editItem={this.editItem} 
					delItem={this.delItem}
				/>
				{ this.state.loggedIn ? 
					<div id="logout" onClick={this.logoutHandler}></div>
				: null }
			</Provider>
		);
	}
}

export default withRouter(MyApp);