import mongoose, { Schema } from 'mongoose';
import { gender, role } from '../enums/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface IUser {
    email: string;
    password: string;
    full_name?: string;
    age?: number;
    birth_date?: Date;
    phone?: number;
    address?: string;
    gender?: string;
    tokens?: { token: string }[];
    role?: string;
}

interface IUserMethod {
    generateAuthToken(): string;
}

type IUserModel = mongoose.Model<IUserMethod, {}, IUser>

const UserSchema: Schema = new Schema<IUser, IUserModel, IUserMethod>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    full_name: { String, },
    age: { type: Number, },
    birth_date: { type: Date, },
    phone: { type: Number, },
    address: { type: String, },
    gender: { type: String, enum: Object.values(gender), },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    role: {
        type: String,
        enum: Object.values(role),
        default: 'USER'
    },
}, {
    timestamps: true,
});

UserSchema.method('generateAuthToken', function () {
    const user = this;
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY not found');
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    user.tokens = user.tokens.concat({ token });
    return token;
})

UserSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password')) return
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
        });
    });
    next();
})

export const UserModel = mongoose.model('User', UserSchema);