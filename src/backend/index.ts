import express from "express";
import path from 'path';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);
app.use(express.static(path.join(__dirname, '../public')));

const port = process.env.port || 3000;
app.listen(port, () => { console.log(`listening on port ${port}`) });