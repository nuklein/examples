// @flow
import { Fragment, arrayDecorator } from 'nuklein';

@arrayDecorator('data')
export default class TodoFragment extends Fragment {
	getData(path?: Array<string>, getRealData: Function) {
		if (path && path.data && path.data.quantity) {
			const result = path;
			result.data.quantity = getRealData('data').length;
			return result;
		}
		return getRealData(path);
	}

	init(): Object {
		return {
			data: Array.from({ length: 100 }).map((_, key) => ({
				title: `Post ${key} from server`,
			})),
		};
	}
}
