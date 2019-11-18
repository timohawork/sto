import React, { Component} from "react";
import Head from "next/head";
import Link from "next/link";

const Block = props => (
	<Link href={props.url}>
		<a className="block">
			<h1>{props.title}</h1>
			<img src={`/static/img/icons/${props.img}`} alt={props.title} />
		</a>
	</Link>
);

class Main extends Component {
	render() {
		return (
			<div>
				<Head>
					<title>{process.env.TITLE+' - Главная'}</title>
					<link href="/static/css/index.css" rel="stylesheet" />
				</Head>
				<div className="container">
					<div className="main-block">
						<Block title="Автомобили" url="/cars" img="car.png" />
						<Block title="Сотрудники" url="/emps" img="employee.png" />
						<Block title="Зап.части" url="/spares" img="spares.jpg" />
						<Block title="Задачи" url="/tasks" img="task.png" />
					</div>
				</div>
			</div>
		);
	}
}

export default Main;