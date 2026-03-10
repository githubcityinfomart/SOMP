import { ITestimonialDBManager } from '../../db-layer/interfaces/ITestimonialDBManager';
import { MongoTestimonialDBManager } from '../../db-layer/implementations/MongoTestimonialDBManager';
import { ITestimonialService } from '../interfaces/ITestimonialService';

export class TestimonialService implements ITestimonialService {
    private readonly testimonialDBManager: ITestimonialDBManager;

    constructor() {
        this.testimonialDBManager = new MongoTestimonialDBManager();
    }

    async addTestimonial(data: any) {
        return await this.testimonialDBManager.addTestimonial(data);
    }

    async editTestimonial(id: string, data: any) {
        return await this.testimonialDBManager.editTestimonial(id, data);
    }

    async deleteTestimonial(id: string) {
        return await this.testimonialDBManager.deleteTestimonial(id);
    }

    async listTestimonials(type: 'wall' | 'testimonial' | 'all', page: number, limit: number) {
        let query: any = {};
        if (type === 'wall') query.is_featured = true;
        if (type === 'testimonial') query.is_testimonial = true;
        return await this.testimonialDBManager.listTestimonials(query, page, limit);
    }

    async getTestimonialById(id: string) {
        return await this.testimonialDBManager.getTestimonialById(id);
    }
}
