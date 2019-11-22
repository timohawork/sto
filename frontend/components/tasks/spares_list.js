import React, { Component} from "react";
import Link from "next/link";

import SpareBlock from './../../blocks/spare_block.js';
import SpareAddForm from "./spare_add.js";

function Block(props) {
	if (props.spare.taskId == props.activeItem.id) {
		return (
			<SpareBlock data={props.spare} />
		);
	}
	return null;
}

class SparesList extends Component {
	constructor() {
		super();
		this.state = {
			formIsShown: false
		};
	}

	showForm = event => {
		event.preventDefault();
		this.setState({formIsShown: true});
	};
	hideForm = event => {
		event ? event.preventDefault() : null;
		this.setState({formIsShown: false});
	};

	render() {
		return (
			<div className="spares-list">
				<p className="subtitle">Запчасти</p>
				{this.props.activeItem && this.props.appData.spares ? Object.keys(this.props.appData.spares).map((id, index) => (
					<Block 
						key={index} 
						spare={this.props.appData.spares[id]}
						activeItem={this.props.activeItem}
					/>
				)) : <p className="empty-block">Список запчастей пуст</p>}
				{this.props.activeItem ? 
					<>
						<a href="#" className="add-button" onClick={this.showForm}>
							<i className="fas fa-plus-circle"></i>
						</a>
						{ this.state.formIsShown ? 
							<SpareAddForm 
								appData={this.props.appData}
								hideForm={this.hideForm} 
								newSpare={this.props.newSpare} 
								activeItem={this.props.activeItem}
							/>
						 : null }
					 </>
				 : null}
			</div>
		);
	}
}

export default SparesList;