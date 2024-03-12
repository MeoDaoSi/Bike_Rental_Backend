import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Branch';
export const COLLECTION_NAME = 'branches';

export default interface Branch {
    _id: Types.ObjectId;
    address: string;
}

const BranchSchema = new Schema<Branch>({
    address: {
        type: String,
        required: true,
        maxlength: 200,
    }
}, {
    timestamps: true,
});

export const BranchModel = model<Branch>(DOCUMENT_NAME, BranchSchema, COLLECTION_NAME);