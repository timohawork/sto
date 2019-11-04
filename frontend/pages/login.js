import React, { Component} from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import Auth from './../components/auth.js';

const auth = new Auth();

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				login: '',
				password: ''
			},
			errors: {}
		};
	}

	handleChange = (event) => {
		let data = this.state.data;
		data[event.target.name] = event.target.value;
		this.setState({data: data});
	};

	submitFormHandler = (event) => {
		event.preventDefault();
		if (!auth.isLoggedIn()) {
			let errors = auth.login(this.state.data.login, this.state.data.password, errors => {
				if (errors) {
					this.setState({errors: errors});
					return;
				}
				this.props.appInit(() => {
					this.props.router.push('/');
				});
			});
		}
	};

	render() {
		return (
			<>
				<Head>
					<title>{process.env.TITLE+' - Вход'}</title>
					<link href="/static/css/login.css" rel="stylesheet" />
				</Head>
				<div className="container">
					<div className="login-form">
						<h1>Вход в систему</h1>
						<form onSubmit={this.submitFormHandler}>
			  				<input type="text" name="login" onChange={this.handleChange} />
			  				{ this.state.errors.login ? 
			  					<p className="error">{this.state.errors.login}</p>
		  					: null }
			  				<input type="password" name="password" onChange={this.handleChange} />
			  				{ this.state.errors.password ? 
			  					<p className="error">{this.state.errors.password}</p>
		  					: null }
							<input type="submit" value="Войти" />
						</form>
					</div>
				</div>
			</>
		);
	}
}

export default withRouter(Login);