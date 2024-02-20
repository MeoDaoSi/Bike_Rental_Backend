import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { corsUrl, enviroment } from './config'

// import dotenv from 'dotenv';
// dotenv.config();
import { db_connect } from './db/index';

import routes from './routers';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(
    express.urlencoded({ limit: '10mb', extended: false, parameterLimit: 50000}),
)
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// Routes
app.use('/', routes)

// app.use(cookieParser());
// app.use(compression());

db_connect();

export default app