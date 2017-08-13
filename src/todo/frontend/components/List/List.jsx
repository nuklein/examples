import React, { Component } from 'react';
import { subscribe } from 'react-nuklein';
import Item from '../Item/Item';

const schema = (getStore, props) => {
	const { perPage, pageNum, quantity } = props;

	const itemsOffset = perPage * pageNum;
	const lastIdx = itemsOffset + perPage;
	const length = quantity > lastIdx ? perPage : quantity - itemsOffset;

	const data = getStore({
		todo: {
			_path: 'todoList.todos',
			list: Array.from({ length }).map((_, i) => (`${i + itemsOffset}`)),
		},
		params: {
			_path: 'todoList.params',
			loading: 'loading',
			getError: 'getError',
			removing: 'removing',
		},
	});

	return {
		list: data.todo.list,
		...data.params,
		itemsOffset,
	};
};

@subscribe(schema)
export default class List extends Component {
	render() {
		const { list, loading, getError, removing, itemsOffset } = this.props;

		if (getError) {
			return <div>{getError}</div>;
		}

		return (
			<div>
				<div>
					{loading && list.length === 0
						? <div>LOADING...</div>
						: list && list.map((v, key) => (
							<Item key={key} item={v} id={key + itemsOffset} removing={removing} />
						))}
				</div>
			</div>
		);
	}
}
