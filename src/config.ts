import dotenv from 'dotenv';
dotenv.config();

export const enviroment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const timezone = process.env.TZ;

export const corsUrl = process.env.CORS_URL;