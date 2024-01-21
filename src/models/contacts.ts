import mongoose, { Schema } from 'mongoose';

const ContactSchema = new Schema({
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
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
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
    info_id: {
        type: Schema.Types.ObjectId,
        ref: 'Info',
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receipt_id: {
        type: Schema.Types.ObjectId,
        ref: 'Receipt',
    }
})

export const Contact = mongoose.model('Contact', ContactSchema);