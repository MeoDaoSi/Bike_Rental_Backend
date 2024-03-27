import { Schema, Types, model } from 'mongoose';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export enum USER_ROLE {
    ADMIN = 'ADMIN',
    USER = 'USER',
    SUPER_ADMIN = 'SUPER_ADMIN',
}

export default interface User {
    _id: Types.ObjectId;
    full_name?: string;
    profilePicUrl?: string;
    email?: string;
    password?: string;
    birth_date?: Date;
    phone_number: number;
    address?: string;
    role: string;
    verified?: boolean;
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<User>({
    full_name: {
        type: String,
        trim: true,
        maxlength: 200,
    },
    profilePicUrl: {
        type: Schema.Types.String,
        trim: true
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        trim: true,
        select: false,
        sparse: true, // allow null values
    },
    password: {
        type: Schema.Types.String,
        select: false,
    },
    birth_date: {
        type: Schema.Types.Date,
    },
    phone_number: {
        type: Schema.Types.Number,
        trim: true,
        required: true,
        maxlength: 11,
    },
    address: {
        type: Schema.Types.String,
        trim: true,
    },
    status: {
        type: Schema.Types.Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        default: 'USER'
    },
    verified: {
        type: Schema.Types.Boolean,
        default: false,
    },
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now,
        select: false,
    },
    updatedAt: {
        type: Schema.Types.Date,
        default: Date.now,
        select: false,
    },
}, {
    timestamps: true,
});

export const UserModel = model<User>(DOCUMENT_NAME, UserSchema, COLLECTION_NAME);