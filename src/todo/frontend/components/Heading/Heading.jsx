import React, { Component } from 'react';
import { subscribe } from 'react-nuklein';
import { unshift, push, changePerPage, changePageNum } from '../../modificators/todo';

const schema = getStore => getStore({
	_path: 'todoList',
	quantity: 'quantity',
	perPage: 'pagination.perPage',
	pageNum: 'pagination.pageNum',
	setError: 'params.setError',
});

@subscribe({ schema, modificators: { unshift, push, changePerPage, changePageNum } })
export default class Heading extends Component {
	changePerPage = e => {
		const { pageNum, quantity } = this.props;
		const perPage = e.target.valueAsNumber;

		if (!isNaN(perPage)) {
			const pageCount = quantity ? Math.ceil(quantity / perPage) : 0;
			if (pageNum > pageCount - 1) {
				this.props.changePageNum(pageCount - 1);
			}
			this.props.changePerPage(perPage);
		}
	}

	render() {
		const { setError, quantity, perPage } = this.props;

		return (
			<div>
				{setError && <div>{setError}</div>}
				<button onClick={this.props.unshift}>Добавить новый элемент в начало</button>
				<button onClick={this.props.push}>Добавить новый элемент в конец</button>
				<input type="number" max={quantity} min={1} value={perPage} onChange={this.changePerPage} />
			</div>
		);
	}
}
