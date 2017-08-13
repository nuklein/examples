import React, { Component } from 'react';
import { subscribe } from 'react-nuklein';
import { changePageNum } from '../../modificators/todo';

@subscribe({ modificators: { changePageNum } })
export default class Pagination extends Component {
	changePageNum = pageNum => () => {
		this.props.changePageNum(pageNum);
	}

	render() {
		const { quantity, perPage } = this.props;
		const pageCount = quantity ? Math.ceil(quantity / perPage) : 0;

		return (
			<div>
				{pageCount > 1 && Array.from({ length: pageCount }).map((_, key) => (
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
