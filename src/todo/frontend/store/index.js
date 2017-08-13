import { Store } from 'nuklein';
import TodoList from './fragments/TodoList';

export default class MyStore extends Store {
	init() {
		return {
			todoList: new TodoList(),
		};
	}
}
