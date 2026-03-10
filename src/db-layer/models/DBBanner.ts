import mongoose, { Schema } from "mongoose";
import { DBConstants } from "./DBConstants";

export const DBBannerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    banner_image: {
        type: String,
        default: null
    },
    banner_image_local: {
        type: String,
        default: null
    },
    link: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ["active", "inactive", "deleted"],
        default: "active"
    }
}, { timestamps: true });

export const BannerModel = mongoose.model(
    DBConstants.BannersCollection,
    DBBannerSchema
);