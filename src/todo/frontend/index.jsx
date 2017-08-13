import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-nuklein';
import Store from './store/index';
import './styles/index.css';
import App from './components/App';

const rootElement = document.getElementById('root');
const store = new Store();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
    rootElement
);
