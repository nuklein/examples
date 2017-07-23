import React, { Component } from 'react';
import { subscribe } from 'react-nuklein';
import * as modificators from '../../modificators/todo';

const schema = (getStore, props) => (getStore({
	todo: {
		_path: 'todo.data',
		list: Array.from({ length: props.perPage })
			.map((_, i) => (`${i + props.perPage * props.pageNum}`)),
	},
	params: {
		_path: 'todo',
		loading: 'loading',
		getError: 'getError',
		setError: 'setError',
		removing: 'removing',
	},
}));

@subscribe({ schema, modificators })
export default class List extends Component {
	changeEditable = (id: number, state: boolean) => () => {
		this.props.changeEditable(id, state);
	}

	changeTitle = (id: number) => (e: Event) => {
		if (e.target instanceof HTMLInputElement) {
			this.props.changeTitle(id, e.target.value);
		}
	}

	remove = (id: number) => () => {
		this.props.setRemoving();
		this.props.remove(id);
	}

	render() {
		const {
			todo: { list },
			params: { loading, getError, setError, removing },
			perPage,
			pageNum,
		} = this.props;

		if (getError) {
			return <div>{getError}</div>;
		}
		
		const itemsOffset = perPage * pageNum;

		return (
			<div>
				{setError && <div>{setError}</div>}
				<button onClick={this.props.unshift}>Добавить новый элемент в начало</button>
				<button onClick={this.props.push}>Добавить новый элемент в конец</button>
				<div>
					{loading && list.length === 0
					? <div>LOADING...</div>
					: list && list.map((v, key) => (
						v && (
							<div key={key}>
								{v.edit
									? <input
										value={v.title}
										onBlur={this.changeEditable(key + itemsOffset, false)}
										onChange={this.changeTitle(key + itemsOffset)}
										autoFocus
										/>
									: (
										<div
											onClick={this.changeEditable(key + itemsOffset, true)}>
											{v && v.title}
										</div>
									)
								}
								<button
									onClick={this.remove(key + itemsOffset)}
									disabled={removing}>
									Удалить
								</button>
							</div>
						)
					))}
				</div>
			</div>
		);
	}
}
