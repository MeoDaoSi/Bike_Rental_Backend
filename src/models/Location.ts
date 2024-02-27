import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Location';
export const COLLECTION_NAME = 'locations';

export default interface Location {
    _id: Types.ObjectId;
    address: string;
}

const LocationSchema = new Schema<Location>({
    address: {
        type: String,
        required: true,
        maxlength: 200,
    }
}, {
    timestamps: true,
});

export const LocationModel = model<Location>(DOCUMENT_NAME, LocationSchema, COLLECTION_NAME);