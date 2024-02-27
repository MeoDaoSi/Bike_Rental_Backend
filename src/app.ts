import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { corsUrl } from './config'

import { db_connect } from './db/index';

import routes from './routers';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(
    express.urlencoded({ limit: '10mb', extended: false, parameterLimit: 50000 }),
)
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// Routes
app.use('/', routes);

db_connect();

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
})

export default app