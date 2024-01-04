import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import bodyParser from 'body-parser';
import http from 'http';
import dotenv from 'dotenv';
import { connect } from './db/index';

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());
dotenv.config();

connect();

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Listening on port 8080');
});

// /b/mongodb/bin/mongod.exe --dbpath = /b/mongodb_data

