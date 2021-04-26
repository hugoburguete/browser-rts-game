import express from "express";
import path from 'path';
import routes from './routes';
import dotenv from "dotenv";

// Init
dotenv.config();
const app = express();

// Express setup

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/', routes);
app.use('/*', express.static(path.join(__dirname, '../public')));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`listening on port http://localhost:${port}`) });