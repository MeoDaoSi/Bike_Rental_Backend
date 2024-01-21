import mongoose, { Schema } from 'mongoose';

const BikeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location_id: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    license_plate: {
        type: String,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
        required: true,
    },
    type: {
        type: String,
        enum: ['bikecycles', 'motorcycles'],
    },
    QR_code: {
        type: String,
    }
}, {
    versionKey: false,
})

export const BikeModel = mongoose.model('Bike', BikeSchema);
