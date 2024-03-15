import { Schema, Types, model } from 'mongoose';
import Bike from './Bike';
import User from './User';
import { BikeType } from './Bike';

export const DOCUMENT_NAME = 'Contact';
export const COLLECTION_NAME = 'contacts';

export enum ContactStatus { 
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    COMPLETED = 'COMPLETED',
}

export default interface Contract { 
    _id: Types.ObjectId,
    start_date: Date,
    end_date: Date,
    pickup: string,
    return: string,
    note: string,
    status: string,
    total_price: number,
    duration: number,
    type: string
    bikes: Bike[],
    user: User,
}

const ContactSchema = new Schema<Contract>({
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    pickup: {
        type: String,
        required: true,
    },
    return: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(ContactStatus),
        default: 'PENDING',
    },
    total_price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(BikeType),
    },
    // select_package
    bikes: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Bike',
            }
        ],
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
})

export const ContactModel = model<Contract>(DOCUMENT_NAME, ContactSchema, COLLECTION_NAME);