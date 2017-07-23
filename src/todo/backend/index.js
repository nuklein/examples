import express from 'express';
import bodyParser from 'body-parser';
import corsPrefetch from 'cors-prefetch-middleware';
import { httpHandler } from 'nuklein-server';
import Store from './store/index';

const app = express();
const store = new Store();

app.use(corsPrefetch);
app.use(bodyParser.json());

app.post('/', httpHandler(store, 'todo'));

app.listen(2017, () => {
	console.log('Example app listening on port 2017!');
});
