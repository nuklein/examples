// @flow

export function changeEditable(id: number, state: boolean) {
	return (setStore: Function) => {
		setStore({ edit: state }, `todoList.todos.${id}`);
	};
}

export function changeTitle(id: number, value: string) {
	return (setStore: Function) => {
		setStore({ title: value }, `todoList.todos.${id}`);
	};
}

export function changePageNum(pageNum: number) {
	return (setStore: Function) => {
		setStore({ pageNum }, 'todoList.pagination');
	};
}

export function changePerPage(perPage: number) {
	return (setStore: Function) => {
		setStore({ perPage }, 'todoList.pagination');
	};
}

export function remove(id: number) {
	return (setStore: Function) => {
		setStore(id, 'todoList.todos', { method: 'remove', replaceAfterSet: true });
	};
}

export function setRemoving() {
	return (setStore: Function) => {
		setStore({ removing: true }, 'todoList.params');
	};
}

export function unshift() {
	return (setStore: Function) => {
		setStore({ title: 'новый элемент' }, 'todoList.todos', {
			method: 'unshift',
			replaceAfterSet: true,
			updateQuantity: true,
		});
	};
}

export function push() {
	return (setStore: Function) => {
		setStore({ title: 'новый элемент' }, 'todoList.todos', {
			method: 'push',
			updateQuantity: true,
		});
	};
}
