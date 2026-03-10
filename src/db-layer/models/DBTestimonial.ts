import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  rank: string;
  exam_year: number;
  exam_name: string;
  designation: string;
  message: string;
  image?: string;
  is_featured: boolean;
  is_testimonial: boolean;
  status: 'active' | 'deleted';
  created_at: Date;
  updated_at: Date;
}

export const TestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  rank: { type: String, required: true },
  exam_year: { type: Number, required: true },
  exam_name: { type: String, required: true },
  designation: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String, required: false },
  is_featured: { type: Boolean, required: true },
  is_testimonial: { type: Boolean, required: true },
  status: { type: String, enum: ['active', 'deleted'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);