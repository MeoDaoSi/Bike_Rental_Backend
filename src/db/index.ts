import mongoose from 'mongoose';

mongoose.set('strict', true);

// if (!process.env.DB_STRING) {
//     throw new Error('DB_STRING is not defined');
// }

// if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
//     throw new Error('DB_USERNAME is not defined');
// }

// const DB_URL = process.env.DB_STRING
//     .replace('<username>', process.env.DB_USERNAME)
    // .replace('<password>', process.env.DB_PASSWORD)
//     .replace('<database>', process.env.DB_NAME);

// export const db_connect = () => {
//     mongoose.Promise = global.Promise;
//     mongoose.connect(DB_URL)
//     mongoose.connection.on('connected', () => {
//         console.log('Connected to database');
//     });
//     mongoose.connection.on('error', (error: Error) => {
//         console.log('Database error: ' + error);
//     });

// };

// export const init = () =>
//     Promise.all([
//         // require('@/models/Author.model').init(),
//     ]).then(() => console.log('DB init successful'))

// export const drop = () =>
//     Promise.all([
//         // require('@/models/Author.model').deleteMany({}),
//     ]).then(() => console.log('DB drop successful'))

export const db_connect = async () => { 
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
        console.log("Connected to database");
    } catch (error) {
        console.log("Database error: " + error);
    }
}