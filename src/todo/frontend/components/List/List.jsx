import React, { Component } from 'react';
import { subscribe } from 'react-nuklein';
import Item from '../Item/Item';

const schema = getStore => getStore({
	listLength: 'todoList.todos.length',
	getError: 'todoList.params.getError',
	pageNum: 'todoList.pagination.pageNum',
});

@subscribe(schema)
export default class List extends Component {
	render() {
		const { getError, perPage, pageNum, quantity, listLength } = this.props;

		if (getError) {
			return <div>{getError}</div>;
		}

		const itemsOffset = perPage * pageNum;
		const lastIdx = itemsOffset + perPage;
		const length = quantity > lastIdx ? perPage : quantity - itemsOffset;

		return (
			<div>
				<div>
					{listLength === 0 && <div>LOADING...</div>}
					{
						!!quantity && Array.from({ length }).map((v, key) => (
							<Item key={key + itemsOffset} id={key + itemsOffset} />
						))
					}
				</div>
			</div>
		);
	}
}
