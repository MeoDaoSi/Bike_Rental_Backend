import mongoose, { Schema, Model } from 'mongoose';

const LocationSchema = new Schema({
    address: {
        type: String,
        required: true,
    }
});

export const LocationModel = mongoose.model('Location', LocationSchema);