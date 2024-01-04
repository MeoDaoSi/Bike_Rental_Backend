import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }
}