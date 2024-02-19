import { Schema, Types, model } from 'mongoose';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export enum USER_ROLE {
    ADMIN = 'ADMIN',
    USER = 'USER',
    SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum gender {
    MALE = "MALE",
    FEMLAE = "FEMLAE",
    UNKNOWN = "UNKNOWN"
}

export default interface User {
    _id: Types.ObjectId;
    full_name?: string;
    profilePicUrl?: string;
    email: string;
    password: string;
    age?: number;
    birth_date?: Date;
    phone?: number;
    address?: string;
    gender?: string;
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
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
        select: false,
    },
    age: {
        type: Schema.Types.Number,
    },
    birth_date: {
        type: Schema.Types.Date,
    },
    phone: {
        type: Schema.Types.Number,
    },
    address: {
        type: Schema.Types.String,
        trim: true,
    },
    gender: {
        type: String, enum: Object.values(gender),
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
}, {
    timestamps: true,
});

export const UserModel = model<User>(DOCUMENT_NAME, UserSchema, COLLECTION_NAME);