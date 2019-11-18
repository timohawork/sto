import React, { Component} from "react";

export default class Baloon extends Component {
	constructor() {
		super();
		this.state = {
			activeInfo: false
		};
	}

	toggleInfo = () => {
		this.setState({
			activeInfo: !this.state.activeInfo
		});
	};

	handleClick = event => {
		event.preventDefault();
		this.props.setActiveTask(this.props.data);
		this.toggleInfo();
	};


	render() {
		return (
			<>
				<div className="baloon" onClick={this.handleClick}>
					{this.props.data.title}
				</div>
				{this.state.activeInfo ? 
					<div className="info">
						Info!
					</div>
				 : null}
			 </>
		);
	}
}