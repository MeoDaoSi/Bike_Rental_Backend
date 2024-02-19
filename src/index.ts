import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import bodyParser from 'body-parser';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import { db_connect } from './db/index';

import router from './routers/index';

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

db_connect();

const server = http.createServer(app);

app.use(router);

server.listen(8080, () => {
    console.log('Listening on port 8080');
});