import { Fragment, arrayDecorator } from 'nuklein';

@arrayDecorator('todos')
export default class TodoList extends Fragment {
	init() {
		return {
			todos: Array.from({ length: 100 }).map((_, idx) => ({
				title: `Post ${idx} from server`,
			})),
		};
	}

	onDataNotFoundOne(path) {
		if (path === 'quantity') {
			return this.getData('todos.length');
		}
	}
}
