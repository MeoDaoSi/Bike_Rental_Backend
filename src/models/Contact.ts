import { Schema, Types, model } from 'mongoose';

export const DOCUMENT_NAME = 'Contact';
export const COLLECTION_NAME = 'contacts';

export enum ContactStatus { 
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

interface Contact { 
    _id: Types.ObjectId,
    start_date: Date,
    end_date: Date,
    pickup: string,
    return: string,
    note: string,
    status: string,
    total_price: number,
    duration: number,
    bike_id: Types.ObjectId,
    user_id: Types.ObjectId,
}

const ContactSchema = new Schema<Contact>({
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
    bike_id: {
        type: Schema.Types.ObjectId,
        ref: 'Bike',
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // receipt_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Receipt',
    // }
}, {
    timestamps: true,
    versionKey: false,
})

export const ContactModel = model<Contact>(DOCUMENT_NAME, ContactSchema, COLLECTION_NAME);