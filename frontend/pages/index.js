import React, { Component} from "react";
import Head from "next/head";
import Link from "next/link";

import './../styles/index.scss';

const Block = props => (
	<Link href={props.url}>
		<a className="block">
			<span>{props.title}</span>
			<i className={'fas fa-'+props.icon}></i>
		</a>
	</Link>
);

class Main extends Component {
	render() {
		return (
			<div>
				<Head>
					<title>{process.env.TITLE+' - Главная'}</title>
				</Head>
				<div className="container">
					<div className="main-block">
						<h1>{process.env.TITLE}</h1>
						<Block title="Автомобили" url="/cars" icon="car" />
						<Block title="Сотрудники" url="/emps" icon="users" />
						<Block title="Зап.части" url="/spares" icon="cogs" />
						<Block title="Задачи" url="/tasks" icon="tasks" />
					</div>
				</div>
			</div>
		);
	}
}

export default Main;