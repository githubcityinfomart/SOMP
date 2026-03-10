import mongoose, { Schema } from "mongoose";
import { DBConstants } from "./DBConstants";

export const DBContactUsSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    interested_course: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ["new", "contacted", "closed"],
        default: "new"
    }
}, { timestamps: true });

export const ContactUsModel = mongoose.model(
    DBConstants.ContactUsCollection,
    DBContactUsSchema
);