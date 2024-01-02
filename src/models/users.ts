import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['USER', 'ADMIN', 'SUPERADMIN'],
        default: 'USER'
    },
}, {
    timestamps: true,
});

export const User = mongoose.model('users', UserSchema);

export const findUsers = () => User.find();
export const findUserById = (id: string) => User.findById(id);
export const findUserByEmail = (email: string) => User.findOne({ email });
export const createUser = (values: Record<string, any>) => new User(values)
    .save();
export const updateUser = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values);
export const deleteUser = (id: string) => User.findByIdAndDelete(id);


