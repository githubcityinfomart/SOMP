import mongoose, { Schema, Document } from 'mongoose';

export interface IBatch {
    batch_name: string;
    start_date: Date;
    limit: number;
}

export interface ICourseDocument extends Document {
    course_title: string;
    category: string;
    target_exam_year: string;
    short_description: string;
    course_link: string;
    standard_price: number;
    discounted_price: number;
    thumbnail?: string;
    batches: IBatch[];
    status: string;
    created_at: Date;
    updated_at: Date;
}

const batchSchema = new Schema<IBatch>(
    {
        batch_name: {
            type: String,
            required: true,
        },
        start_date: {
            type: Date,
            required: true,
        },
        limit: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

export const CourseSchema: Schema = new Schema(
    {
        course_title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        target_exam_year: {
            type: String,
            required: true,
        },
        short_description: {
            type: String,
            required: true,
        },
        course_link: {
            type: String,
            required: true,
        },
        standard_price: {
            type: Number,
            required: true,
        },
        discounted_price: {
            type: Number,
            required: true,
        },
        thumbnail: {
            type: String,
            required: false,
            default: '',
        },
        batches: [batchSchema],
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
    }
);

export default mongoose.model<ICourseDocument>('Course', CourseSchema);