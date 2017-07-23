import React, { Component } from 'react';
import { subscribe } from 'react-nuklein';
import { changePageNum } from '../../modificators/todo';
import List from '../List';

const schema = (getStore) => getStore({
	_path: 'todo',
	quantity: 'quantity',
	pageNum: 'pageNum',
});

const perPage = 15;

@subscribe({ schema, modificators: { changePageNum } })
export default class Container extends Component {
	changePageNum = (pageNum: number) => () => {
		this.props.changePageNum(pageNum);
	}

	render() {
		const { quantity, pageNum } = this.props;
		const pageCount = quantity ? Math.ceil(quantity / perPage) : 0;

		return (
			<div>
				<List pageNum={pageNum} perPage={perPage} />
				{quantity && Array.from({ length: pageCount }).map((_, key) => (
					<div
						key={key}
						onClick={this.changePageNum(key)}>
						{key + 1}
					</div>
				))}
			</div>
		);
	}
}
