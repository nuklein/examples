import React, { Component } from 'react';
import { subscribe } from 'react-nuklein';
import Heading from '../Heading/Heading';
import List from '../List/List';
import Pagination from '../Pagination/Pagination';

const schema = (getStore) => getStore({
	_path: 'todoList',
	quantity: 'quantity',
	perPage: 'pagination.perPage',
});

@subscribe(schema)
export default class Container extends Component {
	render() {
		const { quantity, perPage } = this.props;

		return (
			<div>
				<Heading />
				<List perPage={perPage} quantity={quantity} />
				<Pagination quantity={quantity} perPage={perPage} />
			</div>
		);
	}
}
