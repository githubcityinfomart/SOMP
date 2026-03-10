import mongoose, { Schema, Types } from "mongoose";
import { DBConstants } from "./DBConstants";

export const DBUserSessionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: DBConstants.UsersCollection,
        default: null
    },
    token: {
        type: String,
    },
    isExpired: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });