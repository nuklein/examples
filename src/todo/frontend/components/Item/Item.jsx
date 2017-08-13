import React, { Component } from 'react';
import { subscribe } from 'react-nuklein';
import * as modificators from '../../modificators/todo';

@subscribe({ modificators })
export default class Item extends Component {
	changeEditable = (id, state) => () => {
		this.props.changeEditable(id, state);
	}

	changeTitle = id => e => {
		this.props.changeTitle(id, e.target.value);
	}

	remove = id => () => {
		this.props.setRemoving();
		this.props.remove(id);
	}

	render() {
		const { item, removing, id } = this.props;

		if (!item) {
			return null;
		}
		
		return (
			<div>
				{item.edit
					? <input
						value={item.title}
						onBlur={this.changeEditable(id, false)}
						onChange={this.changeTitle(id)}
						autoFocus
						/>
					: (
						<div
							onClick={this.changeEditable(id, true)}>
							{item.title}
						</div>
					)
				}
				<button
					onClick={this.remove(id)}
					disabled={removing}>
					Удалить
				</button>
			</div>
		);
	}
}
