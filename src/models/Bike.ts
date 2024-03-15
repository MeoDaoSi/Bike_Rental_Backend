import { Schema, Types, model } from 'mongoose';
import Branch from './Branch';

export const DOCUMENT_NAME = 'Bike';
export const COLLECTION_NAME = 'bikes';

export enum BikeType {
    BICYCLE = 'BICYCLE',
    MOTORCYCLE = 'MOTORCYCLE',
}

interface Bike_Status {
    start_date?: Date,
    end_date?: Date,
    status: BikeType
}

export default interface Bike {
    _id: Types.ObjectId,
    branch: Branch,
    brand: string,
    model: string,
    imgUrl?: string,
    year: number,
    color: string,
    license_plate?: string,
    status: Bike_Status,
    type: string,
    QR_code: string,
}

const BikeSchema = new Schema<Bike>({
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
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
    imgUrl: {
        type: Schema.Types.String,
        required: false,
        maxlength: 500,
        trim: true,
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
        type: Object,
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
    timestamps: true,
})

export const BikeModel = model<Bike>(DOCUMENT_NAME, BikeSchema, COLLECTION_NAME);
