import mongoose, { Schema } from "mongoose";
import { DBConstants } from "./DBConstants";

export const DBArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
  category_id: {
    type: String,
    required: true
},
    publish_date: {
        type: Date,
        default: null
    },
    focus_keyword: {
        type: String,
        default: null
    },
    url_slug: {
        type: String,
        default: null
    },
    permalink: {
        type: String,
        default: null
    },
    meta_description: {
        type: String,
        default: null
    },
    short_description: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    image_local: {
        type: String,
        default: null
    },
    tags: {
        type: [String],
        default: []
    },
    content: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ["draft", "published", "scheduled", "deleted"],
        default: "draft"
    },
    isPublish: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const ArticleModel = mongoose.model(
    DBConstants.ArticlesCollection,
    DBArticleSchema
);