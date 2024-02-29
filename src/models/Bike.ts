import { Schema, Types, model } from 'mongoose';

export const DOCUMENT_NAME = 'Bike';
export const COLLECTION_NAME = 'bikes';

export enum BikeStatus {
    AVAILABLE = 'AVAILABLE',
    UNAVAILABLE = 'UNAVAILABLEs',
}

export enum BikeType {
    BICYCLE = 'BICYCLE',
    MOTORCYCLE = 'MOTORCYCLE',
}

export default interface Bike {
    _id: Types.ObjectId,
    location_id: Types.ObjectId,
    brand: string,
    model: string,
    year: number,
    color: string,
    license_plate: string,
    status: string,
    type: string,
    QR_code: string,
}

const BikeSchema = new Schema<Bike>({
    location_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    brand: {
        type: Schema.Types.String,
        required: true,
    },
    model: {
        type: Schema.Types.String,
        required: true,
    },
    year: {
        type: Schema.Types.Number,
        required: true,
    },
    color: {
        type: Schema.Types.String,
        required: true,
    },
    license_plate: {
        type: Schema.Types.String,
    },
    status: {
        type: Schema.Types.String,
        enum: Object.values(BikeStatus),
        default: 'AVAILABLE',
        required: true,
    },
    type: {
        type: Schema.Types.String,
        enum: Object.values(BikeType),
    },
    QR_code: {
        type: Schema.Types.String,
    }
}, {
    versionKey: false,
})

export const BikeModel = model<Bike>(DOCUMENT_NAME, BikeSchema, COLLECTION_NAME);
