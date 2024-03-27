import { Schema, Types, model } from 'mongoose';
import Bike from './Bike';
import User from './User';
import { BikeType } from './Bike';

export const DOCUMENT_NAME = 'Contract';
export const COLLECTION_NAME = 'contracts';

export enum ContactStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    PROCESSING = 'PROCESSING',
    REJECTED = 'REJECTED',
    COMPLETED = 'COMPLETED',
}

export default interface Contract {
    _id: Types.ObjectId,
    start_date: Date,
    end_date: Date,
    pickup_address: string,
    return_address: string,
    status: string,
    total_price: number,
    duration: number,
    type: string
    bikes: Bike[],
    user?: User,
    staff?: User,
}

const ContactSchema = new Schema<Contract>({
    start_date: {
        type: Date,
        required: true,
        trim: true,
    },
    end_date: {
        type: Date,
        required: true,
        trim: true,
    },
    pickup_address: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        maxlength: 200
    },
    return_address: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        maxlength: 200
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
    },
    staff: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
    versionKey: false,
})

export const ContractModel = model<Contract>(DOCUMENT_NAME, ContactSchema, COLLECTION_NAME);