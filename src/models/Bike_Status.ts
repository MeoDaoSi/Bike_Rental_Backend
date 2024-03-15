import { Schema, Types, model } from 'mongoose';

export const DOCUMENT_NAME = 'Bike_Status';
export const COLLECTION_NAME = 'bike_status';

export default interface Bike_Status { 
    _id: Types.ObjectId,
    start_date: Date,
    end_date: Date,
    status: string
}

export enum BikeStatus {
    AVAILABLE = 'AVAILABLE',
    UNAVAILABLE = 'UNAVAILABLE',
}

const ContactSchema = new Schema<Bike_Status>({
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    status: {
        type: String,
        enum: Object.values(BikeStatus),
        default: BikeStatus.AVAILABLE,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false,
})

export const Bike_Status_Model = model<Bike_Status>(DOCUMENT_NAME, ContactSchema, COLLECTION_NAME);