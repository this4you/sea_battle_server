import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from "body-parser";
import {GameRouter, CellRouter} from "./routes";
import {checkGame} from "./middleware";
import './core/db';

const logger = morgan('dev');
const app = express();
const http = createServer(app);

app.use(cors());

app.use(logger);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(checkGame);
app.use('/', GameRouter);
app.use('/cell', CellRouter);

http.listen(9009, () => {
    console.log("Server start!");
});