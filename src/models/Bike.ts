import { Schema, Types, model } from 'mongoose';
import Branch from './Branch';

export const DOCUMENT_NAME = 'Bike';
export const COLLECTION_NAME = 'bikes';

export enum BikeType {
    BICYCLE = 'BICYCLE',
    MOTORCYCLE = 'MOTORCYCLE',
}

export enum BikeColor {
    RED = 'RED',
    BLUE = 'BLUE',
    GREEN = 'GREEN',
    YELLOW = 'YELLOW',
    BLACK = 'BLACK',
    WHITE = 'WHITE',
    ORANGE = 'ORANGE',
    PURPLE = 'PURPLE',
    PINK = 'PINK',
    BROWN = 'BROWN',
    GREY = 'GREY',
    SILVER = 'SILVER',
}

export enum BikeStatus {
    AVAILABLE = 'AVAILABLE',
    UNAVAILABLE = 'UNAVAILABLE',
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
    price: number,
    status: string,
    type: string,
    QR_code: string,
}

const BikeSchema = new Schema<Bike>({
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
        trim: true,
    },
    brand: {
        type: Schema.Types.String,
        required: true,
        maxlength: 200,
        trim: true,
    },
    model: {
        type: Schema.Types.String,
        required: true,
        maxlength: 200,
        trim: true,
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
        trim: true,
        max: new Date().getFullYear(),
    },
    color: {
        type: Schema.Types.String,
        enum: Object.values(BikeColor),
        required: true,
    },
    license_plate: {
        type: Schema.Types.String,
        maxlength: 20,
        trim: true,
        require: false,
    },
    price: {
        type: Schema.Types.Number,
        required: true,
        trim: true,
    },
    status: {
        type: Schema.Types.String,
        enum: Object.values(BikeStatus),
        trim: true,
        default: BikeStatus.AVAILABLE,
        required: true,
    },
    type: {
        type: Schema.Types.String,
        enum: Object.values(BikeType),
        required: true,
        trim: true,
    },
    QR_code: {
        type: Schema.Types.String,
    }
}, {
    versionKey: false,
    timestamps: true,
})

export const BikeModel = model<Bike>(DOCUMENT_NAME, BikeSchema, COLLECTION_NAME);
