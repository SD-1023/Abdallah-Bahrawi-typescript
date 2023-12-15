import express, { Application } from 'express';
import * as bodyParser from 'body-parser';

import homeRoute from './routes/homeRoute';
import booksRoute from './routes/booksRoute';
import notFoundRoute from './routes/404Route';

const app: Application = express();
const port: number = 3000;


app.use(bodyParser.json());
app.set('view engine', 'pug');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/', homeRoute);
app.use('/books', booksRoute);
app.use(notFoundRoute);
