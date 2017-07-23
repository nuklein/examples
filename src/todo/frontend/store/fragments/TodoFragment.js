// @flow
import { Fragment, httpConnector } from 'nuklein';

@httpConnector('http://localhost:2017/', {
	beforeGetData: { loading: true },
	afterGetData: { loading: false, getError: null },
	ignoreModificators: ['changeEditable', 'setRemoving', 'changePageNum'],
	setDebounce: 500,
	getErrorData: {
		getError: 'Не удалось получить список постов. Сервер какаха.',
	},
	setErrorData: {
		setError: 'Не удалось обновить данные. Наверное, сервер виноват.',
	},
	onlyServerModificators: ['remove', 'unshift', 'push'],
	onSet({ options }) {
		if (options) {
			if (options.method === 'remove') {
				this.setData({ removing: false });
			}
			if (options.replaceAfterSet) {
				this.setData([], 'data', { method: 'replace' });
			}
			if (options.updateQuantity) {
				this.getDataFromServer({ quantity: 'quantity' });
			}
		}
	},
})
export default class TodoFragment extends Fragment {
	init(): Object {
		return {
			data: [],
			loading: false,
			getError: false,
			setError: false,
			removing: false,
			quantity: null,
			pageNum: 0,
		};
	}
}
