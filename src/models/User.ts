import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    // add more fields as necessary
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // define more fields as necessary
});

const User = mongoose.model<IUser>('User', UserSchema);

export { IUser, User };

