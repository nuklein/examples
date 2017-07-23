// @flow

export function changeEditable(id: number, state: boolean) {
	return (setStore: Function) => {
		setStore({ edit: state }, `todo.data.${id}`);
	};
}

export function changeTitle(id: number, value: string) {
	return (setStore: Function) => {
		setStore({ title: value }, `todo.data.${id}`);
	};
}

export function changePageNum(pageNum: number) {
	return (setStore: Function) => {
		setStore({ pageNum }, 'todo');
	};
}

export function remove(id: number) {
	return (setStore: Function) => {
		setStore(id, 'todo.data', { method: 'remove', replaceAfterSet: true });
	};
}

export function setRemoving() {
	return (setStore: Function) => {
		setStore({ removing: true }, 'todo');
	};
}

export function unshift() {
	return (setStore: Function) => {
		setStore({ title: 'новый элемент' }, 'todo.data', {
			method: 'unshift',
			replaceAfterSet: true,
			updateQuantity: true,
		});
	};
}

export function push() {
	return (setStore: Function) => {
		setStore({ title: 'новый элемент' }, 'todo.data', {
			method: 'push',
			updateQuantity: true,
		});
	};
}
