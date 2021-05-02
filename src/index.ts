import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from "body-parser";
import {GameRouter, CellRouter} from "./routes";
import {checkGame} from "./middleware";
import socket from "./core/socket";
import './core/db';

const logger = morgan('dev');
const app = express();
const http = createServer(app);
const io = socket(http);

app.use(cors());

app.use(logger);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(checkGame);
app.use('/', GameRouter(io));
app.use('/cell', CellRouter(io));

http.listen(9009, () => {
    console.log("Server start!");
});