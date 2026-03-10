
import mongoose from 'mongoose';
import { TestimonialSchema } from '../models/DBTestimonial';
import { ITestimonialDBManager } from '../interfaces/ITestimonialDBManager';
import { TestimonialUtility } from '../../common/utils/TestimonialUtility';
import { DBConstants } from '../models/DBConstants';
import { TestimonialResponseModel } from 'service-layer/models/TestimonialResponseModel';

export class MongoTestimonialDBManager implements ITestimonialDBManager {
    private testimonialDB: any;

    constructor() {
        this.testimonialDB = mongoose.model(DBConstants.TestimonialsCollection, TestimonialSchema);
    }

    public async addTestimonial(data: any): Promise<TestimonialResponseModel> {
        let db = new this.testimonialDB(data);
        let ret = await db.save();
        return TestimonialUtility.getTestimonialModelBasicDetails(ret);
    }

    public async editTestimonial(id: string, data: any): Promise<TestimonialResponseModel | null> {
        let ret = await this.testimonialDB.findByIdAndUpdate(id, data, { new: true });
        return ret ? TestimonialUtility.getTestimonialModelBasicDetails(ret) : null;
    }

    public async deleteTestimonial(id: string): Promise<boolean> {
        const res = await this.testimonialDB.findByIdAndUpdate(id, { status: 'deleted' });
        return !!res;
    }

    public async listTestimonials(query: any, page: number, limit: number): Promise<{ data: TestimonialResponseModel[]; total: number }> {
        const filter = { ...query, status: 'active' };
        const total = await this.testimonialDB.countDocuments(filter);
        const data = await this.testimonialDB.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ created_at: -1 });
        return { data: data.map((item: any) => TestimonialUtility.getTestimonialModelBasicDetails(item)), total };
    }

    public async getTestimonialById(id: string): Promise<TestimonialResponseModel> {
        const testimonial = await this.testimonialDB.findById(id);
        return testimonial ? TestimonialUtility.getTestimonialModelBasicDetails(testimonial) : null;
    }
}
