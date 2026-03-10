
import { TestimonialResponseModel } from '../../service-layer/models/TestimonialResponseModel';

export interface ITestimonialDBManager {
  addTestimonial(data: any): Promise<TestimonialResponseModel>;
  editTestimonial(id: string, data: any): Promise<TestimonialResponseModel | null>;
  deleteTestimonial(id: string): Promise<boolean>;
  listTestimonials(query: any, page: number, limit: number): Promise<{ data: TestimonialResponseModel[]; total: number }>;
  getTestimonialById(id: string): Promise<TestimonialResponseModel | null>;
}