import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    contact_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    select_package_id: {
        type: Schema.Types.ObjectId,    
        required: true,
    },
    payment_amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['rental', 'deposit'],
    },
    status: {
        type: String,
        enum: ['PENDING'],
        default: 'PENDING',
        required: true,
    },
}) 

export const TransactionModel = mongoose.model('Transaction', TransactionSchema);