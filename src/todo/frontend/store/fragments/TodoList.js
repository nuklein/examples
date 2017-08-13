import { Fragment, httpConnector } from 'nuklein';

@httpConnector('http://localhost:2017/', {
	beforeGetData: { params: { loading: true } },
	afterGetData: { params: { loading: false, getError: null } },
	onlyLocalModificators: ['changeEditable', 'setRemoving', 'changePageNum', 'changePerPage'],
	debounceForSet: {
		changeTitle: 500,
	},
	getErrorData: {
		params: {
			getError: 'Не удалось получить список постов. Сервер какаха.',
		},
	},
	setErrorData: {
		params: {
			setError: 'Не удалось обновить данные. Наверное, сервер виноват.',
		},
	},
	onlyServerModificators: ['remove', 'unshift', 'push'],
	onSet({ options }) {
		if (options) {
			if (options.method === 'remove') {
				this.setData({ removing: false }, 'params');
			}
			if (options.replaceAfterSet) {
				this.setData([], 'todos', { method: 'replace' });
			}
			if (options.updateQuantity) {
				this.getDataFromServer({ quantity: 'quantity' });
			}
		}
	},
})
export default class TodoList extends Fragment {
	init() {
		return {
			todos: [],
			params: {
				loading: false,
				getError: false,
				setError: false,
				removing: false,
			},
			pagination: {
				pageNum: 0,
				perPage: 15,
			},
			quantity: null,
		};
	}
}
