// @flow
import { Store } from 'nuklein';
import TodoFragment from './fragments/TodoFragment';

export default class MyStore extends Store {
	init() {
		return {
			todo: new TodoFragment(),
		};
	}
}
