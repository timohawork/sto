import React, { Component} from "react";
import Link from "next/link";

export default class SpareBlock extends Component {
	render() {
  		return (
	  		<Link href={'/spares#'+this.props.data.id}>
				<a className="item">
					<div className="title">
						{this.props.data.title}
					</div>
					<div className="catNum">
						{this.props.data.catNum}
					</div>
					<div className="price">
						{this.props.data.price}Р
					</div>
					<div className="buy_date">
						{this.props.data.buy_date}
					</div>
					{this.props.data.install_date ? 
						<div className="install_date">
							{this.props.data.install_date}
						</div>
					 : null}
				</a>
			</Link>
	  	);
	}
}