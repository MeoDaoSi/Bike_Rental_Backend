import { Schema, Types, model } from 'mongoose';

export const DOCUMENT_NAME = 'Detail_Contract';
export const COLLECTION_NAME = 'detail_contract';

export default interface Contract_Detail {
    _id: Types.ObjectId,
    imgUrl: string,
    contract: Types.ObjectId,
}

const DetailContractSchema = new Schema<Contract_Detail>({
    imgUrl: {
        type: String,
        required: true,
        trim: true
    },
    contract: {
        type: Schema.Types.ObjectId,
        ref: 'Contract',
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
})

export const Contract_Detail_Model = model<Contract_Detail>(DOCUMENT_NAME, DetailContractSchema, COLLECTION_NAME);