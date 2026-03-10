export interface ITestimonialService {
  addTestimonial(data: any): Promise<any>;
  editTestimonial(id: string, data: any): Promise<any>;
  deleteTestimonial(id: string): Promise<boolean>;
  listTestimonials(type: 'wall' | 'testimonial' | 'all', page: number, limit: number): Promise<{ data: any[]; total: number }>;
  getTestimonialById(id: string): Promise<any>;
}